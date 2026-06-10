// Shared config + types for the Dino Runner game.

export type AvatarId =
  | "rex"
  | "blaze"
  | "frost"
  | "shadow"
  | "golden"
  | "raptor"

export interface Avatar {
  id: AvatarId
  name: string
  description: string
  cost: number
  body: string
  accent: string
}

export interface Perk {
  id: PerkId
  name: string
  description: string
  cost: number
}

export type PerkId = "jumpBoost" | "speedBoost" | "shield"

export const AVATARS: Avatar[] = [
  {
    id: "rex",
    name: "Rex",
    description: "The original. Reliable and quick on his feet.",
    cost: 0,
    body: "#10b981",
    accent: "#047857",
  },
  {
    id: "blaze",
    name: "Blaze",
    description: "A fiery sprinter built for the long haul.",
    cost: 250,
    body: "#f97316",
    accent: "#c2410c",
  },
  {
    id: "frost",
    name: "Frost",
    description: "Cool under pressure. Glides over cacti.",
    cost: 500,
    body: "#38bdf8",
    accent: "#0369a1",
  },
  {
    id: "shadow",
    name: "Shadow",
    description: "Hard to spot, impossible to catch.",
    cost: 900,
    body: "#a78bfa",
    accent: "#6d28d9",
  },
  {
    id: "raptor",
    name: "Raptor",
    description: "Lean, mean and razor-clawed.",
    cost: 1500,
    body: "#ef4444",
    accent: "#991b1b",
  },
  {
    id: "golden",
    name: "Golden",
    description: "The legendary apex dino. A true flex.",
    cost: 3000,
    body: "#facc15",
    accent: "#a16207",
  },
]

export const PERKS: Perk[] = [
  {
    id: "jumpBoost",
    name: "Jump Boost",
    description: "Leap noticeably higher and clear tall obstacles with ease.",
    cost: 400,
  },
  {
    id: "speedBoost",
    name: "Speed Boost",
    description: "Start faster and bank a 1.5× coin multiplier — high risk, high reward.",
    cost: 600,
  },
  {
    id: "shield",
    name: "Shield",
    description: "Survive one hit per run. Absorbs a single crash and keeps you going.",
    cost: 1000,
  },
]

export interface SaveData {
  coins: number
  highScore: number
  ownedAvatars: AvatarId[]
  selectedAvatar: AvatarId
  ownedPerks: PerkId[]
  activePerks: PerkId[]
}

export const STORAGE_KEY = "crach-dino-save-v1"

export const DEFAULT_SAVE: SaveData = {
  coins: 0,
  highScore: 0,
  ownedAvatars: ["rex"],
  selectedAvatar: "rex",
  ownedPerks: [],
  activePerks: [],
}

export function loadSave(): SaveData {
  if (typeof window === "undefined") return DEFAULT_SAVE
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SAVE
    const parsed = JSON.parse(raw) as Partial<SaveData>
    return {
      ...DEFAULT_SAVE,
      ...parsed,
      ownedAvatars: parsed.ownedAvatars?.length
        ? Array.from(new Set([...parsed.ownedAvatars, "rex"]))
        : DEFAULT_SAVE.ownedAvatars,
      ownedPerks: parsed.ownedPerks ?? [],
      activePerks: parsed.activePerks ?? [],
    }
  } catch {
    return DEFAULT_SAVE
  }
}

export function persistSave(data: SaveData) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* ignore quota / privacy errors */
  }
}
