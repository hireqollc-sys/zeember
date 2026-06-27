import type { Metadata } from 'next'
import { Home, Building2, Shield } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import RentersCalc from './RentersCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Renters Insurance Calculator — Estimate Your Monthly Cost',
  description: 'Estimate renters insurance cost by state. Calculate how much personal property coverage you need. Free, no signup.',
  alternates: { canonical: 'https://zeember.com/renters-insurance-calculator' },
  openGraph: { title: 'Renters Insurance Calculator | Zeember', url: 'https://zeember.com/renters-insurance-calculator' },
}

const faqItems: FAQItem[] = [
  {
    question: 'What does renters insurance cover?',
    answer: 'Renters insurance covers three main things: personal property (your belongings if stolen or damaged by a covered event), personal liability (if someone is injured in your apartment and sues you), and additional living expenses (hotel costs if your unit becomes uninhabitable). It does NOT cover the building itself — your landlord\'s policy handles that.',
  },
  {
    question: 'What is replacement cost value vs actual cash value?',
    answer: 'Replacement cost value (RCV) pays what it costs to buy new replacements for your damaged items today. Actual cash value (ACV) pays only the depreciated value — what your items were worth before the loss. A 6-year-old laptop worth $1,400 new might have an ACV of only $400 after depreciation. RCV coverage costs about 15% more but is almost always worth it.',
  },
  {
    question: 'Is renters insurance worth it?',
    answer: 'At an average of $22/month nationally, renters insurance is one of the best financial values available. One theft, one kitchen fire, or one slip-and-fall lawsuit can result in losses that dwarf years of premiums. If you own any electronics, furniture, clothing, or have a net worth above $5,000, renters insurance is almost certainly worth the cost.',
  },
  {
    question: 'Does renters insurance cover roommates?',
    answer: 'Standard renters insurance only covers the policyholder. Roommates are not covered unless they are specifically listed on your policy. Some insurers allow adding a roommate for a modest increase. Each roommate adding themselves as a named insured is cleanest, but listing on an existing policy is also common. Never assume a roommate\'s policy covers you — it does not.',
  },
  {
    question: 'How much liability coverage do I need on renters insurance?',
    answer: 'Standard policies come with $100,000 in personal liability. Most financial planners recommend upgrading to $300,000–$500,000, which typically adds only $3–5/month. If your net worth is above $500,000, consider adding an umbrella policy for broader protection beyond the renters policy limits.',
  },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Home Insurance', href: '/home-insurance-calculator', description: 'Planning to buy? Estimate homeowners insurance costs before you commit.', icon: Home },
  { title: 'Personal Property Value', href: '/personal-property-calculator', description: 'Take a full inventory of your belongings to make sure you have enough coverage.', icon: Building2 },
  { title: 'Umbrella Insurance', href: '/umbrella-insurance-calculator', description: 'See if you need umbrella coverage on top of your renters policy.', icon: Shield },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">How renters insurance is priced</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Renters insurance is the most affordable type of insurance most people can buy. The national average is $22/month or $263/year. Prices are driven by the total value of your belongings, your location (state and city), your chosen deductible, and whether you choose replacement cost or actual cash value coverage.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Property value is the primary driver</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      The more stuff you have, the more it costs to insure. Most people significantly underestimate how much their belongings are worth. Do a quick room-by-room inventory: laptop ($1,400), TV ($800), couch ($1,200), clothes ($2,000), kitchen appliances ($1,500), bike ($600). It adds up faster than you think. Our calculator walks you through each category to help you arrive at a realistic total.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">State pricing differences</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      Louisiana ($28/month) and Oklahoma ($28/month) are among the most expensive states for renters insurance due to storm risk. Hawaii ($16/month) and North Dakota ($15/month) are cheapest. If you live in a high-risk state, the cost difference versus a low-risk state is often only $5–10/month — still excellent value for the coverage.
    </p>
  </div>
)

export default function RentersInsurancePage() {
  return (
    <ToolPageWrapper
      title="Renters insurance calculator"
      subtitle="Estimate your renters insurance cost based on your belongings and location. See what coverage you actually need."
      canonicalUrl="https://zeember.com/renters-insurance-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Renters insurance calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <RentersCalc />
    </ToolPageWrapper>
  )
}
