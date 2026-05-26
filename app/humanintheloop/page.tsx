import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Human in the Loop — Practical AI for Professionals",
  description:
    "An 8-week practicum on practical AI workflows for educators, executives, operators, and teams. Summer 2026, Tuesdays 6–8:30 PM.",
}

export default function HumanInTheLoopPage() {
  return (
    <main style={{ position: "fixed", inset: 0, margin: 0, padding: 0, background: "#eaf2f8" }}>
      <iframe
        src="/human-loop/index.html"
        title="Human in the Loop — flyer"
        style={{ width: "100%", height: "100%", border: 0, display: "block" }}
      />
    </main>
  )
}
