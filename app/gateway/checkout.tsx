"use client"

import Script from "next/script"
import { useState } from "react"

declare global {
  interface Window {
    NLG?: { checkout: (opts: { gateway: string; amount: number; ref: string; onClose?: () => void }) => void }
  }
}

export function Checkout() {
  const [closed, setClosed] = useState(false)

  const open = () => {
    setClosed(false)
    window.NLG?.checkout({ gateway: "a1f8956f", amount: 99.0, ref: "ORDER-123", onClose: () => setClosed(true) })
  }

  return (
    <>
      {/* onReady fires on first load and again on every remount, so the modal opens immediately. */}
      <Script src="https://soltarx.com/nlg.js" onReady={open} />
      {closed && (
        <button className="rounded-md border px-5 py-2.5" onClick={open}>
          Reopen checkout
        </button>
      )}
    </>
  )
}
