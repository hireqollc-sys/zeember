import type { Metadata } from 'next'
import { Activity, PiggyBank, Heart } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import OopCalc from './OopCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Out-of-Pocket Maximum Estimator | Zeember',
  description:
    'Estimate when you will hit your health insurance out-of-pocket maximum and what your total annual health costs will be. Free, no signup.',
  alternates: { canonical: 'https://zeember.com/out-of-pocket-max-estimator' },
  openGraph: {
    title: 'Out-of-Pocket Maximum Estimator | Zeember',
    description: 'See your estimated total health costs and when you hit your out-of-pocket max.',
    url: 'https://zeember.com/out-of-pocket-max-estimator',
  },
}

const faqItems: FAQItem[] = [
  {
    question: 'What is an out-of-pocket maximum and how does it work?',
    answer:
      'Your out-of-pocket maximum is the most you will pay for covered health services in a plan year. Once you reach it through your deductible payments, copays, and coinsurance combined, your insurance pays 100% of covered services for the rest of the year. Monthly premiums do not count toward your OOP max. For 2026, the ACA caps OOP max at $9,450 for individuals and $18,900 for families.',
  },
  {
    question: 'What does NOT count toward my out-of-pocket maximum?',
    answer:
      'Monthly premiums never count toward your OOP max. Costs for services not covered by your plan (like out-of-network providers on an HMO, or non-covered treatments) also do not count. Dental and vision are typically on separate plans with separate OOP maxes. Some plans have separate out-of-network OOP maxes that are higher than the in-network limit.',
  },
  {
    question: 'If I hit my out-of-pocket maximum, do I really pay nothing?',
    answer:
      'For covered, in-network services, yes — your insurer pays 100% once you hit your OOP max. However, you still owe your monthly premium. Out-of-network services may still have cost sharing depending on your plan. And balance billing from providers who charge above negotiated rates may not be covered. Always verify a provider is in-network before assuming your OOP max protects you.',
  },
  {
    question: 'How do family deductibles and OOP maximums work?',
    answer:
      'Family plans have both individual and family thresholds. The family OOP max (e.g., $18,900) is the total the family pays before insurance covers everyone at 100%. But individual embedded limits (e.g., $9,450 per person) mean any single family member hits coverage at their individual limit, even if the family has not reached the combined family maximum. Check whether your plan uses an embedded or aggregate deductible structure.',
  },
  {
    question: 'Should I choose a plan based on its out-of-pocket maximum?',
    answer:
      'The OOP max matters most if you expect significant medical expenses in a given year. For healthy individuals with low expected costs, the total annual cost (premiums + deductible) matters more than the OOP max. For people managing chronic conditions or planning major procedures, choosing a plan with a lower OOP max and higher premium often results in lower total spending. Use this calculator with different plan scenarios to compare.',
  },
]

const relatedCalcs: RelatedCalc[] = [
  {
    title: 'HSA Contribution Calculator',
    href: '/hsa-contribution-calculator',
    description: 'Find your 2026 HSA contribution limit and calculate your potential tax savings.',
    icon: PiggyBank,
  },
  {
    title: 'Health Deductible Calculator',
    href: '/health-insurance-deductible-calculator',
    description: 'Compare total annual costs across different health plan deductible levels.',
    icon: Activity,
  },
  {
    title: 'COBRA Cost Calculator',
    href: '/cobra-cost-calculator',
    description: 'Calculate COBRA insurance costs after job loss and compare to ACA alternatives.',
    icon: Heart,
  },
]

const howToContent = (
  <div className="prose-custom">
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">
      Understanding your out-of-pocket maximum
    </h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      The out-of-pocket maximum is the most protective feature of any health insurance plan. Once you hit it, insurance pays 100% of covered costs for the rest of the plan year. But understanding how you get there — and what counts — makes the difference between planning well and getting surprised.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">The three costs that count toward your OOP max</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Three types of cost sharing accumulate toward your out-of-pocket maximum: your deductible (the amount you pay 100% before insurance shares costs), your coinsurance (the percentage you pay after the deductible, e.g. 20%), and copays for specific services. Each dollar you pay in any of these categories brings you closer to the maximum. Monthly premiums do not count — they are the cost of having coverage, not the cost of using it.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">How to use this calculator</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Enter your plan details — premium, deductible, coinsurance, and OOP max — then enter your best estimate of what you expect to spend on medical care this year. Use last year as a reference and adjust for any known procedures, prescriptions, or appointments. The calculator shows you your estimated out-of-pocket costs, what percentage of your OOP max you will likely reach, and whether you are projected to hit the limit entirely (at which point every further covered expense costs you nothing).
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">When hitting the OOP max changes your strategy</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      If this calculator shows you are likely to hit your out-of-pocket maximum, that changes your healthcare spending strategy. Any covered service you receive after hitting the maximum is free to you. That is the time to schedule elective procedures, stock up on prescriptions, or address deferred care — everything is covered until December 31st when your OOP max resets. If you have an HSA, funds contributed there can be used to cover costs while you work toward the maximum.
    </p>
  </div>
)

export default function OutOfPocketMaxEstimatorPage() {
  return (
    <ToolPageWrapper
      title="Out-of-pocket max estimator"
      subtitle="See your total estimated annual health costs and find out when you would hit your out-of-pocket maximum."
      canonicalUrl="https://zeember.com/out-of-pocket-max-estimator"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Out-of-pocket max estimator' },
      ]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <OopCalc />
    </ToolPageWrapper>
  )
}
