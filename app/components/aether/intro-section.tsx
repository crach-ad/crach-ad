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

const PARTNERS = [
  "Meridian School",
  "HEALinc",
  "EdVolution",
  "Bahamas Business Outlook",
  "Tinkercad",
  "Stingray",
]

export function IntroSection() {
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
      <img
        src="/images/stem-club-pic.jpeg"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, black 0%, transparent 18%, transparent 82%, black 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 3,
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
          Trusted by schools and programs
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
          Learning that feels like
          <br />a world, not a worksheet.
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
            color: "rgba(255,255,255,0.72)",
            maxWidth: "34rem",
            margin: "0 auto 4rem",
          }}
        >
          Programs designed around curious minds — hands-on, research-backed,
          and built to translate between the classroom and the real world.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: "0.78rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.42)",
          }}
        >
          {PARTNERS.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
