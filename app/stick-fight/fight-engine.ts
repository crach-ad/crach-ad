import { SWORD_TIERS, type SwordTier } from "./sword-config"

export const ARENA_WIDTH = 900
export const ARENA_HEIGHT = 480

const GROUND_Y = ARENA_HEIGHT - 56
const GRAVITY = 0.9
const MOVE_SPEED = 3.4
const JUMP_VELOCITY = -15
const MAX_HP = 100
const HIT_STUN_MS = 280
const ATTACK_COOLDOWN_MS = 120 // extra recovery after a swing
const BLOCK_CHIP = 0.18 // fraction of damage that still lands while blocking

export type Side = "left" | "right"

export interface PlayerControls {
  left: string
  right: string
  jump: string
  attack: string
  block: string
}

export interface Fighter {
  side: Side
  name: string
  color: string
  x: number
  y: number // feet position
  vx: number
  vy: number
  onGround: boolean
  facing: 1 | -1
  hp: number
  swordLevel: number
  gold: number
  roundWins: number
  // transient combat state
  attackTimer: number // ms remaining in current swing, 0 = not swinging
  attackDidHit: boolean // already connected this swing
  stunTimer: number // ms of hit-stun remaining
  blocking: boolean
  flashTimer: number // ms of damage flash
}

export interface RoundResult {
  winner: Side
}

const FIGHTER_HALF_WIDTH = 18
const TORSO_HEIGHT = 64
const HEAD_RADIUS = 13

function spawn(side: Side, name: string, color: string): Fighter {
  return {
    side,
    name,
    color,
    x: side === "left" ? ARENA_WIDTH * 0.28 : ARENA_WIDTH * 0.72,
    y: GROUND_Y,
    vx: 0,
    vy: 0,
    onGround: true,
    facing: side === "left" ? 1 : -1,
    hp: MAX_HP,
    swordLevel: 0,
    gold: 0,
    roundWins: 0,
    attackTimer: 0,
    attackDidHit: false,
    stunTimer: 0,
    blocking: false,
    flashTimer: 0,
  }
}

export class FightEngine {
  p1: Fighter
  p2: Fighter
  private pressed = new Set<string>()
  roundOver = false
  roundWinner: Side | null = null
  onRoundEnd: ((winner: Side) => void) | null = null

  constructor() {
    this.p1 = spawn("left", "Blue", "#3b82f6")
    this.p2 = spawn("right", "Red", "#ef4444")
  }

  setControls(p1: PlayerControls, p2: PlayerControls) {
    this.c1 = p1
    this.c2 = p2
  }
  private c1!: PlayerControls
  private c2!: PlayerControls

  /** Reset health/positions for a new round but keep gold, sword levels and wins. */
  resetRound() {
    for (const [f, side] of [
      [this.p1, "left"],
      [this.p2, "right"],
    ] as const) {
      f.hp = MAX_HP
      f.x = side === "left" ? ARENA_WIDTH * 0.28 : ARENA_WIDTH * 0.72
      f.y = GROUND_Y
      f.vx = 0
      f.vy = 0
      f.onGround = true
      f.facing = side === "left" ? 1 : -1
      f.attackTimer = 0
      f.attackDidHit = false
      f.stunTimer = 0
      f.blocking = false
      f.flashTimer = 0
    }
    this.roundOver = false
    this.roundWinner = null
  }

  /** Full reset for a brand new match. */
  resetMatch() {
    this.p1 = spawn("left", "Blue", "#3b82f6")
    this.p2 = spawn("right", "Red", "#ef4444")
    this.roundOver = false
    this.roundWinner = null
  }

  handleKey(code: string, down: boolean) {
    if (down) this.pressed.add(code)
    else this.pressed.delete(code)
  }

  private sword(f: Fighter): SwordTier {
    return SWORD_TIERS[f.swordLevel]
  }

  private startAttack(f: Fighter) {
    if (f.attackTimer > 0 || f.stunTimer > 0) return
    f.attackTimer = this.sword(f).swingMs + ATTACK_COOLDOWN_MS
    f.attackDidHit = false
  }

  /** dt in ms */
  update(dt: number) {
    if (this.roundOver) return
    this.step(this.p1, this.c1, this.p2, dt)
    this.step(this.p2, this.c2, this.p1, dt)
    this.resolveHits(this.p1, this.p2)
    this.resolveHits(this.p2, this.p1)
    this.separate()
    this.checkRoundEnd()
  }

