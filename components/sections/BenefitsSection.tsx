"use client"

import React from "react"
import { ShieldCheck, Truck, RotateCcw, Award } from "lucide-react"
import { BenefitsProps } from "@/types/landing"
import { useLanguage } from "@/hooks/useLanguage"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  ShieldCheck: ShieldCheck,
  Truck: Truck,
  RotateCcw: RotateCcw,
  Award: Award,
}

interface BilingualBenefitsProps {
  vi: BenefitsProps
  en: BenefitsProps
}

export function BenefitsSection({ vi, en }: BilingualBenefitsProps) {
  const { locale } = useLanguage()
  const data = locale === "vi" ? vi : en
  const isVi = locale === "vi"
  const sectionRef = useScrollReveal()

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-gradient-reverse overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center select-none pointer-events-none" style={{ backgroundImage: "url('/images/background/background4.png')" }} />
      <div className="absolute inset-0 bg-black/65 select-none pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 select-none pointer-events-none" />

      {/* Decorative */}
      <div className="section-divider-top" />
      <div className="pitch-pattern" />
      <div className="glow-orb glow-orb-warm w-[500px] h-[500px] top-1/2 right-[-10%] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="reveal">
            <div className="section-number justify-center">
              <span className="num">05</span>
              <span>{isVi ? "TẠI SAO CHỌN CHÚNG TÔI" : "WHY CHOOSE US"}</span>
            </div>
          </div>

          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight">
            {data.title.split(" ")[0] || ""}{" "}
            <span className="text-gradient-gold">
              {data.title.split(" ").slice(1).join(" ") || ""}
            </span>
          </h2>
          {data.subtitle && (
            <p className="reveal reveal-delay-2 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          )}
          <div className="reveal reveal-delay-2 decorative-line-h mx-auto" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" data-stagger="120">
          {data.items.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || ShieldCheck

            return (
              <div
                key={benefit.id}
                className={`reveal reveal-delay-${Math.min(index + 1, 4)} animate-float-gentle-${(index % 4) + 1} hover-stabilize group relative rounded-2xl border border-border/40 bg-card/20 p-7 text-center transition-all duration-500 hover:bg-card/50 hover:border-primary/20`}
              >
                {/* Top accent line on hover */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl origin-left" />

                {/* Index number */}
                <span className="absolute top-4 right-5 text-[10px] font-mono font-bold text-foreground/[0.08] tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/8 border border-primary/12 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-400">
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
