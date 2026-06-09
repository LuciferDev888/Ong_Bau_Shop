"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { HeroProps } from "@/types/landing"
import { useLanguage } from "@/hooks/useLanguage"

const HERO_PRODUCTS = [
  {
    id: "boot-1",
    tagVi: "Giày Đá Bóng Chủ Lực",
    tagEn: "Signature Boot",
    nameVi: "Kamito Cobra Pro TF - Hoàng Kim",
    nameEn: "Kamito Cobra Pro TF - Gold Edition",
    descVi: "Thiết kế nâng tầm tốc độ, chất liệu da microfiber siêu mềm bám sân vượt trội.",
    descEn: "Designed for ultimate speed, featuring ultra-soft microfiber leather upper.",
    price: 850000,
    image: "/images/Football_boots/548210470_695313350228768_6976189092250864576_n.jpg",
    target: "#products",
  },
  {
    id: "clo-kam-8",
    tagVi: "Trang Phục Bán Chạy",
    tagEn: "Best Seller Jersey",
    nameVi: "Bộ Áo Đấu Kamito Cobra Black/Gold",
    nameEn: "Kamito Cobra Jersey - Black/Gold",
    descVi: "Họa tiết Cobra dập nổi sang trọng, chất vải mè co giãn 4 chiều kháng khuẩn.",
    descEn: "Exquisite embossed Cobra pattern on lightweight, breathable stretch fabrics.",
    price: 285000,
    image: "/images/soccer_clothes/kamito/674286523_868763939550374_5953917136598584271_n.jpg",
    target: "#products",
  },
  {
    id: "balo-4",
    tagVi: "Phụ Kiện Cao Cấp",
    tagEn: "Premium Accessory",
    nameVi: "Balo Thể Thao Ông Bầu Signature Pro",
    nameEn: "Ong Bau Signature Pro Backpack",
    descVi: "Chất liệu chống thấm nước tối ưu, tích hợp ngăn đựng giày thông minh.",
    descEn: "Advanced water-resistant fabric with a dedicated shoe compartment.",
    price: 390000,
    image: "/images/balo/download.jpg",
    target: "#products",
  },
  {
    id: "boot-10",
    tagVi: "Giày Chữ Ký Tuyển Thủ",
    tagEn: "Player Signature Cleats",
    nameVi: "Kamito TA11 Premium TF",
    nameEn: "Kamito TA11 Premium TF - Signature",
    descVi: "Hợp tác thiết kế cùng tiền vệ Tuấn Anh, đệm giảm chấn êm ái bảo vệ gối.",
    descEn: "Co-designed with midfielder Tuan Anh, cushioning sole protects joints.",
    price: 890000,
    image: "/images/Football_boots/565365642_723586157401487_5029011922515547216_n.jpg",
    target: "#products",
  },
  {
    id: "acc-knee-1",
    tagVi: "Phụ Kiện Bảo Vệ",
    tagEn: "Protective Gear",
    nameVi: "Băng Gối Silicon Chống Lệch Khớp",
    nameEn: "Silicon Patella Knee Guard",
    descVi: "Bảo vệ xương bánh chè, trợ lực dây chằng tối đa khi bứt tốc tranh chấp.",
    descEn: "Secures patella alignment and supports knee joints during high sprints.",
    price: 180000,
    image: "/images/Knee_support/download.jpg",
    target: "#products",
  }
]

interface BilingualHeroProps {
  vi: HeroProps
  en: HeroProps
}

