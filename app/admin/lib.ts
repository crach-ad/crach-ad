// Server-only: this module imports next/headers + node:crypto, which cannot be
// bundled into a client component. Never import it from a "use client" file.
import { cookies } from "next/headers"
import { createHash } from "node:crypto"

// Public project URL (same one the public form posts to).
export const SUPABASE_URL = "https://wizfmnaxmbrcrrdrihpb.supabase.co"
export const SESSION_COOKIE = "crachad_admin"

export const STATUSES = ["new", "contacted", "confirmed", "paid", "cancelled"] as const
export type Status = (typeof STATUSES)[number]

export const DAY_META: Record<string, { label: string }> = {
  mon: { label: "Mon" },
  tue: { label: "Tue" },
  wed: { label: "Wed" },
  thu: { label: "Thu" },
  fri: { label: "Fri" },
}
export const PRICE_PER_SESSION = 100

export type AiRow = {
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

export async function fetchRegistrations(): Promise<AiRow[]> {
  const res = await sbFetch("ai_session_registrations?select=*&order=created_at.desc")
  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new Error(`Load failed (HTTP ${res.status})${body ? ` — ${body.slice(0, 180)}` : ""}`)
  }
  return res.json()
}
