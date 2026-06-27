'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import StateSelector from '@/components/calculators/StateSelector'
import { calculateHomeCoverage } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  state: z.string().min(1),
  squareFootage: z.coerce.number().min(500).max(20000),
  constructionType: z.enum(['frame', 'masonry', 'manufactured']),
  finishQuality: z.enum(['basic', 'standard', 'custom']),
  yearBuilt: z.coerce.number().min(1900).max(2026),
  personalPropertyValue: z.coerce.number().min(0),
  liabilityDesired: z.enum(['100000', '300000', '500000']),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}{hint && <p className="font-sans text-xs text-neutral-500">{hint}</p>}</div>
}

export default function HomeCoverageCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateHomeCoverage> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { constructionType: 'frame', finishQuality: 'standard', yearBuilt: 1995, personalPropertyValue: 50000, liabilityDesired: '300000' },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => { setResult(calculateHomeCoverage(v)); setIsCalculating(false) }, 300)
  })

  return (
    <>
      <CalculatorForm title="Home insurance coverage calculator" description="Calculate the right dwelling coverage amount based on your home's rebuild cost — not its market value." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Controller name="state" control={control} render={({ field }) => (
          <Field label="State"><StateSelector value={field.value ?? ''} onChange={field.onChange} /></Field>
        )} />
        <Field label="Home square footage"><Input type="number" min={500} max={20000} placeholder="e.g. 1800" className="h-11" {...register('squareFootage')} /></Field>
        <Controller name="constructionType" control={control} render={({ field }) => (
          <Field label="Construction type">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="frame">Wood frame</SelectItem>
                <SelectItem value="masonry">Masonry / brick</SelectItem>
                <SelectItem value="manufactured">Manufactured / modular</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="finishQuality" control={control} render={({ field }) => (
          <Field label="Interior finish quality">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic (builder grade)</SelectItem>
                <SelectItem value="standard">Standard (mid-range finishes)</SelectItem>
                <SelectItem value="custom">Custom / high-end</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Field label="Year built"><Input type="number" min={1900} max={2026} className="h-11" {...register('yearBuilt')} /></Field>
        <Field label="Personal property value" hint="Estimated replacement value of furniture, electronics, clothing, appliances, etc."><Input type="number" min={0} placeholder="e.g. 60000" className="h-11" {...register('personalPropertyValue')} /></Field>
        <Controller name="liabilityDesired" control={control} render={({ field }) => (
          <Field label="Desired liability coverage">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="100000">$100,000 (minimum)</SelectItem>
                <SelectItem value="300000">$300,000 (recommended)</SelectItem>
                <SelectItem value="500000">$500,000 (comprehensive)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          <p className="font-sans text-sm font-medium text-primary-dark/70">Recommended dwelling coverage</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.recommendedDwellingCoverage)}</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Rebuild cost per sqft</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">${result.costPerSqFt}/sqft</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Personal property coverage</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.personalPropertyCoverage)}</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="font-sans text-sm font-semibold text-amber-800">This is rebuild cost, not market value</p>
            <p className="font-sans text-sm text-amber-700 mt-1">Dwelling coverage should equal what it costs to rebuild your home — which may be higher or lower than what you could sell it for. Land value is never included.</p>
          </div>
          <p className="font-sans text-xs text-neutral-500">Rebuild costs vary significantly by location and contractor availability. Consider a formal appraisal for homes over $500,000.</p>
        </motion.div>
      )}
    </>
  )
}
