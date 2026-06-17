import type { Metadata } from "next"
import Link from "next/link"
import { AiFlyer, AiRegistrationForm } from "@/app/components/aether/ai-registration"
import { C, BODY } from "@/app/components/aether/ai-theme"

// Hidden page — not linked in the nav, and kept out of search results.
export const metadata: Metadata = {
  title: "Book a Session · AI Sessions with CRACHAD",
  robots: { index: false, follow: false },
}

export default function AiRegisterPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: C.paper,
        color: C.ink,
        fontFamily: BODY,
        display: "grid",
        placeItems: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 920 }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginBottom: 18,
            fontFamily: BODY,
            fontSize: 12,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: C.ink2,
            textDecoration: "none",
            borderBottom: `1px solid ${C.line}`,
          }}
        >
          ← back to crachad.com
        </Link>

        <div
          className="camp-card-grid"
          style={{
            background: C.paper,
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 24px 70px rgba(0,0,0,.18)",
            border: `1px solid ${C.line}`,
          }}
        >
          <AiFlyer whiteText />
          <AiRegistrationForm
            successAction={
              <Link
                href="/"
                style={{
                  display: "inline-block",
                  padding: "11px 26px",
                  background: C.ink,
                  color: C.paper,
                  fontFamily: BODY,
                  fontWeight: 600,
                  fontSize: 14.5,
                  borderRadius: 999,
                  textDecoration: "none",
                  boxShadow: `4px 4px 0 ${C.sun}`,
                }}
              >
                Back to home →
              </Link>
            }
          />
        </div>
      </div>
    </main>
  )
}
