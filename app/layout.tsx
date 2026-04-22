import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ConditionalHeader } from "./components/conditional-header"

export const metadata: Metadata = {
  title: "CRACH.AD - STEM Education & Development",
  description:
    "Bridging the gap between education and industry. Empowering students through STEM education.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ConditionalHeader />
        {children}
      </body>
    </html>
  )
}