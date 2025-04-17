import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TinkercadArticlePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <article className="container max-w-3xl py-12 md:py-16 lg:py-24">
          <div className="flex flex-col items-start gap-4 mb-8">
            <Link href="/insights">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Insights
              </Button>
            </Link>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Educational Technology</Badge>
                <Badge variant="outline">K-6 Education</Badge>
                <Badge variant="outline">Design Thinking</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why TinkerCAD is GOATED 🐐
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Published: 2024</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <Separator className="my-4" />
          </div>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4">
              Unlocking Design Thinking with TinkerCAD in the K–6 Classroom
            </h2>

            <p>
              TinkerCAD is a mean entry point for young learners into the world of problem solving, computational
              thinking, spatial reasoning, and inquiry-based learning. It's open-ended, forgiving, and best of all —
              it's completely FREE. I've found it to be one of the most powerful tools for practical learning, offering
              students the space to experiment, explore, and grow without the fear of doing it "wrong."
            </p>

            <p>
              Let me walk you through how I use TinkerCAD in my classroom environments across Grades K–6, with a focus
              on one key project: a personalized keychain design.
            </p>

            <Separator className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">My Approach: Scaffolding with STO (Steps to Outcome)</h2>

            <p>
              Every student is different, so when teaching design tech, I use a scaffolding technique I call STO — Steps
              to Outcome. This is a simple way to track how many discrete steps a student might need to achieve a
              desired outcome within a CAD-based task.
            </p>

            <p>
              Based on my own teaching experience and classroom observations, I've found these STO ranges to work best:
            </p>

            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Grade 1: ~4 STO</li>
              <li>Grades 2–4: ~5–10 STO</li>
              <li>Grades 5–6: ~10–15 STO</li>
            </ul>

            <p>
              Naturally, this varies depending on the student, the classroom environment, and the complexity of the
              project. But using STO as a flexible framework has helped me tailor tasks and expectations while still
              encouraging creative expression.
            </p>

            <Separator className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">Project Spotlight: Designing a Personalized Keychain</h2>

            <p>
              One of my favorite introductory CAD projects is the TinkerCAD Keychain Challenge — where students design a
              3D-printable keychain with their name on it.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Learning Objectives</h3>

            <p>Students will use design thinking and CAD tools to:</p>

            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Visualize their ideas</li>
              <li>Translate concepts into 3D space</li>
              <li>Apply problem-solving and iteration techniques</li>
              <li>Export a final model for 3D printing</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Design Tech Skills Covered</h3>

            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>TinkerCAD core skills: placement, positioning, rotating, dimensioning, grouping, and exporting</li>
              <li>Key tools used: basic shapes, scribble, and sketch tool</li>
            </ul>

            <Separator className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">Grade-Level Breakdown</h2>

            <p>Here's how the project evolves across grade levels based on my STO framework:</p>

            <div className="my-6">
              <h3 className="text-xl font-semibold mb-3">Grade 1 (4 STO)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Focus:</span> Core skills only — placing shapes, rotating, and
                  positioning them along the X & Y axis
                </li>
                <li>
                  <span className="font-medium">Tools:</span> Basic shapes
                </li>
                <li>
                  <span className="font-medium">Outcome:</span> A simple, readable keychain layout
                </li>
              </ul>
            </div>

            <div className="my-6">
              <h3 className="text-xl font-semibold mb-3">Grades 2–4 (5–10 STO)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Building on:</span> Core skills from Grade 1
                </li>
                <li>
                  <span className="font-medium">New skills:</span> Exporting the design and naming the file correctly
                </li>
                <li>
                  <span className="font-medium">Tools:</span> Basic shapes, optional use of the scribble tool
                </li>
                <li>
                  <span className="font-medium">Outcome:</span> A well-positioned nameplate with additional decorative
                  elements
                </li>
              </ul>
            </div>

            <div className="my-6">
              <h3 className="text-xl font-semibold mb-3">Grades 5–6 (10–15 STO)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Advanced expectations:</span> Full design autonomy
                </li>
                <li>
                  <span className="font-medium">Skills required:</span> Placement, positioning, rotating, dimensioning,
                  grouping, and exporting
                </li>
                <li>
                  <span className="font-medium">Tool focus:</span> Must use the Sketch tool for all aspects of design
                  (no pre-made shapes allowed)
                </li>
                <li>
                  <span className="font-medium">Outcome:</span> A fully customized, hand-drawn keychain that
                  demonstrates a deeper understanding of 3D design and spatial planning
                </li>
              </ul>
            </div>

            <Separator className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">Why This Works</h2>

            <p>
              TinkerCAD meets students right where they are developmentally. With the STO model, I can dial up or down
              the complexity, ensuring that every student feels successful and challenged. Plus, they walk away with
              something tangible — a 3D-printed object that they designed themselves.
            </p>

            <p className="font-medium mt-4">
              It's more than just a keychain — it's confidence, creativity, and computational thinking… in their pocket.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Example: Grade 1 Keychain</h3>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-07%20at%205.18.34%E2%80%AFPM-dw89mpziku8iqKMscEi3Kx5IyUVLk3.png"
                    width={600}
                    height={400}
                    alt="Grade 1 TinkerCAD Keychain Example showing a red rectangular base with the name CAMRON in colorful 3D letters"
                    className="rounded-md w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-3">
                    A Grade 1 student's keychain design showing basic shape placement and positioning skills with
                    colorful 3D letters on a red base.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Example: Grade 5 Keychain</h3>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-07%20at%205.27.12%E2%80%AFPM-K7ItFnOTnjTLK0DO63WEBft4T0HKqj.png"
                    width={600}
                    height={400}
                    alt="Grade 5 TinkerCAD Keychain Example showing a custom-shaped red base with the name SAM in light blue 3D letters and a keyring hole"
                    className="rounded-md w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-3">
                    A Grade 5 student's design featuring a custom-shaped base created with the Sketch tool,
                    demonstrating more advanced spatial planning and design autonomy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </article>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} CRACH.AD. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="https://twitter.com" className="text-sm font-medium hover:underline underline-offset-4">
              Twitter
            </Link>
            <Link href="https://github.com" className="text-sm font-medium hover:underline underline-offset-4">
              GitHub
            </Link>
            <Link href="https://linkedin.com" className="text-sm font-medium hover:underline underline-offset-4">
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
