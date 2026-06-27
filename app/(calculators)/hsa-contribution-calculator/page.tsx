import type { Metadata } from 'next'
import { PiggyBank, Heart, Activity } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import HsaCalc from './HsaCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'HSA Contribution Calculator 2026 | Zeember',
  description:
    'Calculate your maximum HSA contribution for 2026 and your estimated tax savings. Works for individual and family high-deductible health plans.',
  alternates: { canonical: 'https://zeember.com/hsa-contribution-calculator' },
  openGraph: {
    title: 'HSA Contribution Calculator 2026 | Zeember',
    description: 'Find your 2026 HSA contribution limit and see exactly how much you save on taxes.',
    url: 'https://zeember.com/hsa-contribution-calculator',
  },
}

const faqItems: FAQItem[] = [
  {
    question: 'What are the HSA contribution limits for 2026?',
    answer:
      'For 2026, the IRS limit is $4,300 for self-only (individual) coverage and $8,550 for family coverage. If you are 55 or older, you can contribute an additional $1,000 catch-up contribution on top of those limits. You must be enrolled in a qualifying high-deductible health plan (HDHP) to contribute to an HSA.',
  },
  {
    question: 'What qualifies as a high-deductible health plan (HDHP) for HSA purposes?',
    answer:
      'For 2026, an HDHP must have a minimum deductible of at least $1,650 for self-only coverage or $3,300 for family coverage. The plan must also have an out-of-pocket maximum no higher than $8,300 (self-only) or $16,600 (family). Most HDHPs clearly state their HSA eligibility — look for "HSA-compatible" in your plan documents or ask your HR department.',
  },
  {
    question: 'What is the triple tax advantage of an HSA?',
    answer:
      'HSAs offer three separate tax benefits: (1) Contributions are tax-deductible, reducing your taxable income in the year you contribute. (2) Investment growth inside the account is completely tax-free. (3) Withdrawals for qualified medical expenses are tax-free. No other common savings account offers all three. This makes a maxed-out HSA one of the most tax-efficient accounts available, even compared to a 401(k) or IRA.',
  },
  {
    question: 'Can I use my HSA for non-medical expenses?',
    answer:
      'After age 65, you can withdraw HSA funds for any purpose without penalty — you simply pay ordinary income tax, making it function like a traditional IRA. Before age 65, withdrawals for non-qualified expenses are subject to income tax plus a 20% penalty. Qualified medical expenses include deductibles, copays, prescriptions, dental, vision, and many other healthcare costs — the IRS list is extensive.',
  },
  {
    question: 'What happens to my HSA if I switch from an HDHP to a different plan?',
    answer:
      'Your existing HSA funds remain yours permanently — you keep the account and can spend the money on qualified medical expenses tax-free at any time. However, you cannot make new contributions while enrolled in a non-HDHP plan. If you switch mid-year, you can only contribute for the months you were enrolled in an HDHP (prorated by month), unless you use the last-month rule, which requires you to stay in an HDHP through the following year.',
  },
]

const relatedCalcs: RelatedCalc[] = [
  {
    title: 'Health Deductible Calculator',
    href: '/health-insurance-deductible-calculator',
    description: 'Calculate your true out-of-pocket health costs based on your deductible and expected medical use.',
    icon: Activity,
  },
  {
    title: 'Out-of-Pocket Max Estimator',
    href: '/out-of-pocket-max-estimator',
    description: 'Estimate when you will hit your out-of-pocket maximum and what your total health costs will be.',
    icon: Heart,
  },
  {
    title: 'COBRA Cost Calculator',
    href: '/cobra-cost-calculator',
    description: 'Find out what COBRA health coverage costs after leaving a job and compare it to ACA alternatives.',
    icon: PiggyBank,
  },
]

const howToContent = (
  <div className="prose-custom">
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">
      How HSA contributions and tax savings work
    </h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      A Health Savings Account is one of the most tax-efficient accounts in the US tax code — yet most people with eligible plans either skip it entirely or contribute far less than the IRS maximum. Understanding how the tax math works makes the decision obvious.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">The contribution limit rules</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Your maximum contribution depends on your coverage type (self-only or family) and how many months you were enrolled in a qualifying HDHP. If you were enrolled for the full year, you get the full limit. If you enrolled mid-year, you are prorated: divide the annual limit by 12 and multiply by the number of eligible months. There is one exception called the last-month rule — if you are enrolled on December 1st, you can contribute the full annual amount, but you must remain enrolled in an HDHP through the following December or you will owe taxes and a penalty on the excess.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">How the tax savings are calculated</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Every dollar you contribute to an HSA reduces your federal taxable income by one dollar. If you are in the 22% federal bracket and your state has a 5% income tax, each dollar contributed saves you 27 cents in taxes. For a single person maxing out at $4,300, that is $1,161 in tax savings on money you were going to spend on healthcare anyway. The effective cost of contributing $4,300 is only $3,139.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Investing your HSA: the long-term strategy</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Most HSA providers allow you to invest your balance in mutual funds once you exceed a threshold (often $1,000–$2,000). Financial planners sometimes call this the HSA investment strategy: pay current medical expenses out of pocket, let HSA funds grow invested, and reimburse yourself years later using saved receipts. Since there is no deadline to claim reimbursements, a medical expense from 2026 can be reimbursed tax-free in 2041 — after the invested funds have compounded for 15 years.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">HDHP vs. lower-deductible plans</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      The HSA option is only available with a high-deductible health plan, which has higher out-of-pocket exposure if you have significant medical needs. The right choice depends on your expected medical usage. Use the Health Deductible Calculator to compare your total annual cost under an HDHP (with HSA contributions) versus a lower-deductible PPO. For healthy individuals and families with modest medical use, the HDHP plus maxed HSA is frequently the lower total-cost option.
    </p>
  </div>
)

export default function HsaContributionCalculatorPage() {
  return (
    <ToolPageWrapper
      title="HSA contribution calculator 2026"
      subtitle="Find your maximum HSA contribution and see how much you save on taxes with a health savings account."
      canonicalUrl="https://zeember.com/hsa-contribution-calculator"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'HSA contribution calculator' },
      ]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <HsaCalc />
    </ToolPageWrapper>
  )
}
