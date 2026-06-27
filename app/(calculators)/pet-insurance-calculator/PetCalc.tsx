'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import StateSelector from '@/components/calculators/StateSelector'
import { calculatePetInsurance } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  petType: z.enum(['dog', 'cat', 'other']),
  breed: z.string().min(1),
  age: z.coerce.number().min(0).max(20),
  state: z.string().min(1),
  reimbursementPercent: z.enum(['70', '80', '90']),
  annualDeductible: z.enum(['100', '250', '500']),
  annualLimit: z.enum(['5000', '10000', 'unlimited']),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}</div>
}

export default function PetCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculatePetInsurance> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { petType: 'dog', breed: 'Labrador Retriever', age: 3, reimbursementPercent: '80', annualDeductible: '250', annualLimit: '10000' },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => {
      setResult(calculatePetInsurance({ petType: v.petType, breed: v.breed, age: v.age, state: v.state, reimbursementPercent: parseInt(v.reimbursementPercent) as 70 | 80 | 90, annualDeductible: parseInt(v.annualDeductible) as 100 | 250 | 500, annualLimit: v.annualLimit as '5000' | '10000' | 'unlimited' }))
      setIsCalculating(false)
    }, 300)
  })

  return (
    <>
      <CalculatorForm title="Pet insurance cost estimator" description="Estimate monthly pet insurance costs by species, breed, age, and coverage level." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Controller name="petType" control={control} render={({ field }) => (
          <Field label="Pet type">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Dog</SelectItem>
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Field label="Breed"><Input type="text" placeholder="e.g. Labrador Retriever" className="h-11" {...register('breed')} /></Field>
        <Field label="Pet age (years)"><Input type="number" min={0} max={20} className="h-11" {...register('age')} /></Field>
        <Controller name="state" control={control} render={({ field }) => (
          <Field label="State"><StateSelector value={field.value ?? ''} onChange={field.onChange} /></Field>
        )} />
        <Controller name="reimbursementPercent" control={control} render={({ field }) => (
          <Field label="Reimbursement rate">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="70">70% (lower premium)</SelectItem>
                <SelectItem value="80">80% (most popular)</SelectItem>
                <SelectItem value="90">90% (higher premium)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="annualDeductible" control={control} render={({ field }) => (
          <Field label="Annual deductible">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="100">$100/year</SelectItem>
                <SelectItem value="250">$250/year</SelectItem>
                <SelectItem value="500">$500/year</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="annualLimit" control={control} render={({ field }) => (
          <Field label="Annual benefit limit">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="5000">$5,000/year</SelectItem>
                <SelectItem value="10000">$10,000/year</SelectItem>
                <SelectItem value="unlimited">Unlimited</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          <p className="font-sans text-sm font-medium text-primary-dark/70">Estimated monthly premium</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.estimatedMonthlyPremium)}<span className="font-sans text-lg font-normal text-neutral-500 ml-2">/month</span></div>
          <p className="font-sans text-base text-neutral-600">{fmt(result.estimatedAnnualPremium)}/year</p>
          <div className="bg-white/60 rounded-xl p-4">
            <p className="font-sans text-sm text-neutral-600">Range: <span className="font-semibold text-neutral-800">{fmt(result.rangeLow)} – {fmt(result.rangeHigh)}/month</span> based on actual insurer quotes for similar pets</p>
          </div>
          <p className="font-sans text-xs text-neutral-500">Estimates based on national average pet insurance rates. Actual premiums vary by insurer and exact breed health profile.</p>
        </motion.div>
      )}
    </>
  )
}
