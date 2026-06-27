'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import { calculateLiabilityCoverage } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  totalAssets: z.coerce.number().min(0),
  annualIncome: z.coerce.number().min(0),
  hasPool: z.enum(['yes', 'no']),
  hasTeenDrivers: z.enum(['yes', 'no']),
  hasDog: z.enum(['yes', 'no']),
  ownsRentalProperty: z.enum(['yes', 'no']),
  profession: z.enum(['low-risk', 'moderate-risk', 'high-risk']),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}{hint && <p className="font-sans text-xs text-neutral-500">{hint}</p>}</div>
}

export default function LiabilityCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateLiabilityCoverage> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { hasPool: 'no', hasTeenDrivers: 'no', hasDog: 'no', ownsRentalProperty: 'no', profession: 'low-risk' },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => {
      setResult(calculateLiabilityCoverage({ totalAssets: v.totalAssets, annualIncome: v.annualIncome, hasPool: v.hasPool === 'yes', hasTeenDrivers: v.hasTeenDrivers === 'yes', hasDog: v.hasDog === 'yes', ownsRentalProperty: v.ownsRentalProperty === 'yes', profession: v.profession }))
      setIsCalculating(false)
    }, 300)
  })

  return (
    <>
      <CalculatorForm title="Personal liability coverage calculator" description="Calculate the right liability coverage limit based on your net worth and risk factors." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Field label="Total assets (home equity, savings, investments, other)" hint="This is what a judgment could target if you are found liable."><Input type="number" min={0} placeholder="e.g. 450000" className="h-11" {...register('totalAssets')} /></Field>
        <Field label="Annual income" hint="Future wages can also be subject to garnishment in some states."><Input type="number" min={0} placeholder="e.g. 85000" className="h-11" {...register('annualIncome')} /></Field>
        <Controller name="hasPool" control={control} render={({ field }) => (
          <Field label="Pool or trampoline on property?">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="hasTeenDrivers" control={control} render={({ field }) => (
          <Field label="Teen drivers in household?">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="hasDog" control={control} render={({ field }) => (
          <Field label="Dog in household?">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="ownsRentalProperty" control={control} render={({ field }) => (
          <Field label="Rental property owner?">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="profession" control={control} render={({ field }) => (
          <Field label="Profession liability level">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low-risk">Low risk (office worker, teacher, etc.)</SelectItem>
                <SelectItem value="moderate-risk">Moderate risk (contractor, driver, healthcare)</SelectItem>
                <SelectItem value="high-risk">High risk (attorney, physician, executive)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          <p className="font-sans text-sm font-medium text-primary-dark/70">Recommended liability coverage</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.recommendedLiabilityCoverage)}</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Assets at risk</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.assetsAtRisk)}</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Standard policy limit covers</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.standardPolicyCoverage)}</p>
            </div>
          </div>
          {result.needsUmbrella && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-sans text-sm font-semibold text-amber-800">Consider an umbrella policy</p>
              <p className="font-sans text-sm text-amber-700 mt-1">Your recommended coverage exceeds standard home/auto policy limits. An umbrella policy provides {fmt(1000000)}+ in additional liability coverage for ~$200/year.</p>
            </div>
          )}
          <p className="font-sans text-xs text-neutral-500">Liability coverage protects your assets from lawsuit judgments. Standard home policies include $100,000-$500,000; auto policies include $100,000-$500,000 per person.</p>
        </motion.div>
      )}
    </>
  )
}
