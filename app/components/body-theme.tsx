"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

/**
 * Applies the homepage-only "paper" palette by toggling a `paper` class on
 * <body> when on "/". Scoped here so other routes keep the dark theme.
 */
export function BodyTheme() {
  const pathname = usePathname()

  useEffect(() => {
    const isHome = pathname === "/"
    document.body.classList.toggle("paper", isHome)
    return () => document.body.classList.remove("paper")
  }, [pathname])

  return null
}
