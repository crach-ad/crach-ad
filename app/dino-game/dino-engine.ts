// Canvas game engine for the Dino Runner. Framework-agnostic, driven by
// requestAnimationFrame with delta-time so it runs the same on any refresh rate.

import type { TrailStyle } from "./dino-config"

export const GAME_WIDTH = 800
export const GAME_HEIGHT = 280
const GROUND_Y = GAME_HEIGHT - 36

const JUMP_BOOST_MULT = 1.2 // Jump Boost perk velocity multiplier
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
  kind: "cactus" | "bird" | "barrier"
  birdFrame?: number
}

interface Cloud {
  x: number
  y: number
  speed: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

export interface JumpSpec {
  velocity: number
  gravity: number
  special?: "double" | "glide"
  trail: string
  trailStyle: TrailStyle
}

export interface EngineConfig {
  bodyColor: string
  accentColor: string
  jump: JumpSpec
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
  private jumpsUsed = 0
  private particles: Particle[] = []
  private trailTimer = 0

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
    this.jumpsUsed = 0
    this.particles = []
    this.trailTimer = 0
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
    const maxJumps = this.cfg.jump.special === "double" ? 2 : 1
    const grounded = this.dinoY <= 0.5
    if (!grounded && this.jumpsUsed >= maxJumps) return

    let v = this.cfg.jump.velocity
    if (this.cfg.jumpBoost) v *= JUMP_BOOST_MULT
    // A mid-air (double) jump gets a touch less lift than the first.
    if (!grounded) v *= 0.86

    this.dinoVY = v
    this.ducking = false
    this.jumpsUsed = grounded ? 1 : this.jumpsUsed + 1
    this.emitBurst(grounded ? 10 : 14)
  }

  // Spawn a burst of particles at the dino's feet, styled per avatar.
  private emitBurst(count: number) {
    const baseY = GROUND_Y - this.dinoY
    const fx = DINO_X + DINO_W / 2
    for (let i = 0; i < count; i++) this.spawnParticle(fx, baseY, true)
  }

