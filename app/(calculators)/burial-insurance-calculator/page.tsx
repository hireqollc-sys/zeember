import type { Metadata } from 'next'
import { Heart, DollarSign, Activity } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import BurialCalc from './BurialCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Burial Insurance Cost Calculator | Zeember',
  description: 'Estimate final expense insurance (burial insurance) costs. Coverage for funeral and end-of-life expenses.',
  alternates: { canonical: 'https://zeember.com/burial-insurance-calculator' },
  openGraph: { title: 'Burial Insurance Cost Calculator | Zeember', url: 'https://zeember.com/burial-insurance-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'What is burial insurance?', answer: 'Burial insurance — also called final expense insurance — is a small whole life insurance policy designed to cover end-of-life costs. Coverage amounts typically range from $2,000 to $25,000. It pays for funeral costs, burial or cremation, outstanding medical bills, and other final expenses. Unlike term life insurance, it never expires as long as premiums are paid and does not require a medical exam for most applicants.' },
  { question: 'How much does the average funeral cost?', answer: 'The average US funeral with burial costs $8,000-$12,000. This includes the funeral home services, casket, burial plot, gravestone, death certificates, and transportation. Cremation is typically $2,000-$5,000. These costs have increased faster than inflation over the past decade. Burial insurance ensures your family does not have to cover these expenses out of pocket during an already difficult time.' },
  { question: 'What is the difference between simplified issue and guaranteed issue?', answer: 'Simplified issue policies ask a few health questions — no medical exam — and approve most applicants. If you have manageable health conditions, simplified issue is usually available and offers immediate full coverage. Guaranteed issue accepts everyone regardless of health but has a graded death benefit: if you die within 2 years of purchase from natural causes, the policy typically returns only premiums paid plus interest rather than the full face value.' },
  { question: 'Is burial insurance worth it for seniors?', answer: 'Burial insurance is worth it if you have no other life insurance and want to ensure your funeral costs do not burden your family. At older ages (70+), premiums can be high relative to coverage, but the no-exam requirement and guaranteed acceptance options make it accessible to people who cannot qualify for traditional life insurance. Compare the total premium cost over expected years versus the coverage amount before purchasing.' },
  { question: 'Can I buy burial insurance for a parent?', answer: 'Yes. You can purchase burial insurance for a parent as long as the parent consents and signs the application. You would typically be the policy owner and beneficiary, with the parent as the insured. This is a common way adult children ensure their parents\' final expenses are covered without financial strain on the family.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Life Insurance Need Calculator', href: '/how-much-life-insurance-do-i-need', description: 'Calculate total life insurance needs using the DIME method.', icon: Heart },
  { title: 'Life Insurance by Age', href: '/life-insurance-by-age', description: 'See term life insurance rates at every age.', icon: Activity },
  { title: 'Term vs Whole Life', href: '/term-vs-whole-life-insurance', description: 'Compare term vs whole life insurance side by side.', icon: DollarSign },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">Why final expense planning matters</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      More than 60% of Americans report that an unexpected $1,000 expense would cause financial stress. A funeral costing $10,000 is exactly that kind of unexpected expense — but one that occurs at the worst possible time. Burial insurance is a specific solution to a specific problem: ensuring the cost of dying does not create a financial burden for surviving family members.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Who burial insurance is for</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Burial insurance makes most sense for seniors who no longer carry or cannot afford traditional life insurance, people who do not have savings earmarked for end-of-life costs, and those who want to ensure specific expenses are covered without liquidating other assets. It is not the right product for younger people needing income replacement — term life insurance covers that need far more cost-effectively.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Compare to pre-paid funeral plans</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      Pre-paid funeral plans lock you into a specific funeral home and specific services. Burial insurance is more flexible — the death benefit goes to your beneficiary, who can use it for any provider and any combination of final expenses. Burial insurance also retains value if the funeral home closes or you move. For most people, burial insurance is more flexible and safer than pre-paid plans.
    </p>
  </div>
)

export default function BurialInsurancePage() {
  return (
    <ToolPageWrapper
      title="Burial insurance cost calculator"
      subtitle="Estimate final expense insurance costs to ensure your funeral and end-of-life costs are covered."
      canonicalUrl="https://zeember.com/burial-insurance-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Burial insurance calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <BurialCalc />
    </ToolPageWrapper>
  )
}
