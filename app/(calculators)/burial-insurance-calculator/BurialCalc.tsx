'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import StateSelector from '@/components/calculators/StateSelector'
import { calculateBurialInsurance } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  state: z.string().min(1),
  age: z.coerce.number().min(45).max(85),
  gender: z.enum(['male', 'female']),
  health: z.enum(['excellent', 'good', 'fair', 'poor']),
  coverageAmount: z.enum(['5000', '10000', '15000', '20000', '25000']),
  tobaccoUse: z.enum(['yes', 'no']),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}</div>
}

export default function BurialCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateBurialInsurance> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { age: 65, gender: 'male', health: 'good', coverageAmount: '10000', tobaccoUse: 'no' },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => {
      setResult(calculateBurialInsurance({ state: v.state, age: v.age, gender: v.gender, health: v.health, coverageAmount: parseInt(v.coverageAmount), tobaccoUse: v.tobaccoUse === 'yes' }))
      setIsCalculating(false)
    }, 300)
  })

  return (
    <>
      <CalculatorForm title="Burial insurance cost calculator" description="Estimate final expense (burial) insurance monthly premiums to cover end-of-life costs." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Controller name="state" control={control} render={({ field }) => (
          <Field label="State"><StateSelector value={field.value ?? ''} onChange={field.onChange} /></Field>
        )} />
        <Field label="Age"><Input type="number" min={45} max={85} className="h-11" {...register('age')} /></Field>
        <Controller name="gender" control={control} render={({ field }) => (
          <Field label="Gender">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="health" control={control} render={({ field }) => (
          <Field label="Current health">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good (minor conditions managed)</SelectItem>
                <SelectItem value="fair">Fair (ongoing conditions)</SelectItem>
                <SelectItem value="poor">Poor (serious conditions)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="coverageAmount" control={control} render={({ field }) => (
          <Field label="Coverage amount">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="5000">$5,000</SelectItem>
                <SelectItem value="10000">$10,000</SelectItem>
                <SelectItem value="15000">$15,000</SelectItem>
                <SelectItem value="20000">$20,000</SelectItem>
                <SelectItem value="25000">$25,000</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="tobaccoUse" control={control} render={({ field }) => (
          <Field label="Tobacco use?">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
            </Select>
          </Field>
        )} />
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          <p className="font-sans text-sm font-medium text-primary-dark/70">Estimated monthly premium</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.estimatedMonthlyPremium)}<span className="font-sans text-lg font-normal text-neutral-500 ml-2">/month</span></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Annual cost</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.estimatedAnnualPremium)}/yr</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Coverage amount</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.coverageAmount)}</p>
            </div>
          </div>
          <div className="bg-white/60 rounded-xl p-4">
            <p className="font-sans text-sm text-neutral-600">Average funeral cost: <span className="font-semibold text-neutral-800">$8,000-$12,000</span>. Coverage should account for funeral, burial, and any outstanding medical bills.</p>
          </div>
          <p className="font-sans text-xs text-neutral-500">Burial insurance requires no medical exam in most cases. Guaranteed issue policies are available for those with serious health conditions but have a 2-year waiting period before full coverage applies.</p>
        </motion.div>
      )}
    </>
  )
}
