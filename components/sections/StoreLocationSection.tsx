"use client"

import React from "react"
import { MapPin, Phone, Mail, Clock, Compass, ExternalLink } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/hooks/useLanguage"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const STORE_LOCATION_DATA = {
  shopName: "Ông Bầu shop",
  googleMapsUrl: "https://maps.app.goo.gl/cqs4bzE7Njgz2K4H7",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3485.346319150836!2d108.24280177468688!3d16.019780984652574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421bbd7cc0d5df%3A0x8459f9b1a9fedde2!2zU8OibiBiw7NuZyDDl CBC4bqndSAtIFNob3AgdGjhu4MgdGhhbyDDlCBC4bqndU!5e1!3m2!1svi!2s!4v1781162424689!5m2!1svi!2s",
  phone: "0906443704",
  email: "abc@gmail.com",
  vi: {
    sectionLabel: "LIÊN HỆ VỚI CHÚNG TÔI",
    titlePart1: "TÌM CỬA HÀNG CỦA CHÚNG TÔI TẠI",
    titleHighlight: "ĐÀ NẴNG",
    description: "Ghé thăm cửa hàng của chúng tôi để trải nghiệm trực tiếp các sản phẩm bóng đá chính hãng, từ giày, áo đấu, bóng, phụ kiện đến trang bị luyện tập chuyên nghiệp.",
    ctaText: "Mở Google Maps",
    addressTitle: "ĐỊA CHỈ",
    addressValue: "Nước Mặn 6, Ngũ Hành Sơn, Đà Nẵng, Việt Nam",
    phoneTitle: "ĐIỆN THOẠI",
    emailTitle: "EMAIL",
    hoursTitle: "GIỜ MỞ CỬA",
    hoursValue: "Thứ 2 - Chủ Nhật: 08:00 - 22:00",
    nearbyTitle: "GẦN ĐỊA ĐIỂM",
    nearbyValue: "Sân bóng Ông Bầu"
  },
  en: {
    sectionLabel: "GET IN TOUCH",
    titlePart1: "FIND OUR FOOTBALL STORE IN",
    titleHighlight: "DA NANG",
    description: "Visit our store to explore authentic football gear, including premium boots, jerseys, match balls, training accessories, and essentials.",
    ctaText: "Open in Google Maps",
    addressTitle: "ADDRESS",
    addressValue: "Nuoc Man 6, Ngu Hanh Son, Da Nang, Vietnam",
    phoneTitle: "PHONE",
    emailTitle: "EMAIL",
    hoursTitle: "OPENING HOURS",
    hoursValue: "Mon - Sun: 8:00 AM - 10:00 PM",
    nearbyTitle: "NEARBY LANDMARK",
    nearbyValue: "Ong Bau Football Field"
  }
}

