"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Update the state initially
    setMatches(media.matches)

    // Set up the listener to update state
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add the listener
    media.addEventListener("change", listener)

    // Clean up
    return () => {
      media.removeEventListener("change", listener)
    }
  }, [query])

  return matches
}

// Predefined media queries
export function useIsMobile() {
  return useMediaQuery("(max-width: 768px)")
}

export function useIsTablet() {
  return useMediaQuery("(min-width: 769px) and (max-width: 1024px)")
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1025px)")
}
