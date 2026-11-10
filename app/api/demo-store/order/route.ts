import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/demo-store'
export async function POST(req: Request) {
  if(req.headers.get('origin')!==new URL(req.url).origin)return NextResponse.json({error:'Invalid origin'},{status:403})
  try {const raw=await req.text();if(raw.length>8000)throw Error('Cart too large');return NextResponse.json(createOrder(JSON.parse(raw)),{headers:{'Cache-Control':'no-store'}})}
  catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Unable to create order'},{status:400})}
}
