'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import { calculateUmbrella } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  netWorth: z.coerce.number().min(0),
  autoLiabilityLimit: z.enum(['50000', '100000', '300000', '500000']),
  homeLiabilityLimit: z.enum(['100000', '300000', '500000']),
  hasPool: z.enum(['yes', 'no']),
  hasTeenDrivers: z.enum(['yes', 'no']),
  ownsBusiness: z.enum(['yes', 'no']),
  hasRentalProperty: z.enum(['yes', 'no']),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}</div>
}

export default function UmbrellaCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateUmbrella> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { autoLiabilityLimit: '300000', homeLiabilityLimit: '300000', hasPool: 'no', hasTeenDrivers: 'no', ownsBusiness: 'no', hasRentalProperty: 'no' },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => {
      setResult(calculateUmbrella({ netWorth: v.netWorth, autoLiabilityLimit: parseInt(v.autoLiabilityLimit), homeLiabilityLimit: parseInt(v.homeLiabilityLimit), hasPool: v.hasPool === 'yes', hasTeenDrivers: v.hasTeenDrivers === 'yes', ownsBusiness: v.ownsBusiness === 'yes', hasRentalProperty: v.hasRentalProperty === 'yes' }))
      setIsCalculating(false)
    }, 300)
  })

  return (
    <>
      <CalculatorForm title="Umbrella insurance calculator" description="Find out how much umbrella coverage you need and what it will cost." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Field label="Total net worth (assets minus debts)"><Input type="number" min={0} placeholder="e.g. 350000" className="h-11" {...register('netWorth')} /></Field>
        <Controller name="autoLiabilityLimit" control={control} render={({ field }) => (
          <Field label="Current auto liability limit">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="50000">$50,000</SelectItem>
                <SelectItem value="100000">$100,000</SelectItem>
                <SelectItem value="300000">$300,000</SelectItem>
                <SelectItem value="500000">$500,000</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="homeLiabilityLimit" control={control} render={({ field }) => (
          <Field label="Current home liability limit">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="100000">$100,000</SelectItem>
                <SelectItem value="300000">$300,000</SelectItem>
                <SelectItem value="500000">$500,000</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="hasPool" control={control} render={({ field }) => (
          <Field label="Pool, trampoline, or large dog?">
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
        <Controller name="hasRentalProperty" control={control} render={({ field }) => (
          <Field label="Rental property owner?">
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
          <p className="font-sans text-sm font-medium text-primary-dark/70">Recommended umbrella coverage</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.recommendedCoverage)}</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Estimated annual cost</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.estimatedAnnualPremium)}/yr</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Estimated monthly</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.estimatedMonthlyPremium)}/mo</p>
            </div>
          </div>
          <div className="bg-white/60 rounded-xl p-4">
            <p className="font-sans text-sm font-semibold text-primary-dark mb-1">Liability gap</p>
            <p className="font-sans text-sm text-neutral-600">Your current coverage: {fmt(result.currentLiabilityCoverage)}. Your net worth at risk: {fmt(result.netWorthAtRisk)}. An umbrella policy closes this gap.</p>
          </div>
          <p className="font-sans text-xs text-neutral-500">$1M umbrella policies typically cost $150-$300/year. This estimate uses average national pricing.</p>
        </motion.div>
      )}
    </>
  )
}
