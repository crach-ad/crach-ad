"use client"

import { useMemo, useState, useTransition } from "react"
import { Download, Search, Trash2 } from "lucide-react"
import { updateCampStatus, deleteCampRegistration } from "./actions"

// Mirror of lib.ts constants — kept here so this client component never imports the server-only lib.
const STATUSES = ["new", "contacted", "confirmed", "paid", "cancelled"] as const
type Status = (typeof STATUSES)[number]

const CAMP_FEE = 25
const EXP_LABEL: Record<string, string> = { none: "New to it", some: "Some", lots: "Lots" }

type CampRow = {
  id: string
  created_at: string
  guardian_name: string
  camper_name: string
  camper_age: number
  email: string
  phone: string
  experience: string
  notes: string | null
  heard_from: string | null
  status: Status
}

const C = {
  paper: "#f5f7fb",
  card: "#fdfdff",
  ink: "#102a52",
  ink2: "rgba(16,42,82,.66)",
  ink3: "rgba(16,42,82,.42)",
  brand: "#1f73d0",
  line: "rgba(16,42,82,.14)",
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

export function CampDashboard({ rows: initial, error }: { rows: CampRow[]; error: string | null }) {
  const [rows, setRows] = useState<CampRow[]>(initial)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all")
  const [, startTransition] = useTransition()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false
      if (!q) return true
      return [r.guardian_name, r.camper_name, r.email, r.phone]
        .some((f) => (f || "").toLowerCase().includes(q))
    })
  }, [rows, query, statusFilter])

  const stats = useMemo(() => {
    const byStatus = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<Status, number>
    let active = 0
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] || 0) + 1
      if (r.status !== "cancelled") active += 1
    }
    return { total: rows.length, byStatus, active, revenue: active * CAMP_FEE }
  }, [rows])

  function onStatus(id: string, next: Status) {
    const prev = rows
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: next } : r)))
    startTransition(async () => {
      try {
        await updateCampStatus(id, next)
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
        await deleteCampRegistration(id)
      } catch {
        setRows(prev)
        alert("Couldn't delete. Please try again.")
      }
    })
  }

  function exportCsv() {
    const cols = [
      "created", "status", "camper_name", "camper_age", "guardian_name",
      "email", "phone", "experience", "amount", "notes", "heard_from",
    ]
    const esc = (v: unknown) => {
      const s = String(v ?? "")
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
    }
    const lines = [cols.join(",")]
    for (const r of filtered) {
      lines.push([
        r.created_at?.slice(0, 10), r.status, r.camper_name, r.camper_age, r.guardian_name,
        r.email, r.phone, EXP_LABEL[r.experience] || r.experience,
        CAMP_FEE, r.notes || "", r.heard_from || "",
      ].map(esc).join(","))
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `stem-camp-${filtered.length}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: C.brand, fontWeight: 600, marginBottom: 4 }}>
          CRACHAD · Spanish Wells · Mon June 29
        </div>
        <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "2.6rem", lineHeight: 0.95, letterSpacing: "-0.02em", margin: 0, color: C.ink }}>
          STEM &amp; Mandarin camp sign-ups
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 22 }}>
        <Stat label="Total sign-ups" value={String(stats.total)} />
        <Stat label="Confirmed + Paid" value={String(stats.byStatus.confirmed + stats.byStatus.paid)} />
        <Stat label="Active campers" value={String(stats.active)} />
        <Stat label="Projected revenue" value={`$${stats.revenue.toLocaleString()}`} accent />
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
        <div style={{ position: "relative", flex: "1 1 240px", minWidth: 200 }}>
          <Search style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: C.ink3 }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search camper, parent, email, phone…"
            style={{ ...inputBase, paddingLeft: 34, width: "100%" }}
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} style={inputBase}>
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{cap(s)} ({stats.byStatus[s]})</option>
          ))}
        </select>
        <button onClick={exportCsv} disabled={filtered.length === 0} style={{ ...ghostBtn, opacity: filtered.length === 0 ? 0.5 : 1 }}>
          <Download style={{ width: 15, height: 15 }} /> Export CSV
        </button>
      </div>

      {error && (
        <div style={{ borderLeft: `3px solid ${C.brand}`, padding: "10px 14px", background: "rgba(31,115,208,.10)", marginBottom: 16, fontSize: 14 }}>
          {error}
        </div>
      )}

      <div style={{ fontSize: 12.5, color: C.ink3, marginBottom: 10 }}>
        Showing {filtered.length} of {rows.length}
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto", border: `1px solid ${C.line}`, borderRadius: 10, background: C.card }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, minWidth: 820 }}>
          <thead>
            <tr style={{ textAlign: "left", color: C.ink2 }}>
              {["Received", "Camper", "Age", "Parent / contact", "Exp.", "Status", ""].map((h, i) => (
                <th key={i} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "40px 16px", textAlign: "center", color: C.ink3 }}>
                  {rows.length === 0 ? "No sign-ups yet." : "No sign-ups match your filters."}
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} style={{ borderTop: `1px solid ${C.line}`, verticalAlign: "top" }}>
                  <td style={td}>
                    <span style={{ color: C.ink2 }}>{r.created_at?.slice(0, 10)}</span>
                  </td>
                  <td style={td}>
                    <div style={{ fontWeight: 600 }}>{r.camper_name}</div>
                    {r.notes && <div style={{ color: C.ink3, fontSize: 11.5, marginTop: 4, fontStyle: "italic" }}>“{r.notes}”</div>}
                    {r.heard_from && <div style={{ color: C.ink3, fontSize: 11.5, marginTop: 2 }}>via {r.heard_from}</div>}
                  </td>
                  <td style={{ ...td, color: C.ink2 }}>{r.camper_age}</td>
                  <td style={td}>
                    <div style={{ fontWeight: 600 }}>{r.guardian_name}</div>
                    <div style={{ fontSize: 12.5 }}>
                      <a href={`mailto:${r.email}`} style={{ color: C.brand, textDecoration: "none" }}>{r.email}</a>
                    </div>
                    <div style={{ color: C.ink2, fontSize: 12.5 }}>{r.phone}</div>
                  </td>
                  <td style={{ ...td, color: C.ink2 }}>{EXP_LABEL[r.experience] || r.experience}</td>
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
                      onClick={() => onDelete(r.id, r.camper_name)}
                      aria-label="Delete sign-up"
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
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ border: `1px solid ${C.line}`, borderRadius: 10, padding: "14px 16px", background: C.card }}>
      <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: C.ink3, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.9rem", lineHeight: 1, color: accent ? C.brand : C.ink }}>{value}</div>
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

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
