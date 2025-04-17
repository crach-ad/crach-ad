import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function CoursesPage() {
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">STEM Courses</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Explore my courses on programming, robotics, electronics, and other STEM topics.
              </p>
              <Separator className="my-4" />
            </div>
            <div className="grid gap-6 pt-6 lg:grid-cols-2 xl:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Introduction to Robotics</CardTitle>
                    <Badge>Beginner</Badge>
                  </div>
                  <CardDescription>A hands-on introduction to robotics fundamentals</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Introduction to Robotics"
                    className="aspect-video overflow-hidden rounded-lg object-cover"
                  />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Learn the basics of robotics including mechanics, electronics, and programming through hands-on
                      projects.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">4.8/5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">1,200+ students</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/courses/intro-robotics">
                    <Button>View Course</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Physical Computing with Arduino</CardTitle>
                    <Badge>Intermediate</Badge>
                  </div>
                  <CardDescription>Building interactive physical systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Physical Computing with Arduino"
                    className="aspect-video overflow-hidden rounded-lg object-cover"
                  />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Explore the intersection of hardware and software by creating interactive physical systems using
                      Arduino.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">4.9/5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">950+ students</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/courses/arduino">
                    <Button>View Course</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Python for Data Science</CardTitle>
                    <Badge>All Levels</Badge>
                  </div>
                  <CardDescription>Analyzing and visualizing data with Python</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Python for Data Science"
                    className="aspect-video overflow-hidden rounded-lg object-cover"
                  />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Learn to use Python for data analysis, visualization, and basic machine learning applications.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">4.7/5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">2,500+ students</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/courses/python-data-science">
                    <Button>View Course</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Web Development for STEM Projects</CardTitle>
                    <Badge>Intermediate</Badge>
                  </div>
                  <CardDescription>Building interactive web applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Web Development for STEM Projects"
                    className="aspect-video overflow-hidden rounded-lg object-cover"
                  />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Learn to create interactive web applications for visualizing and sharing STEM projects and data.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">4.6/5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">1,100+ students</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/courses/web-development">
                    <Button>View Course</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Electronics Fundamentals</CardTitle>
                    <Badge>Beginner</Badge>
                  </div>
                  <CardDescription>Understanding electronic circuits and components</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Electronics Fundamentals"
                    className="aspect-video overflow-hidden rounded-lg object-cover"
                  />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Learn the basics of electronics, circuit design, and component selection through practical
                      projects.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">4.8/5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">1,350+ students</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/courses/electronics">
                    <Button>View Course</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>3D Modeling for Digital Fabrication</CardTitle>
                    <Badge>All Levels</Badge>
                  </div>
                  <CardDescription>Creating designs for 3D printing and CNC</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="3D Modeling for Digital Fabrication"
                    className="aspect-video overflow-hidden rounded-lg object-cover"
                  />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Master 3D modeling techniques for creating designs suitable for digital fabrication technologies.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">4.7/5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">900+ students</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/courses/3d-modeling">
                    <Button>View Course</Button>
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
