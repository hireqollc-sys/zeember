'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import StateSelector from '@/components/calculators/StateSelector'
import { calculateFloodInsurance } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  state: z.string().min(1),
  floodZone: z.enum(['X', 'AE', 'A', 'VE', 'V']),
  buildingCoverage: z.coerce.number().min(0).max(500000),
  contentsCoverage: z.coerce.number().min(0).max(100000),
  buildingType: z.enum(['single-family', 'condo', 'commercial']),
  firstFloorElevation: z.enum(['below-bfe', 'at-bfe', 'above-bfe']),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}{hint && <p className="font-sans text-xs text-neutral-500">{hint}</p>}</div>
}

export default function FloodCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateFloodInsurance> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { floodZone: 'X', buildingCoverage: 250000, contentsCoverage: 50000, buildingType: 'single-family', firstFloorElevation: 'at-bfe' },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => { setResult(calculateFloodInsurance(v)); setIsCalculating(false) }, 300)
  })

  return (
    <>
      <CalculatorForm title="Flood insurance cost estimator" description="Estimate NFIP or private flood insurance costs based on your property and flood zone." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Controller name="state" control={control} render={({ field }) => (
          <Field label="State"><StateSelector value={field.value ?? ''} onChange={field.onChange} /></Field>
        )} />
        <Controller name="floodZone" control={control} render={({ field }) => (
          <Field label="FEMA flood zone" hint="Find your flood zone on the FEMA Flood Map Service Center at msc.fema.gov">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="X">Zone X — Minimal risk (outside 500-yr floodplain)</SelectItem>
                <SelectItem value="AE">Zone AE — High risk (1% annual chance / 100-yr floodplain)</SelectItem>
                <SelectItem value="A">Zone A — High risk (no base flood elevation data)</SelectItem>
                <SelectItem value="VE">Zone VE — Coastal high hazard with wave action</SelectItem>
                <SelectItem value="V">Zone V — Coastal high hazard</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="buildingType" control={control} render={({ field }) => (
          <Field label="Building type">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="single-family">Single-family home</SelectItem>
                <SelectItem value="condo">Condo unit</SelectItem>
                <SelectItem value="commercial">Commercial / rental</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Field label="Building coverage desired" hint="NFIP maximum: $250,000 for residential buildings"><Input type="number" min={0} max={500000} placeholder="e.g. 250000" className="h-11" {...register('buildingCoverage')} /></Field>
        <Field label="Contents coverage desired" hint="NFIP maximum: $100,000 for residential contents"><Input type="number" min={0} max={100000} placeholder="e.g. 50000" className="h-11" {...register('contentsCoverage')} /></Field>
        <Controller name="firstFloorElevation" control={control} render={({ field }) => (
          <Field label="First floor elevation vs. base flood elevation (BFE)">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="below-bfe">Below BFE (higher risk)</SelectItem>
                <SelectItem value="at-bfe">At BFE (standard)</SelectItem>
                <SelectItem value="above-bfe">Above BFE (lower risk)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          <p className="font-sans text-sm font-medium text-primary-dark/70">Estimated annual flood insurance premium</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.estimatedAnnualPremium)}<span className="font-sans text-lg font-normal text-neutral-500 ml-2">/year</span></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Building premium</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.buildingPremium)}/yr</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Contents premium</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.contentsPremium)}/yr</p>
            </div>
          </div>
          {result.floodZone !== 'X' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-sans text-sm font-semibold text-amber-800">High flood zone — insurance is likely required</p>
              <p className="font-sans text-sm text-amber-700 mt-1">If you have a federally-backed mortgage in a Special Flood Hazard Area (SFHA), flood insurance is legally required.</p>
            </div>
          )}
          <p className="font-sans text-xs text-neutral-500">NFIP rates are set nationally by FEMA. Private flood insurance may offer higher limits or lower rates — compare both. There is typically a 30-day waiting period before NFIP coverage takes effect.</p>
        </motion.div>
      )}
    </>
  )
}
