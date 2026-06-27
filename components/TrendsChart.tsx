'use client'

import { useState } from 'react'
import { AreaChart } from '@tremor/react'
import rateTrends from '@/lib/data/rate-trends-5yr.json'
import AdUnit from '@/components/AdUnit'

type InsuranceType = 'auto' | 'home' | 'renters'

const TYPE_LABELS: Record<InsuranceType, string> = {
  auto: 'Auto insurance',
  home: 'Home insurance',
  renters: 'Renters insurance',
}

const AVAILABLE_STATES = Object.keys(rateTrends.by_state) as (keyof typeof rateTrends.by_state)[]

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const COLORS = ['blue', 'violet', 'orange', 'rose', 'cyan']

export default function TrendsChart() {
  const [activeType, setActiveType] = useState<InsuranceType>('auto')
  const [selectedStates, setSelectedStates] = useState<string[]>([])

  const years = rateTrends.years
  const national = rateTrends.national[activeType]
  const nationalChange = (((national[national.length - 1] - national[0]) / national[0]) * 100).toFixed(1)

  const chartData = years.map((year, i) => {
    const row: Record<string, number | string> = {
      year: year.toString(),
      'National average': national[i],
    }
    selectedStates.forEach(state => {
      const stateKey = state as keyof typeof rateTrends.by_state
      const stateData = rateTrends.by_state[stateKey] as Record<string, number[]> | undefined
      if (stateData && stateData[activeType]) {
        row[state] = stateData[activeType][i]
      }
    })
    return row
  })

  const categories = ['National average', ...selectedStates]

  function toggleState(state: string) {
    setSelectedStates(prev =>
      prev.includes(state) ? prev.filter(s => s !== state) : prev.length < 5 ? [...prev, state] : prev
    )
  }

  const observations: Record<InsuranceType, string[]> = {
    auto: [
      'Auto insurance premiums rose 18% nationally from 2021 to 2025, driven by supply chain disruptions, higher repair costs, and increased litigation.',
      'Florida and California saw the sharpest increases, with rates rising more than 35% over the 5-year period.',
      'The 2022-2023 period showed the steepest annual increases as insurers caught up with inflation in repair costs.',
    ],
    home: [
      'Homeowners insurance rose 14% nationally from 2021 to 2025, with catastrophe-prone states seeing much sharper increases.',
      'Florida, Texas, and California experienced the largest home insurance rate increases, driven by hurricane, hail, wildfire, and flood claims.',
      'Several major insurers reduced or eliminated coverage in high-risk states, reducing competition and pushing rates higher.',
    ],
    renters: [
      'Renters insurance has remained the most affordable insurance type, with modest increases of around 15% over 5 years.',
      'Rate increases have been more uniform across states compared to auto and homeowners insurance.',
      'Despite increases, renters insurance remains one of the best value insurance products — averaging under $25/month nationally.',
    ],
  }

  return (
    <div>
      <div className="max-w-[1280px] mx-auto px-6 py-4"><AdUnit slot="LEADERBOARD_1" format="leaderboard" /></div>

      <div className="max-w-[1280px] mx-auto px-6 py-8">
        {/* Type tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['auto', 'home', 'renters'] as InsuranceType[]).map(t => (
            <button
              key={t}
              onClick={() => { setActiveType(t); setSelectedStates([]) }}
              className={`px-4 py-2 rounded-xl font-sans text-sm font-semibold transition-all ${
                activeType === t ? 'bg-primary-accent text-white' : 'bg-white border border-neutral-200 text-neutral-700 hover:border-primary-accent'
              }`}
            >
              {TYPE_LABELS[t]}
            </button>
          ))}
        </div>

        {/* Stat summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: '2021 national avg', value: fmt(national[0]) },
            { label: '2026 national avg', value: fmt(national[national.length - 1]) },
            { label: '5-year change', value: `+${nationalChange}%` },
            { label: 'Annual avg increase', value: `+${(parseFloat(nationalChange) / 5).toFixed(1)}%` },
          ].map(stat => (
            <div key={stat.label} className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm">
              <p className="font-sans text-xs text-neutral-500 mb-1">{stat.label}</p>
              <p className="font-serif text-2xl font-bold text-primary-dark">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* State selector */}
        <div className="mb-4">
          <p className="font-sans text-sm text-neutral-600 mb-2">Add state trend lines (up to 5):</p>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_STATES.map(state => (
              <button
                key={state}
                onClick={() => toggleState(state)}
                disabled={!selectedStates.includes(state) && selectedStates.length >= 5}
                className={`px-3 py-1.5 rounded-full font-sans text-xs font-semibold transition-all ${
                  selectedStates.includes(state)
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 disabled:opacity-40'
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <AreaChart
            data={chartData}
            index="year"
            categories={categories}
            colors={['emerald', ...COLORS.slice(0, selectedStates.length)]}
            valueFormatter={fmt}
            yAxisWidth={70}
            className="h-72"
            showAnimation
            showLegend
            connectNulls
          />
        </div>

        {/* Key observations */}
        <div className="mt-6 bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
          <h2 className="font-sans text-base font-semibold text-neutral-800 mb-3">Key observations</h2>
          <ul className="space-y-2">
            {observations[activeType].map((obs, i) => (
              <li key={i} className="flex gap-2.5 font-sans text-sm text-neutral-700">
                <span className="text-primary-accent font-bold mt-0.5">&#8226;</span>
                <span>{obs}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="font-sans text-xs text-neutral-400 mt-4">
          Sources: {rateTrends.sources.join(', ')}. Data for informational purposes. Actual rates vary by insurer and individual risk profile.
        </p>
      </div>
    </div>
  )
}
