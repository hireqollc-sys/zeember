import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Methodology — How Zeember Calculators Work | Zeember',
  description: 'How Zeember calculates insurance cost estimates. Data sources, formulas, limitations, and update frequency.',
  alternates: { canonical: 'https://zeember.com/methodology' },
}

const limitations = [
  'Our calculators do not use your specific address or zip code for rating, which is a significant factor insurers use. Your rate within a state can vary 20–50% based on your specific location.',
  'We do not access your actual credit-based insurance score, which affects auto and home insurance rates significantly in most states.',
  'Our estimates use state-average base rates. If you live in a high-cost urban area within a lower-cost state, you may pay more than our estimate.',
  'Insurer-specific pricing algorithms are proprietary and not available to us. Our estimates reflect industry averages, not any specific company\'s current rate filings.',
  'Data is updated quarterly. Recent rate increases from natural disasters, inflation, or regulatory changes may not be fully reflected.',
]

export default function MethodologyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary py-20 px-6">
        <div className="max-w-[780px] mx-auto">
          <h1 className="font-serif text-[40px] md:text-[52px] font-bold text-white mb-4">
            Our methodology
          </h1>
          <p className="font-sans text-xl text-white/70 max-w-xl">
            How our calculators work, where our data comes from, and what they cannot tell you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-neutral-50 py-16 px-6">
        <div className="max-w-[780px] mx-auto space-y-6">

          {/* Data sources */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-[26px] font-semibold text-primary-dark mb-6">Data sources</h2>
            <div className="space-y-5">
              {[
                {
                  name: 'NAIC 2025 Auto Insurance Database Report',
                  detail: 'State-level average auto insurance premiums by coverage type. This is the primary source for state average auto insurance figures.',
                  link: 'https://www.naic.org',
                },
                {
                  name: 'NAIC 2025 Homeowners Insurance Report',
                  detail: 'State-level average homeowners insurance premiums and coverage data.',
                  link: 'https://www.naic.org',
                },
                {
                  name: 'Insurance Information Institute (III.org) 2025',
                  detail: 'National averages for all coverage types, trend data, and supplemental state data.',
                  link: 'https://www.iii.org',
                },
                {
                  name: 'J.D. Power 2025 U.S. Auto and Property Insurance Studies',
                  detail: 'Customer satisfaction scores used in insurer profile data.',
                  link: 'https://www.jdpower.com',
                },
                {
                  name: 'AM Best 2025 ratings',
                  detail: 'Financial strength ratings for all insurer profiles.',
                  link: 'https://www.ambest.com',
                },
                {
                  name: 'NAIC Complaint Database',
                  detail: 'Complaint index figures for all profiled insurers.',
                  link: 'https://www.naic.org',
                },
              ].map(source => (
                <div key={source.name} className="border-l-2 border-primary-accent pl-4">
                  <p className="font-sans font-semibold text-[16px] text-neutral-800">{source.name}</p>
                  <p className="font-sans text-[15px] text-neutral-600 mt-1">{source.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How estimates are produced */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-[26px] font-semibold text-primary-dark mb-6">How calculators produce estimates</h2>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700 mb-6">
              Each calculator starts with a state-level base rate drawn from NAIC data. This base rate represents the average cost for a standard policy in that state. Individual risk multipliers are then applied based on your inputs.
            </p>

            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-[20px] font-semibold text-primary-dark mb-3">Auto insurance</h3>
                <p className="font-sans text-[17px] leading-relaxed text-neutral-700 mb-3">
                  Multipliers applied: age group (from actuarial age-risk curves), vehicle type, coverage level, driving record, and annual mileage. Each multiplier is derived from published industry data on how these factors correlate with claims frequency and severity.
                </p>
                <div className="bg-neutral-50 rounded-xl p-4 font-mono text-sm text-neutral-700">
                  estimate = base_rate × age × vehicle × coverage × record × mileage × year_factor
                </div>
              </div>

              <div>
                <h3 className="font-serif text-[20px] font-semibold text-primary-dark mb-3">Life insurance</h3>
                <p className="font-sans text-[17px] leading-relaxed text-neutral-700 mb-3">
                  Estimates use published benchmark rates for term policies by age bracket, gender, and tobacco status, scaled proportionally to coverage amounts using the DIME method for needs calculation.
                </p>
                <div className="bg-neutral-50 rounded-xl p-4 font-mono text-sm text-neutral-700">
                  coverage_need = debt + (income × years) + mortgage + education − existing
                </div>
              </div>

              <div>
                <h3 className="font-serif text-[20px] font-semibold text-primary-dark mb-3">Home insurance</h3>
                <p className="font-sans text-[17px] leading-relaxed text-neutral-700 mb-3">
                  Estimates start from state averages and adjust for home value, construction type, age, deductible, and coverage level using industry-published adjustment factors.
                </p>
                <div className="bg-neutral-50 rounded-xl p-4 font-mono text-sm text-neutral-700">
                  estimate = (home_value × 0.001) × state_factor × construction × roof × deductible × coverage
                </div>
              </div>
            </div>
          </div>

          {/* Limitations */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-[26px] font-semibold text-primary-dark mb-6">Limitations</h2>
            <ul className="space-y-4">
              {limitations.map((limitation, i) => (
                <li key={i} className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-[17px] leading-relaxed text-neutral-700">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Update frequency */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-[26px] font-semibold text-primary-dark mb-4">Update frequency</h2>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700">
              State average data is updated quarterly using the most recent available NAIC and III publications. Insurer profile data (ratings, scores, complaint indices) is updated annually. Calculator formulas and multipliers are reviewed annually against published actuarial research.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 flex-wrap pt-2">
            <Link href="/about" className="font-sans text-sm font-semibold text-primary-accent hover:text-primary-dark transition-colors">
              About Zeember →
            </Link>
            <Link href="/disclaimer" className="font-sans text-sm font-semibold text-primary-accent hover:text-primary-dark transition-colors">
              Full disclaimer →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
