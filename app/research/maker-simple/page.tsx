import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Download, ExternalLink, Share2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResearchDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <article className="container max-w-3xl py-12 md:py-16 lg:py-24">
          <div className="flex flex-col items-start gap-4 mb-8">
            <Link href="/research">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Research
              </Button>
            </Link>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">STEM Education</Badge>
                <Badge variant="outline">Gender Equity</Badge>
                <Badge variant="outline">Maker Education</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                MAKER Simple: Making Activities to Expose Middle School Girls to STEM Careers
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Published: 2023</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Academia.edu</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://www.academia.edu/101299373/Board_135_MAKER_Simple_Making_Activities_to_Expose_Middle_School_Girls_to_STEM_Careers?uc-sb-sw=55728050"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View on Academia.edu
                </Button>
              </a>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <Separator className="my-4" />
          </div>

          <Tabs defaultValue="abstract" className="mb-12">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="abstract">Abstract</TabsTrigger>
              <TabsTrigger value="methodology">Methodology</TabsTrigger>
              <TabsTrigger value="findings">Findings</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
            </TabsList>
            <TabsContent value="abstract" className="mt-6 space-y-4">
              <p>
                This paper presents MAKER Simple, a framework designed to engage middle school girls in STEM through
                accessible maker activities. Despite significant efforts to increase diversity in STEM fields, women
                remain underrepresented, particularly in engineering and computer science. The gender gap begins to
                widen during middle school years, making this a critical intervention point.
              </p>
              <p>
                MAKER Simple provides educators with a structured approach to introducing maker activities that are
                specifically designed to appeal to middle school girls while exposing them to various STEM career
                pathways. The framework emphasizes low-cost, accessible materials and activities that can be implemented
                in diverse educational settings, from formal classrooms to after-school programs.
              </p>
            </TabsContent>
            <TabsContent value="methodology" className="mt-6 space-y-4">
              <p>The research employed a mixed-methods approach to develop and evaluate the MAKER Simple framework:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Literature review of effective STEM engagement strategies for middle school girls</li>
                <li>
                  Surveys and focus groups with middle school girls to understand their interests and perceptions of
                  STEM
                </li>
                <li>Collaborative design sessions with STEM educators and industry professionals</li>
                <li>Pilot implementation in diverse educational settings</li>
                <li>Pre and post assessments to measure changes in attitudes toward STEM</li>
              </ul>
              <p>
                The activities were developed through an iterative design process, with feedback from both educators and
                students incorporated into each revision.
              </p>
            </TabsContent>
            <TabsContent value="findings" className="mt-6 space-y-4">
              <p>Key findings from the implementation of MAKER Simple include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Significant increase in girls' interest in STEM careers after participating in the program</li>
                <li>Enhanced self-efficacy in STEM-related tasks</li>
                <li>Greater awareness of diverse STEM career pathways</li>
                <li>Improved understanding of how STEM concepts apply to real-world problems</li>
                <li>Increased engagement when activities incorporated creative expression and social impact</li>
              </ul>
              <p>
                The research also identified specific activity characteristics that were most effective in engaging
                middle school girls, including collaborative work, connection to social issues, and opportunities for
                creative expression.
              </p>
            </TabsContent>
            <TabsContent value="impact" className="mt-6 space-y-4">
              <p>
                The MAKER Simple framework has been implemented in multiple educational settings with promising results:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adopted by 15+ schools across diverse socioeconomic communities</li>
                <li>Integrated into after-school programs reaching over 500 middle school girls</li>
                <li>Professional development workshops conducted for 75+ educators</li>
                <li>Partnerships established with 3 industry sponsors to provide mentorship opportunities</li>
              </ul>
              <p>
                Long-term tracking is underway to measure the impact on participants' educational and career choices.
                Preliminary data shows sustained interest in STEM subjects among program participants compared to
                control groups.
              </p>
            </TabsContent>
          </Tabs>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight">Implementation Examples</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">E-Textile Circuits</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Students create wearable technology using conductive thread, LEDs, and microcontrollers, learning
                    about circuits and programming while expressing creativity through design.
                  </p>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="E-Textile Circuits Project"
                    className="rounded-md"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Biomimicry Design Challenge</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Students study nature's solutions to environmental problems and design prototypes inspired by
                    biological adaptations, connecting engineering with environmental science.
                  </p>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Biomimicry Design Challenge"
                    className="rounded-md"
                  />
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold tracking-tight mt-12">Related Research</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <Link href="/research/maker-spaces" className="block">
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">The Role of Maker Spaces in STEM Education</h3>
                    <p className="text-sm text-muted-foreground">
                      An exploration of how maker spaces and fabrication labs contribute to STEM learning outcomes and
                      skill development.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/research/accessible-learning" className="block">
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Designing Accessible STEM Learning Environments</h3>
                    <p className="text-sm text-muted-foreground">
                      This research presents guidelines for creating inclusive STEM learning environments that
                      accommodate diverse learning needs and abilities.
                    </p>
                  </CardContent>
                </Card>
              </Link>
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
