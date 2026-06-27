import type { Metadata } from 'next'
import { Car, Shield, Calculator } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import TeenCalc from './TeenCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Teen Driver Insurance Cost Calculator | Zeember',
  description: 'Estimate how much adding a teen driver increases your auto insurance. Compare adding to existing policy vs separate policy.',
  alternates: { canonical: 'https://zeember.com/teen-driver-insurance-calculator' },
  openGraph: { title: 'Teen Driver Insurance Calculator | Zeember', url: 'https://zeember.com/teen-driver-insurance-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'How much does adding a teen driver increase insurance?', answer: 'Adding a teen driver typically increases auto insurance premiums by 50-100% depending on the teen age, gender, and vehicle. A 16-year-old male on a full-coverage policy can increase a parent\'s premium by $1,500-$3,000/year. A 17-18 year old female may add $800-$1,800/year. Rates drop significantly at ages 20-25 as actuarial risk declines with driving experience.' },
  { question: 'Is it cheaper to add a teen to my policy or get them their own policy?', answer: 'In almost all cases, adding a teen to your existing policy is significantly cheaper than a standalone teen policy. Standalone teen policies lack the multi-car discount, multi-driver discount, and any existing loyalty discounts on your policy. Adding to your policy typically costs 50-75% less than a separate policy for the same coverage level.' },
  { question: 'What discounts can lower teen driver insurance costs?', answer: 'Good student discounts (3.0+ GPA) typically save 8-15%. Completing an approved drivers education course saves 5-10%. Telematics programs that monitor driving behavior can save 10-25% for safe drivers. Some insurers offer discounts for students who attend college 100+ miles away without their car. Bundling all vehicles on one policy also helps.' },
  { question: 'What vehicle should a teen driver use for the lowest insurance cost?', answer: 'The safest and cheapest vehicles to insure for teens are older, modest sedans with good safety ratings. Avoid sports cars, high-trim SUVs, and performance vehicles — these add 30-50% to teen insurance costs. The IIHS publishes lists of recommended vehicles for teen drivers that balance safety with affordability. A vehicle in the $8,000-$15,000 range with good crash ratings is ideal.' },
  { question: 'When does teen insurance get cheaper?', answer: 'Teen driver rates decline significantly starting at age 18, drop again at 21, and reach a rough adult floor around ages 25-26. Males see a more dramatic decline than females because the initial risk premium is higher. Maintaining a clean record through the teen years is the single most important factor in having affordable insurance as a young adult.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator', description: 'Estimate the full auto insurance cost for any driver profile.', icon: Car },
  { title: 'Full vs Liability Calculator', href: '/full-coverage-vs-liability-calculator', description: 'Decide whether full coverage is worth it for a teen driver vehicle.', icon: Shield },
  { title: 'SR-22 Insurance', href: '/sr-22-insurance-calculator', description: 'Estimate SR-22 insurance costs if a teen receives a serious violation.', icon: Calculator },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">Why teen driver insurance is so expensive</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Teen drivers have accident rates 3-4x higher than adults. Drivers aged 16-19 account for disproportionately high shares of accident-related fatalities and property damage claims. Insurance is priced on statistical risk, and the actuarial data on teen drivers is unambiguous. A 16-year-old male driver is statistically the highest-risk driver on the road outside of elderly drivers with cognitive decline.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">How to reduce the cost</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Good student discounts, drivers education completion, and telematics programs collectively can reduce teen insurance costs by 20-35%. The vehicle choice matters enormously — insuring a teen on a sports car can add 50% compared to a standard sedan. Keeping the teen on your policy rather than a standalone policy also saves significantly. Shopping around at renewal time is worth doing, as carriers rate teen risk differently.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Coverage considerations for teen drivers</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      Given the higher accident likelihood, consider whether the vehicle has enough value to justify full coverage. If the teen drives an older car worth $5,000 and full coverage adds $1,400/year, dropping to liability on that vehicle may make financial sense. Always maintain high liability limits, however — a teen causing a serious accident can expose your household to substantial liability. Consider an umbrella policy for added protection.
    </p>
  </div>
)

export default function TeenDriverPage() {
  return (
    <ToolPageWrapper
      title="Teen driver insurance calculator"
      subtitle="Find out how much adding a teen driver will increase your auto insurance and what discounts can reduce the cost."
      canonicalUrl="https://zeember.com/teen-driver-insurance-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Teen driver insurance calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <TeenCalc />
    </ToolPageWrapper>
  )
}
