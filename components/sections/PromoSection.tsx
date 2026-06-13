"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Timer, Copy, Check, Percent } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { PromoProps } from "@/types/landing"
import { useLanguage } from "@/hooks/useLanguage"
import { useScrollReveal } from "@/hooks/useScrollReveal"

interface BilingualPromoProps {
  vi: PromoProps
  en: PromoProps
}

export function PromoSection({ vi, en }: BilingualPromoProps) {
  const { locale } = useLanguage()
  const data = locale === "vi" ? vi : en
  const isVi = locale === "vi"
  const sectionRef = useScrollReveal()

  const [timeLeft, setTimeLeft] = useState(data.endsInSeconds)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setTimeLeft(data.endsInSeconds)
  }, [data.endsInSeconds])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : data.endsInSeconds))
    }, 1000)
    return () => clearInterval(timer)
  }, [data.endsInSeconds])

  const formatTime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24))
    const h = Math.floor((seconds % (3600 * 24)) / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60

    return {
      days: String(d).padStart(2, "0"),
      hours: String(h).padStart(2, "0"),
      minutes: String(m).padStart(2, "0"),
      seconds: String(s).padStart(2, "0"),
    }
  }

  const handleCopyCode = () => {
    if (data.discountCode) {
      navigator.clipboard.writeText(data.discountCode)
      setCopied(true)
      trackCTAClick(`copy_promo_code_${data.discountCode}`, "promo")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleCTAClick = () => {
    trackCTAClick("promo_cta", "promo")
  }

  const time = formatTime(timeLeft)

  const timeBlocks = [
    { value: time.days, labelVi: "Ngày", labelEn: "Days" },
    { value: time.hours, labelVi: "Giờ", labelEn: "Hours" },
    { value: time.minutes, labelVi: "Phút", labelEn: "Min" },
    { value: time.seconds, labelVi: "Giây", labelEn: "Sec", isAccent: true },
  ]

  return (
    <section
      id="promo"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-gradient overflow-hidden"
    >
      <div className="section-divider-top" />
      <div className="glow-orb glow-orb-gold w-[400px] h-[400px] top-1/2 right-0 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="reveal glass-panel rounded-2xl border border-border/40 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Promo Info */}
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-14 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/8 border border-primary/15 text-primary text-[10px] font-bold uppercase tracking-editorial self-start">
                <Percent className="w-3.5 h-3.5" />
                <span>{isVi ? "Ưu Đãi Thời Gian Có Hạn" : "Limited Time Offer"}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-gradient-gold uppercase leading-tight">
                {data.title}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {data.description}
              </p>

              {data.highlightText && (
                <div className="bg-card/60 border-l-2 border-primary rounded-r-lg p-4 font-semibold text-foreground text-sm">
                  {data.highlightText}
                </div>
              )}

              {/* Countdown */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/70 uppercase tracking-editorial-wide">
                  <Timer className="w-3.5 h-3.5 text-primary animate-pulse" />
                  <span>{isVi ? "Ưu Đãi Kết Thúc Trong" : "Promotion Ends In"}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  {timeBlocks.map((block, idx) => (
                    <div key={idx} className="flex items-center gap-2 sm:gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-card/80 border border-border/40 flex items-center justify-center text-lg sm:text-xl font-bold font-mono ${
                            block.isAccent ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {block.value}
                        </div>
                        <span className="text-[8px] text-muted-foreground uppercase mt-1 tracking-wider font-medium">
                          {isVi ? block.labelVi : block.labelEn}
                        </span>
                      </div>
                      {idx < timeBlocks.length - 1 && (
                        <span className="text-lg font-bold text-primary/50 font-mono mb-4">:</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo code & CTA */}
              {data.discountCode && (
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <a
                    href={data.ctaHref}
                    className="btn-primary-gold w-full sm:w-auto !text-xs"
                    onClick={handleCTAClick}
                  >
                    {data.ctaText}
                  </a>

                  <div className="w-full sm:w-auto flex items-center justify-between gap-3 bg-card/60 border border-border/40 px-4 py-2.5 rounded-xl">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-muted-foreground uppercase tracking-editorial-wide font-medium">
                        {isVi ? "Mã Giảm Giá" : "Coupon Code"}
                      </span>
                      <span className="text-sm font-extrabold text-foreground font-mono select-all">
                        {data.discountCode}
                      </span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="p-2 bg-background/60 hover:bg-card text-primary border border-border/40 rounded-lg transition-colors flex items-center gap-1.5 text-[10px] font-bold"
                      aria-label="Copy code"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-500" />
                          <span className="text-green-500 font-sans">{isVi ? "Đã Sao Chép" : "Copied"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-foreground/70 font-sans">{isVi ? "Sao Chép" : "Copy"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Promo Image */}
            <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-[500px]">
              <Image
                src={data.image}
                alt="Promo highlight panel background"
                fill
                className="object-cover object-center select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-background via-transparent to-transparent z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromoSection
