"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { Star, Flame, ShoppingBag, X, HelpCircle, ChevronDown } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { ProductsProps, ProductItem } from "@/types/landing"
import { LeadForm } from "../forms/LeadForm"
import { useLanguage } from "@/hooks/useLanguage"
import { useScrollReveal } from "@/hooks/useScrollReveal"

interface BilingualProductsProps {
  vi: ProductsProps
  en: ProductsProps
  items: ProductItem[]
}

export function ProductsSection({ vi, en, items: viItems }: BilingualProductsProps) {
  const { locale } = useLanguage()
  const [activeTab, setActiveTab] = useState<string>("boots")
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [animationKey, setAnimationKey] = useState<number>(0)
  const sectionRef = useScrollReveal()

  // Accordion state for product details panel
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    desc: true,
    specs: false,
    sizes: false
  })
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState<boolean>(false)

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const isVi = locale === "vi"
  const data = isVi ? vi : en
  const items = data.items || viItems

  const tabs = [
    { id: "boots", labelVi: "Giày Đá Bóng", labelEn: "Football Boots" },
    { id: "clothes", labelVi: "Quần Áo Đấu", labelEn: "Soccer Clothes" },
    { id: "balo", labelVi: "Balo Thể Thao", labelEn: "Sport Backpacks" },
    { id: "accessories", labelVi: "Phụ Kiện", labelEn: "Accessories" },
  ]

  const getProductDetails = (product: ProductItem) => {
    const isBoots = product.category === "boots"
    const isClothes = product.category === "clothes"
    const isBalo = product.category === "balo"

    if (isBoots) {
      return {
        shortDescription: isVi
          ? "Dòng giày bóng đá phân khúc cao cấp hỗ trợ bứt tốc vượt trội. Chất liệu da mềm ôm chân tối ưu cảm giác bóng, gót giày chắc chắn giảm chấn bảo vệ khớp gối."
          : "Premium football cleats engineered for explosive speed. Form-fitting soft leather upper optimizes ball touch, while the heel counter cushions knee joints.",
        keyFeatures: isVi
          ? [
              "Da Microfiber thế hệ mới mềm nhẹ ôm chân",
              "Đế đinh cao su chuyên biệt bám sân cực tốt",
              "Cổ giày mềm hạn chế chấn thương lật cổ chân"
            ]
          : [
              "Next-gen lightweight Microfiber leather upper",
              "Turf-specific traction studs prevent slippage",
              "Soft collar prevents ankle roll injuries"
            ],
        stockStatus: product.isHot
          ? (isVi ? "Còn hàng - Bán chạy" : "In Stock - Selling Fast")
          : (isVi ? "Còn hàng" : "In Stock"),
        badge: product.isHot
          ? (isVi ? "HOT BÁN CHẠY" : "HOT SELLER")
          : (isVi ? "TỐT NHẤT" : "BEST VALUE")
      }
    } else if (isClothes) {
      return {
        shortDescription: isVi
          ? "Bộ quần áo đá bóng vải thun mè tổ ong cao cấp, siêu nhẹ và thoáng mát tuyệt đối. Thiết kế ôm vừa vặn cho chuyển động thoải mái."
          : "Premium honeycomb knit football kit, ultra-lightweight and highly breathable. Ergonomic athletic fit allows maximum range of motion.",
        keyFeatures: isVi
          ? [
              "Công nghệ dệt tổ ong thoát ẩm nhanh gấp 2 lần",
              "Chất vải mè co giãn 4 chiều kháng khuẩn tối đa",
              "Hình in sắc nét bền màu không bong tróc"
            ]
          : [
              "Honeycomb weave dries moisture twice as fast",
              "4-way stretch fabric with anti-microbial tech",
              "High-definition sublimation prints do not fade"
            ],
        stockStatus: isVi ? "Còn hàng" : "In Stock",
        badge: product.isHot
          ? (isVi ? "HOT TREND" : "TRENDING")
          : (isVi ? "BỘ THI ĐẤU" : "MATCHDAY KIT")
      }
    } else if (isBalo) {
      return {
        shortDescription: isVi
          ? "Balo thể thao đa năng Ông Bầu Pro thiết kế hiện đại chống thấm nước, trang bị ngăn đựng giày thông minh thoáng khí."
          : "Ong Bau Pro multi-functional sports backpack featuring modern water-resistant build and ventilated shoe compartment.",
        keyFeatures: isVi
          ? [
              "Vải Oxford bền bỉ chống rách chống thấm nước",
              "Quai đeo êm ái trợ lực vai đệm mút tổ ong",
              "Tích hợp ngăn đựng giày thể thao riêng biệt"
            ]
          : [
              "Durable water-resistant Oxford polyester",
              "Ergonomic mesh-padded load-bearing straps",
              "Dedicated bottom-zipper shoe compartment"
            ],
        stockStatus: isVi ? "Còn hàng" : "In Stock",
        badge: isVi ? "PHỤ KIỆN PRO" : "PRO ACCESSORY"
      }
    } else {
      return {
        shortDescription: isVi
          ? "Trang bị bảo hộ thi đấu bóng đá chuyên nghiệp. Giảm chấn tối đa lực va chạm, bảo vệ khớp và dây chằng khỏi chấn thương."
          : "Professional football protective support. Absorbs direct impact, protecting joints and ligaments from sprain injuries.",
        keyFeatures: isVi
          ? [
              "Chất vải dệt co giãn đàn hồi ôm khít khớp cơ",
              "Đệm silicon trợ lực giảm chấn thương bánh chè",
              "Không gây bí da, thoải mái vận động cả trận"
            ]
          : [
              "Highly elastic compression knit wrapping joints",
              "Silicon pad absorbs patella impact forces",
              "Breathable mesh backing prevents skin irritation"
            ],
        stockStatus: isVi ? "Còn hàng" : "In Stock",
        badge: isVi ? "BẢO VỆ CHẤN THƯƠNG" : "PROTECTION GEAR"
      }
    }
  }

  // Find recommended or first product of the active tab as default
  const defaultProductForTab = useMemo(() => {
    const activeItems = items.filter((item) => item.category === activeTab)
    const hotItem = activeItems.find((item) => item.isHot)
    return hotItem || activeItems[0] || null
  }, [items, activeTab])

  // Get the product to show in the details panel
  const activeDetailProduct = useMemo(() => {
    if (selectedProduct && selectedProduct.category === activeTab) {
      const isSearchFiltered = searchQuery && !items.filter((item) => {
        const matchCategory = item.category === activeTab
        const matchSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.id.toLowerCase().includes(searchQuery.toLowerCase())
        return matchCategory && matchSearch
      }).some((item) => item.id === selectedProduct.id)

      if (!isSearchFiltered) {
        return selectedProduct
      }
    }
    
    // Default to first matched search product if search is active
    const activeSearchItems = items.filter((item) => {
      const matchCategory = item.category === activeTab
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
    
    if (searchQuery && activeSearchItems.length > 0) {
      return activeSearchItems[0]
    }

    return defaultProductForTab
  }, [selectedProduct, defaultProductForTab, activeTab, searchQuery, items])

  const handleTabChange = (tabId: string) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(tabId)
      setSelectedProduct(null)
      setSearchQuery("")
      setCurrentPage(1)
      setIsTransitioning(false)
      setAnimationKey((k) => k + 1) // trigger panel animation for new tab's default product
    }, 200)
    trackCTAClick(`filter_tab_${tabId}`, "products")
  }

  const handleProductClick = (product: ProductItem) => {
    if (isTransitioning) return
    setSelectedProduct(product)
    setAnimationKey((k) => k + 1)

    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsMobileDetailOpen(true)
    }
    trackCTAClick(`select_product_${product.id}`, "products")
  }

  const handleBuyClick = () => {
    if (activeDetailProduct) {
      setIsOrderModalOpen(true)
      trackCTAClick(`open_buy_modal_${activeDetailProduct.id}`, "products")
    }
  }

  const handleModalClose = () => {
    setIsOrderModalOpen(false)
  }

  useEffect(() => {
    if (!isOrderModalOpen && !isMobileDetailOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOrderModalOpen(false)
        setIsMobileDetailOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOrderModalOpen, isMobileDetailOpen])

  // Reset accordions on product ID change
  useEffect(() => {
    setOpenAccordions({
      desc: true,
      specs: false,
      sizes: false
    })
  }, [activeDetailProduct?.id])

  const filteredProducts = useMemo(() => {
    return items.filter((item) => {
      const matchCategory = item.category === activeTab
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [items, activeTab, searchQuery])

  const ITEMS_PER_PAGE = 8
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredProducts, currentPage])

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
    <section
      id="products"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-gradient overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center select-none pointer-events-none" style={{ backgroundImage: "url('/images/background/background3.png')" }} />
      <div className="absolute inset-0 bg-black/65 select-none pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 select-none pointer-events-none" />

      {/* Decorative */}
      <div className="section-divider-top" />
      <div className="pitch-pattern" />
      <div className="glow-orb glow-orb-gold w-[500px] h-[500px] top-0 left-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="reveal">
            <div className="section-number justify-center">
              <span className="num">04</span>
              <span>{isVi ? "TRANG BỊ SẴN SÀNG" : "MATCH READY PRODUCTS"}</span>
            </div>
          </div>

          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight">
            {data.title.split(" ")[0] || ""}{" "}
            <span className="text-gradient-gold">
              {data.title.split(" ").slice(1).join(" ") || ""}
            </span>
          </h2>
          {data.subtitle && (
            <p className="reveal reveal-delay-2 text-sm sm:text-base text-muted-foreground">
              {data.subtitle}
            </p>
          )}
          <div className="reveal reveal-delay-2 decorative-line-h mx-auto" />
        </div>

        {/* Category Tabs & Search */}
        <div className="reveal reveal-delay-3 flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-border/40 pb-6 mb-12">
          <nav className="flex flex-wrap items-center justify-center lg:justify-start gap-1 sm:gap-2" aria-label="Product categories">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              const label = isVi ? tab.labelVi : tab.labelEn
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative px-4 py-2.5 text-xs sm:text-sm font-bold tracking-editorial transition-colors duration-300 rounded-md ${
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  {label.toUpperCase()}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[2px] bg-primary transition-transform origin-left duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              )
            })}
          </nav>

          <div className="w-full lg:w-72 relative">
            <input
              type="text"
              placeholder={isVi ? "Tìm trang bị..." : "Search gear..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full bg-card/60 border border-border/50 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Products Grid + Featured Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Product List */}
          <div className="reveal reveal-left lg:col-span-8 order-2 lg:order-1 space-y-6">
            {paginatedProducts.length > 0 ? (
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300 ease-in-out ${
                isTransitioning ? "opacity-30 translate-y-2 blur-[2px]" : "opacity-100 translate-y-0 blur-none"
              }`}>
                {paginatedProducts.map((product) => {
                  const discountPercent = Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  )

                  return (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 justify-between gap-4 border ${
                        product.id === activeDetailProduct?.id
                          ? "border-primary bg-card/60 shadow-xl shadow-primary/15 ring-1 ring-primary/30 scale-[1.01]"
                          : "border-border/40 bg-card/30 hover:bg-card/60 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.005]"
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-20 rounded-lg bg-card/60 overflow-hidden shrink-0 border border-border/30">
                        <Image
                          src={product.image || "/images/Logo/logo.jpg"}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                        {discountPercent > 0 && (
                          <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[7px] font-extrabold px-1.5 py-0.5 rounded">
                            -{discountPercent}%
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-1.5">
                          {product.isHot && (
                            <span className="inline-flex items-center text-red-500 text-[9px] font-bold gap-0.5">
                              <Flame className="w-3 h-3 fill-current" />
                              HOT
                            </span>
                          )}
                          <div className="flex text-primary">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-2.5 h-2.5 ${
                                  i < Math.floor(product.rating) ? "fill-primary" : "text-border"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <h3 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                          {product.name}
                        </h3>

                        {product.sizes && (
                          <span className="text-[9px] text-muted-foreground uppercase font-medium tracking-wider">
                            Size: {product.sizes.join(", ")}
                          </span>
                        )}
                      </div>

                      {/* Price */}
                      <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                        <span className="text-sm font-extrabold text-primary">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-[9px] text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-card/20 border border-dashed border-border/40 rounded-xl">
                <HelpCircle className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  {isVi ? "Không tìm thấy trang bị nào phù hợp." : "No matching products found."}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                {[...Array(totalPages)].map((_, index) => {
                  const pNum = index + 1
                  return (
                    <button
                      key={pNum}
                      onClick={() => setCurrentPage(pNum)}
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                        currentPage === pNum
                          ? "bg-primary text-primary-foreground"
                          : "bg-card hover:bg-card/80 text-foreground/60 border border-border/40"
                      }`}
                    >
                      {pNum}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right Column: Detail Panel */}
          {activeDetailProduct && (
            <div id="products-detail-panel" className="reveal reveal-right lg:col-span-4 lg:sticky lg:top-24 order-1 lg:order-2 lg:block hidden">
              <div className="glass-panel border border-border/40 rounded-2xl overflow-hidden shadow-xl">
                <div
                  key={animationKey}
                  className="space-y-0 product-detail-animate"
                >
                  {/* Product Image Container */}
                  <div className="relative w-full aspect-[4/3] bg-card/30 overflow-hidden">
                    {/* Image itself fades/slides in smoothly (Delay 3) and floats */}
                    <div className="product-detail-item product-detail-delay-3 w-full h-full relative animate-float-slow">
                      <Image
                        src={activeDetailProduct.image}
                        alt={activeDetailProduct.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover object-center select-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                    </div>

                    {/* Badge appears first (Delay 1) */}
                    <span className="absolute top-4 left-4 text-[9px] font-bold text-primary tracking-editorial-wide uppercase bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded border border-primary/10 product-detail-item product-detail-delay-1">
                      {getProductDetails(activeDetailProduct).badge}
                    </span>
                    {activeDetailProduct.isHot && (
                      <span className="absolute top-4 right-4 bg-red-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1 product-detail-item product-detail-delay-1">
                        <Flame className="w-3 h-3 fill-current" />
                        {isVi ? "BÁN CHẠY" : "HOT SELLER"}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-5">
                    {/* Title Wrapper (Category delay 1, Name delay 2) */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-editorial-wide block product-detail-item product-detail-delay-1">
                        {isVi ? "CHI TIẾT TRANG BỊ" : "GEAR DETAILS"}
                      </span>
                      <h3 className="text-base font-bold text-foreground product-detail-item product-detail-delay-2">
                        {activeDetailProduct.name}
                      </h3>
                    </div>

                    {/* Horizontal Price + Order CTA row (Delay 4) */}
                    <div className="flex items-center justify-between gap-4 p-4 border border-border/30 rounded-xl bg-card/25 product-detail-item product-detail-delay-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-editorial-wide">
                          {isVi ? "GIÁ BÁN" : "PRICE"}
                        </span>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-base font-extrabold text-primary">
                            {formatPrice(activeDetailProduct.price)}
                          </span>
                          {activeDetailProduct.originalPrice > activeDetailProduct.price && (
                            <span className="text-[10px] text-muted-foreground line-through">
                              {formatPrice(activeDetailProduct.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={handleBuyClick}
                        className="btn-primary-gold !py-2.5 !px-5 !text-[11px] font-bold tracking-editorial uppercase flex items-center gap-1.5 shrink-0"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{isVi ? "ĐẶT HÀNG" : "ORDER NOW"}</span>
                      </button>
                    </div>

                    <div className="border-t border-border/10 product-detail-item product-detail-delay-4" />

                    {/* Accordion List (Delay 5) */}
                    <div className="space-y-3.5 product-detail-item product-detail-delay-5">
                      {/* Description Accordion */}
                      <div className="border border-border/30 rounded-xl overflow-hidden bg-card/10">
                        <button
                          onClick={() => toggleAccordion("desc")}
                          className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-foreground/90 hover:text-primary transition-colors focus:outline-none"
                          aria-expanded={openAccordions["desc"]}
                        >
                          <span className="uppercase tracking-editorial-wide">{isVi ? "MÔ TẢ SẢN PHẨM" : "DESCRIPTION"}</span>
                          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${openAccordions["desc"] ? "rotate-180 text-primary" : ""}`} />
                        </button>
                        <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openAccordions["desc"] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                          <div className="overflow-hidden">
                            <div className="p-3.5 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/10">
                              {getProductDetails(activeDetailProduct).shortDescription}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Key Highlights Accordion */}
                      <div className="border border-border/30 rounded-xl overflow-hidden bg-card/10">
                        <button
                          onClick={() => toggleAccordion("specs")}
                          className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-foreground/90 hover:text-primary transition-colors focus:outline-none"
                          aria-expanded={openAccordions["specs"]}
                        >
                          <span className="uppercase tracking-editorial-wide">{isVi ? "ĐẶC ĐIỂM NỔI BẬT" : "KEY HIGHLIGHTS"}</span>
                          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${openAccordions["specs"] ? "rotate-180 text-primary" : ""}`} />
                        </button>
                        <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openAccordions["specs"] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                          <div className="overflow-hidden">
                            <div className="p-3.5 pt-0 text-xs text-muted-foreground border-t border-border/10">
                              <ul className="space-y-2 list-none pl-0">
                                {getProductDetails(activeDetailProduct).keyFeatures.map((feat, fIdx) => (
                                  <li key={fIdx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span className="text-foreground/80">{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Size & Details Accordion */}
                      {activeDetailProduct.sizes && (
                        <div className="border border-border/30 rounded-xl overflow-hidden bg-card/10">
                          <button
                            onClick={() => toggleAccordion("sizes")}
                            className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-foreground/90 hover:text-primary transition-colors focus:outline-none"
                            aria-expanded={openAccordions["sizes"]}
                          >
                            <span className="uppercase tracking-editorial-wide">{isVi ? "KÍCH THƯỚC SẴN CÓ" : "AVAILABLE SIZES"}</span>
                            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${openAccordions["sizes"] ? "rotate-180 text-primary" : ""}`} />
                          </button>
                          <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openAccordions["sizes"] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                            <div className="overflow-hidden">
                              <div className="p-3.5 pt-0 border-t border-border/10 space-y-3.5">
                                <div className="flex flex-wrap gap-1.5">
                                  {activeDetailProduct.sizes.map((size) => (
                                    <span
                                      key={size}
                                      className="text-[10px] font-bold px-2.5 py-1 bg-secondary/80 border border-border/40 text-foreground/85 rounded-md hover:border-primary/40 hover:text-primary transition-colors"
                                    >
                                      {size}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-semibold text-muted-foreground">
                                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                  <span>{getProductDetails(activeDetailProduct).stockStatus}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lead form modal */}
      {isOrderModalOpen && activeDetailProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div
            className="absolute inset-0 bg-transparent"
            onClick={handleModalClose}
          />
          <div className="relative z-10 w-full max-w-xl">
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 z-20 p-2 text-foreground/80 hover:text-primary transition-colors bg-card border border-border rounded-lg"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
            <LeadForm
              campaignName="order_modal"
              products={items}
              defaultProductId={activeDetailProduct.id}
              onClose={handleModalClose}
            />
          </div>
        </div>
      )}

      {/* Mobile Product Detail Bottom Sheet / Modal */}
      {isMobileDetailOpen && activeDetailProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          {/* Backdrop Click */}
          <div
            className="absolute inset-0 bg-transparent"
            onClick={() => setIsMobileDetailOpen(false)}
          />
          {/* Card Container */}
          <div
            className="relative z-10 w-full max-w-lg bg-card border-t sm:border border-border/40 rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[90vh] animate-slide-up"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMobileDetailOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 text-foreground/80 hover:text-primary transition-colors bg-secondary/80 border border-border/60 rounded-lg backdrop-blur-sm"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto overflow-x-hidden pb-6">
              {/* Product Image Container */}
              <div className="relative w-full aspect-[4/3] bg-muted/5 overflow-hidden animate-float-slow">
                <Image
                  src={activeDetailProduct.image}
                  alt={activeDetailProduct.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 500px"
                  className="object-contain select-none p-4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                <span className="absolute top-4 left-4 text-[9px] font-bold text-primary tracking-editorial-wide uppercase bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded border border-primary/10">
                  {getProductDetails(activeDetailProduct).badge}
                </span>
                {activeDetailProduct.isHot && (
                  <span className="absolute top-4 right-16 bg-red-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-current" />
                    {isVi ? "BÁN CHẠY" : "HOT SELLER"}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-editorial-wide block">
                    {isVi ? "CHI TIẾT TRANG BỊ" : "GEAR DETAILS"}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                    {activeDetailProduct.name}
                  </h3>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between gap-4 p-4 border border-border/30 rounded-xl bg-secondary/20">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-editorial-wide">
                      {isVi ? "GIÁ BÁN" : "PRICE"}
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-base font-extrabold text-primary">
                        {formatPrice(activeDetailProduct.price)}
                      </span>
                      {activeDetailProduct.originalPrice > activeDetailProduct.price && (
                        <span className="text-[10px] text-muted-foreground line-through">
                          {formatPrice(activeDetailProduct.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsOrderModalOpen(true)
                      setIsMobileDetailOpen(false)
                    }}
                    className="btn-primary-gold !py-2.5 !px-5 !text-[11px] font-bold tracking-editorial uppercase flex items-center gap-1.5 shrink-0 shadow-none hover:shadow-none"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isVi ? "ĐẶT HÀNG" : "ORDER NOW"}</span>
                  </button>
                </div>

                <div className="border-t border-border/10" />

                {/* Mobile Details list */}
                <div className="space-y-3">
                  <div className="border border-border/30 rounded-xl bg-card/10 p-3.5">
                    <h4 className="text-[10px] font-bold text-primary tracking-editorial-wide uppercase mb-1.5">
                      {isVi ? "MÔ TẢ SẢN PHẨM" : "DESCRIPTION"}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {getProductDetails(activeDetailProduct).shortDescription}
                    </p>
                  </div>

                  <div className="border border-border/30 rounded-xl bg-card/10 p-3.5">
                    <h4 className="text-[10px] font-bold text-primary tracking-editorial-wide uppercase mb-1.5">
                      {isVi ? "ĐẶC ĐIỂM NỔI BẬT" : "KEY HIGHLIGHTS"}
                    </h4>
                    <ul className="space-y-2 list-none pl-0 text-xs text-muted-foreground">
                      {getProductDetails(activeDetailProduct).keyFeatures.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span className="text-foreground/80">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {activeDetailProduct.sizes && (
                    <div className="border border-border/30 rounded-xl bg-card/10 p-3.5 space-y-3">
                      <h4 className="text-[10px] font-bold text-primary tracking-editorial-wide uppercase">
                        {isVi ? "KÍCH THƯỚC SẴN CÓ" : "AVAILABLE SIZES"}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeDetailProduct.sizes.map((size) => (
                          <span
                            key={size}
                            className="text-[10px] font-bold px-2.5 py-1 bg-secondary/80 border border-border/40 text-foreground/85 rounded-md"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-semibold text-muted-foreground pt-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{getProductDetails(activeDetailProduct).stockStatus}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductsSection
