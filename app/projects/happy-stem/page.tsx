import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, Users, Calendar, BookOpen, Lightbulb, Target, Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HappyStemProjectPage() {
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
                <Badge variant="outline">Education</Badge>
                <Badge variant="outline">STEM</Badge>
                <Badge variant="outline">Community</Badge>
                <Badge variant="outline">K-12</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">The Happy STEM Project</h1>
              <p className="text-xl text-muted-foreground">
                Bridging the opportunity gap through hands-on STEM education
              </p>
            </div>
            <Separator className="my-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <Image
                src="/images/happy-stem-electronics.jpeg"
                width={600}
                height={400}
                alt="Student working on electronics project"
                className="rounded-lg border"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Program Overview</h2>
              <p>
                Happy STEM is a K-12 engineering, technology, and entrepreneurship program designed to bridge the
                opportunity gap for those who lack STEM exposure and engagement opportunities. We define this as anyone
                lacking consistent access to STEM engagement and personalized feedback. Our mission is to inspire,
                educate, and empower future innovators by providing them with the tools, mentorship, and experiences
                necessary to excel in STEM fields.
              </p>
              <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium text-blue-900">Weekly Sessions</p>
                  <p className="text-sm text-blue-700">Every Saturday morning, 2-3 hours per session</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="bg-green-50 p-6 rounded-lg border border-green-100 mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3 flex justify-center">
                  <div className="bg-white p-4 rounded-full shadow-md">
                    <Heart className="h-16 w-16 text-green-600" />
                  </div>
                </div>
                <div className="md:w-2/3 space-y-4 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-green-800">Our Mission</h3>
                  <p className="text-green-700 text-lg">
                    To deliver high-quality STEM education to underserved students, fostering curiosity, creativity, and
                    entrepreneurial thinking through hands-on learning experiences.
                  </p>
                  <h3 className="text-xl font-semibold text-green-800">Our Vision</h3>
                  <p className="text-green-700">
                    We envision a world where every child, regardless of background, has access to transformative STEM
                    education and the opportunity to contribute to society as innovators and leaders.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Key Objectives</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Target className="h-5 w-5 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Engage</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Provide consistent, weekly STEM exposure to students in underserved communities.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-purple-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Educate</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Develop technical, critical thinking, and entrepreneurial skills through hands-on projects.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Lightbulb className="h-5 w-5 text-amber-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Empower</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Build confidence and self-efficacy in students by fostering a supportive learning environment.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Rocket className="h-5 w-5 text-green-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Expand</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Partner with schools, nonprofits, and community organizations to maximize reach and impact.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Program Structure</h2>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Curriculum Design</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Aligned with Next Generation Science Standards (NGSS) and CIE Computing frameworks
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Real-world problem-solving and project-based learning
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Career exploration through guest speakers, field trips, and mentorship
                      </li>
                    </ul>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Content Focus</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Engineering design and prototyping
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Coding and computational thinking
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Robotics and automation
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Entrepreneurship and innovation
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <Image
                  src="/images/happy-stem-coding.png"
                  width={500}
                  height={400}
                  alt="Student working on coding project"
                  className="rounded-lg border h-full object-cover"
                />
              </div>
            </div>

            <Tabs defaultValue="demographic" className="mb-12">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="demographic">Target Demographic</TabsTrigger>
                <TabsTrigger value="operational">Operational Plan</TabsTrigger>
              </TabsList>
              <TabsContent value="demographic" className="mt-6 space-y-4 p-6 bg-muted rounded-lg">
                <h3 className="text-xl font-semibold">Who We Serve</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      <span className="font-medium">Age Range:</span> K-12 students (ages 5-18)
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      <span className="font-medium">Focus Group:</span> Communities with limited STEM exposure and
                      engagement opportunities
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      <span className="font-medium">Enrollment Goal:</span> Start with 50 students in Year 1, scaling by
                      25% annually
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      <span className="font-medium">Instructor-to-Student Ratio:</span> 1:10 to ensure personalized
                      attention
                    </p>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="operational" className="mt-6 space-y-4 p-6 bg-muted rounded-lg">
                <h3 className="text-xl font-semibold">How We Operate</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      <span className="font-medium">Locations:</span> Partner with community centers, libraries, and
                      schools to host sessions
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      <span className="font-medium">Instructor Recruitment:</span> Train and recruit STEM professionals
                      and educators passionate about teaching
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      <span className="font-medium">Student Recruitment:</span> Work with schools and community
                      organizations to identify and enroll students who lack STEM exposure and engagement opportunities
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      <span className="font-medium">Assessment:</span> Regularly evaluate program effectiveness through
                      student feedback, assessments, and project outcomes
                    </p>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
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
