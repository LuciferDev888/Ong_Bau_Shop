"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { CategoriesProps } from "@/types/landing"
import { useLanguage } from "@/hooks/useLanguage"

interface BilingualCategoriesProps {
  vi: CategoriesProps
  en: CategoriesProps
}

export function CategoriesSection({ vi, en }: BilingualCategoriesProps) {
  const { locale } = useLanguage()
  const data = locale === "vi" ? vi : en
  const isVi = locale === "vi"

  const handleCategoryClick = (categoryName: string) => {
    trackCTAClick(`category_${categoryName}`, "categories")
  }

  return (
    <section id="categories" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.items.map((category) => (
            <a
              key={category.id}
              href={`#products`}
              onClick={() => handleCategoryClick(category.slug)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden glass-panel border border-border flex flex-col justify-end p-6 glass-card-hover"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-w-640px) 100vw, 25vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 select-none brightness-[0.7] group-hover:brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>

              <div className="relative z-10 space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] sm:text-xs font-bold text-primary tracking-widest uppercase bg-primary-foreground/90 px-2.5 py-1 rounded-md inline-block">
                  {category.itemCount} {isVi ? "Sản phẩm" : "Products"}
                </span>
                <div className="flex items-center justify-between pt-1">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
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
