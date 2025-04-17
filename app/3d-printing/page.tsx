"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  PrinterIcon as Printer3d,
  CheckCircle2,
  Info,
  FileText,
  Clock,
  Truck,
  CreditCard,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ThreeDPrintingPage() {
  const [formStep, setFormStep] = useState(1)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleNextStep = () => {
    setFormStep(formStep + 1)
    window.scrollTo(0, 0)
  }

  const handlePrevStep = () => {
    setFormStep(formStep - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In the future, this would connect to a Google Sheet
    setFormSubmitted(true)
    window.scrollTo(0, 0)
  }

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
              <div className="flex items-center gap-2">
                <Printer3d className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">3D Printing Service</h1>
              </div>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Custom 3D printing for educational projects, prototypes, and classroom materials.
              </p>
              <Separator className="my-4" />
            </div>

            <div className="max-w-4xl mx-auto my-8 bg-primary/5 rounded-lg border border-primary/20 overflow-hidden">
              <div className="grid md:grid-cols-[2fr_1fr] gap-6">
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-primary mb-3">Making an Impact</h2>
                  <p className="text-lg mb-4">
                    <span className="font-semibold">100% of proceeds</span> from our 3D printing service go directly to
                    funding STEM programs for underserved communities.
                  </p>
                  <p className="text-muted-foreground">
                    By ordering with us, you're not just getting high-quality 3D prints – you're helping provide
                    technology access, educational resources, and hands-on learning opportunities to students who need
                    it most. Together, we can bridge the digital divide and inspire the next generation of innovators.
                  </p>
                </div>
                <div className="bg-primary/10 flex items-center justify-center p-6 md:p-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-primary rounded-full mb-4">
                      <Users className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Commitment</h3>
                    <p className="text-sm text-muted-foreground">
                      Supporting equitable access to STEM education and technology resources in our community.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {formSubmitted ? (
              <div className="max-w-3xl mx-auto my-12">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <AlertTitle className="text-green-800 text-lg font-semibold">
                    Order Submitted Successfully!
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    Thank you for your 3D printing order. We've received your request and will review it shortly. You'll
                    receive a confirmation email with details about your order.
                  </AlertDescription>
                </Alert>

                <div className="mt-8 text-center">
                  <Button
                    onClick={() => {
                      setFormSubmitted(false)
                      setFormStep(1)
                    }}
                    className="mr-4"
                  >
                    Submit Another Order
                  </Button>
                  <Link href="/">
                    <Button variant="outline">Return to Homepage</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-[1fr_350px] gap-8 mt-8">
                <div>
                  <div className="flex items-center mb-8">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${formStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} mr-2`}
                    >
                      1
                    </div>
                    <div className={`h-1 w-12 ${formStep >= 2 ? "bg-primary" : "bg-muted"} mx-2`}></div>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${formStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} mr-2`}
                    >
                      2
                    </div>
                    <div className={`h-1 w-12 ${formStep >= 3 ? "bg-primary" : "bg-muted"} mx-2`}></div>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${formStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                      3
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {formStep === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Contact Information</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="Enter your first name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Enter your last name" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" placeholder="you@example.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="organization">Organization/School (if applicable)</Label>
                          <Input id="organization" placeholder="Enter your organization or school" />
                        </div>

                        <div className="pt-4 flex justify-end">
                          <Button type="button" onClick={handleNextStep}>
                            Continue to Project Details
                          </Button>
                        </div>
                      </div>
                    )}

                    {formStep === 2 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Project Details</h2>

                        <div className="space-y-2">
                          <Label htmlFor="projectName">Project Name</Label>
                          <Input id="projectName" placeholder="Enter a name for your project" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="projectDescription">Project Description</Label>
                          <Textarea
                            id="projectDescription"
                            placeholder="Describe your project and its purpose"
                            className="min-h-[120px]"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Do you have a 3D model file?</Label>
                          <RadioGroup defaultValue="yes" className="flex flex-col space-y-1">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="hasFile-yes" />
                              <Label htmlFor="hasFile-yes">Yes, I have a 3D model file ready to upload</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="hasFile-no" />
                              <Label htmlFor="hasFile-no">No, I need help creating a 3D model</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="fileFormat">File Format (if you have a model)</Label>
                          <Select>
                            <SelectTrigger id="fileFormat">
                              <SelectValue placeholder="Select file format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="stl">STL</SelectItem>
                              <SelectItem value="obj">OBJ</SelectItem>
                              <SelectItem value="3mf">3MF</SelectItem>
                              <SelectItem value="step">STEP</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-sm text-muted-foreground">
                            You'll be able to upload your file after submitting this form.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="quantity">Quantity Needed</Label>
                          <Input id="quantity" type="number" min="1" defaultValue="1" required />
                        </div>

                        <div className="pt-4 flex justify-between">
                          <Button type="button" variant="outline" onClick={handlePrevStep}>
                            Back
                          </Button>
                          <Button type="button" onClick={handleNextStep}>
                            Continue to Printing Specifications
                          </Button>
                        </div>
                      </div>
                    )}

                    {formStep === 3 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Printing Specifications</h2>

                        <div className="space-y-2">
                          <Label htmlFor="material">Material</Label>
                          <Select>
                            <SelectTrigger id="material">
                              <SelectValue placeholder="Select material" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pla">PLA (Standard)</SelectItem>
                              <SelectItem value="abs">ABS</SelectItem>
                              <SelectItem value="petg">PETG</SelectItem>
                              <SelectItem value="tpu">TPU (Flexible)</SelectItem>
                              <SelectItem value="other">Other (specify in notes)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="color">Color Preference</Label>
                          <Input id="color" placeholder="e.g., Red, Blue, Black, etc." />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="size">Approximate Size (dimensions)</Label>
                          <Input id="size" placeholder="e.g., 10cm x 5cm x 3cm" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="infill">Infill Density</Label>
                          <Select defaultValue="medium">
                            <SelectTrigger id="infill">
                              <SelectValue placeholder="Select infill density" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low (10-20%) - Faster, lighter, less strong</SelectItem>
                              <SelectItem value="medium">Medium (30-50%) - Balanced strength/material usage</SelectItem>
                              <SelectItem value="high">High (60-80%) - Stronger, heavier, more material</SelectItem>
                              <SelectItem value="solid">Solid (90-100%) - Maximum strength</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="resolution">Print Resolution</Label>
                            <Badge variant="outline">Affects print time & quality</Badge>
                          </div>
                          <Select defaultValue="medium">
                            <SelectTrigger id="resolution">
                              <SelectValue placeholder="Select print resolution" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft (0.3mm layer height) - Fastest</SelectItem>
                              <SelectItem value="medium">Medium (0.2mm layer height) - Standard</SelectItem>
                              <SelectItem value="fine">Fine (0.1mm layer height) - Detailed</SelectItem>
                              <SelectItem value="ultrafine">
                                Ultra Fine (0.05mm layer height) - Most detailed
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="deadline">Deadline</Label>
                          <Input id="deadline" type="date" />
                          <p className="text-sm text-muted-foreground">When do you need this project completed by?</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Additional Notes or Requirements</Label>
                          <Textarea
                            id="notes"
                            placeholder="Any special instructions or details we should know about your project"
                            className="min-h-[100px]"
                          />
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                          <Switch id="educational" />
                          <Label htmlFor="educational">This is for an educational project</Label>
                        </div>

                        <Alert className="bg-blue-50 border-blue-200">
                          <Info className="h-4 w-4 text-blue-600" />
                          <AlertDescription className="text-blue-700">
                            After submitting this form, you'll receive instructions for uploading your 3D model file and
                            payment details.
                          </AlertDescription>
                        </Alert>

                        <div className="pt-4 flex justify-between">
                          <Button type="button" variant="outline" onClick={handlePrevStep}>
                            Back
                          </Button>
                          <Button type="submit">Submit Order Request</Button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>3D Printing Service</CardTitle>
                      <CardDescription>Educational & Prototype Printing</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Custom Projects</h3>
                          <p className="text-sm text-muted-foreground">
                            From classroom manipulatives to engineering prototypes, we can print your custom designs.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Turnaround Time</h3>
                          <p className="text-sm text-muted-foreground">
                            Standard orders typically take 3-5 business days. Rush service available upon request.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Truck className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Delivery Options</h3>
                          <p className="text-sm text-muted-foreground">
                            Local pickup or shipping available. Educational institutions receive free delivery.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Educational Pricing</h3>
                          <p className="text-sm text-muted-foreground">
                            Special rates for schools, teachers, and educational projects.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Materials Available</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="pla">
                        <TabsList className="grid grid-cols-4 mb-4">
                          <TabsTrigger value="pla">PLA</TabsTrigger>
                          <TabsTrigger value="abs">ABS</TabsTrigger>
                          <TabsTrigger value="petg">PETG</TabsTrigger>
                          <TabsTrigger value="tpu">TPU</TabsTrigger>
                        </TabsList>
                        <TabsContent value="pla" className="space-y-2">
                          <h3 className="font-medium">PLA (Polylactic Acid)</h3>
                          <p className="text-sm text-muted-foreground">
                            Biodegradable, easy to print, and available in many colors. Ideal for most educational
                            projects.
                          </p>
                          <Badge className="mt-2">Most Popular</Badge>
                        </TabsContent>
                        <TabsContent value="abs" className="space-y-2">
                          <h3 className="font-medium">ABS (Acrylonitrile Butadiene Styrene)</h3>
                          <p className="text-sm text-muted-foreground">
                            Durable and heat-resistant. Good for functional parts that need to withstand higher
                            temperatures.
                          </p>
                        </TabsContent>
                        <TabsContent value="petg" className="space-y-2">
                          <h3 className="font-medium">PETG (Polyethylene Terephthalate Glycol)</h3>
                          <p className="text-sm text-muted-foreground">
                            Strong, flexible, and food-safe. Great for water-tight containers and durable parts.
                          </p>
                        </TabsContent>
                        <TabsContent value="tpu" className="space-y-2">
                          <h3 className="font-medium">TPU (Thermoplastic Polyurethane)</h3>
                          <p className="text-sm text-muted-foreground">
                            Flexible and rubber-like. Perfect for projects requiring bendable or soft components.
                          </p>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
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
