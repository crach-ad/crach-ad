import { NextResponse } from 'next/server'
import { readTutorialOrder } from '@/lib/tutorial-checkout'
export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  try {
    const raw = await request.text()
    if (raw.length > 5000) throw Error('Invalid request')
    readTutorialOrder(JSON.parse(raw).token)
    // A browser event is not payment evidence. Add a real, authenticated server
    // verifier here before returning any paid or retry-safe state.
    return NextResponse.json({ status: 'verification_blocked', error: 'Payment verification is not configured. Your order is preserved; do not pay again.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  } catch { return NextResponse.json({ error: 'Invalid saved order' }, { status: 400 }) }
}
