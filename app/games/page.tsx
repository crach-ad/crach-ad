import Link from "next/link"
import { ArrowLeft, Gamepad2, Coins, ArrowRight, Construction } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata = {
  title: "Games | CRACH.AD",
  description: "Play browser games built by CRACH.AD — starting with Dino Runner.",
}

const games = [
  {
    title: "Dino Runner",
    href: "/dino-game",
    description:
      "A remake of the classic offline dino game. Run as far as you can, bank coins by distance, then spend them on perks and new dino avatars.",
    tags: ["Endless runner", "Coins & perks", "Avatars"],
    available: true,
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    title: "Stick Duel",
    href: "/stick-fight",
    description:
      "Local two-player sword fighting. Two stick figures, one keyboard — land hits to earn gold, then upgrade your blade between rounds. Best of five.",
    tags: ["2 players", "Local versus", "Sword upgrades"],
    available: true,
    accent: "from-rose-500/20 to-rose-500/5",
  },
]

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back home
            </Link>
          </Button>
        </div>

        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Gamepad2 className="h-7 w-7 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Games</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            A small arcade of browser games built right here. Quick to pick up,
            free to play, no installs.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {games.map((game) => (
            <Card key={game.title} className="group flex flex-col overflow-hidden">
              <div
                className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${game.accent}`}
              >
                <Gamepad2 className="h-16 w-16 text-foreground/30 transition-transform duration-300 group-hover:scale-110" />
                {game.available && (
                  <Badge className="absolute right-3 top-3 gap-1 bg-yellow-500 text-black hover:bg-yellow-500">
                    <Coins className="h-3 w-3" />
                    Earn coins
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle>{game.title}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link href={game.href}>
                    Play now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}

          {/* Coming soon placeholder */}
          <Card className="flex flex-col items-center justify-center border-dashed p-8 text-center">
            <Construction className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="font-semibold text-muted-foreground">More games soon</p>
            <p className="mt-1 text-sm text-muted-foreground/70">
              New arcade builds are on the way.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
