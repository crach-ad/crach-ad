"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { FramerAnimatedLogo } from "./framer-animated-logo"

export function FramerAnimatedHeader() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Insights", href: "/insights" },
    { name: "Content", href: "/content" },
    { name: "Workshops", href: "/workshops" },
    { name: "Research", href: "/research" },
    { name: "Collaborators", href: "/collaborators" },
    { name: "3D Printing", href: "/3d-printing" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <FramerAnimatedLogo />

        <nav className="flex items-center space-x-4 text-sm font-medium">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 * index,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={item.href}
                  className={`transition-colors hover:text-foreground/80 ${isActive ? "font-bold text-primary" : ""}`}
                >
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 z-[-1]"
                      layoutId="navbar-active-item"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  {item.name}
                </Link>
              </motion.div>
            )
          })}

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
              repeatDelay: 3,
            }}
          >
            <Image
              src="/images/headshot.jpg"
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full border-2 border-gray-200"
            />
          </motion.div>
        </nav>
      </div>
    </header>
  )
}
