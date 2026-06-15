import { login } from "../actions"
import { adminPassword, isAuthed } from "../lib"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

const C = {
  paper: "#f5f1ea",
  ink: "#14171d",
  ink2: "rgba(20,23,29,.70)",
  ink3: "rgba(20,23,29,.42)",
  sun: "#d8632a",
  line: "rgba(20,23,29,.16)",
}
const SERIF = "'Instrument Serif', serif"
const BODY = "'Barlow', sans-serif"

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  if (await isAuthed()) redirect("/admin")
  const sp = await searchParams
  const configured = !!adminPassword()

  return (
    <main
      style={{
        minHeight: "100vh",
        background: C.paper,
        color: C.ink,
        fontFamily: BODY,
        display: "grid",
        placeItems: "center",
        padding: 20,
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div
          style={{
            fontFamily: BODY,
            fontSize: 11,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: C.sun,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          CRACH.AD · Admin
        </div>
        <h1
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: "2.4rem",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            margin: "0 0 22px",
          }}
        >
          Camp sign-ups
        </h1>

        {!configured ? (
          <div
            style={{
              border: `1.5px solid ${C.line}`,
              borderRadius: 8,
              padding: "16px 16px",
              fontSize: 13.5,
              lineHeight: 1.5,
              color: C.ink2,
              background: "rgba(255,255,255,.5)",
            }}
          >
            <b style={{ color: C.ink }}>Not configured.</b> Set <code>ADMIN_PASSWORD</code> and{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> in <code>.env.local</code>, then restart the
            server.
          </div>
        ) : (
          <form action={login} style={{ display: "grid", gap: 12 }}>
            {sp?.error && (
              <div
                style={{
                  borderLeft: `3px solid ${C.sun}`,
                  padding: "9px 13px",
                  background: "rgba(216,99,42,.10)",
                  fontSize: 13.5,
                }}
              >
                Incorrect password.
              </div>
            )}
            <input
              type="password"
              name="password"
              placeholder="Admin password"
              autoFocus
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: `1.5px solid ${C.line}`,
                background: "rgba(255,255,255,.65)",
                color: C.ink,
                fontFamily: BODY,
                fontSize: 15,
                borderRadius: 6,
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                background: C.ink,
                color: C.paper,
                border: "none",
                borderRadius: 999,
                padding: "12px 22px",
                fontFamily: BODY,
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                boxShadow: `4px 4px 0 ${C.sun}`,
              }}
            >
              Sign in →
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
