'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import { calculateHsa, type HsaResult } from '@/lib/calculators/health'

const schema = z.object({
  coverageType: z.enum(['self', 'family']),
  age: z.coerce.number().min(18, 'Minimum age is 18').max(75, 'Maximum age is 75'),
  taxBracket: z.coerce.number().min(10).max(37),
  stateIncomeTax: z.coerce.number().min(0, 'Enter 0 if your state has no income tax').max(15),
  monthsEligible: z.coerce.number().min(1, 'Minimum 1 month').max(12, 'Maximum 12 months'),
  currentContribution: z.coerce.number().min(0, 'Enter 0 if you have not contributed yet'),
})

type FormValues = z.infer<typeof schema>

function FieldLabel({ children, error }: { children: React.ReactNode; error?: string }) {
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

export default function HsaCalc() {
  const [result, setResult] = useState<HsaResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      coverageType: 'self',
      age: 35,
      taxBracket: 22,
      stateIncomeTax: 5,
      monthsEligible: 12,
      currentContribution: 0,
    },
  })

  const onCalculate = handleSubmit((values) => {
    setIsCalculating(true)
    setTimeout(() => {
      setResult(calculateHsa(values))
      setIsCalculating(false)
    }, 400)
  })

  return (
    <>
      <CalculatorForm
        title="Your HSA contribution calculator"
        description="Enter your plan details to see your 2026 contribution limit and estimated tax savings."
        onCalculate={onCalculate}
        isCalculating={isCalculating}
      >
        <Controller
          name="coverageType"
          control={control}
          render={({ field }) => (
            <FieldLabel error={errors.coverageType?.message}>
              <label htmlFor="hsa-coverageType" className="font-sans text-sm font-medium text-neutral-700">Coverage type</label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self">Self-only (individual)</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                </SelectContent>
              </Select>
            </FieldLabel>
          )}
        />

        <FieldLabel error={errors.age?.message}>
          <label htmlFor="hsa-age" className="font-sans text-sm font-medium text-neutral-700">Your age</label>
          <Input type="number" min={18} max={75} placeholder="e.g. 42" className="h-11" id="hsa-age" {...register('age')} />
        </FieldLabel>

        <Controller
          name="taxBracket"
          control={control}
          render={({ field }) => (
            <FieldLabel error={errors.taxBracket?.message}>
              <label htmlFor="hsa-taxBracket" className="font-sans text-sm font-medium text-neutral-700">Federal income tax bracket (%)</label>
              <Select value={String(field.value)} onValueChange={(v) => field.onChange(Number(v))}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="12">12%</SelectItem>
                  <SelectItem value="22">22%</SelectItem>
                  <SelectItem value="24">24%</SelectItem>
                  <SelectItem value="32">32%</SelectItem>
                  <SelectItem value="35">35%</SelectItem>
                  <SelectItem value="37">37%</SelectItem>
                </SelectContent>
              </Select>
            </FieldLabel>
          )}
        />

        <FieldLabel error={errors.stateIncomeTax?.message}>
          <label htmlFor="hsa-stateIncomeTax" className="font-sans text-sm font-medium text-neutral-700">State income tax rate (%)</label>
          <Input type="number" min={0} max={15} step={0.1} placeholder="e.g. 5.0" className="h-11" id="hsa-stateIncomeTax" {...register('stateIncomeTax')} />
        </FieldLabel>

        <Controller
          name="monthsEligible"
          control={control}
          render={({ field }) => (
            <FieldLabel error={errors.monthsEligible?.message}>
              <label htmlFor="hsa-monthsEligible" className="font-sans text-sm font-medium text-neutral-700">Months eligible for HSA in 2026</label>
              <Select value={String(field.value)} onValueChange={(v) => field.onChange(Number(v))}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <SelectItem key={m} value={String(m)}>{m} {m === 1 ? 'month' : 'months'}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldLabel>
          )}
        />

        <FieldLabel error={errors.currentContribution?.message}>
          <label className="font-sans text-sm font-medium text-neutral-700">Amount already contributed in 2026 ($)</label>
          <Input type="number" min={0} placeholder="e.g. 0" className="h-11" id="hsa-currentContribution" {...register('currentContribution')} />
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
            <p className="font-sans text-sm font-medium text-neutral-500 mb-1">2026 maximum contribution</p>
            <motion.p
              className="font-serif text-[52px] font-bold text-primary-dark leading-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {fmt(result.maxContribution)}
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-neutral-200">
              <p className="font-sans text-xs text-neutral-500 mb-1">Still available to contribute</p>
              <p className="font-sans text-xl font-semibold text-primary-dark">{fmt(result.additionalContributionAvailable)}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-neutral-200">
              <p className="font-sans text-xs text-neutral-500 mb-1">Estimated tax savings</p>
              <p className="font-sans text-xl font-semibold text-green-600">{fmt(result.estimatedTaxSavings)}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-neutral-200">
            <p className="font-sans text-sm font-medium text-neutral-700 mb-1">Effective cost after tax savings</p>
            <p className="font-sans text-2xl font-bold text-primary-dark">{fmt(result.effectiveCostOfMaxContribution)}</p>
            <p className="font-sans text-xs text-neutral-500 mt-1">
              Contributing the maximum costs you {fmt(result.effectiveCostOfMaxContribution)} after accounting for tax savings — the rest comes back to you via lower taxes.
            </p>
          </div>

          <p className="font-sans text-xs text-neutral-500">
            2026 IRS limits: $4,300 (self-only), $8,550 (family), +$1,000 catch-up if age 55+. Tax savings are estimated and will vary based on your actual tax situation.
          </p>
        </motion.div>
      )}
    </>
  )
}
