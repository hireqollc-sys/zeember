import type { Metadata } from 'next'
import { Car, Shield, AlertTriangle } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import Sr22Calc from './Sr22Calc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'SR-22 Insurance Cost Estimator | Zeember',
  description: 'Estimate how much SR-22 insurance will cost after a DUI, reckless driving, or license suspension.',
  alternates: { canonical: 'https://zeember.com/sr-22-insurance-calculator' },
  openGraph: { title: 'SR-22 Insurance Cost Estimator | Zeember', url: 'https://zeember.com/sr-22-insurance-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'What is an SR-22 and why do I need one?', answer: 'An SR-22 is a certificate of financial responsibility that your insurance company files with your state DMV. It proves you carry at least the minimum required auto insurance. Courts and the DMV require SR-22s after serious violations including DUI/DWI, reckless driving, driving without insurance, license suspension, or multiple at-fault accidents. Without it, your license cannot be reinstated.' },
  { question: 'How long do I need to carry an SR-22?', answer: 'In most states, SR-22 requirements last 3 years. Some serious violations extend this to 5 years. The clock starts from the date your license was suspended or from when the court ordered the SR-22, not from when you enroll. If your coverage lapses during the requirement period, your insurer is required to notify the state — which can restart the clock or result in additional penalties.' },
  { question: 'Can I get SR-22 insurance if I do not own a car?', answer: 'Yes. If you do not own a vehicle but still need an SR-22 (to reinstate your license for driving other people\'s cars), you need a non-owner SR-22 policy. This provides liability coverage when you drive vehicles you do not own. Non-owner SR-22 policies are significantly cheaper than standard SR-22 policies because they cover less risk.' },
  { question: 'Will my current insurer drop me if I need an SR-22?', answer: 'Some standard insurers will drop customers who require SR-22 filings, as you are now classified as a high-risk driver. Others will retain you but at a significantly higher premium. If you are dropped, you will need to find a non-standard (high-risk) insurer who specializes in SR-22 coverage. Comparison shopping is essential — rates for high-risk drivers vary enormously by company.' },
  { question: 'When can I stop carrying an SR-22?', answer: 'You can stop carrying an SR-22 when your requirement period ends. Do not simply cancel your policy — your insurer is required to file an SR-26 (cancellation notice) with the state. Contact your DMV before canceling to confirm your requirement period is complete. Canceling early resets the clock in most states and can result in immediate license suspension.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator', description: 'Get a baseline auto insurance estimate for your driver profile.', icon: Car },
  { title: 'Teen Driver Insurance', href: '/teen-driver-insurance-calculator', description: 'Estimate teen driver insurance costs and available discounts.', icon: AlertTriangle },
  { title: 'Full vs Liability Calculator', href: '/full-coverage-vs-liability-calculator', description: 'Decide if full coverage is worth the extra cost for high-risk drivers.', icon: Shield },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">SR-22 is not insurance — it is a certificate</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      People frequently confuse an SR-22 with a type of insurance. It is not. An SR-22 is a form your insurance company files with your state DMV certifying that you carry at minimum the state-required liability coverage. What actually increases your costs is the high-risk premium surcharge that comes with having a serious driving violation on your record. The SR-22 filing fee itself is typically just $15-$50.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">How much rates increase</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      A DUI conviction typically increases auto insurance premiums by 60-100% or more. Reckless driving adds 40-80%. Driving without insurance adds 25-50%. These surcharges remain for 3-5 years on your record. Over a 3-year SR-22 period, the total extra premium cost from a DUI conviction can easily reach $3,000-$8,000 depending on your location and insurer.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Shopping around matters more than ever</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      High-risk drivers see the largest variation in rates between insurers. Some companies specialize in non-standard auto insurance and have more competitive pricing for drivers with violations. Progressive, for instance, is well known for offering competitive rates to drivers with imperfect records. Getting quotes from 4-5 insurers, including non-standard specialists, is worth doing when you have an SR-22 requirement.
    </p>
  </div>
)

export default function Sr22Page() {
  return (
    <ToolPageWrapper
      title="SR-22 insurance cost estimator"
      subtitle="Estimate how much an SR-22 requirement will increase your auto insurance premiums and total cost over the requirement period."
      canonicalUrl="https://zeember.com/sr-22-insurance-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'SR-22 insurance calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <Sr22Calc />
    </ToolPageWrapper>
  )
}
