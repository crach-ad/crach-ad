import type { Metadata } from "next"
import { Checkout } from "./checkout"

// Unlisted test page — not linked anywhere and kept out of search indexes.
export const metadata: Metadata = {
  title: "Gateway",
  robots: { index: false, follow: false },
}

export default function GatewayPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Checkout />
    </main>
  )
}
