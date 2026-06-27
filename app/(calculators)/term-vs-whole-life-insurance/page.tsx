import type { Metadata } from 'next'
import TermVsWholeCalc from './TermVsWholeCalc'
import Disclaimer from '@/components/Disclaimer'
import AdUnit from '@/components/AdUnit'
import FAQAccordion from '@/components/FAQAccordion'
import type { FAQItem } from '@/components/FAQAccordion'
import RelatedCalculators from '@/components/RelatedCalculators'
import type { RelatedCalc } from '@/components/RelatedCalculators'
import { Heart, DollarSign, Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Term vs Whole Life Insurance Calculator | Zeember',
  description: 'Compare term vs whole life insurance side by side. See the real cost difference and which is right for your situation.',
  alternates: { canonical: 'https://zeember.com/term-vs-whole-life-insurance' },
  openGraph: { title: 'Term vs Whole Life Insurance Calculator | Zeember', url: 'https://zeember.com/term-vs-whole-life-insurance' },
}

const faqItems: FAQItem[] = [
  { question: 'What is the main difference between term and whole life insurance?', answer: 'Term life insurance provides coverage for a fixed period (10, 15, 20, or 30 years) and pays out only if you die during that term. Whole life insurance provides lifetime coverage and includes a cash value component that grows at a guaranteed rate. Term is simpler and much cheaper; whole life is more complex and significantly more expensive.' },
  { question: 'Why do most financial advisors recommend term life?', answer: 'Most financial advisors recommend term life because the premium difference between term and whole life — invested in a diversified portfolio — typically outperforms whole life cash value growth. Term life is transparent: you buy protection for the period you need it (raising children, paying off a mortgage) and invest the difference. Whole life mixes insurance and savings in a way that is rarely optimal for either purpose.' },
  { question: 'When does whole life insurance make sense?', answer: 'Whole life can make sense in specific situations: estate planning where a permanent death benefit is needed to pay estate taxes, business succession planning, funding a special needs trust that must not lapse, or situations where you have maxed out all other tax-advantaged accounts and need another vehicle. These are specialized use cases, not the norm.' },
  { question: 'What is cash value in a whole life policy?', answer: 'Cash value is a savings component within a whole life policy that grows at a guaranteed rate (typically 2-4%). You can borrow against it or surrender the policy for its value. The growth is tax-deferred. The guaranteed rate is modest, and the high premium cost of building that cash value often makes it a poor investment vehicle compared to simply investing the premium difference in index funds.' },
  { question: 'Can I convert a term policy to whole life?', answer: 'Many term policies include a conversion option that allows you to convert to a permanent policy without a new medical exam, typically within the first 10 years of the policy or before a certain age. This is valuable if your health declines and you develop a need for permanent coverage. The conversion rate will be based on your original health classification, not your current health.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Life Insurance Need Calculator', href: '/how-much-life-insurance-do-i-need', description: 'Calculate how much life insurance you need using the DIME method.', icon: Heart },
  { title: 'Life Insurance by Age', href: '/life-insurance-by-age', description: 'See term life insurance rates at every age from 25 to 60.', icon: Activity },
  { title: 'Burial Insurance', href: '/burial-insurance-calculator', description: 'Estimate final expense insurance costs for end-of-life coverage.', icon: DollarSign },
]

const scriptJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } }))
})

export default function TermVsWholePage() {
  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <nav className="font-sans text-sm text-neutral-500 mb-4">
            <a href="/" className="hover:text-primary-dark transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-neutral-700">Term vs whole life insurance</span>
          </nav>
          <h1 className="font-serif text-[36px] md:text-[56px] font-bold text-primary-dark mb-4">Term vs whole life insurance</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl">Compare costs side by side and see the real financial difference over the life of your policy.</p>
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 py-4">
        <AdUnit slot="LEADERBOARD_1" format="leaderboard" />
      </div>
      <section className="max-w-[1280px] mx-auto px-6 py-10">
        <TermVsWholeCalc />
      </section>
      <div className="max-w-[1280px] mx-auto px-6"><Disclaimer type="calculator" /></div>
      <section className="bg-neutral-50 py-16 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-serif text-[36px] font-semibold text-primary-dark mb-6">Term vs whole life: the financial reality</h2>
          <div className="prose prose-neutral max-w-none space-y-4">
            <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">For the vast majority of people buying life insurance to protect their family during their working years, term life is the right answer. It provides substantial coverage at a fraction of the cost, and the premium savings — invested consistently — will almost always produce more wealth than the cash value component of a whole life policy.</p>
            <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">Whole life insurance is not a scam — it is a product that serves specific planning needs. But those needs are narrow: estate tax planning, business succession, and permanent coverage for people who are uninsurable through other means. For income replacement during your working years, term life insurance is the most efficient tool available.</p>
          </div>
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 py-10">
        <FAQAccordion items={faqItems} pageUrl="https://zeember.com/term-vs-whole-life-insurance" />
      </div>
      <section className="bg-neutral-50 py-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          <RelatedCalculators calculators={relatedCalcs} />
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 pb-8">
        <AdUnit slot="RECTANGLE_1" format="rectangle" />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: scriptJson }} />
    </main>
  )
}
