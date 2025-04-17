import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ResearchPage() {
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Research Articles</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                My published research on STEM education, technology integration, and educational innovation.
              </p>
              <Separator className="my-4" />
            </div>
            <div className="grid gap-6 pt-6 lg:grid-cols-2 xl:grid-cols-3">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle>MAKER Simple: Making Activities to Expose Middle School Girls to STEM Careers</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Published: 2023</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This paper presents a framework for engaging middle school girls in STEM through accessible maker
                    activities, addressing the gender gap in STEM fields and providing practical implementation
                    strategies.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>Published in Academia.edu</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/research/maker-simple">
                    <Button variant="default" size="sm">
                      Read Paper
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Integrating Computational Thinking in K-12 STEM Education</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Published: March 2024</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This paper explores effective strategies for integrating computational thinking across STEM subjects
                    in K-12 education, with case studies and practical implementation guidelines.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>Co-authors: Dr. Jane Smith, Dr. Robert Johnson</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/research/computational-thinking">
                    <Button variant="outline" size="sm">
                      Read Paper
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>The Impact of Educational Robotics on Student Engagement</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Published: November 2023</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A quantitative study measuring the impact of robotics-based learning activities on student
                    engagement and achievement in STEM subjects across diverse educational settings.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>Co-authors: Dr. Michael Chen, Sarah Williams</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/research/educational-robotics">
                    <Button variant="outline" size="sm">
                      Read Paper
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Designing Accessible STEM Learning Environments</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Published: August 2023</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This research presents guidelines for creating inclusive STEM learning environments that accommodate
                    diverse learning needs and abilities.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>Co-authors: Dr. Emily Rodriguez, Dr. David Kim</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/research/accessible-learning">
                    <Button variant="outline" size="sm">
                      Read Paper
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Evaluating Technology Integration Models in Higher Education</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Published: May 2023</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A comparative analysis of different technology integration frameworks and their effectiveness in
                    higher education STEM programs.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>Co-authors: Dr. Thomas Wilson, Dr. Lisa Park</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/research/technology-integration">
                    <Button variant="outline" size="sm">
                      Read Paper
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Project-Based Learning in Virtual Environments</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Published: February 2023</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This study examines the effectiveness of project-based learning approaches in virtual and hybrid
                    STEM education environments.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>Co-authors: Dr. Amanda Lee, Dr. John Martinez</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/research/project-based-learning">
                    <Button variant="outline" size="sm">
                      Read Paper
                    </Button>
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
