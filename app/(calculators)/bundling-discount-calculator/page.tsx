import type { Metadata } from 'next'
import { Home, Car, DollarSign } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import BundlingCalc from './BundlingCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Home and Auto Insurance Bundling Discount Calculator | Zeember',
  description: 'Calculate how much you save by bundling home and auto insurance. Compare bundled vs separate policies.',
  alternates: { canonical: 'https://zeember.com/bundling-discount-calculator' },
  openGraph: { title: 'Bundling Discount Calculator | Zeember', url: 'https://zeember.com/bundling-discount-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'How much can I save by bundling home and auto insurance?', answer: 'Bundling home and auto insurance with the same insurer typically saves 10-25% on both policies combined. The national average is around 16%. On a combined $3,200/year in premiums, that could be $500+ in annual savings. Nationwide and Farmers tend to offer the highest bundling discounts (up to 20%); GEICO and Progressive tend to offer more modest discounts (8-12%).' },
  { question: 'What is the downside of bundling?', answer: 'The main risk of bundling is paying more than you would with separate, best-in-class insurers. The bundling discount may not offset having a worse auto insurer or a worse home insurer. Always compare: (a) bundled total from one insurer vs (b) best auto insurer plus best home insurer separately. Sometimes splitting is cheaper. Sometimes the bundled discount wins. Run the math.' },
  { question: 'Does bundling affect claims?', answer: 'Some insurers treat bundled claims differently — an at-fault auto accident might trigger a review of your home policy or vice versa. This is rare but worth understanding. Read your policy terms regarding how claims on one policy may affect the other. For most customers, this is not a practical concern, but it is worth asking about when you get a bundled quote.' },
  { question: 'Can I bundle renters insurance with auto insurance?', answer: 'Yes. Most insurers offer bundling discounts for renters plus auto, though the savings are typically smaller (5-10%) than home plus auto bundles. GEICO, Progressive, and State Farm all offer renters and auto bundles. If you rent and own a car, bundling is almost always worth it for the convenience and modest savings.' },
  { question: 'Should I bundle if one insurer is significantly better for one type?', answer: 'Not necessarily. If your current auto insurer charges $1,600/year but a competitor charges $1,100 for comparable coverage, a 15% bundling discount from your current insurer ($240 savings) still leaves you behind. The bundle math only works when the bundled insurer is competitive on both types. Run separate quotes for both types before deciding.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator', description: 'Estimate your auto insurance premium for any driver profile.', icon: Car },
  { title: 'Home Insurance Calculator', href: '/home-insurance-calculator', description: 'Estimate your homeowners insurance annual premium.', icon: Home },
  { title: 'Compare Insurers', href: '/compare', description: 'See NAIC scores, J.D. Power ratings, and best-for summaries for 8 major insurers.', icon: DollarSign },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">When bundling beats separate policies</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Bundling home and auto insurance is one of the most commonly recommended money-saving moves in personal finance — and for good reason. A 15-20% discount on both policies can save hundreds of dollars annually with zero change in coverage. The insurer benefits from customer retention and administrative efficiency; you benefit from the discount and the convenience of one policy, one renewal date, and one agent.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">When separate policies win</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Bundling loses when the best auto insurer and best home insurer are different companies. USAA dominates in claims satisfaction but is limited to military families. GEICO offers the lowest auto rates for many drivers. State Farm leads in home insurance claims service. If you want the best of each, you will pay separately and forego the bundle discount. The question is whether the quality difference justifies the lost discount.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Always shop the bundle</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      Get bundled quotes from 3-4 insurers, then compare that combined cost to your best separate quotes. The spread can be significant. Do this at each renewal — your individual risk profile changes, insurer pricing strategies shift, and new competitors enter markets regularly. The best bundle today may not be the best bundle in 18 months.
    </p>
  </div>
)

export default function BundlingDiscountPage() {
  return (
    <ToolPageWrapper
      title="Bundling discount calculator"
      subtitle="Estimate how much you save by bundling home and auto insurance with the same company."
      canonicalUrl="https://zeember.com/bundling-discount-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Bundling discount calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <BundlingCalc />
    </ToolPageWrapper>
  )
}
