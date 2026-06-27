import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Car, AlertCircle } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import AutoCalc from './AutoCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Auto Insurance Calculator — Estimate Your Real Cost',
  description:
    'Free auto insurance cost calculator with a full premium breakdown. No signup, no personal info. See what drives your rate instantly.',
  alternates: { canonical: 'https://zeember.com/auto-insurance-calculator' },
  openGraph: {
    title: 'Auto Insurance Calculator — Estimate Your Real Cost | Zeember',
    description: 'Free auto insurance cost calculator with a full premium breakdown.',
    url: 'https://zeember.com/auto-insurance-calculator',
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to estimate your auto insurance cost',
  step: [
    { '@type': 'HowToStep', name: 'Select your state', text: 'Choose the state where your vehicle is registered.' },
    { '@type': 'HowToStep', name: 'Enter your age', text: 'Your age is one of the strongest rate factors.' },
    { '@type': 'HowToStep', name: 'Describe your vehicle', text: 'Enter vehicle type and model year.' },
    { '@type': 'HowToStep', name: 'Choose coverage level', text: 'Select minimum, standard, or full coverage.' },
    { '@type': 'HowToStep', name: 'Enter driving record and mileage', text: 'Violations and mileage affect your rate.' },
    { '@type': 'HowToStep', name: 'Click Calculate', text: 'See your estimate with a full cost breakdown.' },
  ],
}

const faqItems: FAQItem[] = [
  {
    question: 'How accurate is this auto insurance estimate?',
    answer:
      'This calculator uses state average base rates from NAIC public data and applies multipliers for age, vehicle type, coverage level, driving record, and mileage. Estimates are typically within 15–25% of actual quotes for drivers with straightforward profiles. Your actual premium will vary by insurer, your specific zip code, credit score (in most states), and the exact coverage limits you choose. Use this as a starting point for shopping, not a final number.',
  },
  {
    question: 'What is the difference between full coverage and liability-only insurance?',
    answer:
      'Liability insurance covers damage and injuries you cause to others. It is required by law in almost every state. Full coverage adds collision coverage (pays for your car after an accident) and comprehensive coverage (pays for theft, weather damage, and other non-collision events). Full coverage is required by lenders when you finance or lease. Use our full coverage vs liability calculator to see if full coverage is worth it for your specific car value.',
  },
  {
    question: 'How can I lower my auto insurance rate?',
    answer:
      'Five proven strategies: (1) Raise your deductible — going from $500 to $1,000 typically saves 10–15%. (2) Ask about every available discount — good driver, multi-policy, good student, low mileage, and paperless billing discounts are commonly missed. (3) Shop quotes every 12–18 months — rates change and insurers price risk differently. (4) Consider telematics programs like Progressive Snapshot or State Farm Drive Safe & Save — safe drivers can save 10–30%. (5) Drop full coverage on older vehicles worth less than 4x your annual coverage cost.',
  },
  {
    question: 'Does my credit score affect my car insurance rate?',
    answer:
      'In most states, yes. Insurers use a credit-based insurance score (separate from your standard credit score) as a rate factor. Drivers with poor credit scores can pay 30–80% more than drivers with excellent credit for identical coverage. The states that prohibit using credit scores for auto insurance are California, Hawaii, and Massachusetts. If you live elsewhere and have been working to improve your credit, shopping for new quotes after a significant improvement can result in meaningful savings.',
  },
  {
    question: 'How often should I shop for car insurance?',
    answer:
      'Every 12–18 months, or whenever a major life change occurs. Rates shift constantly, and loyalty does not always pay with insurance. The best time to shop is 3–4 weeks before your renewal date. Key triggers to shop early: buying a new vehicle, moving to a new state, getting married, turning 25, paying off your car loan, adding or removing a driver, or a significant change in your driving record (good or bad).',
  },
]

