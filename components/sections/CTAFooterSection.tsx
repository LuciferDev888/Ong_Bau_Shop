"use client"

import { PhoneCall } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { FooterCTAProps } from "@/types/landing"
import { useLanguage } from "@/hooks/useLanguage"

interface BilingualFooterCTAProps {
  vi: FooterCTAProps
  en: FooterCTAProps
}

export function CTAFooterSection({ vi, en }: BilingualFooterCTAProps) {
  const { locale } = useLanguage()
  const data = locale === "vi" ? vi : en
  const isVi = locale === "vi"

  const handleCTAClick = () => {
    trackCTAClick("footer_section_cta", "cta_footer")
  }

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gradient-gold uppercase max-w-4xl mx-auto leading-tight">
          {data.title}
        </h2>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {data.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={data.ctaHref}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-8 py-4 rounded-xl transition-all transform active:scale-95 shadow-xl shadow-primary/20 hover:shadow-primary/30"
            onClick={handleCTAClick}
          >
            {data.ctaText}
          </a>
          <a
            href="tel:0901234567"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-secondary hover:bg-secondary/80 border border-border text-foreground font-semibold px-8 py-4 rounded-xl transition-colors gap-2"
            onClick={() => trackCTAClick("footer_hotline_call", "cta_footer")}
          >
            <PhoneCall className="w-5 h-5 text-primary" />
            <span>{isVi ? "Gọi Hotline: 090 123 4567" : "Call Hotline: 090 123 4567"}</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTAFooterSection
