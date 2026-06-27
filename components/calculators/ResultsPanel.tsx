'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import CostBreakdownChart, { type BreakdownItem } from './CostBreakdownChart'

interface ResultsPanelProps {
  annualEstimate: number
  monthlyEstimate: number
  rangeLow: number
  rangeHigh: number
  stateAverage?: number
  stateName?: string
  nationalAverage?: number
  label: string
  breakdownData: BreakdownItem[]
}

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    startRef.current = null
    setValue(0)

    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration])

  return value
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function ResultsPanel({
  annualEstimate,
  monthlyEstimate,
  rangeLow,
  rangeHigh,
  stateAverage,
  stateName,
  nationalAverage,
  label,
  breakdownData,
}: ResultsPanelProps) {
  const animatedAnnual = useCountUp(annualEstimate)

  const stateDiff =
    stateAverage != null
      ? Math.round(((annualEstimate - stateAverage) / stateAverage) * 100)
      : null

  const nationalDiff =
    nationalAverage != null
      ? Math.round(((annualEstimate - nationalAverage) / nationalAverage) * 100)
      : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8"
      aria-live="polite"
      aria-label="Insurance estimate results"
    >
      {/* Main result */}
      <p className="font-sans text-sm font-medium text-primary-dark/70 mb-1">{label}</p>
      <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">
        {fmt(animatedAnnual)}
        <span className="font-sans text-lg font-normal text-neutral-500 ml-2">/year</span>
      </div>
      <p className="font-sans text-lg text-primary-dark/80 mt-2">
        {fmt(monthlyEstimate)}/month
      </p>

      {/* Range */}
      <div className="mt-4 inline-flex items-center gap-2 bg-white/60 rounded-xl px-4 py-2">
        <span className="font-sans text-sm text-neutral-600">Estimated range:</span>
        <span className="font-sans text-sm font-semibold text-primary-dark">
          {fmt(rangeLow)} – {fmt(rangeHigh)}/year
        </span>
      </div>

      {/* State comparison */}
      {stateAverage != null && stateName && stateDiff !== null && (
        <div className="mt-4 flex flex-col gap-1">
          <div className="flex items-center justify-between text-sm">
            <span className="font-sans text-neutral-600">{stateName} average</span>
            <span className="font-sans font-medium text-neutral-800">{fmt(stateAverage)}/yr</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`font-sans text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                stateDiff <= 0
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {stateDiff > 0 ? `+${stateDiff}%` : `${stateDiff}%`} vs state avg
            </span>
            {nationalDiff !== null && (
              <span
                className={`font-sans text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  nationalDiff <= 0
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {nationalDiff > 0 ? `+${nationalDiff}%` : `${nationalDiff}%`} vs national avg
              </span>
            )}
          </div>
        </div>
      )}

      {/* Breakdown chart */}
      {breakdownData.length > 0 && <CostBreakdownChart data={breakdownData} />}

      <p className="font-sans text-xs text-neutral-500 mt-4 leading-relaxed">
        Estimate based on state averages and risk multipliers. Actual rates vary by insurer.
      </p>
    </motion.div>
  )
}
