import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "STEM Skill Development — 2 Pager",
  description: "Hands-on STEM cohort: building, prototyping, shipping.",
}

export default function StemProgramPage() {
  return (
    <main style={{ position: "fixed", inset: 0, margin: 0, padding: 0, background: "#1a1a1a" }}>
      <iframe
        src="/stem-page/index.html"
        title="STEM Skill Development 2-Pager"
        style={{ width: "100%", height: "100%", border: 0, display: "block" }}
      />
    </main>
  )
}
