import { NextResponse } from 'next/server'
import { readOrder } from '@/lib/demo-store'
export async function POST(req: Request) {
  if(req.headers.get('origin')!==new URL(req.url).origin)return NextResponse.json({error:'Invalid origin'},{status:403})
  try {
    const raw=await req.text();if(raw.length>8000)throw Error('Invalid request');const {token}=JSON.parse(raw);const order=readOrder(token)
    const res=await fetch('https://master.soltarx.com/api/demo-store/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token}),cache:'no-store',signal:AbortSignal.timeout(15000)})
    if(!res.ok) return NextResponse.json({error:'Payment verification is temporarily unavailable. Your order is saved.'},{status:503})
    const status=await res.json();return NextResponse.json({order,status:status.status,saleId:status.saleId||null},{headers:{'Cache-Control':'no-store'}})
  }catch{return NextResponse.json({error:'Unable to verify this order. Refresh and try again.'},{status:400})}
}
