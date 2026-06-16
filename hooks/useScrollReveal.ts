"use client"

import { useEffect, useRef } from "react"

/**
 * Lightweight IntersectionObserver-based scroll reveal.
 *
 * Adds `.reveal-visible` when reveal elements enter the viewport, supports
 * `data-stagger`, and observes dynamic children such as filtered product cards.
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const revealSelector = ".reveal, .reveal-left, .reveal-right"
    const getElements = (root: ParentNode, selector: string) => {
      const elements: Element[] = []

      if (root instanceof Element && root.matches(selector)) {
        elements.push(root)
      }

      root.querySelectorAll(selector).forEach((el) => elements.push(el))
      return elements
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) {
      const revealImmediately = (root: ParentNode) => {
        getElements(root, revealSelector).forEach((el) => {
          el.classList.add("reveal-visible")
        })
      }

      revealImmediately(container)

      const reducedMotionObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
              revealImmediately(node)
            }
          })
        })
      })

      reducedMotionObserver.observe(container, { childList: true, subtree: true })
      return () => reducedMotionObserver.disconnect()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    )
    const observedElements = new WeakSet<Element>()

    const applyStaggerDelays = (root: ParentNode) => {
      getElements(root, "[data-stagger]").forEach((staggerEl) => {
        const staggerMs = parseInt(staggerEl.getAttribute("data-stagger") || "100", 10)
        const children = staggerEl.querySelectorAll(revealSelector)

        children.forEach((child, i) => {
          const el = child as HTMLElement

          if (!el.style.transitionDelay) {
            el.style.transitionDelay = `${i * staggerMs}ms`
          }
        })
      })
    }

    const observeRevealElements = (root: ParentNode) => {
      getElements(root, revealSelector).forEach((el) => {
        if (observedElements.has(el) || el.classList.contains("reveal-visible")) {
          return
        }

        observedElements.add(el)
        observer.observe(el)
      })
    }

    applyStaggerDelays(container)
    observeRevealElements(container)

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            applyStaggerDelays(node)
            observeRevealElements(node)
          }
        })
      })
    })

    mutationObserver.observe(container, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [])

  return containerRef
}
