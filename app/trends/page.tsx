import type { Metadata } from 'next'
import TrendsChart from '@/components/TrendsChart'

export const metadata: Metadata = {
  title: 'Insurance Premium Trends 2021-2026 | Zeember',
  description: 'See how insurance premiums have changed over 5 years nationally and by state. NAIC and Insurance Information Institute data.',
  alternates: { canonical: 'https://zeember.com/trends' },
  openGraph: { title: 'Insurance Premium Trends | Zeember', url: 'https://zeember.com/trends', siteName: 'Zeember', type: 'website' },
}

export default function TrendsPage() {
  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[56px] font-bold text-primary-dark mb-3">Insurance premium trends</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl">Track how insurance premiums have changed nationally and by state over 5 years. Data sourced from NAIC and the Insurance Information Institute.</p>
        </div>
      </section>
      <TrendsChart />
    </main>
  )
}
