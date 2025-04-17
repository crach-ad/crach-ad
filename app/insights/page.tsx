import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function InsightsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Insights & Articles</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Articles, essays, and insights on STEM education, technology integration, and educational innovation.
              </p>
              <Separator className="my-4" />
            </div>
            <div className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle>MAKER Simple: Making Activities to Expose Middle School Girls to STEM Careers</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Published: 2023</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This paper presents a framework for engaging middle school girls in STEM through accessible maker
                    activities, addressing the gender gap in STEM fields and providing practical implementation
                    strategies.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>Published in Academia.edu</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/insights/maker-simple">
                    <Button variant="default" size="sm">
                      Read Article
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Why TinkerCAD is GOATED 🐐</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Published: 2024</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    An exploration of how TinkerCAD serves as a powerful entry point for K-6 students into design
                    thinking, computational thinking, and spatial reasoning with practical classroom applications.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>Classroom insights</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/insights/tinkercad-goated">
                    <Button variant="outline" size="sm">
                      Read Article
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
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
