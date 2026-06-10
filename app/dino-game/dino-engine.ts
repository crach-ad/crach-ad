// Canvas game engine for the Dino Runner. Framework-agnostic, driven by
// requestAnimationFrame with delta-time so it runs the same on any refresh rate.

import type { PerkId } from "./dino-config"

export const GAME_WIDTH = 800
export const GAME_HEIGHT = 280
const GROUND_Y = GAME_HEIGHT - 36

const GRAVITY = 2600 // px / s^2
const BASE_JUMP_V = 920 // px / s
const BOOSTED_JUMP_V = 1120
const BASE_SPEED = 360 // px / s
const SPEED_BOOST_START = 460
const MAX_SPEED = 900
const SPEED_RAMP = 9 // px / s added per second survived

const DINO_X = 70
const DINO_W = 42
const DINO_STAND_H = 46
const DINO_DUCK_H = 28

interface Obstacle {
  x: number
  y: number
  w: number
  h: number
  kind: "cactus" | "bird"
  birdFrame?: number
}

interface Cloud {
  x: number
  y: number
  speed: number
}

export interface EngineConfig {
  bodyColor: string
  accentColor: string
  jumpBoost: boolean
  speedBoost: boolean
  shield: boolean
}

export interface EngineCallbacks {
  onScore: (distance: number, coins: number) => void
  onGameOver: (distance: number, coins: number) => void
}

const COIN_DIVISOR = 12 // distance units per coin

export class DinoEngine {
  private ctx: CanvasRenderingContext2D
  private cfg: EngineConfig
  private cb: EngineCallbacks

  private raf = 0
  private lastTs = 0
  private running = false

  private dinoY = 0 // offset above ground (0 = on ground)
  private dinoVY = 0
  private ducking = false
  private legTimer = 0
  private legPhase = 0

  private speed = BASE_SPEED
  private distance = 0
  private spawnCountdown = 0
  private obstacles: Obstacle[] = []
  private clouds: Cloud[] = []
  private shieldAvailable = false
  private isNight = false

  constructor(
    ctx: CanvasRenderingContext2D,
    cfg: EngineConfig,
    cb: EngineCallbacks,
  ) {
    this.ctx = ctx
    this.cfg = cfg
    this.cb = cb
  }

  start() {
    this.dinoY = 0
    this.dinoVY = 0
    this.ducking = false
    this.distance = 0
    this.speed = this.cfg.speedBoost ? SPEED_BOOST_START : BASE_SPEED
    this.spawnCountdown = 0.8
    this.obstacles = []
    this.clouds = [
      { x: 200, y: 60, speed: 30 },
      { x: 500, y: 40, speed: 22 },
      { x: 720, y: 90, speed: 38 },
    ]
    this.shieldAvailable = this.cfg.shield
    this.isNight = false
    this.running = true
    this.lastTs = 0
    this.raf = requestAnimationFrame(this.loop)
  }

  stop() {
    this.running = false
    if (this.raf) cancelAnimationFrame(this.raf)
    this.raf = 0
  }

  jump() {
    if (!this.running) return
    if (this.dinoY <= 0.5) {
      this.dinoVY = this.cfg.jumpBoost ? BOOSTED_JUMP_V : BASE_JUMP_V
      this.ducking = false
    }
  }

  setDuck(on: boolean) {
    if (!this.running) return
    this.ducking = on
    // Snap down fast when ducking mid-air for a responsive feel.
    if (on && this.dinoY > 0) this.dinoVY = -Math.max(this.dinoVY, 200)
  }

  private coins() {
    const raw = Math.floor(this.distance / COIN_DIVISOR)
    return this.cfg.speedBoost ? Math.floor(raw * 1.5) : raw
  }

  private spawnObstacle() {
    const r = Math.random()
    if (r < 0.62) {
      // Cactus cluster on the ground.
      const tall = Math.random() < 0.45
      const count = Math.random() < 0.3 ? 2 : 1
      const h = tall ? 52 : 36
      const w = (tall ? 20 : 16) * count + (count - 1) * 4
      this.obstacles.push({
        x: GAME_WIDTH + 20,
        y: GROUND_Y - h,
        w,
        h,
        kind: "cactus",
      })
    } else {
      // Bird at either jump height (low) or duck height (high).
      const high = Math.random() < 0.5
      const h = 26
      const y = high ? GROUND_Y - DINO_STAND_H - 4 : GROUND_Y - 30
      this.obstacles.push({
        x: GAME_WIDTH + 20,
        y,
        w: 40,
        h,
        kind: "bird",
        birdFrame: 0,
      })
    }
  }

