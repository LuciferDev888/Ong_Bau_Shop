"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Menu, X, ShoppingBag, Globe } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/hooks/useLanguage"

const SECTION_IDS = [
  "home",
  "categories",
  "spotlight",
  "products",
  "benefits",
  "location",
  "lead-form",
]

export function Header() {
  const { locale, setLocale } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const isVi = locale === "vi"

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const handleNavClick = useCallback(
    (label: string, href: string) => {
      trackCTAClick(`nav_${label}_${href}`, "header")
      setIsOpen(false)
    },
    []
  )

  const handleLanguageChange = (newLocale: "vi" | "en") => {
    setLocale(newLocale)
    trackCTAClick(`switch_lang_${newLocale}`, "header")
  }

  const menuItems = isVi
    ? [
        { label: "TRANG CHU", href: "#home" },
        { label: "BO SUU TAP", href: "#categories" },
        { label: "CHU LUC", href: "#spotlight" },
        { label: "SAN PHAM", href: "#products" },
        { label: "VE CHUNG TOI", href: "#benefits" },
        { label: "LIEN HE", href: "#location" },
      ]
    : [
        { label: "HOME", href: "#home" },
        { label: "COLLECTION", href: "#categories" },
        { label: "SPOTLIGHT", href: "#spotlight" },
        { label: "PRODUCTS", href: "#products" },
        { label: "WHY US", href: "#benefits" },
        { label: "CONTACT", href: "#location" },
      ]
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
            onClick={() => handleNavClick("logo", "#home")}
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-primary/40 group-hover:border-primary transition-colors">
              <Image
                src="/images/Logo/logo.jpg"
                alt="Ông Bầu Shop Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-black tracking-editorial text-gradient-gold leading-none">
                ÔNG BẦU
              </span>
              <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-editorial-wide leading-none mt-0.5">
                {isVi ? "FOOTBALL GEAR" : "FOOTBALL GEAR"}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
            {menuItems.map((item) => {
              const sectionId = item.href.replace("#", "")
              const isActive = activeSection === sectionId
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-3 py-2 text-[11px] font-bold tracking-editorial transition-colors duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                  onClick={() => handleNavClick(item.label, item.href)}
                >
                  {item.label}
                  {/* Active underline */}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[2px] bg-primary transition-transform duration-300 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center border border-border/60 rounded-md overflow-hidden text-[10px] font-bold tracking-wider">
              <button
                onClick={() => handleLanguageChange("vi")}
                className={`px-2.5 py-1.5 transition-all duration-300 ${
                  isVi
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/50 hover:text-foreground bg-transparent"
                }`}
                aria-label="Vietnamese"
              >
                VI
              </button>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-2.5 py-1.5 transition-all duration-300 ${
                  !isVi
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/50 hover:text-foreground bg-transparent"
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {/* Shop Now CTA */}
            <a
              href="#products"
              className="btn-primary-gold !py-2 !px-5 !text-[10px] !tracking-editorial"
              onClick={() => handleNavClick("cta_shop", "#products")}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isVi ? "MUA NGAY" : "SHOP NOW"}</span>
            </a>
          </div>

          {/* Mobile actions */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href="#products"
              className="p-2 text-foreground/70 hover:text-primary relative transition-colors"
              onClick={() => handleNavClick("cart_mobile", "#products")}
              aria-label="Shop products"
            >
              <ShoppingBag className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground hover:text-primary focus:outline-none transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle main menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`xl:hidden fixed inset-x-0 top-[65px] bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-400 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-6 pt-4 pb-8 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
          {menuItems.map((item) => {
            const sectionId = item.href.replace("#", "")
            const isActive = activeSection === sectionId
            return (
              <a
                key={item.label}
                href={item.href}
                className={`block px-4 py-3 text-sm font-bold tracking-editorial transition-all rounded-md ${
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary/40"
                }`}
                onClick={() => handleNavClick(item.label, item.href)}
              >
                {item.label}
              </a>
            )
          })}

          <div className="pt-6 border-t border-border/40 flex flex-col gap-4">
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between px-4">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-2 tracking-wider uppercase">
                <Globe className="w-3.5 h-3.5" />
                {isVi ? "Ngôn ngữ" : "Language"}
              </span>
              <div className="flex border border-border/60 rounded-md overflow-hidden text-[10px] font-bold tracking-wider">
                <button
                  onClick={() => handleLanguageChange("vi")}
                  className={`px-3 py-1.5 transition-all ${
                    isVi
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/50"
                  }`}
                >
                  VI
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`px-3 py-1.5 transition-all ${
                    !isVi
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/50"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <a
              href="#products"
              className="btn-primary-gold w-full !text-xs"
              onClick={() => handleNavClick("cta_shop_mobile", "#products")}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isVi ? "MUA NGAY" : "SHOP NOW"}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
