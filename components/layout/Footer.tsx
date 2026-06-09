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
    <footer className="bg-dark-gradient border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                <Image
                  src="/images/Logo/logo.jpg"
                  alt="Ông Bầu Shop Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold tracking-wider text-gradient-gold">
                ÔNG BẦU SHOP
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {isVi
                ? "Hệ thống bán lẻ giày bóng đá, quần áo đấu và phụ kiện thể thao chính hãng. Đồng hành cùng niềm đam mê sân cỏ của hàng triệu cầu thủ Việt."
                : "Official retail network for soccer cleats, club jerseys, and athletic training gear. Fueling the pitch passion of millions of Vietnamese footballers."}
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary transition-all"
                onClick={() => handleLinkClick("facebook", "https://facebook.com")}
                aria-label="Facebook link"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary transition-all"
                onClick={() => handleLinkClick("youtube", "https://youtube.com")}
                aria-label="Youtube link"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary transition-all"
                onClick={() => handleLinkClick("zalo", "#")}
                aria-label="Zalo link"
              >
                <span className="text-xs font-bold font-sans">Zalo</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-primary uppercase mb-4">
              {isVi ? "Về Chúng Tôi" : "About Us"}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => handleLinkClick("home", "#")}
                >
                  {isVi ? "Trang chủ" : "Home"}
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => handleLinkClick("categories", "#categories")}
                >
                  {isVi ? "Danh mục sản phẩm" : "Product Categories"}
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => handleLinkClick("products", "#products")}
                >
                  {isVi ? "Sản phẩm nổi bật" : "Featured Products"}
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => handleLinkClick("reviews", "#testimonials")}
                >
                  {isVi ? "Đánh giá từ khách hàng" : "Customer Reviews"}
                </a>
              </li>
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-primary uppercase mb-4">
              {isVi ? "Chính Sách Cửa Hàng" : "Store Policies"}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#faq"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => handleLinkClick("policy_shipping", "#faq")}
                >
                  {isVi ? "Giao hàng & Kiểm hàng" : "Shipping & Inspection"}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => handleLinkClick("policy_returns", "#faq")}
                >
                  {isVi ? "Đổi trả sản phẩm trong 7 ngày" : "7-Day Returns & Exchanges"}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => handleLinkClick("policy_warranty", "#faq")}
                >
                  {isVi ? "Chính sách bảo hành giày" : "Cleat Warranty Policy"}
                </a>
              </li>
              <li>
                <a
                  href="#lead-form"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => handleLinkClick("policy_privacy", "#lead-form")}
                >
                  {isVi ? "Chính sách bảo mật thông tin" : "Privacy Policy"}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-primary uppercase mb-4">
              {isVi ? "Thông Tin Liên Hệ" : "Contact Details"}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {isVi
                    ? "Số 123 Đường Thành Công, Phường 12, Quận Tân Bình, TP. Hồ Chí Minh"
                    : "123 Thanh Cong Road, Ward 12, Tan Binh District, Ho Chi Minh City"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:0901234567"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => handleLinkClick("phone_call", "tel:0901234567")}
                >
                  090 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:contact@ongbaushop.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => handleLinkClick("email_send", "mailto:contact@ongbaushop.com")}
                >
                  contact@ongbaushop.com
                </a>
              </li>
              <li className="flex items-center gap-2 pt-2">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span className="text-xs text-muted-foreground font-semibold">
                  {isVi ? "Đã thông báo Bộ Công Thương" : "Registered with MoIT"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Ông Bầu Shop. All rights reserved. {isVi ? "Mã số doanh nghiệp: 0317654321 cấp ngày 01/01/2024." : "Business Reg No: 0317654321 dated 01/01/2024."}
          </p>
          <p className="text-xs text-muted-foreground">
            {isVi ? "Thiết kế và phát triển bởi Đội ngũ kỹ thuật Ông Bầu." : "Designed and developed by Ong Bau Dev Team."}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
