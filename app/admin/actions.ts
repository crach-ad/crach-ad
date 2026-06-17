"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import {
  SESSION_COOKIE,
  STATUSES,
  type Status,
  adminPassword,
  sessionToken,
  isAuthed,
  sbFetch,
} from "./lib"

export async function login(formData: FormData) {
  const pw = String(formData.get("password") || "")
  const expected = adminPassword()
  if (!expected || pw !== expected) {
    redirect("/admin/login?error=1")
  }
  const jar = await cookies()
  jar.set(SESSION_COOKIE, sessionToken(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  redirect("/admin")
}

export async function logout() {
  const jar = await cookies()
  jar.delete(SESSION_COOKIE)
  redirect("/admin/login")
}

export async function updateStatus(id: string, status: string) {
  if (!(await isAuthed())) throw new Error("Unauthorized")
  if (!STATUSES.includes(status as Status)) throw new Error("Invalid status")
  const res = await sbFetch(`ai_session_registrations?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error(`Update failed (HTTP ${res.status})`)
  revalidatePath("/admin")
}

export async function deleteRegistration(id: string) {
  if (!(await isAuthed())) throw new Error("Unauthorized")
  const res = await sbFetch(`ai_session_registrations?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal" },
  })
  if (!res.ok) throw new Error(`Delete failed (HTTP ${res.status})`)
  revalidatePath("/admin")
}
