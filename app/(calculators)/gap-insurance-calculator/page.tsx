import type { Metadata } from 'next'
import { Car, Shield, TrendingDown } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import GapCalc from './GapCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Gap Insurance Calculator — Do You Need It? | Zeember',
  description: 'Find out if you need gap insurance and how much it costs. Calculate your coverage gap instantly.',
  alternates: { canonical: 'https://zeember.com/gap-insurance-calculator' },
  openGraph: { title: 'Gap Insurance Calculator | Zeember', url: 'https://zeember.com/gap-insurance-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'What is gap insurance and how does it work?', answer: 'Gap insurance (Guaranteed Asset Protection) covers the difference between what your car is worth and what you owe on your loan if the vehicle is totaled or stolen. Your regular auto insurance pays the actual cash value of the vehicle. If that is less than your loan payoff amount, you owe the difference — which can be thousands of dollars. Gap insurance covers that shortfall.' },
  { question: 'When is gap insurance most necessary?', answer: 'Gap insurance is most valuable in the first 1-3 years of a new vehicle loan when depreciation is steepest. A new car can lose 20-25% of its value in the first year, but loan payoff is much slower. It is also important for long loan terms (60-84 months), small down payments (under 20%), and vehicles known for rapid depreciation.' },
  { question: 'How much does gap insurance cost?', answer: 'Through your auto insurer (the cheapest option), gap insurance typically adds $20-$40/year to your policy. Through a dealership at purchase, you may pay $200-$700 as a one-time fee added to your loan — more expensive and often financed at interest. Through third-party providers, expect $100-$300 total. Always buy gap coverage from your insurer rather than the dealership when possible.' },
  { question: 'Can I add gap insurance after purchase?', answer: 'Yes, you can add gap coverage to your existing auto policy at any time, as long as you still have a loan balance that exceeds your vehicle value. Some insurers restrict it to vehicles under a certain age (commonly 2-3 years old). Once your loan balance drops below the vehicle value, gap insurance is no longer needed — you can remove it.' },
  { question: 'Does gap insurance cover my deductible?', answer: 'Standard gap insurance does not cover your collision deductible. A variation called GAAP (Gap with deductible coverage) or loan/lease payoff coverage does include the deductible, but it is less common. After your insurer pays the vehicle value minus your deductible, gap pays the remaining loan balance — not the deductible itself.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Full vs Liability Calculator', href: '/full-coverage-vs-liability-calculator', description: 'Decide if full coverage is worth it for your vehicle value.', icon: Shield },
  { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator', description: 'Estimate your complete auto insurance premium.', icon: Car },
  { title: 'Car Insurance by State', href: '/car-insurance-cost-by-state', description: 'See average auto insurance costs across all 50 states.', icon: TrendingDown },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">The depreciation problem gap insurance solves</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      A new vehicle loses roughly 20% of its value the moment it leaves the dealership lot. After one year, total depreciation often reaches 25-30%. Yet auto loan payments are structured to reduce the balance slowly in the early years — the majority of early payments go toward interest, not principal. This creates a window where you owe significantly more than the vehicle is worth.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">The total-loss scenario</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      If your car is totaled in year one, your collision coverage pays the actual cash value — what the car is worth today. If you paid $35,000, the car might be worth $26,000 after one year. But you might still owe $31,000 on your loan. Your insurer writes you a check for $26,000. The lender gets paid $26,000. You still owe $5,000 — on a car you no longer have. That is the gap.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">When gap insurance is not needed</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      Once your loan balance drops below your vehicle value, gap insurance provides no benefit. This typically happens 2-4 years into a standard loan, though it depends on your depreciation rate, loan term, and down payment. Once this calculator shows no gap, remove gap coverage from your policy to save the modest but unnecessary premium.
    </p>
  </div>
)

export default function GapInsurancePage() {
  return (
    <ToolPageWrapper
      title="Gap insurance calculator"
      subtitle="Find out if you have a coverage gap between what your car is worth and what you still owe on your loan."
      canonicalUrl="https://zeember.com/gap-insurance-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gap insurance calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <GapCalc />
    </ToolPageWrapper>
  )
}
