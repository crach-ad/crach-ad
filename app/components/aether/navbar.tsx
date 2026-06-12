"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const NAV = [
  { name: "Insights", href: "/insights" },
  { name: "Summer", href: "/summer-programs" },
  { name: "Workshops", href: "/workshops" },
  { name: "Speaking", href: "/public-speaking" },
  { name: "Projects", href: "/software-projects" },
  { name: "Games", href: "/games" },
]

export function AetherNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 2rem)",
        maxWidth: "56rem",
        zIndex: 50,
      }}
    >
      <motion.div
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="liquid-glass"
        style={{
          borderRadius: 9999,
          height: "3.5rem",
          paddingInline: "1.25rem",
          display: "flex",
          alignItems: "center",
          boxShadow: scrolled
            ? "0 10px 40px rgba(0,0,0,0.18), inset 0 1px 1px rgba(20,23,29,0.08)"
            : "inset 0 1px 1px rgba(20,23,29,0.08)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        <div style={{ flex: 1 }}>
          <Link
            href="/"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "1.25rem",
              color: "#14171d",
              letterSpacing: "-0.01em",
              textDecoration: "none",
            }}
          >
            crach.ad
          </Link>
        </div>

        <nav
          className="hidden md:flex"
          style={{ gap: "1.5rem", alignItems: "center" }}
        >
          {NAV.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 400,
                color: "#2a2f38",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#a85b35")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#2a2f38")
              }
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link
            href="/collaborators"
            style={{
              background: "#a85b35",
              color: "#f5f1ea",
              borderRadius: 9999,
              padding: "0.375rem 1.1rem",
              fontSize: "0.8rem",
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            Contact
            <ArrowUpRight style={{ width: "0.85rem", height: "0.85rem" }} />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
