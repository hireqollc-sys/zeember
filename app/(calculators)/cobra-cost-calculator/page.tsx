import type { Metadata } from 'next'
import { Activity, DollarSign, Heart } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import CobraCalc from './CobraCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'COBRA Insurance Cost Calculator — What Will You Pay?',
  description: 'Find out how much COBRA health insurance will cost after leaving your job. Compare COBRA vs ACA marketplace alternatives.',
  alternates: { canonical: 'https://zeember.com/cobra-cost-calculator' },
  openGraph: { title: 'COBRA Insurance Cost Calculator | Zeember', url: 'https://zeember.com/cobra-cost-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'How long can I stay on COBRA?', answer: 'Most people can keep COBRA for up to 18 months after leaving a job. Certain qualifying events — divorce, death of the covered employee, or a dependent aging off the plan — extend eligibility to 36 months. You must elect COBRA within 60 days of losing coverage and pay premiums within 45 days of electing.' },
  { question: 'Is COBRA worth it?', answer: 'COBRA is worth it if you have ongoing care with specific providers, expect major medical expenses soon, or are between jobs only briefly. It is the same plan you had — same network, same prescription coverage. If you are healthy and flexible on providers, an ACA marketplace plan is usually far cheaper, especially with income-based subsidies. Always compare both before deciding.' },
  { question: 'What is the 2% COBRA administration fee?', answer: 'The law allows plan administrators to charge up to 2% above the actual premium cost as an administrative fee. So if the combined employee and employer premium is $800/month, your COBRA payment can be up to $816/month. Most employers charge the full 2%.' },
  { question: 'Can I get ACA subsidies instead of COBRA?', answer: 'Yes. Losing employer-sponsored coverage is a qualifying life event that triggers a 60-day Special Enrollment Period on healthcare.gov. If your income is below 400% of the federal poverty level (and in many cases above, under enhanced subsidies), you may qualify for premium tax credits that make marketplace plans significantly cheaper than COBRA.' },
  { question: 'Does COBRA coverage start immediately?', answer: 'Yes. COBRA coverage is retroactive to the day your employer coverage ended, as long as you elect within 60 days and pay back premiums. This means you can wait to elect if you stay healthy — if a medical need arises, you can retroactively elect COBRA, pay the back premiums, and get the claims covered.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'ACA Subsidy Estimator', href: '/aca-subsidy-estimator', description: 'Estimate your 2026 ACA marketplace subsidy and net premium.', icon: DollarSign },
  { title: 'Health Deductible', href: '/health-insurance-deductible-calculator', description: 'Calculate your true annual health insurance cost including out-of-pocket.', icon: Activity },
  { title: 'Out-of-Pocket Max', href: '/out-of-pocket-max-estimator', description: 'Estimate when you will hit your annual out-of-pocket maximum.', icon: Heart },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">COBRA vs ACA: which is cheaper?</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      COBRA lets you keep your exact employer plan after leaving a job — same network, same doctors, same drug formulary. The trade-off is cost: you now pay your share plus what your employer was paying, plus a 2% fee. For many people, this triples or quadruples their health insurance cost overnight.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">When COBRA makes sense</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Choose COBRA if you are mid-treatment and need to stay in-network, if you have met a significant portion of your deductible and expect major expenses before year-end, or if you are only between jobs for 1–2 months and the complexity of switching is not worth it. The identical coverage is COBRA&apos;s key advantage.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">When ACA marketplace is better</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      If your income qualifies for subsidies, a marketplace plan can cost 50–80% less than COBRA for comparable coverage. You have 60 days from losing employer coverage to enroll. Use healthcare.gov to see your actual subsidy amount — the estimates in this calculator are approximations. Do not rely on them to make the final decision without checking your real quote.
    </p>
  </div>
)

export default function CobraCostPage() {
  return (
    <ToolPageWrapper
      title="COBRA cost calculator"
      subtitle="Find out exactly what COBRA will cost after leaving your job — and compare it to ACA marketplace alternatives."
      canonicalUrl="https://zeember.com/cobra-cost-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'COBRA cost calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <CobraCalc />
    </ToolPageWrapper>
  )
}
