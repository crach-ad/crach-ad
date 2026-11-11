# Bookshop cart

Live page: https://crachad.com/checkout
Source: app/checkout/cart.tsx
Styles: app/checkout/checkout.css
The old /demo/checkout route redirects to /checkout.

This is a standalone client-side cart with no payment integration. It starts with
one $10 USD paperback. Quantity controls, removal, empty-cart recovery, subtotal
and total updates work. Quantity is saved locally under crach-books-cart-v1.

The Pay with card button has ID bookshop-pay-button and is deliberately unconnected:
there is no click handler, payment script, gateway configuration, overlay, callback,
order API, signing secret, or verification endpoint for this cart. Add the payment
integration from scratch in app/checkout/cart.tsx for the recording.

The page remains out of navigation and has noindex/nofollow metadata. Existing
independent /gateway and /demo-store pages are not part of this checkout.
