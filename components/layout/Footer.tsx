"use client"

import Image from "next/image"
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/hooks/useLanguage"

export function Footer() {
  const { locale } = useLanguage()

  const handleLinkClick = (label: string, href: string) => {
    trackCTAClick(`footer_${label}_${href}`, "footer")
  }

  const isVi = locale === "vi"

  return (
    <footer className="bg-dark-gradient border-t border-border/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-primary/40">
                <Image
                  src="/images/Logo/logo.jpg"
                  alt="Ông Bầu Shop Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-editorial text-gradient-gold leading-none">
                  ÔNG BẦU SHOP
                </span>
                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-editorial-wide leading-none mt-0.5">
                  FOOTBALL GEAR
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {isVi
                ? "Hệ thống bán lẻ giày bóng đá, quần áo đấu và phụ kiện thể thao chính hãng. Đồng hành cùng niềm đam mê sân cỏ của hàng triệu cầu thủ Việt."
                : "Official retail network for soccer cleats, club jerseys, and athletic training gear. Fueling the pitch passion of millions of Vietnamese footballers."}
            </p>
            
            <div className="flex gap-3 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-secondary/60 border border-border/30 flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                onClick={() => handleLinkClick("facebook", "https://facebook.com")}
                aria-label="Facebook link"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-secondary/60 border border-border/30 flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                onClick={() => handleLinkClick("youtube", "https://youtube.com")}
                aria-label="Youtube link"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-secondary/60 border border-border/30 flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                onClick={() => handleLinkClick("zalo", "#")}
                aria-label="Zalo link"
              >
                <span className="text-[10px] font-bold font-sans">Zalo</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] font-bold tracking-editorial text-primary uppercase mb-5">
              {isVi ? "VỀ CHÚNG TÔI" : "ABOUT US"}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleLinkClick("home", "#home")}
                >
                  {isVi ? "Trang chủ" : "Home"}
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleLinkClick("categories", "#categories")}
                >
                  {isVi ? "Danh mục sản phẩm" : "Product Categories"}
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleLinkClick("products", "#products")}
                >
                  {isVi ? "Sản phẩm nổi bật" : "Featured Products"}
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleLinkClick("reviews", "#testimonials")}
                >
                  {isVi ? "Đánh giá từ khách hàng" : "Customer Reviews"}
                </a>
              </li>
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h3 className="text-[11px] font-bold tracking-editorial text-primary uppercase mb-5">
              {isVi ? "CHÍNH SÁCH CỬA HÀNG" : "STORE POLICIES"}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#faq"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleLinkClick("policy_shipping", "#faq")}
                >
                  {isVi ? "Giao hàng & Kiểm hàng" : "Shipping & Inspection"}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleLinkClick("policy_returns", "#faq")}
                >
                  {isVi ? "Đổi trả sản phẩm trong 7 ngày" : "7-Day Returns & Exchanges"}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleLinkClick("policy_warranty", "#faq")}
                >
                  {isVi ? "Chính sách bảo hành giày" : "Cleat Warranty Policy"}
                </a>
              </li>
              <li>
                <a
                  href="#lead-form"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleLinkClick("policy_privacy", "#lead-form")}
                >
                  {isVi ? "Chính sách bảo mật thông tin" : "Privacy Policy"}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-[11px] font-bold tracking-editorial text-primary uppercase mb-5">
              {isVi ? "THÔNG TIN LIÊN HỆ" : "CONTACT DETAILS"}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {isVi
                    ? "Nước Mặn 6, Ngũ Hành Sơn, Đà Nẵng, Việt Nam"
                    : "Nuoc Man 6, Ngu Hanh Son, Da Nang, Vietnam"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="tel:0906443704"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleLinkClick("phone_call", "tel:0906443704")}
                >
                  0906 443 704
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:abc@gmail.com"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleLinkClick("email_send", "mailto:abc@gmail.com")}
                >
                  abc@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 pt-2 border-t border-border/10">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span className="text-[10px] text-muted-foreground font-semibold">
                  {isVi ? "Đã thông báo Bộ Công Thương" : "Registered with MoIT"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Ông Bầu Shop. All rights reserved. {isVi ? "Mã số doanh nghiệp: 0317654321 cấp ngày 01/01/2024." : "Business Reg No: 0317654321 dated 01/01/2024."}
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            {isVi ? "Thiết kế và phát triển bởi Đội ngũ kỹ thuật Ông Bầu." : "Designed and developed by Ong Bau Dev Team."}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
