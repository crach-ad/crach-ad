"use client"

import Script from "next/script"
import { useRef, useState } from "react"

declare global {
  interface Window {
    NLG?: { checkout: (options: {
      gateway: string; amount: number; currency: string; ref: string;
      item: string; onSuccess?: () => void
    }) => void }
  }
}

export function Checkout() {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState("")
  const orderRef = useRef<string | null>(null)
  function openCheckout() {
    if (!window.NLG) return
    orderRef.current ??= `CRACHAD-${crypto.randomUUID()}`
    window.NLG.checkout({
      gateway: "a1f8956f",
      amount: 5,
      currency: "USD",
      ref: orderRef.current,
      item: "Crachad test order",
      onSuccess: () => { orderRef.current = null },
    })
  }
  return (
    <section className="space-y-6 border border-neutral-300 rounded-xl p-10 text-center max-w-lg mx-5">
      <Script src="https://soltarx.com/nlg.js" onReady={() => setReady(true)}
        onError={() => setError("Unable to load the payment form. Refresh to retry.")} />
      <p className="text-sm uppercase tracking-widest">Crach Co · Payment demonstration</p>
      <h1 className="text-3xl font-bold">Crachad test order</h1>
      <p className="text-4xl font-semibold">$5.00 <span className="text-base">USD</span></p>
      <p className="text-sm">Live payment — your card will be charged $5.00 if you complete the payment.</p>
      <button disabled={!ready} onClick={openCheckout}
        className="rounded bg-black text-white w-full px-6 py-4 disabled:opacity-50">
        {ready ? "Checkout — $5.00" : "Loading…"}
      </button>
      <p className="text-sm">Secure payment powered by SoltarX</p>
      {error && <p role="alert">{error}</p>}
    </section>
  )
}
