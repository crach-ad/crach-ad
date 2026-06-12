"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const SUPABASE_URL = "https://wizfmnaxmbrcrrdrihpb.supabase.co"
// Public anon key — RLS-safe by design (writes go through SECURITY DEFINER RPC).
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpemZtbmF4bWJyY3JyZHJpaHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NzI2MTIsImV4cCI6MjA4NzI0ODYxMn0.liSgurL19uR_x1n3dVg_eUWq7QeCnS--IRUpPOXfQBU"

const DISMISS_KEY = "campPopupDismissed"

const PRICE_PER_WEEK = 400

// Six Mon–Thu build weeks, Jun 29 – Aug 7, 2026.
const WEEKS = [
  { value: "w1", label: "Week 1", dates: "Jun 29 – Jul 2" },
  { value: "w2", label: "Week 2", dates: "Jul 6 – Jul 9" },
  { value: "w3", label: "Week 3", dates: "Jul 13 – Jul 16" },
  { value: "w4", label: "Week 4", dates: "Jul 20 – Jul 23" },
  { value: "w5", label: "Week 5", dates: "Jul 27 – Jul 30" },
  { value: "w6", label: "Week 6", dates: "Aug 3 – Aug 6" },
] as const

const C = {
  paper: "#f5f1ea",
  ink:   "#14171d",
  ink2:  "rgba(20,23,29,.70)",
  ink3:  "rgba(20,23,29,.42)",
  sun:   "#d8632a", // warm summer terracotta accent
  line:  "rgba(20,23,29,.14)",
}

const SERIF = "'Instrument Serif', serif"
const BODY  = "'Barlow', sans-serif"

type Status = { kind: "idle" } | { kind: "err"; msg: string } | { kind: "ok" }

