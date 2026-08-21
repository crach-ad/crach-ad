import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Code2, Box, Wrench, Gamepad2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const day1 = [
  { time: "9:00–9:15", session: "Coding introduction", detail: "What code is, why we code, and how software gets built." },
  { time: "9:15–10:00", session: "Coding exploration (Lightbot)", detail: "Guided challenges in computational thinking and pattern recognition." },
  { time: "10:00–11:00", session: "CAD & 3D printing introduction", detail: "What 3D printing is, real-world applications, and a Tinkercad orientation." },
  { time: "11:00–12:00", session: "Tinkercad basics — Project 1", detail: "Interface walkthrough and basic shapes; build the personalized name tag keychain." },
]

const day2 = [
  { time: "9:00–9:15", session: "Recap & print reveal", detail: "Hand back Day 1 keychains, inspect print quality together, set goals." },
  { time: "9:15–10:00", session: "Tinkercad modelling — Project 2", detail: "Guided build of the fidget clicker, with AI assistance when students get stuck." },
  { time: "10:00–10:45", session: "Structural analysis & supports", detail: "Load paths, overhangs, layer direction — applied to hurricane-resilience hardware." },
  { time: "10:45–11:00", session: "Foundations of coding", detail: "The academic coding process and an introduction to game design concepts." },
  { time: "11:00–12:00", session: "Game design exploration", detail: "Students create game assets in Canva for a shared game-graphics library." },
]

export default function WinnersCampPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <article className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
          <div className="flex flex-col items-start gap-4 mb-8">
            <Link href="/workshops">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Workshops
              </Button>
            </Link>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Youth Program</Badge>
                <Badge variant="outline">STEM &amp; AI</Badge>
                <Badge variant="outline">3D Printing</Badge>
                <Badge variant="outline">Summer 2026</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                The Winners&apos; Camp — STEM &amp; AI Program
              </h1>
              <p className="text-xl text-muted-foreground">
                Wenty Ford Sports Foundation, in partnership with Happy Human · Nassau, Bahamas
              </p>
            </div>
            <Separator className="my-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border bg-white">
              <Image
                src="/images/winners-camp-flyer.jpg"
                fill
                alt="The Winners' Camp Summer 2026 flyer announcing Crachad Laing, Director of Happy Human"
                className="object-contain object-center"
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl font-bold">Program Overview</h2>
              <p>
                As part of the Wenty Ford Sports Foundation&apos;s Winners&apos; Camp, Happy Human delivered a STEM &amp;
                AI track for <strong>40 campers</strong> — introducing the fundamentals of computer-aided problem
                solving and the full design-to-manufacturing workflow using 3D printing.
              </p>
              <p>
                Each session paired a short concept block with a long hands-on block: students spent most of their
                time making, not listening, with AI used as a coaching tool. Two builds anchored the program — a
                personalized name tag keychain and a fidget clicker — bridged by a structural analysis session that
                connected print orientation and supports to real hurricane-resilience hardware in The Bahamas.
              </p>
              <div className="space-y-3 mt-6">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Dates</p>
                    <p className="text-sm text-muted-foreground">Camp week July 27–31, 2026 · STEM &amp; AI track Monday &amp; Tuesday</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Session Time</p>
                    <p className="text-sm text-muted-foreground">9:00 AM – 12:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">St. Agnes Anglican Church Parish Hall, Nassau</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Participants</p>
                    <p className="text-sm text-muted-foreground">40 campers · ages 11–14</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">What Students Built &amp; Learned</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Code2 className="h-5 w-5 text-purple-700" />
                  </div>
                  <h3 className="text-lg font-semibold">Coding Foundations</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Computational thinking and pattern recognition through Lightbot challenges, plus how software
                  actually gets built.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Box className="h-5 w-5 text-green-700" />
                  </div>
                  <h3 className="text-lg font-semibold">CAD &amp; 3D Printing</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Two Tinkercad builds printed in PLA: a name tag keychain (shape combination, alignment, text on
                  solids) and a fidget clicker (moving parts, clearance, tolerance).
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Wrench className="h-5 w-5 text-amber-700" />
                  </div>
                  <h3 className="text-lg font-semibold">Structural Analysis</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Load paths, the 45° overhang rule, layer direction, and supports — framed around what you could
                  print to hold a building together after a storm.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Gamepad2 className="h-5 w-5 text-blue-700" />
                  </div>
                  <h3 className="text-lg font-semibold">Game Design &amp; AI</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Game design concepts and asset creation in Canva, with AI used throughout as a coaching tool when
                  students got stuck.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">Two-Day Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 md:mb-12">
            {[
              { title: "Day 1 — Foundations", sub: "Coding concepts, CAD orientation, and the first printed object.", rows: day1 },
              { title: "Day 2 — Structure, Design & Game Development", sub: "A second build, structural analysis, and the move into game design.", rows: day2 },
            ].map((day) => (
              <div key={day.title} className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-slate-900">
                <h3 className="text-xl font-semibold mb-1">{day.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{day.sub}</p>
                <div className="space-y-3">
                  {day.rows.map((r) => (
                    <div key={r.time} className="bg-white rounded-md border border-slate-200 p-3">
                      <p className="text-xs font-mono text-slate-500">{r.time}</p>
                      <p className="font-medium">{r.session}</p>
                      <p className="text-sm text-slate-600">{r.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 text-slate-50 rounded-lg p-6 md:p-8">
            <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">Partners &amp; Sponsors</p>
            <p>
              Delivered in partnership with the <strong>Wenty Ford Sports Foundation</strong> — transforming lives
              through education, athletics &amp; mentorship — with support from Solomon&apos;s, Domino&apos;s, Addis
              Huyler Photography, Consolidated Water, and Family Guardian Insurance Company.
            </p>
          </div>
        </article>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} CRACH.AD. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
