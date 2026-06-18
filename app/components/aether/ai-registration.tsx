"use client"

import { useState } from "react"
import { C, SERIF, BODY, PRICE_PER_SESSION } from "./ai-theme"

const SUPABASE_URL = "https://wizfmnaxmbrcrrdrihpb.supabase.co"
// Public anon key — RLS-safe by design (writes go through SECURITY DEFINER RPC).
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpemZtbmF4bWJyY3JyZHJpaHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NzI2MTIsImV4cCI6MjA4NzI0ODYxMn0.liSgurL19uR_x1n3dVg_eUWq7QeCnS--IRUpPOXfQBU"

// Mon–Fri weekday picker (sessions run every weekday, 5–8 pm).
const DAYS = [
  { value: "mon", label: "Mon" },
  { value: "tue", label: "Tue" },
  { value: "wed", label: "Wed" },
  { value: "thu", label: "Thu" },
  { value: "fri", label: "Fri" },
] as const

type Track  = "business" | "professional" | "everyday"
type Exp    = "none" | "some" | "lots"
type Format = "in_person" | "online"
type Slot   = "early" | "late" | "either"
type Status = { kind: "idle" } | { kind: "err"; msg: string } | { kind: "ok" }

/**
 * Flyer banner — shared by the homepage popup and the standalone register page.
 * `whiteText` forces all flyer copy to pure white (drops the peach accents),
 * used on the register page for maximum legibility.
 */