  private step(
    f: Fighter,
    c: PlayerControls,
    foe: Fighter,
    dt: number,
  ) {
    // face the opponent unless mid-swing (lock facing during swing)
    const swinging = f.attackTimer > 0
    const swingActive = swinging && this.inActiveWindow(f)

    // tick timers
    if (f.attackTimer > 0) f.attackTimer = Math.max(0, f.attackTimer - dt)
    if (f.stunTimer > 0) f.stunTimer = Math.max(0, f.stunTimer - dt)
    if (f.flashTimer > 0) f.flashTimer = Math.max(0, f.flashTimer - dt)

    const stunned = f.stunTimer > 0
    f.blocking = !stunned && this.pressed.has(c.block) && f.onGround

    // intent
    let move = 0
    if (!stunned && !f.blocking) {
      if (this.pressed.has(c.left)) move -= 1
      if (this.pressed.has(c.right)) move += 1
      if (this.pressed.has(c.attack)) this.startAttack(f)
      if (this.pressed.has(c.jump) && f.onGround) {
        f.vy = JUMP_VELOCITY
        f.onGround = false
      }
    }

    // face opponent when grounded & not committed to a swing
    if (!swinging && !stunned) {
      f.facing = foe.x >= f.x ? 1 : -1
    }

    // horizontal motion — slowed while swinging or blocking
    const speedScale = f.blocking ? 0.35 : swinging ? 0.45 : 1
    f.vx = move * MOVE_SPEED * speedScale

    // integrate
    f.x += f.vx
    f.vy += GRAVITY
    f.y += f.vy
    if (f.y >= GROUND_Y) {
      f.y = GROUND_Y
      f.vy = 0
      f.onGround = true
    }
    // clamp to arena
    f.x = Math.max(FIGHTER_HALF_WIDTH, Math.min(ARENA_WIDTH - FIGHTER_HALF_WIDTH, f.x))

    void swingActive
  }

  /** The portion of the swing where the blade can connect. */
  private inActiveWindow(f: Fighter): boolean {
    if (f.attackTimer <= 0) return false
    const tier = this.sword(f)
    const total = tier.swingMs + ATTACK_COOLDOWN_MS
    const elapsed = total - f.attackTimer
    // active during the middle slice of the swing
    return elapsed >= tier.swingMs * 0.28 && elapsed <= tier.swingMs * 0.72
  }

  /** Swing progress 0..1 over the swing portion (excludes recovery). */
  swingProgress(f: Fighter): number {
    if (f.attackTimer <= 0) return -1
    const tier = this.sword(f)
    const total = tier.swingMs + ATTACK_COOLDOWN_MS
    const elapsed = total - f.attackTimer
    return Math.min(1, elapsed / tier.swingMs)
  }

  private resolveHits(attacker: Fighter, defender: Fighter) {
    if (!this.inActiveWindow(attacker) || attacker.attackDidHit) return
    const tier = this.sword(attacker)
    // blade tip reaches from the shoulder forward by reach
    const shoulderY = attacker.y - TORSO_HEIGHT
    const reach = tier.reach + 16
    const inFront =
      attacker.facing === 1
        ? defender.x > attacker.x && defender.x - attacker.x <= reach
        : defender.x < attacker.x && attacker.x - defender.x <= reach
    const defenderTop = defender.y - TORSO_HEIGHT - HEAD_RADIUS
    const defenderBottom = defender.y
    const verticalOk = shoulderY >= defenderTop - 30 && shoulderY <= defenderBottom + 10

    if (!inFront || !verticalOk) return

    attacker.attackDidHit = true

    // blocking only works when the defender faces the attacker
    const facingAttacker =
      (defender.facing === 1 && attacker.x > defender.x) ||
      (defender.facing === -1 && attacker.x < defender.x)
    const blocked = defender.blocking && facingAttacker

    const dmg = blocked ? tier.damage * BLOCK_CHIP : tier.damage
    defender.hp = Math.max(0, defender.hp - dmg)
    defender.flashTimer = 140
    attacker.gold += blocked ? 1 : 2

    if (!blocked) {
      defender.stunTimer = HIT_STUN_MS
      defender.vx = 0
      defender.vy = -5
      defender.x += attacker.facing * 26
      defender.x = Math.max(
        FIGHTER_HALF_WIDTH,
        Math.min(ARENA_WIDTH - FIGHTER_HALF_WIDTH, defender.x),
      )
      defender.onGround = false
    } else {
      // small chip knockback
      defender.x += attacker.facing * 8
    }
  }

  /** Keep the two bodies from overlapping. */
  private separate() {
    const minGap = FIGHTER_HALF_WIDTH * 2 - 6
    const dx = this.p2.x - this.p1.x
    const dist = Math.abs(dx)
    if (dist < minGap && this.p1.onGround && this.p2.onGround) {
      const push = (minGap - dist) / 2
      const dir = dx >= 0 ? 1 : -1
      this.p1.x -= dir * push
      this.p2.x += dir * push
      this.p1.x = Math.max(FIGHTER_HALF_WIDTH, this.p1.x)
      this.p2.x = Math.min(ARENA_WIDTH - FIGHTER_HALF_WIDTH, this.p2.x)
    }
  }

  private checkRoundEnd() {
    if (this.roundOver) return
    const p1Dead = this.p1.hp <= 0
    const p2Dead = this.p2.hp <= 0
    if (!p1Dead && !p2Dead) return
    this.roundOver = true
    let winner: Side
    if (p1Dead && p2Dead) {
      // double KO — whoever has more hp margin... both 0, give to higher gold (tiebreak)
      winner = this.p1.gold >= this.p2.gold ? "left" : "right"
    } else {
      winner = p1Dead ? "right" : "left"
    }
    this.roundWinner = winner
    const wf = winner === "left" ? this.p1 : this.p2
    wf.roundWins += 1
    wf.gold += 5
    this.onRoundEnd?.(winner)
  }

  // ---- exposed geometry for rendering ----
  static readonly GROUND_Y = GROUND_Y
  static readonly TORSO_HEIGHT = TORSO_HEIGHT
  static readonly HEAD_RADIUS = HEAD_RADIUS
  static readonly MAX_HP = MAX_HP
}
