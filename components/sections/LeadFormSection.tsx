"use client"

import { useLanguage } from "@/hooks/useLanguage"
import LeadForm from "../forms/LeadForm"
import { ProductItem } from "@/types/landing"

interface LeadFormSectionProps {
  campaignName: string
  products: ProductItem[]
}

export function LeadFormSection({ campaignName, products }: LeadFormSectionProps) {
  const { locale } = useLanguage()
  const isVi = locale === "vi"

  return (
    <section id="lead-form" className="py-20 bg-dark-gradient relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight uppercase">
            {isVi ? "ĐĂNG KÝ" : "REGISTER FOR"}{" "}
            <span className="text-gradient-gold">
              {isVi ? "TƯ VẤN NHẬN QUÀ" : "FREE ADVICE & GIFTS"}
            </span>
          </h2>
          <p className="text-sm text-muted-foreground">
            {isVi
              ? "Nhập thông tin của bạn bên dưới. Đội ngũ Ông Bầu Shop sẽ gọi điện tư vấn chọn kích thước và giao hàng phù hợp nhất."
              : "Submit your details below. The Ong Bau Shop team will contact you shortly to recommend sizes and shipping options."}
          </p>
        </div>
        <LeadForm campaignName={campaignName} products={products} />
      </div>
    </section>
  )
}

export default LeadFormSection
