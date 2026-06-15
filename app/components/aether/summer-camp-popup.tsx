"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { CampFlyer, CampRegistrationForm } from "./camp-registration"
import { C, BODY } from "./camp-theme"

const DISMISS_KEY = "campPopupDismissed"

export function SummerCampPopup() {
  const [open, setOpen] = useState(false)

  // Show once per browser session, after the page-loader has faded.
  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem(DISMISS_KEY)) return
    const t = setTimeout(() => setOpen(true), 2600)
    return () => clearTimeout(t)
  }, [])

  function dismiss() {
    setOpen(false)
    try {
      sessionStorage.setItem(DISMISS_KEY, "1")
    } catch {}
  }

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="camp-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={dismiss}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(10,11,14,.55)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <motion.div
            key="camp-modal"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Summer camp registration"
            className="camp-card-grid"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 920,
              margin: "auto", // centers when it fits; scrolls from the top when taller than the viewport
              background: C.paper,
              color: C.ink,
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 40px 120px rgba(0,0,0,.5)",
              fontFamily: BODY,
            }}
          >
            <button
              onClick={dismiss}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                zIndex: 2,
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "none",
                background: "rgba(255,255,255,.85)",
                color: C.ink,
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,.18)",
              }}
            >
              <X style={{ width: 18, height: 18 }} />
            </button>

            <CampFlyer />

            <CampRegistrationForm
              onSubmitted={() => {
                try { sessionStorage.setItem(DISMISS_KEY, "1") } catch {}
              }}
              successAction={
                <button
                  onClick={dismiss}
                  style={{ padding: "11px 26px", background: C.ink, color: C.paper, fontFamily: BODY,
                           fontWeight: 600, fontSize: 14.5, borderRadius: 999, border: "none", cursor: "pointer",
                           boxShadow: `4px 4px 0 ${C.sun}` }}
                >
                  Done
                </button>
              }
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
