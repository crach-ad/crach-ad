"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { CheckCircle, Clock, MapPin, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function STEMClubsPage() {
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)
  const [signupFormOpen, setSignupFormOpen] = useState(false)

  // Define the STEM club programs available
  const programs = [
    {
      id: "meridian-stem-club",
      title: "Meridian STEM Club",
      ageRange: "Grades 3-6",
      shortDescription: "Coding and electronics focus for Spring 2025",
      date: "Fridays",
      time: "3:30 PM - 4:30 PM",
      location: "Meridian School STEM Lab",
      fullDescription:
        "Globally, we've seen a huge push for STEM Education as a facilitator to STEM Industry needs. As time goes on, these needs only grow. STEM Club provides an opportunity for learners to gain early exposure to the skills that will be essential to their future success.\n\nLearners will focus on coding and electronics this fall. At STEM Club, the tools and equipment that we use will be appropriate to each grade level and will serve as great developmental platforms as your children work towards mastery.",
      additionalInfo: {
        skills: [
          "Programming Logic and Programming in C++",
          "CAD in Shapr3d",
          "Design Thinking",
          "3D Printing and Lean Manufacturing"
        ],
        dates: "May 2nd to June 6th",
        cost: "$70/semester",
        includes: "Inclusive of all material and project equipment",
        notes: "Learners should bring their own device (laptop, tablet or phone!)",
        signupLink: "https://forms.gle/A1c18D8iqu13m51L6"
      }
    }
  ]

  const toggleProgram = (id: string) => {
    if (expandedProgram === id) {
      setExpandedProgram(null)
    } else {
      setExpandedProgram(id)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4">
              <Link href="/workshops">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Workshops
                </Button>
              </Link>
              <div className="w-full">
                <h1 className="text-3xl font-bold tracking-tighter mb-4 sm:text-5xl">
                  After School STEM Clubs
                </h1>
                <p className="mb-6 text-muted-foreground md:text-xl/relaxed">
                  Engaging after-school programs designed to inspire students through hands-on STEM projects
                  and collaborative learning experiences.
                </p>
                <div className="flex flex-col md:flex-row gap-8 mt-6">
                  <div className="md:w-1/2 relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                    <Image
                      src="/images/stem-club-pic.jpeg"
                      fill
                      alt="Students participating in after school STEM activities"
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Program Overview</h2>
                    <div className="italic text-xl text-primary mb-4">
                      "STEM skills have a place in every classroom..."
                    </div>
                    <p className="text-base text-muted-foreground mb-6">
                      Our after-school STEM clubs provide a fun, engaging environment where students can explore science,
                      technology, engineering, and mathematics through hands-on activities. Each club focuses on different
                      aspects of STEM education, allowing students to discover and develop their interests while building
                      valuable skills for the future.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <span className="font-medium">Upcoming Sessions</span>
                          <p className="text-sm text-muted-foreground">May 2nd to June 6th</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <span className="font-medium">Duration</span>
                          <p className="text-sm text-muted-foreground">Fridays, 3:30 PM to 4:30 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <span className="font-medium">Location</span>
                          <p className="text-sm text-muted-foreground">
                            Meridian School STEM Lab
                            <Link href="https://www.themeridianschool.com" target="_blank" className="ml-1 text-primary hover:underline">
                              (School Website)
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 mt-10 md:grid-cols-2 lg:grid-cols-4 w-full">
                <Card className="p-4">
                  <CardContent className="p-0 space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Project-Based Learning</h3>
                        <p className="text-sm text-muted-foreground">
                          All clubs emphasize learning through doing with tangible projects students can be proud of
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardContent className="p-0 space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Small Group Sizes</h3>
                        <p className="text-sm text-muted-foreground">
                          Maximum of 12 students per club ensures personalized attention and guidance
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardContent className="p-0 space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Experienced Instructors</h3>
                        <p className="text-sm text-muted-foreground">
                          Led by educators with backgrounds in STEM and experience working with youth
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardContent className="p-0 space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Inclusive Environment</h3>
                        <p className="text-sm text-muted-foreground">
                          Programs designed to engage all students regardless of prior experience or background
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <Separator className="my-12" />
            
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Available STEM Club Programs</h2>
                <p className="text-muted-foreground">
                  Select from our variety of programs tailored for different age groups and interests.
                  <span className="font-medium text-primary block mt-2">Click on a program to see more details.</span>
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {programs.map((program) => (
                    <AccordionItem key={program.id} value={program.id}>
                      <AccordionTrigger className="text-lg hover:no-underline py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-left">
                          <span className="font-medium">{program.title}</span>
                          <span className="text-sm text-muted-foreground">({program.ageRange})</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2 pb-4">
                          <p className="text-sm">{program.shortDescription}</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>{program.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-primary" />
                              <span>{program.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span>{program.location}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm">{program.fullDescription}</p>
                          
                          {program.additionalInfo && (
                            <div className="mt-4 space-y-4">
                              <div className="space-y-2">
                                <h4 className="font-medium">Associated Skills:</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {program.additionalInfo.skills.map((skill, index) => (
                                    <li key={index} className="text-sm">{skill}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="bg-muted/30 p-4 rounded-md">
                                <h4 className="font-medium mb-2">Program Details:</h4>
                                <div className="space-y-2 text-sm">
                                  <p><span className="font-medium">WHEN?</span> {program.date}: {program.time}</p>
                                  <p>{program.additionalInfo.dates}</p>
                                  <p className="mt-2"><span className="font-medium">WHERE?</span> {program.location} <Link href="https://www.themeridianschool.com" target="_blank" className="ml-1 text-primary hover:underline">(School Website)</Link></p>
                                  <div className="mt-2">
                                    <p className="font-medium">HOW MUCH?</p>
                                    <p>{program.additionalInfo.cost}</p>
                                    <p>{program.additionalInfo.includes}</p>
                                    <p className="italic">{program.additionalInfo.notes}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="pt-4">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="lg" className="bg-primary hover:bg-primary/90">Sign Up Now</Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
                                    <DialogHeader>
                                      <DialogTitle className="text-xl font-bold">Meridian STEM Club Registration</DialogTitle>
                                      <DialogDescription className="text-muted-foreground">
                                        Complete the form below to register for the Meridian STEM Club program.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="mt-4 bg-background rounded-md">
                                      <iframe 
                                        src="https://docs.google.com/forms/d/e/1FAIpQLSc9Etg30wl28S3aW7vTpde53FDFhzOfmohsrHWImBB558U9ow/viewform?embedded=true" 
                                        width="100%" 
                                        height="600" 
                                        className="border-0 rounded-md"
                                        title="Meridian STEM Club Sign Up Form"
                                      >
                                        Loading...
                                      </iframe>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="text-center mt-8 p-6 border rounded-lg border-dashed">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-medium">More Programs Coming Soon</h3>
                    <p className="text-muted-foreground">
                      We're currently expanding our STEM club offerings. Check back for updates on additional locations and programs!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 bg-muted/30 p-8 rounded-lg max-w-3xl mx-auto">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Bring STEM Clubs to Your School</h2>
                <p className="text-muted-foreground">
                  We partner with schools to provide engaging after-school STEM programming. 
                  Our turnkey solution includes curriculum, materials, and trained instructors.
                </p>
                <Button className="mt-4" size="lg">
                  Request More Information
                </Button>
              </div>
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
