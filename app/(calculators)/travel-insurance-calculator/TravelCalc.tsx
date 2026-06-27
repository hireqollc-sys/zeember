'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import { calculateTravelInsurance } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  tripCost: z.coerce.number().min(0),
  tripDurationDays: z.coerce.number().min(1).max(365),
  destination: z.enum(['domestic', 'canada-mexico', 'europe', 'asia-pacific', 'latin-america', 'africa-middle-east']),
  numberOfTravelers: z.coerce.number().min(1).max(10),
  primaryAge: z.coerce.number().min(1).max(99),
  coverageLevel: z.enum(['basic', 'standard', 'comprehensive']),
  cancelForAnyReason: z.enum(['yes', 'no']),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}</div>
}

export default function TravelCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateTravelInsurance> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { tripDurationDays: 10, destination: 'europe', numberOfTravelers: 2, primaryAge: 40, coverageLevel: 'standard', cancelForAnyReason: 'no' },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => { setResult(calculateTravelInsurance(v)); setIsCalculating(false) }, 300)
  })

  return (
    <>
      <CalculatorForm title="Travel insurance cost estimator" description="Estimate travel insurance cost based on trip cost, duration, destination, and coverage level." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Field label="Total trip cost (all travelers)"><Input type="number" min={0} placeholder="e.g. 4500" className="h-11" {...register('tripCost')} /></Field>
        <Field label="Trip duration (days)"><Input type="number" min={1} max={365} className="h-11" {...register('tripDurationDays')} /></Field>
        <Controller name="destination" control={control} render={({ field }) => (
          <Field label="Destination">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="domestic">Domestic (USA)</SelectItem>
                <SelectItem value="canada-mexico">Canada or Mexico</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia-pacific">Asia / Pacific</SelectItem>
                <SelectItem value="latin-america">Latin America / Caribbean</SelectItem>
                <SelectItem value="africa-middle-east">Africa / Middle East</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Field label="Number of travelers"><Input type="number" min={1} max={10} className="h-11" {...register('numberOfTravelers')} /></Field>
        <Field label="Primary traveler age"><Input type="number" min={1} max={99} className="h-11" {...register('primaryAge')} /></Field>
        <Controller name="coverageLevel" control={control} render={({ field }) => (
          <Field label="Coverage level">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic (trip cancellation + medical only)</SelectItem>
                <SelectItem value="standard">Standard (includes trip interruption, baggage)</SelectItem>
                <SelectItem value="comprehensive">Comprehensive (includes emergency evacuation)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="cancelForAnyReason" control={control} render={({ field }) => (
          <Field label="Add Cancel for Any Reason (CFAR) upgrade?">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No — standard cancellation only</SelectItem>
                <SelectItem value="yes">Yes — cancel for any reason (+40-60%)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          <p className="font-sans text-sm font-medium text-primary-dark/70">Estimated travel insurance cost</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.estimatedPremium)}</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">As % of trip cost</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{result.percentOfTripCost}%</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Per traveler</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.perTravelerCost)}</p>
            </div>
          </div>
          <p className="font-sans text-xs text-neutral-500">Travel insurance typically costs 4-8% of total trip cost. Comprehensive plans with CFAR can reach 10-12%. Compare quotes at InsureMyTrip or Squaremouth for actual rates.</p>
        </motion.div>
      )}
    </>
  )
}
