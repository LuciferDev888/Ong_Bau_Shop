"use client"

import Image from "next/image"
import { Phone, PhoneCall, MapPin, Mail, Clock } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { FooterCTAProps } from "@/types/landing"
import { useLanguage } from "@/hooks/useLanguage"
import { useScrollReveal } from "@/hooks/useScrollReveal"

interface BilingualFooterCTAProps {
  vi: FooterCTAProps
  en: FooterCTAProps
}

export function CTAFooterSection({ vi, en }: BilingualFooterCTAProps) {
  const { locale } = useLanguage()
  const data = locale === "vi" ? vi : en
  const isVi = locale === "vi"
  const sectionRef = useScrollReveal()

  const handleCTAClick = () => {
    trackCTAClick("footer_section_cta", "cta_footer")
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/background/background2.png"
          alt="Contact Section Background"
          fill
          quality={75}
          className="object-cover object-center opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background" />
      </div>

      <div className="section-divider-top" />
      <div className="pitch-pattern" />
      <div className="glow-orb glow-orb-gold w-[600px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Call to Action */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="reveal">
              <div className="section-number justify-center lg:justify-start">
                <span className="num">10</span>
                <span>{isVi ? "ƯU ĐÃI ĐẶC BIỆT" : "SPECIAL EVENT"}</span>
              </div>
            </div>

            <h2 className="reveal reveal-delay-1 text-3xl sm:text-5xl font-black tracking-tight text-gradient-gold uppercase leading-tight">
              {data.title}
            </h2>

            <p className="reveal reveal-delay-2 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {data.description}
            </p>

            <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={data.ctaHref}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-8 py-4 rounded-xl transition-all transform active:scale-95 shadow-xl shadow-primary/20 hover:shadow-primary/30"
                onClick={handleCTAClick}
              >
                {data.ctaText}
              </a>
              <a
                href="tel:0906443704"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-secondary hover:bg-secondary/80 border border-border text-foreground font-semibold px-8 py-4 rounded-xl transition-colors gap-2"
                onClick={() => trackCTAClick("footer_hotline_call", "cta_footer")}
              >
                <PhoneCall className="w-5 h-5 text-primary" />
                <span>{isVi ? "Gọi Hotline: 0906 443 704" : "Call Hotline: 0906 443 704"}</span>
              </a>
            </div>
          </div>

          {/* Right Column - Store Information */}
          <div className="lg:col-span-5">
            <div className="reveal reveal-delay-2 glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-border/40 relative">
              <div className="absolute top-4 right-4 text-[9px] font-mono font-bold text-primary tracking-widest">
                STORE INFO
              </div>
              
              <h3 className="text-xl font-bold uppercase tracking-tight text-foreground border-b border-border/40 pb-4">
                {isVi ? "THÔNG TIN CỬA HÀNG" : "OUR STORE"}
              </h3>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      {isVi ? "Địa chỉ" : "Address"}
                    </h4>
                    <p className="text-sm text-foreground/90 font-medium mt-1">
                      {isVi
                        ? "Nước Mặn 6, Ngũ Hành Sơn, Đà Nẵng, Việt Nam"
                        : "Nuoc Man 6, Ngu Hanh Son, Da Nang, Vietnam"}
                    </p>
                  </div>
                </div>

                {/* Hotline */}
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      {isVi ? "Điện thoại" : "Phone"}
                    </h4>
                    <p className="text-sm text-foreground/90 font-medium mt-1">
                      <a href="tel:0906443704" className="hover:text-primary transition-colors">
                        0906 443 704
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Email
                    </h4>
                    <p className="text-sm text-foreground/90 font-medium mt-1">
                      <a href="mailto:abc@gmail.com" className="hover:text-primary transition-colors">
                        abc@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      {isVi ? "Giờ mở cửa" : "Hours"}
                    </h4>
                    <p className="text-sm text-foreground/90 font-medium mt-1">
                      {isVi ? "Thứ 2 - Chủ Nhật: 08:00 - 22:00" : "Monday - Sunday: 08:00 AM - 10:00 PM"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default CTAFooterSection
