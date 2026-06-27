'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import { calculateDisability } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  annualIncome: z.coerce.number().min(0),
  monthlyExpenses: z.coerce.number().min(0),
  existingCoverage: z.coerce.number().min(0),
  age: z.coerce.number().min(18).max(64),
  occupation: z.enum(['professional', 'clerical', 'manual-light', 'manual-heavy']),
  eliminationPeriod: z.enum(['30', '60', '90', '180']),
  benefitPeriod: z.enum(['2-years', '5-years', 'to-age-65']),
  gender: z.enum(['male', 'female']),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}{hint && <p className="font-sans text-xs text-neutral-500">{hint}</p>}</div>
}

export default function DisabilityCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateDisability> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { existingCoverage: 0, age: 35, occupation: 'professional', eliminationPeriod: '90', benefitPeriod: 'to-age-65', gender: 'male' },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => { setResult(calculateDisability(v)); setIsCalculating(false) }, 300)
  })

  return (
    <>
      <CalculatorForm title="Disability insurance calculator" description="Calculate how much disability insurance income replacement you need to protect your lifestyle." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Field label="Annual income (before tax)"><Input type="number" min={0} placeholder="e.g. 90000" className="h-11" {...register('annualIncome')} /></Field>
        <Field label="Monthly essential expenses" hint="Rent/mortgage, food, utilities, minimum debt payments"><Input type="number" min={0} placeholder="e.g. 4000" className="h-11" {...register('monthlyExpenses')} /></Field>
        <Field label="Existing disability coverage per month" hint="Employer group LTD, SSDI estimate, or 0 if none"><Input type="number" min={0} placeholder="e.g. 0" className="h-11" {...register('existingCoverage')} /></Field>
        <Field label="Age"><Input type="number" min={18} max={64} className="h-11" {...register('age')} /></Field>
        <Controller name="gender" control={control} render={({ field }) => (
          <Field label="Gender">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="occupation" control={control} render={({ field }) => (
          <Field label="Occupation class">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional (attorney, CPA, executive)</SelectItem>
                <SelectItem value="clerical">Clerical / office worker</SelectItem>
                <SelectItem value="manual-light">Light manual labor (retail, service)</SelectItem>
                <SelectItem value="manual-heavy">Heavy manual labor (construction, manufacturing)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="eliminationPeriod" control={control} render={({ field }) => (
          <Field label="Elimination period (waiting period before benefits start)">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days (highest premium)</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days (most common)</SelectItem>
                <SelectItem value="180">180 days (lowest premium)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="benefitPeriod" control={control} render={({ field }) => (
          <Field label="Benefit period">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2-years">2 years</SelectItem>
                <SelectItem value="5-years">5 years</SelectItem>
                <SelectItem value="to-age-65">To age 65 (recommended)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          <p className="font-sans text-sm font-medium text-primary-dark/70">Recommended monthly benefit</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.recommendedMonthlyBenefit)}<span className="font-sans text-lg font-normal text-neutral-500 ml-2">/month</span></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Estimated monthly premium</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.estimatedMonthlyPremium)}/mo</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Coverage gap vs expenses</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.coverageGapVsExpenses)}/mo</p>
            </div>
          </div>
          <p className="font-sans text-xs text-neutral-500">Disability insurers cap benefits at 60-70% of pre-disability income. Premiums vary significantly by insurer, health, and exact policy terms — get at least 2-3 quotes.</p>
        </motion.div>
      )}
    </>
  )
}
