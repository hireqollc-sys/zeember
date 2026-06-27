'use client'

import { useState, useMemo } from 'react'
import stateAverages from '@/lib/data/state-averages.json'
import Disclaimer from '@/components/Disclaimer'
import AdUnit from '@/components/AdUnit'
import FAQAccordion from '@/components/FAQAccordion'
import type { FAQItem } from '@/components/FAQAccordion'
import RelatedCalculators from '@/components/RelatedCalculators'
import type { RelatedCalc } from '@/components/RelatedCalculators'
import { Car, MapPin, TrendingUp } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

type SortKey = 'state' | 'annual-asc' | 'annual-desc'

const NATIONAL = stateAverages.national_averages.auto.annual

function slugify(state: string) {
  return state.toLowerCase().replace(/ /g, '-').replace(/\./g, '')
}

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const faqItems: FAQItem[] = [
  { question: 'Which state has the cheapest car insurance?', answer: 'Vermont, Idaho, Maine, and Ohio consistently rank among the cheapest states for auto insurance, with average annual premiums under $1,200 for full coverage. Low population density, fewer claims, and lower litigation rates in these states keep premiums down. Rural states with fewer severe weather events and lower vehicle theft rates also tend to have lower premiums.' },
  { question: 'Which state has the most expensive car insurance?', answer: 'Florida, Louisiana, Michigan, New York, and California consistently rank among the most expensive states for auto insurance. Florida and Louisiana have high litigation rates and frequent natural disasters. Michigan historically had the highest rates due to its unlimited personal injury protection (PIP) requirement, though 2020 reforms reduced rates somewhat. New York and California have dense urban areas with higher theft and accident rates.' },
  { question: 'Why is car insurance so much more expensive in some states?', answer: 'State-level factors that drive higher premiums include: litigation environment (states with high lawsuit frequency pay more in claims), minimum coverage requirements, weather and natural disaster frequency (hail, hurricanes, flooding), vehicle theft rates, population density and traffic congestion, and state insurance regulations. Michigan\'s historically high rates were largely driven by a unique unlimited PIP law.' },
  { question: 'Does my state determine my insurance rate?', answer: 'Your state is a major factor but not the only one. Within your state, your specific zip code, city, and neighborhood matter significantly — urban drivers typically pay more than rural drivers in the same state. Your individual factors — age, driving record, vehicle, coverage level — are applied on top of the state and zip code baseline rate.' },
  { question: 'Can I get cheaper insurance by registering my car in a cheaper state?', answer: 'No. Insurance fraud charges apply to people who register vehicles or obtain policies in states where they do not actually reside. Your insurer needs to know your primary residence, where the vehicle is garaged, and where you primarily drive. Intentionally misrepresenting your address to get a lower rate is insurance fraud and can result in claim denial and policy cancellation.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator', description: 'Get your personalized auto insurance estimate with a full breakdown.', icon: Car },
  { title: 'State Map', href: '/state-map', description: 'Explore insurance costs across all 50 states on an interactive map.', icon: MapPin },
  { title: 'Rate Trends', href: '/trends', description: 'See how auto insurance rates have changed over the past 5 years.', icon: TrendingUp },
]

export default function CarInsuranceByStatePage() {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('annual-asc')

  const rows = useMemo(() => {
    const entries = Object.entries(stateAverages.states).map(([name, data]) => ({
      name,
      slug: slugify(name),
      annual: data.auto.annual,
      monthly: data.auto.monthly,
      rank: data.auto.rank,
      diff: ((data.auto.annual - NATIONAL) / NATIONAL * 100).toFixed(1),
      above: data.auto.annual > NATIONAL,
    }))
    const filtered = search ? entries.filter(e => e.name.toLowerCase().includes(search.toLowerCase())) : entries
    if (sortKey === 'state') return filtered.sort((a, b) => a.name.localeCompare(b.name))
    if (sortKey === 'annual-asc') return filtered.sort((a, b) => a.annual - b.annual)
    return filtered.sort((a, b) => b.annual - a.annual)
  }, [search, sortKey])

  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[56px] font-bold text-primary-dark mb-4">Average car insurance cost by state 2026</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl">Full coverage auto insurance averages for all 50 states. National average: <strong>{fmt(NATIONAL)}/year</strong>.</p>
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 py-4"><AdUnit slot="LEADERBOARD_1" format="leaderboard" /></div>
      <section className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Input placeholder="Search state..." className="h-11 max-w-xs" value={search} onChange={e => setSearch(e.target.value)} />
          <select className="h-11 px-3 rounded-lg border border-neutral-200 font-sans text-sm bg-white" value={sortKey} onChange={e => setSortKey(e.target.value as SortKey)}>
            <option value="annual-asc">Cheapest first</option>
            <option value="annual-desc">Most expensive first</option>
            <option value="state">Alphabetical</option>
          </select>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full font-sans text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="text-left py-3 px-4 text-neutral-600 font-medium">State</th>
                <th className="text-right py-3 px-4 text-neutral-600 font-medium">Avg annual</th>
                <th className="text-right py-3 px-4 text-neutral-600 font-medium">Avg monthly</th>
                <th className="text-right py-3 px-4 text-neutral-600 font-medium hidden sm:table-cell">vs national</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.name} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="py-3 px-4">
                    <Link href={`/auto-insurance/${r.slug}`} className="font-medium text-primary-dark hover:text-primary-accent transition-colors">{r.name}</Link>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-neutral-800">{fmt(r.annual)}</td>
                  <td className="py-3 px-4 text-right text-neutral-600">{fmt(r.monthly)}/mo</td>
                  <td className={`py-3 px-4 text-right hidden sm:table-cell text-sm font-semibold ${r.above ? 'text-red-600' : 'text-green-600'}`}>
                    {r.above ? '+' : ''}{r.diff}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Disclaimer type="comparison" />
      </section>
      <section className="bg-neutral-50 py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <FAQAccordion items={faqItems} pageUrl="https://zeember.com/car-insurance-cost-by-state" />
        </div>
      </section>
      <section className="bg-white py-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          <RelatedCalculators calculators={relatedCalcs} />
        </div>
      </section>
    </main>
  )
}
