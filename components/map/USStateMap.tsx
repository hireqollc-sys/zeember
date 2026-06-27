'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { motion, AnimatePresence } from 'framer-motion'
import stateAverages from '@/lib/data/state-averages.json'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

type InsuranceType = 'auto' | 'home' | 'renters' | 'life'

interface Props {
  initialType?: InsuranceType
}

const TYPE_LABELS: Record<InsuranceType, string> = {
  auto: 'Auto',
  home: 'Home',
  renters: 'Renters',
  life: 'Life',
}

function slugify(name: string) {
  return name.toLowerCase().replace(/ /g, '-').replace(/\./g, '')
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

type StateData = typeof stateAverages.states
type StateKey = keyof StateData

function getAnnualValue(stateKey: StateKey, type: InsuranceType): number {
  const data = stateAverages.states[stateKey]
  if (type === 'auto') return data.auto.annual
  if (type === 'home') return data.home.annual
  if (type === 'renters') return data.renters.annual
  return data.life_term_500k_40yr_male.monthly * 12
}

const COLOR_STOPS = ['#D9EFE3', '#A3CEAF', '#5FA87B', '#2D7250', '#0F3D2E']

function buildQuantileBreaks(type: InsuranceType): number[] {
  const stateKeys = Object.keys(stateAverages.states) as StateKey[]
  const values = stateKeys.map(k => getAnnualValue(k, type)).sort((a, b) => a - b)
  const n = values.length
  return [
    values[Math.floor(n * 0.2)],
    values[Math.floor(n * 0.4)],
    values[Math.floor(n * 0.6)],
    values[Math.floor(n * 0.8)],
  ]
}

function getColor(value: number, breaks: number[]): string {
  if (value <= breaks[0]) return COLOR_STOPS[0]
  if (value <= breaks[1]) return COLOR_STOPS[1]
  if (value <= breaks[2]) return COLOR_STOPS[2]
  if (value <= breaks[3]) return COLOR_STOPS[3]
  return COLOR_STOPS[4]
}

interface HoveredState {
  name: string
  value: number
  x: number
  y: number
}

export default function USStateMap({ initialType = 'auto' }: Props) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeType, setActiveType] = useState<InsuranceType>(initialType)
  const [hovered, setHovered] = useState<HoveredState | null>(null)

  const breaks = buildQuantileBreaks(activeType)
  const stateKeys = Object.keys(stateAverages.states) as StateKey[]

  const valueMap = new Map<string, number>()
  stateKeys.forEach(k => {
    valueMap.set(k, getAnnualValue(k, activeType))
  })

  const nationalAvg =
    activeType === 'auto' ? stateAverages.national_averages.auto.annual
    : activeType === 'home' ? stateAverages.national_averages.home.annual
    : activeType === 'renters' ? stateAverages.national_averages.renters.annual
    : stateAverages.national_averages.life_term_500k_40yr_male.monthly * 12

  const allValues = stateKeys.map(k => getAnnualValue(k, activeType)).sort((a, b) => a - b)

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Insurance type">
        {(['auto', 'home', 'renters', 'life'] as InsuranceType[]).map(t => (
          <button
            key={t}
            role="tab"
            aria-selected={activeType === t}
            onClick={() => { setActiveType(t); setHovered(null) }}
            className={`px-4 py-2 rounded-xl font-sans text-sm font-semibold transition-all ${
              activeType === t
                ? 'bg-primary-accent text-white'
                : 'bg-white border border-neutral-200 text-neutral-700 hover:border-primary-accent'
            }`}
          >
            {TYPE_LABELS[t]}
          </button>
        ))}
        <span className="ml-auto font-sans text-sm text-neutral-500 self-center">
          National avg: <strong className="text-neutral-800">{fmt(nationalAvg)}/yr</strong>
        </span>
      </div>

      {/* Hover info bar */}
      <div className="h-10 mb-2 flex items-center">
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.div
              key={hovered.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-3"
            >
              <span className="font-sans font-semibold text-primary-dark">{hovered.name}</span>
              <span className="font-sans text-sm text-neutral-600">{fmt(hovered.value)}/year</span>
              <span className={`font-sans text-xs font-semibold px-2 py-0.5 rounded-full ${hovered.value > nationalAvg ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {hovered.value > nationalAvg ? '+' : ''}{(((hovered.value - nationalAvg) / nationalAvg) * 100).toFixed(1)}% vs national
              </span>
              <span className="font-sans text-xs text-neutral-400">Click to see details</span>
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-sans text-sm text-neutral-400"
            >
              Hover over a state to see its average rate
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Map */}
      <div ref={containerRef} className="relative w-full bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden" role="img" aria-label={`US map showing ${TYPE_LABELS[activeType].toLowerCase()} insurance costs by state. Click a state to see details.`}>
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1000 }}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => {
                const stateName = geo.properties.name as StateKey | undefined
                const value = stateName && valueMap.has(stateName) ? valueMap.get(stateName)! : 0
                const color = value ? getColor(value, breaks) : '#E5E7EB'
                const isHovered = hovered?.name === stateName

                const typeSlug =
                  activeType === 'auto' ? 'auto-insurance'
                  : activeType === 'home' ? 'home-insurance'
                  : activeType === 'renters' ? 'renters-insurance'
                  : 'life-insurance'

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isHovered ? '#3FAE76' : color}
                    stroke="#ffffff"
                    strokeWidth={0.75}
                    tabIndex={stateName ? 0 : -1}
                    aria-label={stateName && value ? `${stateName}: ${fmt(value)}/year ${TYPE_LABELS[activeType].toLowerCase()} insurance` : undefined}
                    role={stateName ? 'link' : undefined}
                    style={{
                      default: { outline: 'none', cursor: 'pointer' },
                      hover: { outline: 'none', cursor: 'pointer' },
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={() => {
                      if (stateName && value) {
                        setHovered({ name: stateName, value, x: 0, y: 0 })
                      }
                    }}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => {
                      if (stateName) {
                        router.push(`/${typeSlug}/${slugify(stateName)}`)
                      }
                    }}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if ((e.key === 'Enter' || e.key === ' ') && stateName) {
                        e.preventDefault()
                        router.push(`/${typeSlug}/${slugify(stateName)}`)
                      }
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-4">
        <span className="font-sans text-xs text-neutral-500">Cheapest</span>
        <div className="flex flex-1 h-2.5 rounded-full overflow-hidden max-w-[200px]">
          {COLOR_STOPS.map((c, i) => (
            <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="font-sans text-xs text-neutral-500">Most expensive</span>
        <span className="font-sans text-xs text-neutral-400 ml-4">
          Range: {fmt(allValues[0])} &ndash; {fmt(allValues[allValues.length - 1])}/yr
        </span>
      </div>
    </div>
  )
}