  private spawnParticle(x: number, y: number, burst: boolean) {
    const style = this.cfg.jump.trailStyle
    const color = this.cfg.jump.trail
    const rnd = (a: number, b: number) => a + Math.random() * (b - a)
    let vx = rnd(-40, 40)
    let vy = rnd(-30, 30)
    let size = rnd(2, 4)
    let life = rnd(0.3, 0.6)

    switch (style) {
      case "flame":
        vx = rnd(-90, -20)
        vy = rnd(-70, -10)
        size = rnd(3, 6)
        life = rnd(0.25, 0.5)
        break
      case "frost":
        vx = rnd(-40, 10)
        vy = rnd(10, 60)
        size = rnd(2, 4)
        life = rnd(0.5, 1)
        break
      case "shadow":
        vx = rnd(-30, 10)
        vy = rnd(-15, 15)
        size = rnd(4, 8)
        life = rnd(0.3, 0.7)
        break
      case "spark":
        vx = rnd(-120, 120) * (burst ? 1 : 0.4)
        vy = rnd(-120, 40)
        size = rnd(2, 4)
        life = rnd(0.2, 0.45)
        break
      case "sparkle":
        vx = rnd(-60, 60)
        vy = rnd(-90, 20)
        size = rnd(2, 5)
        life = rnd(0.4, 0.9)
        break
      case "dust":
      default:
        vx = rnd(-70, -10)
        vy = rnd(-20, 10)
        size = rnd(2, 5)
        life = rnd(0.25, 0.5)
        break
    }
    this.particles.push({ x, y, vx, vy, life, maxLife: life, size, color })
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

  private addCactus(x: number) {
    // Cluster size grows with distance: 1 early, up to 3 later on.
    const maxCluster = this.distance > 3200 ? 3 : this.distance > 1200 ? 2 : 1
    const count = 1 + Math.floor(Math.random() * maxCluster)
    const tall = Math.random() < 0.45
    const h = tall ? 52 : 36
    const w = (tall ? 20 : 16) * count + (count - 1) * 4
    this.obstacles.push({ x, y: GROUND_Y - h, w, h, kind: "cactus" })
    return w
  }

  private addBird(x: number) {
    const high = Math.random() < 0.5
    const h = 26
    // High bird flies low enough to hit a standing dino but high enough that a
    // ducking dino slips underneath. Low bird must be jumped.
    const y = high ? GROUND_Y - DINO_DUCK_H - h - 6 : GROUND_Y - 30
    this.obstacles.push({ x, y, w: 40, h, kind: "bird", birdFrame: 0 })
    return 40
  }

  // Overhead obstacle: hangs from the top down to just above a ducking dino,
  // so you can ONLY pass by ducking — jumping into it collides.
  private addBarrier(x: number) {
    const w = 34
    const bottom = GROUND_Y - DINO_DUCK_H - 8
    this.obstacles.push({ x, y: 0, w, h: bottom, kind: "barrier" })
    return w
  }

  private spawnObstacle() {
    const startX = GAME_WIDTH + 20
    const w = this.pickObstacle(startX)

    // Once you're running far, sometimes chain a second obstacle a reactable
    // gap behind the first — more to dodge the deeper you get.
    const comboChance = Math.min(0.5, this.distance / 7000)
    if (this.distance > 1600 && Math.random() < comboChance) {
      const gap = 210 + Math.random() * 140
      const x2 = startX + w + gap
      // Combos stick to ground/low obstacles to avoid brutal duck+jump spikes.
      if (Math.random() < 0.55) this.addCactus(x2)
      else this.addBird(x2)
    }
  }

  private pickObstacle(x: number) {
    const r = Math.random()
    // Barriers (duck-required) start appearing after a short warm-up and grow
    // a little more common with distance.
    const barrierChance =
      this.distance > 600 ? Math.min(0.24, 0.08 + this.distance / 12000) : 0
    if (r < barrierChance) return this.addBarrier(x)
    if (r < barrierChance + 0.45) return this.addCactus(x)
    return this.addBird(x)
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

    // Vertical physics with per-avatar gravity.
    if (this.dinoY > 0 || this.dinoVY > 0) {
      this.dinoY += this.dinoVY * dt
      this.dinoVY -= this.cfg.jump.gravity * dt
      if (this.dinoY <= 0) {
        this.dinoY = 0
        this.dinoVY = 0
        this.jumpsUsed = 0
        // Kick up a little dust on landing.
        const baseY = GROUND_Y
        const fx = DINO_X + DINO_W / 2
        for (let i = 0; i < 5; i++) this.spawnParticle(fx, baseY, false)
      }
    }

    // Continuous trail while airborne (style-dependent).
    const airborne = this.dinoY > 4
    const trailing: TrailStyle[] = ["flame", "shadow", "sparkle", "frost", "spark"]
    if (airborne && trailing.includes(this.cfg.jump.trailStyle)) {
      this.trailTimer += dt
      const rate = this.cfg.jump.trailStyle === "shadow" ? 0.05 : 0.03
      while (this.trailTimer >= rate) {
        this.trailTimer -= rate
        this.spawnParticle(
          DINO_X + DINO_W / 2 + (Math.random() - 0.5) * DINO_W,
          GROUND_Y - this.dinoY - DINO_STAND_H / 2 + (Math.random() - 0.5) * 20,
          false,
        )
      }
    }

    // Advance particles.
    for (const p of this.particles) {
      p.x -= this.speed * dt * 0.35 // drift with the world a little
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.vy += 220 * dt // light gravity on particles
      p.life -= dt
    }
    this.particles = this.particles.filter((p) => p.life > 0)

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

    // Spawn cadence shortens (and gets less random) as distance grows, so
    // obstacles steadily pile up the further you run.
    this.spawnCountdown -= dt
    if (this.spawnCountdown <= 0) {
      this.spawnObstacle()
      const base = Math.max(0.38, 1.3 - this.distance / 2600)
      const spread = Math.max(0.25, 0.7 - this.distance / 8000)
      this.spawnCountdown = base + Math.random() * spread
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
      else if (o.kind === "barrier") this.drawBarrier(o, night)
      else this.drawBird(o)
    }

    // Jump particles (behind the dino so trails read nicely).
    this.drawParticles()

    // Dino.
    this.drawDino()
  }

  private drawParticles() {
    const ctx = this.ctx
    const sparkle = this.cfg.jump.trailStyle === "sparkle"
    for (const p of this.particles) {
      const alpha = Math.max(0, Math.min(1, p.life / p.maxLife))
      ctx.globalAlpha = alpha
      ctx.fillStyle = p.color
      if (sparkle) {
        // Little plus-shaped twinkles.
        const s = p.size
        ctx.fillRect(p.x - s, p.y - 1, s * 2, 2)
        ctx.fillRect(p.x - 1, p.y - s, 2, s * 2)
      } else {
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
      }
    }
    ctx.globalAlpha = 1
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

  private drawBarrier(o: Obstacle, night: boolean) {
    const ctx = this.ctx
    const bottom = o.y + o.h
    // Hanging rock column covering the full hitbox (fair: nothing invisible).
    ctx.fillStyle = night ? "#475569" : "#64748b"
    ctx.fillRect(o.x, o.y, o.w, o.h - 10)
    // Jagged stalactite bottom edge.
    ctx.beginPath()
    ctx.moveTo(o.x, bottom - 10)
    const teeth = 4
    const step = o.w / teeth
    for (let i = 0; i < teeth; i++) {
      ctx.lineTo(o.x + step * i + step / 2, bottom)
      ctx.lineTo(o.x + step * (i + 1), bottom - 10)
    }
    ctx.lineTo(o.x + o.w, o.y)
    ctx.lineTo(o.x, o.y)
    ctx.closePath()
    ctx.fill()
    // Hazard stripe on the lower lip so it reads as "duck under".
    ctx.fillStyle = "#fbbf24"
    ctx.fillRect(o.x - 2, bottom - 16, o.w + 4, 5)
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
