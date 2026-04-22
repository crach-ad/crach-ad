"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export function HowItWorksSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      style={{
        background: "black",
        padding: "10rem 1.5rem 14rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.img
        src="/images/healinc-future-health-summit.jpg"
        alt=""
        animate={{
          scale: [1.06, 1.12, 1.06],
          x: ["0%", "-2%", "0%"],
          y: ["0%", "-1.5%", "0%"],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          transformOrigin: "center",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.75) 10%, rgba(0,0,0,0.4) 20%, transparent 38%, transparent 72%, rgba(0,0,0,0.6) 88%, black 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, black 0%, transparent 18%, transparent 82%, black 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.42)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "64rem",
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
          How I Work
        </motion.span>

        <motion.h2
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            color: "white",
            margin: "0 0 1.5rem",
          }}
        >
          You imagine it.
          <br />We build it together.
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
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.72)",
            maxWidth: "36rem",
            margin: "0 auto",
          }}
        >
          From first spark to final showcase, every program is co-designed with
          students, teachers, and the real world in mind.
        </motion.p>
      </div>
    </section>
  )
}
