# Checkout tutorial demo

Local preview: http://127.0.0.1:3011/checkout
Target path: https://crachad.com/checkout.
Run `npm run dev -- --hostname 127.0.0.1 --port 3011`.

The new route is excluded from navigation and has noindex/nofollow metadata.
It starts with one fictional $10 USD notebook; quantities range from 1 to 10.
Removal empties the cart; Restore demo item returns one item. Shipping/tax are zero.
A local order reference survives overlay close/reopen and refresh. Changing the
cart generates a new reference. No card data or credentials are collected.

## Current integration blockers

The existing repository documents https://master.soltarx.com/nlg.js and staging
gateway d803a1e4. Public checkout inspection on 2026-11-11 showed that gateway
active, seller Protocol Platform Co, approvedUrl null. This is not an approved
origin match. The designated seller's Account → Gateway → Embed snippet has not
been supplied/confirmed for this separate build. No verification secret or
endpoint contract is configured for this new tutorial. The old demo-store
integration is deliberately not reused without confirmation.

Default behavior is an explicitly labeled layout-only overlay. It contains no
fake card fields, success simulation, or payment submission. The real embed call
is implemented but gated. Neither a callback nor the current server status
endpoint can return Paid.

## Enable the designated staging embed

First confirm the seller's actual Embed snippet, active gateway, staging payment
environment, approved origin, and any fixed price. The script is restricted to
https://master.soltarx.com/nlg.js; change it only after checking the supplied
snippet if the designated test environment differs.

Set server environment variables (never NEXT_PUBLIC secrets):
- TUTORIAL_TEST_GATEWAY: confirmed test gateway ID
- TUTORIAL_APPROVED_ORIGIN: exact origin approved in SoltarX, matching the preview
  host or deployed site, including scheme and port; no path or trailing slash
- TUTORIAL_TEST_GATEWAY_CONFIRMED=true: only after the checks above
- TUTORIAL_ORDER_SECRET: a securely generated value of at least 32 characters
- TUTORIAL_FIXED_PRICE_CENTS: optional integer cents from the gateway's fixed-price
  configuration; leave absent for variable $10-per-item pricing

Restart the server after configuring. A nonmatching browser origin stays in
preview mode. The order endpoint also enforces the configured origin, calculates
prices server-side, and signs the amount, currency, gateway and reference.
Fixed-price gateways restrict quantity to one. A real saved order freezes cart
edits so a previous payment cannot become detached from its displayed order.
Closing checkout preserves the signed order and retries reuse its reference.

## Payment verification is blocked

`app/api/demo-checkout/status/route.ts` validates the saved order then returns
503 verification_blocked. Implement an authenticated server-to-server verifier
against the designated test environment. It must match the signed order's
reference, gateway, exact amount in cents, and USD to authoritative settlement
records before returning Paid. Persist orders/payment attempts and known pending
states durably, use provider idempotency, and reconcile callbacks/webhooks before
production use. Do not treat browser storage as an authoritative ledger.

The current onPending and onSuccess callbacks only lock the order and request
verification. A pending order stays locked across closing/reopening and refresh.
Verification failures do not clear that lock. No test payment has been attempted.
Browser-local persistence is a demo convenience, not cross-device reconciliation;
clearing storage loses the local order. Do not enable payment submission for a
public release until durable verification is in place.

## Validation

`node tests/tutorial-checkout.test.mjs` checks setup gating, integer server prices,
reference reuse/uniqueness, tamper rejection, quantity validation and fixed price.
Browser QA: quantity 1 → 2 → 1, removal, disabled empty-cart pay button, recovery,
$10 overlay amount, close/return, same reference after refresh, mobile layout.
Real embed opening, payment amounts at the provider, pending settlement and a
verified test outcome require the configuration above and remain unverified.
Full-project TypeScript currently reports pre-existing Framer Motion variant type
errors in animated-header.tsx and framer-animated-logo.tsx.

## Bookshop presentation update

The user will add the embed manually. The customer-facing page now presents
CRACH Books and The Quiet Atlas, with no demo, fictional-product or integration
setup labels. The route remains unlisted at /checkout; /demo/checkout redirects there. No payment is enabled
by this presentation change. Without an embed, Pay with card displays a normal
payment-unavailable message and preserves the bag; the placeholder modal is gone.

Manual hookup: `app/checkout/cart.tsx`, `checkout()` contains the marked
integration point. The button has the stable ID `bookshop-pay-button` and updated
`data-amount`, `data-currency`, `data-order-reference`, `data-item` attributes.
Read them at click time, not once at script load. The amount is in dollars.
The existing gated embed path and server pricing/signing remain available.
Use the existing pending lock/verification flow when installing the snippet;
browser data attributes and callbacks are not proof of payment.
