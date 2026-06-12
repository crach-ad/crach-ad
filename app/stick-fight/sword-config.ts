// Sword tiers — each upgrade increases reach, damage and changes the look.
// Players spend gold (earned by landing hits and winning rounds) to climb the tiers.

export interface SwordTier {
  level: number
  name: string
  reach: number // pixels the blade extends from the hand
  damage: number
  swingMs: number // full swing duration; lower = faster
  width: number // blade thickness
  color: string
  glow: string | null // glow color for fancy blades, or null
  upgradeCost: number // gold needed to reach THIS tier from the previous one
}

export const SWORD_TIERS: SwordTier[] = [
  {
    level: 0,
    name: "Wooden Stick",
    reach: 34,
    damage: 8,
    swingMs: 360,
    width: 4,
    color: "#a16207",
    glow: null,
    upgradeCost: 0,
  },
  {
    level: 1,
    name: "Rusty Dagger",
    reach: 42,
    damage: 12,
    swingMs: 320,
    width: 4,
    color: "#9ca3af",
    glow: null,
    upgradeCost: 6,
  },
  {
    level: 2,
    name: "Short Sword",
    reach: 54,
    damage: 16,
    swingMs: 300,
    width: 5,
    color: "#e5e7eb",
    glow: null,
    upgradeCost: 10,
  },
  {
    level: 3,
    name: "Long Sword",
    reach: 70,
    damage: 20,
    swingMs: 300,
    width: 6,
    color: "#f8fafc",
    glow: null,
    upgradeCost: 16,
  },
  {
    level: 4,
    name: "Broadsword",
    reach: 82,
    damage: 26,
    swingMs: 330,
    width: 8,
    color: "#38bdf8",
    glow: "#0ea5e9",
    upgradeCost: 24,
  },
  {
    level: 5,
    name: "Katana",
    reach: 96,
    damage: 30,
    swingMs: 240,
    width: 5,
    color: "#f43f5e",
    glow: "#fb7185",
    upgradeCost: 34,
  },
  {
    level: 6,
    name: "Flaming Greatsword",
    reach: 110,
    damage: 38,
    swingMs: 300,
    width: 9,
    color: "#fb923c",
    glow: "#f97316",
    upgradeCost: 48,
  },
]

export const MAX_SWORD_LEVEL = SWORD_TIERS.length - 1

export function nextTier(level: number): SwordTier | null {
  return level < MAX_SWORD_LEVEL ? SWORD_TIERS[level + 1] : null
}
