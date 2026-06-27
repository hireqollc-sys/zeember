import type { Metadata } from 'next'
import { Shield, Home, Car } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import LiabilityCalc from './LiabilityCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Personal Liability Coverage Calculator | Zeember',
  description: 'Calculate how much liability coverage you need based on your net worth and risk exposure.',
  alternates: { canonical: 'https://zeember.com/liability-coverage-calculator' },
  openGraph: { title: 'Personal Liability Coverage Calculator | Zeember', url: 'https://zeember.com/liability-coverage-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'How much personal liability coverage do I need?', answer: 'The standard rule is to carry liability coverage equal to your total net worth — assets that a judgment creditor could potentially target. If your net worth is $350,000 (home equity, savings, investments), carrying at least $350,000 in combined liability coverage makes sense. Higher-risk situations — pools, dogs, teen drivers, rental property — warrant even more coverage.' },
  { question: 'What does personal liability coverage actually protect?', answer: 'Personal liability coverage pays legal defense costs and any settlement or judgment if you are held legally responsible for injuring someone or damaging their property. Examples: a guest slips and falls at your home, your dog bites someone, your child accidentally injures a neighbor, or you cause an accident while driving. It does not cover intentional acts or business-related liability.' },
  { question: 'What are the liability limits in standard home and auto policies?', answer: 'Standard homeowners policies include $100,000 in personal liability coverage; more comprehensive policies offer $300,000 or $500,000. Standard auto policies have separate liability limits, often expressed as split limits (e.g., $100,000 per person / $300,000 per accident) or a combined single limit. These work independently — each covers different types of incidents.' },
  { question: 'How does umbrella insurance extend my liability coverage?', answer: 'An umbrella policy provides additional liability coverage that sits above your home and auto policies. Once a covered claim exhausts your underlying policy limits, the umbrella pays up to its limit (typically $1M-$5M). This is the most cost-effective way to extend liability coverage significantly — $1M in umbrella coverage typically costs $150-$300/year.' },
  { question: 'Can my wages be garnished if a judgment exceeds my insurance?', answer: 'In most states, yes — a judgment creditor can pursue wages through garnishment if a judgment exceeds your insurance coverage. Certain states have homestead exemptions that protect primary residence equity. Retirement accounts (401k, IRA) are generally protected by federal law. Savings and investment accounts are typically exposed. This is why matching coverage to net worth matters.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Umbrella Insurance Calculator', href: '/umbrella-insurance-calculator', description: 'Calculate how much umbrella coverage you need and what it costs.', icon: Shield },
  { title: 'Home Insurance Calculator', href: '/home-insurance-calculator', description: 'Estimate homeowners insurance including your personal liability coverage.', icon: Home },
  { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator', description: 'Estimate auto insurance including your auto liability limits.', icon: Car },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">Why liability coverage amount matters</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Liability coverage is the most consequential insurance decision many people make without thinking about it carefully. The default $100,000 in a standard homeowners policy was set decades ago and has not kept pace with medical costs, litigation awards, or household net worth growth. A serious injury lawsuit today can easily reach $300,000-$1,000,000+ in combined medical bills, lost wages, and pain and suffering damages.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">The coverage gap problem</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Most Americans have more net worth than they have liability coverage. Someone with $400,000 in home equity, savings, and investment accounts who carries only $100,000 in home liability coverage has a $300,000 exposure gap. A single significant lawsuit judgment could wipe out decades of savings. Increasing liability limits costs surprisingly little — going from $100,000 to $300,000 in home liability often adds $15-$30/year to your premium.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Stack home, auto, and umbrella</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      The most comprehensive liability protection strategy layers home and auto liability limits (which protect against specific incidents) with an umbrella policy (which covers everything above those limits). Together, you can maintain $1.5M-$2M in total liability protection for $600-$900/year — a modest cost relative to the risk it covers.
    </p>
  </div>
)

export default function LiabilityCoveragePage() {
  return (
    <ToolPageWrapper
      title="Personal liability coverage calculator"
      subtitle="Calculate the right liability coverage amount based on your net worth, income, and risk factors."
      canonicalUrl="https://zeember.com/liability-coverage-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Liability coverage calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <LiabilityCalc />
    </ToolPageWrapper>
  )
}
