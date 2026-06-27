'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import StateSelector from '@/components/calculators/StateSelector'
import { calculateInsuranceScore } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  state: z.string().min(1),
  creditScore: z.enum(['excellent', 'good', 'fair', 'poor', 'no-credit']),
  paymentHistory: z.enum(['excellent', 'good', 'fair', 'poor']),
  claimsHistory: z.enum(['none', 'one', 'two-plus']),
  yearsInsured: z.enum(['under-1', '1-3', '3-10', 'over-10']),
  insuranceType: z.enum(['auto', 'home', 'renters']),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}{hint && <p className="font-sans text-xs text-neutral-500">{hint}</p>}</div>
}

export default function InsuranceScoreCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateInsuranceScore> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { creditScore: 'good', paymentHistory: 'excellent', claimsHistory: 'none', yearsInsured: '3-10', insuranceType: 'auto' },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => { setResult(calculateInsuranceScore(v)); setIsCalculating(false) }, 300)
  })

  return (
    <>
      <CalculatorForm title="Insurance score impact estimator" description="See how your credit score and financial history affect your insurance premiums." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Controller name="state" control={control} render={({ field }) => (
          <Field label="State" hint="California, Hawaii, and Massachusetts prohibit credit-based insurance scoring for auto."><StateSelector value={field.value ?? ''} onChange={field.onChange} /></Field>
        )} />
        <Controller name="insuranceType" control={control} render={({ field }) => (
          <Field label="Insurance type">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto insurance</SelectItem>
                <SelectItem value="home">Home insurance</SelectItem>
                <SelectItem value="renters">Renters insurance</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="creditScore" control={control} render={({ field }) => (
          <Field label="Credit score range">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent (750+)</SelectItem>
                <SelectItem value="good">Good (700-749)</SelectItem>
                <SelectItem value="fair">Fair (620-699)</SelectItem>
                <SelectItem value="poor">Poor (580-619)</SelectItem>
                <SelectItem value="no-credit">No credit history</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="paymentHistory" control={control} render={({ field }) => (
          <Field label="Payment history on bills and premiums">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent — always on time</SelectItem>
                <SelectItem value="good">Good — rarely late</SelectItem>
                <SelectItem value="fair">Fair — occasionally late</SelectItem>
                <SelectItem value="poor">Poor — frequent late payments or lapses</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="claimsHistory" control={control} render={({ field }) => (
          <Field label="Claims filed in last 3 years">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No claims</SelectItem>
                <SelectItem value="one">One claim</SelectItem>
                <SelectItem value="two-plus">Two or more claims</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="yearsInsured" control={control} render={({ field }) => (
          <Field label="Years continuously insured">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under-1">Less than 1 year (or coverage lapse)</SelectItem>
                <SelectItem value="1-3">1-3 years</SelectItem>
                <SelectItem value="3-10">3-10 years</SelectItem>
                <SelectItem value="over-10">Over 10 years</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          <p className="font-sans text-sm font-medium text-primary-dark/70">Estimated premium impact vs baseline</p>
          <div className={`font-serif text-[52px] font-bold leading-none ${result.premiumMultiplier > 1 ? 'text-red-700' : 'text-green-700'}`}>
            {result.premiumMultiplier > 1 ? '+' : ''}{Math.round((result.premiumMultiplier - 1) * 100)}%
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Score tier</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{result.scoreTier}</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Premium multiplier</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{result.premiumMultiplier}x baseline</p>
            </div>
          </div>
          {result.creditBanState && (
            <div className="bg-primary-light border border-primary-accent/20 rounded-xl p-4">
              <p className="font-sans text-sm font-semibold text-primary-dark">Credit scoring is prohibited in your state</p>
              <p className="font-sans text-sm text-neutral-600 mt-1">Your state bans the use of credit history in auto insurance pricing. Credit factors are excluded from this estimate.</p>
            </div>
          )}
          <div className="bg-white/60 rounded-xl p-4">
            <p className="font-sans text-sm font-semibold text-primary-dark mb-1">How to improve your insurance score</p>
            <ul className="font-sans text-sm text-neutral-600 space-y-1 mt-2">
              {result.improvementTips.map((tip, i) => <li key={i} className="flex gap-2"><span className="text-primary-accent">+</span>{tip}</li>)}
            </ul>
          </div>
        </motion.div>
      )}
    </>
  )
}
