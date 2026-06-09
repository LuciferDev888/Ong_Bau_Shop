"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Timer, Copy, Check, Percent } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { PromoProps } from "@/types/landing"
import { useLanguage } from "@/hooks/useLanguage"

interface BilingualPromoProps {
  vi: PromoProps
  en: PromoProps
}

export function PromoSection({ vi, en }: BilingualPromoProps) {
  const { locale } = useLanguage()
  const data = locale === "vi" ? vi : en
  const isVi = locale === "vi"

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

  return (
    <section id="promo" className="py-20 bg-dark-gradient relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel rounded-3xl border border-border overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Promo Info */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/25 text-primary text-xs font-bold uppercase tracking-wider self-start">
                <Percent className="w-4 h-4" />
                <span>{isVi ? "Ưu Đãi Thời Gian Có Hạn" : "Limited Time Offer"}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gradient-gold uppercase leading-tight">
                {data.title}
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {data.description}
              </p>

              {data.highlightText && (
                <div className="bg-secondary/60 border-l-4 border-primary rounded-r-lg p-4 font-semibold text-foreground text-sm sm:text-base">
                  {data.highlightText}
                </div>
              )}

              {/* Countdown Timer */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground/80 uppercase tracking-widest">
                  <Timer className="w-4 h-4 text-primary animate-pulse" />
                  <span>{isVi ? "Ưu Đãi Kết Thúc Trong" : "Promotion Ends In"}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Days */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-secondary/80 border border-border flex items-center justify-center text-lg sm:text-2xl font-bold text-foreground font-mono">
                      {time.days}
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase mt-1 tracking-wider">
                      {isVi ? "Ngày" : "Days"}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-primary font-mono">:</span>
                  {/* Hours */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-secondary/80 border border-border flex items-center justify-center text-lg sm:text-2xl font-bold text-foreground font-mono">
                      {time.hours}
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase mt-1 tracking-wider">
                      {isVi ? "Giờ" : "Hours"}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-primary font-mono">:</span>
                  {/* Minutes */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-secondary/80 border border-border flex items-center justify-center text-lg sm:text-2xl font-bold text-foreground font-mono">
                      {time.minutes}
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase mt-1 tracking-wider">
                      {isVi ? "Phút" : "Min"}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-primary font-mono">:</span>
                  {/* Seconds */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-secondary/80 border border-border flex items-center justify-center text-lg sm:text-2xl font-bold text-primary font-mono">
                      {time.seconds}
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase mt-1 tracking-wider">
                      {isVi ? "Giây" : "Sec"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Promo code and CTA */}
              {data.discountCode && (
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <a
                    href={data.ctaHref}
                    className="w-full sm:w-auto text-center bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-8 py-3.5 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-primary/25 hover:shadow-primary/35"
                    onClick={handleCTAClick}
                  >
                    {data.ctaText}
                  </a>

                  <div className="w-full sm:w-auto flex items-center justify-between gap-3 bg-secondary/80 border border-border px-5 py-3 rounded-xl">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                        {isVi ? "Mã Giảm Giá" : "Coupon Code"}
                      </span>
                      <span className="text-sm font-extrabold text-foreground font-mono select-all">
                        {data.discountCode}
                      </span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="p-2 bg-background hover:bg-secondary/40 text-primary border border-border rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
                      aria-label="Copy code"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-green-500 font-sans">{isVi ? "Đã Sao Chép" : "Copied"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-foreground/80 font-sans">{isVi ? "Sao Chép" : "Copy"}</span>
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
