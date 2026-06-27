import type { Metadata } from 'next'
import { Heart, Clock, DollarSign } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import LifeCalc from './LifeCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'How Much Life Insurance Do I Need? Free Calculator',
  description:
    'Calculate exactly how much life insurance you need using the proven DIME method. Free, instant, no signup required.',
  alternates: { canonical: 'https://zeember.com/how-much-life-insurance-do-i-need' },
  openGraph: {
    title: 'How Much Life Insurance Do I Need? Free Calculator | Zeember',
    description: 'Calculate exactly how much life insurance you need using the proven DIME method.',
    url: 'https://zeember.com/how-much-life-insurance-do-i-need',
  },
}

const faqItems: FAQItem[] = [
  {
    question: 'What is the DIME method and how accurate is it?',
    answer:
      'DIME stands for Debt, Income, Mortgage, Education — the four major financial obligations your family would face without your income. Add them together, subtract existing coverage, and you have your coverage gap. It tends to produce higher estimates than the simple income-multiplier method (10x salary) because it accounts for your specific financial situation rather than a generic rule of thumb. Financial planners consider it one of the more realistic approaches for working-age adults with dependents.',
  },
  {
    question: 'How much life insurance does a stay-at-home parent need?',
    answer:
      'A stay-at-home parent has no earned income to replace, but their economic contribution is substantial. Conservative estimates put replacement cost (childcare, household management, transportation, tutoring) at $50,000–$100,000 per year. Run the DIME calculation with that as the income replacement figure, plus any debt and mortgage obligations. Many financial planners recommend $300,000–$500,000 minimum for a stay-at-home parent with young children.',
  },
  {
    question: 'Is $500,000 enough life insurance?',
    answer:
      "It depends entirely on your income, debts, mortgage, and family size. For a single earner with a $250,000 mortgage, two children, and a $90,000 salary, $500,000 may fall short of full DIME coverage. For a dual-income household with no children and a small mortgage, it may be more than sufficient. Use the calculator to get a number specific to your situation rather than relying on a round-number estimate.",
  },
  {
    question: 'When should I buy life insurance?',
    answer:
      "The best time is when you have dependents who rely on your income — a spouse, children, or anyone who would face financial hardship if you died. Buying earlier also locks in lower rates: a healthy 30-year-old pays roughly half what a healthy 40-year-old pays for the same coverage. Don't wait for a life event to force the decision; life insurance premiums are primarily driven by age and health, both of which move against you over time.",
  },
  {
    question: 'Should I choose term or whole life insurance?',
    answer:
      "For most people, term life insurance is the right choice for income replacement. It provides the same death benefit as whole life at 5–15x lower cost, which means you can buy the coverage you actually need without overextending your budget. Whole life makes sense in specific estate planning or business continuity situations. If someone is trying hard to sell you whole life, ask them to show you a side-by-side comparison of total cost over 20 years.",
  },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Term vs Whole Life', href: '/term-vs-whole-life-insurance', description: 'Compare term and whole life insurance side by side over any time horizon.', icon: Heart },
  { title: 'Life Insurance by Age', href: '/life-insurance-by-age', description: 'See exactly how much life insurance costs at your current age.', icon: Clock },
  { title: 'Burial Insurance', href: '/burial-insurance-calculator', description: 'Estimate final expense insurance costs to cover funeral and end-of-life costs.', icon: DollarSign },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">
      How the DIME method works
    </h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      The DIME method gives you a concrete coverage number by adding up four specific financial obligations your family would face if you died: outstanding Debt, Income replacement, Mortgage balance, and future Education costs. It produces a more accurate result than the simpler approaches because it accounts for your actual financial profile.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">D — Debt</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Add up all non-mortgage debt: credit cards, car loans, personal loans, student loans, medical debt. This is the amount your family would need to clear these obligations without your income. Do not include your mortgage here — that has its own line in the formula.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">I — Income replacement</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Multiply your annual income by the number of years your dependents would need financial support. Most financial planners suggest 10–20 years. A 35-year-old with a 5-year-old child might choose 20 years to support the child through college. A 50-year-old whose children are grown might choose 10 years to bridge a spouse to retirement.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">M — Mortgage</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Include your remaining mortgage balance. This ensures your family can pay off the home and not face foreclosure or forced sale during an already difficult time. Use your current payoff balance, not the original loan amount.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">E — Education</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Estimate future college costs per child. A common planning figure is $100,000 per child for a 4-year public university including room and board. Private university runs $200,000–$300,000. Adjust based on your expectations and how many years remain before each child starts college.
    </p>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      Add D + I + M + E, then subtract any life insurance you already have (employer group life, existing policies). The result is your coverage gap — the amount of new insurance you need to buy.
    </p>
  </div>
)

export default function LifeInsurancePage() {
  return (
    <ToolPageWrapper
      title="How much life insurance do I need?"
      subtitle="Use the DIME method to calculate your exact coverage gap — based on your debt, income, mortgage, and children's education."
      canonicalUrl="https://zeember.com/how-much-life-insurance-do-i-need"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Life insurance calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <LifeCalc />
    </ToolPageWrapper>
  )
}
