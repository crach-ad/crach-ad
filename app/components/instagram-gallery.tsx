"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

// This is a placeholder for what would be actual Instagram data
// In a real implementation, you would fetch this from Instagram's API
type InstagramPost = {
  id: string
  imageUrl: string
  caption: string
  permalink: string
}

export function InstagramGallery({ username = "crach.stem" }: { username?: string }) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // For this demo, we'll use placeholder data
    const placeholderPosts: InstagramPost[] = Array.from({ length: 8 }, (_, i) => ({
      id: `post-${i}`,
      imageUrl: `/placeholder.svg?height=300&width=300`,
      caption: `STEM project example ${i + 1}`,
      permalink: `https://www.instagram.com/p/placeholder-${i}/`,
    }))

    // Simulate API delay
    const timer = setTimeout(() => {
      setPosts(placeholderPosts)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <a
          href={`https://www.instagram.com/${username}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline mt-2 inline-block"
        >
          View on Instagram instead
        </a>
      </div>
    )
  }

  return (
    <div className="mt-16 max-w-5xl mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h3 className="text-2xl font-bold">Project Gallery</h3>
        <div className="flex items-center gap-2">
          <Instagram className="h-5 w-5" />
          <a
            href={`https://www.instagram.com/${username}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @{username}
          </a>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square bg-muted animate-pulse rounded-md"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square overflow-hidden rounded-md relative group"
              >
                <Image
                  src={post.imageUrl || "/placeholder.svg"}
                  width={300}
                  height={300}
                  alt={post.caption}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-sm font-medium px-2 text-center">{post.caption}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <a href={`https://www.instagram.com/${username}/`} target="_blank" rel="noopener noreferrer">
              <Button>
                <Instagram className="h-4 w-4 mr-2" />
                View More on Instagram
              </Button>
            </a>
          </div>
        </>
      )}
    </div>
  )
}
