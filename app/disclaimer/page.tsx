import type { Metadata } from 'next'
import { AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disclaimer | Zeember',
  description: 'Zeember insurance cost estimates are for informational purposes only. We are not licensed insurance agents.',
  alternates: { canonical: 'https://zeember.com/disclaimer' },
  robots: { index: false, follow: true },
}

export default function DisclaimerPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary py-20 px-6">
        <div className="max-w-[780px] mx-auto">
          <h1 className="font-serif text-[40px] md:text-[52px] font-bold text-white mb-4">
            Disclaimer
          </h1>
          <p className="font-sans text-lg text-white/60">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-neutral-50 py-16 px-6">
        <div className="max-w-[780px] mx-auto space-y-6">

          {/* Prominent amber warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="font-sans text-[16px] font-semibold text-amber-800 leading-relaxed">
              Zeember is not a licensed insurance agent, broker, or company. All results on this site are estimates for informational purposes only and do not constitute insurance quotes, coverage commitments, or financial advice.
            </p>
          </div>

          {/* Section 1 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-[22px] font-semibold text-primary-dark mb-4">
              Estimates only — not insurance quotes
            </h2>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700">
              All estimates, calculations, and cost information provided on Zeember are for informational and educational purposes only. They represent approximations based on publicly available state averages and actuarial multipliers, and should not be relied upon as guaranteed prices or coverage commitments.
            </p>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700 mt-4">
              Actual insurance premiums are determined by individual underwriting processes at each insurance company, and will vary based on factors including but not limited to: your specific address and garaging location, complete driving and claims history, credit-based insurance score (where permitted by state law), the insurer&apos;s current rate filings, and market conditions at time of application.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-[22px] font-semibold text-primary-dark mb-4">
              Not a licensed insurance agent or broker
            </h2>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700">
              Zeember is an informational website only. We are not a licensed insurance agent, broker, or carrier in any state. We do not sell insurance, bind coverage, or provide personalized policy recommendations. Nothing on this site should be interpreted as advice from a licensed professional.
            </p>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700 mt-4">
              For personalized insurance recommendations, coverage guidance, or accurate pricing, contact a licensed insurance agent or broker in your state. You can find licensed agents through your state&apos;s Department of Insurance website.
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-[22px] font-semibold text-primary-dark mb-4">
              Data accuracy and limitations
            </h2>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700">
              Insurance data on Zeember is sourced from publicly available reports including NAIC annual data reports, Insurance Information Institute publications, and J.D. Power studies. This data is updated periodically but may not reflect the most current rates or company changes.
            </p>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700 mt-4">
              Insurer ratings and satisfaction scores are based on data available at time of publication. Company profiles, scores, and rankings may have changed since our last update. Always verify current information directly with the insurer.
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-[22px] font-semibold text-primary-dark mb-4">
              External links and third parties
            </h2>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700">
              Zeember receives revenue through Google AdSense advertising. We may also include affiliate links to insurance companies and lead-generation services. The presence of an affiliate link does not imply endorsement of any specific product, and our editorial content is not influenced by commercial relationships.
            </p>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700 mt-4">
              We are not responsible for the content, accuracy, or practices of any external websites linked from Zeember. Review each site&apos;s own terms and privacy policy before submitting personal information.
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}
