export interface HeroProps {
  headline: string
  subheadline?: string
  ctaText: string
  ctaHref: string
  backgroundImage: string
}

export interface CategoryItem {
  id: string
  name: string
  slug: string
  image: string
  itemCount: number
}

export interface CategoriesProps {
  title: string
  subtitle?: string
  items: CategoryItem[]
}

export interface ProductItem {
  id: string
  name: string
  category: string
  price: number
  originalPrice: number
  rating: number
  reviewsCount: number
  image: string
  isHot?: boolean
  sizes?: string[]
}

export interface ProductsProps {
  title: string
  subtitle?: string
  items: ProductItem[]
}

export interface BenefitItem {
  id: string
  title: string
  description: string
  icon: string
}

export interface BenefitsProps {
  title: string
  subtitle?: string
  items: BenefitItem[]
}

export interface PromoProps {
  title: string
  description: string
  highlightText?: string
  discountCode?: string
  ctaText: string
  ctaHref: string
  image: string
  endsInSeconds: number
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  avatar: string
  comment: string
  rating: number
  verified: boolean
}

export interface TestimonialsProps {
  title: string
  subtitle?: string
  items: TestimonialItem[]
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQProps {
  title?: string
  subtitle?: string
  items: FAQItem[]
}

export interface FooterCTAProps {
  title: string
  description: string
  ctaText: string
  ctaHref: string
}

export interface LandingPageContentLocale {
  seoTitle: string
  seoDescription: string
  campaignName: string
  hero: HeroProps
  categories: CategoriesProps
  products: ProductsProps
  benefits: BenefitsProps
  promo: PromoProps
  testimonials: TestimonialsProps
  faq: FAQItem[]
  cta: FooterCTAProps
}

export interface LandingPageContent {
  vi: LandingPageContentLocale
  en: LandingPageContentLocale
}
