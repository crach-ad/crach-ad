import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function StingrayProjectPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <article className="container max-w-4xl py-12 md:py-16 lg:py-24">
          <div className="flex flex-col items-start gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Hardware</Badge>
                <Badge variant="outline">Education</Badge>
                <Badge variant="outline">Microcontroller</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Stingray Microcontroller</h1>
              <p className="text-xl text-muted-foreground">
                Browser-Programmable Microcontroller for Classroom Learning
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://www.amazon.com/Browser-Programmable-Microcontroller-Classroom-Learning/dp/B0DML6MKF9/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View on Amazon
                </Button>
              </a>
            </div>
            <Separator className="my-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <Image
                src="/images/stingray-classroom-kit.png"
                width={600}
                height={400}
                alt="Stingray Microcontroller Classroom Kit"
                className="rounded-lg border"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Revolutionize STEM Education</h2>
              <p>
                The Stingray Microcontroller Development Kit for the Classroom is designed to make programming, embedded
                systems, and hardware control exciting, accessible, and hassle-free for teachers and students alike.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Built by Educators for Educators:</span> Created by STEM experts, this
                    kit turns complex concepts into hands-on fun.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">No Software, No Stress:</span> Everything runs directly in your web
                    browser—no downloads, no installations, no delays.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Freedom to Create Anywhere:</span> Each microcontroller comes powered
                    by a 2000mAh LiPo battery, enabling untethered creativity.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Next-Gen Programming:</span> With over-the-air (OTA) programming,
                    students can update their devices remotely without disrupting their projects.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Classroom-Ready Convenience</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Compact and Organized</h3>
                  <p className="text-muted-foreground">
                    The kit includes five microcontrollers housed in a sturdy, textbook-sized case. Distribute them at
                    the start of class, and let students pack them up at the end—saving you valuable time while teaching
                    responsibility.
                  </p>
                  <Image
                    src="/images/stingray-kit.png"
                    width={400}
                    height={200}
                    alt="Stingray Kit Components"
                    className="rounded-md"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Built-In Visual Appeal</h3>
                  <p className="text-muted-foreground">
                    Charging the microcontrollers is a breeze, and their glowing LEDs add a touch of style to your
                    classroom. Luminous USB cables with dynamic lights elevate the experience even further.
                  </p>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Stingray Visual Features"
                    className="rounded-md"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">What's Included</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>5 microcontrollers with LiPo batteries</li>
                <li>Organized, durable storage case</li>
                <li>Glow-enhanced USB charging cables</li>
              </ul>
              <p className="text-lg">
                Transform your classroom into a hub of creativity and innovation. Whether you're teaching programming
                basics or tackling advanced embedded systems, the Microcontroller Development Kit brings simplicity,
                excitement, and endless possibilities to every lesson.
              </p>
              <div className="pt-4">
                <a
                  href="https://www.amazon.com/Browser-Programmable-Microcontroller-Classroom-Learning/dp/B0DML6MKF9/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg">Upgrade Your Classroom Today!</Button>
                </a>
              </div>
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
