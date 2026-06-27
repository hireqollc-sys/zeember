'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import Disclaimer from '@/components/Disclaimer'
import AdUnit from '@/components/AdUnit'
import FAQAccordion from '@/components/FAQAccordion'
import type { FAQItem } from '@/components/FAQAccordion'
import RelatedCalculators from '@/components/RelatedCalculators'
import type { RelatedCalc } from '@/components/RelatedCalculators'
import { Car, Home, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

const schema = z.object({
  state: z.string().min(1),
  autoAge: z.coerce.number().min(16).max(99),
  autoCoverage: z.enum(['minimum', 'standard', 'full-coverage']),
  autoRecord: z.enum(['clean', 'one-minor', 'one-accident']),
  homeValue: z.coerce.number().min(0),
  homeCoverage: z.enum(['basic', 'standard', 'premium']),
  annualIncome: z.coerce.number().min(0),
  yearsToReplace: z.coerce.number().min(1).max(40),
})
type FormValues = z.infer<typeof schema>

import stateAverages from '@/lib/data/state-averages.json'

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><label className="font-sans text-sm font-medium text-neutral-700">{label}</label>{children}</div>
}
function stateSelect(state: string) { return (<select className="h-11 w-full px-3 rounded-lg border border-neutral-200 font-sans text-sm bg-white" value={state} onChange={() => {}} disabled><option value="">{state || 'Select state'}</option></select>) }

const faqItems: FAQItem[] = [
  { question: 'What does a comprehensive insurance package cost?', answer: 'A comprehensive personal insurance package — auto, home, and term life — costs most households $3,000-$8,000 per year. Auto insurance averages $1,780/year nationally; homeowners insurance averages $1,428/year; and term life insurance for a healthy 35-year-old can be as little as $300-$600/year. Bundling home and auto with the same insurer typically saves 10-20%.' },
  { question: 'Am I over-insured or under-insured?', answer: 'Over-insurance typically means carrying full coverage on a low-value vehicle or excessive coverage limits for your asset level. Under-insurance means carrying minimum liability when you have significant assets at risk, inadequate dwelling coverage on your home, or no life insurance with dependents. This comparison tool helps you see your full insurance picture at once.' },
  { question: 'How often should I review my insurance portfolio?', answer: 'Review your insurance coverage annually, at each policy renewal, and after major life events: buying a home, having children, purchasing a new vehicle, getting married or divorced, receiving a large inheritance, or significant income change. Insurance needs change substantially over your lifetime — what was right at 25 is almost certainly wrong at 45.' },
  { question: 'What is the right order of priority for insurance?', answer: 'Priority order: 1) Health insurance (medical bankruptcy risk), 2) Auto liability (legally required and high-frequency risk), 3) Homeowners or renters insurance (asset protection), 4) Term life insurance if you have dependents, 5) Disability insurance (income protection), 6) Umbrella insurance (excess liability). Exotic coverage comes last.' },
  { question: 'Should I use one insurer for everything?', answer: 'Bundling home and auto usually saves money, so one insurer for those two makes sense for most people. Life insurance is typically separate. Health insurance is usually employer-sponsored or marketplace-based. Specialty coverage (flood, umbrella, disability) can be placed where you get the best terms. One insurer for everything is not always optimal — compare bundled vs. separate at each renewal.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator', description: 'Get a detailed auto insurance estimate with a full cost breakdown.', icon: Car },
  { title: 'Home Insurance Calculator', href: '/home-insurance-calculator', description: 'Estimate homeowners insurance for your property.', icon: Home },
  { title: 'Life Insurance Calculator', href: '/how-much-life-insurance-do-i-need', description: 'Calculate exactly how much life insurance your family needs.', icon: Heart },
]

const stateNames = Object.keys(stateAverages.states)

