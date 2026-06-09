"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ShoppingBag, ShieldCheck, Zap, Plus, X } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { ProductItem } from "@/types/landing"
import { useLanguage } from "@/hooks/useLanguage"
import { LeadForm } from "../forms/LeadForm"

interface SpotlightItem {
  id: string
  nameVi: string
  nameEn: string
  descVi: string
  descEn: string
  price: number
  originalPrice: number
  image: string
  rating: number
  specs: {
    labelVi: string
    labelEn: string
    value: number
  }[]
  comboVi: {
    title: string
    items: string[]
  }
  comboEn: {
    title: string
    items: string[]
  }
}

const SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    id: "boot-1",
    nameVi: "Kamito Cobra Pro TF - Phiên Bản Hoàng Kim",
    nameEn: "Kamito Cobra Pro TF - Gold/Black Edition",
    descVi: "Siêu phẩm giày bóng đá đinh dăm thế hệ mới từ Kamito. Upper bằng da microfiber siêu mềm tăng cảm giác chạm bóng tinh tế, đế cao su chuyên biệt giảm chấn hoàn hảo bảo vệ khớp gối.",
    descEn: "Next-gen premium turf cleats designed by Kamito. Featuring an ultra-soft microfiber leather upper for refined ball touch and a rubber damping outsole for optimal joint cushioning.",
    price: 850000,
    originalPrice: 1200000,
    image: "/images/Football_boots/548210470_695313350228768_6976189092250864576_n.jpg",
    rating: 5.0,
    specs: [
      { labelVi: "Tốc Độ (Speed)", labelEn: "Sprint Speed", value: 92 },
      { labelVi: "Kiểm Soát (Control)", labelEn: "Ball Control", value: 95 },
      { labelVi: "Độ Bám Sân (Traction)", labelEn: "Turf Traction", value: 98 },
    ],
    comboVi: {
      title: "COMBO THI ĐẤU ĐỈNH CAO",
      items: ["Giày Cobra Pro Gold", "Vớ Chống Trượt Kamito Pro", "Balo Ông Bầu Pro"],
    },
    comboEn: {
      title: "PRO CHAMPION COMBO",
      items: ["Cobra Pro Gold Cleats", "Kamito Pro Grip Socks", "Ong Bau Pro Backpack"],
    },
  },
  {
    id: "boot-10",
    nameVi: "Kamito TA11 Premium TF - Chữ Ký Tuyển Thủ",
    nameEn: "Kamito TA11 Premium TF - Player Signature",
    descVi: "Dòng giày phân khúc cao cấp hợp tác thiết kế cùng danh thủ Tuấn Anh. Chất liệu da mềm mại ôm sát phom chân Việt, đế đinh dăm bám sân kể cả khi trời mưa.",
    descEn: "High-end signature cleats co-designed with national star Tuan Anh. Tailored to wide foot shapes with a grippy rubber outsole that excels in wet playing conditions.",
    price: 890000,
    originalPrice: 1300000,
    image: "/images/Football_boots/565365642_723586157401487_5029011922515547216_n.jpg",
    rating: 4.9,
    specs: [
      { labelVi: "Tốc Độ (Speed)", labelEn: "Sprint Speed", value: 88 },
      { labelVi: "Kiểm Soát (Control)", labelEn: "Ball Control", value: 97 },
      { labelVi: "Độ Bám Sân (Traction)", labelEn: "Turf Traction", value: 94 },
    ],
    comboVi: {
      title: "COMBO KIẾN TẠO LỐI CHƠI",
      items: ["Giày TA11 Premium", "Vớ Chống Trượt Sợi Tre", "Băng Khớp Gối Silicon"],
    },
    comboEn: {
      title: "PLAYMAKER COMBO PACK",
      items: ["TA11 Premium Cleats", "Bamboo Fiber Grip Socks", "Silicon Knee Guard"],
    },
  },
]

