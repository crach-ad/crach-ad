"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BookOpen, Users, Mic, Laptop } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

const CARDS = [
  {
    icon: BookOpen,
    title: "Insights",
    href: "/insights",
    copy: "Research, essays, and frameworks on STEM education and the future of learning.",
  },
  {
    icon: Users,
    title: "Workshops",
    href: "/workshops",
    copy: "Hands-on programs for students and educators — coding, CAD, design thinking, and more.",
  },
  {
    icon: Mic,
    title: "Public Speaking",
    href: "/public-speaking",
    copy: "Talks on AI, education, and innovation at summits, schools, and community events.",
  },
  {
    icon: Laptop,
    title: "Software Projects",
    href: "/software-projects",
    copy: "Original tools built to solve real educational problems — from biometrics to gamified learning.",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      style={{
        background: "black",
        padding: "7rem 1.5rem 9rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src="/images/teacher-training-illustration.png"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.35,
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
          background: "rgba(0,0,0,0.55)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "56rem",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.span
            custom={0}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="section-badge"
          >
            What I Do
          </motion.span>
          <motion.h2
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(2.25rem, 5.2vw, 3.75rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "white",
              margin: 0,
            }}
          >
            Built with curiosity
            <br />and craft in balance.
          </motion.h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
            maxWidth: "48rem",
            margin: "0 auto",
          }}
        >
          {CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                custom={i + 2}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <Link
                  href={card.href}
                  style={{
                    display: "block",
                    position: "relative",
                    borderRadius: "1.5rem",
                    padding: "1.75rem",
                    overflow: "hidden",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.08) inset, 0 20px 60px rgba(0,0,0,0.5)",
                    color: "white",
                    textDecoration: "none",
                    minHeight: 200,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "1.5rem",
                      right: "1.5rem",
                      height: 1,
                      background:
                        "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "1.25rem",
                      right: "1.5rem",
                      fontFamily: "'Barlow', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.20)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    style={{
                      width: "2.75rem",
                      height: "2.75rem",
                      borderRadius: "0.9rem",
                      marginBottom: "1.25rem",
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))",
                      border: "1px solid rgba(255,255,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.80)",
                    }}
                  >
                    <Icon style={{ width: "1.15rem", height: "1.15rem" }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontWeight: 500,
                      fontStyle: "normal",
                      fontSize: "0.95rem",
                      color: "white",
                      letterSpacing: "-0.01em",
                      margin: "0 0 0.6rem",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.85rem",
                      lineHeight: 1.55,
                      color: "rgba(255,255,255,0.50)",
                      margin: 0,
                    }}
                  >
                    {card.copy}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
