"use client"

import React from "react"
import { ShieldCheck, Truck, RotateCcw, Award } from "lucide-react"
import { BenefitsProps } from "@/types/landing"
import { useLanguage } from "@/hooks/useLanguage"

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

  return (
    <section id="benefits" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
            {data.title.split(" ")[0] || ""}{" "}
            <span className="text-gradient-gold">
              {data.title.split(" ").slice(1).join(" ") || ""}
            </span>
          </h2>
          {data.subtitle && (
            <p className="text-sm sm:text-base text-muted-foreground">
              {data.subtitle}
            </p>
          )}
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.items.map((benefit) => {
            const IconComponent = iconMap[benefit.icon] || ShieldCheck

            return (
              <div
                key={benefit.id}
                className="group relative rounded-2xl border border-border bg-card/40 p-8 glass-card-hover text-center"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl origin-left" />

                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                  <IconComponent className="w-7 h-7" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
