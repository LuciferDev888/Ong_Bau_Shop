"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ShoppingBag, ShieldCheck, Zap, Plus, X } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { ProductItem } from "@/types/landing"
import { useLanguage } from "@/hooks/useLanguage"
import { useScrollReveal } from "@/hooks/useScrollReveal"
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
    image: "/images/transparent_background_2/86a50c14-df9c-4509-bb1a-8516ced85ecf.png",
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
    id: "boot-3",
    nameVi: "Kamito Cobra Pro TF - Đen Ánh Kim",
    nameEn: "Kamito Cobra Pro TF - Black/Gold Edition",
    descVi: "Thiết kế huyền bí với sắc đen phối vàng kim sang trọng. Form giày thon gọn, hỗ trợ xoay trở linh hoạt trong phạm vi hẹp và tăng cường lực sút mu bàn chân.",
    descEn: "Mysterious design with luxury black and gold colorway. Slim fit design supporting flexible turns in tight spaces and enhancing instep shooting power.",
    price: 890000,
    originalPrice: 1250000,
    image: "/images/transparent_background_2/39c4afda-5229-4902-9698-24de16a5d985.png",
    rating: 4.9,
    specs: [
      { labelVi: "Linh Hoạt (Agility)", labelEn: "Agility", value: 94 },
      { labelVi: "Lực Sút (Power)", labelEn: "Shot Power", value: 91 },
      { labelVi: "Độ Bám Sân (Traction)", labelEn: "Turf Traction", value: 95 },
    ],
    comboVi: {
      title: "COMBO TẤN CÔNG BÙNG NỔ",
      items: ["Giày Cobra Pro Black/Gold", "Vớ Chống Trượt Kamito Pro", "Băng Cổ Chân Bảo Vệ"],
    },
    comboEn: {
      title: "EXPLOSIVE ATTACK COMBO",
      items: ["Cobra Pro Black/Gold Cleats", "Kamito Pro Grip Socks", "Ankle Support Wrap"],
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
    image: "/images/transparent_background_2/boot-ta11.png",
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
  {
    id: "clo-kam-4",
    nameVi: "Bộ Quần Áo Đá Bóng Kamito Cobra - Xanh Vàng",
    nameEn: "Kamito Cobra Football Kit - Blue/Gold",
    descVi: "Chất liệu thun lạnh cao cấp thế hệ mới, co giãn 4 chiều tối ưu. Công nghệ thấm hút mồ hôi siêu tốc giúp cầu thủ luôn khô thoáng và thoải mái suốt trận đấu.",
    descEn: "Next-gen premium cool-dry fabric with optimal 4-way stretch. Advanced moisture-wicking technology keeps players dry and comfortable throughout the match.",
    price: 269000,
    originalPrice: 379000,
    image: "/images/transparent_background_2/Ao_thi_dau.png",
    rating: 4.9,
    specs: [
      { labelVi: "Thoáng Khí (Breathability)", labelEn: "Breathability", value: 96 },
      { labelVi: "Co Giãn (Stretch)", labelEn: "Stretchability", value: 95 },
      { labelVi: "Nhẹ Nhàng (Lightweight)", labelEn: "Lightness", value: 92 },
    ],
    comboVi: {
      title: "COMBO ĐỒNG PHỤC RA SÂN",
      items: ["Bộ Kamito Cobra Blue/Gold", "Vớ Dệt Kim Cổ Cao", "Băng Keo Cuốn Cơ Thể Thao"],
    },
    comboEn: {
      title: "TEAM MATCHDAY KIT COMBO",
      items: ["Kamito Cobra Blue/Gold Kit", "High-cut Knit Socks", "Athletic Sports Tape"],
    },
  },
  {
    id: "clo-kam-8",
    nameVi: "Bộ Quần Áo Đá Bóng Kamito Cobra - Đen Vàng",
    nameEn: "Kamito Cobra Football Kit - Black/Gold",
    descVi: "Phiên bản đặc biệt phối màu đen vàng cực ngầu và sang trọng. Vải dệt tổ ong thoáng khí, kháng khuẩn và khử mùi hiệu quả khi vận động cường độ cao.",
    descEn: "Special edition featuring a cool and premium black/gold design. Breathable honeycomb knit fabric with effective anti-bacterial and odor-resistant tech.",
    price: 285000,
    originalPrice: 395000,
    image: "/images/transparent_background_2/60fbca14-c836-4d6c-b85c-4555e5b36427.png",
    rating: 4.9,
    specs: [
      { labelVi: "Thoáng Khí (Breathability)", labelEn: "Breathability", value: 98 },
      { labelVi: "Độ Bền (Durability)", labelEn: "Durability", value: 94 },
      { labelVi: "Kháng Khuẩn (Anti-Bacterial)", labelEn: "Anti-Bacterial", value: 90 },
    ],
    comboVi: {
      title: "COMBO CHIẾN BINH ĐỈNH CAO",
      items: ["Bộ Kamito Cobra Black/Gold", "Vớ Chống Trượt Kamito Pro", "Túi Rút Đựng Đồ Thể Thao"],
    },
    comboEn: {
      title: "ULTIMATE WARRIOR COMBO",
      items: ["Kamito Cobra Black/Gold Kit", "Kamito Pro Grip Socks", "Drawstring Sports Bag"],
    },
  },
]

