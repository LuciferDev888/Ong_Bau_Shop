"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Star, Flame, ShoppingBag, X, Info, HelpCircle } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { ProductsProps, ProductItem } from "@/types/landing"
import { LeadForm } from "../forms/LeadForm"
import { useLanguage } from "@/hooks/useLanguage"

interface BilingualProductsProps {
  vi: ProductsProps
  en: ProductsProps
  items: ProductItem[]
}

export function ProductsSection({ vi, en, items: viItems }: BilingualProductsProps) {
  const { locale } = useLanguage()
  const [activeTab, setActiveTab] = useState<string>("boots")
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)

  const isVi = locale === "vi"
  const data = isVi ? vi : en
  const items = data.items || viItems

  const tabs = [
    { id: "boots", labelVi: "Giày Đá Bóng", labelEn: "Football Boots", jp: "フットボールシューズ" },
    { id: "clothes", labelVi: "Quần Áo Đấu", labelEn: "Soccer Clothes", jp: "ユニフォーム" },
    { id: "balo", labelVi: "Balo Thể Thao", labelEn: "Sport Backpacks", jp: "バックパック" },
    { id: "accessories", labelVi: "Phụ Kiện", labelEn: "Accessories", jp: "アクセサリー" },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setSearchQuery("")
    setCurrentPage(1)
    trackCTAClick(`filter_tab_${tabId}`, "products")
  }

  const handleOpenOrderModal = (product: ProductItem) => {
    setSelectedProduct(product)
    trackCTAClick(`open_order_modal_${product.id}`, "products")
  }

  // Filter products based on search and active tab
  const filteredProducts = useMemo(() => {
    return items.filter((item) => {
      const matchCategory = item.category === activeTab
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [items, activeTab, searchQuery])

  // Pagination (8 items per page)
  const ITEMS_PER_PAGE = 8
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredProducts, currentPage])

  // Choose the spotlight/featured product for the active category (e.g. first hot item or first item)
  const spotlightProduct = useMemo(() => {
    const activeItems = items.filter((item) => item.category === activeTab)
    const hotItem = activeItems.find((item) => item.isHot)
    return hotItem || activeItems[0] || null
  }, [items, activeTab])

  // Custom spec values depending on categories for the featured card
  const getProductSpecs = (product: ProductItem) => {
    if (product.category === "boots") {
      return [
        { labelVi: "Bám Sân", labelEn: "Turf Grip", value: 95 },
        { labelVi: "Êm Chân", labelEn: "Cushioning", value: 90 },
        { labelVi: "Nhẹ Nhàng", labelEn: "Lightness", value: 88 },
      ]
    } else if (product.category === "clothes") {
      return [
        { labelVi: "Thấm Hút", labelEn: "Breathability", value: 96 },
        { labelVi: "Co Giãn", labelEn: "Stretchability", value: 94 },
        { labelVi: "Bền Màu", labelEn: "Durability", value: 92 },
      ]
    } else if (product.category === "balo") {
      return [
        { labelVi: "Sức Chứa", labelEn: "Capacity", value: 98 },
        { labelVi: "Chống Nước", labelEn: "Waterproof", value: 85 },
        { labelVi: "Chống Rách", labelEn: "Tear-Resistance", value: 90 },
      ]
    } else {
      return [
        { labelVi: "Bảo Vệ", labelEn: "Protection", value: 95 },
        { labelVi: "Độ Co Giãn", labelEn: "Elasticity", value: 92 },
        { labelVi: "Kháng Khuẩn", labelEn: "Anti-Bacterial", value: 90 },
      ]
    }
  }

  const formatPrice = (price: number) => {
    if (!isVi) {
      // Convert to mock USD for English view
      const usdPrice = (price / 24000).toFixed(2)
      return `$${usdPrice} USD`
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const activeTabDetails = tabs.find((t) => t.id === activeTab)

  return (
    <section id="products" className="py-24 bg-dark-gradient relative border-t border-border/40">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
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

        {/* Categories Bar and Search Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-border/60 pb-6 mb-12">
          {/* Horizontal category tabs for desktop, inspired by Shushi Zeron's layout */}
          <nav className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6" aria-label="Product categories">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              const label = isVi ? tab.labelVi : tab.labelEn
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className="group flex flex-col items-center lg:items-start text-left focus:outline-none relative py-1"
                >
                  <span className="text-[10px] font-mono tracking-widest text-primary/40 group-hover:text-primary transition-colors">
                    {tab.jp}
                  </span>
                  <span
                    className={`text-sm sm:text-base font-extrabold tracking-wider transition-colors ${
                      isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {label.toUpperCase()}
                  </span>
                  {/* Underline slider */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform origin-left duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              )
            })}
          </nav>

          {/* Search Input */}
          <div className="w-full lg:w-72 relative">
            <input
              type="text"
              placeholder={isVi ? "Tìm trang bị..." : "Search gear..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full bg-secondary/60 border border-border/80 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Split Grid Layout: List of Products vs Featured Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Compact Product Cards List */}
          <div className="lg:col-span-8 space-y-6">
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedProducts.map((product) => {
                  const discountPercent = Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  )

                  return (
                    <div
                      key={product.id}
                      onClick={() => handleOpenOrderModal(product)}
                      className="group flex items-center bg-card/40 hover:bg-card border border-border p-4 rounded-xl cursor-pointer glass-card-hover justify-between gap-4 transition-all"
                    >
                      {/* Product Thumbnail (Left) */}
                      <div className="relative w-20 h-20 rounded-lg bg-secondary/40 overflow-hidden shrink-0">
                        <Image
                          src={product.image || "/images/Logo/logo.jpg"}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Discount Badge overlay */}
                        {discountPercent > 0 && (
                          <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[8px] font-extrabold px-1 rounded">
                            -{discountPercent}%
                          </div>
                        )}
                      </div>

                      {/* Product Body (Center) */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-1.5">
                          {product.isHot && (
                            <span className="inline-flex items-center text-red-500 text-[10px] font-bold">
                              <Flame className="w-3 h-3 fill-current" />
                              HOT
                            </span>
                          )}
                          <div className="flex text-primary">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating) ? "fill-primary" : "text-border"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                          {product.name}
                        </h3>

                        {product.sizes && (
                          <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                            Size: {product.sizes.join(", ")}
                          </span>
                        )}
                      </div>

                      {/* Product Price & Order Button (Right) */}
                      <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                        <span className="text-sm sm:text-base font-extrabold text-primary">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-[10px] text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenOrderModal(product)
                          }}
                          className="p-2 bg-secondary group-hover:bg-primary border border-border group-hover:border-primary text-foreground group-hover:text-primary-foreground rounded-lg transition-all"
                          aria-label="Order product"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-secondary/10 border border-dashed border-border rounded-xl">
                <HelpCircle className="w-12 h-12 text-muted-foreground/60 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  {isVi ? "Không tìm thấy trang bị nào phù hợp." : "No matching products found."}
                </p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                {[...Array(totalPages)].map((_, index) => {
                  const pNum = index + 1
                  return (
                    <button
                      key={pNum}
                      onClick={() => setCurrentPage(pNum)}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                        currentPage === pNum
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                      }`}
                    >
                      {pNum}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right Side: Sticky Featured Spotlight Card (Adaptation of Sushi Pairing card) */}
          {spotlightProduct && (
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="glass-panel border border-border rounded-2xl overflow-hidden shadow-xl">
                
                {/* Visual Thumbnail */}
                <div className="relative w-full aspect-[4/3] bg-secondary/30 overflow-hidden">
                  <Image
                    src={spotlightProduct.image}
                    alt={spotlightProduct.name}
                    fill
                    sizes="(max-w-1024px) 100vw, 33vw"
                    className="object-cover object-center select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                  
                  {/* Category Indicator Tag */}
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded">
                    {activeTabDetails ? (isVi ? activeTabDetails.labelVi : activeTabDetails.labelEn).toUpperCase() : ""}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                      {isVi ? "SẢN PHẨM KHUYÊN DÙNG" : "RECOMMENDED GEAR"}
                    </span>
                    <h3 className="text-lg font-bold text-foreground line-clamp-1">
                      {spotlightProduct.name}
                    </h3>
                    <p className="text-xs text-primary font-bold">
                      {formatPrice(spotlightProduct.price)}
                    </p>
                  </div>

                  <div className="border-t border-border/60" />

                  {/* Dynamic Performance Specs */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" />
                      <span>{isVi ? "ƯU ĐIỂM CÔNG NGHỆ" : "TECHNOLOGICAL RATINGS"}</span>
                    </h4>
                    
                    <div className="space-y-3">
                      {getProductSpecs(spotlightProduct).map((spec, sIdx) => {
                        const sLabel = isVi ? spec.labelVi : spec.labelEn
                        return (
                          <div key={sIdx} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-foreground/85 font-medium">{sLabel}</span>
                              <span className="text-primary font-mono font-bold">{spec.value}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-background border border-border/40 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${spec.value}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Ordering CTA */}
                  <button
                    onClick={() => handleOpenOrderModal(spotlightProduct)}
                    className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-md shadow-primary/10"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isVi ? "ĐẶT MUA SẢN PHẨM" : "ORDER NOW"}</span>
                  </button>

                </div>

              </div>
            </div>
          )}

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
              campaignName="order_modal"
              products={items}
              defaultProductId={selectedProduct.id}
              onClose={() => setSelectedProduct(null)}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductsSection
