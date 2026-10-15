"use client"

declare global {
  interface Window {
    NLG?: { checkout: (opts: { gateway: string; amount: number; ref: string }) => void }
  }
}

export function PayButton() {
  return (
    <button
      className="rounded-md border px-5 py-2.5"
      onClick={() => window.NLG?.checkout({ gateway: "a1f8956f", amount: 99.0, ref: "ORDER-123" })}
    >
      Pay with card
    </button>
  )
}
