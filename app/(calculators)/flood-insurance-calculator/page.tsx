import type { Metadata } from 'next'
import { Home, Waves, Shield } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import FloodCalc from './FloodCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Flood Insurance Cost Estimator | Zeember',
  description: 'Estimate NFIP or private flood insurance costs based on your property flood zone and coverage needs.',
  alternates: { canonical: 'https://zeember.com/flood-insurance-calculator' },
  openGraph: { title: 'Flood Insurance Cost Estimator | Zeember', url: 'https://zeember.com/flood-insurance-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'Does homeowners insurance cover flood damage?', answer: 'No. Standard homeowners insurance explicitly excludes flood damage. Flooding from storms, overflowing rivers, storm surge, and similar events is not covered by a standard home policy. You need a separate flood insurance policy through the NFIP (National Flood Insurance Program) or a private flood insurer. This is one of the most common — and costly — coverage gaps homeowners discover after a disaster.' },
  { question: 'Do I need flood insurance if I am not in a high-risk zone?', answer: 'FEMA estimates that 25% of all flood insurance claims come from properties outside high-risk flood zones. Low and moderate-risk zones (Zone X) have a 0.2% or lower annual chance of flooding — not zero. Flood insurance in low-risk zones is significantly cheaper than in high-risk zones. Given climate change trends increasing flood frequency, flood insurance is worth considering even in Zone X.' },
  { question: 'What is the difference between NFIP and private flood insurance?', answer: 'NFIP (National Flood Insurance Program) is federally administered through FEMA and sold through standard insurers. It has standardized coverage limits ($250,000 building, $100,000 contents for residential) and rates. Private flood insurance offers potentially higher coverage limits, broader coverage terms, lower deductibles, and sometimes lower premiums — but with less regulatory backing. Compare both before choosing.' },
  { question: 'How long does it take for flood insurance to take effect?', answer: 'NFIP policies have a 30-day waiting period before coverage takes effect. This is a critical point: you cannot buy flood insurance when a hurricane is approaching and expect coverage. There are exceptions for new policy purchases when required by a lender at loan closing. Private flood insurers may have shorter or no waiting periods. Never wait until flood season to purchase coverage.' },
  { question: 'What does flood insurance not cover?', answer: 'Flood insurance does not cover temporary housing while your home is repaired, financial losses from business interruption, vehicles (covered by comprehensive auto insurance), property outside the insured building, currency, precious metals, or most self-propelled vehicles. Underground systems like septic tanks and swimming pools are generally excluded. Damage caused by moisture or mold that could have been avoided is also excluded.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Home Insurance Calculator', href: '/home-insurance-calculator', description: 'Estimate your homeowners insurance premium.', icon: Home },
  { title: 'Home Coverage Calculator', href: '/home-insurance-coverage-calculator', description: 'Calculate how much dwelling coverage you actually need.', icon: Shield },
  { title: 'Bundling Discount', href: '/bundling-discount-calculator', description: 'See how much you save bundling home and auto insurance.', icon: Waves },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">How flood insurance is priced</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      The NFIP uses a risk-rating system (Risk Rating 2.0) that prices flood insurance based on each property individually — considering flood type, frequency, distance to water sources, and first-floor elevation relative to the Base Flood Elevation (BFE). Properties above the BFE pay less; properties below it pay substantially more. Elevation certificates can document your elevation and potentially reduce your premium.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Flood zones and what they mean</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Zone X is the safest designation — outside the 500-year floodplain with minimal flood risk. Zone A and AE are Special Flood Hazard Areas with a 1% annual chance of flooding. Zone V and VE are coastal high-hazard areas that include wave action, which increases risk and premiums significantly. Find your flood zone using the FEMA Flood Map Service Center — enter your address to see your official designation.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">NFIP limits and the private market</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      NFIP caps residential building coverage at $250,000 and contents at $100,000. For homes worth more, you need excess flood coverage through the private market. Private flood insurers can also offer broader coverage terms and sometimes lower premiums, particularly in lower-risk zones. The private market has grown significantly and is worth comparing before defaulting to NFIP.
    </p>
  </div>
)

export default function FloodInsurancePage() {
  return (
    <ToolPageWrapper
      title="Flood insurance cost estimator"
      subtitle="Estimate annual flood insurance costs based on your flood zone, coverage needs, and property type."
      canonicalUrl="https://zeember.com/flood-insurance-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Flood insurance calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <FloodCalc />
    </ToolPageWrapper>
  )
}
