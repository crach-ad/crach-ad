"use client"

import { usePathname } from "next/navigation"
import { AnimatedHeader } from "./animated-header"

export function ConditionalHeader() {
  const pathname = usePathname()
  if (pathname === "/") return null
  if (pathname?.startsWith("/stem-program")) return null
  return <AnimatedHeader />
}
