'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CalculatorForm from '@/components/calculators/CalculatorForm'
import ResultsPanel from '@/components/calculators/ResultsPanel'
import StateSelector from '@/components/calculators/StateSelector'
import { calculateAutoInsurance, type AutoInsuranceResult } from '@/lib/calculators/auto'

const schema = z.object({
  state: z.string().min(1, 'Please select your state'),
  age: z.coerce.number().min(16, 'Minimum age is 16').max(99, 'Maximum age is 99'),
  vehicleType: z.enum(['sedan', 'suv', 'truck', 'sports-car', 'minivan', 'electric']),
  vehicleYear: z.coerce.number().min(1990, 'Year must be 1990 or later').max(2027, 'Year must be 2027 or earlier'),
  coverageLevel: z.enum(['minimum', 'standard', 'full-coverage']),
  drivingRecord: z.enum(['clean', 'one-minor', 'one-accident', 'multiple']),
  annualMileage: z.enum(['under-5000', '5000-10000', '10000-15000', 'over-15000']),
})

type FormValues = z.infer<typeof schema>

function FieldLabel({ children, error }: { children: React.ReactNode; error?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      {children}
      {error && <p className="font-sans text-xs text-red-600" role="alert">{error}</p>}
    </div>
  )
}

export default function AutoCalc() {
  const [result, setResult] = useState<AutoInsuranceResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      vehicleType: 'sedan',
      coverageLevel: 'standard',
      drivingRecord: 'clean',
      annualMileage: '10000-15000',
    },
  })

  const onCalculate = handleSubmit((values) => {
    setIsCalculating(true)
    // Simulate brief async for UX
    setTimeout(() => {
      const res = calculateAutoInsurance(values)
      setResult(res)
      setIsCalculating(false)
    }, 400)
  })

  return (
    <>
      <CalculatorForm
        title="Your auto insurance estimate"
        description="Enter your details to see an estimated annual premium with a full cost breakdown."
        onCalculate={onCalculate}
        isCalculating={isCalculating}
      >
        {/* State */}
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <FieldLabel error={errors.state?.message}>
              <StateSelector value={field.value ?? ''} onChange={field.onChange} id="auto-state" />
            </FieldLabel>
          )}
        />

        {/* Age */}
        <FieldLabel error={errors.age?.message}>
          <label htmlFor="age" className="font-sans text-sm font-medium text-neutral-700">Your age</label>
          <Input
            id="age"
            type="number"
            min={16}
            max={99}
            placeholder="e.g. 34"
            className="h-11"
            {...register('age')}
          />
        </FieldLabel>

        {/* Vehicle type */}
        <Controller
          name="vehicleType"
          control={control}
          render={({ field }) => (
            <FieldLabel error={errors.vehicleType?.message}>
              <label htmlFor="vehicleType" className="font-sans text-sm font-medium text-neutral-700">Vehicle type</label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="vehicleType" className="h-11">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="truck">Truck / Pickup</SelectItem>
                  <SelectItem value="sports-car">Sports car</SelectItem>
                  <SelectItem value="minivan">Minivan</SelectItem>
                  <SelectItem value="electric">Electric vehicle</SelectItem>
                </SelectContent>
              </Select>
            </FieldLabel>
          )}
        />

        {/* Vehicle year */}
        <FieldLabel error={errors.vehicleYear?.message}>
          <label htmlFor="vehicleYear" className="font-sans text-sm font-medium text-neutral-700">Vehicle year</label>
          <Input
            id="vehicleYear"
            type="number"
            min={1990}
            max={2027}
            placeholder="e.g. 2021"
            className="h-11"
            {...register('vehicleYear')}
          />
        </FieldLabel>

        {/* Coverage level */}
        <Controller
          name="coverageLevel"
          control={control}
          render={({ field }) => (
            <FieldLabel error={errors.coverageLevel?.message}>
              <label htmlFor="coverageLevel" className="font-sans text-sm font-medium text-neutral-700">Coverage level</label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="coverageLevel" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimum">Minimum liability only</SelectItem>
                  <SelectItem value="standard">Standard coverage</SelectItem>
                  <SelectItem value="full-coverage">Full coverage</SelectItem>
                </SelectContent>
              </Select>
            </FieldLabel>
          )}
        />

        {/* Driving record */}
        <Controller
          name="drivingRecord"
          control={control}
          render={({ field }) => (
            <FieldLabel error={errors.drivingRecord?.message}>
              <label htmlFor="drivingRecord" className="font-sans text-sm font-medium text-neutral-700">Driving record</label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="drivingRecord" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clean">Clean record</SelectItem>
                  <SelectItem value="one-minor">One minor violation</SelectItem>
                  <SelectItem value="one-accident">One at-fault accident</SelectItem>
                  <SelectItem value="multiple">Multiple violations or accidents</SelectItem>
                </SelectContent>
              </Select>
            </FieldLabel>
          )}
        />

        {/* Annual mileage */}
        <Controller
          name="annualMileage"
          control={control}
          render={({ field }) => (
            <FieldLabel error={errors.annualMileage?.message}>
              <label htmlFor="annualMileage" className="font-sans text-sm font-medium text-neutral-700">Annual mileage</label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="annualMileage" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-5000">Under 5,000 miles</SelectItem>
                  <SelectItem value="5000-10000">5,000 – 10,000 miles</SelectItem>
                  <SelectItem value="10000-15000">10,000 – 15,000 miles</SelectItem>
                  <SelectItem value="over-15000">Over 15,000 miles</SelectItem>
                </SelectContent>
              </Select>
            </FieldLabel>
          )}
        />
      </CalculatorForm>

      {/* Results panel — only shown after first calculation */}
      {result && (
        <ResultsPanel
          annualEstimate={result.annualEstimate}
          monthlyEstimate={result.monthlyEstimate}
          rangeLow={result.rangeLow}
          rangeHigh={result.rangeHigh}
          stateAverage={result.stateAverage}
          stateName="Your state"
          nationalAverage={result.nationalAverage}
          label="Estimated annual auto insurance cost"
          breakdownData={result.breakdownData}
        />
      )}
    </>
  )
}