  private dinoBox() {
    const h = this.ducking && this.dinoY <= 0.5 ? DINO_DUCK_H : DINO_STAND_H
    return {
      x: DINO_X + 4,
      y: GROUND_Y - h - this.dinoY,
      w: DINO_W - 8,
      h: h - 2,
    }
  }

  private loop = (ts: number) => {
    if (!this.running) return
    if (!this.lastTs) this.lastTs = ts
    let dt = (ts - this.lastTs) / 1000
    this.lastTs = ts
    if (dt > 0.05) dt = 0.05 // clamp after tab switches

    this.update(dt)
    this.draw()

    if (this.running) this.raf = requestAnimationFrame(this.loop)
  }

  private update(dt: number) {
    // Speed ramps up over time.
    this.speed = Math.min(MAX_SPEED, this.speed + SPEED_RAMP * dt)
    this.distance += this.speed * dt * 0.1
    this.isNight = Math.floor(this.distance / 700) % 2 === 1

    // Vertical physics.
    if (this.dinoY > 0 || this.dinoVY > 0) {
      this.dinoY += this.dinoVY * dt
      this.dinoVY -= GRAVITY * dt
      if (this.dinoY <= 0) {
        this.dinoY = 0
        this.dinoVY = 0
      }
    }

    // Running leg animation.
    this.legTimer += dt
    if (this.legTimer > 0.09) {
      this.legTimer = 0
      this.legPhase ^= 1
    }

    // Clouds.
    for (const c of this.clouds) {
      c.x -= c.speed * dt
      if (c.x < -60) {
        c.x = GAME_WIDTH + Math.random() * 120
        c.y = 30 + Math.random() * 70
      }
    }

    // Spawn cadence shortens as speed increases.
    this.spawnCountdown -= dt
    if (this.spawnCountdown <= 0) {
      this.spawnObstacle()
      const base = Math.max(0.55, 1.4 - this.distance / 4000)
      this.spawnCountdown = base + Math.random() * 0.7
    }

    // Move obstacles, animate birds, cull off-screen.
    for (const o of this.obstacles) {
      o.x -= this.speed * dt
      if (o.kind === "bird") o.birdFrame = (o.birdFrame ?? 0) + dt * 6
    }
    this.obstacles = this.obstacles.filter((o) => o.x + o.w > -10)

    // Collision detection.
    const d = this.dinoBox()
    for (const o of this.obstacles) {
      if (
        d.x < o.x + o.w &&
        d.x + d.w > o.x &&
        d.y < o.y + o.h &&
        d.y + d.h > o.y
      ) {
        if (this.shieldAvailable) {
          this.shieldAvailable = false
          // Clear the obstacle we hit so we don't immediately re-collide.
          o.x = -100
        } else {
          this.cb.onGameOver(Math.floor(this.distance), this.coins())
          this.stop()
          this.draw()
          return
        }
      }
    }

    this.cb.onScore(Math.floor(this.distance), this.coins())
  }

  private draw() {
    const ctx = this.ctx
    const night = this.isNight

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // Sky.
    ctx.fillStyle = night ? "#0f172a" : "#f8fafc"
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // Sun / moon.
    ctx.fillStyle = night ? "#e2e8f0" : "#fbbf24"
    ctx.beginPath()
    ctx.arc(GAME_WIDTH - 90, 56, night ? 16 : 20, 0, Math.PI * 2)
    ctx.fill()
    if (night) {
      ctx.fillStyle = "#0f172a"
      ctx.beginPath()
      ctx.arc(GAME_WIDTH - 82, 50, 14, 0, Math.PI * 2)
      ctx.fill()
    }

    // Clouds.
    ctx.fillStyle = night ? "#1e293b" : "#e2e8f0"
    for (const c of this.clouds) this.drawCloud(c.x, c.y)

    // Ground.
    ctx.strokeStyle = night ? "#475569" : "#94a3b8"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, GROUND_Y + 1)
    ctx.lineTo(GAME_WIDTH, GROUND_Y + 1)
    ctx.stroke()
    // Ground texture dots scrolling with distance.
    ctx.fillStyle = night ? "#334155" : "#cbd5e1"
    const offset = (this.distance * 2.4) % 40
    for (let x = -offset; x < GAME_WIDTH; x += 40) {
      ctx.fillRect(x, GROUND_Y + 10, 6, 3)
      ctx.fillRect(x + 18, GROUND_Y + 18, 4, 3)
    }

