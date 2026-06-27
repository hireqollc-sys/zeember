'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'

const schema = z.object({
  age: z.coerce.number().min(18).max(70),
  gender: z.enum(['male', 'female']),
  coverageAmount: z.coerce.number().min(50000),
  termLength: z.enum(['10', '15', '20', '30']),
  smoker: z.enum(['yes', 'no']),
})
type FormValues = z.infer<typeof schema>

const TERM_RATES: Record<string, Record<number, number>> = {
  male_nonsmoker: { 25: 22, 30: 25, 35: 32, 40: 48, 45: 75, 50: 125, 55: 205, 60: 350 },
  female_nonsmoker: { 25: 18, 30: 21, 35: 27, 40: 40, 45: 62, 50: 100, 55: 170, 60: 290 },
  male_smoker: { 25: 55, 30: 68, 35: 90, 40: 140, 45: 220, 50: 380, 55: 620, 60: 980 },
  female_smoker: { 25: 45, 30: 55, 35: 75, 40: 115, 45: 180, 50: 305, 55: 490, 60: 760 },
}
const WHOLE_LIFE_MULTIPLIER = 8.5
const TERM_LENGTH_MULT: Record<string, number> = { '10': 0.75, '15': 0.88, '20': 1.0, '30': 1.35 }

function snapAge(age: number): number {
  const keys = [25, 30, 35, 40, 45, 50, 55, 60]
  return keys.reduce((prev, cur) => Math.abs(cur - age) < Math.abs(prev - age) ? cur : prev)
}

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

interface Result {
  termMonthly: number; termAnnual: number; termTotal: number; termLength: number
  wholeMonthly: number; wholeAnnual: number; wholeTotalOverTerm: number
  extraCostForWhole: number; cashValueAtTerm: number; breakEvenYears: number
  coverageAmount: number
}

export default function TermVsWholeCalc() {
  const [result, setResult] = useState<Result | null>(null)
  const { register, handleSubmit, control, formState: { isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { age: 35, gender: 'male', coverageAmount: 500000, termLength: '20', smoker: 'no' },
  })

  const onSubmit = handleSubmit((v) => {
    const rateKey = `${v.gender}_${v.smoker === 'yes' ? 'smoker' : 'nonsmoker'}`
    const ageKey = snapAge(v.age)
    const baseMonthlyPer500k = TERM_RATES[rateKey][ageKey]
    const scale = v.coverageAmount / 500000
    const termMonthly = Math.round(baseMonthlyPer500k * scale * TERM_LENGTH_MULT[v.termLength])
    const wholeMonthly = Math.round(termMonthly * WHOLE_LIFE_MULTIPLIER)
    const tl = parseInt(v.termLength)
    const termTotal = termMonthly * 12 * tl
    const wholeTotalOverTerm = wholeMonthly * 12 * tl
    const extraCostForWhole = wholeTotalOverTerm - termTotal
    const cashValueAtTerm = Math.round(wholeMonthly * 12 * tl * 0.35)
    const netExtraCost = extraCostForWhole - cashValueAtTerm
    const breakEvenYears = Math.round(netExtraCost / (wholeMonthly * 12 - termMonthly * 12) + tl)
    setResult({ termMonthly, termAnnual: termMonthly * 12, termTotal, termLength: tl, wholeMonthly, wholeAnnual: wholeMonthly * 12, wholeTotalOverTerm, extraCostForWhole, cashValueAtTerm, breakEvenYears, coverageAmount: v.coverageAmount })
  })

  function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}</div>
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm space-y-4">
        <h3 className="font-sans text-xl font-semibold text-neutral-800">Enter your details</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Age"><Input type="number" min={18} max={70} className="h-11" {...register('age')} /></Field>
            <Controller name="gender" control={control} render={({ field }) => (
              <Field label="Gender">
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                </Select>
              </Field>
            )} />
          </div>
          <Field label="Coverage amount"><Input type="number" min={50000} step={50000} placeholder="e.g. 500000" className="h-11" {...register('coverageAmount')} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Controller name="termLength" control={control} render={({ field }) => (
              <Field label="Term length">
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 years</SelectItem>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )} />
            <Controller name="smoker" control={control} render={({ field }) => (
              <Field label="Smoker?">
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
                </Select>
              </Field>
            )} />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full h-[52px] bg-primary-accent text-white rounded-xl font-semibold hover:bg-green-600 transition-all disabled:opacity-60">
            Compare policies
          </button>
        </form>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-light border border-primary-accent/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3"><CheckCircle className="h-5 w-5 text-primary-accent" /><p className="font-sans text-sm font-semibold text-primary-dark">Term Life ({result.termLength}-year)</p></div>
              <p className="font-serif text-3xl font-bold text-primary-dark">{fmt(result.termMonthly)}<span className="font-sans text-sm font-normal text-neutral-500">/mo</span></p>
              <p className="font-sans text-sm text-neutral-600 mt-2">{fmt(result.termAnnual)}/year</p>
              <p className="font-sans text-sm text-neutral-600">Total over {result.termLength} yrs: {fmt(result.termTotal)}</p>
              <p className="font-sans text-sm text-neutral-600 mt-2">Coverage ends at term</p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3"><XCircle className="h-5 w-5 text-neutral-400" /><p className="font-sans text-sm font-semibold text-neutral-800">Whole Life (permanent)</p></div>
              <p className="font-serif text-3xl font-bold text-neutral-800">{fmt(result.wholeMonthly)}<span className="font-sans text-sm font-normal text-neutral-500">/mo</span></p>
              <p className="font-sans text-sm text-neutral-600 mt-2">{fmt(result.wholeAnnual)}/year</p>
              <p className="font-sans text-sm text-neutral-600">Total over {result.termLength} yrs: {fmt(result.wholeTotalOverTerm)}</p>
              <p className="font-sans text-sm text-neutral-600 mt-2">Cash value after {result.termLength} yrs: ~{fmt(result.cashValueAtTerm)}</p>
            </div>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-3">
            <p className="font-sans text-sm font-semibold text-neutral-800">Side-by-side analysis</p>
            <div className="flex justify-between py-2 border-b border-neutral-100"><span className="font-sans text-sm text-neutral-600">Extra cost for whole life over {result.termLength} years</span><span className="font-sans text-sm font-semibold text-red-600">{fmt(result.extraCostForWhole)}</span></div>
            <div className="flex justify-between py-2 border-b border-neutral-100"><span className="font-sans text-sm text-neutral-600">Estimated cash value accumulated</span><span className="font-sans text-sm font-semibold text-neutral-800">{fmt(result.cashValueAtTerm)}</span></div>
            <div className="flex justify-between py-2"><span className="font-sans text-sm text-neutral-600">Net extra cost after cash value</span><span className="font-sans text-sm font-semibold text-red-600">{fmt(result.extraCostForWhole - result.cashValueAtTerm)}</span></div>
          </div>
          <div className="bg-primary/5 border border-primary-accent/20 rounded-xl p-4">
            <p className="font-sans text-sm font-semibold text-primary-dark">Recommendation for most people</p>
            <p className="font-sans text-sm text-neutral-700 mt-1">Term life insurance provides {fmt(result.coverageAmount)} in protection for {fmt(result.termMonthly)}/month. The extra {fmt(result.wholeMonthly - result.termMonthly)}/month spent on whole life would build more wealth invested in a low-cost index fund. Unless you have a specific need for permanent coverage (estate planning, business succession), term life is almost always the better financial choice.</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
