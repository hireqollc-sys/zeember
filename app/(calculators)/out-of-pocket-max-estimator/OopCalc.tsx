'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import { calculateOopMax, type OopResult } from '@/lib/calculators/health'

const schema = z.object({
  annualDeductible: z.coerce.number().min(0, 'Enter your deductible'),
  coinsurancePercent: z.coerce.number().min(0).max(50, 'Max coinsurance is 50%'),
  outOfPocketMax: z.coerce.number().min(0, 'Enter your out-of-pocket maximum'),
  monthlyPremium: z.coerce.number().min(0, 'Enter your monthly premium'),
  expectedAnnualMedicalBills: z.coerce.number().min(0, 'Enter expected medical costs'),
})

type FormValues = z.infer<typeof schema>

function FieldLabel({ children, error, htmlFor }: { children: React.ReactNode; error?: string; htmlFor?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      {children}
      {error && <p className="font-sans text-xs text-red-600" role="alert">{error}</p>}
    </div>
  )
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export default function OopCalc() {
  const [result, setResult] = useState<OopResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      annualDeductible: 2000,
      coinsurancePercent: 20,
      outOfPocketMax: 6500,
      monthlyPremium: 350,
      expectedAnnualMedicalBills: 4000,
    },
  })

  const onCalculate = handleSubmit((values) => {
    setIsCalculating(true)
    setTimeout(() => {
      setResult(calculateOopMax(values))
      setIsCalculating(false)
    }, 400)
  })

  const pctColor = (pct: number) =>
    pct >= 100 ? 'bg-red-500' : pct >= 75 ? 'bg-amber-500' : pct >= 40 ? 'bg-yellow-400' : 'bg-green-500'

  return (
    <>
      <CalculatorForm
        title="Out-of-pocket max estimator"
        description="Enter your plan details and expected medical costs to see your estimated total health spending."
        onCalculate={onCalculate}
        isCalculating={isCalculating}
      >
        <FieldLabel error={errors.monthlyPremium?.message}>
          <label htmlFor="monthlyPremium" className="font-sans text-sm font-medium text-neutral-700">Monthly premium ($)</label>
          <Input type="number" min={0} placeholder="e.g. 350" className="h-11" id="monthlyPremium" {...register('monthlyPremium')} />
        </FieldLabel>

        <FieldLabel error={errors.annualDeductible?.message}>
          <label htmlFor="annualDeductible" className="font-sans text-sm font-medium text-neutral-700">Annual deductible ($)</label>
          <Input type="number" min={0} placeholder="e.g. 2000" className="h-11" id="annualDeductible" {...register('annualDeductible')} />
        </FieldLabel>

        <FieldLabel error={errors.coinsurancePercent?.message}>
          <label htmlFor="coinsurancePercent" className="font-sans text-sm font-medium text-neutral-700">Your coinsurance after deductible (%)</label>
          <Input type="number" min={0} max={50} placeholder="e.g. 20" className="h-11" id="coinsurancePercent" {...register('coinsurancePercent')} />
        </FieldLabel>

        <FieldLabel error={errors.outOfPocketMax?.message}>
          <label htmlFor="outOfPocketMax" className="font-sans text-sm font-medium text-neutral-700">Out-of-pocket maximum ($)</label>
          <Input type="number" min={0} placeholder="e.g. 6500" className="h-11" id="outOfPocketMax" {...register('outOfPocketMax')} />
        </FieldLabel>

        <FieldLabel error={errors.expectedAnnualMedicalBills?.message}>
          <label htmlFor="expectedAnnualMedicalBills" className="font-sans text-sm font-medium text-neutral-700">Expected annual medical bills ($)</label>
          <Input type="number" min={0} placeholder="e.g. 4000" className="h-11" id="expectedAnnualMedicalBills" {...register('expectedAnnualMedicalBills')} />
        </FieldLabel>
      </CalculatorForm>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 flex flex-col gap-6"
        >
          <div>
            <p className="font-sans text-sm font-medium text-neutral-500 mb-1">Total estimated annual health cost</p>
            <motion.p
              className="font-serif text-[52px] font-bold text-primary-dark leading-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {fmt(result.totalAnnualCost)}
            </motion.p>
            <p className="font-sans text-sm text-neutral-500 mt-1">premiums + out-of-pocket costs</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-neutral-200">
              <p className="font-sans text-xs text-neutral-500 mb-1">Out-of-pocket costs</p>
              <p className="font-sans text-xl font-semibold text-primary-dark">{fmt(result.estimatedOopCosts)}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-neutral-200">
              <p className="font-sans text-xs text-neutral-500 mb-1">OOP max % reached</p>
              <p className="font-sans text-xl font-semibold text-primary-dark">{result.percentOfMaxReached}%</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-neutral-200">
            <div className="flex justify-between items-center mb-2">
              <p className="font-sans text-sm font-medium text-neutral-700">Progress toward out-of-pocket max</p>
              <p className="font-sans text-sm text-neutral-500">{result.percentOfMaxReached}%</p>
            </div>
            <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-3 rounded-full ${pctColor(result.percentOfMaxReached)}`}
                initial={{ width: 0 }}
                animate={{ width: `${result.percentOfMaxReached}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </div>

          {result.monthsToHitMax !== null && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-sans text-sm font-semibold text-amber-800">
                At this spending rate, you would hit your out-of-pocket maximum in month {result.monthsToHitMax}. After that, insurance covers 100% of covered costs for the rest of the year.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </>
  )
}