export function AiFlyer({ whiteText = false }: { whiteText?: boolean }) {
  const eyebrowColor = whiteText ? "#fff" : "#f3c8b2"
  const bulletText   = whiteText ? "#fff" : "rgba(255,255,255,.92)"
  const bulletMarker = whiteText ? "#fff" : "#f3a878"
  return (
    <div
      style={{
        position: "relative",
        minHeight: 260,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        color: "#fff",
        backgroundImage:
          "radial-gradient(120% 100% at 80% 0%, rgba(216,99,42,.55) 0%, rgba(216,99,42,0) 55%), linear-gradient(160deg, #1d2330 0%, #14171d 60%, #0c0e13 100%)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/human-in-the-loop.png"
        alt="Human in the Loop — AI training for professionals"
        style={{ width: "min(280px, 70%)", height: "auto", margin: "0 auto 20px", display: "block" }}
      />
      <div
        style={{
          fontFamily: BODY,
          fontSize: 11,
          letterSpacing: ".2em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: eyebrowColor,
          marginBottom: 10,
        }}
      >
        CRACHAD · AI Sessions
      </div>
      <h3
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: "clamp(2rem, 4.4vw, 2.9rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          margin: "0 0 8px",
        }}
      >
        AI Sessions<br />with CRACHAD
      </h3>
      <p
        style={{
          fontFamily: BODY,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: ".02em",
          color: bulletText,
          margin: "0 0 14px",
        }}
      >
        Learn Today. Apply Tomorrow. Lead the Future.
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>
        {[
          "All ages · business, professionals & everyday life",
          "Mon–Fri, 5–8 pm · Meridian STEM Lab",
          "Two 1.5-hour slots: 5:00–6:30 or 6:30–8:00",
          "$100 per session · device + AI usage costs included",
          "In person or online · small groups",
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
              color: bulletText,
            }}
          >
            <span style={{ color: bulletMarker, fontWeight: 700 }}>›</span>
            {line}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * The registration form itself (heading, fields, scheduler, submit) plus the
 * post-submit success state. `onSubmitted` fires after a successful POST;
 * `successAction` is rendered as the call-to-action on the success panel.
 */
export function AiRegistrationForm({
  onSubmitted,
  successAction,
}: {
  onSubmitted?: () => void
  successAction: React.ReactNode
}) {
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: "idle" })
  const [track, setTrack]   = useState<Track>("business")
  const [exp, setExp]       = useState<Exp>("some")
  const [format, setFormat] = useState<Format>("in_person")
  const [slot, setSlot]     = useState<Slot>("either")
  const [days, setDays]     = useState<string[]>([])
  const [errs, setErrs]     = useState<Record<string, boolean>>({})

  function toggleDay(value: string) {
    setDays((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value],
    )
  }
  const allSelected = days.length === DAYS.length
  function toggleAll() {
    setDays(allSelected ? [] : DAYS.map((d) => d.value))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus({ kind: "idle" })

    const fd = new FormData(e.currentTarget)
    const v = (k: string) => String(fd.get(k) || "").trim()

    const fields = {
      full_name: v("full_name"),
      email:     v("email"),
      phone:     v("phone"),
    }

    const nextErrs: Record<string, boolean> = {}
    for (const [k, val] of Object.entries(fields)) if (!val) nextErrs[k] = true
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) nextErrs.email = true
    if (days.length === 0) nextErrs.days = true
    setErrs(nextErrs)
    if (Object.keys(nextErrs).length > 0) {
      setStatus({
        kind: "err",
        msg: days.length === 0 && Object.keys(nextErrs).length === 1
          ? "Please pick at least one weekday."
          : "Please complete the required fields.",
      })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/submit_ai_session_registration`, {
        method: "POST",
        headers: {
          apikey:         SUPABASE_ANON,
          Authorization:  `Bearer ${SUPABASE_ANON}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          p_full_name:     fields.full_name,
          p_email:         fields.email,
          p_phone:         fields.phone,
          p_track:         track,
          p_ai_experience: exp,
          p_format:        format,
          p_time_slot:     slot,
          p_days:          DAYS.map((d) => d.value).filter((d) => days.includes(d)),
          p_goals:         v("goals")      || null,
          p_heard_from:    v("heard_from") || null,
        }),
      })
      const body = await res.json().catch(() => ({} as any))
      if (!res.ok)            throw new Error(`HTTP ${res.status} — ${body?.message ?? "request failed"}`)
      if (body?.ok === false) throw new Error(body.error || "Submission rejected.")
      setStatus({ kind: "ok" })
      onSubmitted?.()
    } catch (err: any) {
      setStatus({ kind: "err", msg: err?.message || "Something went wrong. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  if (status.kind === "ok") {
    return (
      <div style={{ padding: "34px 30px 32px" }}>
        <SuccessPanel>{successAction}</SuccessPanel>
      </div>
    )
  }

  return (
    <div style={{ padding: "34px 30px 32px" }}>
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
        Now Booking · $100 / session
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
        Book your<br />AI session.
      </h2>
      <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: 14 }}>
        <Field label="Full name" name="full_name" required err={errs.full_name} autoComplete="name" />
        <Row>
          <Field label="Email" name="email" required err={errs.email} type="email" autoComplete="email" />
          <Field label="Phone / WhatsApp" name="phone" required err={errs.phone} type="tel" autoComplete="tel" />
        </Row>

        <Segmented
          label="What's this for?"
          value={track}
          onChange={setTrack}
          options={[
            { value: "business",     label: "My business" },
            { value: "professional", label: "My profession" },
            { value: "everyday",     label: "Everyday life" },
          ]}
        />

        <Segmented
          label="Experience with AI"
          value={exp}
          onChange={setExp}
          options={[
            { value: "none", label: "New to it" },
            { value: "some", label: "Some" },
            { value: "lots", label: "Lots" },
          ]}
        />

        <Row>
          <Segmented
            label="Format"
            value={format}
            onChange={setFormat}
            options={[
              { value: "in_person", label: "In person" },
              { value: "online",    label: "Online" },
            ]}
          />
          <Segmented
            label="Time slot"
            value={slot}
            onChange={setSlot}
            options={[
              { value: "early",  label: "5:00–6:30" },
              { value: "late",   label: "6:30–8:00" },
              { value: "either", label: "Either" },
            ]}
          />
        </Row>

        <DayPicker
          selected={days}
          onToggle={toggleDay}
          allSelected={allSelected}
          onToggleAll={toggleAll}
          err={errs.days}
        />

        <Field label="Goals (optional)" name="goals" textarea placeholder="What would you like to get out of your sessions?" />
        <Field label="How did you hear about us? (optional)" name="heard_from" placeholder="WhatsApp, a friend, Instagram…" />

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
            We only use this to contact you about your sessions.
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
            {submitting ? "Submitting…" : "Book My Session →"}
          </button>
        </div>
      </form>
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
                       color: active ? C.paper : C.ink, fontFamily: BODY, fontSize: 13,
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

function DayPicker({
  selected, onToggle, allSelected, onToggleAll, err,
}: {
  selected: string[]; onToggle: (v: string) => void
  allSelected: boolean; onToggleAll: () => void; err?: boolean
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontFamily: BODY, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: err ? C.sun : C.ink2, fontWeight: 500 }}>
          Days that work<span style={{ color: C.sun, marginLeft: 3 }}>*</span>
        </span>
        <button type="button" onClick={onToggleAll}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer",
                   fontFamily: BODY, fontSize: 11.5, fontWeight: 600, color: C.sun, letterSpacing: ".02em" }}>
          {allSelected ? "Clear all" : "Every weekday"}
        </button>
      </div>
      <div style={{ display: "grid", gap: 7, gridTemplateColumns: "repeat(5, 1fr)" }}>
        {DAYS.map((d) => {
          const active = selected.includes(d.value)
          return (
            <button key={d.value} type="button" onClick={() => onToggle(d.value)}
              style={{ padding: "10px 6px", border: `1.5px solid ${active ? C.ink : (err ? C.sun : C.line)}`,
                       background: active ? C.ink : "rgba(255,255,255,0.6)",
                       color: active ? C.paper : C.ink, fontFamily: BODY, cursor: "pointer",
                       textAlign: "center", borderRadius: 5, fontSize: 13, fontWeight: active ? 600 : 500 }}>
              {d.label}
            </button>
          )
        })}
      </div>
      <div style={{ fontFamily: BODY, fontSize: 12, color: C.ink2, marginTop: 1 }}>
        {selected.length === 0
          ? <>${PRICE_PER_SESSION} per session · pick the days that work for you</>
          : <><b style={{ color: C.ink, fontWeight: 600 }}>{selected.length} {selected.length === 1 ? "day" : "days"} / week</b> · ${PRICE_PER_SESSION} per session</>}
      </div>
    </div>
  )
}

function SuccessPanel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 8px" }}>
      <div style={{ width: 66, height: 66, borderRadius: "50%", background: C.ink, color: C.paper,
                    display: "grid", placeItems: "center", margin: "0 auto 20px", fontSize: 32,
                    fontWeight: 700, boxShadow: `5px 5px 0 ${C.sun}` }}>
        ✓
      </div>
      <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 32, letterSpacing: "-0.01em", margin: "0 0 10px", color: C.ink }}>
        You're booked in.
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.5, color: C.ink2, maxWidth: 380, margin: "0 auto 26px" }}>
        Request received. We'll reach out over WhatsApp (436-0358) to confirm your
        time and payment. Talk soon!
      </p>
      {children}
    </div>
  )
}