export function HeroSection({ vi, en }: BilingualHeroProps) {
  const { locale } = useLanguage()
  const data = locale === "vi" ? vi : en
  const isVi = locale === "vi"
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_PRODUCTS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({})
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xc = rect.width / 2
    const yc = rect.height / 2
    const tiltX = (yc - y) / 10
    const tiltY = (x - xc) / 10

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    })

    const percentageX = (x / rect.width) * 100
    const percentageY = (y / rect.height) * 100
    setGlareStyle({
      background: `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(255,194,14,0.18) 0%, transparent 60%)`,
      opacity: 1,
    })
  }

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out",
    })
    setGlareStyle({
      opacity: 0,
      transition: "opacity 0.5s ease-out",
    })
  }

  const handleCTAClick = (label: string, target: string) => {
    trackCTAClick(`${label}_${target}`, "hero")
  }

  const formatPrice = (price: number) => {
    if (!isVi) {
      const usdPrice = (price / 24000).toFixed(2)
      return `$${usdPrice} USD`
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.backgroundImage}
          alt="Hero background showing soccer stadium"
          fill
          priority
          quality={85}
          className="object-cover object-center scale-105 select-none"
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background z-10" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-background/50 z-10" />
      </div>

      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none z-10" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase animate-pulse-slow">
              <Sparkles className="w-4 h-4" />
              <span>{isVi ? "Chính Hãng & Uy Tín Hàng Đầu" : "100% Authentic & Certified"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-gradient-white">
              {data.headline.split("-")[0]}
              {data.headline.includes("-") && (
                <span className="block text-gradient-gold">
                  -{data.headline.split("-")[1]}
                </span>
              )}
            </h1>

            {data.subheadline && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {data.subheadline}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href={data.ctaHref}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-8 py-4 rounded-xl transition-all transform active:scale-95 shadow-xl shadow-primary/20 hover:shadow-primary/30 group gap-2"
                onClick={() => handleCTAClick("hero_primary", data.ctaHref)}
              >
                <span>{data.ctaText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#lead-form"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-secondary/80 hover:bg-secondary border border-border text-foreground font-semibold px-8 py-4 rounded-xl transition-colors hover:border-primary/40"
                onClick={() => handleCTAClick("hero_secondary", "#lead-form")}
              >
                {isVi ? "Nhận Tư Vấn Size miễn phí" : "Get Free Size Consultation"}
              </a>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left border-r border-border/80 pr-4">
                <span className="block text-2xl sm:text-3xl font-extrabold text-primary">10K+</span>
                <span className="text-[11px] sm:text-xs text-muted-foreground uppercase font-medium tracking-wider">
                  {isVi ? "Khách Hàng" : "Customers"}
                </span>
              </div>
              <div className="text-center lg:text-left border-r border-border/80 pr-4">
                <span className="block text-2xl sm:text-3xl font-extrabold text-primary">100%</span>
                <span className="text-[11px] sm:text-xs text-muted-foreground uppercase font-medium tracking-wider">
                  {isVi ? "Chính Hãng" : "Authentic"}
                </span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-2xl sm:text-3xl font-extrabold text-primary">24/7</span>
                <span className="text-[11px] sm:text-xs text-muted-foreground uppercase font-medium tracking-wider">
                  {isVi ? "Hỗ Trợ" : "Support"}
                </span>
              </div>
            </div>
          </div>

          {/* Representative Products Animated Carousel */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={tiltStyle}
            className="lg:col-span-5 relative w-full h-[460px] sm:h-[480px] rounded-2xl overflow-hidden glass-panel border border-border shadow-2xl bg-secondary/15 flex flex-col justify-between group transition-all duration-300"
          >
            
            {/* Glare effect overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
              style={glareStyle}
            />

            {/* Card Background image overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
              <Image
                src="/images/background/background1.png"
                alt="Card background pattern"
                fill
                className="object-cover object-center opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>

            {/* Carousel slides container */}
            <div className="relative w-full h-full z-10">
              {HERO_PRODUCTS.map((prod, index) => {
                const isActive = index === activeIndex
                return (
                  <div
                    key={prod.id}
                    className={`absolute inset-0 flex flex-col justify-between transition-all duration-700 ease-in-out ${
                      isActive
                        ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                        : "opacity-0 translate-x-8 scale-95 pointer-events-none"
                    }`}
                  >
                    {/* Product Image Wrapper - Fills top frame */}
                    <div className="relative w-full h-[220px] sm:h-[240px] overflow-hidden bg-white border-b border-border/40 flex items-center justify-center p-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-white to-secondary/5" />
                      <div className="relative w-full h-full select-none transition-transform duration-700 group-hover:scale-105">
                        <Image
                          src={prod.image}
                          alt={isVi ? prod.nameVi : prod.nameEn}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Product details */}
                    <div className="p-6 pb-12 space-y-2 relative z-10 flex-1 flex flex-col justify-center">
                      <div>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                          {isVi ? prod.tagVi : prod.tagEn}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {isVi ? prod.nameVi : prod.nameEn}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {isVi ? prod.descVi : prod.descEn}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border/20 mt-1">
                        <span className="text-sm font-extrabold text-primary">
                          {formatPrice(prod.price)}
                        </span>
                        <a
                          href={prod.target}
                          className="inline-flex items-center text-xs font-bold text-primary hover:text-primary/80 transition-colors gap-1"
                          onClick={() => handleCTAClick(`hero_carousel_${prod.id}`, prod.target)}
                        >
                          <span>{isVi ? "Xem chi tiết" : "View Details"}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {HERO_PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveIndex(i)
                    handleCTAClick(`hero_indicator_${i}`, "#")
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i ? "bg-primary w-5" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
