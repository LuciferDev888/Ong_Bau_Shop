"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { FAQItem } from "@/types/landing"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/hooks/useLanguage"
import { useScrollReveal } from "@/hooks/useScrollReveal"

interface BilingualFAQProps {
  vi: FAQItem[]
  en: FAQItem[]
}

export function FAQSection({ vi, en }: BilingualFAQProps) {
  const { locale } = useLanguage()
  const items = locale === "vi" ? vi : en
  const isVi = locale === "vi"
  const sectionRef = useScrollReveal()

  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    const nextState = openIdx === index ? null : index
    setOpenIdx(nextState)
    if (nextState !== null) {
      trackCTAClick(`open_faq_${index}`, "faq")
    }
  }

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-gradient overflow-hidden"
    >
      {/* Decorative lines & glows */}
      <div className="section-divider-top" />
      <div className="pitch-pattern" />
      <div className="glow-orb glow-orb-gold w-[500px] h-[500px] -bottom-20 -right-20" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="reveal">
            <div className="section-number justify-center">
              <span className="num">07</span>
              <span>{isVi ? "CÂU HỎI THƯỜNG GẶP" : "FREQUENTLY ASKED"}</span>
            </div>
          </div>

          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight">
            {isVi ? "HỎI ĐÁP" : "FREQUENTLY ASKED"}{" "}
            <span className="text-gradient-gold">
              {isVi ? "THƯỜNG GẶP" : "QUESTIONS"}
            </span>
          </h2>
          <div className="reveal reveal-delay-2 decorative-line-h mx-auto" />
        </div>

        {/* Accordion FAQ */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {items.map((item, index) => {
            const isOpen = openIdx === index
            const numStr = String(index + 1).padStart(2, "0")
            const ariaId = `faq-answer-${index}`

            return (
              <div key={index} className="reveal reveal-delay-1">
                <div
                  className={`rounded-xl border transition-all duration-500 overflow-hidden ${
                    isOpen
                      ? "border-primary bg-card/30 shadow-lg shadow-primary/5 scale-[1.01] lg:scale-[1.01]"
                      : "border-border/30 bg-card/10 hover:border-primary/25 hover:bg-card/20"
                  } ${
                    index % 4 === 0
                      ? "lg:translate-x-0"
                      : index % 4 === 1
                      ? "lg:translate-x-8"
                      : index % 4 === 2
                      ? "lg:translate-x-16"
                      : "lg:translate-x-8"
                  }`}
                >
                  <button
                    id={`faq-button-${index}`}
                    onClick={() => handleToggle(index)}
                    className={`w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors focus:outline-none ${
                      isOpen ? "text-primary" : "text-foreground"
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={ariaId}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-xs sm:text-sm font-mono font-bold text-primary mt-1">
                        {numStr}
                      </span>
                      <span className="font-bold text-sm sm:text-base tracking-tight leading-snug">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-primary shrink-0 transition-transform duration-300 mt-1 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    id={ariaId}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`p-5 sm:p-6 pl-11 sm:pl-[52px] text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/10 transition-all duration-500 ease-out ${
                          isOpen
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-2 opacity-0"
                        }`}
                      >
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
