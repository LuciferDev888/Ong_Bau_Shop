"use client"

import React, { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number // percentage
  y: number // percentage
  size: number // px
  duration: number // seconds
  delay: number // seconds
  opacity: number
}

export function SparkleParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) return

    // Increased particle count by around 20-35% for better density while remaining premium
    const isMobile = window.innerWidth < 768
    const count = isMobile ? 16 : 38

    const generated: Particle[] = Array.from({ length: count }).map((_, i) => {
      // Use different particle sizes, targeting roughly 1px, 2px, and 3px
      const sizeOptions = [1.0, 2.0, 3.0]
      const size = sizeOptions[Math.floor(Math.random() * sizeOptions.length)]

      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        duration: Math.random() * 18 + 14, // 14s to 32s for slow, premium floating
        delay: Math.random() * -18, // start animations immediately
        // Increased particle opacity by 15-30% for improved visibility on dark backgrounds
        opacity: Math.random() * 0.25 + 0.35, // 0.35 to 0.60 opacity
      }
    })
    setParticles(generated)
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1] select-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/40 animate-float-sparkle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            // Soft gold glow using box-shadow
            boxShadow: `0 0 6px 1.5px rgba(255, 194, 14, 0.6), 0 0 10px 3px rgba(255, 194, 14, 0.25)`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}

export default SparkleParticles
