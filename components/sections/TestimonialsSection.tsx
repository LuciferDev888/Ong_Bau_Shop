"use client"

import Image from "next/image"
import { Star, CheckCircle } from "lucide-react"
import { TestimonialsProps } from "@/types/landing"
import { useLanguage } from "@/hooks/useLanguage"
import { useScrollReveal } from "@/hooks/useScrollReveal"

interface BilingualTestimonialsProps {
  vi: TestimonialsProps
  en: TestimonialsProps
}

const LOCAL_TESTIMONIALS = [
  {
    id: "test-1",
    rating: 5,
    verified: true,
    avatar: "/images/soccer_clothes/Kelme/678511626_874304505662984_3398711367839331974_n.jpg",
    name: "Nguyễn Hoàng Đức",
    roleVi: "Tiền vệ - Đội tuyển QG Việt Nam",
    roleEn: "Midfielder - Vietnam National Team",
    commentVi: "Giày Kamito Cobra Pro Hoàng Kim bám sân tốt, hỗ trợ bứt tốc cực nhanh. Bộ áo đấu Kelme thì siêu nhẹ và thoáng mát.",
    commentEn: "Kamito Cobra Pro Gold boots have excellent grip and enable fast acceleration. The Kelme jersey is ultra-lightweight and breathable."
  },
  {
    id: "test-2",
    rating: 5,
    verified: true,
    avatar: "/images/Football_boots/540335540_684387347988035_2073900630704714946_n.jpg",
    name: "Nguyễn Văn Nam",
    roleVi: "Cầu thủ phong trào, TP.HCM",
    roleEn: "Amateur Player, HCMC",
    commentVi: "Giày Cobra Pro đi êm, bám sân cực tốt. Sút bóng rất đầm chân, giá cả tại Ông Bầu Shop lại rất hợp lý.",
    commentEn: "Cobra Pro boots are comfortable and have great grip on turf. Shooting feels solid, and the price is very reasonable."
  },
  {
    id: "test-3",
    rating: 5,
    verified: true,
    avatar: "/images/soccer_clothes/kamito/673065853_868764086217026_8237532365442671194_n.jpg",
    name: "Trần Thanh Hải",
    roleVi: "Tiền vệ cánh, Hà Nội",
    roleEn: "Winger, Hanoi",
    commentVi: "Chất vải mè của áo đấu Kamito Cobra mát lắm, thấm hút mồ hôi nhanh, mặc cả trận không thấy bí da tí nào.",
    commentEn: "The honeycomb fabric of Kamito Cobra jersey is so cool. It absorbs sweat fast and stays dry all match."
  },
  {
    id: "test-4",
    rating: 5,
    verified: true,
    avatar: "/images/Football_boots/546559514_694503000309803_2615155088747525706_n.jpg",
    name: "Lê Minh Hoàng",
    roleVi: "Thủ môn, Đà Nẵng",
    roleEn: "Goalkeeper, Da Nang",
    commentVi: "Giao hàng siêu nhanh! Đặt buổi trưa mà chiều đã nhận được giày TA11 để kịp ra sân tối nay.",
    commentEn: "Super fast delivery! Ordered at noon and got my TA11 boots in the afternoon just in time for tonight's match."
  },
  {
    id: "test-5",
    rating: 5,
    verified: true,
    avatar: "/images/Football_boots/560007171_723586054068164_4097486310039373134_n.jpg",
    name: "Phạm Quốc Duy",
    roleVi: "Hậu vệ, Bình Dương",
    roleEn: "Defender, Binh Duong",
    commentVi: "Băng gối silicon hỗ trợ khớp cực tốt, từ lúc đeo không còn bị đau mỏi sau mỗi trận đấu căng thẳng.",
    commentEn: "The silicon knee guard supports joints perfectly. No more knee pain after intense matches since I used it."
  },
  {
    id: "test-6",
    rating: 5,
    verified: true,
    avatar: "/images/Football_boots/560193636_723586180734818_3305869455430713739_n.jpg",
    name: "Hoàng Xuân Trường",
    roleVi: "Tiền đạo, Hải Phòng",
    roleEn: "Striker, Hai Phong",
    commentVi: "Balo Ông Bầu Pro thiết kế rất thông minh, ngăn đựng giày riêng biệt cực kỳ tiện lợi và sạch sẽ.",
    commentEn: "Ong Bau Pro backpack has a very smart design. The separate shoe compartment is extremely convenient and clean."
  },
  {
    id: "test-7",
    rating: 5,
    verified: true,
    avatar: "/images/soccer_clothes/kamito/671727629_868763976217037_6248427600075867490_n.jpg",
    name: "Marcus Nguyen",
    roleVi: "Cầu thủ bán chuyên, TP.HCM",
    roleEn: "Semi-pro Player, HCMC",
    commentVi: "Dịch vụ chăm sóc khách hàng tư vấn size rất chuẩn xác. Giày đi vừa vặn, ôm chân hoàn hảo.",
    commentEn: "Customer service was very helpful in sizing. The boots fit perfectly and wrap my feet beautifully."
  },
  {
    id: "test-8",
    rating: 5,
    verified: true,
    avatar: "/images/soccer_clothes/kamito/674286523_868763939550374_5953917136598584271_n.jpg",
    name: "Bùi Tiến Dũng",
    roleVi: "Tiền vệ, Cần Thơ",
    roleEn: "Midfielder, Can Tho",
    commentVi: "Giày TA11 có đệm giảm chấn êm ái thực sự, đá trên sân nhân tạo cứng mà không bị đau gót chân.",
    commentEn: "TA11 boots have amazing cushioning. Playing on hard artificial grass and no heel pain at all."
  },
  {
    id: "test-9",
    rating: 5,
    verified: true,
    avatar: "/images/soccer_clothes/Kelme/678430944_874305608996207_5221596085370446251_n.jpg",
    name: "David Pham",
    roleVi: "Thành viên FC Brotherhood",
    roleEn: "FC Brotherhood Member",
    commentVi: "Áo đấu mặc nhẹ như không, giặt mấy lần rồi hình in vẫn nguyên vẹn không bong tróc tí nào.",
    commentEn: "The jersey feels weightless. Washed it multiple times and the prints are still pristine, no peeling."
  },
  {
    id: "test-10",
    rating: 5,
    verified: true,
    avatar: "/images/Logo/logo.jpg",
    name: "Alex Johnson",
    roleVi: "Người nước ngoài sinh sống tại VN",
    roleEn: "Expat living in Vietnam",
    commentVi: "Rất ấn tượng với chất lượng và độ hoàn thiện của sản phẩm. Sẽ tiếp tục ủng hộ shop lâu dài.",
    commentEn: "Very impressed with the quality and finish of the product. Will definitely support the shop long term."
  }
]

