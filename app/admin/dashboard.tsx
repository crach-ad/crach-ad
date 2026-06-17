"use client"

import { useMemo, useState, useTransition } from "react"
import { Download, LogOut, Search, Trash2 } from "lucide-react"
import { updateStatus, deleteRegistration, logout } from "./actions"

// Mirror of lib.ts constants — kept here so this client component never imports the server-only lib.
const STATUSES = ["new", "contacted", "confirmed", "paid", "cancelled"] as const
type Status = (typeof STATUSES)[number]

const DAYS = ["mon", "tue", "wed", "thu", "fri"] as const
const DAY_LABEL: Record<string, string> = {
  mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri",
}
const PRICE_PER_SESSION = 70

const TRACK_LABEL: Record<string, string> = {
  business: "Business", professional: "Professional", everyday: "Everyday",
}
const FORMAT_LABEL: Record<string, string> = {
  in_person: "In person", online: "Online",
}
const SLOT_LABEL: Record<string, string> = {
  early: "5:00–6:30", late: "6:30–8:00", either: "Either",
}
const EXP_LABEL: Record<string, string> = { none: "New to it", some: "Some", lots: "Lots" }

type AiRow = {
  id: string
  created_at: string
  full_name: string
  email: string
  phone: string
  track: string
  ai_experience: string
  format: string
  time_slot: string
  days: string[]
  goals: string | null
  heard_from: string | null
  status: Status
}

const C = {
  paper: "#f5f1ea",
  card: "#fbf9f4",
  ink: "#14171d",
  ink2: "rgba(20,23,29,.66)",
  ink3: "rgba(20,23,29,.42)",
  sun: "#d8632a",
  line: "rgba(20,23,29,.14)",
}
const SERIF = "'Instrument Serif', serif"
const BODY = "'Barlow', sans-serif"

const STATUS_COLOR: Record<Status, { bg: string; fg: string }> = {
  new:       { bg: "#e6ecf5", fg: "#2c4a78" },
  contacted: { bg: "#fbe8d6", fg: "#9a5a12" },
  confirmed: { bg: "#dcebe6", fg: "#1f6b54" },
  paid:      { bg: "#dcefdc", fg: "#256b2a" },
  cancelled: { bg: "#eee9e3", fg: "#8a8278" },
}

function sortDays(days: string[]): string[] {
  return (days || []).slice().sort((a, b) => DAYS.indexOf(a as any) - DAYS.indexOf(b as any))
}

