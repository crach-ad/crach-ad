import { randomUUID } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { readOrder, signOrder, type Order } from '@/lib/demo-store'

import { CART_COOKIE, MAX_CART_CENTS, priceBookshop, readCart } from '@/lib/bookshop-cart'

const BOOKSHOP_GATEWAY = '654e35a1'
const ORDER_COOKIE = 'crach_bookshop_test_one_order'
const PENDING_COOKIE = 'crach_bookshop_test_one_pending'
const VERIFY_URL = 'https://master.soltarx.com/api/demo-store/verify'
const WEEK = 7 * 86_400

function reply(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

async function verify(token: string) {
  const response = await fetch(VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
    cache: 'no-store',
    signal: AbortSignal.timeout(12_000),
  })
  if (!response.ok) throw new Error('Verification unavailable')
  const result = await response.json()
  if (result.status === 'paid') return 'paid'
  if (result.status === 'awaiting_payment') return 'unpaid'
  return 'pending'
}

export async function POST(req: NextRequest) {
  const protocol = req.headers.get('x-forwarded-proto') === 'https' ? 'https:' : new URL(req.url).protocol
  const host = req.headers.get('host') || new URL(req.url).host
  if (req.headers.get('origin') !== protocol + '//' + host) {
    return reply({ error: 'Invalid origin' }, 403)
  }

  try {
    const raw = await req.text()
    if (raw.length > 512) return reply({ error: 'Invalid request' }, 400)
    const { action, ref, outcome } = JSON.parse(raw)
    if (action !== 'prepare' && action !== 'status' && action !== 'reset') {
      return reply({ error: 'Invalid action' }, 400)
    }

    const previousToken = req.cookies.get(ORDER_COOKIE)?.value
    const previous = previousToken ? readOrder(previousToken, BOOKSHOP_GATEWAY) : null
    if (ref && previous?.ref !== ref) {
      return reply({ error: 'Order changed. Refresh the cart.' }, 409)
    }

    const cookieOptions = {
      httpOnly: true, secure: protocol === 'https:', sameSite: 'strict' as const,
      path: '/api/soltarx/checkout', maxAge: WEEK,
    }
    if (previous && previousToken) {
      const submitted = action === 'status' && ref === previous.ref && outcome === 'submitted'
      const wasSubmitted = submitted || req.cookies.get(PENDING_COOKIE)?.value === previous.ref
      // A browser event may only move an order to pending, never to paid.
      let status: string
      try { status = await verify(previousToken) } catch { status = 'pending' }
      if (wasSubmitted && status === 'unpaid') status = 'pending'
      if (action === 'reset') {
        if (status !== 'paid') return reply({ error: 'Current payment is not confirmed.' }, 409)
        const response = reply({ status: 'unpaid' })
        for (const name of [ORDER_COOKIE, PENDING_COOKIE]) response.cookies.set(name, '', { ...cookieOptions, maxAge: 0 })
        return response
      }
      if (action === 'status' || status !== 'unpaid') {
        const response = reply({ status, ref: previous.ref })
        if (wasSubmitted && status !== 'paid') response.cookies.set(PENDING_COOKIE, previous.ref, cookieOptions)
        return response
      }
    } else if (action !== 'prepare') {
      return reply({ error: 'No active order' }, 404)
    }

    let priced: ReturnType<typeof priceBookshop>
    try {
      const value = req.cookies.get(CART_COOKIE)?.value
      priced = priceBookshop(readCart(value ? JSON.parse(value) : {}))
    } catch {
      return reply({ error: 'Invalid bookshop cart.' }, 400)
    }
    const { totalCents, lines, item } = priced
    if (!totalCents || totalCents > MAX_CART_CENTS) {
      return reply({ error: 'Choose books with a total between $0.50 and $100.00.' }, 400)
    }
    const order: Order = previous?.totalCents === totalCents && JSON.stringify(previous.lines) === JSON.stringify(lines) ? previous : {
      ref: 'SHOP-' + randomUUID(),
      gateway: BOOKSHOP_GATEWAY,
      currency: 'USD',
      totalCents,
      subtotalCents: totalCents,
      discountCents: 0,
      lines,
      coupon: '',
      expires: Date.now() + WEEK * 1000,
    }
    const token = signOrder(order)
    // Fail before opening a new checkout if staging cannot verify this order.
    if (order !== previous && await verify(token) !== 'unpaid') {
      return reply({ error: 'Unable to prepare this order.' }, 503)
    }
    const response = reply({
      status: 'ready',
      order: { gateway: order.gateway, ref: order.ref, totalCents, currency: order.currency, item },
    })
    response.cookies.set(ORDER_COOKIE, token, cookieOptions)
    return response
  } catch {
    return reply({ error: 'Checkout is temporarily unavailable.' }, 503)
  }
}
