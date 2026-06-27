import type { Metadata } from 'next'
import { Activity, Calculator, PiggyBank } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import HealthCalc from './HealthCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Health Insurance Deductible Calculator',
  description: 'Calculate your true out-of-pocket health insurance costs based on your deductible, coinsurance, and expected medical usage.',
  alternates: { canonical: 'https://zeember.com/health-insurance-deductible-calculator' },
  openGraph: { title: 'Health Insurance Deductible Calculator | Zeember', url: 'https://zeember.com/health-insurance-deductible-calculator' },
}

const faqItems: FAQItem[] = [
  {
    question: 'What is the difference between a deductible and an out-of-pocket maximum?',
    answer: 'The deductible is the amount you pay before your insurer starts sharing costs. The out-of-pocket maximum is the most you will pay in a plan year — after that, your insurer covers 100%. Between the deductible and the out-of-pocket max, you typically pay coinsurance (a percentage of each bill). In 2026, ACA plans cap the out-of-pocket maximum at $9,450 for individuals.',
  },
  {
    question: 'Should I choose a high-deductible or low-deductible health plan?',
    answer: 'High-deductible plans have lower monthly premiums but require you to pay more before coverage kicks in. They make sense for healthy people with minimal expected medical costs. Low-deductible plans have higher premiums but lower out-of-pocket costs when you need care — better for people who regularly use medical services. Use this calculator to compare your total annual cost under each scenario.',
  },
  {
    question: 'What is coinsurance and how does it work?',
    answer: 'Coinsurance is the percentage of costs you pay after meeting your deductible. With 20% coinsurance, if you have a $3,000 bill after your deductible, you pay $600 and your insurer pays $2,400. Coinsurance continues until you hit your out-of-pocket maximum, after which you pay nothing for covered services for the rest of the year.',
  },
  {
    question: 'What is the difference between coinsurance and a copay?',
    answer: 'A copay is a fixed dollar amount per visit (e.g., $30 for a primary care visit), regardless of the total bill. Coinsurance is a percentage of the total bill. Many plans use both: copays for routine visits and coinsurance for larger services like hospital stays or specialist care. Copays often apply before the deductible for preventive care; coinsurance typically applies after the deductible.',
  },
  {
    question: 'What counts toward my out-of-pocket maximum?',
    answer: 'Your deductible, copays, and coinsurance for covered services all count toward your out-of-pocket maximum. Premiums do not count. Out-of-network costs may or may not count depending on your plan. Balance bills from out-of-network providers do not count. Review your Summary of Benefits and Coverage (SBC) for specifics on what counts for your plan.',
  },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'HSA Contribution', href: '/hsa-contribution-calculator', description: 'Calculate your 2026 HSA contribution limit and tax savings.', icon: PiggyBank },
  { title: 'Out-of-Pocket Max', href: '/out-of-pocket-max-estimator', description: 'Estimate when you will hit your annual out-of-pocket maximum.', icon: Calculator },
  { title: 'COBRA Cost', href: '/cobra-cost-calculator', description: 'See exactly what COBRA continuation coverage will cost you.', icon: Activity },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">Understanding your true health insurance cost</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      The sticker price of a health insurance plan — the monthly premium — is only part of your actual cost. Your total annual health care spend includes your premium plus whatever you pay out of pocket: deductibles, coinsurance, and copays. Two plans with the same premium can have wildly different total costs depending on how much medical care you use.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">The three numbers that matter</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Deductible: what you pay before insurance shares costs. Coinsurance: your percentage after the deductible. Out-of-pocket maximum: the most you can possibly pay in a year. For someone who rarely sees a doctor, a high-deductible plan can save hundreds per year in premiums. For someone managing a chronic condition with frequent specialist visits, a lower-deductible plan may cost less overall despite the higher premium.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">HSA advantage with high-deductible plans</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      If you choose a qualifying high-deductible plan, you can contribute pre-tax dollars to a Health Savings Account. In 2026, the limit is $4,300 for self-only coverage and $8,550 for family. The tax savings alone can offset the higher out-of-pocket costs for people who stay healthy most years.
    </p>
  </div>
)

export default function HealthDeductiblePage() {
  return (
    <ToolPageWrapper
      title="Health insurance deductible calculator"
      subtitle="See your true annual health care cost — premiums plus out-of-pocket spending — based on your expected medical use."
      canonicalUrl="https://zeember.com/health-insurance-deductible-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Health deductible calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <HealthCalc />
    </ToolPageWrapper>
  )
}
