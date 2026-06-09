"use client"

import Image from "next/image"
import { Star, CheckCircle } from "lucide-react"
import { TestimonialsProps } from "@/types/landing"
import { useLanguage } from "@/hooks/useLanguage"

interface BilingualTestimonialsProps {
  vi: TestimonialsProps
  en: TestimonialsProps
}

export function TestimonialsSection({ vi, en }: BilingualTestimonialsProps) {
  const { locale } = useLanguage()
  const data = locale === "vi" ? vi : en
  const isVi = locale === "vi"

  return (
    <section id="testimonials" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />

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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.items.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative rounded-2xl border border-border bg-card/40 p-8 flex flex-col justify-between glass-card-hover"
            >
              <span className="absolute top-6 right-8 text-6xl text-primary/10 font-serif select-none pointer-events-none">
                &ldquo;
              </span>

              <div className="space-y-4">
                <div className="flex items-center text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? "fill-primary" : "text-border"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border/60">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-foreground text-sm sm:text-base">
                      {testimonial.name}
                    </span>
                    {testimonial.verified && (
                      <span
                        title={isVi ? "Khách hàng đã xác minh" : "Verified Customer"}
                        className="shrink-0 flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 fill-green-500/10" />
                      </span>
                    )}
                  </div>
                  <span className="block text-xs text-muted-foreground font-semibold mt-0.5">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
