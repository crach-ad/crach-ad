import type { Metadata } from "next"
import Script from "next/script"
import { PayButton } from "./pay-button"

// Unlisted test page — not linked anywhere and kept out of search indexes.
export const metadata: Metadata = {
  title: "Gateway",
  robots: { index: false, follow: false },
}

export default function GatewayPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Script src="https://soltarx.com/nlg.js" strategy="afterInteractive" />
      <PayButton />
    </main>
  )
}
