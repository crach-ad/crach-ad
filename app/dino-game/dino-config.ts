// Shared config + types for the Dino Runner game.

export type AvatarId =
  | "rex"
  | "blaze"
  | "frost"
  | "shadow"
  | "golden"
  | "raptor"

export type TrailStyle = "dust" | "flame" | "frost" | "shadow" | "spark" | "sparkle"

export interface JumpProfile {
  velocity: number // base jump velocity, px/s
  gravity: number // fall acceleration, px/s^2 (lower = floatier)
  special?: "double" | "glide" // double = extra mid-air jump; glide = hang time
  trail: string // particle color
  trailStyle: TrailStyle
  // Short human-readable blurb shown in the shop.
  jumpName: string
}

export interface Avatar {
  id: AvatarId
  name: string
  description: string
  cost: number
  body: string
  accent: string
  jump: JumpProfile
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
    jump: {
      velocity: 920,
      gravity: 2600,
      trail: "#cbd5e1",
      trailStyle: "dust",
      jumpName: "Balanced hop with a little kicked-up dust.",
    },
  },
  {
    id: "blaze",
    name: "Blaze",
    description: "A fiery sprinter built for the long haul.",
    cost: 250,
    body: "#f97316",
    accent: "#c2410c",
    jump: {
      velocity: 985,
      gravity: 2700,
      trail: "#f97316",
      trailStyle: "flame",
      jumpName: "Explosive launch leaving a trail of flames.",
    },
  },
  {
    id: "frost",
    name: "Frost",
    description: "Cool under pressure. Glides over cacti.",
    cost: 500,
    body: "#38bdf8",
    accent: "#0369a1",
    jump: {
      velocity: 880,
      gravity: 1850,
      special: "glide",
      trail: "#bae6fd",
      trailStyle: "frost",
      jumpName: "Floaty glide with long hang-time and ice crystals.",
    },
  },
  {
    id: "shadow",
    name: "Shadow",
    description: "Hard to spot, impossible to catch.",
    cost: 900,
    body: "#a78bfa",
    accent: "#6d28d9",
    jump: {
      velocity: 1050,
      gravity: 3200,
      trail: "#a78bfa",
      trailStyle: "shadow",
      jumpName: "Snappy, fast-falling leap with shadow afterimages.",
    },
  },
  {
    id: "raptor",
    name: "Raptor",
    description: "Lean, mean and razor-clawed.",
    cost: 1500,
    body: "#ef4444",
    accent: "#991b1b",
    jump: {
      velocity: 900,
      gravity: 2750,
      special: "double",
      trail: "#fca5a5",
      trailStyle: "spark",
      jumpName: "Double jump — tap again mid-air for a second leap.",
    },
  },
  {
    id: "golden",
    name: "Golden",
    description: "The legendary apex dino. A true flex.",
    cost: 3000,
    body: "#facc15",
    accent: "#a16207",
    jump: {
      velocity: 1090,
      gravity: 2550,
      trail: "#fde047",
      trailStyle: "sparkle",
      jumpName: "Towering majestic leap raining golden sparkles.",
    },
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
