"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, ChevronRight } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      style={{
        background: "black",
        padding: "7rem 1.5rem 10rem",
      }}
    >
      <div
        style={{
          maxWidth: "48rem",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <motion.span
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="section-badge"
        >
          Begin
        </motion.span>

        <motion.h2
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontSize: "clamp(2.75rem, 7vw, 4.75rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: "white",
            margin: "0 0 1.5rem",
          }}
        >
          Let's build something
          <br />students will remember.
        </motion.h2>

        <motion.p
          custom={2}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: "1.05rem",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.70)",
            maxWidth: "28rem",
            margin: "0 auto 2.5rem",
          }}
        >
          Book a call to talk workshops, curriculum, or a speaking engagement —
          or browse what I've been working on.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/collaborators"
            className="liquid-glass-strong"
            style={{
              borderRadius: 9999,
              padding: "0.9rem 2rem",
              color: "white",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
              fontFamily: "'Barlow', sans-serif",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            Book a Call
            <ArrowUpRight style={{ width: "1rem", height: "1rem" }} />
          </Link>
          <Link
            href="/projects"
            className="liquid-glass"
            style={{
              borderRadius: 9999,
              padding: "0.9rem 2rem",
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 300,
              fontFamily: "'Barlow', sans-serif",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            View Projects
            <ChevronRight style={{ width: "1rem", height: "1rem" }} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
