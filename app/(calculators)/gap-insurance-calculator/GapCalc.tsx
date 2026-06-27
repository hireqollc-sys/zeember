'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import { calculateGap } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  vehicleValue: z.coerce.number().min(0),
  loanBalance: z.coerce.number().min(0),
  loanTermMonths: z.coerce.number().min(12).max(84),
  annualInterestRate: z.coerce.number().min(0).max(30),
  vehicleAge: z.coerce.number().min(0).max(10),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}{hint && <p className="font-sans text-xs text-neutral-500">{hint}</p>}</div>
}

export default function GapCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateGap> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { loanTermMonths: 60, annualInterestRate: 6.5, vehicleAge: 0 },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => { setResult(calculateGap(v)); setIsCalculating(false) }, 300)
  })

  return (
    <>
      <CalculatorForm title="Gap insurance calculator" description="Find out if you have a coverage gap between what your car is worth and what you owe." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Field label="Current vehicle market value" hint="Check Kelley Blue Book or Edmunds for your vehicle's current value."><Input type="number" min={0} placeholder="e.g. 22000" className="h-11" {...register('vehicleValue')} /></Field>
        <Field label="Current loan balance"><Input type="number" min={0} placeholder="e.g. 27000" className="h-11" {...register('loanBalance')} /></Field>
        <Field label="Remaining loan term (months)"><Input type="number" min={12} max={84} className="h-11" {...register('loanTermMonths')} /></Field>
        <Field label="Annual interest rate (%)"><Input type="number" min={0} max={30} step={0.1} placeholder="e.g. 6.5" className="h-11" {...register('annualInterestRate')} /></Field>
        <Field label="Vehicle age (years)"><Input type="number" min={0} max={10} className="h-11" {...register('vehicleAge')} /></Field>
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          <p className="font-sans text-sm font-medium text-primary-dark/70">Your coverage gap</p>
          <div className={`font-serif text-[52px] font-bold leading-none ${result.gapAmount > 0 ? 'text-primary-dark' : 'text-green-700'}`}>{result.gapAmount > 0 ? fmt(result.gapAmount) : 'No gap'}</div>
          {result.gapAmount > 0 ? (
            <>
              <p className="font-sans text-base text-neutral-600">If your car is totaled today, you would owe {fmt(result.gapAmount)} after your auto insurance pays out.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-xl p-4">
                  <p className="font-sans text-xs text-neutral-500 mb-1">Vehicle value</p>
                  <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.vehicleValue)}</p>
                </div>
                <div className="bg-white/60 rounded-xl p-4">
                  <p className="font-sans text-xs text-neutral-500 mb-1">Loan balance</p>
                  <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.loanBalance)}</p>
                </div>
              </div>
              {result.recommendGap && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="font-sans text-sm font-semibold text-amber-800">Gap insurance is recommended</p>
                  <p className="font-sans text-sm text-amber-700 mt-1">Gap insurance from a lender costs $200-$700 as a one-time add-on to your loan. From your auto insurer, it is typically $20-$40/year added to your policy — far cheaper.</p>
                </div>
              )}
            </>
          ) : (
            <p className="font-sans text-base text-neutral-600">Your vehicle is worth more than your loan balance. You do not need gap insurance at this time.</p>
          )}
          <p className="font-sans text-xs text-neutral-500">Vehicle value from Kelley Blue Book or Edmunds will give the most accurate gap calculation.</p>
        </motion.div>
      )}
    </>
  )
}
