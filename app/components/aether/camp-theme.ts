// Plain (non-"use client") theme constants shared by the Spanish Wells STEM &
// Mandarin Exposure Camp registration UI. Kept out of camp-registration.tsx so
// Server Components (e.g. the /spanish-wells-camp/register page) can import these
// values — non-component exports pulled from a "use client" module into a Server
// Component resolve to `undefined`.

export const C = {
  paper: "#f5f7fb",
  ink:   "#102a52",        // flyer navy
  ink2:  "rgba(16,42,82,.70)",
  ink3:  "rgba(16,42,82,.42)",
  brand: "#1f73d0",        // STEM blue accent
  line:  "rgba(16,42,82,.14)",
}

export const SERIF = "'Instrument Serif', serif"
export const BODY  = "'Barlow', sans-serif"

export const FEE = 25
