'use client'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'
import { CATALOG } from '@/lib/demo-catalog'
import type { Order } from '@/lib/demo-store'
import './store.css'
const KEY='crach-demo-order-v1'
const dollars=(c:number)=>(c/100).toLocaleString('en-US',{style:'currency',currency:'USD'})
export default function Store(){
  const [quantities,setQuantities]=useState<Record<string,number>>({notebook:1})
  const [coupon,setCoupon]=useState('')
  const [saved,setSaved]=useState<{order:Order;token:string}|null>(null)
  const [ready,setReady]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(''),[status,setStatus]=useState(''),[sale,setSale]=useState('')
  const lock=useRef(false)
  useEffect(()=>{try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s?.order&&s?.token){setSaved(s);setQuantities(Object.fromEntries(s.order.lines.map((l:any)=>[l.id,l.quantity])));setCoupon(s.order.coupon);setStatus('saved')}}catch{}},[])
  function change(id:string,q:number){setQuantities(v=>({...v,[id]:Math.max(0,Math.min(10,q))}));setSaved(null);setStatus('');setSale('');localStorage.removeItem(KEY)}
  async function verify(token:string){
    setStatus('checking');setError('')
    try{const r=await fetch('/api/demo-store/status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token})});const d=await r.json();if(!r.ok)throw Error(d.error);setStatus(d.status);setSale(d.saleId||'');setSaved({order:d.order,token})}catch(e){setStatus('saved');setError(e instanceof Error?e.message:'Could not check payment')}
  }
  async function checkout(){
    if(lock.current||!ready)return;lock.current=true;setBusy(true);setError('')
    try{
      const r=await fetch('/api/demo-store/order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lines:CATALOG.filter(p=>quantities[p.id]>0).map(p=>({id:p.id,quantity:quantities[p.id]})),coupon,previousToken:saved?.token})});const d=await r.json();if(!r.ok)throw Error(d.error)
      setSaved(d);localStorage.setItem(KEY,JSON.stringify(d));setStatus('awaiting_payment')
      const nlg=(window as any).NLG;if(!nlg)throw Error('Payment form is still loading')
      nlg.checkout({gateway:d.order.gateway,amount:d.order.totalCents/100,currency:d.order.currency,ref:d.order.ref,item:'Crach Co demo cart',onSuccess:()=>{nlg.close();void verify(d.token)},onPending:()=>{nlg.close();void verify(d.token)},onClose:()=>{void verify(d.token)}})
    }catch(e){setError(e instanceof Error?e.message:'Could not open checkout')}finally{lock.current=false;setBusy(false)}
  }
  function reset(){localStorage.removeItem(KEY);setSaved(null);setStatus('');setSale('');setError('');setQuantities({notebook:1});setCoupon('')}
  const subtotal=CATALOG.reduce((n,p)=>n+p.cents*(quantities[p.id]||0),0)
  const discount=coupon.trim().toUpperCase()==='DEMO10'?Math.round(subtotal*.1):0
  const paid=status==='paid'
  return <main className="demo-store">
    <Script src="https://master.soltarx.com/nlg.js" onReady={()=>setReady(true)} onError={()=>setError('Unable to load the staging checkout. Refresh to try again.')} />
    <div className="demo-banner">STAGING DEMO <span>Test cards only · No real purchases or deliveries</span></div>
    <header className="demo-header"><a href="/demo-store">CRACH CO<span>THE DEMO COLLECTION</span></a><span>Cart <b>{Object.values(quantities).reduce((a,b)=>a+b,0)}</b></span></header>
    <div className="demo-intro"><p>A SMALL STORE. A COMPLETE PAYMENT FLOW.</p><h1>Good ideas,<br/>ready to go.</h1><p>Pick a few things. Build your cart. Try checkout.</p></div>
    <div className="demo-layout"><section className="demo-products" aria-label="Products">{CATALOG.map(p=><article className="demo-product" key={p.id}>
      <div className={'demo-art '+p.id} style={{background:p.color}}><span className="demo-number">{p.icon} / CRACH CO</span><div className="demo-object"><span>{p.id==='notebook'?'IDEAS':p.id==='tote'?'MAKE\nSOMETHING':'STAY\nCURIOUS'}</span></div></div>
      <div className="demo-product-heading"><h2>{p.name}</h2><strong>{dollars(p.cents)}</strong></div><p>{p.description}</p>
      <div className="demo-quantity"><button aria-label={'Remove one '+p.name} disabled={paid||!quantities[p.id]} onClick={()=>change(p.id,(quantities[p.id]||0)-1)}>−</button><span aria-label={p.name+' quantity'}>{quantities[p.id]||0}</span><button aria-label={'Add one '+p.name} disabled={paid||(quantities[p.id]||0)>=10} onClick={()=>change(p.id,(quantities[p.id]||0)+1)}>+</button></div>
    </article>)}</section>
    <aside className="demo-cart"><p className="demo-eyebrow">YOUR SELECTION</p><h2>{paid?'Order confirmed':'The cart'}</h2>
      {!subtotal&&<p>Your cart is empty. Add something to get started.</p>}
      {CATALOG.filter(p=>quantities[p.id]>0).map(p=><div className="demo-line" key={p.id}><span>{p.name} × {quantities[p.id]}</span><strong>{dollars(p.cents*quantities[p.id])}</strong></div>)}
      <label htmlFor="demo-discount">Demo discount code</label><div className="demo-coupon"><input id="demo-discount" value={coupon} placeholder="Try DEMO10" disabled={paid} onChange={e=>{setCoupon(e.target.value);setSaved(null);setStatus('');localStorage.removeItem(KEY)}}/></div>
      <div className="demo-line"><span>Subtotal</span><span>{dollars(subtotal)}</span></div><div className="demo-line"><span>Discount</span><span>−{dollars(discount)}</span></div><div className="demo-line"><span>Demo shipping & tax</span><span>$0.00</span></div>
      <div className="demo-total"><span>Total <small>USD</small></span><strong>{dollars(saved?.order.totalCents??subtotal-discount)}</strong></div>
      {error&&<p role="alert" className="demo-error">{error}</p>}
      {paid?<div className="demo-success" role="status">Payment verified by the server.<br/><small>Receipt: {sale}</small></div>:<button className="demo-checkout" disabled={!ready||busy||!subtotal} onClick={checkout}>{busy?'Preparing your order…':!ready?'Loading checkout…':saved?'Resume checkout →':'Checkout →'}</button>}
      <p className="demo-small">Powered by SoltarX · Staging test payment</p>
      {saved&&<div className="demo-order"><p>Order reference</p><code>{saved.order.ref}</code><p role="status">{status==='checking'?'Checking payment…':status==='mismatch'?'A payment was found, but it does not match this order. Nothing will be fulfilled.':status==='awaiting_payment'?'Awaiting confirmed payment.':status==='paid'?'Paid · No physical goods will be shipped.':'Order saved. You can resume checkout.'}</p>{!paid&&<button onClick={()=>verify(saved.token)} disabled={status==='checking'}>Check payment status</button>}<button onClick={reset}>Start a new demo order</button></div>}
    </aside></div>
    <footer className="demo-footer">Made for testing, not shopping.<span>Prices are recalculated by the server. Payment must match the saved order.</span></footer>
  </main>
}
