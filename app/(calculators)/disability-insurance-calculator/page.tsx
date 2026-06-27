import type { Metadata } from 'next'
import { Heart, DollarSign, Shield } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import DisabilityCalc from './DisabilityCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Disability Insurance Calculator — How Much Do You Need? | Zeember',
  description: 'Calculate how much disability insurance income replacement you need to protect your lifestyle.',
  alternates: { canonical: 'https://zeember.com/disability-insurance-calculator' },
  openGraph: { title: 'Disability Insurance Calculator | Zeember', url: 'https://zeember.com/disability-insurance-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'How much disability insurance do I actually need?', answer: 'You need enough monthly benefit to cover your essential expenses — mortgage/rent, food, utilities, minimum debt payments, and healthcare — if your income stops. Most disability policies cap at 60-70% of pre-disability income. The goal is to cover necessities without creating a lifestyle incentive to stay disabled. For most people, this is 50-65% of gross income.' },
  { question: 'What is short-term vs long-term disability insurance?', answer: 'Short-term disability (STD) covers the first 90-180 days of disability, typically through your employer. Long-term disability (LTD) begins after the elimination period and pays for years or until retirement age. Most workplace injuries and illnesses that keep people out of work long-term are not work-related and require LTD coverage. The elimination period on LTD should align with your STD coverage or emergency fund.' },
  { question: 'Is group disability insurance from my employer enough?', answer: 'Employer group LTD typically pays 60% of your base salary, has a long elimination period (often 90-180 days), and may exclude bonuses or self-employment income. Coverage ends when you leave the employer. Taxable benefits (when employer pays the premium) further reduce take-home benefit. Many employees supplement group LTD with an individual policy for more comprehensive protection.' },
  { question: 'What does the elimination period mean?', answer: 'The elimination period is how long you must be disabled before benefits begin — effectively a deductible measured in time. A 90-day elimination period means you need 3 months of expenses covered by savings, short-term disability, or sick leave before your LTD policy starts paying. Longer elimination periods reduce premiums significantly. A 90-day period is standard and appropriate for most workers with some emergency savings.' },
  { question: 'What is own-occupation vs any-occupation disability definition?', answer: 'Own-occupation disability pays if you cannot perform your specific occupation — a surgeon who loses a hand cannot do surgery, even if they could do another job. Any-occupation pays only if you cannot work any job. Own-occupation coverage is more comprehensive (and more expensive). For high-income professionals, own-occupation definition is critically important. For workers in non-specialized roles, any-occupation coverage may be adequate.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Life Insurance Need Calculator', href: '/how-much-life-insurance-do-i-need', description: 'Calculate how much life insurance your family needs.', icon: Heart },
  { title: 'ACA Subsidy Estimator', href: '/aca-subsidy-estimator', description: 'Find health coverage options if you become unable to work.', icon: DollarSign },
  { title: 'Umbrella Insurance', href: '/umbrella-insurance-calculator', description: 'Add an extra layer of liability protection.', icon: Shield },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">Your income is your most valuable asset</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      A 35-year-old earning $80,000/year has $2.4 million in potential lifetime earnings remaining. Yet most people insure their $25,000 car far more carefully than their income. The Social Security Administration estimates that a 20-year-old has a 25% chance of becoming disabled before retirement age. Disability insurance protects the asset that makes everything else possible.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">What to look for in a disability policy</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      The four most important features: own-occupation definition (especially for specialized professionals), non-cancelable and guaranteed renewable (insurer cannot raise your rates), residual disability rider (pays partial benefits if you return to work part-time), and cost-of-living adjustment (COLA) rider that increases benefits with inflation during a long-term disability.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">The 90-day elimination period sweet spot</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      Most financial advisors recommend a 90-day elimination period paired with 3-6 months of emergency savings. The premium difference between a 30-day and 90-day elimination period can be 20-30%. That savings — invested over the working years — typically exceeds the extra benefit you would receive from the shorter elimination period. Reserve the premium savings for your emergency fund instead.
    </p>
  </div>
)

export default function DisabilityInsurancePage() {
  return (
    <ToolPageWrapper
      title="Disability insurance calculator"
      subtitle="Calculate how much monthly disability benefit you need and estimate the cost of a policy."
      canonicalUrl="https://zeember.com/disability-insurance-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Disability insurance calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <DisabilityCalc />
    </ToolPageWrapper>
  )
}
