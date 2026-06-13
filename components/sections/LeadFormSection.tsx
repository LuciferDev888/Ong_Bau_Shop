"use client"

import { useLanguage } from "@/hooks/useLanguage"
import LeadForm from "../forms/LeadForm"
import { ProductItem } from "@/types/landing"
import { useScrollReveal } from "@/hooks/useScrollReveal"

interface LeadFormSectionProps {
  campaignName: string
  products: ProductItem[]
}

export function LeadFormSection({ campaignName, products }: LeadFormSectionProps) {
  const { locale } = useLanguage()
  const isVi = locale === "vi"
  const sectionRef = useScrollReveal()

  return (
    <section
      id="lead-form"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-gradient overflow-hidden"
    >
      {/* Decorative lines & glows */}
      <div className="section-divider-top" />
      <div className="pitch-pattern" />
      <div className="glow-orb glow-orb-gold w-[400px] h-[400px] top-1/2 left-10 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="reveal">
            <div className="section-number justify-center">
              <span className="num">09</span>
              <span>{isVi ? "NHẬN ƯU ĐÃI RIÊNG" : "SPECIAL DISCOUNTS"}</span>
            </div>
          </div>

          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight">
            {isVi ? "ĐĂNG KÝ" : "REGISTER FOR"}{" "}
            <span className="text-gradient-gold">
              {isVi ? "TƯ VẤN NHẬN QUÀ" : "FREE ADVICE & GIFTS"}
            </span>
          </h2>
          
          <p className="reveal reveal-delay-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isVi
              ? "Nhập thông tin của bạn bên dưới. Đội ngũ Ông Bầu Shop sẽ gọi điện tư vấn chọn kích thước và giao hàng phù hợp nhất."
              : "Submit your details below. The Ong Bau Shop team will contact you shortly to recommend sizes and shipping options."}
          </p>
          <div className="reveal reveal-delay-2 decorative-line-h mx-auto" />
        </div>

        <div className="reveal reveal-delay-3 max-w-xl mx-auto">
          <LeadForm campaignName={campaignName} products={products} />
        </div>
      </div>
    </section>
  )
}

export default LeadFormSection
