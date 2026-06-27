import type { Metadata } from 'next'
import { DollarSign, Activity, Heart } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import AcaCalc from './AcaCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'ACA Subsidy Calculator 2026 — Estimate Your Marketplace Savings | Zeember',
  description: 'Estimate your ACA health insurance subsidy for 2026. Find out how much you will pay for marketplace coverage based on your income.',
  alternates: { canonical: 'https://zeember.com/aca-subsidy-estimator' },
  openGraph: { title: 'ACA Subsidy Calculator 2026 | Zeember', url: 'https://zeember.com/aca-subsidy-estimator' },
}

const faqItems: FAQItem[] = [
  { question: 'Who qualifies for ACA marketplace subsidies?', answer: 'To qualify for premium tax credits, your income must be at least 100% of the federal poverty level (FPL) and you must not have access to affordable employer coverage. Under enhanced subsidies in effect through 2025 and potentially extended, people above 400% FPL may also qualify. You must enroll through your state marketplace or healthcare.gov — not directly through insurers.' },
  { question: 'How are ACA subsidies calculated?', answer: 'Your subsidy is the difference between what you are expected to contribute toward the benchmark (second-lowest-cost silver) plan and what that plan actually costs in your area. Your expected contribution is based on a sliding scale tied to your income as a percentage of the federal poverty level — lower income means a lower expected contribution and a larger subsidy.' },
  { question: 'What is the federal poverty level (FPL) for 2026?', answer: 'In 2026, the federal poverty level is approximately $15,060 for a single person, $20,440 for a family of 2, $25,820 for a family of 3, and adds about $5,380 for each additional person. These figures are used to determine subsidy eligibility and amount. Your income percentage of the FPL is the primary driver of how large your subsidy will be.' },
  { question: 'Can I get a subsidy if my employer offers health insurance?', answer: 'Generally no — if your employer offers coverage that meets minimum value standards and is considered affordable (meaning the employee-only premium is less than 9.02% of household income in 2026), you are not eligible for marketplace subsidies. If the employer plan is unaffordable by IRS standards, you may qualify for marketplace assistance instead.' },
  { question: 'When can I enroll in an ACA marketplace plan?', answer: 'The Open Enrollment Period typically runs November 1 through January 15. Outside this window, you need a qualifying life event to trigger a Special Enrollment Period. These include losing job-based coverage, getting married, having a baby, moving to a new state, or gaining citizenship. You generally have 60 days from the qualifying event to enroll.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'COBRA Cost Calculator', href: '/cobra-cost-calculator', description: 'Compare COBRA continuation coverage vs ACA marketplace cost.', icon: DollarSign },
  { title: 'Health Deductible Calculator', href: '/health-insurance-deductible-calculator', description: 'Calculate your true annual health care cost with deductibles and coinsurance.', icon: Activity },
  { title: 'Out-of-Pocket Max Estimator', href: '/out-of-pocket-max-estimator', description: 'Estimate when you will hit your annual out-of-pocket maximum.', icon: Heart },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">How ACA marketplace subsidies work</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      The Affordable Care Act created premium tax credits to help low- and moderate-income Americans afford health insurance purchased through the marketplace. The subsidy is calculated based on your income as a percentage of the federal poverty level (FPL). The lower your income relative to the FPL, the larger your subsidy.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">How the subsidy amount is determined</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      The ACA uses a benchmark plan approach. Your subsidy equals the cost of the second-lowest-cost silver plan in your area minus the amount you are expected to contribute based on your income. If the benchmark plan costs $600/month and you are expected to contribute $150/month, your subsidy is $450/month — which you can apply to any marketplace plan, not just silver-tier plans.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Reconcile at tax time</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      ACA subsidies are advance tax credits estimated based on your projected income. At tax time, you reconcile actual income against the estimate using IRS Form 8962. If you earned more than projected, you may owe some subsidy back. If you earned less, you may get additional credit. Reporting income changes to the marketplace during the year reduces surprises at tax time.
    </p>
  </div>
)

export default function AcaSubsidyPage() {
  return (
    <ToolPageWrapper
      title="ACA subsidy estimator 2026"
      subtitle="Estimate your ACA health insurance premium tax credit and see how much you will pay for marketplace coverage."
      canonicalUrl="https://zeember.com/aca-subsidy-estimator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'ACA subsidy estimator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <AcaCalc />
    </ToolPageWrapper>
  )
}
