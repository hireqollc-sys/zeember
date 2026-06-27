import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer | Zeember',
  description: 'Zeember insurance cost estimates are for informational purposes only. We are not licensed insurance agents.',
  alternates: { canonical: 'https://zeember.com/disclaimer' },
  robots: { index: false, follow: true },
}

export default function DisclaimerPage() {
  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[48px] font-bold text-primary-dark mb-2">Disclaimer</h1>
          <p className="font-sans text-sm text-neutral-500">Last updated: January 2026</p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="max-w-2xl space-y-6 font-sans text-[17px] leading-[1.8] text-neutral-700">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="font-sans font-semibold text-amber-800">Zeember is not a licensed insurance agent, broker, or company. We cannot provide binding insurance quotes or sell insurance of any kind.</p>
          </div>

          <p>All estimates, calculations, and cost information provided on Zeember are for informational and educational purposes only. They represent approximations based on publicly available state averages and actuarial multipliers, and should not be relied upon as guaranteed prices or coverage commitments.</p>

          <p>Actual insurance premiums are determined by individual underwriting processes at each insurance company, and will vary based on factors including but not limited to: your specific address and garaging location, complete driving and claims history, credit-based insurance score (where permitted by state law), the insurer&apos;s current rate filings, and market conditions at time of application.</p>

          <p>Insurance data on Zeember is sourced from publicly available reports including NAIC annual data reports, Insurance Information Institute publications, and J.D. Power studies. This data is updated periodically but may not reflect the most current rates or company changes. Insurer ratings and satisfaction scores are based on data available at time of publication.</p>

          <p>Zeember receives revenue through Google AdSense advertising. We may also include affiliate links to insurance companies and lead-generation services. The presence of an affiliate link does not imply endorsement of any specific product, and we are not compensated based on whether you purchase insurance.</p>

          <p>Nothing on Zeember constitutes legal, financial, or insurance advice. For personalized insurance recommendations, coverage guidance, or accurate pricing, contact a licensed insurance agent or broker in your state.</p>
        </div>
      </section>
    </main>
  )
}