export function TestimonialsSection({ vi, en }: BilingualTestimonialsProps) {
  const { locale } = useLanguage()
  const data = locale === "vi" ? vi : en
  const isVi = locale === "vi"
  const sectionRef = useScrollReveal()

  const testimonials = LOCAL_TESTIMONIALS.map((item) => ({
    id: item.id,
    name: item.name,
    avatar: item.avatar,
    rating: item.rating,
    verified: item.verified,
    role: isVi ? item.roleVi : item.roleEn,
    comment: isVi ? item.commentVi : item.commentEn,
  }))

  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-gradient-reverse overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/background/background4.png"
          alt="Testimonials Section Background"
          fill
          quality={70}
          className="object-cover object-center opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      {/* Decorative */}
      <div className="section-divider-top" />
      <div className="pitch-pattern" />
      <div className="glow-orb glow-orb-gold w-[500px] h-[500px] top-1/3 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="reveal">
            <div className="section-number justify-center">
              <span className="num">06</span>
              <span>{isVi ? "ĐÁNH GIÁ TỪ CẦU THỦ" : "WHAT PLAYERS SAY"}</span>
            </div>
          </div>

          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight">
            {data.title.split(" ")[0] || ""}{" "}
            <span className="text-gradient-gold">
              {data.title.split(" ").slice(1).join(" ") || ""}
            </span>
          </h2>
          {data.subtitle && (
            <p className="reveal reveal-delay-2 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          )}
          <div className="reveal reveal-delay-2 decorative-line-h mx-auto" />
        </div>

        {/* Testimonials Auto-Scrolling Loop Marquee */}
        <div className="reveal reveal-delay-3 relative w-full overflow-hidden py-4">
          {/* Side blur gradients */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex gap-5">
            {duplicatedTestimonials.map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}`}
                className="group relative w-[320px] sm:w-[380px] shrink-0 rounded-2xl border border-border/40 bg-card/25 p-7 flex flex-col justify-between transition-all duration-500 hover:bg-card/50 hover:border-primary/20 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Large quote mark */}
                <span className="absolute top-5 right-6 text-5xl text-primary/8 font-serif select-none pointer-events-none leading-none">
                  &ldquo;
                </span>

                {/* Index */}
                <span className="absolute top-5 left-6 text-[9px] font-mono font-bold text-foreground/[0.06] tracking-widest">
                  {String((idx % 10) + 1).padStart(2, "0")}
                </span>

                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex items-center text-primary gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < testimonial.rating ? "fill-primary" : "text-border"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed italic">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>
                </div>

                {/* Customer Info */}
                <div className="flex items-center gap-3 mt-8 pt-5 border-t border-border/30">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border/40 shrink-0">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-foreground text-xs sm:text-sm truncate">
                        {testimonial.name}
                      </span>
                      {testimonial.verified && (
                        <span
                          title={isVi ? "Khách hàng đã xác minh" : "Verified Customer"}
                          className="shrink-0 flex items-center"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 fill-green-500/10" />
                        </span>
                      )}
                    </div>
                    <span className="block text-[9px] sm:text-[10px] text-muted-foreground font-medium mt-0.5 truncate">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection;
