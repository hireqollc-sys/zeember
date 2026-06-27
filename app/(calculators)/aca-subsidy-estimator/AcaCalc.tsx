'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import StateSelector from '@/components/calculators/StateSelector'
import { calculateAcaSubsidy } from '@/lib/calculators/health'
import { motion } from 'framer-motion'

const schema = z.object({
  state: z.string().min(1),
  householdSize: z.coerce.number().min(1).max(10),
  annualHouseholdIncome: z.coerce.number().min(0),
  primaryAge: z.coerce.number().min(18).max(64),
  tobaccoUse: z.enum(['yes', 'no']),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}</div>
}

export default function AcaCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateAcaSubsidy> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { householdSize: 1, annualHouseholdIncome: 45000, primaryAge: 35, tobaccoUse: 'no' },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => {
      setResult(calculateAcaSubsidy({ state: v.state, householdSize: v.householdSize, annualHouseholdIncome: v.annualHouseholdIncome, ages: [v.primaryAge], tobaccoUse: v.tobaccoUse === 'yes' }))
      setIsCalculating(false)
    }, 300)
  })

  return (
    <>
      <CalculatorForm title="2026 ACA subsidy estimator" description="Estimate your marketplace premium tax credit based on your income and household." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Controller name="state" control={control} render={({ field }) => (
          <Field label="State"><StateSelector value={field.value ?? ''} onChange={field.onChange} /></Field>
        )} />
        <Field label="Household size (including yourself)"><Input type="number" min={1} max={10} className="h-11" {...register('householdSize')} /></Field>
        <Field label="Annual household income"><Input type="number" min={0} placeholder="e.g. 45000" className="h-11" {...register('annualHouseholdIncome')} /></Field>
        <Field label="Primary applicant age"><Input type="number" min={18} max={64} className="h-11" {...register('primaryAge')} /></Field>
        <Controller name="tobaccoUse" control={control} render={({ field }) => (
          <Field label="Tobacco use in last 6 months?">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          {result.eligibleForSubsidy ? (
            <>
              <p className="font-sans text-sm font-medium text-primary-dark/70">Estimated monthly subsidy</p>
              <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.estimatedSubsidyMonthly)}<span className="font-sans text-lg font-normal text-neutral-500 ml-2">/month</span></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-xl p-4">
                  <p className="font-sans text-xs text-neutral-500 mb-1">Benchmark plan cost</p>
                  <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.estimatedBenchmarkPremium)}/mo</p>
                </div>
                <div className="bg-white/60 rounded-xl p-4">
                  <p className="font-sans text-xs text-neutral-500 mb-1">Your cost after subsidy</p>
                  <p className="font-sans text-xl font-semibold text-green-700">{fmt(result.estimatedPremiumAfterSubsidy)}/mo</p>
                </div>
              </div>
              <div className="bg-white/60 rounded-xl p-4">
                <p className="font-sans text-sm text-neutral-600">Income is <strong className="text-primary-dark">{result.fplPercent}% of the federal poverty level</strong></p>
              </div>
            </>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-sans text-sm font-semibold text-amber-800">Income is below 100% FPL</p>
              <p className="font-sans text-sm text-amber-700 mt-1">You may qualify for Medicaid. Check your state Medicaid program for eligibility.</p>
            </div>
          )}
          <p className="font-sans text-xs text-neutral-500">This is an estimate only. Get your exact subsidy at healthcare.gov during Open Enrollment.</p>
        </motion.div>
      )}
    </>
  )
}
