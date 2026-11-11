'use client'
import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Minus, Plus, ShoppingBag } from 'lucide-react'
import './checkout.css'

const CART_KEY = 'crach-books-cart-v1'
const UNIT_PRICE_CENTS = 1000
const money = (cents: number) => (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

export default function Cart() {
  const [quantity, setQuantity] = useState(1)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY)
      if (saved !== null) {
        const value = JSON.parse(saved)
        if (Number.isInteger(value) && value >= 0 && value <= 10) setQuantity(value)
      }
    } catch { /* The cart still works when browser storage is unavailable. */ }
    setLoaded(true)
  }, [])

  function change(next: number) {
    if (!loaded || !Number.isInteger(next) || next < 0 || next > 10) return
    setQuantity(next)
    try { localStorage.setItem(CART_KEY, JSON.stringify(next)) } catch { /* Keep the cart in memory. */ }
  }

  const total = quantity * UNIT_PRICE_CENTS
  return <main className="bookshop-cart">
    <header className="tc-header"><a href="/" aria-label="CRACH.AD home">CRACH<span> / books</span></a><span>THE INDEPENDENT BOOKSHOP <i /></span></header>
    <div className="tc-content">
      <p className="tc-eyebrow">GOOD BOOKS. NEW PERSPECTIVES.</p>
      <h1>Your book bag.</h1><p className="tc-intro">Your next chapter starts here.</p>
      <div className="tc-layout">
        <section className="tc-items" aria-label="Cart items">
          <div className="tc-section-title"><span>YOUR SELECTION</span><span>{quantity} {quantity === 1 ? 'item' : 'items'}</span></div>
          {quantity ? <article className="tc-product">
            <div className="tc-art" aria-hidden="true"><div className="tc-book"><span>ROWAN ELLIS</span><b>The Quiet<br/>Atlas.</b><small>NOTES ON FINDING YOUR WAY</small></div></div>
            <div className="tc-product-info"><p className="tc-eyebrow">TRAVEL &amp; ESSAYS</p><h2>The Quiet Atlas</h2><p className="tc-author">By Rowan Ellis</p><p>Notes on finding your way.<br/>Paperback · English · 224 pages</p><p className="tc-seller">Sold by <strong>CRACH Books</strong></p><strong>{money(UNIT_PRICE_CENTS)} <small>USD / item</small></strong>
              <div className="tc-controls"><div className="tc-quantity" aria-label="Quantity controls"><button aria-label="Decrease quantity" disabled={!loaded || quantity <= 1} onClick={() => change(quantity - 1)}><Minus size={16} /></button><output aria-label="Quantity">{quantity}</output><button aria-label="Increase quantity" disabled={!loaded || quantity >= 10} onClick={() => change(quantity + 1)}><Plus size={16} /></button></div><button className="tc-remove" disabled={!loaded} onClick={() => change(0)}>Remove item</button></div>
            </div>
          </article> : <div className="tc-empty"><ShoppingBag size={36} strokeWidth={1} /><h2>Room for a good book.</h2><p>Your book bag is empty. Add The Quiet Atlas to get started.</p><button className="tc-secondary" onClick={() => change(1)}>Add The Quiet Atlas <Plus size={16} /></button></div>}
          <div className="tc-footnote"><span>THOUGHTFULLY SELECTED</span><span>INDEPENDENT VOICES</span><span>STORIES TO KEEP</span></div>
        </section>
        <aside className="tc-summary" aria-label="Order summary"><p className="tc-eyebrow">THE DETAILS</p><h2>Order summary</h2><dl><div><dt>Subtotal</dt><dd>{money(total)}</dd></div><div><dt>Shipping & tax</dt><dd>$0.00</dd></div></dl>
          <div className="tc-total" aria-live="polite"><span>Total <small>USD</small></span><strong>{money(total)}</strong></div>
          <button id="bookshop-pay-button" type="button" className="tc-pay" disabled={!loaded || !quantity}>Pay with card<ArrowUpRight size={20} /></button>
          <p className="tc-powered">All prices in USD</p>
        </aside>
      </div>
      <footer className="tc-footer"><a href="/"><ArrowLeft size={14} /> Back to CRACH.AD</a><span>CRACH Books · A place for curious minds.</span></footer>
    </div>
  </main>
}
