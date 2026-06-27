'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import { calculatePersonalProperty } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  electronics: z.coerce.number().min(0),
  furniture: z.coerce.number().min(0),
  clothing: z.coerce.number().min(0),
  jewelry: z.coerce.number().min(0),
  appliances: z.coerce.number().min(0),
  sportsGear: z.coerce.number().min(0),
  toolsHobby: z.coerce.number().min(0),
  other: z.coerce.number().min(0),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}{hint && <p className="font-sans text-xs text-neutral-500">{hint}</p>}</div>
}

export default function PersonalPropertyCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculatePersonalProperty> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { electronics: 3500, furniture: 5000, clothing: 3000, jewelry: 1000, appliances: 2000, sportsGear: 500, toolsHobby: 500, other: 1000 },
  })
  const values = watch()
  const runningTotal = Object.values(values).reduce((sum, v) => sum + (Number(v) || 0), 0)

  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => { setResult(calculatePersonalProperty(v)); setIsCalculating(false) }, 300)
  })

  return (
    <>
      <CalculatorForm title="Personal property value calculator" description="Estimate the replacement value of your belongings to set the right coverage amount." onCalculate={onCalculate} isCalculating={isCalculating}>
        <div className="bg-primary-light/50 rounded-xl p-3 text-center">
          <p className="font-sans text-xs text-neutral-500">Running total</p>
          <p className="font-serif text-2xl font-bold text-primary-dark">{fmt(runningTotal)}</p>
        </div>
        <Field label="Electronics" hint="Laptops, TVs, phones, gaming systems, cameras"><Input type="number" min={0} className="h-11" {...register('electronics')} /></Field>
        <Field label="Furniture" hint="Sofas, beds, tables, chairs, dressers"><Input type="number" min={0} className="h-11" {...register('furniture')} /></Field>
        <Field label="Clothing" hint="Clothes, shoes, coats, accessories"><Input type="number" min={0} className="h-11" {...register('clothing')} /></Field>
        <Field label="Jewelry and watches" hint="List separately — high-value jewelry may need a rider"><Input type="number" min={0} className="h-11" {...register('jewelry')} /></Field>
        <Field label="Appliances and kitchen items" hint="Refrigerator, washer/dryer, cookware, small appliances"><Input type="number" min={0} className="h-11" {...register('appliances')} /></Field>
        <Field label="Sports and outdoor equipment" hint="Bikes, golf clubs, skis, fitness equipment"><Input type="number" min={0} className="h-11" {...register('sportsGear')} /></Field>
        <Field label="Tools and hobby equipment" hint="Power tools, musical instruments, art supplies"><Input type="number" min={0} className="h-11" {...register('toolsHobby')} /></Field>
        <Field label="Other"><Input type="number" min={0} className="h-11" {...register('other')} /></Field>
      </CalculatorForm>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="bg-primary-light border border-primary-accent/20 rounded-2xl p-8 space-y-4">
          <p className="font-sans text-sm font-medium text-primary-dark/70">Total replacement value</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.totalValue)}</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Recommended coverage</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.recommendedCoverage)}</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Estimated annual premium add</p>
              <p className="font-sans text-xl font-semibold text-neutral-800">{fmt(result.estimatedAnnualCostAdd)}/yr</p>
            </div>
          </div>
          {result.highValueItems && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-sans text-sm font-semibold text-amber-800">Consider scheduled riders for high-value items</p>
              <p className="font-sans text-sm text-amber-700 mt-1">Jewelry and high-value electronics often have sub-limits (e.g., $1,500 for jewelry) in standard renters/home policies. A personal articles floater covers full replacement value.</p>
            </div>
          )}
          <p className="font-sans text-xs text-neutral-500">Use these figures when purchasing renters or homeowners insurance to ensure you carry adequate personal property coverage.</p>
        </motion.div>
      )}
    </>
  )
}
