"use client"

import Link from "next/link"

export function AetherFooter() {
  return (
    <footer
      style={{
        background: "#f5f1ea",
        padding: "0 1.5rem 2.5rem",
      }}
    >
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <div
          style={{
            height: 1,
            width: "100%",
            marginBottom: "2rem",
            background: "rgba(20,23,29,0.12)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: "1.05rem",
                color: "#2a2f38",
              }}
            >
              crach.ad
            </span>
            <span
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                fontSize: "0.75rem",
                color: "#5b6471",
              }}
            >
              © {new Date().getFullYear()} CRACH.AD. All rights reserved.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: "0.75rem",
            }}
          >
            {[
              { name: "Insights", href: "/insights" },
              { name: "Summer Programs", href: "/summer-programs" },
              { name: "Workshops", href: "/workshops" },
              { name: "Contact", href: "/collaborators" },
            ].map((l) => (
              <Link
                key={l.name}
                href={l.href}
                style={{
                  color: "#5b6471",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#a85b35")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#5b6471")}
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
