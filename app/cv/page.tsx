"use client"

import { useRef } from "react"
import { Download, Printer } from "lucide-react"

export default function CVPage() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const handlePrint = () => {
    const win = iframeRef.current?.contentWindow
    if (!win) return
    win.focus()
    win.print()
  }

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        margin: 0,
        padding: 0,
        background: "#d9d3c5",
      }}
    >
      <iframe
        ref={iframeRef}
        src="/cv/index.html"
        title="Crachad Laing — Curriculum Vitae"
        style={{ width: "100%", height: "100%", border: 0, display: "block" }}
      />

      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          display: "flex",
          gap: "0.6rem",
          zIndex: 50,
        }}
      >
        <button
          onClick={handlePrint}
          style={{
            background: "#14171d",
            color: "#f5f1ea",
            border: "1px solid #14171d",
            borderRadius: 9999,
            padding: "0.65rem 1.1rem",
            fontSize: "0.85rem",
            fontWeight: 500,
            fontFamily: "'IBM Plex Sans', sans-serif",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            cursor: "pointer",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.45)",
          }}
        >
          <Printer style={{ width: "0.95rem", height: "0.95rem" }} />
          Save as PDF
        </button>

        <a
          href="/cv/index.html"
          download="Crachad-Laing-CV.html"
          style={{
            background: "#a85b35",
            color: "#f5f1ea",
            border: "1px solid #a85b35",
            borderRadius: 9999,
            padding: "0.65rem 1.1rem",
            fontSize: "0.85rem",
            fontWeight: 500,
            fontFamily: "'IBM Plex Sans', sans-serif",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.45)",
          }}
        >
          <Download style={{ width: "0.95rem", height: "0.95rem" }} />
          Download
        </a>
      </div>
    </main>
  )
}
