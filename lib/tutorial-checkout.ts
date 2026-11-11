import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'

export const ITEM = 'The Quiet Atlas — paperback'
export type TutorialOrder = { ref: string; quantity: number; totalCents: number; currency: 'USD'; gateway: string; item: string }

export function checkoutConfig() {
  const fixed = process.env.TUTORIAL_FIXED_PRICE_CENTS
  const fixedCents = fixed ? Number(fixed) : null
  const validPrice = fixedCents === null || (Number.isSafeInteger(fixedCents) && fixedCents > 0 && fixedCents <= 100000)
  const origin = process.env.TUTORIAL_APPROVED_ORIGIN || ''
  const gateway = process.env.TUTORIAL_TEST_GATEWAY || ''
  // Only the documented staging host is allowed; never fall back to production.
  const script = 'https://master.soltarx.com/nlg.js'
  const enabled = process.env.TUTORIAL_TEST_GATEWAY_CONFIRMED === 'true' && Boolean(gateway && origin && validPrice && (process.env.TUTORIAL_ORDER_SECRET?.length || 0) >= 32)
  return { enabled, origin, gateway, script, fixedCents: validPrice ? fixedCents : null }
}
function signature(data: string) {
  const secret = process.env.TUTORIAL_ORDER_SECRET
  if (!secret || secret.length < 32) throw Error('Test order signing is not configured')
  return createHmac('sha256', secret).update(data).digest()
}
export function readTutorialOrder(token: unknown): TutorialOrder {
  if (typeof token !== 'string' || token.length > 4000) throw Error('Invalid order')
  const [data, sig, extra] = token.split('.')
  if (!data || !sig || extra) throw Error('Invalid order')
  const actual = Buffer.from(sig, 'base64url'), expected = signature(data)
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) throw Error('Invalid order')
  const order = JSON.parse(Buffer.from(data, 'base64url').toString()) as TutorialOrder
  const config = checkoutConfig()
  if (!/^TUTORIAL-[0-9a-f-]{36}$/.test(order.ref) || (config.fixedCents !== null && order.quantity !== 1) || order.gateway !== config.gateway || order.currency !== 'USD' || !Number.isInteger(order.quantity) || order.quantity < 1 || order.quantity > 10 || order.totalCents !== (config.fixedCents ?? order.quantity * 1000)) throw Error('Invalid order')
  return order
}
export function createTutorialOrder(quantity: unknown, previousToken?: unknown) {
  const config = checkoutConfig()
  if (!config.enabled) throw Error('Test gateway setup is incomplete')
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1 || quantity > 10 || (config.fixedCents !== null && quantity !== 1)) throw Error('Invalid quantity')
  if (previousToken) {
    const old = readTutorialOrder(previousToken)
    if (old.quantity === quantity) return { order: old, token: previousToken as string }
  }
  const order: TutorialOrder = { ref: `TUTORIAL-${randomUUID()}`, quantity, totalCents: config.fixedCents ?? quantity * 1000, currency: 'USD', gateway: config.gateway, item: `${ITEM} × ${quantity}` }
  const data = Buffer.from(JSON.stringify(order)).toString('base64url')
  return { order, token: `${data}.${signature(data).toString('base64url')}` }
}
