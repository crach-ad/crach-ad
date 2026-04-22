"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  tx: number
  ty: number
  vx: number
  vy: number
  r: number
  opacity: number
  phase: number
}

const REPEL_RADIUS = 90
const REPEL_STRENGTH = 7
const SPRING = 0.055
const FRICTION = 0.82

export function ParticleTitle({ lines }: { lines: [string, string] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let particles: Particle[] = []
    const cursor = { x: -9999, y: -9999 }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const setup = () => {
      const w = canvas.offsetWidth
      const h = 230
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const fontSize = Math.min(w * 0.086, 90)
      const leading = fontSize * 1.08

      const off = document.createElement("canvas")
      off.width = w
      off.height = h
      const octx = off.getContext("2d")!
      octx.fillStyle = "white"
      octx.textAlign = "center"
      octx.textBaseline = "middle"
      octx.font = `italic ${fontSize}px 'Instrument Serif', serif`
      octx.fillText(lines[0], w / 2, h / 2 - leading * 0.5)
      octx.fillText(lines[1], w / 2, h / 2 + leading * 0.5)

      const imageData = octx.getImageData(0, 0, w, h).data
      const targets: { x: number; y: number }[] = []
      const stride = 3
      for (let y = 0; y < h; y += stride) {
        for (let x = 0; x < w; x += stride) {
          const i = (y * w + x) * 4 + 3
          if (imageData[i] > 100) targets.push({ x, y })
        }
      }

      particles = targets.map((t) => ({
        x: Math.random() * w,
        y: Math.random() < 0.5 ? -30 - Math.random() * 80 : h + 30 + Math.random() * 80,
        tx: t.x,
        ty: t.y,
        vx: 0,
        vy: 0,
        r: Math.random() * 0.85 + 0.45,
        opacity: 0,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const render = () => {
      const w = canvas.offsetWidth
      const h = 230
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        const dx = p.x - cursor.x
        const dy = p.y - cursor.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPEL_RADIUS && dist > 0.01) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
          p.vx += (dx / dist) * force * REPEL_STRENGTH * 0.1
          p.vy += (dy / dist) * force * REPEL_STRENGTH * 0.1
        }

        p.vx += (p.tx - p.x) * SPRING
        p.vy += (p.ty - p.y) * SPRING
        p.vx *= FRICTION
        p.vy *= FRICTION
        p.x += p.vx
        p.y += p.vy
        p.phase += 0.02

        const settled = Math.abs(p.x - p.tx) < 2 && Math.abs(p.y - p.ty) < 2
        if (settled) {
          p.x += Math.sin(p.phase) * 0.15
          p.y += Math.cos(p.phase * 0.8) * 0.1
        }
        if (p.opacity < 1) p.opacity = Math.min(1, p.opacity + 0.022)

        const nearFactor = dist < REPEL_RADIUS * 1.2 ? 1 - dist / (REPEL_RADIUS * 1.2) : 0
        if (nearFactor > 0) {
          const gr = p.r * 4
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr)
          grad.addColorStop(0, `rgba(255,255,255,${0.5 * nearFactor * p.opacity})`)
          grad.addColorStop(1, "rgba(255,255,255,0)")
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, gr, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(render)
    }

    const start = async () => {
      try {
        await (document as any).fonts?.load?.("italic 80px 'Instrument Serif'")
      } catch {}
      setup()
      raf = requestAnimationFrame(render)
    }
    start()

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      cursor.x = e.clientX - rect.left
      cursor.y = e.clientY - rect.top
    }
    const onLeave = () => {
      cursor.x = -9999
      cursor.y = -9999
    }
    canvas.addEventListener("mousemove", onMove)
    canvas.addEventListener("mouseleave", onLeave)

    const ro = new ResizeObserver(() => setup())
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener("mousemove", onMove)
      canvas.removeEventListener("mouseleave", onLeave)
      ro.disconnect()
    }
  }, [lines])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "230px",
        cursor: "none",
        background: "transparent",
        display: "block",
      }}
    />
  )
}
