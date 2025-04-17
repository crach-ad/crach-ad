import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Code, Laptop, Users, PrinterIcon as Printer3d } from "lucide-react"

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

              <Link href="/content" className="block">
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Content</CardTitle>
                    <Code className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Creating educational content, tutorials, and resources for learners.
                    </p>
                  </CardContent>
                </Card>
              </Link>
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
              <Link href="/3d-printing" className="block">
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">3D Printing</CardTitle>
                    <Printer3d className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Custom 3D printing services for educational projects and prototypes.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Projects</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A selection of my recent work in STEM education and technology development.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Stingray Microcontroller</CardTitle>
                  <CardDescription>Browser-Programmable Development Kit</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/images/stingray-classroom-kit.png"
                    width={400}
                    height={200}
                    alt="Stingray Microcontroller Classroom Kit"
                    className="aspect-video overflow-hidden rounded-lg object-cover"
                  />
                  <p className="mt-4 text-sm text-muted-foreground">
                    A revolutionary classroom microcontroller kit with browser-based programming and no software
                    installation required.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/projects/stingray">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>STEM Curriculum Framework</CardTitle>
                  <CardDescription>3D Modeling, Circuit Design & Fabrication</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/images/curriculum-framework.png"
                    width={400}
                    height={200}
                    alt="STEM Curriculum Framework"
                    className="aspect-video overflow-hidden rounded-lg object-cover"
                  />
                  <p className="mt-4 text-sm text-muted-foreground">
                    A comprehensive curriculum for teaching 3D modeling, circuit design, simulation, and PCB fabrication
                    with industry-standard tools.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/projects/curriculum">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>The Happy STEM Project</CardTitle>
                  <CardDescription>K-12 Engineering & Technology Program</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/images/happy-stem-electronics.jpeg"
                    width={400}
                    height={200}
                    alt="Student working on electronics project"
                    className="aspect-video overflow-hidden rounded-lg object-cover"
                  />
                  <p className="mt-4 text-sm text-muted-foreground">
                    A K-12 engineering, technology, and entrepreneurship program designed to bridge the opportunity gap
                    for those who lack STEM exposure and engagement opportunities through hands-on learning experiences.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/projects/happy-stem">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
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
