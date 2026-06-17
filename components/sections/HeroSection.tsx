"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, Sparkles, Star, Shield, Truck, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { HeroProps } from "@/types/landing"
import { useLanguage } from "@/hooks/useLanguage"
import { useScrollReveal } from "@/hooks/useScrollReveal"

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
    image: "/images/transparent_background/boot-gold.png",
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
    image: "/images/transparent_background/jersey-cobra.png",
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
    image: "/images/transparent_background/balo-pro.png",
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
    image: "/images/transparent_background/boot-ta11.png",
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
    image: "/images/transparent_background/knee-guard.png",
    target: "#products",
  },
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
  const sectionRef = useScrollReveal()

  const TYPING_PHRASES_VI = [
    "SẴN SÀNG CHO MỌI TRẬN ĐẤU",
    "BỨT TỐC CÙNG ĐAM MÊ",
    "TRANG BỊ BÓNG ĐÁ CHẤT LƯỢNG",
    "TỐC ĐỘ. KIỂM SOÁT. BỨT PHÁ."
  ]

  const TYPING_PHRASES_EN = [
    "GEAR UP FOR EVERY MATCH",
    "PLAY HARD. MOVE FAST.",
    "PREMIUM FOOTBALL ESSENTIALS",
    "BUILT FOR SPEED AND CONTROL"
  ]

  const phrases = isVi ? TYPING_PHRASES_VI : TYPING_PHRASES_EN
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  // Reset typing on locale change
  useEffect(() => {
    setCurrentText("")
    setCurrentPhraseIdx(0)
    setIsDeleting(false)
  }, [locale])

  useEffect(() => {
    let timer: NodeJS.Timeout
    const fullPhrase = phrases[currentPhraseIdx]
    const delay = isDeleting ? 75 : 150
    const pauseTime = 1500

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullPhrase.substring(0, currentText.length - 1))
      }, delay)
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullPhrase.substring(0, currentText.length + 1))
      }, delay)
    }

    if (!isDeleting && currentText === fullPhrase) {
      timer = setTimeout(() => {
        setIsDeleting(true)
      }, pauseTime)
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false)
      setCurrentPhraseIdx((prev) => (prev + 1) % phrases.length)
    }

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentPhraseIdx, phrases])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_PRODUCTS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [activeIndex])

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_PRODUCTS.length)
    trackCTAClick("hero_carousel_next", "hero")
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length)
    trackCTAClick("hero_carousel_prev", "hero")
  }

  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({})
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xc = rect.width / 2
    const yc = rect.height / 2
    const tiltX = (yc - y) / 12
    const tiltY = (x - xc) / 12

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    })

    const percentageX = (x / rect.width) * 100
    const percentageY = (y / rect.height) * 100
    setGlareStyle({
      background: `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(255,194,14,0.15) 0%, transparent 60%)`,
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

  const trustStats = [
    {
      icon: Star,
      value: "4.9",
      labelVi: "ĐÁNH GIÁ",
      labelEn: "RATING",
    },
    {
      icon: Shield,
      value: "100%",
      labelVi: "CHÍNH HÃNG",
      labelEn: "AUTHENTIC",
    },
    {
      icon: Truck,
      value: isVi ? "2H" : "2H",
      labelVi: "GIAO NHANH",
      labelEn: "FAST DELIVERY",
    },
    {
      icon: Users,
      value: "500+",
      labelVi: "KHÁCH HÀNG",
      labelEn: "CUSTOMERS",
    },
  ]

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-24 pb-8 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.backgroundImage}
          alt="Hero background showing soccer stadium"
          fill
          priority
          quality={85}
          className="object-cover object-center scale-105 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 z-10" />
      </div>

      {/* Pitch line pattern overlay */}
      <div className="pitch-pattern z-10" />

      {/* Ambient glow orbs */}
      <div className="glow-orb glow-orb-gold w-[500px] h-[500px] top-[10%] left-[-10%] z-10 animate-glow-pulse" />
      <div className="glow-orb glow-orb-warm w-[400px] h-[400px] bottom-[10%] right-[-5%] z-10" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Section number micro-label */}
            <div className="reveal reveal-delay-1">
              <div className="section-number justify-center lg:justify-start">
                <span className="num">01</span>
                <span className="whitespace-nowrap">{isVi ? "TRANG BỊ CHUYÊN NGHIỆP" : "ELITE FOOTBALL GEAR"}</span>
              </div>
            </div>

            {/* Badge */}
            <div className="reveal reveal-delay-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-[10px] font-bold tracking-editorial uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isVi ? "Chính Hãng & Uy Tín Hàng Đầu" : "100% Authentic & Certified"}</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="reveal reveal-delay-3 font-black tracking-tight leading-[1.05] uppercase">
              <span className="text-gradient-white block text-[20px] min-[360px]:text-[22px] min-[400px]:text-[24px] sm:text-5xl lg:text-6xl xl:text-7xl whitespace-nowrap sm:whitespace-normal">
                {data.headline.split("-")[0]}
              </span>
              <span className="text-gradient-gold block min-h-[1.2em] text-[20px] min-[360px]:text-[22px] min-[400px]:text-[24px] sm:text-5xl lg:text-6xl xl:text-7xl">
                {currentText}
                <span className="animate-blink ml-1 text-primary">|</span>
              </span>
            </h1>

            {/* Subheadline */}
            {data.subheadline && (
              <p className="reveal reveal-delay-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                {data.subheadline}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="reveal reveal-delay-5 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={data.ctaHref}
                className="btn-primary-gold w-full sm:w-auto"
                onClick={() => handleCTAClick("hero_shop_collection", data.ctaHref)}
              >
                <span>{isVi ? "XEM BỘ SƯU TẬP" : "SHOP COLLECTION"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#categories"
                className="btn-outline-light w-full sm:w-auto"
                onClick={() => handleCTAClick("hero_explore", "#categories")}
              >
                <span>{isVi ? "KHÁM PHÁ SẢN PHẨM" : "EXPLORE PRODUCTS"}</span>
              </a>
            </div>
          </div>

          {/* Right: Product Carousel Card */}
          <div className="lg:col-span-5 reveal reveal-right reveal-delay-3">
            <div className="relative w-full group">
              {/* Left Arrow Button */}
              <button
                onClick={handlePrev}
                className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full glass-panel border border-border/40 flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
                aria-label={isVi ? "Sản phẩm trước" : "Previous product"}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={handleNext}
                className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full glass-panel border border-border/40 flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
                aria-label={isVi ? "Sản phẩm tiếp theo" : "Next product"}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={tiltStyle}
                className="relative w-full rounded-2xl overflow-hidden glass-panel border border-border/60 shadow-2xl flex flex-col group/card transition-all duration-300"
              >
              {/* Glare effect */}
              <div
                className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
                style={glareStyle}
              />

              {/* Card background */}
              <div className="absolute inset-0 z-0 pointer-events-none select-none">
                <Image
                  src="/images/background/background1.png"
                  alt="Card background pattern"
                  fill
                  className="object-cover object-center opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              </div>

              {/* Carousel slides */}
              <div className="relative w-full z-10">
                {HERO_PRODUCTS.map((prod, index) => {
                  const isActive = index === activeIndex
                  return (
                    <div
                      key={prod.id}
                      className={`flex flex-col transition-all duration-700 ease-in-out ${
                        isActive
                          ? "opacity-100 scale-100 pointer-events-auto relative"
                          : "opacity-0 scale-95 pointer-events-none absolute inset-0"
                      }`}
                    >
                      {/* Product Image — uses aspect ratio to size naturally, no fixed black box */}
                      <div className="relative w-full overflow-hidden flex items-center justify-center bg-transparent">
                        {/* Subtle radial glow behind product */}
                        <div className="absolute inset-0 bg-radial-gradient" style={{ background: "radial-gradient(ellipse at center, rgba(255,194,14,0.06) 0%, transparent 70%)" }} />
                        <div
                          className="relative w-full select-none transition-transform duration-700 group-hover/card:scale-105"
                          style={{ aspectRatio: "4/3" }}
                        >
                          <Image
                            src={prod.image}
                            alt={isVi ? prod.nameVi : prod.nameEn}
                            fill
                            className={`object-contain drop-shadow-2xl animate-float-gentle-${(index % 4) + 1}`}
                            style={{ padding: "1rem" }}
                          />
                        </div>
                      </div>

                      {/* Product details — sits right under the image */}
                      <div className="px-5 pt-3 pb-10 space-y-2 relative z-10 border-t border-border/20">
                        <div>
                          <span className="text-[9px] font-bold text-primary uppercase tracking-editorial-wide">
                            {isVi ? prod.tagVi : prod.tagEn}
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-foreground line-clamp-1 group-hover/card:text-primary transition-colors mt-1">
                            {isVi ? prod.nameVi : prod.nameEn}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {isVi ? prod.descVi : prod.descEn}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border/20 mt-1">
                          <span className="text-sm font-extrabold text-primary">
                            {formatPrice(prod.price)}
                          </span>
                          <a
                            href={prod.target}
                            className="inline-flex items-center text-[10px] font-bold text-primary hover:text-primary/80 transition-colors gap-1 tracking-wider uppercase"
                            onClick={() => handleCTAClick(`hero_carousel_${prod.id}`, prod.target)}
                          >
                            <span>{isVi ? "Xem chi tiết" : "View Details"}</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Pagination Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {HERO_PRODUCTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveIndex(i)
                      handleCTAClick(`hero_indicator_${i}`, "#")
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === i
                        ? "bg-primary w-6"
                        : "bg-muted-foreground/25 hover:bg-muted-foreground/50 w-1.5"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Stats Bar */}
        <div className="reveal reveal-delay-6 mt-12 lg:mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto lg:mx-0">
            {trustStats.map((stat, index) => {
              const IconComp = stat.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                    <IconComp className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="block text-lg font-extrabold text-foreground leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-editorial-wide leading-none mt-0.5">
                      {isVi ? stat.labelVi : stat.labelEn}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden lg:flex justify-center mt-12">
          <a href="#categories" className="scroll-indicator group" aria-label="Scroll down">
            <span className="scroll-indicator-text group-hover:text-primary transition-colors">
              {isVi ? "CUỘN XUỐNG" : "SCROLL DOWN"}
            </span>
            <div className="scroll-indicator-line" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
