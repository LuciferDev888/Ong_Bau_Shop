import { Metadata } from "next"
import { notFound } from "next/navigation"
import HeroSection from "@/components/sections/HeroSection"
import CategoriesSection from "@/components/sections/CategoriesSection"
import SpotlightSection from "@/components/sections/SpotlightSection"
import ProductsSection from "@/components/sections/ProductsSection"
import BenefitsSection from "@/components/sections/BenefitsSection"
import PromoSection from "@/components/sections/PromoSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import LeadFormSection from "@/components/sections/LeadFormSection"
import FAQSection from "@/components/sections/FAQSection"
import CTAFooterSection from "@/components/sections/CTAFooterSection"
import { getLandingPageContent } from "@/lib/content"

// SEO Metadata Generation (Defaults to VI metadata)
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const content = await getLandingPageContent(params.slug)

  if (!content) return {}

  return {
    title: content.vi.seoTitle,
    description: content.vi.seoDescription,
    openGraph: {
      title: content.vi.seoTitle,
      description: content.vi.seoDescription,
      images: [{ url: `/og/${params.slug}.png` }],
    },
  }
}

// Page Component
export default async function LandingPage({
  params,
}: {
  params: { slug: string }
}) {
  const content = await getLandingPageContent(params.slug)

  if (!content) notFound()

  return (
    <main className="relative min-h-screen">
      {/* Hero section */}
      <HeroSection vi={content.vi.hero} en={content.en.hero} />

      {/* Featured Categories */}
      <CategoriesSection vi={content.vi.categories} en={content.en.categories} />

      {/* Elite Highlight Spotlight Section */}
      <SpotlightSection products={content.vi.products.items} />

      {/* Redesigned Grid Catalog */}
      <ProductsSection
        vi={content.vi.products}
        en={content.en.products}
        items={content.vi.products.items}
      />

      {/* Guarantees / Benefits */}
      <BenefitsSection vi={content.vi.benefits} en={content.en.benefits} />

      {/* Interactive Promo Banner */}
      <PromoSection vi={content.vi.promo} en={content.en.promo} />

      {/* Testimonials social proof */}
      <TestimonialsSection vi={content.vi.testimonials} en={content.en.testimonials} />

      {/* Lead registration form wrapper */}
      <LeadFormSection
        campaignName={content.vi.campaignName}
        products={content.vi.products.items}
      />

      {/* FAQ Accordion */}
      <FAQSection vi={content.vi.faq} en={content.en.faq} />

      {/* CTA Footer right above layout footer */}
      <CTAFooterSection vi={content.vi.cta} en={content.en.cta} />
    </main>
  )
}
