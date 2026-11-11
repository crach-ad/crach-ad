import assert from 'node:assert/strict'
import { checkoutConfig, createTutorialOrder, readTutorialOrder } from '../lib/tutorial-checkout.ts'
process.env.TUTORIAL_ORDER_SECRET = 'test-only-secret-at-least-32-characters'
process.env.TUTORIAL_TEST_GATEWAY = 'test-gateway'
process.env.TUTORIAL_APPROVED_ORIGIN = 'http://127.0.0.1:3011'
delete process.env.TUTORIAL_FIXED_PRICE_CENTS
delete process.env.TUTORIAL_TEST_GATEWAY_CONFIRMED
assert.equal(checkoutConfig().enabled, false)
assert.throws(() => createTutorialOrder(1))
process.env.TUTORIAL_TEST_GATEWAY_CONFIRMED = 'true'
const first = createTutorialOrder(1)
assert.equal(first.order.totalCents, 1000)
assert.equal(first.order.currency, 'USD')
assert.equal(createTutorialOrder(1, first.token).order.ref, first.order.ref)
assert.notEqual(createTutorialOrder(2, first.token).order.ref, first.order.ref)
assert.equal(createTutorialOrder(2).order.totalCents, 2000)
assert.notEqual(createTutorialOrder(1).order.ref, first.order.ref)
const forged = Buffer.from(JSON.stringify({ ...first.order, totalCents: 1 })).toString('base64url') + '.' + first.token.split('.')[1]
assert.throws(() => readTutorialOrder(forged))
for (const value of [0, -1, 11, 1.5, '1', null]) assert.throws(() => createTutorialOrder(value))
process.env.TUTORIAL_FIXED_PRICE_CENTS = '1500'
assert.equal(createTutorialOrder(1).order.totalCents, 1500)
assert.throws(() => createTutorialOrder(2))
assert.throws(() => readTutorialOrder(first.token))
process.env.TUTORIAL_FIXED_PRICE_CENTS = '-1'
assert.equal(checkoutConfig().enabled, false)
assert.throws(() => createTutorialOrder(1))
console.log('PASS: setup gating, authoritative amounts, order reuse, unique orders, tamper rejection, quantity validation, fixed-price enforcement')