export function SpotlightSection({ products }: { products: ProductItem[] }) {
  const { locale } = useLanguage()
  const isVi = locale === "vi"
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionRef = useScrollReveal()

  const currentItem = SPOTLIGHT_ITEMS[activeIndex]
  if (!currentItem) return null

  const triggerTransition = (nextIndex: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIndex(nextIndex)
      setIsTransitioning(false)
    }, 300)
  }

  const handleNext = () => {
    if (isTransitioning) return
    const nextIndex = (activeIndex + 1) % SPOTLIGHT_ITEMS.length
    triggerTransition(nextIndex)
    trackCTAClick("spotlight_next", "spotlight")
  }

  const handlePrev = () => {
    if (isTransitioning) return
    const prevIndex = (activeIndex - 1 + SPOTLIGHT_ITEMS.length) % SPOTLIGHT_ITEMS.length
    triggerTransition(prevIndex)
    trackCTAClick("spotlight_prev", "spotlight")
  }

  const handleOpenOrder = () => {
    const prod = products.find((p) => p.id === currentItem.id)
    if (prod) {
      setSelectedProduct(prod)
    } else {
      setSelectedProduct({
        id: currentItem.id,
        name: isVi ? currentItem.nameVi : currentItem.nameEn,
        category: currentItem.id.startsWith("boot") ? "boots" : "clothes",
        price: currentItem.price,
        originalPrice: currentItem.originalPrice,
        rating: currentItem.rating,
        reviewsCount: 100,
        image: currentItem.image,
        sizes: currentItem.id.startsWith("boot") ? ["39", "40", "41", "42", "43"] : ["S", "M", "L", "XL", "XXL"],
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

  const displayName = isVi ? currentItem.nameVi : currentItem.nameEn
  const displayDesc = isVi ? currentItem.descVi : currentItem.descEn
  const displayComboTitle = isVi ? currentItem.comboVi.title : currentItem.comboEn.title
  const displayComboItems = isVi ? currentItem.comboVi.items : currentItem.comboEn.items

  return (
    <section
      id="spotlight"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-gradient-reverse overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center select-none pointer-events-none" style={{ backgroundImage: "url('/images/background/background2.png')" }} />
      <div className="absolute inset-0 bg-black/65 select-none pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 select-none pointer-events-none" />

      {/* Decorative */}
      <div className="section-divider-top" />
      <div className="pitch-pattern" />
      <div className="glow-orb glow-orb-gold w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Large watermark text */}
      <div className="absolute top-8 right-8 text-[100px] lg:text-[140px] font-black text-foreground/[0.015] select-none pointer-events-none tracking-widest leading-none uppercase">
        ELITE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="reveal">
            <div className="section-number justify-center">
              <span className="num">03</span>
              <span>{isVi ? "SẢN PHẨM CHỦ LỰC" : "SIGNATURE PRODUCTS"}</span>
            </div>
          </div>

          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight">
            {isVi ? "SẢN PHẨM" : "SIGNATURE"}{" "}
            <span className="text-gradient-gold">
              {isVi ? "CHỦ LỰC" : "SPOTLIGHT"}
            </span>
          </h2>
          <p className="reveal reveal-delay-2 text-sm sm:text-base text-muted-foreground">
            {isVi
              ? "Trải nghiệm dòng giày bóng đá đỉnh cao được tinh chỉnh tối đa hiệu năng"
              : "Experience cutting-edge football cleats optimized for elite athletes"}
          </p>
          <div className="reveal reveal-delay-2 decorative-line-h mx-auto" />
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Info */}
          <div className="reveal reveal-left lg:col-span-4">
            <div
              className={`space-y-6 text-center lg:text-left transition-all duration-300 ease-in-out ${
                isTransitioning ? "opacity-0 translate-y-4 blur-sm" : "opacity-100 translate-y-0 blur-none"
              }`}
            >
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="w-9 h-9 rounded-full border border-primary/20 bg-primary/10 text-primary flex items-center justify-center font-bold text-xs font-mono">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-[9px] font-bold text-primary tracking-editorial-wide uppercase bg-background/80 px-3 py-1 rounded border border-primary/10">
                {isVi ? "BÁN CHẠY NHẤT" : "BEST SELLER"}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground uppercase tracking-tight leading-tight">
              {displayName}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {displayDesc}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-3">
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
              className="btn-primary-gold"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isVi ? "ĐẶT HÀNG NGAY" : "ORDER NOW"}</span>
            </button>
            </div>
          </div>

          {/* Center Column: Product Image */}
          <div className="reveal lg:col-span-4 flex flex-col items-center justify-center relative py-6">
            {/* Navigation arrows */}
            <div className="flex items-center justify-between w-full absolute top-1/2 -translate-y-1/2 z-20 px-2 lg:-mx-4 pointer-events-none">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-card/80 hover:bg-primary border border-border/60 hover:border-primary text-foreground/70 hover:text-primary-foreground flex items-center justify-center transition-all transform active:scale-90 pointer-events-auto backdrop-blur-sm"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-card/80 hover:bg-primary border border-border/60 hover:border-primary text-foreground/70 hover:text-primary-foreground flex items-center justify-center transition-all transform active:scale-90 pointer-events-auto backdrop-blur-sm"
                aria-label="Next product"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Orbital ring */}
            <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px] rounded-full border border-primary/10 flex items-center justify-center">
              <div className="absolute inset-2 rounded-full border border-dashed border-primary/15 animate-spin [animation-duration:50s]" />
              <div className="absolute inset-6 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

              <div className="animate-float-slow">
                <div
                  className={`relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] transition-all duration-500 select-none ${
                    isTransitioning
                      ? "opacity-0 scale-75 rotate-12 blur-md"
                      : "opacity-100 scale-100 rotate-0 blur-none hover:scale-110"
                  }`}
                >
                  <Image
                    src={currentItem.image}
                    alt={displayName}
                    fill
                    priority
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 360px"
                    className="object-contain drop-shadow-[0_15px_35px_rgba(255,194,14,0.25)]"
                  />
                </div>
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex gap-2 mt-8">
              {SPOTLIGHT_ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (isTransitioning || activeIndex === i) return
                    triggerTransition(i)
                    trackCTAClick(`spotlight_indicator_${i}`, "spotlight")
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? "bg-primary w-6"
                      : "bg-secondary border border-border/60 w-3 hover:bg-muted"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Specs & Combo */}
          <div className="reveal reveal-right lg:col-span-4">
            <div
              className={`space-y-6 transition-all duration-300 ease-in-out ${
                isTransitioning ? "opacity-0 -translate-y-4 blur-sm" : "opacity-100 -translate-y-0 blur-none"
              }`}
            >
            {/* Performance Metrics */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <h4 className="text-[10px] font-bold text-primary tracking-editorial-wide uppercase flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" />
                <span>{isVi ? "CHỈ SỐ HIỆU NĂNG" : "PERFORMANCE METRICS"}</span>
              </h4>
              <div className="space-y-4 pt-1">
                {currentItem.specs.map((spec, index) => {
                  const label = isVi ? spec.labelVi : spec.labelEn
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-foreground/80">{label}</span>
                        <span className="text-primary font-mono font-bold">{spec.value}/100</span>
                      </div>
                      <div className="w-full h-1.5 bg-background border border-border/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold-gradient rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${spec.value}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Combo Pack */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <h4 className="text-[10px] font-bold text-primary tracking-editorial-wide uppercase flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{displayComboTitle}</span>
              </h4>
              <div className="space-y-3 pt-1">
                {displayComboItems.map((cItem, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/15 text-primary flex items-center justify-center font-bold text-[10px] shrink-0">
                      {index === 0 ? <Plus className="w-3 h-3" /> : index}
                    </div>
                    <span className="text-sm font-medium text-foreground/85">{cItem}</span>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead form modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div
            className="absolute inset-0 bg-transparent"
            onClick={() => setSelectedProduct(null)}
          />
          <div className="relative z-10 w-full max-w-xl">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 text-foreground/80 hover:text-primary transition-colors bg-card border border-border rounded-lg"
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
