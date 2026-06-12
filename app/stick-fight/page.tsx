"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Swords, Trophy, Play, RotateCcw, ChevronUp, Coins } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  FightEngine,
  ARENA_WIDTH,
  ARENA_HEIGHT,
  type Fighter,
  type PlayerControls,
} from "./fight-engine"
import { SWORD_TIERS, nextTier, MAX_SWORD_LEVEL } from "./sword-config"

type Phase = "idle" | "fighting" | "upgrade" | "matchOver"

const ROUNDS_TO_WIN = 3

const P1_CONTROLS: PlayerControls = {
  left: "KeyA",
  right: "KeyD",
  jump: "KeyW",
  attack: "KeyF",
  block: "KeyS",
}
const P2_CONTROLS: PlayerControls = {
  left: "ArrowLeft",
  right: "ArrowRight",
  jump: "ArrowUp",
  attack: "Slash", // the "/" key
  block: "ArrowDown",
}

// Upgrade-phase keys (edge triggered, handled in React)
const P1_UPGRADE_KEY = "KeyF"
const P2_UPGRADE_KEY = "Slash"
const READY_KEYS = { p1: "KeyG", p2: "Period" }

interface HudFighter {
  hp: number
  gold: number
  wins: number
  swordLevel: number
  name: string
  flash: boolean
}

function hudFrom(f: Fighter): HudFighter {
  return {
    hp: f.hp,
    gold: f.gold,
    wins: f.roundWins,
    swordLevel: f.swordLevel,
    name: f.name,
    flash: f.flashTimer > 0,
  }
}

