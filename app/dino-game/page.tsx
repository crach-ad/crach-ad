"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Coins,
  Trophy,
  Play,
  RotateCcw,
  ShoppingBag,
  Check,
  Lock,
  Gauge,
  Rocket,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  AVATARS,
  PERKS,
  type AvatarId,
  type PerkId,
  type SaveData,
  DEFAULT_SAVE,
  loadSave,
  persistSave,
} from "./dino-config"
import {
  DinoEngine,
  GAME_HEIGHT,
  GAME_WIDTH,
  type EngineConfig,
} from "./dino-engine"
import { DinoSprite } from "./dino-sprite"

type GameState = "idle" | "playing" | "over"

const PERK_ICON: Record<PerkId, typeof Rocket> = {
  jumpBoost: Rocket,
  speedBoost: Gauge,
  shield: Shield,
}

export default function DinoGamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<DinoEngine | null>(null)
  const distRef = useRef<HTMLSpanElement>(null)
  const runCoinRef = useRef<HTMLSpanElement>(null)

  const [save, setSave] = useState<SaveData>(DEFAULT_SAVE)
  const [gameState, setGameState] = useState<GameState>("idle")
  const [lastRun, setLastRun] = useState({ distance: 0, coins: 0, best: false })
  const [shopOpen, setShopOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Mirror state into refs for the global key listener.
  const gameStateRef = useRef(gameState)
  gameStateRef.current = gameState
  const saveRef = useRef(save)
  saveRef.current = save

  useEffect(() => {
    setSave(loadSave())
    setHydrated(true)
  }, [])

  const update = useCallback((updater: (prev: SaveData) => SaveData) => {
    setSave((prev) => {
      const next = updater(prev)
      persistSave(next)
      return next
    })
  }, [])

  const startGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const s = saveRef.current
    const avatar = AVATARS.find((a) => a.id === s.selectedAvatar) ?? AVATARS[0]
    const cfg: EngineConfig = {
      bodyColor: avatar.body,
      accentColor: avatar.accent,
      jumpBoost: s.activePerks.includes("jumpBoost"),
      speedBoost: s.activePerks.includes("speedBoost"),
      shield: s.activePerks.includes("shield"),
    }

    engineRef.current?.stop()
    const engine = new DinoEngine(ctx, cfg, {
      onScore: (distance, coins) => {
        if (distRef.current) distRef.current.textContent = distance.toLocaleString()
        if (runCoinRef.current) runCoinRef.current.textContent = coins.toLocaleString()
      },
      onGameOver: (distance, coins) => {
        const best = distance > saveRef.current.highScore
        setLastRun({ distance, coins, best })
        update((prev) => ({
          ...prev,
          coins: prev.coins + coins,
          highScore: Math.max(prev.highScore, distance),
        }))
        setGameState("over")
      },
    })
    engineRef.current = engine
    if (distRef.current) distRef.current.textContent = "0"
    if (runCoinRef.current) runCoinRef.current.textContent = "0"
    setGameState("playing")
    engine.start()
  }, [update])

  // Keyboard + touch controls.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const jumpKeys = ["Space", "ArrowUp", "KeyW"]
      const duckKeys = ["ArrowDown", "KeyS"]
      if (jumpKeys.includes(e.code)) {
        e.preventDefault()
        if (gameStateRef.current === "playing") engineRef.current?.jump()
        else if (!shopOpen) startGame()
      } else if (duckKeys.includes(e.code)) {
        e.preventDefault()
        if (gameStateRef.current === "playing") engineRef.current?.setDuck(true)
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (["ArrowDown", "KeyS"].includes(e.code)) {
        engineRef.current?.setDuck(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)
    }
  }, [startGame, shopOpen])

  useEffect(() => () => engineRef.current?.stop(), [])

  const onCanvasPointer = () => {
    if (gameStateRef.current === "playing") engineRef.current?.jump()
    else if (!shopOpen) startGame()
  }

  // Shop actions.
  const buyAvatar = (id: AvatarId) => {
    const avatar = AVATARS.find((a) => a.id === id)
    if (!avatar) return
    update((prev) => {
      if (prev.ownedAvatars.includes(id) || prev.coins < avatar.cost) return prev
      return {
        ...prev,
        coins: prev.coins - avatar.cost,
        ownedAvatars: [...prev.ownedAvatars, id],
        selectedAvatar: id,
      }
    })
  }

  const selectAvatar = (id: AvatarId) =>
    update((prev) =>
      prev.ownedAvatars.includes(id) ? { ...prev, selectedAvatar: id } : prev,
    )

  const buyPerk = (id: PerkId) => {
    const perk = PERKS.find((p) => p.id === id)
    if (!perk) return
    update((prev) => {
      if (prev.ownedPerks.includes(id) || prev.coins < perk.cost) return prev
      return {
        ...prev,
        coins: prev.coins - perk.cost,
        ownedPerks: [...prev.ownedPerks, id],
        activePerks: [...prev.activePerks, id],
      }
    })
  }

  const togglePerk = (id: PerkId, on: boolean) =>
    update((prev) => {
      if (!prev.ownedPerks.includes(id)) return prev
      return {
        ...prev,
        activePerks: on
          ? Array.from(new Set([...prev.activePerks, id]))
          : prev.activePerks.filter((p) => p !== id),
      }
    })

  const selectedAvatar =
    AVATARS.find((a) => a.id === save.selectedAvatar) ?? AVATARS[0]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back home
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
              <Coins className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold tabular-nums">
                {hydrated ? save.coins.toLocaleString() : "—"}
              </span>
            </Badge>
            <Dialog open={shopOpen} onOpenChange={setShopOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Shop
                </Button>
              </DialogTrigger>
              <ShopDialog
                save={save}
                onBuyAvatar={buyAvatar}
                onSelectAvatar={selectAvatar}
                onBuyPerk={buyPerk}
                onTogglePerk={togglePerk}
              />
            </Dialog>
          </div>
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Dino Runner
          </h1>
          <p className="mt-2 text-muted-foreground">
            Run as far as you can — every step earns coins. Spend them on perks
            and new dinos in the shop.
          </p>
        </div>

        {/* HUD */}
        <div className="mb-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">
              Distance:{" "}
              <span ref={distRef} className="font-semibold text-foreground tabular-nums">
                0
              </span>{" "}
              m
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Coins className="h-3.5 w-3.5 text-yellow-500" />
              <span ref={runCoinRef} className="font-semibold text-foreground tabular-nums">
                0
              </span>
            </span>
          </div>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            Best:{" "}
            <span className="font-semibold text-foreground tabular-nums">
              {hydrated ? save.highScore.toLocaleString() : 0}
            </span>{" "}
            m
          </span>
        </div>

        {/* Game canvas */}
        <Card className="overflow-hidden">
          <div className="relative select-none">
            <canvas
              ref={canvasRef}
              width={GAME_WIDTH}
              height={GAME_HEIGHT}
              onPointerDown={onCanvasPointer}
              className="block h-auto w-full touch-none bg-slate-50"
              style={{ imageRendering: "pixelated" }}
            />

            {/* Idle / game over overlay */}
            {gameState !== "playing" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/70 backdrop-blur-sm">
                {gameState === "over" ? (
                  <>
                    <div className="text-center">
                      {lastRun.best && (
                        <Badge className="mb-2 gap-1 bg-amber-500 hover:bg-amber-500">
                          <Trophy className="h-3 w-3" /> New best!
                        </Badge>
                      )}
                      <h2 className="text-2xl font-bold">Game Over</h2>
                      <p className="mt-1 text-muted-foreground">
                        You ran{" "}
                        <span className="font-semibold text-foreground">
                          {lastRun.distance.toLocaleString()} m
                        </span>{" "}
                        and earned
                      </p>
                      <p className="mt-1 flex items-center justify-center gap-1.5 text-2xl font-bold text-yellow-500">
                        <Coins className="h-6 w-6" />
                        {lastRun.coins.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={startGame}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Run again
                      </Button>
                      <Button variant="outline" onClick={() => setShopOpen(true)}>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Visit shop
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 rounded-lg bg-background/60 px-4 py-2">
                      <DinoSprite
                        body={selectedAvatar.body}
                        accent={selectedAvatar.accent}
                        size={48}
                      />
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">Playing as</p>
                        <p className="font-semibold">{selectedAvatar.name}</p>
                      </div>
                    </div>
                    <Button size="lg" onClick={startGame}>
                      <Play className="mr-2 h-5 w-5" />
                      Start running
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Press <Kbd>Space</Kbd> / <Kbd>↑</Kbd> to jump ·{" "}
                      <Kbd>↓</Kbd> to duck · tap the screen on mobile
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Active perks summary */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active perks:</span>
          {save.activePerks.length === 0 && (
            <span className="text-sm text-muted-foreground/70">none</span>
          )}
          {PERKS.filter((p) => save.activePerks.includes(p.id)).map((p) => {
            const Icon = PERK_ICON[p.id]
            return (
              <Badge key={p.id} variant="outline" className="gap-1">
                <Icon className="h-3 w-3" />
                {p.name}
              </Badge>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold">
      {children}
    </kbd>
  )
}

function ShopDialog({
  save,
  onBuyAvatar,
  onSelectAvatar,
  onBuyPerk,
  onTogglePerk,
}: {
  save: SaveData
  onBuyAvatar: (id: AvatarId) => void
  onSelectAvatar: (id: AvatarId) => void
  onBuyPerk: (id: PerkId) => void
  onTogglePerk: (id: PerkId, on: boolean) => void
}) {
  return (
    <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Shop
        </DialogTitle>
        <DialogDescription className="flex items-center gap-1.5">
          You have
          <span className="inline-flex items-center gap-1 font-semibold text-foreground">
            <Coins className="h-4 w-4 text-yellow-500" />
            {save.coins.toLocaleString()}
          </span>
          coins to spend.
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="perks" className="mt-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="perks">Perks</TabsTrigger>
          <TabsTrigger value="avatars">Dinos</TabsTrigger>
        </TabsList>

        <TabsContent value="perks" className="mt-4 space-y-3">
          {PERKS.map((perk) => {
            const owned = save.ownedPerks.includes(perk.id)
            const active = save.activePerks.includes(perk.id)
            const affordable = save.coins >= perk.cost
            const Icon = PERK_ICON[perk.id]
            return (
              <Card key={perk.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{perk.name}</p>
                      {owned && (
                        <Badge variant="secondary" className="gap-1 text-xs">
                          <Check className="h-3 w-3" /> Owned
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {perk.description}
                    </p>
                  </div>
                  {owned ? (
                    <div className="flex flex-col items-center gap-1">
                      <Switch
                        checked={active}
                        onCheckedChange={(v) => onTogglePerk(perk.id, v)}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {active ? "On" : "Off"}
                      </span>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      disabled={!affordable}
                      onClick={() => onBuyPerk(perk.id)}
                      className="shrink-0 gap-1"
                    >
                      <Coins className="h-3.5 w-3.5" />
                      {perk.cost}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="avatars" className="mt-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {AVATARS.map((avatar) => {
              const owned = save.ownedAvatars.includes(avatar.id)
              const selected = save.selectedAvatar === avatar.id
              const affordable = save.coins >= avatar.cost
              return (
                <Card
                  key={avatar.id}
                  className={
                    selected ? "border-primary ring-1 ring-primary" : undefined
                  }
                >
                  <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                    <div
                      className="flex h-20 w-full items-center justify-center rounded-md"
                      style={{ background: `${avatar.body}1a` }}
                    >
                      <DinoSprite
                        body={avatar.body}
                        accent={avatar.accent}
                        size={56}
                      />
                    </div>
                    <p className="font-semibold">{avatar.name}</p>
                    <p className="text-xs leading-tight text-muted-foreground">
                      {avatar.description}
                    </p>
                    {owned ? (
                      <Button
                        size="sm"
                        variant={selected ? "secondary" : "outline"}
                        className="w-full"
                        disabled={selected}
                        onClick={() => onSelectAvatar(avatar.id)}
                      >
                        {selected ? (
                          <>
                            <Check className="mr-1 h-3.5 w-3.5" /> Selected
                          </>
                        ) : (
                          "Select"
                        )}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="w-full gap-1"
                        disabled={!affordable}
                        onClick={() => onBuyAvatar(avatar.id)}
                      >
                        {affordable ? (
                          <Coins className="h-3.5 w-3.5" />
                        ) : (
                          <Lock className="h-3.5 w-3.5" />
                        )}
                        {avatar.cost}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <Separator className="my-4" />
          <p className="text-center text-xs text-muted-foreground">
            New dinos are purely cosmetic — every one runs the same. Flex
            responsibly.
          </p>
        </TabsContent>
      </Tabs>
    </DialogContent>
  )
}
