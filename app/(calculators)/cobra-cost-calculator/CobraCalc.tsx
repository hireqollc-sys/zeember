'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import StateSelector from '@/components/calculators/StateSelector'
import { calculateCobra } from '@/lib/calculators/health'
import { motion } from 'framer-motion'

const schema = z.object({
  employeeMonthlyContribution: z.coerce.number().min(0),
  employerMonthlyContribution: z.coerce.number().min(0),
  coverageType: z.enum(['employee-only', 'employee-spouse', 'family']),
  state: z.string().min(1),
  annualIncome: z.coerce.number().min(0),
  age: z.coerce.number().min(18),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}</div>
}

export default function CobraCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateCobra> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { coverageType: 'employee-only', annualIncome: 60000, age: 35 },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => { setResult(calculateCobra(v)); setIsCalculating(false) }, 300)
  })

  return (
    <>
      <CalculatorForm title="COBRA cost calculator" description="See what you will pay for COBRA continuation coverage and compare it to ACA marketplace alternatives." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Field label="Your monthly premium contribution (while employed)"><Input type="number" min={0} placeholder="e.g. 180" className="h-11" {...register('employeeMonthlyContribution')} /></Field>
        <Field label="Employer monthly contribution"><Input type="number" min={0} placeholder="e.g. 620" className="h-11" {...register('employerMonthlyContribution')} /></Field>
        <Controller name="coverageType" control={control} render={({ field }) => (
          <Field label="Coverage type">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="employee-only">Employee only</SelectItem>
                <SelectItem value="employee-spouse">Employee + spouse</SelectItem>
                <SelectItem value="family">Family</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="state" control={control} render={({ field }) => (
          <Field label="State"><StateSelector value={field.value ?? ''} onChange={field.onChange} /></Field>
        )} />
        <Field label="Annual household income (for ACA comparison)"><Input type="number" min={0} placeholder="e.g. 60000" className="h-11" {...register('annualIncome')} /></Field>
        <Field label="Your age"><Input type="number" min={18} placeholder="e.g. 38" className="h-11" {...register('age')} /></Field>
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          <p className="font-sans text-sm font-medium text-primary-dark/70">COBRA monthly premium</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.cobraMonthlyPremium)}<span className="font-sans text-lg font-normal text-neutral-500 ml-2">/month</span></div>
          <p className="font-sans text-base text-neutral-600">{fmt(result.cobraAnnualPremium)}/year</p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Est. ACA marketplace cost</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.estimatedAcaMonthly)}/mo</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Monthly savings with ACA</p>
              <p className={`font-sans text-xl font-semibold ${result.savingsWithAca > 0 ? 'text-green-700' : 'text-neutral-800'}`}>{result.savingsWithAca > 0 ? fmt(result.savingsWithAca) : 'COBRA cheaper'}</p>
            </div>
          </div>
          {result.recommendAca && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="font-sans text-sm font-semibold text-green-800">ACA marketplace may be significantly cheaper</p>
              <p className="font-sans text-sm text-green-700 mt-1">You have 60 days from losing coverage to enroll via a Special Enrollment Period on healthcare.gov.</p>
            </div>
          )}
          <p className="font-sans text-xs text-neutral-500">COBRA = (employee + employer contributions) x 1.02. ACA estimate is approximate — get a real quote at healthcare.gov.</p>
        </motion.div>
      )}
    </>
  )
}
