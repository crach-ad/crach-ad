// Small static dino sprite used for avatar previews in the shop / HUD.

export function DinoSprite({
  body,
  accent,
  size = 64,
}: {
  body: string
  accent: string
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* tail */}
      <rect x="2" y="22" width="12" height="8" fill={body} />
      {/* body */}
      <rect x="10" y="18" width="22" height="22" fill={body} />
      {/* head */}
      <rect x="26" y="6" width="20" height="18" fill={body} />
      {/* snout */}
      <rect x="42" y="13" width="6" height="7" fill={body} />
      {/* eye */}
      <rect x="39" y="10" width="4" height="4" fill="#0f172a" />
      {/* arm */}
      <rect x="28" y="26" width="8" height="4" fill={accent} />
      {/* legs */}
      <rect x="13" y="38" width="7" height="8" fill={body} />
      <rect x="24" y="38" width="7" height="8" fill={accent} />
    </svg>
  )
}
