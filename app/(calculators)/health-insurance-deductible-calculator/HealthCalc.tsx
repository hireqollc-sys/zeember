'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import { calculateHealthDeductible } from '@/lib/calculators/health'
import { motion } from 'framer-motion'

const schema = z.object({
  annualDeductible: z.coerce.number().min(0),
  coinsurancePercent: z.coerce.number().min(0).max(50),
  outOfPocketMax: z.coerce.number().min(0),
  monthlyPremium: z.coerce.number().min(0),
  expectedMedicalCosts: z.enum(['minimal', 'low', 'moderate', 'high', 'very-high']),
  planType: z.enum(['hdhp', 'ppo', 'hmo', 'epo']),
})

type FormValues = z.infer<typeof schema>

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}</div>
}

export default function HealthCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateHealthDeductible> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { annualDeductible: 2000, coinsurancePercent: 20, outOfPocketMax: 6500, monthlyPremium: 450, expectedMedicalCosts: 'low', planType: 'ppo' },
  })

  const onCalculate = handleSubmit((values) => {
    setIsCalculating(true)
    setTimeout(() => { setResult(calculateHealthDeductible(values)); setIsCalculating(false) }, 300)
  })

  return (
    <>
      <CalculatorForm title="Health insurance true cost" description="See your total annual health care cost including premiums and out-of-pocket spending." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Field label="Annual deductible"><Input type="number" min={0} className="h-11" {...register('annualDeductible')} /></Field>
        <Field label="Coinsurance after deductible (%)"><Input type="number" min={0} max={50} placeholder="e.g. 20" className="h-11" {...register('coinsurancePercent')} /></Field>
        <Field label="Out-of-pocket maximum"><Input type="number" min={0} className="h-11" {...register('outOfPocketMax')} /></Field>
        <Field label="Monthly premium"><Input type="number" min={0} placeholder="e.g. 450" className="h-11" {...register('monthlyPremium')} /></Field>
        <Controller name="expectedMedicalCosts" control={control} render={({ field }) => (
          <Field label="Expected annual medical costs">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">Minimal — ~$500/yr (healthy, no issues)</SelectItem>
                <SelectItem value="low">Low — ~$1,500/yr (1–2 doctor visits)</SelectItem>
                <SelectItem value="moderate">Moderate — ~$4,000/yr (managing a condition)</SelectItem>
                <SelectItem value="high">High — ~$10,000/yr (surgery or hospitalization)</SelectItem>
                <SelectItem value="very-high">Very high — $25,000+/yr (serious chronic condition)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="planType" control={control} render={({ field }) => (
          <Field label="Plan type">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="hdhp">HDHP (High-Deductible Health Plan)</SelectItem>
                <SelectItem value="ppo">PPO</SelectItem>
                <SelectItem value="hmo">HMO</SelectItem>
                <SelectItem value="epo">EPO</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          <p className="font-sans text-sm font-medium text-primary-dark/70">Estimated total annual cost</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.estimatedAnnualCost)}</div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Annual premiums</p>
              <p className="font-sans text-lg font-semibold text-neutral-800">{fmt(result.premiumTotal)}</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Out-of-pocket costs</p>
              <p className="font-sans text-lg font-semibold text-neutral-800">{fmt(result.outOfPocketCosts)}</p>
            </div>
          </div>
          {result.recommendHdhp && (
            <div className="bg-primary/5 border border-primary-accent/20 rounded-xl p-4">
              <p className="font-sans text-sm font-semibold text-primary-dark mb-1">HDHP + HSA may be worth considering</p>
              <p className="font-sans text-sm text-neutral-600">Your expected costs are below your deductible. A high-deductible plan with an HSA could lower your total annual cost through premium savings and tax advantages.</p>
            </div>
          )}
          <p className="font-sans text-xs text-neutral-500">Estimate only. Actual costs depend on your specific medical utilization and plan terms.</p>
        </motion.div>
      )}
    </>
  )
}