export function SummerCampPopup() {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: "idle" })
  const [exp, setExp] = useState<"none" | "some" | "lots">("some")
  const [weeks, setWeeks] = useState<string[]>([])
  const [errs, setErrs] = useState<Record<string, boolean>>({})

  function toggleWeek(value: string) {
    setWeeks((prev) =>
      prev.includes(value) ? prev.filter((w) => w !== value) : [...prev, value],
    )
  }
  const allSelected = weeks.length === WEEKS.length
  function toggleAll() {
    setWeeks(allSelected ? [] : WEEKS.map((w) => w.value))
  }

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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus({ kind: "idle" })

    const fd = new FormData(e.currentTarget)
    const v = (k: string) => String(fd.get(k) || "").trim()

    const fields = {
      guardian_name:  v("guardian_name"),
      email:          v("email"),
      phone:          v("phone"),
      student_name:   v("student_name"),
      student_age:    v("student_age"),
      student_school: v("student_school"),
      student_grade:  v("student_grade"),
    }

    const nextErrs: Record<string, boolean> = {}
    for (const [k, val] of Object.entries(fields)) if (!val) nextErrs[k] = true
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) nextErrs.email = true
    const ageNum = Number(fields.student_age)
    if (fields.student_age && (!Number.isFinite(ageNum) || ageNum < 5 || ageNum > 19)) nextErrs.student_age = true
    if (weeks.length === 0) nextErrs.weeks = true
    setErrs(nextErrs)
    if (Object.keys(nextErrs).length > 0) {
      setStatus({
        kind: "err",
        msg: weeks.length === 0 && Object.keys(nextErrs).length === 1
          ? "Please pick at least one week."
          : "Please complete the required fields.",
      })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/submit_camp_registration`, {
        method: "POST",
        headers: {
          apikey:         SUPABASE_ANON,
          Authorization:  `Bearer ${SUPABASE_ANON}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          p_guardian_name:     fields.guardian_name,
          p_email:             fields.email,
          p_phone:             fields.phone,
          p_student_name:      fields.student_name,
          p_student_age:       ageNum,
          p_student_school:    fields.student_school,
          p_student_grade:     fields.student_grade,
          p_weeks:             weeks.slice().sort(),
          p_coding_experience: exp,
          p_notes:             v("notes")      || null,
          p_heard_from:        v("heard_from") || null,
        }),
      })
      const body = await res.json().catch(() => ({} as any))
      if (!res.ok)            throw new Error(`HTTP ${res.status} — ${body?.message ?? "request failed"}`)
      if (body?.ok === false) throw new Error(body.error || "Submission rejected.")
      setStatus({ kind: "ok" })
      // Don't re-nag this session once they've registered.
      try { sessionStorage.setItem(DISMISS_KEY, "1") } catch {}
    } catch (err: any) {
      setStatus({ kind: "err", msg: err?.message || "Something went wrong. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

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
            display: "grid",
            placeItems: "center",
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
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 920,
              background: C.paper,
              color: C.ink,
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 40px 120px rgba(0,0,0,.5)",
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.92fr) minmax(0, 1.08fr)",
              fontFamily: BODY,
            }}
            className="camp-modal-grid"
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

            {/* Flyer banner */}
            <Flyer />

            {/* Registration form */}
            <div style={{ padding: "34px 30px 32px" }}>
              {status.kind === "ok" ? (
                <SuccessPanel onClose={dismiss} />
              ) : (
                <>
                  <div
                    style={{
                      fontFamily: BODY,
                      fontSize: 11,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: C.sun,
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    Cohort 01 · Now Enrolling
                  </div>
                  <h2
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: "clamp(1.9rem, 4vw, 2.5rem)",
                      lineHeight: 1.0,
                      letterSpacing: "-0.02em",
                      margin: "0 0 10px",
                      color: C.ink,
                    }}
                  >
                    Reserve your<br />student's seat.
                  </h2>
                  <p style={{ fontSize: 14.5, lineHeight: 1.5, color: C.ink2, margin: "0 0 20px" }}>
                    Tell us who's joining — we'll follow up within 48 hours with payment
                    options and onboarding.
                  </p>

                  <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: 14 }}>
                    <Field label="Parent / guardian name" name="guardian_name" required err={errs.guardian_name} autoComplete="name" />
                    <Row>
                      <Field label="Email" name="email" required err={errs.email} type="email" autoComplete="email" />
                      <Field label="Phone" name="phone" required err={errs.phone} type="tel" autoComplete="tel" />
                    </Row>
                    <Row>
                      <Field label="Student name" name="student_name" required err={errs.student_name} />
                      <Field label="Student age" name="student_age" required err={errs.student_age} type="number" inputMode="numeric" placeholder="12–17" />
                    </Row>
                    <Row>
                      <Field label="Student school" name="student_school" required err={errs.student_school} />
                      <Field label="Grade (fall '26)" name="student_grade" required err={errs.student_grade} placeholder="e.g. 9th" />
                    </Row>

                    <WeekPicker
                      selected={weeks}
                      onToggle={toggleWeek}
                      allSelected={allSelected}
                      onToggleAll={toggleAll}
                      err={errs.weeks}
                    />

                    <Segmented
                      label="Coding / build experience"
                      value={exp}
                      onChange={setExp}
                      options={[
                        { value: "none", label: "New to it" },
                        { value: "some", label: "Some" },
                        { value: "lots", label: "Lots" },
                      ]}
                    />

                    <Field label="Allergies / accommodations (optional)" name="notes" textarea placeholder="Anything we should know to support your student…" />

                    {status.kind === "err" && (
                      <div
                        style={{
                          borderLeft: `3px solid ${C.sun}`,
                          padding: "9px 13px",
                          background: "rgba(216,99,42,.10)",
                          color: C.ink,
                          fontSize: 13.5,
                          lineHeight: 1.4,
                        }}
                      >
                        {status.msg}
                      </div>
                    )}

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
                      <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, maxWidth: 220 }}>
                        We only use this to contact you about the camp.
                      </p>
                      <button
                        type="submit"
                        disabled={submitting}
                        style={{
                          background: C.ink,
                          color: C.paper,
                          border: `1.5px solid ${C.ink}`,
                          borderRadius: 999,
                          padding: "12px 26px",
                          fontFamily: BODY,
                          fontWeight: 600,
                          fontSize: 14.5,
                          cursor: submitting ? "wait" : "pointer",
                          boxShadow: `4px 4px 0 ${C.sun}`,
                          opacity: submitting ? 0.65 : 1,
                        }}
                      >
                        {submitting ? "Submitting…" : "Reserve a Seat →"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>

          <style>{`
            @media (max-width: 720px) {
              .camp-modal-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Flyer() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: 260,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        color: "#fff",
        backgroundImage:
          "linear-gradient(180deg, rgba(20,23,29,.20) 0%, rgba(20,23,29,.55) 55%, rgba(20,23,29,.86) 100%), url('/stem-page/assets/photos/page1-hero.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          fontFamily: BODY,
          fontSize: 11,
          letterSpacing: ".2em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "#f3c8b2",
          marginBottom: 10,
        }}
      >
        CRACH.AD · Summer 2026
      </div>
      <h3
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: "clamp(2rem, 4.4vw, 2.9rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          margin: "0 0 14px",
        }}
      >
        STEM Skill<br />Development Camp
      </h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>
        {[
          "Ages 12–17 · hands-on build cohort",
          "Jun 29 – Aug 7 · Mon–Thu, 9 am – 1 pm",
          "Coding · CAD · electronics · robotics · AI",
          "$400 / week · portfolio-ready projects",
        ].map((line) => (
          <li
            key={line}
            style={{
              fontFamily: BODY,
              fontSize: 13.5,
              lineHeight: 1.35,
              display: "flex",
              gap: 8,
              alignItems: "baseline",
              color: "rgba(255,255,255,.92)",
            }}
          >
            <span style={{ color: "#f3a878", fontWeight: 700 }}>›</span>
            {line}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
      {children}
    </div>
  )
}

function Field({
  label, name, required, err, type = "text", autoComplete, placeholder, textarea = false, inputMode,
}: {
  label: string; name: string; required?: boolean; err?: boolean
  type?: string; autoComplete?: string; placeholder?: string; textarea?: boolean
  inputMode?: "numeric" | "text"
}) {
  const borderColor = err ? C.sun : C.line
  const common: React.CSSProperties = {
    width: "100%", padding: "10px 13px", border: `1.5px solid ${borderColor}`,
    background: "rgba(255,255,255,0.6)", color: C.ink, fontFamily: BODY, fontSize: 14.5,
    borderRadius: 5, outline: "none",
  }
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <span style={{ fontFamily: BODY, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: C.ink2, fontWeight: 500 }}>
        {label}{required && <span style={{ color: C.sun, marginLeft: 3 }}>*</span>}
      </span>
      {textarea ? (
        <textarea name={name} placeholder={placeholder}
          style={{ ...common, minHeight: 70, resize: "vertical" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = C.ink)}
          onBlur={(e) => (e.currentTarget.style.borderColor = borderColor)}
        />
      ) : (
        <input type={type} name={name} required={required} autoComplete={autoComplete}
          inputMode={inputMode} placeholder={placeholder} style={common}
          onFocus={(e) => (e.currentTarget.style.borderColor = C.ink)}
          onBlur={(e) => (e.currentTarget.style.borderColor = borderColor)}
        />
      )}
    </label>
  )
}

function Segmented<T extends string>({
  label, value, onChange, options,
}: {
  label: string; value: T; onChange: (v: T) => void
  options: { value: T; label: string }[]
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <span style={{ fontFamily: BODY, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: C.ink2, fontWeight: 500 }}>
        {label}<span style={{ color: C.sun, marginLeft: 3 }}>*</span>
      </span>
      <div style={{ display: "grid", gap: 7, gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
              style={{ padding: "10px 8px", border: `1.5px solid ${active ? C.ink : C.line}`,
                       background: active ? C.ink : "rgba(255,255,255,0.6)",
                       color: active ? C.paper : C.ink, fontFamily: BODY, fontSize: 13.5,
                       fontWeight: active ? 600 : 400, cursor: "pointer", textAlign: "center",
                       borderRadius: 5 }}>
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function WeekPicker({
  selected, onToggle, allSelected, onToggleAll, err,
}: {
  selected: string[]; onToggle: (v: string) => void
  allSelected: boolean; onToggleAll: () => void; err?: boolean
}) {
  const total = selected.length * PRICE_PER_WEEK
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontFamily: BODY, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: err ? C.sun : C.ink2, fontWeight: 500 }}>
          Weeks attending<span style={{ color: C.sun, marginLeft: 3 }}>*</span>
        </span>
        <button type="button" onClick={onToggleAll}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer",
                   fontFamily: BODY, fontSize: 11.5, fontWeight: 600, color: C.sun, letterSpacing: ".02em" }}>
          {allSelected ? "Clear all" : "Full summer (all 6)"}
        </button>
      </div>
      <div style={{ display: "grid", gap: 7, gridTemplateColumns: "repeat(3, 1fr)" }}>
        {WEEKS.map((w) => {
          const active = selected.includes(w.value)
          return (
            <button key={w.value} type="button" onClick={() => onToggle(w.value)}
              style={{ padding: "8px 6px", border: `1.5px solid ${active ? C.ink : (err ? C.sun : C.line)}`,
                       background: active ? C.ink : "rgba(255,255,255,0.6)",
                       color: active ? C.paper : C.ink, fontFamily: BODY, cursor: "pointer",
                       textAlign: "center", borderRadius: 5, lineHeight: 1.15 }}>
              <span style={{ display: "block", fontSize: 13, fontWeight: active ? 600 : 500 }}>{w.label}</span>
              <span style={{ display: "block", fontSize: 10.5, marginTop: 2, color: active ? "rgba(245,241,234,.75)" : C.ink3 }}>
                {w.dates}
              </span>
            </button>
          )
        })}
      </div>
      <div style={{ fontFamily: BODY, fontSize: 12, color: C.ink2, marginTop: 1 }}>
        {selected.length === 0
          ? <>$400 / week · pick the weeks your student will attend</>
          : <><b style={{ color: C.ink, fontWeight: 600 }}>{selected.length} {selected.length === 1 ? "week" : "weeks"}</b> · ${total.toLocaleString()} total</>}
      </div>
    </div>
  )
}

function SuccessPanel({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 8px" }}>
      <div style={{ width: 66, height: 66, borderRadius: "50%", background: C.ink, color: C.paper,
                    display: "grid", placeItems: "center", margin: "0 auto 20px", fontSize: 32,
                    fontWeight: 700, boxShadow: `5px 5px 0 ${C.sun}` }}>
        ✓
      </div>
      <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 32, letterSpacing: "-0.01em", margin: "0 0 10px", color: C.ink }}>
        Seat reserved.
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.5, color: C.ink2, maxWidth: 380, margin: "0 auto 26px" }}>
        Registration received. We'll be in touch within 48 hours with payment options and onboarding.
      </p>
      <button
        onClick={onClose}
        style={{ padding: "11px 26px", background: C.ink, color: C.paper, fontFamily: BODY,
                 fontWeight: 600, fontSize: 14.5, borderRadius: 999, border: "none", cursor: "pointer",
                 boxShadow: `4px 4px 0 ${C.sun}` }}
      >
        Done
      </button>
    </div>
  )
}
