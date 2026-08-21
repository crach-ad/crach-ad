import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Code2, Box, Cpu, Glasses, Brain, Presentation } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const modules = [
  { icon: Code2, color: "purple", title: "Foundations of Coding", focus: "Computational thinking", outcome: "Interactive programs in Scratch, with HTML/CSS/JS and Swift Playgrounds for advanced students." },
  { icon: Box, color: "green", title: "CAD & Manufacturing", focus: "Product design", outcome: "A 3D-printed object designed in Tinkercad — keychains, fidgets, phone stands, hurricane-resilience brackets." },
  { icon: Cpu, color: "amber", title: "Programmable Electronics", focus: "Programming hardware", outcome: "A working Arduino project: blink an LED, read a push button, build a traffic light or temperature sensor." },
  { icon: Glasses, color: "blue", title: "Virtual & Augmented Reality", focus: "Emerging technology", outcome: "Immersive experiences — ocean and space exploration, human anatomy, historical recreations." },
  { icon: Brain, color: "rose", title: "AI & Digital Safety", focus: "Future skills", outcome: "AI-assisted posters, websites, games, and business ideas — always paired with the student's own thinking." },
  { icon: Presentation, color: "slate", title: "Final Showcase", focus: "Entrepreneurship", outcome: "A Shark Tank pitch: the problem, the solution, the CAD model, the prototype, and the AI tools used." },
]

const colorMap: Record<string, string> = {
  purple: "bg-purple-100 text-purple-700",
  green: "bg-green-100 text-green-700",
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
  rose: "bg-rose-100 text-rose-700",
  slate: "bg-slate-200 text-slate-700",
}

export default function FutureReadyAbacoPage() {
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
                <Badge variant="outline">Family Island</Badge>
                <Badge variant="outline">Summer 2026</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Abaco Future Ready Academy — STEM &amp; AI Camp
              </h1>
              <p className="text-xl text-muted-foreground">
                A week-long camp in Abaco delivered with Happy Human volunteers and instructors
              </p>
            </div>
            <Separator className="my-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border">
              <Image
                src="/images/future-ready-abaco-classroom.jpg"
                fill
                alt="Instructors leading a design session with campers on laptops at the Abaco Future Ready Academy"
                className="object-cover object-center"
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl font-bold">Program Overview</h2>
              <p className="text-lg">
                <span className="font-semibold italic">Learn → Build → Reflect → Share</span>
              </p>
              <p>
                The Future Ready Academy exposes young people in Abaco to the technologies shaping their future while
                building confidence through <em>creating</em> technology, not just consuming it. Across the week,
                students became designers, programmers, engineers, and innovators — every activity ended with a
                tangible outcome: a Scratch game, a CAD model, an Arduino circuit, a VR experience, an AI-generated
                design, a pitch.
              </p>
              <p>
                Happy Human designed the curriculum and onboarded the volunteer and instructor team with a facilitator
                handbook, a six-module learning journey, and a daily structure that protects three hours of hands-on
                build time every day.
              </p>
              <div className="space-y-3 mt-6">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">When</p>
                    <p className="text-sm text-muted-foreground">August 2026 · 5-day program</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Daily Structure</p>
                    <p className="text-sm text-muted-foreground">6 hours · welcome, learn, guided build, independent build, extend, showcase, reflect</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">Abaco, Bahamas</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Participants</p>
                    <p className="text-sm text-muted-foreground">Ages 10–17 · Junior STEM Innovators and AI Foundations tracks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">Weekly Learning Journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {modules.map((m, i) => {
              const Icon = m.icon
              return (
                <Card key={m.title}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${colorMap[m.color]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">Module {i + 1}</p>
                        <h3 className="text-lg font-semibold leading-tight">{m.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm font-medium">{m.focus}</p>
                    <p className="text-muted-foreground text-sm">{m.outcome}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">Camp Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border">
              <Image
                src="/images/future-ready-abaco-3.jpg"
                fill
                alt="Campers building structures with magnetic construction kits during a design challenge"
                className="object-cover object-center"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border">
              <Image
                src="/images/future-ready-abaco-certificate.jpg"
                fill
                alt="A camper receiving a certificate and a high-five at the closing showcase"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="bg-slate-900 text-slate-50 rounded-lg p-6 md:p-8">
            <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">Volunteer Best Practices</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm font-medium">
              <p>Encourage experimentation.</p>
              <p>Celebrate mistakes.</p>
              <p>Ask before answering.</p>
              <p>Never take the mouse.</p>
              <p>Keep students building.</p>
              <p>Progress, not perfection.</p>
            </div>
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
