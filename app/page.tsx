import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Code, Laptop, Users, PrinterIcon as Printer3d, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InstagramEmbed } from "@/app/components/instagram-embed"
import { ThreadsEmbed } from "@/app/components/threads-embed"
import { LinkedInEmbed } from "@/app/components/linkedin-embed"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-24 xl:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl/none">
                    STEM Education & Development
                  </h1>
                  <p className="max-w-[600px] text-sm md:text-base lg:text-lg text-muted-foreground">
                    Bridging the gap between education and industry. Empowering students of all ages through research
                    insights and development tools
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/insights">
                    <Button className="gap-1 w-full min-[400px]:w-auto">
                      Explore My Work
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full min-[400px]:w-auto">
                      Contact Me
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative mx-auto aspect-square w-full max-w-[300px] md:max-w-none overflow-hidden rounded-xl lg:order-last">
                <Image
                  src="/images/headshot.jpg"
                  width={600}
                  height={600}
                  alt="Profile Photo"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What I Do</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Combining education and technology to create innovative learning experiences and solutions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6 py-8 sm:py-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <Link href="/insights" className="block">
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Insights</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Publishing articles, essays and insights on STEM education and technology integration.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* Content Card (Locked) */}
              <div className="relative group">
                <Card className="h-full opacity-50 pointer-events-none select-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Content</CardTitle>
                    <Code className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Creating educational content, tutorials, and resources for learners.
                    </p>
                  </CardContent>
                  {/* Lock overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-black/40 rounded-lg z-10">
                    <Lock className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground">Coming Soon</span>
                  </div>
                </Card>
                <span className="absolute inset-0 z-20" title="This feature is currently unavailable." />
              </div>
              <Link href="/workshops" className="block">
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Workshops</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Facilitating workshops and professional development for educators and developers.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/software-projects" className="block">
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Software Projects</CardTitle>
                    <Laptop className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Developing innovative software solutions for biometric analysis and educational applications.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              {/* 3D Printing Card (Locked) */}
              <div className="relative group">
                <Card className="h-full opacity-50 pointer-events-none select-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">3D Printing</CardTitle>
                    <Printer3d className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Custom 3D printing services for educational projects and prototypes.
                    </p>
                  </CardContent>
                  {/* Lock overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-black/40 rounded-lg z-10">
                    <Lock className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground">Coming Soon</span>
                  </div>
                </Card>
                <span className="absolute inset-0 z-20" title="This feature is currently unavailable." />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter">Connect With Me</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Follow my latest updates across social platforms
              </p>
            </div>
            {/* Social Media Embeds - Horizontal Layout */}
            <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-3">
              <InstagramEmbed username="crach.stem" />
              <ThreadsEmbed username="crach.ad" />
              <LinkedInEmbed />
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