export function Dashboard({ rows: initial, error }: { rows: AiRow[]; error: string | null }) {
  const [rows, setRows] = useState<AiRow[]>(initial)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all")
  const [trackFilter, setTrackFilter] = useState<"all" | string>("all")
  const [dayFilter, setDayFilter] = useState<"all" | string>("all")
  const [, startTransition] = useTransition()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false
      if (trackFilter !== "all" && r.track !== trackFilter) return false
      if (dayFilter !== "all" && !r.days?.includes(dayFilter)) return false
      if (!q) return true
      return [r.full_name, r.email, r.phone]
        .some((f) => (f || "").toLowerCase().includes(q))
    })
  }, [rows, query, statusFilter, trackFilter, dayFilter])

  const stats = useMemo(() => {
    const byStatus = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<Status, number>
    let daySessions = 0
    let revenue = 0
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] || 0) + 1
      if (r.status !== "cancelled") {
        daySessions += r.days?.length || 0
        revenue += (r.days?.length || 0) * PRICE_PER_SESSION
      }
    }
    return { total: rows.length, byStatus, daySessions, revenue }
  }, [rows])

  function onStatus(id: string, next: Status) {
    const prev = rows
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: next } : r)))
    startTransition(async () => {
      try {
        await updateStatus(id, next)
      } catch {
        setRows(prev)
        alert("Couldn't update status. Please try again.")
      }
    })
  }

  function onDelete(id: string, name: string) {
    if (!confirm(`Delete the sign-up for ${name}? This can't be undone.`)) return
    const prev = rows
    setRows((rs) => rs.filter((r) => r.id !== id))
    startTransition(async () => {
      try {
        await deleteRegistration(id)
      } catch {
        setRows(prev)
        alert("Couldn't delete. Please try again.")
      }
    })
  }

  function exportCsv() {
    const cols = [
      "created", "status", "full_name", "email", "phone",
      "track", "ai_experience", "format", "time_slot",
      "days", "days_count", "amount", "goals", "heard_from",
    ]
    const esc = (v: unknown) => {
      const s = String(v ?? "")
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
    }
    const lines = [cols.join(",")]
    for (const r of filtered) {
      const n = r.days?.length || 0
      lines.push([
        r.created_at?.slice(0, 10), r.status, r.full_name, r.email, r.phone,
        TRACK_LABEL[r.track] || r.track, EXP_LABEL[r.ai_experience] || r.ai_experience,
        FORMAT_LABEL[r.format] || r.format, SLOT_LABEL[r.time_slot] || r.time_slot,
        sortDays(r.days).map((d) => DAY_LABEL[d] || d).join(" / "),
        n, n * PRICE_PER_SESSION, r.goals || "", r.heard_from || "",
      ].map(esc).join(","))
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ai-sessions-${filtered.length}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main style={{ minHeight: "100vh", background: C.paper, color: C.ink, fontFamily: BODY, padding: "32px 24px 64px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: C.sun, fontWeight: 600, marginBottom: 4 }}>
              CRACHAD · AI Sessions
            </div>
            <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "2.6rem", lineHeight: 0.95, letterSpacing: "-0.02em", margin: 0 }}>
              Session bookings
            </h1>
          </div>
          <form action={logout}>
            <button type="submit" style={ghostBtn}>
              <LogOut style={{ width: 15, height: 15 }} /> Sign out
            </button>
          </form>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 22 }}>
          <Stat label="Total bookings" value={String(stats.total)} />
          <Stat label="Confirmed + Paid" value={String(stats.byStatus.confirmed + stats.byStatus.paid)} />
          <Stat label="Day-sessions / week" value={String(stats.daySessions)} />
          <Stat label="Projected revenue" value={`$${stats.revenue.toLocaleString()}`} accent />
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
          <div style={{ position: "relative", flex: "1 1 240px", minWidth: 200 }}>
            <Search style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: C.ink3 }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, phone…"
              style={{ ...inputBase, paddingLeft: 34, width: "100%" }}
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} style={inputBase}>
            <option value="all">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{cap(s)} ({stats.byStatus[s]})</option>
            ))}
          </select>
          <select value={trackFilter} onChange={(e) => setTrackFilter(e.target.value)} style={inputBase}>
            <option value="all">All tracks</option>
            {Object.entries(TRACK_LABEL).map(([k, label]) => (
              <option key={k} value={k}>{label}</option>
            ))}
          </select>
          <select value={dayFilter} onChange={(e) => setDayFilter(e.target.value)} style={inputBase}>
            <option value="all">All days</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>{DAY_LABEL[d]}</option>
            ))}
          </select>
          <button onClick={exportCsv} disabled={filtered.length === 0} style={{ ...ghostBtn, opacity: filtered.length === 0 ? 0.5 : 1 }}>
            <Download style={{ width: 15, height: 15 }} /> Export CSV
          </button>
        </div>

        {error && (
          <div style={{ borderLeft: `3px solid ${C.sun}`, padding: "10px 14px", background: "rgba(216,99,42,.10)", marginBottom: 16, fontSize: 14 }}>
            {error}
          </div>
        )}

        <div style={{ fontSize: 12.5, color: C.ink3, marginBottom: 10 }}>
          Showing {filtered.length} of {rows.length}
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto", border: `1px solid ${C.line}`, borderRadius: 10, background: C.card }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, minWidth: 960 }}>
            <thead>
              <tr style={{ textAlign: "left", color: C.ink2 }}>
                {["Received", "Person", "Track / format", "Slot", "Days", "Exp.", "Status", ""].map((h, i) => (
                  <th key={i} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: "40px 16px", textAlign: "center", color: C.ink3 }}>
                    {rows.length === 0 ? "No bookings yet." : "No bookings match your filters."}
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} style={{ borderTop: `1px solid ${C.line}`, verticalAlign: "top" }}>
                    <td style={td}>
                      <span style={{ color: C.ink2 }}>{r.created_at?.slice(0, 10)}</span>
                    </td>
                    <td style={td}>
                      <div style={{ fontWeight: 600 }}>{r.full_name}</div>
                      <div style={{ fontSize: 12.5 }}>
                        <a href={`mailto:${r.email}`} style={{ color: C.sun, textDecoration: "none" }}>{r.email}</a>
                      </div>
                      <div style={{ color: C.ink2, fontSize: 12.5 }}>{r.phone}</div>
                      {r.goals && <div style={{ color: C.ink3, fontSize: 11.5, marginTop: 4, fontStyle: "italic" }}>“{r.goals}”</div>}
                      {r.heard_from && <div style={{ color: C.ink3, fontSize: 11.5, marginTop: 2 }}>via {r.heard_from}</div>}
                    </td>
                    <td style={td}>
                      <div style={{ fontWeight: 600 }}>{TRACK_LABEL[r.track] || r.track}</div>
                      <div style={{ color: C.ink2, fontSize: 12.5 }}>{FORMAT_LABEL[r.format] || r.format}</div>
                    </td>
                    <td style={{ ...td, color: C.ink2, whiteSpace: "nowrap" }}>{SLOT_LABEL[r.time_slot] || r.time_slot}</td>
                    <td style={td}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, maxWidth: 140 }}>
                        {sortDays(r.days).map((d) => (
                          <span key={d} style={dayBadge}>{DAY_LABEL[d] || d}</span>
                        ))}
                      </div>
                      <div style={{ color: C.ink3, fontSize: 11.5, marginTop: 3 }}>
                        ${((r.days?.length || 0) * PRICE_PER_SESSION).toLocaleString()} / wk
                      </div>
                    </td>
                    <td style={{ ...td, color: C.ink2 }}>{EXP_LABEL[r.ai_experience] || r.ai_experience}</td>
                    <td style={td}>
                      <select
                        value={r.status}
                        onChange={(e) => onStatus(r.id, e.target.value as Status)}
                        style={{
                          appearance: "none",
                          border: "none",
                          borderRadius: 999,
                          padding: "5px 12px",
                          fontFamily: BODY,
                          fontSize: 12.5,
                          fontWeight: 600,
                          cursor: "pointer",
                          background: STATUS_COLOR[r.status].bg,
                          color: STATUS_COLOR[r.status].fg,
                        }}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{cap(s)}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ ...td, textAlign: "right" }}>
                      <button
                        onClick={() => onDelete(r.id, r.full_name)}
                        aria-label="Delete booking"
                        style={{ border: "none", background: "none", cursor: "pointer", color: C.ink3, padding: 4 }}
                      >
                        <Trash2 style={{ width: 16, height: 16 }} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ border: `1px solid ${C.line}`, borderRadius: 10, padding: "14px 16px", background: C.card }}>
      <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: C.ink3, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.9rem", lineHeight: 1, color: accent ? C.sun : C.ink }}>{value}</div>
    </div>
  )
}

const inputBase: React.CSSProperties = {
  padding: "9px 12px",
  border: `1.5px solid ${C.line}`,
  background: "rgba(255,255,255,.7)",
  color: C.ink,
  fontFamily: BODY,
  fontSize: 13.5,
  borderRadius: 7,
  outline: "none",
}

const ghostBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "9px 14px",
  border: `1.5px solid ${C.line}`,
  background: "rgba(255,255,255,.7)",
  color: C.ink,
  fontFamily: BODY,
  fontSize: 13,
  fontWeight: 500,
  borderRadius: 999,
  cursor: "pointer",
}

const th: React.CSSProperties = {
  padding: "11px 14px",
  fontSize: 11,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  fontWeight: 600,
  whiteSpace: "nowrap",
}
const td: React.CSSProperties = { padding: "12px 14px", lineHeight: 1.4 }

const dayBadge: React.CSSProperties = {
  background: "#ece6dc",
  color: "#5a5347",
  borderRadius: 5,
  padding: "2px 6px",
  fontSize: 11,
  fontWeight: 600,
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
