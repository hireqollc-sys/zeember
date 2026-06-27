'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import StateSelector from '@/components/calculators/StateSelector'
import { calculateFullVsLiability } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  state: z.string().min(1),
  vehicleValue: z.coerce.number().min(0),
  deductible: z.enum(['250', '500', '1000', '2500']),
  fullCoveragePremium: z.coerce.number().min(0),
  liabilityOnlyPremium: z.coerce.number().min(0),
  isFinanced: z.enum(['yes', 'no']),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}</div>
}

export default function FullVsLiabilityCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateFullVsLiability> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { deductible: '500', isFinanced: 'no' },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => {
      setResult(calculateFullVsLiability({ state: v.state, vehicleValue: v.vehicleValue, deductible: parseInt(v.deductible), fullCoveragePremium: v.fullCoveragePremium, liabilityOnlyPremium: v.liabilityOnlyPremium, isFinanced: v.isFinanced === 'yes' }))
      setIsCalculating(false)
    }, 300)
  })

  return (
    <>
      <CalculatorForm title="Full coverage vs liability calculator" description="Find out if full coverage is worth it for your vehicle based on its current value." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Controller name="state" control={control} render={({ field }) => (
          <Field label="State"><StateSelector value={field.value ?? ''} onChange={field.onChange} /></Field>
        )} />
        <Field label="Current vehicle value"><Input type="number" min={0} placeholder="e.g. 14000" className="h-11" {...register('vehicleValue')} /></Field>
        <Controller name="deductible" control={control} render={({ field }) => (
          <Field label="Collision/comprehensive deductible">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="250">$250</SelectItem>
                <SelectItem value="500">$500</SelectItem>
                <SelectItem value="1000">$1,000</SelectItem>
                <SelectItem value="2500">$2,500</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Field label="Full coverage annual premium"><Input type="number" min={0} placeholder="e.g. 2100" className="h-11" {...register('fullCoveragePremium')} /></Field>
        <Field label="Liability-only annual premium"><Input type="number" min={0} placeholder="e.g. 800" className="h-11" {...register('liabilityOnlyPremium')} /></Field>
        <Controller name="isFinanced" control={control} render={({ field }) => (
          <Field label="Is this vehicle financed or leased?">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No — I own it outright</SelectItem>
                <SelectItem value="yes">Yes — financed or leased</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          {result.isFinancedRequired ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-sans text-sm font-semibold text-amber-800">Full coverage is required</p>
              <p className="font-sans text-sm text-amber-700 mt-1">Lenders and lessors require full coverage on financed or leased vehicles. You cannot drop to liability-only until you own the vehicle outright.</p>
            </div>
          ) : (
            <>
              <p className="font-sans text-sm font-medium text-primary-dark/70">Recommendation</p>
              <div className={`font-serif text-3xl font-bold leading-none ${result.recommendFullCoverage ? 'text-primary-dark' : 'text-amber-800'}`}>
                {result.recommendFullCoverage ? 'Keep full coverage' : 'Consider dropping to liability'}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-white/60 rounded-xl p-4">
                  <p className="font-sans text-xs text-neutral-500 mb-1">Extra annual cost for full coverage</p>
                  <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.annualPremiumDifference)}/yr</p>
                </div>
                <div className="bg-white/60 rounded-xl p-4">
                  <p className="font-sans text-xs text-neutral-500 mb-1">Max benefit (vehicle value minus deductible)</p>
                  <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.maxBenefit)}</p>
                </div>
              </div>
              <div className="bg-white/60 rounded-xl p-4">
                <p className="font-sans text-sm font-semibold text-primary-dark mb-1">Break-even: {result.breakEvenYears.toFixed(1)} years</p>
                <p className="font-sans text-sm text-neutral-600">{result.breakEvenYears > 3 ? 'The vehicle depreciates faster than the insurance pays back. Dropping to liability may make sense.' : 'Full coverage still provides meaningful protection relative to its cost.'}</p>
              </div>
            </>
          )}
          <p className="font-sans text-xs text-neutral-500">Rule of thumb: drop full coverage when (vehicle value - deductible) is less than 10x the extra annual premium.</p>
        </motion.div>
      )}
    </>
  )
}
