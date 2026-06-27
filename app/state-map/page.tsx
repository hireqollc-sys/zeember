import type { Metadata } from 'next'
import Link from 'next/link'
import USStateMap from '@/components/map/USStateMap'
import stateAverages from '@/lib/data/state-averages.json'

export const metadata: Metadata = {
  title: 'Insurance Costs by State — Interactive Map | Zeember',
  description: 'Click any state to see average insurance costs. Compare auto, home, life, and renters rates across all 50 states.',
  alternates: { canonical: 'https://zeember.com/state-map' },
  openGraph: { title: 'Insurance Costs by State | Zeember', url: 'https://zeember.com/state-map', siteName: 'Zeember', type: 'website' },
}

function slugify(name: string) {
  return name.toLowerCase().replace(/ /g, '-').replace(/\./g, '')
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const stateEntries = Object.entries(stateAverages.states)
const sortedByAuto = [...stateEntries].sort((a, b) => a[1].auto.annual - b[1].auto.annual)

export default function StateMapPage() {
  const top5Cheapest = sortedByAuto.slice(0, 5)
  const top5Expensive = sortedByAuto.slice(-5).reverse()

  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[56px] font-bold text-primary-dark mb-3">Insurance costs by state</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl">Click any state to see how your rates compare nationally. Switch tabs to view auto, home, renters, or life insurance costs.</p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-10">
        <USStateMap initialType="auto" />
      </section>

      {/* Cheapest / Most expensive */}
      <section className="bg-neutral-50 py-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-serif text-[28px] font-semibold text-primary-dark mb-6">Auto insurance cost extremes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-sans text-base font-semibold text-green-700 mb-3">5 cheapest states</h3>
              <div className="space-y-2">
                {top5Cheapest.map(([name, data]) => (
                  <div key={name} className="flex items-center justify-between bg-white border border-neutral-200 rounded-xl px-4 py-3">
                    <Link href={`/auto-insurance/${slugify(name)}`} className="font-sans text-sm font-medium text-primary-dark hover:text-primary-accent transition-colors">{name}</Link>
                    <div className="text-right">
                      <span className="font-sans text-sm font-semibold text-neutral-800">{fmt(data.auto.annual)}/yr</span>
                      <span className="font-sans text-xs text-green-600 ml-2">
                        {(((data.auto.annual - stateAverages.national_averages.auto.annual) / stateAverages.national_averages.auto.annual) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-sans text-base font-semibold text-red-700 mb-3">5 most expensive states</h3>
              <div className="space-y-2">
                {top5Expensive.map(([name, data]) => (
                  <div key={name} className="flex items-center justify-between bg-white border border-neutral-200 rounded-xl px-4 py-3">
                    <Link href={`/auto-insurance/${slugify(name)}`} className="font-sans text-sm font-medium text-primary-dark hover:text-primary-accent transition-colors">{name}</Link>
                    <div className="text-right">
                      <span className="font-sans text-sm font-semibold text-neutral-800">{fmt(data.auto.annual)}/yr</span>
                      <span className="font-sans text-xs text-red-600 ml-2">
                        +{(((data.auto.annual - stateAverages.national_averages.auto.annual) / stateAverages.national_averages.auto.annual) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links to all states */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-serif text-[28px] font-semibold text-primary-dark mb-6">All state auto insurance rates</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {sortedByAuto.map(([name, data]) => (
              <Link
                key={name}
                href={`/auto-insurance/${slugify(name)}`}
                className="flex flex-col p-3 bg-neutral-50 hover:bg-primary-light border border-neutral-200 rounded-xl transition-colors group"
              >
                <span className="font-sans text-xs font-medium text-neutral-800 group-hover:text-primary-dark">{name}</span>
                <span className="font-sans text-sm font-semibold text-neutral-700 group-hover:text-primary-dark">{fmt(data.auto.annual)}/yr</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="bg-primary py-12 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="font-serif text-[28px] font-semibold text-white mb-3">Get your personalized estimate</h2>
          <p className="font-sans text-white/80 mb-6">State averages are just the starting point. Your actual rate depends on your age, vehicle, driving record, and coverage level.</p>
          <Link href="/auto-insurance-calculator" className="inline-block bg-primary-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all">Calculate my auto insurance cost →</Link>
        </div>
      </section>
    </main>
  )
}
