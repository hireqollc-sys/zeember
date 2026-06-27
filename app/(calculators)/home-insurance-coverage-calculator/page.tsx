import type { Metadata } from 'next'
import { Home, Shield, Calculator } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import HomeCoverageCalc from './HomeCoverageCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Home Insurance Coverage Calculator — How Much Do You Need? | Zeember',
  description: 'Calculate your home rebuild cost and how much dwelling coverage you actually need. Not the same as market value.',
  alternates: { canonical: 'https://zeember.com/home-insurance-coverage-calculator' },
  openGraph: { title: 'Home Insurance Coverage Calculator | Zeember', url: 'https://zeember.com/home-insurance-coverage-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'What is dwelling coverage?', answer: 'Dwelling coverage (Coverage A) is the portion of your homeowners policy that pays to repair or rebuild the physical structure of your home if it is damaged by a covered peril. This includes the walls, roof, floors, built-in appliances, and attached structures. It does not cover the land your home sits on or detached structures (those are covered separately).' },
  { question: 'Why is dwelling coverage different from market value?', answer: 'Market value includes the land, location desirability, nearby amenities, and current real estate conditions — none of which are insurable. Dwelling coverage only needs to cover the rebuild cost: what it would cost to demolish the remains and build an identical structure with current labor and materials. In high-cost real estate markets, rebuild cost is often well below market value. In rural areas, it can be the reverse.' },
  { question: 'What happens if I am underinsured?', answer: 'If your dwelling coverage is less than 80% of your home\'s rebuild cost, most policies apply a coinsurance penalty that reduces your payout proportionally on partial losses. For a total loss, your insurer pays up to your coverage limit — if your home needs $400,000 to rebuild but you only carry $280,000, you cover the $120,000 gap yourself. Review your coverage amount annually, especially after renovations.' },
  { question: 'Should I have replacement cost or actual cash value coverage?', answer: 'Replacement cost value (RCV) coverage pays to rebuild or repair with new materials without depreciation deductions. Actual cash value (ACV) coverage deducts depreciation — a 20-year-old roof that costs $15,000 to replace might only get $5,000 under ACV after depreciation. RCV coverage costs more but provides far better protection. For dwelling coverage, RCV is strongly recommended.' },
  { question: 'What is extended replacement cost coverage?', answer: 'Extended replacement cost provides an additional buffer — typically 20-50% above your dwelling coverage limit — if actual rebuild costs exceed your coverage amount due to post-disaster price spikes. After a major disaster, contractor and materials costs can spike 20-40% above normal. Extended replacement cost coverage protects against that scenario. It costs very little extra and is worth adding if available.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Home Insurance Calculator', href: '/home-insurance-calculator', description: 'Estimate your annual homeowners insurance premium.', icon: Home },
  { title: 'Personal Property Calculator', href: '/personal-property-calculator', description: 'Calculate the replacement value of your personal belongings.', icon: Calculator },
  { title: 'Flood Insurance Estimator', href: '/flood-insurance-calculator', description: 'Estimate NFIP flood insurance costs for your property.', icon: Shield },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">The rebuild cost vs market value distinction</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      One of the most common home insurance mistakes is setting dwelling coverage equal to your purchase price or current market value. Your home insurance does not need to cover the land value, the neighborhood premium, or the appreciation since you bought. It only needs to cover the cost to demolish and rebuild the physical structure. In expensive real estate markets, this can be 40-60% of market value.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">How rebuild cost is calculated</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Rebuild cost is primarily a function of square footage times local construction cost per square foot. Regional construction costs vary from roughly $100/sqft in low-cost markets to $250+/sqft in high-cost markets. The finishes and construction type matter too: custom tile, hardwood floors, and high-end cabinetry add to rebuild cost. The age of the home matters for code compliance costs — older homes often require upgrading to current codes during rebuilds.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Inflation and the coverage gap</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      Construction costs have increased substantially since 2020. A home insured adequately in 2019 may now be significantly underinsured at the same coverage amount. Review your dwelling coverage annually and after any major renovation. Your insurer may offer automatic inflation adjustment riders that increase your coverage limit each year in line with construction cost indices — these are worth adding.
    </p>
  </div>
)

export default function HomeCoveragePage() {
  return (
    <ToolPageWrapper
      title="Home insurance coverage calculator"
      subtitle="Calculate how much dwelling coverage you actually need based on your home rebuild cost — not its market value."
      canonicalUrl="https://zeember.com/home-insurance-coverage-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Home coverage calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <HomeCoverageCalc />
    </ToolPageWrapper>
  )
}
