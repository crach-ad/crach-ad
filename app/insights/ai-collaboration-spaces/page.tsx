import Link from "next/link"
import { ArrowLeft, Calendar, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function AiCollaborationSpacesArticlePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <article className="container max-w-6xl py-12 md:py-16 lg:py-24">
          <div className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-12 lg:items-center">
            <div>
              <div className="flex flex-col items-start gap-4 mb-8">
                <Link href="/insights">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Insights
                  </Button>
                </Link>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">AI</Badge>
                    <Badge variant="outline">Collaboration</Badge>
                    <Badge variant="outline">Workshops</Badge>
                    <Badge variant="outline">Cross-Generational Learning</Badge>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    AI Is Creating New Spaces for Collaboration
                  </h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Published: 2026</span>
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

              <figure className="mb-8 lg:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/insights/ai-collaboration-workshop.jpg"
                  alt="Participants of mixed ages collaborating on laptops during the May 22nd AI workshop"
                  className="w-full rounded-lg border object-cover"
                />
                <figcaption className="mt-2 text-sm text-muted-foreground">
                  Workshop participants — students, professionals, and retirees — working side by side on May 22nd.
                </figcaption>
              </figure>

              <div className="prose prose-slate max-w-none">
                <p className="text-xl font-medium">AI is for everyone.</p>

                <p>
                  This week&rsquo;s workshop really reinforced that for me. Usually, my training and exposure workshops
                  are designed for a very specific audience, often grouped by age, industry, or level of technological
                  proficiency. That structure makes sense most of the time. People tend to feel more comfortable
                  learning alongside others who share similar experiences and technical backgrounds.
                </p>

                <p>But on May 22nd, the room looked very different.</p>

                <p>
                  The group ranged from middle school students to retirees, with every educational and career
                  checkpoint in between. Students sat beside working professionals. Retirees collaborated with people
                  early in their careers. Some participants were highly technical, while others were opening certain
                  tools for the very first time.
                </p>

                <p>What surprised me most was how quickly those barriers disappeared.</p>

                <p>
                  As participants designed flyers, built websites, experimented with AI tools, and developed
                  interactive projects, the collaboration started happening naturally. People who normally would never
                  end up on the same &ldquo;team&rdquo; were suddenly exchanging ideas, solving problems together, and
                  learning from each other in real time.
                </p>

                <p>
                  It became really clear that AI has broken more than just efficiency barriers. It has lowered
                  collaboration barriers too.
                </p>

                <Separator className="my-8" />

                <h2 className="text-2xl font-bold mt-8 mb-4">A New Kind of Middle Ground</h2>

                <p>
                  A lot has been said about generational gaps and why different age groups struggle to work together.
                  But the &ldquo;newness&rdquo; of AI creates a very interesting middle ground. Nobody has decades of
                  mastery over these tools. Everyone is learning, experimenting, and adapting at the same time. That
                  changes the dynamic completely.
                </p>

                <p>
                  In many ways, youthful curiosity and experienced perspective become equally valuable in the room.
                  One group may move faster with experimentation, while another brings communication skills,
                  structure, patience, or domain expertise. Instead of competing against each other, those strengths
                  begin complementing each other.
                </p>

                <Separator className="my-8" />

                <h2 className="text-2xl font-bold mt-8 mb-4">Where This Is Heading</h2>

                <p>
                  I genuinely think we&rsquo;re entering a period where some of the most innovative teams will be the
                  ones willing to embrace cross-generational collaboration instead of separating people by age,
                  background, or technical history.
                </p>

                <p className="font-medium mt-4">
                  And honestly, after seeing this workshop unfold, I think that future is going to arrive much faster
                  than people expect.
                </p>
              </div>
            </div>

            <aside className="hidden lg:flex lg:justify-center">
              <figure className="w-full max-w-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/insights/ai-collaboration-workshop.jpg"
                  alt="Participants of mixed ages collaborating on laptops during the May 22nd AI workshop"
                  className="w-full rounded-lg border object-cover"
                />
                <figcaption className="mt-3 text-sm text-muted-foreground">
                  Workshop participants — students, professionals, and retirees — working side by side on May 22nd.
                </figcaption>
              </figure>
            </aside>
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
