import type { Metadata } from 'next'
import { TrendingUp, Car, Home } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import InsuranceScoreCalc from './InsuranceScoreCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Insurance Score Impact Estimator | Zeember',
  description: 'Estimate how your credit score and financial history affect your insurance premiums.',
  alternates: { canonical: 'https://zeember.com/insurance-score-calculator' },
  openGraph: { title: 'Insurance Score Impact Estimator | Zeember', url: 'https://zeember.com/insurance-score-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'What is a credit-based insurance score?', answer: 'A credit-based insurance score is a number insurers calculate from your credit report to predict the likelihood of filing a claim. It is different from your FICO credit score — it uses similar data but weights factors differently based on actuarial correlations with claim frequency. Studies consistently show a statistical relationship between credit history and insurance claims, which is why most states allow its use.' },
  { question: 'How much can my credit score affect my insurance premium?', answer: 'The impact varies by insurer and state but can be substantial. Moving from excellent credit to poor credit can increase auto insurance premiums by 50-100% or more depending on the insurer and state. A driver with poor credit may pay more than a driver with a clean record but excellent credit. Home insurance premiums can also vary 20-60% based on credit-based insurance scoring.' },
  { question: 'Which states ban credit-based insurance scoring?', answer: 'California, Hawaii, Massachusetts, and Michigan ban the use of credit-based insurance scoring for auto insurance. A handful of other states have partial restrictions or are considering bans. In states where it is prohibited, insurers must use other factors — driving record, claims history, age, and vehicle type — to set rates. Residents of these states do not benefit from good credit and are not penalized for poor credit.' },
  { question: 'Can I get my insurance score?', answer: 'Yes. Under the Fair Credit Reporting Act, you can request your insurance score from the main providers: LexisNexis, CLUE (Comprehensive Loss Underwriting Exchange), and ChoicePoint. You are entitled to one free report per year from each. You can also request the specific factors used to price your policy when you receive an insurance quote or a notice of adverse action.' },
  { question: 'How can I improve my insurance score?', answer: 'Pay all bills on time — payment history is the biggest factor. Reduce credit utilization below 30%. Avoid unnecessary new credit applications. Maintain a long, uninterrupted insurance history without lapses. Avoid multiple claims in a short period — some insurers will raise rates even for claims that were not your fault. Building a stronger credit profile over 12-24 months typically improves insurance scores measurably.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator', description: 'Estimate your full auto insurance premium including all risk factors.', icon: Car },
  { title: 'Home Insurance Calculator', href: '/home-insurance-calculator', description: 'Estimate your homeowners insurance annual premium.', icon: Home },
  { title: 'Rate Trends', href: '/trends', description: 'See how insurance premiums have trended over 5 years nationally.', icon: TrendingUp },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">How your credit history affects insurance pricing</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Insurance companies do not use your credit score directly — they use a credit-based insurance score, a variant that weights credit data differently based on correlation with insurance claims. The actuarial research consistently shows that people with lower credit scores file more claims and file larger claims. Whether this is causal (financial stress leads to more careless behavior) or correlational, insurers price it in.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">What factors matter most</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Payment history — the same factor that dominates your FICO score — is the biggest driver of insurance score. On-time payment history signals responsibility that insurers correlate with careful, claims-averse behavior. Credit utilization, length of credit history, and number of recent inquiries also factor in. Bankruptcies and significant collections are heavily penalized in insurance scoring.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">The continuous coverage bonus</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      Maintaining continuous insurance coverage without lapses is a separate factor from credit-based scoring but has a significant impact on rates. Insurers see coverage gaps as indicators of financial instability or risk tolerance. A 30-day lapse can trigger surcharges that last 3-5 years with some insurers. If you are between vehicles or between jobs, maintain at least a non-owner policy to preserve your continuous coverage discount.
    </p>
  </div>
)

export default function InsuranceScorePage() {
  return (
    <ToolPageWrapper
      title="Insurance score impact estimator"
      subtitle="Understand how your credit history, claims record, and coverage continuity affect your insurance premiums."
      canonicalUrl="https://zeember.com/insurance-score-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Insurance score estimator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <InsuranceScoreCalc />
    </ToolPageWrapper>
  )
}
