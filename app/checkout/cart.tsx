'use client'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import type { TutorialOrder } from '@/lib/tutorial-checkout'
import './checkout.css'

type Config = { enabled: boolean; origin: string; gateway: string; script: string; fixedCents: number | null }
type Saved = { order: TutorialOrder; token: string }
type State = { quantity: number; ref: string; saved: Saved | null; pending: boolean }
type Embed = { checkout(options: { gateway: string; amount: number; currency: string; ref: string; item: string; onSuccess(): void; onPending(): void; onClose(): void }): void; close(): void }
const KEY = 'crach-tutorial-cart-v1'
const money = (cents: number) => (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
const fresh = (quantity = 1): State => ({ quantity, ref: `TUTORIAL-${crypto.randomUUID()}`, saved: null, pending: false })
export default function Cart({ config }: { config: Config }) {
  const [cart, setCart] = useState<State | null>(null)
  const current = useRef<State | null>(null)
  const [ready, setReady] = useState(false), [busy, setBusy] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const [error, setError] = useState(''), [notice, setNotice] = useState('')
  const [originMatches, setOriginMatches] = useState(false)
  const lock = useRef(false)
  const payButton = useRef<HTMLButtonElement>(null)
  function save(next: State) {
    current.current = next; setCart(next)
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { setError('Browser storage is unavailable. Keep this tab open to preserve your order.') }
  }
  useEffect(() => {
    let next = fresh()
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || 'null')
      if (stored && Number.isInteger(stored.quantity) && stored.quantity >= 0 && stored.quantity <= 10 && typeof stored.ref === 'string' && typeof stored.pending === 'boolean') next = stored
    } catch { /* An invalid local cart starts empty of payment state. */ }
    if (config.fixedCents !== null && next.quantity > 1 && !next.pending && !next.saved) next = fresh(1)
    save(next)
    setOriginMatches(window.location.origin === config.origin)
    return () => { (window as unknown as { NLG?: Embed }).NLG?.close() }
  // Configuration is fixed for the lifetime of this page.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const real = config.enabled && originMatches
  const quantity = cart?.quantity ?? 1
  const total = cart?.saved?.order.totalCents ?? (quantity ? (config.fixedCents ?? quantity * 1000) : 0)
  const locked = Boolean(cart?.pending || cart?.saved || overlay || busy)
  function change(next: number) {
    if (locked || !cart) return
    save(fresh(next)); setNotice(''); setError('')
  }
  async function verify(saved: Saved) {
    setNotice('Checking payment status…')
    try {
      const response = await fetch('/api/demo-checkout/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: saved.token }) })
      const result = await response.json()
      // There is intentionally no client-side transition to Paid.
      setNotice(result.error || 'Payment verification is blocked. Your order is preserved.')
    } catch { setNotice('Unable to verify payment. Your order is preserved; do not pay again.') }
  }
  function closeEmbed() {
    (window as unknown as { NLG?: Embed }).NLG?.close()
    setOverlay(false); payButton.current?.focus()
    const saved = current.current?.saved
    if (saved) void verify(saved)
  }
  useEffect(() => {
    if (!overlay) return
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') closeEmbed() }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlay])
  async function checkout() {
    if (!cart || !quantity || cart.pending || lock.current) return
    // Manual embed integration point: replace this branch when adding your snippet.
    // Keep the amount, currency and stable cart.ref; never mark paid from a callback.
    if (!real) { setError('Card payments are currently unavailable. Your cart has been saved. Please try again shortly.'); return }
    if (!ready) return
    lock.current = true; setBusy(true); setError('')
    try {
      let saved = cart.saved
      if (!saved) {
        const response = await fetch('/api/demo-checkout/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ quantity }) })
        const result = await response.json()
        if (!response.ok) throw Error(result.error)
        saved = result as Saved
        if (saved.order.totalCents !== total || saved.order.currency !== 'USD' || saved.order.quantity !== quantity) throw Error('Checkout total does not match the cart. Refresh before continuing.')
        save({ ...cart, ref: saved.order.ref, saved })
      }
      const nlg = (window as unknown as { NLG?: Embed }).NLG
      if (!nlg) throw Error('Checkout has not loaded. Refresh to retry.')
      const order = saved
      const pending = () => {
        if (current.current) save({ ...current.current, pending: true })
        closeEmbed(); void verify(order)
      }
      nlg.checkout({ gateway: saved.order.gateway, amount: saved.order.totalCents / 100, currency: 'USD', item: saved.order.item, ref: saved.order.ref, onPending: pending, onSuccess: pending, onClose: closeEmbed })
      setOverlay(true)
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to open checkout') }
    finally { lock.current = false; setBusy(false) }
  }
  return <main className="tutorial-cart">
    {real && <Script src={config.script} onReady={() => setReady(true)} onError={() => setError('SoltarX checkout could not load. Refresh to retry.')} />}
    <header className="tc-header"><a href="/" aria-label="CRACH.AD home">CRACH<span> / books</span></a><span>THE INDEPENDENT BOOKSHOP <i /></span></header>
    <div className="tc-content">
      <p className="tc-eyebrow">GOOD BOOKS. NEW PERSPECTIVES.</p>
      <h1>Your book bag.</h1><p className="tc-intro">Your next chapter starts here.</p>
      <div className="tc-layout">
        <section className="tc-items" aria-label="Cart items">
          <div className="tc-section-title"><span>YOUR SELECTION</span><span>{quantity} {quantity === 1 ? 'item' : 'items'}</span></div>
          {quantity ? <article className="tc-product">
            <div className="tc-art" aria-hidden="true"><div className="tc-book"><span>ROWAN ELLIS</span><b>The Quiet<br/>Atlas.</b><small>NOTES ON FINDING YOUR WAY</small></div></div>
            <div className="tc-product-info"><p className="tc-eyebrow">TRAVEL &amp; ESSAYS</p><h2>The Quiet Atlas</h2><p className="tc-author">By Rowan Ellis</p><p>Notes on finding your way.<br/>Paperback · English · 224 pages</p><p className="tc-seller">Sold by <strong>CRACH Books</strong></p><strong>{money(config.fixedCents ?? 1000)} <small>USD / item</small></strong>
              <div className="tc-controls"><div className="tc-quantity" aria-label="Quantity controls"><button aria-label="Decrease quantity" disabled={locked || quantity <= 1 || config.fixedCents !== null} onClick={() => change(quantity - 1)}><Minus size={16} /></button><output aria-label="Quantity">{quantity}</output><button aria-label="Increase quantity" disabled={locked || quantity >= 10 || config.fixedCents !== null} onClick={() => change(quantity + 1)}><Plus size={16} /></button></div><button className="tc-remove" disabled={locked} onClick={() => change(0)}>Remove item</button></div>
              {config.fixedCents !== null && <p className="tc-small">This edition is limited to one per order.</p>}
            </div>
          </article> : <div className="tc-empty"><ShoppingBag size={36} strokeWidth={1} /><h2>Room for a good book.</h2><p>Your book bag is empty. Add The Quiet Atlas to get started.</p><button className="tc-secondary" onClick={() => change(1)}>Add The Quiet Atlas <Plus size={16} /></button></div>}
          <div className="tc-footnote"><span>THOUGHTFULLY SELECTED</span><span>INDEPENDENT VOICES</span><span>STORIES TO KEEP</span></div>
        </section>
        <aside className="tc-summary" aria-label="Order summary"><p className="tc-eyebrow">THE DETAILS</p><h2>Order summary</h2><dl><div><dt>Subtotal</dt><dd>{money(total)}</dd></div><div><dt>Shipping & tax</dt><dd>$0.00</dd></div></dl>
          <div className="tc-total" aria-live="polite"><span>Total <small>USD</small></span><strong>{money(total)}</strong></div>
          <button id="bookshop-pay-button" ref={payButton} className="tc-pay" data-amount={total / 100} data-currency="USD" data-order-reference={cart?.ref} data-item="The Quiet Atlas" disabled={!cart || !quantity || cart.pending || busy || overlay || (real && !ready)} onClick={checkout}>{cart?.pending ? 'Payment processing' : busy ? 'Preparing order…' : real && !ready ? 'Loading checkout…' : 'Pay with card'}<ArrowUpRight size={20} /></button>
          <p className="tc-powered">All prices in USD</p>
          {cart?.pending && <p role="status">Payment processing. This order is locked to prevent another payment.</p>}
          {error && <p role="alert" className="tc-error">{error}</p>}{notice && <p role="status" className="tc-setup">{notice}</p>}
          {cart && quantity > 0 && <div className="tc-reference"><span>YOUR ORDER</span><code>#{cart.ref.slice(-8).toUpperCase()}</code><p>Your bag is saved for when you’re ready.</p></div>}
          {cart?.saved && <button className="tc-remove" onClick={() => verify(cart.saved!)}>Check payment status</button>}
        </aside>
      </div>
      <footer className="tc-footer"><a href="/"><ArrowLeft size={14} /> Back to CRACH.AD</a><span>CRACH Books · A place for curious minds.</span></footer>
    </div>
    {overlay && <button className="tc-embed-close" onClick={closeEmbed} aria-label="Close SoltarX checkout"><X size={18} /> Return to cart</button>}
  </main>
}
