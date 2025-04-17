"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  Users,
  Lightbulb,
  BookOpen,
  Puzzle,
  ChevronDown,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/app/hooks/use-media-query"

export default function TeacherTrainingPage() {
  const [expandedWorkshop, setExpandedWorkshop] = useState<string | null>(null)
  const isMobile = useIsMobile()

  const workshops = [
    {
      id: "keychain",
      date: "April 19th",
      time: "12PM to 2PM",
      title: "3D Printed Keychain",
      shortDescription: "Learn to design and print custom keychains for student projects",
      fullDescription:
        "In this hands-on workshop, educators will learn the fundamentals of 3D design using TinkerCAD and how to prepare models for 3D printing. You'll create a custom keychain that can be used as a template for student projects across various subject areas. We'll discuss integration strategies for math (measurement, geometry), science (materials), language arts (storytelling through design), and more. All participants will receive their printed keychain and digital files to use in their classroom.",
    },
    {
      id: "trinket",
      date: "April 26th",
      time: "12PM to 2PM",
      title: "Lasercut Desk Trinket",
      shortDescription: "Create personalized desk accessories using laser cutting technology",
      fullDescription:
        "Explore the creative potential of laser cutting technology in this interactive workshop. You'll design a personalized desk organizer or trinket using vector graphics software, then watch as your design comes to life on our laser cutter. We'll cover design principles, file preparation, material selection, and safety considerations. You'll leave with practical knowledge of how to incorporate laser cutting into cross-curricular projects, connecting to standards in visual arts, mathematics, engineering, and design thinking. Each participant will take home their completed project and access to design templates.",
    },
    {
      id: "coding",
      date: "May 3rd",
      time: "12PM to 2PM",
      title: "Coding Maze Challenge (win prizes)",
      shortDescription: "Engage students with an interactive coding challenge with prizes",
      fullDescription:
        "This exciting workshop introduces computational thinking and basic coding concepts through a maze challenge. You'll learn how to create and facilitate coding activities that develop logical reasoning, problem-solving, and algorithmic thinking. We'll use both unplugged activities and beginner-friendly coding platforms to design mazes that can be solved through code. Participants will compete in a friendly challenge with prizes for the most creative and efficient solutions. You'll leave with a complete lesson plan, digital resources, and strategies for differentiating the activity for various grade levels and abilities.",
    },
  ]

  const toggleWorkshop = (id: string) => {
    if (expandedWorkshop === id) {
      setExpandedWorkshop(null)
    } else {
      setExpandedWorkshop(id)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <article className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
          <div className="flex flex-col items-start gap-4 mb-8">
            <Link href="/workshops">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Workshops
              </Button>
            </Link>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Professional Development</Badge>
                <Badge variant="outline">STEM Integration</Badge>
                <Badge variant="outline">K-12 Education</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Engineering for Everyone: STEM workshops for teachers
              </h1>
              <p className="text-xl text-muted-foreground">
                Empowering educators to integrate STEM skills across all subject areas
              </p>
            </div>
            <Separator className="my-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-12">
            <div>
              <div className="relative aspect-square overflow-hidden rounded-lg border">
                <Image
                  src="/images/teacher-training-illustration.png"
                  fill
                  alt="Teacher demonstrating 3D printing to students"
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl font-bold">Workshop Overview</h2>
              <p className="text-lg">
                <span className="font-semibold italic">"STEM skills have a place in every classroom..."</span>
              </p>
              <p>
                This comprehensive professional development workshop is designed to help educators integrate STEM
                principles and practices across all curriculum areas. Whether you teach language arts, social studies,
                physical education, or traditional STEM subjects, this training will provide you with practical
                strategies to incorporate critical thinking, problem-solving, and hands-on learning into your classroom.
              </p>
              <div className="space-y-3 mt-6">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Upcoming Sessions</p>
                    <p className="text-sm text-muted-foreground">Monthly workshops available, see schedule below</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">2 hours (12PM to 2PM)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">Meridian School STEM Lab</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-12 mx-auto max-w-4xl">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/4 flex justify-center">
                  <div className="bg-white p-4 rounded-full shadow-md">
                    <GraduationCap className="h-16 w-16 text-blue-600" />
                  </div>
                </div>
                <div className="md:w-3/4 space-y-4 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-blue-800">Why This Training Matters</h3>
                  <p className="text-blue-700">
                    Research shows that integrating STEM skills across the curriculum leads to improved student
                    engagement, higher academic achievement, and better preparation for future careers. By breaking down
                    subject-area silos, educators can create more authentic learning experiences that mirror real-world
                    challenges and opportunities.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center">What You'll Learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Lightbulb className="h-5 w-5 text-purple-700" />
                    </div>
                    <h3 className="text-xl font-semibold">STEM Integration Strategies</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Practical techniques for incorporating STEM principles into any subject area, with specific examples
                    for language arts, social studies, art, music, and physical education.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Puzzle className="h-5 w-5 text-green-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Project-Based Learning</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Design cross-curricular projects that engage students in solving authentic problems while meeting
                    standards across multiple subject areas.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Users className="h-5 w-5 text-amber-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Inclusive Teaching Practices</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Strategies for making STEM accessible to all learners, including differentiation techniques and
                    accommodations for diverse learning needs.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Assessment Methods</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Innovative approaches to assessing STEM skills across the curriculum, including performance-based
                    assessments and digital portfolios.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold mb-8 text-center">Upcoming Workshop Schedule</h2>
              <div className="space-y-6 mx-auto max-w-3xl">
                <p className="text-center md:text-left mb-6">
                  Select from our upcoming workshop sessions. Each workshop focuses on different hands-on projects that
                  you can bring back to your classroom.{" "}
                  <span className="font-medium text-primary">Click on a workshop to see more details.</span>
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Spring 2025 Schedule</h3>
                  <div className="space-y-4">
                    {workshops.map((workshop) => (
                      <div key={workshop.id} className="overflow-hidden">
                        <button
                          onClick={() => toggleWorkshop(workshop.id)}
                          className="flex items-center gap-3 p-3 w-full text-left bg-white rounded-md border border-slate-200 hover:border-primary transition-colors"
                        >
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">
                              {workshop.date} - {workshop.title}
                            </p>
                            <p className="text-sm text-muted-foreground">{workshop.shortDescription}</p>
                          </div>
                          <ChevronDown
                            className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${expandedWorkshop === workshop.id ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {expandedWorkshop === workshop.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="bg-white border-x border-b border-slate-200 rounded-b-md p-4 -mt-1 text-sm">
                                <div className="flex items-center gap-2 mb-3 text-primary">
                                  <Clock className="h-4 w-4" />
                                  <span className="font-medium">{workshop.time}</span>
                                </div>
                                <p className="text-muted-foreground">{workshop.fullDescription}</p>
                                <div className="mt-4 flex justify-end">
                                  <Button size="sm" variant="outline">
                                    Learn More
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <a href="https://forms.fillout.com/t/1SJr1oYCRtus" target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="gap-2">
                        <Calendar className="h-5 w-5" />
                        Register for Workshops
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container mx-auto max-w-5xl px-4 flex flex-col items-center justify-between gap-4 md:flex-row">
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
