"use client"

import { useState } from "react"
import { LogOut } from "lucide-react"
import { Dashboard } from "./dashboard"
import { CampDashboard } from "./camp-dashboard"
import { logout } from "./actions"

type AiRow = Parameters<typeof Dashboard>[0]["rows"][number]
type CampRow = Parameters<typeof CampDashboard>[0]["rows"][number]

const BODY = "'Barlow', sans-serif"

export function AdminTabs({
  ai,
  camp,
}: {
  ai: { rows: AiRow[]; error: string | null }
  camp: { rows: CampRow[]; error: string | null }
}) {
  const [tab, setTab] = useState<"camp" | "ai">("camp")
  const bg = tab === "ai" ? "#f5f1ea" : "#f5f7fb"
  const ink = tab === "ai" ? "#14171d" : "#102a52"
  const accent = tab === "ai" ? "#d8632a" : "#1f73d0"

  return (
    <main style={{ minHeight: "100vh", background: bg, color: ink, fontFamily: BODY, padding: "32px 24px 64px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* Tab bar + sign out */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
          <div style={{ display: "inline-flex", gap: 6, background: "rgba(0,0,0,.04)", padding: 4, borderRadius: 999 }}>
            <TabBtn active={tab === "camp"} accent={accent} count={camp.rows.length} onClick={() => setTab("camp")}>
              STEM Camp
            </TabBtn>
            <TabBtn active={tab === "ai"} accent={accent} count={ai.rows.length} onClick={() => setTab("ai")}>
              AI Sessions
            </TabBtn>
          </div>
          <form action={logout}>
            <button
              type="submit"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 14px",
                border: "1.5px solid rgba(0,0,0,.14)", background: "rgba(255,255,255,.7)", color: ink,
                fontFamily: BODY, fontSize: 13, fontWeight: 500, borderRadius: 999, cursor: "pointer",
              }}
            >
              <LogOut style={{ width: 15, height: 15 }} /> Sign out
            </button>
          </form>
        </div>

        {tab === "ai"
          ? <Dashboard rows={ai.rows} error={ai.error} />
          : <CampDashboard rows={camp.rows} error={camp.error} />}
      </div>
    </main>
  )
}

function TabBtn({
  active, accent, count, onClick, children,
}: {
  active: boolean; accent: string; count: number; onClick: () => void; children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "8px 16px", borderRadius: 999, border: "none", cursor: "pointer",
        fontFamily: BODY, fontSize: 13.5, fontWeight: 600,
        background: active ? "#fff" : "transparent",
        color: active ? accent : "rgba(0,0,0,.55)",
        boxShadow: active ? "0 1px 3px rgba(0,0,0,.12)" : "none",
      }}
    >
      {children}
      <span style={{
        fontSize: 11, fontWeight: 700, minWidth: 18, textAlign: "center",
        padding: "1px 6px", borderRadius: 999,
        background: active ? accent : "rgba(0,0,0,.10)",
        color: active ? "#fff" : "rgba(0,0,0,.5)",
      }}>
        {count}
      </span>
    </button>
  )
}
