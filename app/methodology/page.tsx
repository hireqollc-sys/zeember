import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Methodology — How Zeember Calculators Work | Zeember',
  description: 'How Zeember calculates insurance cost estimates. Data sources, formulas, limitations, and update frequency.',
  alternates: { canonical: 'https://zeember.com/methodology' },
}

export default function MethodologyPage() {
  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[48px] font-bold text-primary-dark mb-3">Our methodology</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl">How our calculators work, where our data comes from, and what they cannot tell you.</p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="max-w-2xl space-y-10">
          <div>
            <h2 className="font-serif text-[24px] font-semibold text-primary-dark mb-4">Data sources</h2>
            <div className="space-y-4 font-sans text-[17px] text-neutral-700 leading-[1.8]">
              <p><strong>NAIC 2025 Auto Insurance Database Report</strong> — State-level average auto insurance premiums by coverage type. This is the primary source for state average auto insurance figures.</p>
              <p><strong>NAIC 2025 Homeowners Insurance Report</strong> — State-level average homeowners insurance premiums and coverage data.</p>
              <p><strong>Insurance Information Institute (III.org) 2025</strong> — National averages for all coverage types, trend data, and supplemental state data.</p>
              <p><strong>J.D. Power 2025 U.S. Auto and Property Insurance Studies</strong> — Customer satisfaction scores used in insurer profile data.</p>
              <p><strong>AM Best 2025 ratings</strong> — Financial strength ratings for all insurer profiles.</p>
              <p><strong>NAIC Complaint Database</strong> — Complaint index figures for all profiled insurers.</p>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-[24px] font-semibold text-primary-dark mb-4">How calculators produce estimates</h2>
            <div className="space-y-4 font-sans text-[17px] text-neutral-700 leading-[1.8]">
              <p>Each calculator starts with a state-level base rate drawn from NAIC data. This base rate represents the average cost for a standard policy in that state. Individual risk multipliers are then applied based on your inputs.</p>
              <p>For auto insurance, multipliers include: age group (from actuarial age-risk curves), vehicle type, coverage level, driving record, and annual mileage. Each multiplier is derived from published industry data on how these factors correlate with claims frequency and severity.</p>
              <p>For life insurance, estimates use published benchmark rates for term policies by age bracket, gender, and tobacco status, scaled proportionally to coverage amounts.</p>
              <p>For home insurance, estimates start from state averages and adjust for home value, construction type, age, deductible, and coverage level using industry-published adjustment factors.</p>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-[24px] font-semibold text-primary-dark mb-4">Limitations</h2>
            <ul className="space-y-3 font-sans text-[17px] text-neutral-700">
              {[
                'Our calculators do not use your specific address or zip code for rating, which is a significant factor insurers use. Your rate within a state can vary 20-50% based on your specific location.',
                'We do not access your actual credit-based insurance score, which affects auto and home insurance rates significantly in most states.',
                'Our estimates use state-average base rates. If you live in a high-cost urban area within a lower-cost state, you may pay more than our estimate.',
                'Insurer-specific pricing algorithms are proprietary and not available to us. Our estimates reflect industry averages, not any specific company\'s current rate filings.',
                'Data is updated quarterly. Recent rate increases from natural disasters, inflation, or regulatory changes may not be fully reflected.',
              ].map((limitation, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="text-amber-500 font-bold mt-1">!</span>
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-[24px] font-semibold text-primary-dark mb-4">Update frequency</h2>
            <p className="font-sans text-[17px] text-neutral-700 leading-[1.8]">State average data is updated quarterly using the most recent available NAIC and III publications. Insurer profile data (ratings, scores, complaint indices) is updated annually. Calculator formulas and multipliers are reviewed annually against published actuarial research.</p>
          </div>

          <div className="flex gap-4">
            <Link href="/about" className="font-sans text-sm font-semibold text-primary-accent hover:text-primary-dark transition-colors">About Zeember →</Link>
            <Link href="/disclaimer" className="font-sans text-sm font-semibold text-primary-accent hover:text-primary-dark transition-colors">Full disclaimer →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
