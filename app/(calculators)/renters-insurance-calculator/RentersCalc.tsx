'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import ResultsPanel from '@/components/calculators/ResultsPanel'
import StateSelector from '@/components/calculators/StateSelector'
import { calculateRentersInsurance, type RentersInsuranceResult } from '@/lib/calculators/renters'

const schema = z.object({
  state: z.string().min(1),
  electronics: z.coerce.number().min(0).default(2500),
  furniture: z.coerce.number().min(0).default(3000),
  clothing: z.coerce.number().min(0).default(2000),
  jewelry: z.coerce.number().min(0).default(500),
  appliances: z.coerce.number().min(0).default(1500),
  other: z.coerce.number().min(0).default(1000),
  liabilityLimit: z.enum(['100000', '300000', '500000']),
  deductible: z.enum(['250', '500', '1000']),
  coverageType: z.enum(['acv', 'rcv']),
  buildingType: z.enum(['apartment', 'house', 'condo', 'townhouse']),
  hasRoommatesOnPolicy: z.enum(['yes', 'no']),
})

type FormValues = z.infer<typeof schema>

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-sm font-medium text-neutral-700">{label}</span>
      {children}
    </label>
  )
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function RentersCalc() {
  const [result, setResult] = useState<RentersInsuranceResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { electronics: 2500, furniture: 3000, clothing: 2000, jewelry: 500, appliances: 1500, other: 1000, liabilityLimit: '100000', deductible: '500', coverageType: 'rcv', buildingType: 'apartment', hasRoommatesOnPolicy: 'no' },
  })

  const onCalculate = handleSubmit((values) => {
    setIsCalculating(true)
    setTimeout(() => {
      setResult(calculateRentersInsurance({
        state: values.state,
        propertyValue: { electronics: values.electronics, furniture: values.furniture, clothing: values.clothing, jewelry: values.jewelry, appliances: values.appliances, other: values.other },
        liabilityLimit: values.liabilityLimit,
        deductible: values.deductible,
        coverageType: values.coverageType,
        buildingType: values.buildingType,
        hasRoommatesOnPolicy: values.hasRoommatesOnPolicy === 'yes',
      }))
      setIsCalculating(false)
    }, 400)
  })

  return (
    <>
      <CalculatorForm title="Your renters insurance estimate" description="Enter your personal property value by category to get an accurate estimate." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Controller name="state" control={control} render={({ field }) => (
          <Field label="State"><StateSelector value={field.value ?? ''} onChange={field.onChange} /></Field>
        )} />
        <p className="font-sans text-sm font-semibold text-neutral-700 -mb-2">Estimate your property values</p>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Electronics"><Input type="number" min={0} className="h-11" {...register('electronics')} /></Field>
          <Field label="Furniture"><Input type="number" min={0} className="h-11" {...register('furniture')} /></Field>
          <Field label="Clothing"><Input type="number" min={0} className="h-11" {...register('clothing')} /></Field>
          <Field label="Jewelry"><Input type="number" min={0} className="h-11" {...register('jewelry')} /></Field>
          <Field label="Appliances"><Input type="number" min={0} className="h-11" {...register('appliances')} /></Field>
          <Field label="Other"><Input type="number" min={0} className="h-11" {...register('other')} /></Field>
        </div>
        <Controller name="coverageType" control={control} render={({ field }) => (
          <Field label="Coverage type">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="rcv">Replacement cost value (recommended)</SelectItem>
                <SelectItem value="acv">Actual cash value</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="deductible" control={control} render={({ field }) => (
          <Field label="Deductible">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="250">$250</SelectItem>
                <SelectItem value="500">$500</SelectItem>
                <SelectItem value="1000">$1,000</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="liabilityLimit" control={control} render={({ field }) => (
          <Field label="Liability limit">
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
      </CalculatorForm>

      {result && (
        <ResultsPanel
          annualEstimate={result.annualEstimate}
          monthlyEstimate={result.monthlyEstimate}
          rangeLow={result.rangeLow}
          rangeHigh={result.rangeHigh}
          stateAverage={result.stateAverage}
          stateName="Your state"
          nationalAverage={result.nationalAverage}
          label="Estimated annual renters insurance cost"
          breakdownData={result.breakdownData}
        >
          {/* Extra: total property value */}
        </ResultsPanel>
      )}
      {result && (
        <div className="bg-white border border-neutral-200 rounded-xl p-4 -mt-4 mx-0">
          <p className="font-sans text-sm text-neutral-600">
            Total estimated property value: <strong className="text-primary-dark">{fmt(result.totalPropertyValue)}</strong>
          </p>
        </div>
      )}
    </>
  )
}
