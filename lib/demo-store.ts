import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'
export const GATEWAY = 'd803a1e4'
import { CATALOG } from './demo-catalog'
export type Order = { ref: string; gateway: string; currency: 'USD'; totalCents: number; subtotalCents: number; discountCents: number; lines: { id: string; quantity: number }[]; coupon: string; expires: number }
function secret() { const s = process.env.DEMO_STOREFRONT_SECRET; if (!s || s.length < 32) throw Error('Demo checkout is not configured'); return s }
export function signOrder(order: Order) { const data=Buffer.from(JSON.stringify(order)).toString('base64url');return data+'.'+createHmac('sha256',secret()).update(data).digest('base64url') }
export function readOrder(token: unknown): Order {
  if(typeof token!=='string'||token.length>6000)throw Error('Invalid order')
  const [data,signature,...extra]=token.split('.');if(!data||!signature||extra.length)throw Error('Invalid order')
  const expected=createHmac('sha256',secret()).update(data).digest();const actual=Buffer.from(signature,'base64url')
  if(actual.length!==expected.length||!timingSafeEqual(actual,expected))throw Error('Invalid order')
  const order=JSON.parse(Buffer.from(data,'base64url').toString()) as Order
  if(order.gateway!==GATEWAY||order.currency!=='USD'||!/^SHOP-[0-9a-f-]{36}$/.test(order.ref)||!Number.isSafeInteger(order.totalCents)||order.totalCents<50||order.totalCents>10000||order.expires<Date.now())throw Error('Order expired or invalid')
  return order
}
export function priceCart(body: any) {
  if(!Array.isArray(body?.lines)||!body.lines.length||body.lines.length>3)throw Error('Choose at least one item')
  const seen=new Set<string>();let subtotalCents=0
  const lines=body.lines.map((line:any)=>{const p=CATALOG.find(p=>p.id===line.id);if(!p||seen.has(line.id)||!Number.isInteger(line.quantity)||line.quantity<1||line.quantity>10)throw Error('Invalid cart');seen.add(line.id);subtotalCents+=p.cents*line.quantity;return {id:p.id,quantity:line.quantity}}).sort((a:any,b:any)=>a.id.localeCompare(b.id))
  const coupon=String(body.coupon||'').trim().toUpperCase();if(coupon&&coupon!=='DEMO10')throw Error('Use DEMO10 for 10% off')
  const discountCents=coupon?Math.round(subtotalCents*0.1):0
  return {lines,subtotalCents,discountCents,totalCents:subtotalCents-discountCents,coupon}
}
export function createOrder(body: any) {
  const priced=priceCart(body)
  if(body.previousToken){try{const old=readOrder(body.previousToken);if(JSON.stringify(old.lines)===JSON.stringify(priced.lines)&&old.coupon===priced.coupon&&old.totalCents===priced.totalCents)return {order:old,token:body.previousToken as string}}catch{}}
  const order:Order={...priced,ref:'SHOP-'+randomUUID(),gateway:GATEWAY,currency:'USD',expires:Date.now()+7*86400000}
  return {order,token:signOrder(order)}
}
