"use client"

import { Button } from "@/components/ui/button"
import { Linkedin } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function LinkedInEmbed() {
  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-sm">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <Linkedin className="h-8 w-8 mx-auto text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Connect with me professionally and see my latest career updates
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <a href="https://www.linkedin.com/in/crachad/" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="gap-2">
              <Linkedin className="h-4 w-4" />
              Crachad Laing
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}
