"use client"

import Link from "next/link"
import { useState } from "react"

const SUPABASE_URL = "https://wizfmnaxmbrcrrdrihpb.supabase.co"
// Public anon key — RLS-safe by design (writes go through SECURITY DEFINER RPC).
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpemZtbmF4bWJyY3JyZHJpaHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NzI2MTIsImV4cCI6MjA4NzI0ODYxMn0.liSgurL19uR_x1n3dVg_eUWq7QeCnS--IRUpPOXfQBU"

const C = {
  paper:  "#eaf2f8",
  ink:    "#1d3557",
  ink2:   "rgba(29,53,87,.70)",
  ink3:   "rgba(29,53,87,.45)",
  blue:   "#2c6cb0",
  sky:    "#6ea8da",
  tan:    "#c8a27a",
}

const DISPLAY = "'Bricolage Grotesque', system-ui, sans-serif"
const MONO    = "'JetBrains Mono', ui-monospace, monospace"
const BODY    = "'Barlow', 'DM Sans', system-ui, sans-serif"

type Status = { kind: "idle" } | { kind: "err"; msg: string } | { kind: "ok" }

export default function HitlRegisterPage() {
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: "idle" })
  const [aiExp, setAiExp] = useState<"none" | "some" | "heavy">("some")
  const [errs, setErrs] = useState<Record<string, boolean>>({})

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus({ kind: "idle" })

    const fd = new FormData(e.currentTarget)
    const v = (k: string) => String(fd.get(k) || "").trim()

    const fields: Record<string, string> = {
      full_name:    v("full_name"),
      email:        v("email"),
      phone:        v("phone"),
      organization: v("organization"),
      role:         v("role"),
    }

    const nextErrs: Record<string, boolean> = {}
    for (const [k, val] of Object.entries(fields)) if (!val) nextErrs[k] = true
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) nextErrs.email = true
    setErrs(nextErrs)
    if (Object.keys(nextErrs).length > 0) {
      setStatus({ kind: "err", msg: "Please complete the required fields." })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/submit_hitl_registration`, {
        method: "POST",
        headers: {
          apikey:        SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          p_full_name:     fields.full_name,
          p_email:         fields.email,
          p_phone:         fields.phone,
          p_organization:  fields.organization,
          p_role:          fields.role,
          p_ai_experience: aiExp,
          p_goals:         v("goals")      || null,
          p_heard_from:    v("heard_from") || null,
        }),
      })
      const body = await res.json().catch(() => ({} as any))
      if (!res.ok)       throw new Error(`HTTP ${res.status} — ${body?.message ?? "request failed"}`)
      if (body?.ok === false) throw new Error(body.error || "Submission rejected.")
      setStatus({ kind: "ok" })
    } catch (err: any) {
      setStatus({ kind: "err", msg: err?.message || "Something went wrong. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: C.paper, color: C.ink, fontFamily: BODY, padding: "48px 20px" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=JetBrains+Mono:wght@400;500;600&family=Barlow:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Link
          href="/humanintheloop"
          style={{ display: "inline-block", marginBottom: 28, fontFamily: MONO, fontSize: 12,
                   letterSpacing: ".14em", textTransform: "uppercase", color: C.ink2,
                   textDecoration: "none", borderBottom: `1px solid ${C.ink3}` }}
        >
          ← back to flyer
        </Link>

        {status.kind === "ok" ? (
          <SuccessPanel />
        ) : (
          <>
            <header style={{ marginBottom: 36 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".18em",
                            textTransform: "uppercase", color: C.blue, marginBottom: 10 }}>
                Vol. 04 · Summer 2026 · Registration
              </div>
              <h1 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(34px, 6vw, 56px)",
                           lineHeight: 1.02, letterSpacing: "-0.02em", margin: 0, color: C.ink }}>
                Human in the<br/>
                <span style={{ color: C.blue, fontStyle: "italic", fontWeight: 600 }}>Loop.</span>
              </h1>
              <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.5, color: C.ink2, maxWidth: 580 }}>
                Eight weeks. Eight modules. Practical AI for educators, executives, operators, and teams.
                Tell us about yourself — we'll be in touch within 48 hours with payment options and onboarding.
              </p>

              <div style={{ display: "flex", gap: 24, marginTop: 22, fontFamily: MONO, fontSize: 11,
                            letterSpacing: ".12em", textTransform: "uppercase", color: C.ink2, flexWrap: "wrap" }}>
                <span><b style={{ color: C.ink, fontWeight: 600 }}>When</b> · Jun 30 – Aug 4 · Tuesdays 6–8:30 PM</span>
                <span><b style={{ color: C.ink, fontWeight: 600 }}>Tuition</b> · $800</span>
              </div>
            </header>

            <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: 18 }}>
              <Row>
                <Field label="Full name" name="full_name" required err={errs.full_name} autoComplete="name" />
                <Field label="Email"     name="email"     required err={errs.email}     type="email"  autoComplete="email" />
              </Row>
              <Row>
                <Field label="Phone"          name="phone"        required err={errs.phone}        type="tel"  autoComplete="tel" />
                <Field label="Organization"   name="organization" required err={errs.organization} autoComplete="organization" />
              </Row>
              <Field label="Role / title" name="role" required err={errs.role} autoComplete="organization-title" />

              <Segmented
                label="Experience with AI"
                value={aiExp}
                onChange={setAiExp}
                options={[
                  { value: "none",  label: "None — getting started" },
                  { value: "some",  label: "Some — used ChatGPT or Claude" },
                  { value: "heavy", label: "Heavy — daily / advanced" },
                ]}
              />

              <Field label="What do you want to get out of the program?" name="goals"
                     textarea placeholder="e.g. cut my email triage by 80%, draft client briefs in 10 minutes, build internal automations…" />

              <Field label="How did you hear about us?" name="heard_from" placeholder="Word of mouth, social, search, an event…" />

              {status.kind === "err" && (
                <div style={{ borderLeft: `3px solid ${C.tan}`, padding: "10px 14px",
                              background: "rgba(200,162,122,.10)", color: C.ink, fontSize: 14, lineHeight: 1.45 }}>
                  {status.msg}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                            flexWrap: "wrap", gap: 14, marginTop: 6 }}>
                <p style={{ fontSize: 12, color: C.ink3, margin: 0, maxWidth: 360 }}>
                  We only use this to contact you about the cohort. No marketing.
                </p>
                <button type="submit" disabled={submitting}
                  style={{ background: C.ink, color: C.paper, border: `1.5px solid ${C.ink}`,
                           borderRadius: 999, padding: "12px 26px", fontFamily: DISPLAY, fontWeight: 600,
                           fontSize: 15, letterSpacing: ".01em", cursor: submitting ? "wait" : "pointer",
                           boxShadow: `4px 4px 0 ${C.tan}`, opacity: submitting ? 0.65 : 1,
                           transition: "transform 60ms ease, box-shadow 60ms ease" }}>
                  {submitting ? "Submitting…" : "Register →"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
      {children}
    </div>
  )
}

function Field({
  label, name, required, err, type = "text", autoComplete, placeholder, textarea = false,
}: {
  label: string; name: string; required?: boolean; err?: boolean
  type?: string; autoComplete?: string; placeholder?: string; textarea?: boolean
}) {
  const borderColor = err ? C.tan : C.ink3
  const common: React.CSSProperties = {
    width: "100%", padding: "12px 14px", border: `1.5px solid ${borderColor}`,
    background: "rgba(255,255,255,0.55)", color: C.ink, fontFamily: BODY, fontSize: 15,
    borderRadius: 4, outline: "none", transition: "border-color 80ms ease, background 80ms ease",
  }
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: ".14em",
                     textTransform: "uppercase", color: C.ink2 }}>
        {label}{required && <span style={{ color: C.blue, marginLeft: 4 }}>*</span>}
      </span>
      {textarea ? (
        <textarea name={name} placeholder={placeholder}
          style={{ ...common, minHeight: 96, resize: "vertical", fontFamily: BODY }}
          onFocus={(e) => (e.currentTarget.style.borderColor = C.ink)}
          onBlur={(e) => (e.currentTarget.style.borderColor = borderColor)}
        />
      ) : (
        <input type={type} name={name} required={required} autoComplete={autoComplete}
          placeholder={placeholder} style={common}
          onFocus={(e) => (e.currentTarget.style.borderColor = C.ink)}
          onBlur={(e) => (e.currentTarget.style.borderColor = borderColor)}
        />
      )}
      {err && (
        <span style={{ fontFamily: MONO, fontSize: 10, color: C.tan, letterSpacing: ".04em" }}>
          Required
        </span>
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
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: ".14em",
                     textTransform: "uppercase", color: C.ink2 }}>
        {label}<span style={{ color: C.blue, marginLeft: 4 }}>*</span>
      </span>
      <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
              style={{ padding: "12px 14px", border: `1.5px solid ${active ? C.ink : C.ink3}`,
                       background: active ? C.ink : "rgba(255,255,255,0.55)",
                       color: active ? C.paper : C.ink, fontFamily: BODY, fontSize: 14,
                       fontWeight: active ? 600 : 400, cursor: "pointer", textAlign: "left",
                       borderRadius: 4, transition: "all 80ms ease" }}>
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SuccessPanel() {
  return (
    <div style={{ textAlign: "center", padding: "56px 16px" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.ink,
                    color: C.paper, display: "grid", placeItems: "center",
                    margin: "0 auto 24px", fontSize: 36, fontWeight: 700,
                    boxShadow: `6px 6px 0 ${C.tan}` }}>
        ✓
      </div>
      <h2 style={{ fontFamily: DISPLAY, fontSize: 36, fontWeight: 700, letterSpacing: "-0.01em",
                   margin: "0 0 12px", color: C.ink }}>
        You're in the loop.
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.5, color: C.ink2, maxWidth: 460, margin: "0 auto" }}>
        Registration received. We'll be in touch within 48 hours with payment options and onboarding.
      </p>
      <Link
        href="/humanintheloop"
        style={{ display: "inline-block", marginTop: 32, padding: "12px 26px",
                 background: C.ink, color: C.paper, fontFamily: DISPLAY, fontWeight: 600,
                 fontSize: 15, borderRadius: 999, textDecoration: "none",
                 boxShadow: `4px 4px 0 ${C.tan}` }}
      >
        Back to flyer →
      </Link>
    </div>
  )
}
