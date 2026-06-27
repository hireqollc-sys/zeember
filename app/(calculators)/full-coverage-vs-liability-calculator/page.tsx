import type { Metadata } from 'next'
import { Car, Shield, Calculator } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import FullVsLiabilityCalc from './FullVsLiabilityCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Full Coverage vs Liability Insurance Calculator | Zeember',
  description: 'Find out if full coverage auto insurance is worth it for your car value. See the break-even point instantly.',
  alternates: { canonical: 'https://zeember.com/full-coverage-vs-liability-calculator' },
  openGraph: { title: 'Full Coverage vs Liability Calculator | Zeember', url: 'https://zeember.com/full-coverage-vs-liability-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'What is the difference between full coverage and liability insurance?', answer: 'Liability insurance (required by law in most states) covers damage and injuries you cause to others. Full coverage adds collision coverage (repairs your car after an accident regardless of fault) and comprehensive coverage (covers non-collision damage like theft, weather, or hitting a deer). Full coverage protects you and your vehicle; liability protects others.' },
  { question: 'When should I drop full coverage?', answer: 'The most common rule of thumb: if your vehicle is worth less than 10 times the extra annual premium for full coverage, it may not be worth carrying. If your car is worth $8,000 and full coverage costs $1,100/year more than liability, but liability alone costs $600, you are paying $1,100 for coverage with a maximum payout of roughly $7,500 (value minus deductible). Most financial advisors suggest re-evaluating when the vehicle drops below $4,000-$6,000.' },
  { question: 'Do I have to keep full coverage if my car is financed?', answer: 'Yes. If your vehicle is financed or leased, your lender requires full coverage. The lender has a financial interest in the vehicle and needs it protected against total loss. If you drop collision or comprehensive on a financed vehicle, your lender can force-place insurance — at a much higher rate — and bill you for it.' },
  { question: 'What is gap insurance and do I need it with full coverage?', answer: 'Full coverage pays the actual cash value of your vehicle, which may be less than what you owe on your loan. If your car is worth $18,000 but you owe $24,000, full coverage pays $18,000 and you are still responsible for $6,000. Gap insurance covers that difference. It is particularly valuable in the first 2-3 years of a new car loan when depreciation outpaces loan payoff.' },
  { question: 'Does my deductible affect whether full coverage is worth it?', answer: 'Yes, significantly. A $1,000 deductible reduces the net benefit of full coverage (since you always pay that amount out of pocket before the insurer pays anything). The higher your deductible, the lower the effective value of your full coverage. Higher deductibles also lower your premium. The optimal deductible is typically the highest amount you could comfortably pay out of pocket after an accident.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator', description: 'Estimate your full auto insurance cost with a complete breakdown.', icon: Car },
  { title: 'Gap Insurance Calculator', href: '/gap-insurance-calculator', description: 'Find out if you need gap insurance and how much it costs.', icon: Shield },
  { title: 'Teen Driver Insurance', href: '/teen-driver-insurance-calculator', description: 'Estimate how much adding a teen driver raises your premium.', icon: Calculator },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">The break-even math for full coverage</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Full coverage adds collision and comprehensive to your base liability policy. The question is whether the protection is worth the extra premium. The break-even calculation is straightforward: divide your maximum payout (vehicle value minus deductible) by the extra annual cost for full coverage. If you would need to collect on the coverage within that many years to break even, you can assess whether the risk is worth it.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Depreciation changes the math over time</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      A new car loses 20-25% of its value in the first year. By year five, many vehicles have lost 50-60% of their original value. Yet insurance premiums do not drop at the same rate. This means the ratio of cost to benefit for full coverage gets worse every year you keep an aging vehicle. Revisit this calculator every 12 months to see if dropping to liability now makes sense.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">One more thing: your financial situation</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      The break-even math assumes you could absorb a total loss if you dropped full coverage. If losing your $9,000 car would create a financial hardship — no emergency fund, no way to replace transportation — full coverage may be worth carrying even if the math is borderline. The formula optimizes for expected value, not financial resilience.
    </p>
  </div>
)

export default function FullVsLiabilityPage() {
  return (
    <ToolPageWrapper
      title="Full coverage vs liability calculator"
      subtitle="Find out if full coverage is worth it based on your vehicle value, deductible, and current premiums."
      canonicalUrl="https://zeember.com/full-coverage-vs-liability-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Full vs liability calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <FullVsLiabilityCalc />
    </ToolPageWrapper>
  )
}
