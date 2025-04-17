import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  ExternalLink,
  FileText,
  Layers,
  Lightbulb,
  Cpu,
  Laptop,
  Code,
  Monitor,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CurriculumProjectPage() {
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
                <Badge variant="outline">Curriculum</Badge>
                <Badge variant="outline">3D Modeling</Badge>
                <Badge variant="outline">Circuit Design</Badge>
                <Badge variant="outline">PCB Fabrication</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">STEM Curriculum Framework</h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive Training in 3D Modeling, Circuit Design, Simulation, and Fabrication
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://stemclub.advancedfunctions.co/certificates.html?181238"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Certificates
                </Button>
              </a>
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Download Curriculum
              </Button>
            </div>
            <Separator className="my-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <Image
                src="/images/curriculum-framework.png"
                width={600}
                height={400}
                alt="STEM Curriculum Framework"
                className="rounded-lg border"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Hands-On Technical Education</h2>
              <p>
                The STEM Curriculum Framework provides a comprehensive approach to teaching technical skills through
                hands-on projects that integrate 3D modeling, circuit design, simulation, and fabrication. This
                curriculum bridges the gap between theoretical knowledge and practical application, preparing students
                for real-world engineering challenges.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Industry-Standard Tools:</span> Students learn professional software
                    including Tinkercad, Inkscape, and Fritzing.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Complete Design Workflow:</span> From concept to fabrication, students
                    experience the entire product development process.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Global Manufacturing Experience:</span> Students gain practical
                    knowledge by fabricating their designs with international manufacturing partners.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Verified Certification:</span> Students receive certificates
                    documenting their acquired skills and completed projects.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Learning Platform</h2>
            <div className="bg-blue-50 rounded-lg overflow-hidden border border-blue-200">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2">
                    <Image
                      src="/images/curriculum-dashboard.png"
                      width={600}
                      height={400}
                      alt="crach.learn Dashboard"
                      className="rounded-lg border shadow-md"
                    />
                  </div>
                  <div className="md:w-1/2 space-y-4">
                    <h3 className="text-xl font-semibold text-blue-800">Set Sail on Your Learning Adventure</h3>
                    <p className="text-blue-700">
                      Our gamified learning platform transforms technical education into an exciting journey. Students
                      earn badges, track progress, and unlock achievements as they master new skills.
                    </p>
                    <div className="flex items-center gap-2 text-blue-700">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <p>Earn badges for completed skills and modules</p>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700">
                      <Layers className="h-5 w-5 text-blue-500" />
                      <p>Progress through structured learning modules</p>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700">
                      <Lightbulb className="h-5 w-5 text-red-500" />
                      <p>Complete hands-on activities and challenges</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Curriculum Content</h2>
            <p className="mb-6">
              Our comprehensive curriculum guides students through a complete learning journey from basic concepts to
              advanced fabrication techniques. Each module builds upon previous knowledge, creating a seamless
              progression of skills.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Laptop className="h-5 w-5 text-primary" />
                    Platform Introduction
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 space-y-3 text-muted-foreground">
                    <p>
                      Welcome to Your Learning Platform! When you finish courses here, you get a certificate. This
                      certificate shows what you've done, and people can see your work by scanning the QR code on it.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Making Your Profile: Create your profile with a photo and description</li>
                      <li>Looking at Lessons: Navigate through lesson plans and resources</li>
                      <li>Checking Attendance and Grades: Track your progress</li>
                      <li>Submitting Your Work: Upload and share your completed projects</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    3D Modeling Fundamentals
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 space-y-3 text-muted-foreground">
                    <p>
                      Master the essential skills of 3D modeling using industry-standard tools. Students learn to
                      create, manipulate, and prepare 3D models for fabrication.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Dimensioning: Setting precise measurements for 3D objects</li>
                      <li>Grouping: Combining shapes to create complex models</li>
                      <li>Aligning: Positioning objects with precision</li>
                      <li>Positioning: Placing objects in 3D space</li>
                      <li>Custom Fonts and Shapes: Importing and creating custom designs</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-primary" />
                    Electronics and Circuit Design
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 space-y-3 text-muted-foreground">
                    <p>
                      Learn the fundamentals of electronics and circuit design through hands-on projects and
                      simulations.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Lighting an LED: Basic circuit construction</li>
                      <li>Conductors and Insulators: Understanding electrical properties</li>
                      <li>Using a Protoboard: Prototyping circuits without soldering</li>
                      <li>Color Coding Wires: Industry standard practices</li>
                      <li>Digital Output: Programming microcontrollers</li>
                      <li>Powering a Breadboard: Creating power distribution</li>
                      <li>Blinking an LED: Introduction to programming</li>
                      <li>Using a Slide Switch: Implementing user controls</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-primary" />
                    PCB Design and Fabrication
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 space-y-3 text-muted-foreground">
                    <p>
                      Take circuit designs from concept to physical product through professional PCB design and
                      manufacturing processes.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Making a PCB: Introduction to PCB design software</li>
                      <li>Creating PCB Traces: Designing electrical connections</li>
                      <li>PCB Body and Face Conversion: Preparing designs for manufacturing</li>
                      <li>Adding Face and Body in Fritzing: Creating custom PCB shapes</li>
                      <li>Sending Files for Manufacturing: Working with fabrication services</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Final Project: Ornament Creation
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 space-y-3 text-muted-foreground">
                    <p>
                      Apply all learned skills in a comprehensive final project that combines 3D design, electronics,
                      and PCB fabrication.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Creating the Ornament Body: Designing the physical structure</li>
                      <li>Adding Text to the Body: Incorporating custom text and graphics</li>
                      <li>Integrating Electronics: Adding LEDs and switches</li>
                      <li>Manufacturing and Assembly: Producing the final product</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <Tabs defaultValue="curriculum" className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="curriculum">Curriculum Structure</TabsTrigger>
              <TabsTrigger value="tools">Tools & Technologies</TabsTrigger>
              <TabsTrigger value="outcomes">Learning Outcomes</TabsTrigger>
            </TabsList>
            <TabsContent value="curriculum" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Layers className="h-8 w-8 text-primary" />
                      <h3 className="text-xl font-semibold">3D Modeling Fundamentals</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Introduction to 3D design principles
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Creating parametric models in Tinkercad
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Designing for manufacturability
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Exporting designs for fabrication
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Cpu className="h-8 w-8 text-primary" />
                      <h3 className="text-xl font-semibold">Circuit Design & Simulation</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Electronic components and circuit theory
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Creating virtual circuits in Tinkercad
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Testing and debugging through simulation
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Optimizing designs for performance
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Lightbulb className="h-8 w-8 text-primary" />
                      <h3 className="text-xl font-semibold">PCB Design & Preparation</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Converting circuit designs to PCB layouts
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Using Inkscape for file adjustments
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Working with Fritzing for PCB design
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Generating Gerber files for manufacturing
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Award className="h-8 w-8 text-primary" />
                      <h3 className="text-xl font-semibold">Fabrication & Certification</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Preparing files for international fabrication
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Understanding manufacturing specifications
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Quality control and testing
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        Final project submission and certification
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="tools" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">Tinkercad</h3>
                    <Image
                      src="/placeholder.svg?height=150&width=300"
                      width={300}
                      height={150}
                      alt="Tinkercad Software"
                      className="rounded-md"
                    />
                    <p className="text-muted-foreground">
                      An accessible yet powerful browser-based 3D design and circuit simulation platform. Students use
                      Tinkercad for both 3D modeling and initial circuit prototyping.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">Inkscape</h3>
                    <Image
                      src="/placeholder.svg?height=150&width=300"
                      width={300}
                      height={150}
                      alt="Inkscape Software"
                      className="rounded-md"
                    />
                    <p className="text-muted-foreground">
                      A professional vector graphics editor used to adjust and prepare files for PCB design. Students
                      learn file format conversion and design optimization.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">Fritzing</h3>
                    <Image
                      src="/placeholder.svg?height=150&width=300"
                      width={300}
                      height={150}
                      alt="Fritzing Software"
                      className="rounded-md"
                    />
                    <p className="text-muted-foreground">
                      An electronics design tool that bridges the gap between breadboard prototyping and PCB production.
                      Students use Fritzing to generate Gerber files for manufacturing.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="outcomes" className="mt-6 space-y-4">
              <p>Upon completion of the STEM Curriculum Framework, students will have demonstrated proficiency in:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">3D Design Competency:</span> Creating functional 3D models with
                    parametric design principles and manufacturing constraints in mind.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Circuit Design Skills:</span> Designing, simulating, and
                    troubleshooting electronic circuits with an understanding of component functionality and system
                    integration.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">PCB Layout Expertise:</span> Converting circuit designs into
                    manufacturable PCB layouts with proper component placement, trace routing, and design rule
                    compliance.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Manufacturing Workflow Knowledge:</span> Understanding the complete
                    product development cycle from concept to fabrication, including international manufacturing
                    considerations.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Professional Software Proficiency:</span> Competent use of
                    industry-relevant software tools including Tinkercad, Inkscape, and Fritzing.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Project Management:</span> Successfully managing a complex technical
                    project from initial design through to final production.
                  </p>
                </li>
              </ul>
            </TabsContent>
          </Tabs>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Certification Process</h2>
            <div className="bg-muted p-6 rounded-lg">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    width={300}
                    height={300}
                    alt="STEM Certificate Example"
                    className="rounded-md border"
                  />
                </div>
                <div className="md:w-2/3 space-y-4">
                  <h3 className="text-xl font-semibold">Verified Skills Certification</h3>
                  <p>
                    Upon successful completion of the curriculum, students receive a detailed certificate documenting
                    their acquired skills and completed projects. Each certificate verifies that the student has:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      Demonstrated proficiency in 3D modeling using Tinkercad
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      Created and simulated electronic circuits
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      Used Inkscape to prepare files for PCB design
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      Generated Gerber files using Fritzing for PCB fabrication
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      Completed the full manufacturing workflow including international fabrication
                    </li>
                  </ul>
                  <p className="mt-4">
                    <a
                      href="https://stemclub.advancedfunctions.co/certificateTemplate.html?181238"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View sample certificate →
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6">
              <Button size="lg">Let's talk curriculum!</Button>
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
