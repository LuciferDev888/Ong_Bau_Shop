"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { CategoriesProps } from "@/types/landing"
import { useLanguage } from "@/hooks/useLanguage"
import { useScrollReveal } from "@/hooks/useScrollReveal"

interface BilingualCategoriesProps {
  vi: CategoriesProps
  en: CategoriesProps
}

export function CategoriesSection({ vi, en }: BilingualCategoriesProps) {
  const { locale } = useLanguage()
  const data = locale === "vi" ? vi : en
  const isVi = locale === "vi"
  const sectionRef = useScrollReveal()

  const handleCategoryClick = (categoryName: string) => {
    trackCTAClick(`category_${categoryName}`, "categories")
  }

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-gradient overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center select-none pointer-events-none" style={{ backgroundImage: "url('/images/background/background1.png')" }} />
      <div className="absolute inset-0 bg-black/65 select-none pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 select-none pointer-events-none" />

      {/* Decorative elements */}
      <div className="section-divider-top" />
      <div className="pitch-pattern" />
      <div className="glow-orb glow-orb-gold w-[500px] h-[500px] top-1/2 -translate-y-1/2 left-[-15%]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="reveal">
            <div className="section-number justify-center">
              <span className="num">02</span>
              <span>{isVi ? "BỘ SƯU TẬP NỔI BẬT" : "FEATURED COLLECTION"}</span>
            </div>
          </div>

          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight">
            {data.title.split(" ")[0] || ""}{" "}
            <span className="text-gradient-gold">
              {data.title.split(" ").slice(1).join(" ") || ""}
            </span>
          </h2>

          {data.subtitle && (
            <p className="reveal reveal-delay-2 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          )}

          <div className="reveal reveal-delay-2 decorative-line-h mx-auto" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5" data-stagger="100">
          {data.items.map((category, index) => (
            <a
              key={category.id}
              href="#products"
              onClick={() => handleCategoryClick(category.slug)}
              className={`reveal reveal-delay-${Math.min(index + 1, 4)} group relative aspect-[3/4] rounded-2xl overflow-hidden glass-panel border border-border/40 flex flex-col justify-end p-4 sm:p-6 glass-card-hover`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 select-none brightness-[0.5] group-hover:brightness-[0.65]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              </div>

              {/* Category number index */}
              <span className="absolute top-5 left-5 z-10 text-[10px] font-mono font-bold text-primary/40 tracking-widest">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="relative z-10 space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[9px] font-bold text-primary tracking-editorial-wide uppercase bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded-md inline-block border border-primary/10">
                  {category.itemCount} {isVi ? "Sản phẩm" : "Products"}
                </span>
                <div className="flex items-center justify-between pt-1">
                  <h3 className="text-sm sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection
