"use client"

import { useEffect, useRef } from "react"

/**
 * useScrollReveal — Lightweight IntersectionObserver-based scroll reveal
 *
 * Adds `.reveal-visible` class when elements with `.reveal`, `.reveal-left`,
 * or `.reveal-right` classes enter the viewport.
 *
 * Supports `data-stagger` attribute on a parent element to auto-apply
 * staggered transition-delays to its `.reveal` children.
 *
 * Respects prefers-reduced-motion by immediately showing all elements.
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) {
      // Immediately reveal everything — no animation
      const elements = container.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
      )
      elements.forEach((el) => el.classList.add("reveal-visible"))
      return
    }

    // Apply stagger delays to children inside [data-stagger] containers
    const staggerContainers = container.querySelectorAll("[data-stagger]")
    staggerContainers.forEach((staggerEl) => {
      const staggerMs = parseInt(staggerEl.getAttribute("data-stagger") || "100", 10)
      const children = staggerEl.querySelectorAll(".reveal, .reveal-left, .reveal-right")
      children.forEach((child, i) => {
        const el = child as HTMLElement
        // Only set if not already manually set
        if (!el.style.transitionDelay) {
          el.style.transitionDelay = `${i * staggerMs}ms`
        }
      })
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible")
            observer.unobserve(entry.target) // Once revealed, stop observing
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    )

    const elements = container.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right"
    )
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return containerRef
}
