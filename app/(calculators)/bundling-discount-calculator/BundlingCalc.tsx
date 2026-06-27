'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import StateSelector from '@/components/calculators/StateSelector'
import { calculateBundling } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  state: z.string().min(1),
  annualAutoPremium: z.coerce.number().min(0),
  annualHomePremium: z.coerce.number().min(0),
  insurer: z.enum(['state-farm', 'allstate', 'progressive', 'nationwide', 'farmers', 'liberty-mutual', 'other']),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}</div>
}

export default function BundlingCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateBundling> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { insurer: 'state-farm' },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => { setResult(calculateBundling(v)); setIsCalculating(false) }, 300)
  })

  return (
    <>
      <CalculatorForm title="Bundling discount calculator" description="See how much you save by bundling home and auto insurance with the same insurer." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Controller name="state" control={control} render={({ field }) => (
          <Field label="State"><StateSelector value={field.value ?? ''} onChange={field.onChange} /></Field>
        )} />
        <Field label="Current annual auto insurance premium"><Input type="number" min={0} placeholder="e.g. 1800" className="h-11" {...register('annualAutoPremium')} /></Field>
        <Field label="Current annual home insurance premium"><Input type="number" min={0} placeholder="e.g. 1400" className="h-11" {...register('annualHomePremium')} /></Field>
        <Controller name="insurer" control={control} render={({ field }) => (
          <Field label="Insurer you would bundle with">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="state-farm">State Farm (avg. 17% bundling discount)</SelectItem>
                <SelectItem value="allstate">Allstate (avg. 15% bundling discount)</SelectItem>
                <SelectItem value="progressive">Progressive (avg. 12% bundling discount)</SelectItem>
                <SelectItem value="nationwide">Nationwide (avg. 20% bundling discount)</SelectItem>
                <SelectItem value="farmers">Farmers (avg. 20% bundling discount)</SelectItem>
                <SelectItem value="liberty-mutual">Liberty Mutual (avg. 12% bundling discount)</SelectItem>
                <SelectItem value="other">Other / unknown (avg. 15% estimate)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          <p className="font-sans text-sm font-medium text-primary-dark/70">Estimated annual savings from bundling</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.estimatedAnnualSavings)}<span className="font-sans text-lg font-normal text-neutral-500 ml-2">/year</span></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Bundled auto premium</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.bundledAutoPremium)}/yr</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Bundled home premium</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.bundledHomePremium)}/yr</p>
            </div>
          </div>
          <div className="bg-white/60 rounded-xl p-4">
            <p className="font-sans text-sm text-neutral-600">Discount applied: <span className="font-semibold text-primary-dark">{result.discountPercent}%</span> — 5-year savings estimate: <span className="font-semibold text-primary-dark">{fmt(result.estimatedAnnualSavings * 5)}</span></p>
          </div>
          <p className="font-sans text-xs text-neutral-500">Bundling discounts vary by insurer, state, and individual risk profile. Get quotes from 2-3 insurers to find the best bundled rate.</p>
        </motion.div>
      )}
    </>
  )
}