export function SpotlightSection({ products }: { products: ProductItem[] }) {
  const { locale } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)

  const currentItem = SPOTLIGHT_ITEMS[activeIndex]
  if (!currentItem) return null

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SPOTLIGHT_ITEMS.length)
    trackCTAClick("spotlight_next", "spotlight")
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SPOTLIGHT_ITEMS.length) % SPOTLIGHT_ITEMS.length)
    trackCTAClick("spotlight_prev", "spotlight")
  }

  const handleOpenOrder = () => {
    const prod = products.find((p) => p.id === currentItem.id)
    if (prod) {
      setSelectedProduct(prod)
    } else {
      // Fallback in case ID mismatch
      setSelectedProduct({
        id: currentItem.id,
        name: isVi ? currentItem.nameVi : currentItem.nameEn,
        category: "boots",
        price: currentItem.price,
        originalPrice: currentItem.originalPrice,
        rating: currentItem.rating,
        reviewsCount: 100,
        image: currentItem.image,
        sizes: ["39", "40", "41", "42", "43"],
      })
    }
    trackCTAClick(`spotlight_order_${currentItem.id}`, "spotlight")
  }

  const formatPrice = (price: number) => {
    if (locale === "en") {
      const usdPrice = (price / 24000).toFixed(2)
      return `$${usdPrice} USD`
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const isVi = locale === "vi"
  const displayName = isVi ? currentItem.nameVi : currentItem.nameEn
  const displayDesc = isVi ? currentItem.descVi : currentItem.descEn
  const displayComboTitle = isVi ? currentItem.comboVi.title : currentItem.comboEn.title
  const displayComboItems = isVi ? currentItem.comboVi.items : currentItem.comboEn.items

  return (
    <section id="spotlight" className="py-24 bg-dark-gradient relative overflow-hidden border-t border-border/40">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-10 right-10 text-[120px] font-extrabold text-foreground/[0.01] select-none pointer-events-none tracking-widest leading-none font-mono">
        ELITE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
            {isVi ? "SẢN PHẨM" : "SIGNATURE"}{" "}
            <span className="text-gradient-gold">
              {isVi ? "CHỦ LỰC" : "SPOTLIGHT"}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {isVi
              ? "Trải nghiệm dòng giày bóng đá đỉnh cao được tinh chỉnh tối đa hiệu năng"
              : "Experience cutting-edge football cleats optimized for elite athletes"}
          </p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Info Box */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="w-10 h-10 rounded-full border border-primary/20 bg-primary/10 text-primary flex items-center justify-center font-bold text-sm font-mono">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary-foreground/90 px-3 py-1 rounded">
                {isVi ? "BÁN CHẠY NHẤT" : "BEST SELLER"}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground transition-all duration-300">
              {displayName}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed transition-all duration-300">
              {displayDesc}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="text-2xl font-extrabold text-primary">
                {formatPrice(currentItem.price)}
              </span>
              {currentItem.originalPrice > currentItem.price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(currentItem.originalPrice)}
                </span>
              )}
            </div>

            <button
              onClick={handleOpenOrder}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-8 py-3.5 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-primary/20 hover:shadow-primary/30"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{isVi ? "ĐẶT HÀNG NGAY" : "ORDER NOW"}</span>
            </button>
          </div>

          {/* Center Column: Big Image Orbit */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-6">
            <div className="flex items-center justify-between w-full absolute top-1/2 -translate-y-1/2 z-20 px-2 lg:-px-4 pointer-events-none">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-secondary/80 hover:bg-primary border border-border hover:border-primary text-foreground hover:text-primary-foreground flex items-center justify-center transition-all transform active:scale-90 pointer-events-auto shadow-md"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-secondary/80 hover:bg-primary border border-border hover:border-primary text-foreground hover:text-primary-foreground flex items-center justify-center transition-all transform active:scale-90 pointer-events-auto shadow-md"
                aria-label="Next product"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-primary/10 flex items-center justify-center">
              <div className="absolute inset-2 rounded-full border border-dashed border-primary/20 animate-spin [animation-duration:40s]" />
              <div className="absolute inset-8 rounded-full bg-primary/5 blur-xl pointer-events-none" />
              
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 transition-all duration-500 transform hover:scale-110 select-none animate-float">
                <Image
                  src={currentItem.image}
                  alt={displayName}
                  fill
                  priority
                  className="object-contain drop-shadow-[0_15px_30px_rgba(255,194,14,0.3)]"
                />
              </div>
            </div>

            <div className="flex gap-2.5 mt-8">
              {SPOTLIGHT_ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveIndex(i)
                    trackCTAClick(`spotlight_indicator_${i}`, "spotlight")
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === i ? "bg-primary w-6" : "bg-secondary border border-border"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Spec Meters & Pairs */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-secondary/40 border border-border/60 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>{isVi ? "CHỈ SỐ HIỆU NĂNG" : "PERFORMANCE METRICS"}</span>
              </h4>
              <div className="space-y-4 pt-2">
                {currentItem.specs.map((spec, index) => {
                  const label = isVi ? spec.labelVi : spec.labelEn
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-foreground/90">{label}</span>
                        <span className="text-primary font-mono font-bold">{spec.value}/100</span>
                      </div>
                      <div className="w-full h-2 bg-background border border-border/40 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold-gradient transition-all duration-750 ease-out"
                          style={{ width: `${spec.value}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-secondary/40 border border-border/60 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{displayComboTitle}</span>
              </h4>
              <div className="space-y-3 pt-2">
                {displayComboItems.map((cItem, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/15 border border-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                      {index === 0 ? <Plus className="w-3.5 h-3.5" /> : index}
                    </div>
                    <span className="text-sm font-semibold text-foreground/90">{cItem}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Checkout lead form modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div
            className="absolute inset-0 bg-transparent"
            onClick={() => setSelectedProduct(null)}
          />
          <div className="relative z-10 w-full max-w-xl">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 text-foreground/80 hover:text-primary transition-colors bg-secondary/85 border border-border rounded-lg"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
            <LeadForm
              campaignName="spotlight_modal"
              products={products}
              defaultProductId={selectedProduct.id}
              onClose={() => setSelectedProduct(null)}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default SpotlightSection
