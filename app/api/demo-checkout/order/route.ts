import { NextResponse } from 'next/server'
import { checkoutConfig, createTutorialOrder } from '@/lib/tutorial-checkout'
export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (origin !== new URL(request.url).origin || origin !== checkoutConfig().origin) return NextResponse.json({ error: 'This storefront origin is not approved for the test gateway.' }, { status: 403 })
  try {
    const raw = await request.text()
    if (raw.length > 5000) throw Error('Invalid request')
    const body = JSON.parse(raw)
    return NextResponse.json(createTutorialOrder(body.quantity, body.previousToken), { headers: { 'Cache-Control': 'no-store' } })
  } catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : 'Unable to prepare order' }, { status: 400 }) }
}
