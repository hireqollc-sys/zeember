'use client'

import { useState } from 'react'
import stateAverages from '@/lib/data/state-averages.json'
import Disclaimer from '@/components/Disclaimer'
import AdUnit from '@/components/AdUnit'
import FAQAccordion from '@/components/FAQAccordion'
import type { FAQItem } from '@/components/FAQAccordion'
import RelatedCalculators from '@/components/RelatedCalculators'
import type { RelatedCalc } from '@/components/RelatedCalculators'
import { Car, Home, MapPin } from 'lucide-react'
import Link from 'next/link'

type InsuranceType = 'auto' | 'home' | 'renters'

function slugify(state: string) {
  return state.toLowerCase().replace(/ /g, '-').replace(/\./g, '')
}
const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const faqItems: FAQItem[] = [
  { question: 'How do auto insurance costs vary by state?', answer: 'Auto insurance costs vary by more than 3x between the cheapest and most expensive states. Vermont averages around $900-$1,100/year for full coverage while Michigan and Florida can exceed $2,500-$3,000. Key drivers of variation include litigation rates, minimum coverage requirements, weather events, vehicle theft rates, and population density.' },
  { question: 'Why does home insurance cost so much more in some states?', answer: 'Home insurance costs are heavily influenced by natural disaster risk. Florida has hurricane and flood exposure. Texas has hurricane, hail, and tornado risk. California has wildfire risk. Oklahoma and Kansas face tornado risk. States in these high-risk zones pay dramatically more for homeowners insurance than states with minimal natural disaster exposure like Hawaii, Vermont, or Delaware.' },
  { question: 'Is renters insurance required by law?', answer: 'Renters insurance is not required by law in any state, but many landlords require it as a lease condition. Renters insurance is generally inexpensive ($15-$30/month) and provides coverage for personal belongings, personal liability, and additional living expenses if your rental becomes uninhabitable. It is one of the best values in all of insurance.' },
  { question: 'Can I get a discount by bundling all my policies?', answer: 'Yes. Most major insurers offer multi-policy discounts of 10-25% when you bundle home and auto (or renters and auto). GEICO, State Farm, Allstate, and Nationwide all offer bundling discounts. The discount only makes sense if the bundled insurer is competitive on both types — sometimes separate best-in-class insurers beat the bundled price.' },
  { question: 'How often do state insurance averages change?', answer: 'State insurance averages change annually. Auto insurance rates have increased significantly in 2023-2025 due to higher repair costs, medical inflation, increased litigation, and more frequent severe weather. Home insurance rates have risen sharply in catastrophe-prone states. Check current state averages when you are actually shopping for insurance rather than relying on year-old data.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator', description: 'Get a personalized auto insurance estimate for your state.', icon: Car },
  { title: 'Home Insurance Calculator', href: '/home-insurance-calculator', description: 'Estimate homeowners insurance based on your state and home value.', icon: Home },
  { title: 'Interactive State Map', href: '/state-map', description: 'Explore insurance costs across all 50 states on a visual map.', icon: MapPin },
]

const stateEntries = Object.entries(stateAverages.states)

export default function InsurancePremiumByStatePage() {
  const [type, setType] = useState<InsuranceType>('auto')
  const nat = stateAverages.national_averages

  const sorted = [...stateEntries].sort((a, b) => {
    const av = type === 'renters' ? a[1].renters.annual : a[1][type as 'auto' | 'home'].annual
    const bv = type === 'renters' ? b[1].renters.annual : b[1][type as 'auto' | 'home'].annual
    return av - bv
  })

  const nationalAvg = type === 'auto' ? nat.auto.annual : type === 'home' ? nat.home.annual : nat.renters.annual

  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[56px] font-bold text-primary-dark mb-4">Insurance premiums by state — all types</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl">Compare auto, home, and renters insurance premiums across all 50 states and DC.</p>
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 py-4"><AdUnit slot="LEADERBOARD_1" format="leaderboard" /></div>
      <section className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="flex gap-2 mb-6">
          {(['auto', 'home', 'renters'] as InsuranceType[]).map(t => (
            <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-xl font-sans text-sm font-semibold capitalize transition-all ${type === t ? 'bg-primary-accent text-white' : 'bg-white border border-neutral-200 text-neutral-700 hover:border-primary-accent'}`}>{t}</button>
          ))}
        </div>
        <p className="font-sans text-sm text-neutral-500 mb-4">National average ({type}): <span className="font-semibold text-neutral-800">{fmt(nationalAvg)}/year</span></p>
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full font-sans text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="text-left py-3 px-4 text-neutral-600 font-medium">Rank</th>
                <th className="text-left py-3 px-4 text-neutral-600 font-medium">State</th>
                <th className="text-right py-3 px-4 text-neutral-600 font-medium">Annual avg</th>
                <th className="text-right py-3 px-4 text-neutral-600 font-medium hidden sm:table-cell">Monthly</th>
                <th className="text-right py-3 px-4 text-neutral-600 font-medium hidden sm:table-cell">vs national</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(([name, data], idx) => {
                const annual = type === 'renters' ? data.renters.annual : data[type as 'auto' | 'home'].annual
                const monthly = type === 'renters' ? data.renters.monthly : data[type as 'auto' | 'home'].monthly
                const diff = ((annual - nationalAvg) / nationalAvg * 100).toFixed(1)
                const above = annual > nationalAvg
                return (
                  <tr key={name} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-4 text-neutral-500">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <Link href={`/${type}-insurance/${slugify(name)}`} className="font-medium text-primary-dark hover:text-primary-accent transition-colors">{name}</Link>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-neutral-800">{fmt(annual)}</td>
                    <td className="py-3 px-4 text-right text-neutral-600 hidden sm:table-cell">{fmt(monthly)}/mo</td>
                    <td className={`py-3 px-4 text-right hidden sm:table-cell text-sm font-semibold ${above ? 'text-red-600' : 'text-green-600'}`}>{above ? '+' : ''}{diff}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Disclaimer type="comparison" />
      </section>
      <section className="bg-neutral-50 py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <FAQAccordion items={faqItems} pageUrl="https://zeember.com/insurance-premium-by-state" />
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
