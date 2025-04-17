"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function FramerAnimatedLogo() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  // Animation variants for the logo text
  const logoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  // Animation variants for each letter
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  }

  const logoText = "CRACH.AD"

  return (
    <Link href="/">
      <motion.div className="flex items-center space-x-2" initial="hidden" animate="visible" variants={logoVariants}>
        <div className="flex items-center">
          <motion.div
            whileHover={{
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 },
            }}
          >
            {isHome ? (
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.67004 18.9501L7.60004 15.6401C8.39004 15.1101 9.53004 15.1701 10.24 15.7801L10.57 16.0701C11.35 16.7401 12.61 16.7401 13.39 16.0701L17.55 12.5001C18.33 11.8301 19.59 11.8301 20.37 12.5001L22 13.9001"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 22.75H8C3.57 22.75 1.25 20.43 1.25 16V8C1.25 3.57 3.57 1.25 8 1.25H16C20.43 1.25 22.75 3.57 22.75 8V16C22.75 20.43 20.43 22.75 16 22.75ZM8 2.75C4.42 2.75 2.75 4.42 2.75 8V16C2.75 19.58 4.42 21.25 8 21.25H16C19.58 21.25 21.25 19.58 21.25 16V8C21.25 4.42 19.58 2.75 16 2.75H8Z"
                  fill="currentColor"
                />
                <path
                  d="M9 10.75C7.48 10.75 6.25 9.52 6.25 8C6.25 6.48 7.48 5.25 9 5.25C10.52 5.25 11.75 6.48 11.75 8C11.75 9.52 10.52 10.75 9 10.75ZM9 6.75C8.31 6.75 7.75 7.31 7.75 8C7.75 8.69 8.31 9.25 9 9.25C9.69 9.25 10.25 8.69 10.25 8C10.25 7.31 9.69 6.75 9 6.75Z"
                  fill="currentColor"
                />
                <path
                  d="M20.41 21.12C20.14 21.12 19.87 21.01 19.66 20.8L17.11 18.25C16.69 17.83 16.69 17.15 17.11 16.73C17.53 16.31 18.21 16.31 18.63 16.73L20.41 18.51L20.4 18.5C20.82 18.92 20.82 19.6 20.4 20.02C20.19 20.23 19.92 20.34 19.65 20.34C19.38 20.34 19.11 20.23 18.9 20.02L18.91 20.03L17.13 18.25C16.71 17.83 16.71 17.15 17.13 16.73C17.55 16.31 18.23 16.31 18.65 16.73L20.43 18.51L20.42 18.5C20.84 18.92 20.84 19.6 20.42 20.02C20.21 20.23 19.94 20.34 19.67 20.34C19.4 20.34 19.13 20.23 18.92 20.02L18.93 20.03L17.15 18.25C16.73 17.83 16.73 17.15 17.15 16.73C17.57 16.31 18.25 16.31 18.67 16.73L20.41 18.47C20.62 18.68 20.73 18.95 20.73 19.22C20.73 19.49 20.62 19.76 20.41 19.97C20.2 20.18 19.93 20.29 19.66 20.29C19.39 20.29 19.12 20.18 18.91 19.97L18.92 19.98L17.14 18.2C16.72 17.78 16.72 17.1 17.14 16.68C17.56 16.26 18.24 16.26 18.66 16.68L20.41 18.43C20.83 18.85 20.83 19.53 20.41 19.95C20.2 21.01 19.93 21.12 19.66 21.12H20.41V21.12Z"
                  fill="currentColor"
                />
                <path
                  d="M2.67 19.7C2.41 19.7 2.15 19.59 1.96 19.4C1.77 19.21 1.66 18.95 1.66 18.69C1.66 18.43 1.77 18.17 1.96 17.98L6.89 13.05C7.29 12.65 7.82 12.42 8.39 12.42C8.96 12.42 9.5 12.65 9.89 13.05L10.23 13.39C10.62 13.78 11.29 13.78 11.68 13.39L15.84 9.23C16.64 8.43 17.94 8.43 18.74 9.23L21.98 12.47C22.37 12.86 22.37 13.51 21.98 13.9C21.59 14.29 20.94 14.29 20.55 13.9L17.31 10.66C17.12 10.47 16.81 10.47 16.62 10.66L12.46 14.82C11.66 15.62 10.36 15.62 9.56 14.82L9.22 14.48C9.03 14.29 8.72 14.29 8.53 14.48L3.6 19.41C3.19 19.59 2.93 19.7 2.67 19.7Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </motion.div>
          <div className="ml-2">
            {logoText.split("").map((letter, index) => (
              <motion.span key={index} variants={letterVariants} className="text-2xl font-bold inline-block">
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
