import type { Metadata } from 'next'
import { Shield, Car, Home } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import UmbrellaCalc from './UmbrellaCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Do I Need Umbrella Insurance? Free Calculator | Zeember',
  description: 'Calculate how much umbrella insurance coverage you need based on your assets and liability exposure. Free, instant.',
  alternates: { canonical: 'https://zeember.com/umbrella-insurance-calculator' },
  openGraph: { title: 'Umbrella Insurance Calculator | Zeember', url: 'https://zeember.com/umbrella-insurance-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'What does umbrella insurance cover?', answer: 'Umbrella insurance provides extra liability coverage beyond what your home and auto policies offer. It covers bodily injury and property damage claims, lawsuits, and personal liability situations like defamation, libel, and slander in some cases. It applies when your underlying policy limits are exhausted. It does not cover your own property damage, intentional acts, or business liability (for that, you need a commercial umbrella).' },
  { question: 'How much does umbrella insurance cost?', answer: 'A $1 million umbrella policy typically costs $150-$300 per year — or $12-$25/month. Each additional $1 million in coverage adds roughly $75-$150/year. It is widely considered one of the best-value insurance products available. Most insurers require you to have minimum liability limits on your underlying home and auto policies to qualify.' },
  { question: 'Who actually needs umbrella insurance?', answer: 'Umbrella insurance is most valuable if your net worth exceeds your current liability limits, if you have significant risk factors (pool, trampoline, teen drivers, rental property, large dog), or if you are in a profession with liability exposure. If your net worth is low and you have no elevated risk factors, the benefit is reduced — standard liability limits may be sufficient.' },
  { question: 'Does umbrella insurance cover my car?', answer: 'Umbrella insurance supplements your auto liability coverage. If you are in a serious accident and the costs exceed your auto policy limits, your umbrella kicks in to cover the remainder up to your umbrella limit. It does not cover damage to your own vehicle — that is what collision and comprehensive coverage are for.' },
  { question: 'Can I buy umbrella insurance without a home or auto policy?', answer: 'Generally no. Most insurers require you to hold your home and auto policies with them (or at minimum maintain minimum liability limits) before they will sell you an umbrella policy. This is because umbrella policies are designed as excess coverage — they require underlying policies to be in place first.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Liability Coverage Calculator', href: '/liability-coverage-calculator', description: 'Calculate how much personal liability coverage you need.', icon: Shield },
  { title: 'Home Insurance Calculator', href: '/home-insurance-calculator', description: 'Estimate your homeowners insurance annual cost.', icon: Home },
  { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator', description: 'Estimate your car insurance premium with a full breakdown.', icon: Car },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">Why umbrella insurance is surprisingly cheap</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      A $1 million umbrella policy costs roughly $200/year — less than $17/month. For that, you get coverage that kicks in when someone sues you for more than your home or auto insurance will pay. A serious car accident, a slip-and-fall lawsuit, or a dog bite claim can easily exceed standard liability limits. Without an umbrella, your savings, investments, and future wages are exposed.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">When liability risk is elevated</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Certain factors substantially increase your odds of a large liability claim: swimming pools (drowning liability), trampolines (injury liability), large dogs (bite liability), teen drivers (accident liability), and rental properties (tenant or visitor injury liability). If you have two or more of these risk factors, an umbrella policy is rarely optional — it is essential.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Cover your net worth, not just your liability limits</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      The standard recommendation is to carry umbrella coverage equal to your net worth. If a judgment exceeds your insurance coverage, creditors can pursue your savings, investments, and future income in many states. An umbrella policy closes that gap. At $150-$300/year per million of coverage, it is one of the most cost-effective purchases in personal finance.
    </p>
  </div>
)

export default function UmbrellaInsurancePage() {
  return (
    <ToolPageWrapper
      title="Umbrella insurance calculator"
      subtitle="Find out exactly how much umbrella liability coverage you need to protect your assets and future income."
      canonicalUrl="https://zeember.com/umbrella-insurance-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Umbrella insurance calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <UmbrellaCalc />
    </ToolPageWrapper>
  )
}