export function StoreLocationSection() {
  const { locale } = useLanguage()
  const isVi = locale === "vi"
  const content = isVi ? STORE_LOCATION_DATA.vi : STORE_LOCATION_DATA.en
  const sectionRef = useScrollReveal()

  const handleOpenMaps = () => {
    trackCTAClick("open_google_maps_location", "store_location")
  }

  const handleContactClick = (type: string) => {
    trackCTAClick(`contact_${type}_click`, "store_location")
  }

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-gradient overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center select-none pointer-events-none" style={{ backgroundImage: "url('/images/background/background2.png')" }} />
      <div className="absolute inset-0 bg-black/70 select-none pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 select-none pointer-events-none" />

      {/* Decorative lines & glows */}
      <div className="section-divider-top" />
      <div className="pitch-pattern" />
      <div className="glow-orb glow-orb-gold w-[500px] h-[500px] top-1/2 left-1/4 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">
          
          {/* Left Column: Heading & Intro */}
          <div className="reveal reveal-left lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="section-number justify-start">
                <span className="num">08</span>
                <span>{content.sectionLabel}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase leading-tight">
                {content.titlePart1}{" "}
                <span className="text-gradient-gold block sm:inline">
                  {content.titleHighlight}
                </span>
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {content.description}
              </p>
            </div>

            <div className="pt-2">
              <a
                href={STORE_LOCATION_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleOpenMaps}
                className="btn-primary-gold group inline-flex items-center gap-2"
              >
                <span>{content.ctaText}</span>
                <ExternalLink className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Center Column: Interactive Map */}
          <div className="reveal lg:col-span-5 flex items-stretch">
            <div className="w-full min-h-[260px] sm:min-h-[300px] lg:min-h-full rounded-2xl overflow-hidden border border-border/40 bg-card/10 shadow-2xl relative group hover:border-primary/25 transition-colors duration-500">
              {/* Gold glow outline on hover */}
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/10 rounded-2xl pointer-events-none transition-colors duration-500 z-10" />
              <iframe
                src={STORE_LOCATION_DATA.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store location map"
                className="w-full h-full min-h-[260px] sm:min-h-[350px] lg:min-h-full"
              />
            </div>
          </div>

          {/* Right Column: Contact Cards */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-4">
            
            {/* Address */}
            <div className="reveal reveal-right reveal-delay-1 group relative rounded-xl border border-border/40 bg-card/25 p-4 flex items-start gap-3 transition-all duration-500 hover:bg-card/40 hover:border-primary/20 hover:-translate-y-0.5">
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-xl origin-left" />
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/8 border border-primary/12 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold text-primary tracking-editorial-wide uppercase">
                  {content.addressTitle}
                </h4>
                <p className="text-xs text-foreground/85 font-medium leading-relaxed">
                  {content.addressValue}
                </p>
              </div>
            </div>

            {/* Phone */}
            <a
              href={`tel:${STORE_LOCATION_DATA.phone}`}
              onClick={() => handleContactClick("phone")}
              className="reveal reveal-right reveal-delay-2 group relative rounded-xl border border-border/40 bg-card/25 p-4 flex items-start gap-3 transition-all duration-500 hover:bg-card/40 hover:border-primary/20 hover:-translate-y-0.5"
            >
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-xl origin-left" />
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/8 border border-primary/12 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold text-primary tracking-editorial-wide uppercase">
                  {content.phoneTitle}
                </h4>
                <p className="text-xs text-foreground/85 font-medium group-hover:text-primary transition-colors">
                  {STORE_LOCATION_DATA.phone}
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${STORE_LOCATION_DATA.email}`}
              onClick={() => handleContactClick("email")}
              className="reveal reveal-right reveal-delay-3 group relative rounded-xl border border-border/40 bg-card/25 p-4 flex items-start gap-3 transition-all duration-500 hover:bg-card/40 hover:border-primary/20 hover:-translate-y-0.5"
            >
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-xl origin-left" />
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/8 border border-primary/12 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold text-primary tracking-editorial-wide uppercase">
                  {content.emailTitle}
                </h4>
                <p className="text-xs text-foreground/85 font-medium group-hover:text-primary transition-colors truncate">
                  {STORE_LOCATION_DATA.email}
                </p>
              </div>
            </a>

            {/* Opening Hours */}
            <div className="reveal reveal-right reveal-delay-4 group relative rounded-xl border border-border/40 bg-card/25 p-4 flex items-start gap-3 transition-all duration-500 hover:bg-card/40 hover:border-primary/20 hover:-translate-y-0.5">
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-xl origin-left" />
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/8 border border-primary/12 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold text-primary tracking-editorial-wide uppercase">
                  {content.hoursTitle}
                </h4>
                <p className="text-xs text-foreground/85 font-medium">
                  {content.hoursValue}
                </p>
              </div>
            </div>

            {/* Nearby Stadium */}
            <div className="reveal reveal-right reveal-delay-5 group relative rounded-xl border border-border/40 bg-card/25 p-4 flex items-start gap-3 transition-all duration-500 hover:bg-card/40 hover:border-primary/20 hover:-translate-y-0.5">
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-xl origin-left" />
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/8 border border-primary/12 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold text-primary tracking-editorial-wide uppercase">
                  {content.nearbyTitle}
                </h4>
                <p className="text-xs text-foreground/85 font-medium">
                  {content.nearbyValue}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default StoreLocationSection
