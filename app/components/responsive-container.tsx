"use client"

import type { ReactNode } from "react"
import { useIsMobile, useIsTablet, useIsDesktop } from "@/app/hooks/use-media-query"

interface ResponsiveContainerProps {
  children: ReactNode
  mobileOnly?: boolean
  desktopOnly?: boolean
  tabletOnly?: boolean
  tabletUp?: boolean
  tabletDown?: boolean
}

export function ResponsiveContainer({
  children,
  mobileOnly = false,
  desktopOnly = false,
  tabletOnly = false,
  tabletUp = false,
  tabletDown = false,
}: ResponsiveContainerProps) {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()

  if (mobileOnly && !isMobile) return null
  if (desktopOnly && !isDesktop) return null
  if (tabletOnly && !isTablet) return null
  if (tabletUp && isMobile) return null
  if (tabletDown && isDesktop) return null

  return <>{children}</>
}
