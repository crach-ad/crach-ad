"use client"

// ─────────────────────────────────────────────────────────────────────────────
// Spanish Wells STEM & Mandarin Exposure Camp — registration form + flyer.
// One-day camp: Mon June 29, 9:00 AM–12:00 PM, Methodist Church, Spanish Wells.
// Ages 7–13 · $25 · every camper takes home a custom 3D-printed token.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react"
import { C, SERIF, BODY, FEE } from "./camp-theme"

const SUPABASE_URL = "https://wizfmnaxmbrcrrdrihpb.supabase.co"
// Public anon key — RLS-safe by design (writes go through SECURITY DEFINER RPC).
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpemZtbmF4bWJyY3JyZHJpaHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NzI2MTIsImV4cCI6MjA4NzI0ODYxMn0.liSgurL19uR_x1n3dVg_eUWq7QeCnS--IRUpPOXfQBU"

type Exp = "none" | "some" | "lots"
type Status = { kind: "idle" } | { kind: "err"; msg: string } | { kind: "ok" }

/**
 * Flyer banner — shared by the homepage popup (if wired) and the standalone
 * register page. `whiteText` forces all flyer copy to pure white (drops accent
 * tints), used on the register page for maximum legibility.
 */
export function CampFlyer({ whiteText = false }: { whiteText?: boolean }) {
  const eyebrowColor = whiteText ? "#fff" : "#bcd9f7"
  const bulletText   = whiteText ? "#fff" : "rgba(255,255,255,.92)"
  const bulletMarker = whiteText ? "#fff" : "#6db0f0"
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
          "radial-gradient(120% 100% at 80% 0%, rgba(31,115,208,.55) 0%, rgba(31,115,208,0) 55%), linear-gradient(160deg, #163a6b 0%, #102a52 60%, #0a1c3a 100%)",
      }}
    >
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
        CRACHAD · Spanish Wells · 你好!
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
        STEM &amp; Mandarin<br />Exposure Camp
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
        Explore. Create. Code. Communicate.
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>
        {[
          "Monday, June 29 · 9:00 AM – 12:00 PM",
          "Methodist Church · Spanish Wells",
          "Ages 7–13 · $25 per camper",
          "Take home a custom 3D-printed token",
          "Limited to 30 spots — register today",
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

      <div
        style={{
          marginTop: 22,
          paddingTop: 18,
          borderTop: "1px solid rgba(255,255,255,.16)",
        }}
      >
        <div
          style={{
            fontFamily: BODY,
            fontSize: 11,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: eyebrowColor,
            marginBottom: 12,
          }}
        >
          Camp includes
        </div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 9 }}>
          {[
            { t: "Basic Mandarin", d: "language exposure — 你好! 谢谢!" },
            { t: "3D printing & design", d: "make & take home your own token" },
            { t: "Coding & challenges", d: "fun, hands-on coding activities" },
            { t: "Coding skills", d: "build, create & problem-solve" },
          ].map((item) => (
            <li
              key={item.t}
              style={{
                fontFamily: BODY,
                display: "flex",
                gap: 8,
                alignItems: "baseline",
                lineHeight: 1.3,
              }}
            >
              <span style={{ color: bulletMarker, fontWeight: 700 }}>›</span>
              <span>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: bulletText }}>{item.t}</span>
                <span style={{ fontSize: 12.5, color: whiteText ? "rgba(255,255,255,.78)" : "rgba(255,255,255,.66)" }}>
                  {" "}— {item.d}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/**
 * The registration form itself (heading, fields, submit) plus the post-submit
 * success state. `onSubmitted` fires after a successful POST; `successAction` is
 * rendered as the call-to-action on the success panel.
 */
export function CampRegistrationForm({
  onSubmitted,
  successAction,
}: {
  onSubmitted?: () => void
  successAction: React.ReactNode
}) {
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: "idle" })
  const [exp, setExp]       = useState<Exp>("none")
  const [errs, setErrs]     = useState<Record<string, boolean>>({})

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus({ kind: "idle" })

    const fd = new FormData(e.currentTarget)
    const v = (k: string) => String(fd.get(k) || "").trim()

    const fields = {
      guardian_name: v("guardian_name"),
      camper_name:   v("camper_name"),
      camper_age:    v("camper_age"),
      email:         v("email"),
      phone:         v("phone"),
    }

    const nextErrs: Record<string, boolean> = {}
    for (const [k, val] of Object.entries(fields)) if (!val) nextErrs[k] = true
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) nextErrs.email = true
    const ageNum = Number(fields.camper_age)
    if (fields.camper_age && (!Number.isInteger(ageNum) || ageNum < 7 || ageNum > 13)) nextErrs.camper_age = true
    setErrs(nextErrs)
    if (Object.keys(nextErrs).length > 0) {
      setStatus({
        kind: "err",
        msg: nextErrs.camper_age && Object.keys(nextErrs).length === 1
          ? "This camp is for ages 7–13."
          : "Please complete the required fields.",
      })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/submit_stem_camp_registration`, {
        method: "POST",
        headers: {
          apikey:         SUPABASE_ANON,
          Authorization:  `Bearer ${SUPABASE_ANON}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          p_guardian_name: fields.guardian_name,
          p_camper_name:   fields.camper_name,
          p_camper_age:    ageNum,
          p_email:         fields.email,
          p_phone:         fields.phone,
          p_experience:    exp,
          p_notes:         v("notes")      || null,
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
          color: C.brand,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        Now Enrolling · ${FEE} · Only 30 spots
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
        Reserve your<br />camper's spot.
      </h2>
      <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: 14 }}>
        <Field label="Parent / guardian name" name="guardian_name" required err={errs.guardian_name} autoComplete="name" />
        <Row>
          <Field label="Camper's name" name="camper_name" required err={errs.camper_name} />
          <Field label="Camper's age (7–13)" name="camper_age" required err={errs.camper_age} type="number" inputMode="numeric" />
        </Row>
        <Row>
          <Field label="Email" name="email" required err={errs.email} type="email" autoComplete="email" />
          <Field label="Phone / WhatsApp" name="phone" required err={errs.phone} type="tel" autoComplete="tel" />
        </Row>

        <Segmented
          label="STEM / maker experience"
          value={exp}
          onChange={setExp}
          options={[
            { value: "none", label: "New to it" },
            { value: "some", label: "Some" },
            { value: "lots", label: "Lots" },
          ]}
        />

        <Field label="Anything we should know? (optional)" name="notes" textarea placeholder="Allergies, accessibility needs, or anything else." />
        <Field label="How did you hear about us? (optional)" name="heard_from" placeholder="WhatsApp, a friend, Instagram…" />

        {status.kind === "err" && (
          <div
            style={{
              borderLeft: `3px solid ${C.brand}`,
              padding: "9px 13px",
              background: "rgba(31,115,208,.10)",
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
              color: "#fff",
              border: `1.5px solid ${C.ink}`,
              borderRadius: 999,
              padding: "12px 26px",
              fontFamily: BODY,
              fontWeight: 600,
              fontSize: 14.5,
              cursor: submitting ? "wait" : "pointer",
              boxShadow: `4px 4px 0 ${C.brand}`,
              opacity: submitting ? 0.65 : 1,
            }}
          >
            {submitting ? "Submitting…" : "Reserve a Spot →"}
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
  const borderColor = err ? C.brand : C.line
  const common: React.CSSProperties = {
    width: "100%", padding: "10px 13px", border: `1.5px solid ${borderColor}`,
    background: "rgba(255,255,255,0.8)", color: C.ink, fontFamily: BODY, fontSize: 14.5,
    borderRadius: 5, outline: "none",
  }
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <span style={{ fontFamily: BODY, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: C.ink2, fontWeight: 500 }}>
        {label}{required && <span style={{ color: C.brand, marginLeft: 3 }}>*</span>}
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
        {label}<span style={{ color: C.brand, marginLeft: 3 }}>*</span>
      </span>
      <div style={{ display: "grid", gap: 7, gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
              style={{ padding: "10px 8px", border: `1.5px solid ${active ? C.ink : C.line}`,
                       background: active ? C.ink : "rgba(255,255,255,0.8)",
                       color: active ? "#fff" : C.ink, fontFamily: BODY, fontSize: 13,
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

function SuccessPanel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 8px" }}>
      <div style={{ width: 66, height: 66, borderRadius: "50%", background: C.ink, color: "#fff",
                    display: "grid", placeItems: "center", margin: "0 auto 20px", fontSize: 32,
                    fontWeight: 700, boxShadow: `5px 5px 0 ${C.brand}` }}>
        ✓
      </div>
      <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 32, letterSpacing: "-0.01em", margin: "0 0 10px", color: C.ink }}>
        Spot reserved!
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.5, color: C.ink2, maxWidth: 380, margin: "0 auto 26px" }}>
        Request received. We'll reach out over WhatsApp to confirm your camper's
        place for Monday, June 29. See you there — 你好!
      </p>
      {children}
    </div>
  )
}
