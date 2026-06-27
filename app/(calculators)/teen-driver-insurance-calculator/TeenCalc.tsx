'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import StateSelector from '@/components/calculators/StateSelector'
import { calculateTeenDriver } from '@/lib/calculators/misc'
import { motion } from 'framer-motion'

const schema = z.object({
  state: z.string().min(1),
  teenAge: z.coerce.number().min(16).max(19),
  teenGender: z.enum(['male', 'female']),
  currentAnnualPremium: z.coerce.number().min(0),
  vehicleType: z.enum(['sedan', 'suv', 'truck', 'sports-car']),
  goodStudentDiscount: z.enum(['yes', 'no']),
  driversEdCompleted: z.enum(['yes', 'no']),
})
type FormValues = z.infer<typeof schema>

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><span className="font-sans text-sm font-medium text-neutral-700">{label}</span>{children}</div>
}

export default function TeenCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateTeenDriver> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { teenAge: 16, teenGender: 'male', vehicleType: 'sedan', goodStudentDiscount: 'no', driversEdCompleted: 'no' },
  })
  const onCalculate = handleSubmit((v) => {
    setIsCalculating(true)
    setTimeout(() => {
      setResult(calculateTeenDriver({ state: v.state, teenAge: v.teenAge, teenGender: v.teenGender, currentAnnualPremium: v.currentAnnualPremium, vehicleType: v.vehicleType, goodStudentDiscount: v.goodStudentDiscount === 'yes', driversEdCompleted: v.driversEdCompleted === 'yes' }))
      setIsCalculating(false)
    }, 300)
  })

  return (
    <>
      <CalculatorForm title="Teen driver insurance calculator" description="Estimate how much adding a teen driver will increase your auto insurance premium." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Controller name="state" control={control} render={({ field }) => (
          <Field label="State"><StateSelector value={field.value ?? ''} onChange={field.onChange} /></Field>
        )} />
        <Field label="Teen age"><Input type="number" min={16} max={19} className="h-11" {...register('teenAge')} /></Field>
        <Controller name="teenGender" control={control} render={({ field }) => (
          <Field label="Teen gender">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Field label="Current annual premium (before adding teen)"><Input type="number" min={0} placeholder="e.g. 1800" className="h-11" {...register('currentAnnualPremium')} /></Field>
        <Controller name="vehicleType" control={control} render={({ field }) => (
          <Field label="Vehicle teen will drive">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="sports-car">Sports car</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="goodStudentDiscount" control={control} render={({ field }) => (
          <Field label="Teen qualifies for good student discount? (3.0+ GPA)">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="driversEdCompleted" control={control} render={({ field }) => (
          <Field label="Teen completed approved drivers education?">
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
          <p className="font-sans text-sm font-medium text-primary-dark/70">New estimated annual premium</p>
          <div className="font-serif text-[52px] font-bold text-primary-dark leading-none">{fmt(result.newAnnualPremium)}<span className="font-sans text-lg font-normal text-neutral-500 ml-2">/year</span></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Increase per year</p>
              <p className="font-sans text-xl font-semibold text-red-600">+{fmt(result.annualIncrease)}</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500 mb-1">Increase percentage</p>
              <p className="font-sans text-xl font-semibold text-red-600">+{result.percentIncrease}%</p>
            </div>
          </div>
          {result.discountsSaved > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="font-sans text-sm font-semibold text-green-800">Discounts applied: saving {fmt(result.discountsSaved)}/year</p>
            </div>
          )}
          <p className="font-sans text-xs text-neutral-500">Teen driver rates are 2-3x adult rates due to accident risk. Adding to your existing policy is almost always cheaper than a separate teen policy.</p>
        </motion.div>
      )}
    </>
  )
}
