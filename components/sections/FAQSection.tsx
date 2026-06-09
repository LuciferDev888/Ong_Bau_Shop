"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { FAQItem } from "@/types/landing"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/hooks/useLanguage"

interface BilingualFAQProps {
  vi: FAQItem[]
  en: FAQItem[]
}

export function FAQSection({ vi, en }: BilingualFAQProps) {
  const { locale } = useLanguage()
  const items = locale === "vi" ? vi : en
  const isVi = locale === "vi"

  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    const nextState = openIdx === index ? null : index
    setOpenIdx(nextState)
    if (nextState !== null) {
      trackCTAClick(`open_faq_${index}`, "faq")
    }
  }

  return (
    <section id="faq" className="py-20 bg-dark-gradient relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
            {isVi ? "HỎI ĐÁP" : "FREQUENTLY ASKED"}{" "}
            <span className="text-gradient-gold">
              {isVi ? "THƯỜNG GẶP" : "QUESTIONS"}
            </span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        {/* Accordion FAQ */}
        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIdx === index

            return (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card/40 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-secondary/40 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-bold text-foreground text-sm sm:text-base">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-border/40" : "max-h-0"
                  } overflow-hidden`}
                >
                  <div className="p-5 sm:p-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.answer}
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
