import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, ArrowLeft, Calculator, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import stateAverages from '@/lib/data/state-averages.json'
import {
  type InsuranceType,
  type StateKey,
  slugToName,
  slugify,
  getStateValue,
  getNationalAvg,
  getNeighborData,
  getTypeLabel,
  getTypeSlug,
  getCalculatorHref,
  getStateInsuranceFacts,
} from '@/lib/statePageHelpers'

interface Props {
  type: InsuranceType
  stateSlug: string
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'up') return <TrendingUp className="h-4 w-4 text-red-500" />
  if (trend === 'down') return <TrendingDown className="h-4 w-4 text-green-600" />
  return <Minus className="h-4 w-4 text-neutral-400" />
}

function getTrend(stateKey: StateKey, type: InsuranceType): string {
  const data = stateAverages.states[stateKey]
  if (type === 'auto') return data.auto.trend
  if (type === 'home') return data.home.trend
  if (type === 'renters') return data.renters.trend
  return data.life_term_500k_40yr_male.trend
}

const TYPE_PAGE_TITLES: Record<InsuranceType, string> = {
  auto: 'Auto Insurance',
  home: 'Home Insurance',
  renters: 'Renters Insurance',
  life: 'Life Insurance',
}

export default function StateInsurancePage({ type, stateSlug }: Props) {
  const stateName = slugToName(stateSlug)
  if (!stateName) notFound()

  const stateData = getStateValue(stateName, type)
  const nationalAvg = getNationalAvg(type)
  const diff = ((stateData.annual - nationalAvg) / nationalAvg) * 100
  const above = diff > 0
  const neighbors = getNeighborData(stateName, type)
  const facts = getStateInsuranceFacts(stateName, type, stateData.annual, nationalAvg)
  const trend = getTrend(stateName, type)
  const typeSlug = getTypeSlug(type)
  const totalStates = 51

  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/state-map" className="inline-flex items-center gap-1.5 font-sans text-sm text-neutral-500 hover:text-primary-dark transition-colors">
              <ArrowLeft className="h-4 w-4" /> All states
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="font-sans text-sm text-neutral-500">{TYPE_PAGE_TITLES[type]}</span>
          </div>
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="h-7 w-7 text-primary-accent flex-shrink-0 mt-1" />
            <h1 className="font-serif text-[32px] md:text-[48px] font-bold text-primary-dark">
              {TYPE_PAGE_TITLES[type]} in {stateName} — Average Cost 2026
            </h1>
          </div>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl">
            Average {getTypeLabel(type)} in {stateName}: <strong>{fmt(stateData.annual)}/year</strong> ({fmt(stateData.monthly)}/month).
            {' '}{stateName} ranks #{stateData.rank} out of {totalStates} states — {above ? 'above' : 'below'} the national average.
          </p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <p className="font-sans text-xs text-neutral-500 mb-1">Average annual</p>
            <p className="font-serif text-[32px] font-bold text-primary-dark">{fmt(stateData.annual)}</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <p className="font-sans text-xs text-neutral-500 mb-1">Average monthly</p>
            <p className="font-serif text-[32px] font-bold text-primary-dark">{fmt(stateData.monthly)}</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <p className="font-sans text-xs text-neutral-500 mb-1">National rank</p>
            <p className="font-serif text-[32px] font-bold text-primary-dark">#{stateData.rank}</p>
            <p className="font-sans text-xs text-neutral-400">of {totalStates} states</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <p className="font-sans text-xs text-neutral-500 mb-1">vs national avg</p>
            <p className={`font-serif text-[32px] font-bold ${above ? 'text-red-600' : 'text-green-700'}`}>
              {above ? '+' : ''}{diff.toFixed(1)}%
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendIcon trend={trend} />
              <span className="font-sans text-xs text-neutral-400 capitalize">{trend} trend</span>
            </div>
          </div>
        </div>

        {/* vs national avg bar */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="font-sans text-base font-semibold text-neutral-800 mb-4">{stateName} vs national average</h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-sans text-sm text-neutral-600">{stateName}</span>
                <span className="font-sans text-sm font-semibold text-neutral-800">{fmt(stateData.annual)}/yr</span>
              </div>
              <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-accent rounded-full transition-all"
                  style={{ width: `${Math.min(100, (stateData.annual / (nationalAvg * 1.8)) * 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-sans text-sm text-neutral-600">National average</span>
                <span className="font-sans text-sm font-semibold text-neutral-800">{fmt(nationalAvg)}/yr</span>
              </div>
              <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neutral-300 rounded-full"
                  style={{ width: `${(nationalAvg / (nationalAvg * 1.8)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Get estimate CTA */}
        <div className="bg-primary-light border border-primary-accent/20 rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-sans text-lg font-semibold text-primary-dark mb-1 flex items-center gap-2"><Calculator className="h-5 w-5" /> Get your personalized estimate</h2>
            <p className="font-sans text-sm text-neutral-600">State averages are the starting point. Your actual rate depends on your individual profile. Use our calculator for a detailed estimate.</p>
          </div>
          <Link href={getCalculatorHref(type)} className="flex-shrink-0 bg-primary-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all font-sans text-sm whitespace-nowrap">
            Calculate for {stateName} →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* State facts */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <h2 className="font-sans text-lg font-semibold text-neutral-800 mb-4">{facts.title}</h2>
            {facts.body.split('\n\n').map((para, i) => (
              <p key={i} className="font-sans text-[16px] leading-[1.8] text-neutral-700 mb-3 last:mb-0">{para}</p>
            ))}
          </div>

          {/* Neighbors comparison */}
          {neighbors.length > 0 && (
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-sans text-lg font-semibold text-neutral-800 mb-4">How {stateName} compares to neighbors</h2>
              <div className="space-y-3">
                {/* Current state */}
                <div className="flex items-center justify-between bg-primary-light rounded-xl px-4 py-3">
                  <span className="font-sans text-sm font-semibold text-primary-dark">{stateName} (you)</span>
                  <span className="font-sans text-sm font-bold text-primary-dark">{fmt(stateData.annual)}/yr</span>
                </div>
                {neighbors.map(n => {
                  const nDiff = n.annual - stateData.annual
                  const nAbove = nDiff > 0
                  return (
                    <div key={n.name} className="flex items-center justify-between border border-neutral-100 rounded-xl px-4 py-3 hover:bg-neutral-50 transition-colors">
                      <Link href={`/${typeSlug}/${n.slug}`} className="font-sans text-sm text-primary-dark hover:text-primary-accent transition-colors">{n.name}</Link>
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-sm font-medium text-neutral-700">{fmt(n.annual)}/yr</span>
                        <span className={`font-sans text-xs font-semibold ${nAbove ? 'text-red-500' : 'text-green-600'}`}>
                          {nAbove ? '+' : ''}{fmt(Math.abs(nDiff))}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* All state types links */}
      <section className="bg-neutral-50 py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-sans text-lg font-semibold text-neutral-800 mb-4">Other insurance types in {stateName}</h2>
          <div className="flex flex-wrap gap-3">
            {(['auto', 'home', 'renters', 'life'] as InsuranceType[]).filter(t => t !== type).map(t => (
              <Link
                key={t}
                href={`/${getTypeSlug(t)}/${stateSlug}`}
                className="font-sans text-sm font-medium px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:border-primary-accent hover:text-primary-accent transition-all capitalize"
              >
                {t} insurance in {stateName}
              </Link>
            ))}
            <Link href="/state-map" className="font-sans text-sm font-medium px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:border-primary-accent hover:text-primary-accent transition-all">
              See all states →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
