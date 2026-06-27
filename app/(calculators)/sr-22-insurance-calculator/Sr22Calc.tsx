'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import StateSelector from '@/components/calculators/StateSelector'
import { calculateSr22 } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  state: z.string().min(1),
  violationType: z.enum(['dui', 'reckless', 'uninsured', 'license-suspension', 'multiple-violations']),
  currentPremium: z.coerce.number().min(0),
  yearsRequired: z.coerce.number().min(1).max(5),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}</div>
}

export default function Sr22Calc() {
  const [result, setResult] = useState<ReturnType<typeof calculateSr22> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { violationType: 'dui', yearsRequired: 3 },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => {
      setResult(calculateSr22({ state: v.state, violationType: v.violationType, currentPremium: v.currentPremium, yearsRequired: v.yearsRequired }))
      setIsCalculating(false)
    }, 300)
  })

  return (
    <>
      <CalculatorForm title="SR-22 insurance cost estimator" description="Estimate how much more you will pay for insurance with an SR-22 requirement." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Controller name="state" control={control} render={({ field }) => (
          <Field label="State"><StateSelector value={field.value ?? ''} onChange={field.onChange} /></Field>
        )} />
        <Controller name="violationType" control={control} render={({ field }) => (
          <Field label="Reason for SR-22 requirement">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dui">DUI / DWI</SelectItem>
                <SelectItem value="reckless">Reckless driving</SelectItem>
                <SelectItem value="uninsured">Driving without insurance</SelectItem>
                <SelectItem value="license-suspension">License suspension / revocation</SelectItem>
                <SelectItem value="multiple-violations">Multiple serious violations</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Field label="Current annual premium (before SR-22)"><Input type="number" min={0} placeholder="e.g. 1600" className="h-11" {...register('currentPremium')} /></Field>
        <Field label="SR-22 requirement period (years)"><Input type="number" min={1} max={5} className="h-11" {...register('yearsRequired')} /></Field>
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          <p className="font-sans text-sm font-medium text-primary-dark/70">Estimated new annual premium</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.newAnnualPremium)}<span className="font-sans text-lg font-normal text-neutral-500 ml-2">/year</span></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Annual increase</p>
              <p className="font-sans text-xl font-semibold text-red-600">+{fmt(result.annualIncrease)} (+{result.percentIncrease}%)</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Total extra cost over {result.yearsRequired} years</p>
              <p className="font-sans text-xl font-semibold text-red-600">{fmt(result.totalExtraCost)}</p>
            </div>
          </div>
          <div className="bg-white/60 rounded-xl p-4">
            <p className="font-sans text-sm text-neutral-600">SR-22 filing fee: <span className="font-semibold text-neutral-800">{fmt(result.filingFee)} one-time</span> (charged by your insurer to file with the state)</p>
          </div>
          <p className="font-sans text-xs text-neutral-500">SR-22 is a certificate, not insurance. The rate increase is the high-risk premium surcharge. Not all insurers file SR-22s — shop for a non-standard auto insurer if your current carrier drops you.</p>
        </motion.div>
      )}
    </>
  )
}
