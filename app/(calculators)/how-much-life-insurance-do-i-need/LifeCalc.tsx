'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import { calculateLifeInsuranceNeeds, type LifeInsuranceResult } from '@/lib/calculators/life'
import { motion } from 'framer-motion'

const schema = z.object({
  totalDebt: z.coerce.number().min(0),
  annualIncome: z.coerce.number().min(0),
  yearsToReplace: z.coerce.number().min(1).max(40),
  mortgageBalance: z.coerce.number().min(0),
  numberOfChildren: z.coerce.number().min(0).max(15),
  educationCostPerChild: z.coerce.number().min(0),
  existingCoverage: z.coerce.number().min(0),
  age: z.coerce.number().min(18).max(80),
  gender: z.enum(['male', 'female']),
  smoker: z.enum(['yes', 'no']),
})

type FormValues = z.infer<typeof schema>

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-sm font-medium text-neutral-700">{label}</span>
      {children}
      {error && <p className="font-sans text-xs text-red-600" role="alert">{error}</p>}
    </label>
  )
}

function DimeBar({ label, value, total }: { label: string; value: number; total: number }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-sans text-sm text-neutral-600">{label}</span>
        <span className="font-sans text-sm font-semibold text-primary-dark">{fmt(value)}</span>
      </div>
      <div className="h-2 bg-primary-light rounded-full overflow-hidden">
        <div className="h-full bg-primary-accent rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function LifeCalc() {
  const [result, setResult] = useState<LifeInsuranceResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { yearsToReplace: 15, educationCostPerChild: 100000, gender: 'male', smoker: 'no' },
  })

  const onCalculate = handleSubmit((values) => {
    setIsCalculating(true)
    setTimeout(() => {
      setResult(calculateLifeInsuranceNeeds({ ...values, smoker: values.smoker === 'yes' }))
      setIsCalculating(false)
    }, 400)
  })

  return (
    <>
      <CalculatorForm
        title="Life insurance needs (DIME method)"
        description="Enter your financial details to calculate your coverage gap using the Debt, Income, Mortgage, Education formula."
        onCalculate={onCalculate}
        isCalculating={isCalculating}
      >
        <Field label="Total outstanding debt (not mortgage)" error={errors.totalDebt?.message}>
          <Input type="number" min={0} placeholder="e.g. 25000" className="h-11" {...register('totalDebt')} />
        </Field>
        <Field label="Annual income" error={errors.annualIncome?.message}>
          <Input type="number" min={0} placeholder="e.g. 75000" className="h-11" {...register('annualIncome')} />
        </Field>
        <Field label="Years of income to replace" error={errors.yearsToReplace?.message}>
          <Input type="number" min={1} max={40} placeholder="e.g. 15" className="h-11" {...register('yearsToReplace')} />
        </Field>
        <Field label="Remaining mortgage balance" error={errors.mortgageBalance?.message}>
          <Input type="number" min={0} placeholder="e.g. 220000" className="h-11" {...register('mortgageBalance')} />
        </Field>
        <Field label="Number of children" error={errors.numberOfChildren?.message}>
          <Input type="number" min={0} max={15} placeholder="e.g. 2" className="h-11" {...register('numberOfChildren')} />
        </Field>
        <Field label="Education cost per child" error={errors.educationCostPerChild?.message}>
          <Input type="number" min={0} placeholder="e.g. 100000" className="h-11" {...register('educationCostPerChild')} />
        </Field>
        <Field label="Existing life insurance coverage" error={errors.existingCoverage?.message}>
          <Input type="number" min={0} placeholder="e.g. 130000" className="h-11" {...register('existingCoverage')} />
        </Field>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Your age" error={errors.age?.message}>
            <Input type="number" min={18} max={80} placeholder="e.g. 35" className="h-11" {...register('age')} />
          </Field>
          <Controller name="gender" control={control} render={({ field }) => (
            <Field label="Gender" error={errors.gender?.message}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )} />
          <Controller name="smoker" control={control} render={({ field }) => (
            <Field label="Smoker?" error={errors.smoker?.message}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )} />
        </div>
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8">
          <p className="font-sans text-sm font-medium text-primary-dark/70 mb-1">Coverage gap (DIME method)</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">
            {fmt(result.coverageGap)}
          </div>
          <p className="font-sans text-base text-neutral-600 mt-1">
            Total need: {fmt(result.totalNeed)} · Existing coverage deducted
          </p>

          {result.estimatedMonthlyPremium > 0 && (
            <div className="mt-4 bg-white/60 rounded-xl px-4 py-3 inline-block">
              <p className="font-sans text-sm text-neutral-600">
                Estimated 20-year term premium:{' '}
                <span className="font-semibold text-primary-dark">
                  {fmt(result.estimatedMonthlyPremium)}/month
                </span>
              </p>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <DimeBar label="D — Debt" value={result.dimeBreakdown.debt} total={result.totalNeed} />
            <DimeBar label="I — Income replacement" value={result.dimeBreakdown.incomeReplacement} total={result.totalNeed} />
            <DimeBar label="M — Mortgage" value={result.dimeBreakdown.mortgage} total={result.totalNeed} />
            <DimeBar label="E — Education" value={result.dimeBreakdown.education} total={result.totalNeed} />
          </div>
          <p className="font-sans text-xs text-neutral-500 mt-4">Estimate based on DIME method. Actual premiums vary by insurer and underwriting.</p>
        </motion.div>
      )}
    </>
  )
}
