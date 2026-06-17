import { redirect } from "next/navigation"
import { isAuthed, serviceKey, fetchRegistrations, type AiRow } from "./lib"
import { Dashboard } from "./dashboard"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  if (!(await isAuthed())) redirect("/admin/login")

  if (!serviceKey()) {
    return (
      <ConfigError msg="SUPABASE_SERVICE_ROLE_KEY is not set. Add it to .env.local (Supabase → Project Settings → API → service_role) and restart the server." />
    )
  }

  let rows: AiRow[] = []
  let error: string | null = null
  try {
    rows = await fetchRegistrations()
  } catch (e: any) {
    error = e?.message || "Failed to load registrations."
  }

  return <Dashboard rows={rows} error={error} />
}

function ConfigError({ msg }: { msg: string }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f1ea",
        color: "#14171d",
        fontFamily: "'Barlow', sans-serif",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 460, lineHeight: 1.55, fontSize: 15 }}>
        <b>Setup needed.</b>
        <p style={{ color: "rgba(20,23,29,.7)" }}>{msg}</p>
      </div>
    </main>
  )
}
