import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Cpu,
  Code,
  Laptop,
  Braces,
  Brain,
  Box,
  MoveHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "crach.move",
    description: "A biometric analysis system for visualizing and analyzing motion tracking data",
    githubUrl: "https://github.com/crach-ad/crach.move",
    liveUrl: "https://crach-move.vercel.app",
    image: "https://placehold.co/600x400/1f2937/d1d5db?text=crach.move",
    tags: ["Next.js", "TypeScript", "Three.js", "React Three Fiber", "Framer Motion", "TailwindCSS"],
    features: [
      {
        title: "Data Structure",
        description: "Uses motion capture data with timestamps, joint positions, rotations, torques, and reaction forces",
        icon: Box,
      },
      {
        title: "AI Integration",
        description: "AI-powered motion analysis through OpenAI with concise, friendly responses from \"Movo\", the chat assistant",
        icon: Brain,
      },
      {
        title: "Visualization",
        description: "3D rendering using Three.js with smooth animation, interactive controls, and joint analysis",
        icon: MoveHorizontal,
      },
      {
        title: "Custom Data",
        description: "Upload custom JSON motion capture data files with drag-and-drop support for personalized analysis",
        icon: Braces,
      },
    ],
    overview: "crach.move is a biometric analysis system designed to visualize and analyze motion tracking data. The application creates a 3D stick figure animation representing human movement, allowing users to study biomechanics and motion patterns."
  },
  {
    title: "kaiSite – Modern 3D Portfolio Website",
    description: "A visually striking portfolio website with a custom 3D Rotating Gallery, built for creative showcases.",
    githubUrl: "https://github.com/crach-ad/kai-site",
    liveUrl: "https://kai-virid.vercel.app",
    image: "/images/kai-site-portfolio.png",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "lucide-react"],
    features: [
      {
        title: "3D Rotating Carousel",
        description: "Custom React component for an engaging project showcase.",
        icon: Box,
      },
      {
        title: "Modern UI/UX",
        description: "Minimalist design, responsive layout, and interactive navigation.",
        icon: Laptop,
      },
      {
        title: "Optimized Performance",
        description: "Uses Next.js image optimization and SSR/CSR hydration fixes.",
        icon: Cpu,
      },
      {
        title: "Clean Architecture",
        description: "Modular components, clear documentation, and maintainable code.",
        icon: Code,
      },
    ],
    overview: "kaiSite is a visually striking portfolio website built with Next.js 15 and React 19, designed to showcase creative projects in an interactive, modern way. The highlight of the site is a custom-built 3D Rotating Gallery component, which presents portfolio items in a dynamic carousel with smooth transitions and a strong visual hierarchy. The site is fully responsive, leverages Tailwind CSS for styling, and features a clean, modular codebase with best practices in TypeScript."
  },
  {
    title: "Woo To-Do",
    description: "A gamified to-do list app that makes productivity fun with XP and leveling",
    githubUrl: "https://github.com/crach-ad/crachToDo",
    liveUrl: "https://woodagoat.vercel.app/",
    image: "/images/woo-todo.png",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase", "Context API"],
    features: [
      {
        title: "Task Management",
        description: "Create, edit, complete, and delete tasks with intuitive controls and organization options",
        icon: Box,
      },
      {
        title: "Gamification System",
        description: "Gain XP and level up by completing tasks, adding a rewarding game-like experience to productivity",
        icon: Brain,
      },
      {
        title: "Theme Customization",
        description: "Personalize your productivity experience with different visual themes and styles",
        icon: Laptop,
      },
      {
        title: "Real-time Sync",
        description: "Firebase backend enables real-time updates and syncing across multiple devices",
        icon: Cpu,
      },
    ],
    overview: "Woo To-Do transforms the traditional task management experience by adding game mechanics. Users can earn XP and level up by completing tasks, making productivity more engaging and rewarding. Built with Next.js and Firebase, the app features secure authentication, real-time syncing across devices, and customizable themes."
  }
  // Add more projects here in the future
]

/**
 * Software Projects Page
 * Showcases software projects with detailed information about features and technologies used
 */
export default function SoftwareProjectsPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      {/* Page Header */}
      <header className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold sm:text-3xl">Software Projects</h1>
        </div>
        <p className="max-w-[800px] text-muted-foreground md:text-lg">
          Developing custom software solutions for biometric analysis, education, and other applications.
        </p>
      </header>

      {/* Projects List */}
      <section className="grid gap-16">
        {projects.map((project, index) => (
          <div key={project.title} className="grid gap-8 md:grid-cols-[1fr_2fr]">
            {/* Project Image */}
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted md:aspect-square">
              <Image
                src={project.image}
                alt={`${project.title} project screenshot`}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Project Details */}
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h2 className="text-xl font-bold sm:text-2xl">{project.title}</h2>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Github className="h-4 w-4" />
                      GitHub
                    </Button>
                  </Link>
                </div>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              
              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              
              <Separator />
              
              {/* Project Overview */}
              <div className="space-y-4">
                <h3 className="font-semibold">Project Overview</h3>
                <p>{project.overview}</p>
                
                {/* Feature Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.features.map((feature) => {
                    const IconComponent = feature.icon
                    return (
                      <Card key={feature.title}>
                        <CardContent className="p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <IconComponent className="h-5 w-5 text-primary" />
                            <h4 className="font-medium">{feature.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
                
                {/* Project Links */}
                <div className="flex justify-start gap-4 pt-4">
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="gap-2">
                      View Live Project
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2">
                      View Code
                      <Github className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Add separator between projects, but not after the last one */}
            {index < projects.length - 1 && <Separator className="col-span-full my-4" />}
          </div>
        ))}
      </section>
      
      {/* Future Projects Section */}
      <div className="mt-16 text-center">
        <h3 className="mb-4 text-xl font-bold">More Projects Coming Soon</h3>
        <p className="mx-auto max-w-[600px] text-muted-foreground">
          I'm constantly developing new software solutions. Check back soon for more projects or visit my GitHub profile.
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="https://github.com/crach-ad" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              View GitHub Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
