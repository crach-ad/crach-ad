"use client"

import { Button } from "@/components/ui/button"
import { Instagram } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function InstagramEmbed({ username = "crach.stem" }: { username?: string }) {
  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-sm">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <Instagram className="h-8 w-8 mx-auto text-pink-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Instagram</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Check out my latest STEM projects and classroom activities
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <a href={`https://www.instagram.com/${username}/`} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="gap-2">
              <Instagram className="h-4 w-4" />@{username}
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}
