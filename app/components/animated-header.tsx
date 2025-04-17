"use client"

import Link from "next/link"
import Image from "next/image"
import { FlaskRoundIcon as Flask } from "lucide-react"
import { motion } from "framer-motion"
import { useIsMobile } from "@/app/hooks/use-media-query"
import { usePathname } from "next/navigation"

export function AnimatedHeader() {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  // Animation variants for staggered text animation
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
  }

  // Animation variants for navigation items
  const navItemVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 0.5 + i * 0.1,
      },
    }),
  }

  // Logo text split into individual letters for animation
  const logoText = "CRACH.AD"
  const navItems = [
    { name: "Insights", href: "/insights" },
    { name: "Content", href: "/content" },
    { name: "Workshops", href: "/workshops" },
    { name: isMobile ? "Collab" : "Collaborators", href: "/collaborators" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}>
            <Flask className="h-6 w-6" />
          </motion.div>
          <div className="flex">
            {logoText.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </Link>
        <nav className="ml-auto flex gap-2 sm:gap-4 md:gap-6">
          {navItems.map((item, i) => (
            <motion.div key={item.name} custom={i} variants={navItemVariants} initial="hidden" animate="visible">
              <Link href={item.href} className="text-xs sm:text-sm font-medium hover:underline underline-offset-4">
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>
        <motion.div
          className="ml-2 sm:ml-4"
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 1.5,
            repeatDelay: 2,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Image
            src="/images/headshot.jpg"
            alt="Profile Photo"
            width={32}
            height={32}
            className="rounded-full border-2 border-muted-foreground/20"
          />
        </motion.div>
      </div>
    </header>
  )
}
