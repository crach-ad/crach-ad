/**
 * NLG checkout embed.
 *
 * Usage on a seller's site:
 *   <script src="https://<nlg-host>/nlg.js"></script>
 *   <button onclick="NLG.checkout({ gateway: 'demo', amount: 99.00, ref: 'ORDER-123' })">
 *     Pay with card
 *   </button>
 *
 * Opens the hosted checkout in a full-screen iframe overlay. The buyer never
 * leaves the seller's page; card details only ever touch the NLG origin.
 *
 * Options:
 *   gateway  (required) gateway id issued by NLG
 *   amount   (required) decimal amount to charge
 *   currency fiat currency code, default "USD"
 *   ref      seller order reference shown on the receipt
 *   item     item description shown in the checkout header
 *   onSuccess(sale) called with { saleId, amount, currency, ref } — only once
 *            NLG reports a sale; verify it on your server before fulfilment
 *   onPending(info) called with { ref, orderId } when the buyer has paid but
 *            the sale isn't confirmed yet (still settling, or held for a
 *            check). Don't fulfil yet; NLG emails the buyer when it's done
 *   onClose() called when the buyer dismisses the checkout
 */
(function () {
  "use strict";

  var embedScript = document.currentScript;

  var ORIGIN = "https://master.soltarx.com";

  var active = null;

  function checkout(opts) {
    opts = opts || {};
    if (!opts.gateway || !(opts.amount > 0)) {
      throw new Error("NLG.checkout requires a gateway id and a positive amount");
    }
    if (active) close();

    var params = new URLSearchParams({ amount: String(opts.amount), embed: "1" });
    if (opts.currency) params.set("currency", opts.currency);
    if (opts.ref) params.set("ref", opts.ref);
    if (opts.item) params.set("item", opts.item);

    var overlay = document.createElement("div");
    overlay.setAttribute("data-nlg-overlay", "");
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.55);" +
      "display:flex;align-items:stretch;justify-content:center;";

    var frame = document.createElement("iframe");
    frame.src = ORIGIN + "/pay/" + encodeURIComponent(opts.gateway) + "?" + params.toString();
    frame.allow = "payment";
    frame.style.cssText = "border:0;width:100%;height:100%;background:transparent;";
    overlay.appendChild(frame);

    function onMessage(event) {
      if (event.source !== frame.contentWindow) return;
      if (ORIGIN && event.origin !== ORIGIN) return;
      var data = event.data;
      if (!data || data.source !== "nlg-checkout") return;
      if (data.type === "nlg:success" && typeof opts.onSuccess === "function") {
        opts.onSuccess({ saleId: data.saleId, amount: data.amount, currency: data.currency, ref: data.ref });
      }
      if (data.type === "nlg:pending" && typeof opts.onPending === "function") {
        opts.onPending({ ref: data.ref, orderId: data.orderId });
      }
      if (data.type === "nlg:close") {
        close();
        if (typeof opts.onClose === "function") opts.onClose();
      }
    }

    window.addEventListener("message", onMessage);
    document.body.appendChild(overlay);
    document.documentElement.style.overflow = "hidden";
    active = { overlay: overlay, onMessage: onMessage };
  }

  function close() {
    if (!active) return;
    window.removeEventListener("message", active.onMessage);
    active.overlay.remove();
    document.documentElement.style.overflow = "";
    active = null;
  }

  window.NLG = { checkout: checkout, close: close };

  // Optional one-tag install: add data-cart-endpoint="/api/soltarx/checkout"
  // to the script and place it where the payment button should appear.
  // The same-origin connector receives POST { action: 'prepare'|'status', ref }.
  // It resolves the shopper/cart from the session, authorizes the reference,
  // and reuses any unresolved order, including after reload. Prepare returns
  // { status: 'ready', order: { gateway, ref, totalCents, currency, item } }
  // or { status: 'pending'|'paid', ref }. Status returns pending, paid, or
  // unpaid (only when safe to retry). Paid requires server verification.
  var cartEndpoint = embedScript && embedScript.getAttribute("data-cart-endpoint");
  if (cartEndpoint) {
    var endpoint = new URL(cartEndpoint, window.location.href);
    if (endpoint.origin !== window.location.origin) return;

    var button = document.createElement("button");
    button.type = "button";
    button.className = "nlg-cart-pay";
    button.textContent = "Pay with card";
    var status = document.createElement("p");
    status.setAttribute("role", "status");
    embedScript.after(button, status);

    var orderRef = null;
    var checkOnly = false;
    var paid = false;

    function request(action, outcome) {
      return fetch(endpoint.href, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: action, ref: orderRef, outcome: outcome }),
        cache: "no-store"
      }).then(function (response) {
        if (!response.ok) throw new Error("Store checkout unavailable");
        return response.json();
      });
    }

    function show(result) {
      checkOnly = result.status !== "unpaid";
      paid = result.status === "paid";
      button.disabled = false;
      button.textContent = paid ? "Start a new test order" : checkOnly ? "Check payment status" : "Pay with card";
      status.textContent = result.status === "paid" ? "Paid" :
        result.status === "unpaid" ? "No payment confirmed for this order." :
        "Payment is not confirmed yet. Check its status before trying again.";
    }

    function unavailable() {
      button.disabled = false;
      button.textContent = paid ? "Start a new test order" : checkOnly ? "Check payment status" : "Pay with card";
      status.textContent = checkOnly ? "Could not check payment. Try checking again." :
        "Could not open checkout. Check your cart and try again.";
    }

    function verify(outcome) {
      checkOnly = true;
      button.disabled = true;
      status.textContent = "Checking payment…";
      return request("status", outcome).then(show).catch(unavailable);
    }

    button.addEventListener("click", function () {
      if (paid) {
        button.disabled = true;
        request("reset").then(function (result) {
          orderRef = null;
          show(result);
          status.textContent = "";
        }).catch(unavailable);
        return;
      }
      if (checkOnly) { void verify(); return; }
      button.disabled = true;
      status.textContent = "Preparing checkout…";
      request("prepare").then(function (result) {
        if (result.status !== "ready") {
          if (result.ref) orderRef = result.ref;
          show(result);
          return;
        }
        var order = result.order;
        if (!order || !order.gateway || !order.ref || !order.currency ||
            !Number.isSafeInteger(order.totalCents) || order.totalCents <= 0) {
          throw new Error("Invalid store order");
        }
        orderRef = order.ref;
        status.textContent = "";
        var finished = false;
        function finish(outcome) {
          if (finished) return;
          finished = true;
          close();
          void verify(outcome);
        }
        checkout({ gateway: order.gateway, amount: order.totalCents / 100,
          currency: order.currency, ref: order.ref, item: order.item,
          onSuccess: function () { finish("submitted"); },
          onPending: function () { finish("submitted"); },
          onClose: function () { finish("closed"); } });
      }).catch(unavailable);
    });
  }
})();
