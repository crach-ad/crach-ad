'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Minus, Plus } from 'lucide-react'
import { BOOKS, CART_COOKIE, MAX_CART_CENTS, priceBookshop, readCart, type BookId, type Cart as CartItems } from '@/lib/bookshop-cart'
import './checkout.css'

const CART_KEY = 'crach-books-cart-v2'
const money = (cents: number) => (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

function syncCart(cart: CartItems) {
  document.cookie = `${CART_COOKIE}=${encodeURIComponent(JSON.stringify(cart))}; Path=/api/soltarx/checkout; SameSite=Strict`
}

export default function Cart() {
  const [cart, setCart] = useState<CartItems>({ 'quiet-atlas': 1 })
  const [loaded, setLoaded] = useState(false)
  const paymentMount = useRef<HTMLDivElement>(null)
  const [paymentLoadError, setPaymentLoadError] = useState(false)
  const total = priceBookshop(cart).totalCents
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY)
      const legacy = JSON.parse(localStorage.getItem('crach-books-cart-v1') || '1')
      const next = readCart(saved === null ? { 'quiet-atlas': legacy } : JSON.parse(saved))
      if (priceBookshop(next).totalCents <= MAX_CART_CENTS) setCart(next)
    } catch { /* Keep the default cart. */ }
    setLoaded(true)
  }, [])

  function change(id: BookId, quantity: number) {
    if (!loaded || quantity < 0 || quantity > 10) return
    const next = readCart({ ...cart, [id]: quantity })
    if (priceBookshop(next).totalCents > MAX_CART_CENTS) return
    syncCart(next)
    setCart(next)
    try { localStorage.setItem(CART_KEY, JSON.stringify(next)) } catch { /* Keep the cart in memory. */ }
  }

  useEffect(() => {
    if (loaded) syncCart(cart)
  }, [loaded, cart])

  useEffect(() => {
    if (!loaded || !paymentMount.current) return
    const mount = paymentMount.current
    const script = document.createElement('script')
    script.src = '/soltarx-staging.js'
    script.dataset.cartEndpoint = '/api/soltarx/checkout'
    script.onerror = () => setPaymentLoadError(true)
    mount.appendChild(script)
    return () => { mount.replaceChildren() }
  }, [loaded])

  return <main className="bookshop-cart">
    <header className="tc-header"><a href="/" aria-label="CRACH.AD home">CRACH<span> / books</span></a><span>THE INDEPENDENT BOOKSHOP <i /></span></header>
    <div className="tc-content">
      <p className="tc-eyebrow">GOOD BOOKS. NEW PERSPECTIVES.</p>
      <h1>Your book bag.</h1><p className="tc-intro">Your next chapter starts here.</p>
      <div className="tc-layout">
        <section className="tc-items" aria-label="Cart items">
          <div className="tc-section-title"><span>YOUR SELECTION</span><span>{count} {count === 1 ? 'item' : 'items'}</span></div>
          {!count && <p className="tc-empty-note">Your book bag is empty. Add a title below.</p>}
          {BOOKS.map(book => {
            const quantity = cart[book.id] ?? 0
            const canAdd = loaded && quantity < 10 && total + book.cents <= MAX_CART_CENTS
            return <article className={`tc-product tc-product-${book.theme}`} key={book.id}>
              <div className="tc-art" aria-hidden="true"><div className="tc-book"><span>{book.author.toUpperCase()}</span><b>{book.title}</b><small>CRACH BOOKS</small></div></div>
              <div className="tc-product-info">
                <p className="tc-eyebrow">{book.category.toUpperCase()}</p>
                <h2>{book.title}</h2><p className="tc-author">By {book.author}</p>
                <strong>{money(book.cents)} <small>USD / item</small></strong>
                {quantity ? <div className="tc-controls">
                  <div className="tc-quantity" aria-label={`${book.title} quantity controls`}>
                    <button aria-label={`Decrease ${book.title} quantity`} disabled={!loaded} onClick={() => change(book.id, quantity - 1)}><Minus size={16} /></button>
                    <output aria-label={`${book.title} quantity`}>{quantity}</output>
                    <button aria-label={`Increase ${book.title} quantity`} disabled={!canAdd} onClick={() => change(book.id, quantity + 1)}><Plus size={16} /></button>
                  </div>
                  <button className="tc-remove" aria-label={`Remove ${book.title}`} disabled={!loaded} onClick={() => change(book.id, 0)}>Remove item</button>
                </div> : <button className="tc-secondary" disabled={!canAdd} onClick={() => change(book.id, 1)}>Add {book.title} <Plus size={16} /></button>}
              </div>
            </article>
          })}
          <div className="tc-footnote"><span>THOUGHTFULLY SELECTED</span><span>INDEPENDENT VOICES</span><span>STORIES TO KEEP</span></div>
        </section>
        <aside className="tc-summary" aria-label="Order summary"><p className="tc-eyebrow">THE DETAILS</p><h2>Order summary</h2><dl><div><dt>Subtotal</dt><dd>{money(total)}</dd></div><div><dt>Shipping & tax</dt><dd>$0.00</dd></div></dl>
          <div className="tc-total" aria-live="polite"><span>Total <small>USD</small></span><strong>{money(total)}</strong></div>
          <div className="tc-embed" hidden={!count} ref={paymentMount} />
          {paymentLoadError && <p role="status">Checkout could not load. Refresh to try again.</p>}
          <p className="tc-powered">Test checkout · No real charges · $100.00 cart limit</p>
        </aside>
      </div>
      <footer className="tc-footer"><a href="/"><ArrowLeft size={14} /> Back to CRACH.AD</a><span>CRACH Books · A place for curious minds.</span></footer>
    </div>
  </main>
}
