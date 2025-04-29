import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function WorkshopsPage() {
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Workshops & Professional Development</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Hands-on workshops and training for educators and developers.
              </p>
              <Separator className="my-4" />
            </div>
            <div className="grid gap-6 pt-6 md:grid-cols-2">
              <Link href="/workshops/teacher-training" className="block">
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <CardTitle>Engineering for Everyone: STEM workshops for teachers</CardTitle>
                    <CardDescription>Professional development for K-12 educators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src="/images/teacher-training-illustration.png"
                        fill
                        alt="Teacher demonstrating 3D printing to students"
                        className="object-cover object-center"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive training for educators to integrate STEM principles and practices across all
                      curriculum areas.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default">Learn More</Button>
                  </CardFooter>
                </Card>
              </Link>
              <Link href="/workshops/stem-clubs" className="block">
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <CardTitle>After School STEM Clubs</CardTitle>
                    <CardDescription>Enrichment programs for K-12 students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src="/images/stem-club-pic.jpeg"
                        fill
                        alt="Students participating in after school STEM activities"
                        className="object-cover object-center"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Engaging after-school programs designed to inspire students through hands-on STEM projects and collaborative learning experiences.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default">Learn More</Button>
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
