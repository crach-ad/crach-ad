"use client"

import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Play } from "lucide-react"
import { ParticleCanvas } from "./particle-canvas"
import { ParticleTitle } from "./particle-title"

export function HeroSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 45])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      style={{
        height: "100vh",
        minHeight: 640,
        background: "black",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background layer */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <div
            className="hero-glow ken-burns"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/images/happy-stem-coding.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </motion.div>

        {/* Top sky blend */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40%",
            background:
              "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.20) 28%, transparent 52%)",
          }}
        />

        {/* Ambient light orbs */}
        <motion.div
          animate={{ x: [0, 38, -18, 30, 0], y: [0, -22, 14, -10, 0], opacity: [0.75, 1, 0.8, 1, 0.75] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-8%",
            right: "4%",
            width: 560,
            height: 560,
            background:
              "radial-gradient(circle, rgba(255,215,90,0.42) 0%, rgba(255,150,30,0.14) 40%, transparent 70%)",
            filter: "blur(60px)",
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
        <motion.div
          animate={{ x: [0, 70, -40, 50, 0], y: [0, 18, -12, 8, 0], opacity: [0.55, 0.9, 0.6, 0.88, 0.55] }}
          transition={{ duration: 14, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-6%",
            left: "10%",
            width: 750,
            height: 280,
            background:
              "radial-gradient(ellipse, rgba(120,200,255,0.22) 0%, transparent 70%)",
            filter: "blur(55px)",
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
        <motion.div
          animate={{ x: [-20, 30, -10, 40, -20], y: [0, -28, 10, -18, 0], opacity: [0.5, 0.88, 0.55, 0.9, 0.5] }}
          transition={{ duration: 12, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "-12%",
            left: "15%",
            width: 680,
            height: 420,
            background:
              "radial-gradient(circle, rgba(155,215,100,0.22) 0%, rgba(200,235,80,0.06) 45%, transparent 75%)",
            filter: "blur(65px)",
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
        <motion.div
          animate={{ x: [0, 22, -14, 18, 0], y: [0, -35, 20, -25, 0], opacity: [0.4, 0.72, 0.45, 0.68, 0.4] }}
          transition={{ duration: 16, delay: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "20%",
            left: "-6%",
            width: 380,
            height: 560,
            background:
              "radial-gradient(circle, rgba(255,195,100,0.18) 0%, transparent 70%)",
            filter: "blur(55px)",
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />

        {/* Edge vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 82% 82% at 50% 50%, transparent 32%, rgba(0,0,0,0.32) 66%, rgba(0,0,0,0.70) 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Legibility wash */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.40)",
            pointerEvents: "none",
          }}
        />
        {/* Dark halo behind title */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 55% 35% at 50% 40%, rgba(0,0,0,0.48) 0%, transparent 75%)",
            pointerEvents: "none",
          }}
        />
      </div>

      <ParticleCanvas count={90} />

      {/* Content */}
      <motion.div
        style={{
          y,
          opacity,
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "110px 1.5rem 0",
        }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            borderRadius: 9999,
            padding: "0.4rem 0.95rem",
            marginBottom: "1.75rem",
          }}
        >
          <span
            style={{
              background: "white",
              color: "black",
              fontSize: "0.7rem",
              fontWeight: 600,
              padding: "0.1rem 0.45rem",
              borderRadius: 9999,
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            New
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.78)",
              fontSize: "0.82rem",
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
            }}
          >
            Spring 2026 workshops are open.
          </span>
        </motion.div>

        <div style={{ maxWidth: 960, width: "100%" }}>
          <ParticleTitle lines={["Education Reimagined", "For Every Learner"]} />
        </div>

        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: 620,
            marginTop: "1.5rem",
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.70)",
          }}
        >
          Research, workshops, and tools that bridge STEM education and the
          real world — built with curiosity at the center.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: "2.25rem",
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="/insights"
            className="liquid-glass-strong"
            style={{
              borderRadius: 9999,
              padding: "0.85rem 1.75rem",
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
            Explore My Work
            <ArrowUpRight style={{ width: "1rem", height: "1rem" }} />
          </Link>
          <Link
            href="/workshops"
            style={{
              borderRadius: 9999,
              padding: "0.85rem 1.25rem",
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 300,
              fontFamily: "'Barlow', sans-serif",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <Play style={{ width: "0.9rem", height: "0.9rem" }} />
            Book a Workshop
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 360,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.85) 75%, black 100%)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />
    </section>
  )
}