const relatedCalcs: RelatedCalc[] = [
  {
    title: 'Full Coverage vs Liability',
    href: '/full-coverage-vs-liability-calculator',
    description: 'Find the break-even point for your car — when is full coverage no longer worth it?',
    icon: Shield,
  },
  {
    title: 'Teen Driver Insurance',
    href: '/teen-driver-insurance-calculator',
    description: 'See exactly how much adding a teen driver raises your family policy premium.',
    icon: Car,
  },
  {
    title: 'Gap Insurance Calculator',
    href: '/gap-insurance-calculator',
    description: "Calculate whether you need gap insurance based on your loan balance and car's value.",
    icon: AlertCircle,
  },
]

const howToContent = (
  <div className="prose-custom">
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">
      How auto insurance rates are calculated
    </h2>

    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Your auto insurance premium is not random. Every dollar of your rate can be traced back to a handful of well-defined risk factors. Insurers have spent decades analyzing claim data, and they charge you based on how closely you resemble people who have filed claims in the past. Understanding these factors puts you in a stronger position to shop smart.
    </p>

    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">1. Your state</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Where you live is the single biggest factor. Michigan drivers pay an average of $2,900/year; Maine drivers pay around $1,020 — nearly a 3x difference for the same car and driver profile. State-level factors include minimum coverage requirements, lawsuit climate, medical cost environment, and the density of uninsured drivers. High-population urban states and states with severe weather exposure consistently rank among the most expensive.
    </p>

    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">2. Your age</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Teenage drivers (16–19) pay 2–3x the rate of a 35-year-old with an identical record. This is not punitive — it reflects actuarial reality. Drivers under 25 have significantly higher accident rates per mile driven. Rates drop sharply through your mid-20s and stabilize through your 30s–50s before ticking up slightly after 65. The biggest single rate improvement most people experience is turning 25.
    </p>

    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">3. Your vehicle</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Sports cars cost 30–50% more to insure than sedans. Electric vehicles carry a 10–15% premium due to higher repair costs. Minivans and economy sedans are among the cheapest to insure. Vehicle year also matters — newer cars cost more to repair but may qualify for safety discounts. A 10-year-old car is typically cheaper to insure than a 2-year-old model of the same type, even under full coverage.
    </p>

    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">4. Coverage level</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Minimum liability coverage — just enough to be legal — costs roughly half what full coverage costs. Standard coverage sits in between. <Link href="/glossary/full-coverage" className="text-primary-accent hover:underline">Full coverage</Link> includes <Link href="/glossary/collision-coverage" className="text-primary-accent hover:underline">collision</Link> and <Link href="/glossary/comprehensive-coverage" className="text-primary-accent hover:underline">comprehensive</Link>, which pay for damage to your own vehicle. You can also tune your <Link href="/glossary/deductible" className="text-primary-accent hover:underline">deductible</Link> — raising it from $500 to $1,000 typically cuts 10–15% off your premium.
    </p>

    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">5. Your driving record</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      A single at-fault accident raises rates by 30–50% on average, and the impact persists for 3–5 years depending on your state. A DUI can double your premium and trigger an SR-22 requirement. Multiple incidents can push you into the non-standard (high-risk) insurance market where rates are significantly higher. A clean record is worth protecting — consider the long-term insurance cost before making small claims.
    </p>

    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">6. Annual mileage</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      More miles means more exposure time on the road. Drivers logging 15,000+ miles per year pay a modest premium over average-mileage drivers. Low-mileage drivers (under 5,000 miles/year) can often qualify for specific low-mileage discounts. Telematics programs from Progressive, State Farm, and Allstate verify your actual mileage and reward low-mileage drivers more aggressively than manual reporting alone.
    </p>

    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      Use the calculator above to see how your specific combination of these factors compares to your state average. The breakdown chart shows exactly which factors are driving your estimated premium — and which ones offer the most room for savings.
    </p>
  </div>
)

export default function AutoInsuranceCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ToolPageWrapper
        title="Auto insurance calculator"
        subtitle="Estimate your annual car insurance premium with a full cost breakdown. See which factors drive your rate."
        canonicalUrl="https://zeember.com/auto-insurance-calculator"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Auto insurance calculator' },
        ]}
        howToContent={howToContent}
        faqItems={faqItems}
        relatedCalculators={relatedCalcs}
      >
        <AutoCalc />
      </ToolPageWrapper>
    </>
  )
}