export default function StickFightPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<FightEngine | null>(null)
  const rafRef = useRef<number>(0)
  const lastTsRef = useRef<number>(0)

  const [phase, setPhase] = useState<Phase>("idle")
  const phaseRef = useRef<Phase>("idle")
  phaseRef.current = phase

  const [round, setRound] = useState(1)
  const [matchWinner, setMatchWinner] = useState<string | null>(null)

  // HUD mirrors of engine state (updated each frame)
  const [p1Hud, setP1Hud] = useState<HudFighter | null>(null)
  const [p2Hud, setP2Hud] = useState<HudFighter | null>(null)

  // upgrade-phase "ready" flags
  const [p1Ready, setP1Ready] = useState(false)
  const [p2Ready, setP2Ready] = useState(false)
  const p1ReadyRef = useRef(false)
  const p2ReadyRef = useRef(false)
  p1ReadyRef.current = p1Ready
  p2ReadyRef.current = p2Ready

  // ---- engine init ----
  useEffect(() => {
    const engine = new FightEngine()
    engine.setControls(P1_CONTROLS, P2_CONTROLS)
    engine.onRoundEnd = () => {
      // freeze and move to upgrade or match-over after a beat
      window.setTimeout(() => {
        const e = engineRef.current
        if (!e) return
        if (e.p1.roundWins >= ROUNDS_TO_WIN || e.p2.roundWins >= ROUNDS_TO_WIN) {
          setMatchWinner(e.p1.roundWins > e.p2.roundWins ? e.p1.name : e.p2.name)
          setPhase("matchOver")
        } else {
          setP1Ready(false)
          setP2Ready(false)
          setPhase("upgrade")
        }
        syncHud()
      }, 900)
    }
    engineRef.current = engine
    syncHud()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const syncHud = useCallback(() => {
    const e = engineRef.current
    if (!e) return
    setP1Hud(hudFrom(e.p1))
    setP2Hud(hudFrom(e.p2))
  }, [])

  // ---- main loop ----
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const loop = (ts: number) => {
      const e = engineRef.current
      if (!e) return
      const last = lastTsRef.current || ts
      const dt = Math.min(48, ts - last) // clamp big gaps
      lastTsRef.current = ts

      if (phaseRef.current === "fighting") {
        e.update(dt)
        syncHud()
      }
      draw(ctx, e, phaseRef.current)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [syncHud])

  // ---- keyboard ----
  useEffect(() => {
    const gameplayKeys = new Set([
      ...Object.values(P1_CONTROLS),
      ...Object.values(P2_CONTROLS),
      READY_KEYS.p1,
      READY_KEYS.p2,
    ])

    const onDown = (ev: KeyboardEvent) => {
      const e = engineRef.current
      if (!e) return
      if (gameplayKeys.has(ev.code)) ev.preventDefault()

      if (phaseRef.current === "fighting") {
        if (!ev.repeat) e.handleKey(ev.code, true)
        return
      }
      if (phaseRef.current === "upgrade" && !ev.repeat) {
        // buy upgrades
        if (ev.code === P1_UPGRADE_KEY) tryUpgrade(e.p1)
        if (ev.code === P2_UPGRADE_KEY) tryUpgrade(e.p2)
        // ready toggles
        if (ev.code === READY_KEYS.p1) setP1Ready(true)
        if (ev.code === READY_KEYS.p2) setP2Ready(true)
      }
    }
    const onUp = (ev: KeyboardEvent) => {
      const e = engineRef.current
      if (!e) return
      if (gameplayKeys.has(ev.code)) ev.preventDefault()
      e.handleKey(ev.code, false)
    }
    window.addEventListener("keydown", onDown)
    window.addEventListener("keyup", onUp)
    return () => {
      window.removeEventListener("keydown", onDown)
      window.removeEventListener("keyup", onUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tryUpgrade = useCallback(
    (f: Fighter) => {
      const nt = nextTier(f.swordLevel)
      if (nt && f.gold >= nt.upgradeCost) {
        f.gold -= nt.upgradeCost
        f.swordLevel += 1
        syncHud()
      }
    },
    [syncHud],
  )

  // when both players ready in upgrade phase -> next round
  useEffect(() => {
    if (phase === "upgrade" && p1Ready && p2Ready) {
      const e = engineRef.current
      if (!e) return
      e.resetRound()
      setRound((r) => r + 1)
      setPhase("fighting")
      syncHud()
    }
  }, [phase, p1Ready, p2Ready, syncHud])

  const startMatch = useCallback(() => {
    const e = engineRef.current
    if (!e) return
    e.resetMatch()
    setRound(1)
    setMatchWinner(null)
    setP1Ready(false)
    setP2Ready(false)
    setPhase("fighting")
    lastTsRef.current = 0
    syncHud()
  }, [syncHud])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* top bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/games">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All games
            </Link>
          </Button>
          <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
            <Trophy className="h-4 w-4 text-amber-500" />
            Round {round} · First to {ROUNDS_TO_WIN} wins
          </Badge>
        </div>

        <div className="mb-6 text-center">
          <div className="mb-3 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <Swords className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stick Duel
          </h1>
          <p className="mt-2 text-muted-foreground">
            Two stick fighters, one arena. Land hits to earn gold, then upgrade
            your blade between rounds.
          </p>
        </div>

        {/* HUD: health + gold + wins */}
        {p1Hud && p2Hud && (
          <div className="mb-3 grid grid-cols-2 gap-4">
            <FighterHud hud={p1Hud} align="left" accent="#3b82f6" />
            <FighterHud hud={p2Hud} align="right" accent="#ef4444" />
          </div>
        )}

        {/* arena */}
        <Card className="overflow-hidden">
          <div className="relative select-none">
            <canvas
              ref={canvasRef}
              width={ARENA_WIDTH}
              height={ARENA_HEIGHT}
              className="block h-auto w-full touch-none"
            />

            {phase === "idle" && (
              <Overlay>
                <h2 className="text-2xl font-bold">Ready to duel?</h2>
                <p className="max-w-md text-center text-sm text-muted-foreground">
                  Local two-player. Grab a friend, share the keyboard, and fight
                  best of {ROUNDS_TO_WIN * 2 - 1} rounds.
                </p>
                <Button size="lg" onClick={startMatch}>
                  <Play className="mr-2 h-5 w-5" />
                  Start match
                </Button>
                <ControlsLegend />
              </Overlay>
            )}

            {phase === "upgrade" && p1Hud && p2Hud && (
              <Overlay>
                <h2 className="text-xl font-bold">
                  {engineRef.current?.roundWinner === "left"
                    ? "Blue"
                    : "Red"}{" "}
                  takes the round!
                </h2>
                <p className="text-sm text-muted-foreground">
                  Spend your gold, then ready up for round {round + 1}.
                </p>
                <div className="grid w-full max-w-2xl grid-cols-2 gap-4">
                  <UpgradePanel
                    hud={p1Hud}
                    accent="#3b82f6"
                    upgradeKey="F"
                    readyKey="G"
                    ready={p1Ready}
                  />
                  <UpgradePanel
                    hud={p2Hud}
                    accent="#ef4444"
                    upgradeKey="/"
                    readyKey="."
                    ready={p2Ready}
                  />
                </div>
              </Overlay>
            )}

            {phase === "matchOver" && (
              <Overlay>
                <Trophy className="h-12 w-12 text-amber-500" />
                <h2 className="text-2xl font-bold">{matchWinner} wins the match!</h2>
                <Button size="lg" onClick={startMatch}>
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Rematch
                </Button>
              </Overlay>
            )}
          </div>
        </Card>

        {phase === "fighting" && <ControlsLegend className="mt-4" />}
      </div>
    </div>
  )
}

/* ----------------------------- HUD components ---------------------------- */

function FighterHud({
  hud,
  align,
  accent,
}: {
  hud: HudFighter
  align: "left" | "right"
  accent: string
}) {
  const pct = Math.max(0, (hud.hp / FightEngine.MAX_HP) * 100)
  const tier = SWORD_TIERS[hud.swordLevel]
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <div
        className={`flex items-center gap-2 ${
          align === "right" ? "flex-row-reverse" : ""
        }`}
      >
        <span className="font-bold" style={{ color: accent }}>
          {hud.name}
        </span>
        <span className="text-xs text-muted-foreground">{tier.name}</span>
        <div className="flex items-center gap-1">
          {Array.from({ length: ROUNDS_TO_WIN }).map((_, i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full"
              style={{ background: i < hud.wins ? "#f59e0b" : "#d1d5db" }}
            />
          ))}
        </div>
      </div>
      <div
        className={`mt-1 h-4 w-full overflow-hidden rounded-full bg-muted ${
          hud.flash ? "ring-2 ring-white" : ""
        }`}
      >
        <div
          className="h-full transition-[width] duration-100 ease-linear"
          style={{
            width: `${pct}%`,
            background: accent,
            marginLeft: align === "right" ? "auto" : 0,
          }}
        />
      </div>
      <div
        className={`mt-1 flex items-center gap-1 text-xs text-muted-foreground ${
          align === "right" ? "justify-end" : ""
        }`}
      >
        <Coins className="h-3 w-3 text-yellow-500" />
        <span className="font-semibold tabular-nums text-foreground">
          {hud.gold}
        </span>
        gold
      </div>
    </div>
  )
}

function UpgradePanel({
  hud,
  accent,
  upgradeKey,
  readyKey,
  ready,
}: {
  hud: HudFighter
  accent: string
  upgradeKey: string
  readyKey: string
  ready: boolean
}) {
  const nt = nextTier(hud.swordLevel)
  const current = SWORD_TIERS[hud.swordLevel]
  const canAfford = nt ? hud.gold >= nt.upgradeCost : false
  return (
    <div className="rounded-xl border bg-card/80 p-4 text-left">
      <div className="flex items-center justify-between">
        <span className="font-bold" style={{ color: accent }}>
          {hud.name}
        </span>
        <span className="flex items-center gap-1 text-sm">
          <Coins className="h-3.5 w-3.5 text-yellow-500" />
          <span className="font-semibold tabular-nums">{hud.gold}</span>
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Wielding <span className="font-medium text-foreground">{current.name}</span>
      </p>

      {nt ? (
        <div className="mt-3 rounded-lg border border-dashed p-3">
          <p className="text-sm font-semibold">{nt.name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            +{nt.damage - current.damage} dmg · +{nt.reach - current.reach} reach
          </p>
          <p className="mt-2 text-xs">
            Cost: <span className="font-semibold">{nt.upgradeCost} gold</span>
            {!canAfford && (
              <span className="ml-1 text-red-500">(need more)</span>
            )}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Press{" "}
            <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">
              {upgradeKey}
            </kbd>{" "}
            to buy
          </p>
        </div>
      ) : (
        <div className="mt-3 rounded-lg border border-dashed p-3 text-center text-xs text-muted-foreground">
          Max tier reached ⚔️
        </div>
      )}

      <div className="mt-3">
        {ready ? (
          <Badge className="w-full justify-center bg-emerald-500 py-1.5 hover:bg-emerald-500">
            Ready!
          </Badge>
        ) : (
          <p className="text-center text-xs text-muted-foreground">
            Press{" "}
            <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">
              {readyKey}
            </kbd>{" "}
            when ready
          </p>
        )}
      </div>
    </div>
  )
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/80 p-4 backdrop-blur-sm">
      {children}
    </div>
  )
}

function ControlsLegend({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 ${className}`}
    >
      <div className="rounded-lg border bg-card/50 p-3">
        <p className="mb-1 font-bold text-blue-500">Blue — Player 1</p>
        <p className="text-xs text-muted-foreground">
          <kbd className="rounded bg-muted px-1 font-mono">A</kbd>/
          <kbd className="rounded bg-muted px-1 font-mono">D</kbd> move ·{" "}
          <kbd className="rounded bg-muted px-1 font-mono">W</kbd> jump ·{" "}
          <kbd className="rounded bg-muted px-1 font-mono">S</kbd> block ·{" "}
          <kbd className="rounded bg-muted px-1 font-mono">F</kbd> attack
        </p>
      </div>
      <div className="rounded-lg border bg-card/50 p-3">
        <p className="mb-1 font-bold text-red-500">Red — Player 2</p>
        <p className="text-xs text-muted-foreground">
          <kbd className="rounded bg-muted px-1 font-mono">←</kbd>/
          <kbd className="rounded bg-muted px-1 font-mono">→</kbd> move ·{" "}
          <kbd className="rounded bg-muted px-1 font-mono">↑</kbd> jump ·{" "}
          <kbd className="rounded bg-muted px-1 font-mono">↓</kbd> block ·{" "}
          <kbd className="rounded bg-muted px-1 font-mono">/</kbd> attack
        </p>
      </div>
    </div>
  )
}

/* ------------------------------- rendering ------------------------------- */

function draw(
  ctx: CanvasRenderingContext2D,
  engine: FightEngine,
  phase: Phase,
) {
  // sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, ARENA_HEIGHT)
  sky.addColorStop(0, "#1e293b")
  sky.addColorStop(0.6, "#334155")
  sky.addColorStop(1, "#475569")
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT)

  // distant moon
  ctx.fillStyle = "rgba(241,245,249,0.25)"
  ctx.beginPath()
  ctx.arc(ARENA_WIDTH - 120, 90, 46, 0, Math.PI * 2)
  ctx.fill()

  // ground
  ctx.fillStyle = "#1f2937"
  ctx.fillRect(0, FightEngine.GROUND_Y, ARENA_WIDTH, ARENA_HEIGHT - FightEngine.GROUND_Y)
  ctx.fillStyle = "#374151"
  ctx.fillRect(0, FightEngine.GROUND_Y, ARENA_WIDTH, 6)

  drawFighter(ctx, engine, engine.p1)
  drawFighter(ctx, engine, engine.p2)
}

function drawFighter(
  ctx: CanvasRenderingContext2D,
  engine: FightEngine,
  f: Fighter,
) {
  const torsoH = FightEngine.TORSO_HEIGHT
  const headR = FightEngine.HEAD_RADIUS
  const hipY = f.y
  const shoulderY = f.y - torsoH
  const headCY = shoulderY - headR - 2

  const flashing = f.flashTimer > 0
  const bodyColor = flashing ? "#ffffff" : f.color
  const lineW = 6

  ctx.save()

  // shadow
  ctx.fillStyle = "rgba(0,0,0,0.3)"
  ctx.beginPath()
  ctx.ellipse(f.x, FightEngine.GROUND_Y + 2, 22, 6, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.strokeStyle = bodyColor
  ctx.fillStyle = bodyColor
  ctx.lineWidth = lineW

  // legs — stagger when moving
  const moving = Math.abs(f.vx) > 0.5
  const legSpread = moving ? 14 : 9
  const legPhase = moving ? Math.sin(Date.now() / 60) * 6 : 0
  ctx.beginPath()
  ctx.moveTo(f.x, hipY - 26)
  ctx.lineTo(f.x - legSpread, hipY + legPhase)
  ctx.moveTo(f.x, hipY - 26)
  ctx.lineTo(f.x + legSpread, hipY - legPhase)
  ctx.stroke()

  // torso
  ctx.beginPath()
  ctx.moveTo(f.x, hipY - 26)
  ctx.lineTo(f.x, shoulderY)
  ctx.stroke()

  // head
  ctx.beginPath()
  ctx.arc(f.x, headCY, headR, 0, Math.PI * 2)
  ctx.fillStyle = bodyColor
  ctx.fill()
  // eyes (direction)
  ctx.fillStyle = "#0f172a"
  ctx.beginPath()
  ctx.arc(f.x + f.facing * 5, headCY - 1, 2.2, 0, Math.PI * 2)
  ctx.fill()

  // off-hand (back) arm
  ctx.strokeStyle = bodyColor
  ctx.lineWidth = lineW - 1
  ctx.beginPath()
  ctx.moveTo(f.x, shoulderY + 6)
  ctx.lineTo(f.x - f.facing * 14, shoulderY + 22)
  ctx.stroke()

  // ---- sword arm + blade ----
  drawSwordArm(ctx, engine, f, shoulderY)

  ctx.restore()

  // blocking shield glint
  if (f.blocking) {
    ctx.save()
    ctx.strokeStyle = "rgba(148,163,184,0.9)"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(f.x + f.facing * 18, shoulderY + 16, 22, -Math.PI / 2.4, Math.PI / 2.4)
    ctx.stroke()
    ctx.restore()
  }
}

function drawSwordArm(
  ctx: CanvasRenderingContext2D,
  engine: FightEngine,
  f: Fighter,
  shoulderY: number,
) {
  const tier = SWORD_TIERS[f.swordLevel]
  const progress = engine.swingProgress(f) // -1 if not swinging

  // arm angle: rest pointing slightly down-forward; swing arcs from up to down
  let armAngle: number
  if (progress >= 0) {
    // swing from -120deg (raised back) through to +40deg (down forward)
    const a0 = -Math.PI * 0.72
    const a1 = Math.PI * 0.22
    armAngle = a0 + (a1 - a0) * easeOutQuad(progress)
  } else if (f.blocking) {
    armAngle = -Math.PI * 0.1
  } else {
    armAngle = Math.PI * 0.05
  }

  const shoulderX = f.x
  const armLen = 26
  const handX = shoulderX + Math.cos(armAngle) * armLen * f.facing
  const handY = shoulderY + 6 + Math.sin(armAngle) * armLen

  // arm
  ctx.strokeStyle = f.flashTimer > 0 ? "#ffffff" : f.color
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.moveTo(shoulderX, shoulderY + 6)
  ctx.lineTo(handX, handY)
  ctx.stroke()

  // blade — continues from the hand along the same direction
  const bladeLen = tier.reach
  const tipX = handX + Math.cos(armAngle) * bladeLen * f.facing
  const tipY = handY + Math.sin(armAngle) * bladeLen

  // guard / crossguard
  ctx.strokeStyle = "#fbbf24"
  ctx.lineWidth = 4
  const perp = armAngle + Math.PI / 2
  ctx.beginPath()
  ctx.moveTo(
    handX + Math.cos(perp) * 7 * f.facing,
    handY + Math.sin(perp) * 7,
  )
  ctx.lineTo(
    handX - Math.cos(perp) * 7 * f.facing,
    handY - Math.sin(perp) * 7,
  )
  ctx.stroke()

  // blade
  if (tier.glow) {
    ctx.shadowColor = tier.glow
    ctx.shadowBlur = 14
  }
  ctx.strokeStyle = tier.color
  ctx.lineWidth = tier.width
  ctx.lineCap = "round"
  ctx.beginPath()
  ctx.moveTo(handX, handY)
  ctx.lineTo(tipX, tipY)
  ctx.stroke()
  ctx.shadowBlur = 0

  // swing arc swoosh during active part
  if (progress >= 0.25 && progress <= 0.8) {
    ctx.strokeStyle = "rgba(255,255,255,0.35)"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(
      shoulderX,
      shoulderY + 6,
      armLen + bladeLen * 0.7,
      f.facing === 1 ? -Math.PI * 0.5 : Math.PI * 1.5,
      f.facing === 1 ? Math.PI * 0.15 : Math.PI * 0.85,
      f.facing === -1,
    )
    ctx.stroke()
  }
}

function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t)
}
