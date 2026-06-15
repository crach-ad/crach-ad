// Plain (non-"use client") theme constants shared by the camp registration UI.
// Kept out of camp-registration.tsx so Server Components (e.g. the /stem-program
// /register page) can import these values — non-component exports pulled from a
// "use client" module into a Server Component resolve to `undefined`.

export const C = {
  paper: "#f5f1ea",
  ink:   "#14171d",
  ink2:  "rgba(20,23,29,.70)",
  ink3:  "rgba(20,23,29,.42)",
  sun:   "#d8632a", // warm summer terracotta accent
  line:  "rgba(20,23,29,.14)",
}

export const SERIF = "'Instrument Serif', serif"
export const BODY  = "'Barlow', sans-serif"

export const PRICE_PER_WEEK = 400
