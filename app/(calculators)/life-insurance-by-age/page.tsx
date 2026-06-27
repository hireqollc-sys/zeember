'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Disclaimer from '@/components/Disclaimer'
import AdUnit from '@/components/AdUnit'
import FAQAccordion from '@/components/FAQAccordion'
import type { FAQItem } from '@/components/FAQAccordion'
import RelatedCalculators from '@/components/RelatedCalculators'
import type { RelatedCalc } from '@/components/RelatedCalculators'
import { Heart, DollarSign, Activity } from 'lucide-react'
import { Input } from '@/components/ui/input'

const RATES: Record<'male' | 'female', Record<number, number>> = {
  male: { 25: 22, 30: 25, 35: 32, 40: 48, 45: 75, 50: 125, 55: 205, 60: 350 },
  female: { 25: 18, 30: 21, 35: 27, 40: 40, 45: 62, 50: 100, 55: 170, 60: 290 },
}
const AGES = [25, 30, 35, 40, 45, 50, 55, 60]

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
const fmtDec = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

const faqItems: FAQItem[] = [
  { question: 'Why does life insurance get more expensive with age?', answer: 'Life insurance premiums are based on actuarial risk — the statistical probability of dying during the policy term. As you age, your remaining life expectancy decreases and the likelihood of dying during a 20-year term increases. Insurers price for that increased risk. A healthy 35-year-old has very low mortality risk over a 20-year term; a 55-year-old faces meaningfully higher risk over the same period.' },
  { question: 'At what age is life insurance too expensive to buy?', answer: 'There is no universal answer, but term life becomes very expensive past 60. A $500,000 20-year term policy for a healthy 60-year-old male costs roughly $350/month. At that point, you are likely insuring a need that has diminished — children are grown, mortgage may be paid off, retirement assets may have accumulated. The need for income replacement life insurance typically peaks between 30 and 50.' },
  { question: 'How does smoking affect life insurance rates?', answer: 'Tobacco use roughly doubles or triples life insurance premiums at most ages. A 35-year-old male nonsmoker might pay $32/month for a $500,000 20-year term policy; a 35-year-old male smoker might pay $90/month. Insurers classify you as a smoker if you have used tobacco within the last 12-24 months (depending on the insurer). Quitting for 12 months can significantly improve your rate classification.' },
  { question: 'Should I lock in a rate now or wait?', answer: 'For term life insurance, there is never a reason to wait. Every year you delay, you are a year older — and rates increase substantially by age. A 30-year-old gets a materially better rate than a 35-year-old for the same policy. Buy term life when you have dependents who would suffer financially from your death. Waiting always costs more.' },
  { question: 'How accurate are these rates?', answer: 'These rates represent typical rates for healthy nonsmokers at each age for a 20-year $500,000 term policy from major insurers. Actual rates vary by insurer (quotes can vary by 30-50%), your specific health profile, medical history, and exact policy terms. Get at least 2-3 quotes from different insurers to find your actual best rate.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Life Insurance Need Calculator', href: '/how-much-life-insurance-do-i-need', description: 'Calculate how much coverage you need with the DIME method.', icon: Heart },
  { title: 'Term vs Whole Life', href: '/term-vs-whole-life-insurance', description: 'Compare term and whole life side by side with a full cost analysis.', icon: Activity },
  { title: 'Burial Insurance', href: '/burial-insurance-calculator', description: 'Estimate final expense insurance for seniors.', icon: DollarSign },
]

function RatesTable({ coverage, userAge }: { coverage: number; userAge: number | null }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full font-sans text-sm">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="text-left py-3 px-4 text-neutral-600 font-medium">Age</th>
            <th className="text-right py-3 px-4 text-neutral-600 font-medium">Male nonsmoker/mo</th>
            <th className="text-right py-3 px-4 text-neutral-600 font-medium">Female nonsmoker/mo</th>
            <th className="text-right py-3 px-4 text-neutral-600 font-medium">Annual (male)</th>
          </tr>
        </thead>
        <tbody>
          {AGES.map(age => {
            const mRate = Math.round(RATES.male[age] * (coverage / 500000))
            const fRate = Math.round(RATES.female[age] * (coverage / 500000))
            const isUserAge = userAge !== null && Math.abs(userAge - age) <= 2
            return (
              <tr key={age} className={`border-b border-neutral-100 ${isUserAge ? 'bg-primary-light' : 'hover:bg-neutral-50'} transition-colors`}>
                <td className="py-3 px-4 font-medium text-neutral-800">{age}{isUserAge && <span className="ml-2 text-xs text-primary-accent font-semibold">← your age</span>}</td>
                <td className="py-3 px-4 text-right text-neutral-700">{fmtDec(mRate)}</td>
                <td className="py-3 px-4 text-right text-neutral-700">{fmtDec(fRate)}</td>
                <td className="py-3 px-4 text-right text-neutral-500">{fmt(mRate * 12)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function LifeInsuranceByAgePage() {
  const [coverage, setCoverage] = useState(500000)
  const [userAge, setUserAge] = useState<number | null>(null)

  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <nav className="font-sans text-sm text-neutral-500 mb-4">
            <a href="/" className="hover:text-primary-dark transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-neutral-700">Life insurance cost by age</span>
          </nav>
          <h1 className="font-serif text-[36px] md:text-[56px] font-bold text-primary-dark mb-4">Life insurance cost by age — 2026</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl">See exactly how much a 20-year term life insurance policy costs at every age from 25 to 60.</p>
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 py-4">
        <AdUnit slot="LEADERBOARD_1" format="leaderboard" />
      </div>
      <section className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-sm font-medium text-neutral-700">Coverage amount</label>
            <select className="h-11 px-3 rounded-lg border border-neutral-200 font-sans text-sm bg-white" value={coverage} onChange={e => setCoverage(parseInt(e.target.value))}>
              <option value="250000">$250,000</option>
              <option value="500000">$500,000</option>
              <option value="750000">$750,000</option>
              <option value="1000000">$1,000,000</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-sm font-medium text-neutral-700">Your age (to highlight your row)</label>
            <Input type="number" min={18} max={70} placeholder="e.g. 38" className="h-11 w-36" onChange={e => setUserAge(parseInt(e.target.value) || null)} />
          </div>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50">
            <p className="font-sans text-sm text-neutral-600">20-year term life insurance — {fmt(coverage)} coverage — healthy nonsmoker — approximate monthly rates</p>
          </div>
          <RatesTable coverage={coverage} userAge={userAge} />
        </div>
        <Disclaimer type="calculator" />
      </section>
      <section className="bg-neutral-50 py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-serif text-[28px] font-semibold text-primary-dark mb-4">Why rates increase so sharply with age</h2>
          <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-4">Life insurance mortality risk roughly doubles every 8-10 years after age 30. A 50-year-old has statistically higher mortality during a 20-year term than a 35-year-old by a factor of 4-5x. That actuarial reality drives the steep pricing curve. Locking in your rate at 30 or 35 instead of waiting until 45 saves tens of thousands of dollars over the life of the policy.</p>
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 py-10">
        <FAQAccordion items={faqItems} pageUrl="https://zeember.com/life-insurance-by-age" />
      </div>
      <section className="bg-neutral-50 py-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          <RelatedCalculators calculators={relatedCalcs} />
        </div>
      </section>
    </main>
  )
}
