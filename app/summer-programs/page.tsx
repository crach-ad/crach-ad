import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SummerProgramsPage() {
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Summer Programs</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Intensive summer cohorts where students design, prototype, and ship.
              </p>
              <Separator className="my-4" />
            </div>
            <div className="grid gap-6 pt-6 md:grid-cols-2">
              <Link href="/stem-program" className="block">
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <CardTitle>STEM Skill Development — Cohort 01</CardTitle>
                    <CardDescription>Summer 2026 · Jun 29 – Aug 7 · Now enrolling</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src="/stem-page/assets/photos/page1-hero.jpeg"
                        fill
                        alt="Student soldering at a workshop bench"
                        className="object-cover object-center"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Six-week applied-build cohort for ages 12–17. Mon–Thu, 9 am – 1 pm. Coding, CAD, electronics,
                      robotics, and AI — students leave with portfolio-ready projects. $400 / week.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default">Reserve a Seat</Button>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          </div>
        </section>
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
