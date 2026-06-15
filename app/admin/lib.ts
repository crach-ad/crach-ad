// Server-only: this module imports next/headers + node:crypto, which cannot be
// bundled into a client component. Never import it from a "use client" file.
import { cookies } from "next/headers"
import { createHash } from "node:crypto"

// Public project URL (same one the public form posts to).
export const SUPABASE_URL = "https://wizfmnaxmbrcrrdrihpb.supabase.co"
export const SESSION_COOKIE = "crachad_admin"

export const STATUSES = ["new", "contacted", "confirmed", "paid", "cancelled"] as const
export type Status = (typeof STATUSES)[number]

export const WEEK_META: Record<string, { label: string; dates: string }> = {
  w1: { label: "Wk 1", dates: "Jun 29 – Jul 2" },
  w2: { label: "Wk 2", dates: "Jul 6 – Jul 9" },
  w3: { label: "Wk 3", dates: "Jul 13 – Jul 16" },
  w4: { label: "Wk 4", dates: "Jul 20 – Jul 23" },
  w5: { label: "Wk 5", dates: "Jul 27 – Jul 30" },
  w6: { label: "Wk 6", dates: "Aug 3 – Aug 6" },
}
export const PRICE_PER_WEEK = 400

export type CampRow = {
  id: string
  created_at: string
  guardian_name: string
  email: string
  phone: string
  student_name: string
  student_age: number
  student_school: string
  student_grade: string
  weeks: string[]
  coding_experience: string
  status: Status
  notes: string | null
  heard_from: string | null
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || ""
}
export function serviceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || ""
}

// Stateless session token derived from the password — rotates if the password changes.
export function sessionToken(pw: string) {
  return createHash("sha256").update(`${pw}::crachad-admin-v1`).digest("hex")
}

export async function isAuthed() {
  const pw = adminPassword()
  if (!pw) return false
  const jar = await cookies()
  const tok = jar.get(SESSION_COOKIE)?.value
  return !!tok && tok === sessionToken(pw)
}

// Service-role REST call — bypasses RLS, SERVER ONLY. Never import into a client component.
export async function sbFetch(path: string, init?: RequestInit) {
  const key = serviceKey()
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  })
}

export async function fetchRegistrations(): Promise<CampRow[]> {
  const res = await sbFetch("camp_registrations?select=*&order=created_at.desc")
  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new Error(`Load failed (HTTP ${res.status})${body ? ` — ${body.slice(0, 180)}` : ""}`)
  }
  return res.json()
}
