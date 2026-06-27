import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import AdUnit from '@/components/AdUnit'
import Disclaimer from '@/components/Disclaimer'
import FAQAccordion, { type FAQItem } from '@/components/FAQAccordion'
import RelatedCalculators, { type RelatedCalc } from '@/components/RelatedCalculators'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface ToolPageWrapperProps {
  title: string
  subtitle: string
  canonicalUrl: string
  breadcrumbs: BreadcrumbItem[]
  howToContent: React.ReactNode
  faqItems: FAQItem[]
  relatedCalculators: RelatedCalc[]
  children: React.ReactNode
}

export default function ToolPageWrapper({
  title,
  subtitle,
  canonicalUrl,
  breadcrumbs,
  howToContent,
  faqItems,
  relatedCalculators,
  children,
}: ToolPageWrapperProps) {
  return (
    <main>
      {/* Page hero */}
      <section className="bg-primary-light py-10 md:py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 mb-4" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={14} className="text-neutral-400" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="font-sans text-sm text-neutral-500 hover:text-primary-dark transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-sans text-sm text-neutral-700 font-medium">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>

          <h1 className="font-serif text-[56px] md:text-[36px] font-bold text-primary-dark leading-tight max-w-3xl">
            {title}
          </h1>
          <p className="font-sans text-xl text-neutral-600 mt-3 max-w-2xl leading-relaxed">
            {subtitle}
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center gap-6 mt-6">
            {['No signup required', 'No personal info stored', 'NAIC data sourced'].map((signal) => (
              <div key={signal} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-accent" aria-hidden="true" />
                <span className="font-sans text-sm text-neutral-600">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard ad */}
      <div className="max-w-7xl mx-auto px-6">
        <AdUnit slot="LEADERBOARD_1" format="leaderboard" />
      </div>

      {/* Main content: calculator left, results right */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {children}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <Disclaimer type="calculator" />
      </div>

      {/* How-to guide */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          {howToContent}
        </div>
      </section>

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6">
            <FAQAccordion items={faqItems} pageUrl={canonicalUrl} />
          </div>
        </section>
      )}

      {/* Related calculators */}
      {relatedCalculators.length >= 3 && (
        <section className="bg-neutral-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <RelatedCalculators calculators={relatedCalculators} />
          </div>
        </section>
      )}

      {/* Footer ad */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AdUnit slot="RECTANGLE_1" format="rectangle" />
      </div>
    </main>
  )
}
