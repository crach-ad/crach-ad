import assert from 'node:assert/strict'
import {createOrder,readOrder,priceCart} from '../lib/demo-store'
process.env.DEMO_STOREFRONT_SECRET='local-test-only-not-a-real-secret-12345'
const cart={lines:[{id:'notebook',quantity:2},{id:'tote',quantity:1}],coupon:'DEMO10'}
assert.equal(priceCart(cart).totalCents,315)
assert.equal(priceCart({...cart,totalCents:1,lines:[{id:'print',quantity:2,cents:1}]}).totalCents,450)
const a=createOrder(cart),b=createOrder({...cart,previousToken:a.token})
assert.equal(a.order.ref,b.order.ref)
assert.equal(readOrder(a.token).totalCents,315)
assert.notEqual(createOrder({...cart,lines:[{id:'print',quantity:1}],previousToken:a.token}).order.ref,a.order.ref)
const tampered=Buffer.from(JSON.stringify({...a.order,totalCents:1})).toString('base64url')+'.'+a.token.split('.')[1]
assert.throws(()=>readOrder(tampered))
for(const quantity of [-1,0,11,1.5])assert.throws(()=>priceCart({lines:[{id:'notebook',quantity}]}))
assert.throws(()=>priceCart({lines:[{id:'unknown',quantity:1}]}))
assert.throws(()=>priceCart({lines:[{id:'tote',quantity:1},{id:'tote',quantity:1}]}))
assert.throws(()=>priceCart({...cart,coupon:'FREE'}))
console.log('PASS: server prices, discount rounding, retry identity, changed cart, token tampering, invalid cart')
