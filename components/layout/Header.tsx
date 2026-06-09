"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, ShoppingCart, Search, Globe } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/hooks/useLanguage"

export function Header() {
  const { locale, setLocale } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (label: string, href: string) => {
    trackCTAClick(`nav_${label}_${href}`, "header")
    setIsOpen(false)
  }

  const handleLanguageChange = (newLocale: "vi" | "en") => {
    setLocale(newLocale)
    trackCTAClick(`switch_lang_${newLocale}`, "header")
  }

  const isVi = locale === "vi"

  const menuItems = isVi
    ? [
        { label: "Trang Chủ", href: "#" },
        { label: "Danh Mục", href: "#categories" },
        { label: "Chủ Lực", href: "#spotlight" },
        { label: "Sản Phẩm", href: "#products" },
        { label: "Khuyến Mãi", href: "#promo" },
        { label: "Đánh Giá", href: "#testimonials" },
        { label: "Hỏi Đáp", href: "#faq" },
      ]
    : [
        { label: "Home", href: "#" },
        { label: "Categories", href: "#categories" },
        { label: "Spotlight", href: "#spotlight" },
        { label: "Catalog", href: "#products" },
        { label: "Promo", href: "#promo" },
        { label: "Reviews", href: "#testimonials" },
        { label: "FAQ", href: "#faq" },
      ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            onClick={() => handleNavClick("logo", "#")}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
              <Image
                src="/images/Logo/logo.jpg"
                alt="Ông Bầu Shop Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-wider text-gradient-gold group-hover:opacity-95 transition-opacity leading-none">
                ÔNG BẦU SHOP
              </span>
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">
                {isVi ? "TRANG BỊ BÓNG ĐÁ CHUYÊN NGHIỆP" : "PROFESSIONAL SOCCER GEAR"}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs sm:text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
                onClick={() => handleNavClick(item.label, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher Flag Trigger */}
            <div className="flex items-center bg-secondary/80 border border-border/80 rounded-lg p-1 text-xs font-bold font-mono">
              <button
                onClick={() => handleLanguageChange("vi")}
                className={`px-2 py-1.5 rounded transition-all ${
                  isVi ? "bg-primary text-primary-foreground shadow" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                VI
              </button>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-2 py-1.5 rounded transition-all ${
                  !isVi ? "bg-primary text-primary-foreground shadow" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                EN
              </button>
            </div>

            <button
              aria-label="Search products"
              className="p-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={() => trackCTAClick("search_icon", "header")}
            >
              <Search className="w-5 h-5" />
            </button>
            <a
              href="#products"
              className="p-2 text-foreground/80 hover:text-primary relative transition-colors"
              onClick={() => handleNavClick("cart", "#products")}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </a>
            <a
              href="#lead-form"
              className="bg-primary hover:bg-primary/95 text-primary-foreground text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-all transform active:scale-95 shadow-lg shadow-primary/20"
              onClick={() => handleNavClick("cta_consult", "#lead-form")}
            >
              {isVi ? "Tư Vấn Ngay" : "Consult Now"}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center space-x-3">
            <a
              href="#products"
              className="p-2 text-foreground/80 hover:text-primary relative"
              onClick={() => handleNavClick("cart_mobile", "#products")}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-foreground hover:text-primary focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle main menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`xl:hidden fixed inset-x-0 top-[73px] bg-background/95 backdrop-blur-lg border-b border-border transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-3 py-2.5 rounded-md text-base font-semibold text-foreground/90 hover:bg-secondary hover:text-primary transition-all"
              onClick={() => handleNavClick(item.label, item.href)}
            >
              {item.label}
            </a>
          ))}
          
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            {/* Language Selection Row in Mobile */}
            <div className="flex items-center justify-between px-3">
              <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Language
              </span>
              <div className="flex bg-secondary border border-border rounded-lg p-1 text-xs font-bold font-mono">
                <button
                  onClick={() => handleLanguageChange("vi")}
                  className={`px-3 py-1.5 rounded transition-all ${
                    isVi ? "bg-primary text-primary-foreground shadow" : "text-foreground/60"
                  }`}
                >
                  VI
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`px-3 py-1.5 rounded transition-all ${
                    !isVi ? "bg-primary text-primary-foreground shadow" : "text-foreground/60"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <a
              href="#lead-form"
              className="w-full text-center bg-primary hover:bg-primary/95 text-primary-foreground font-bold py-3 rounded-lg transition-colors shadow-lg shadow-primary/20"
              onClick={() => handleNavClick("cta_consult_mobile", "#lead-form")}
            >
              {isVi ? "Tư Vấn Ngay" : "Consult Now"}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