    // Obstacles.
    for (const o of this.obstacles) {
      if (o.kind === "cactus") this.drawCactus(o, night)
      else this.drawBird(o)
    }

    // Dino.
    this.drawDino()
  }

  private drawCloud(x: number, y: number) {
    const ctx = this.ctx
    ctx.beginPath()
    ctx.arc(x, y, 12, 0, Math.PI * 2)
    ctx.arc(x + 14, y + 4, 14, 0, Math.PI * 2)
    ctx.arc(x + 30, y, 11, 0, Math.PI * 2)
    ctx.fill()
  }

  private drawCactus(o: Obstacle, night: boolean) {
    const ctx = this.ctx
    ctx.fillStyle = night ? "#16a34a" : "#15803d"
    ctx.fillRect(o.x, o.y, o.w, o.h)
    // Arms.
    ctx.fillRect(o.x - 6, o.y + o.h * 0.35, 6, 4)
    ctx.fillRect(o.x - 6, o.y + o.h * 0.2, 4, o.h * 0.2)
    ctx.fillRect(o.x + o.w, o.y + o.h * 0.45, 6, 4)
    ctx.fillRect(o.x + o.w + 2, o.y + o.h * 0.3, 4, o.h * 0.2)
  }

  private drawBird(o: Obstacle) {
    const ctx = this.ctx
    const up = Math.floor(o.birdFrame ?? 0) % 2 === 0
    ctx.fillStyle = "#475569"
    // Body.
    ctx.fillRect(o.x + 10, o.y + 8, 22, 8)
    // Beak.
    ctx.fillRect(o.x + 32, o.y + 10, 8, 4)
    // Wings flap.
    if (up) {
      ctx.fillRect(o.x + 12, o.y - 4, 16, 10)
    } else {
      ctx.fillRect(o.x + 12, o.y + 14, 16, 10)
    }
  }

  private drawDino() {
    const ctx = this.ctx
    const body = this.cfg.bodyColor
    const accent = this.cfg.accentColor
    const grounded = this.dinoY <= 0.5
    const duck = this.ducking && grounded

    const baseY = GROUND_Y - this.dinoY
    ctx.save()
    ctx.fillStyle = body

    if (duck) {
      const h = DINO_DUCK_H
      const top = baseY - h
      // Long crouched body.
      ctx.fillRect(DINO_X - 6, top, DINO_W + 14, h - 8)
      // Head forward.
      ctx.fillRect(DINO_X + DINO_W + 2, top + 2, 16, 14)
      ctx.fillStyle = accent
      ctx.fillRect(DINO_X + DINO_W + 12, top + 5, 4, 4) // eye area
      ctx.fillStyle = "#0f172a"
      ctx.fillRect(DINO_X + DINO_W + 11, top + 5, 3, 3) // eye
      // Legs.
      ctx.fillStyle = body
      ctx.fillRect(DINO_X, baseY - 8, 6, 8)
      ctx.fillRect(DINO_X + 18, baseY - 8, 6, 8)
    } else {
      const h = DINO_STAND_H
      const top = baseY - h
      // Tail.
      ctx.fillRect(DINO_X - 10, top + 18, 12, 8)
      // Body.
      ctx.fillRect(DINO_X, top + 14, 22, 22)
      // Head.
      ctx.fillRect(DINO_X + 16, top, 22, 20)
      // Snout.
      ctx.fillRect(DINO_X + 34, top + 8, 8, 8)
      // Eye.
      ctx.fillStyle = "#0f172a"
      ctx.fillRect(DINO_X + 30, top + 5, 4, 4)
      // Arm.
      ctx.fillStyle = accent
      ctx.fillRect(DINO_X + 20, top + 22, 8, 4)
      // Legs (animate while grounded).
      ctx.fillStyle = body
      if (grounded && this.legPhase === 0) {
        ctx.fillRect(DINO_X + 4, baseY - 12, 7, 12)
        ctx.fillRect(DINO_X + 16, baseY - 6, 7, 6)
      } else {
        ctx.fillRect(DINO_X + 4, baseY - 6, 7, 6)
        ctx.fillRect(DINO_X + 16, baseY - 12, 7, 12)
      }
    }
    ctx.restore()

    // Shield aura.
    if (this.shieldAvailable) {
      ctx.strokeStyle = "rgba(56,189,248,0.7)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(DINO_X + DINO_W / 2, baseY - DINO_STAND_H / 2, 38, 0, Math.PI * 2)
      ctx.stroke()
    }
  }
}