export default function InsuranceCostComparisonPage() {
  const [results, setResults] = useState<{ autoEst: number; homeEst: number; lifeEst: number; total: number } | null>(null)
  const { register, handleSubmit, control, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { autoAge: 35, autoCoverage: 'standard', autoRecord: 'clean', homeValue: 300000, homeCoverage: 'standard', annualIncome: 75000, yearsToReplace: 15 },
  })
  const selectedState = watch('state')

  const onSubmit = handleSubmit((v) => {
    const stateKey = Object.keys(stateAverages.states).find(k => k === v.state) as keyof typeof stateAverages.states | undefined
    const stateData = stateKey ? stateAverages.states[stateKey] : null
    const autoBase = stateData ? stateData.auto.annual : stateAverages.national_averages.auto.annual
    const coverageMult = v.autoCoverage === 'minimum' ? 0.55 : v.autoCoverage === 'full-coverage' ? 1.40 : 1.0
    const ageMult = v.autoAge < 25 ? 1.6 : v.autoAge > 69 ? 1.25 : 1.0
    const recordMult = v.autoRecord === 'clean' ? 1.0 : v.autoRecord === 'one-minor' ? 1.22 : 1.48
    const autoEst = Math.round(autoBase * coverageMult * ageMult * recordMult)
    const homeBase = stateData ? stateData.home.annual : stateAverages.national_averages.home.annual
    const homeValFactor = v.homeValue / 300000
    const homeCovMult = v.homeCoverage === 'basic' ? 0.7 : v.homeCoverage === 'premium' ? 1.3 : 1.0
    const homeEst = Math.round(homeBase * homeValFactor * homeCovMult)
    const lifeEst = Math.round((v.annualIncome * v.yearsToReplace) / 500000 * 32)
    const total = autoEst + homeEst + lifeEst * 12
    setResults({ autoEst, homeEst, lifeEst, total })
  })

  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[56px] font-bold text-primary-dark mb-4">Insurance cost comparison tool</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl">See your complete insurance picture — auto, home, and life — in one place.</p>
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 py-4"><AdUnit slot="LEADERBOARD_1" format="leaderboard" /></div>
      <section className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm space-y-4">
            <h3 className="font-sans text-xl font-semibold text-neutral-800">Your details</h3>
            <form onSubmit={onSubmit} className="space-y-4">
              <Field label="State">
                <Controller name="state" control={control} render={({ field }) => (
                  <select className="h-11 w-full px-3 rounded-lg border border-neutral-200 font-sans text-sm bg-white" value={field.value ?? ''} onChange={field.onChange}>
                    <option value="">Select state</option>
                    {stateNames.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                )} />
              </Field>
              <p className="font-sans text-sm font-semibold text-neutral-500 pt-2">Auto insurance</p>
              <Field label="Driver age"><Input type="number" min={16} max={99} className="h-11" {...register('autoAge')} /></Field>
              <Controller name="autoCoverage" control={control} render={({ field }) => (
                <Field label="Coverage level">
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimum">Minimum liability</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="full-coverage">Full coverage</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )} />
              <p className="font-sans text-sm font-semibold text-neutral-500 pt-2">Home insurance</p>
              <Field label="Home value"><Input type="number" min={0} placeholder="e.g. 350000" className="h-11" {...register('homeValue')} /></Field>
              <p className="font-sans text-sm font-semibold text-neutral-500 pt-2">Life insurance</p>
              <Field label="Annual income"><Input type="number" min={0} placeholder="e.g. 75000" className="h-11" {...register('annualIncome')} /></Field>
              <Field label="Years of income to replace"><Input type="number" min={1} max={40} className="h-11" {...register('yearsToReplace')} /></Field>
              <button type="submit" className="w-full h-[52px] bg-primary-accent text-white rounded-xl font-semibold hover:bg-green-600 transition-all">Compare costs</button>
            </form>
          </div>

          {results ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-4">
              <div className="bg-primary-light border border-primary-accent/20 rounded-2xl p-6">
                <p className="font-sans text-sm font-medium text-primary-dark/70 mb-2">Estimated total annual insurance spend</p>
                <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(results.total)}</div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Auto insurance', amount: results.autoEst, href: '/auto-insurance-calculator', period: 'year' },
                  { label: 'Home insurance', amount: results.homeEst, href: '/home-insurance-calculator', period: 'year' },
                  { label: 'Life insurance premium', amount: results.lifeEst, href: '/how-much-life-insurance-do-i-need', period: 'month' },
                ].map(item => (
                  <div key={item.label} className="bg-white border border-neutral-200 rounded-xl p-4 flex justify-between items-center">
                    <a href={item.href} className="font-sans text-sm font-medium text-primary-dark hover:text-primary-accent transition-colors">{item.label}</a>
                    <span className="font-sans text-lg font-semibold text-neutral-800">{fmt(item.amount)}/{item.period}</span>
                  </div>
                ))}
              </div>
              <Disclaimer type="calculator" />
            </motion.div>
          ) : (
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 flex items-center justify-center">
              <p className="font-sans text-neutral-500 text-center">Fill in your details and click Compare costs to see your full insurance picture.</p>
            </div>
          )}
        </div>
      </section>
      <section className="bg-neutral-50 py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <FAQAccordion items={faqItems} pageUrl="https://zeember.com/insurance-cost-comparison" />
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
