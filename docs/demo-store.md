# Demo storefront

`/demo-store` embeds only https://master.soltarx.com/nlg.js and gateway d803a1e4.
The existing production `/gateway` example is unchanged. No inventory is fulfilled.

Prices are defined server-side in lib/demo-catalog.ts. The order API accepts IDs,
quantities and DEMO10, and ignores browser-provided prices. Orders have integer-cent
totals and unique references. An unchanged cart reuses its signed order on retry.
The signed order is retained in browser storage for seven days; this is a demo,
not a durable merchant order database. Clearing storage loses that saved order.

DEMO_STOREFRONT_SECRET is server-only in the website and staging SoltarX project.
The status API validates the signature and asks staging SoltarX to verify the
actual sale. The verifier is restricted to the staging database and gateway.
It checks completed Crossmint staging settlement, USD, and exact gross amount.
A browser success callback is only a signal to check, never proof of payment.

The existing payment embed still accepts browser-editable amounts. A modified
amount cannot mark this signed order paid, but can create an unmatched staging
payment. Production merchant integration should additionally bind checkout creation
to a server-created order and persist merchant orders durably, with reconciliation.

Test: node --import /path/to/tsx/dist/loader.mjs tests/demo-store.test.ts
Manual: add two notebooks and a tote, DEMO10 => $3.15. Open checkout, close,
resume, refresh (same reference), then complete a staging card payment and confirm
server-verified Paid. New demo order must use a different reference.
