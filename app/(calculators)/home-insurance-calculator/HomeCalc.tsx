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
import { calculateHomeInsurance, type HomeInsuranceResult } from '@/lib/calculators/home'

const schema = z.object({
  state: z.string().min(1, 'Please select your state'),
  homeValue: z.coerce.number().min(50000).max(5000000),
  squareFootage: z.coerce.number().min(500).max(20000),
  yearBuilt: z.coerce.number().min(1900).max(2026),
  homeType: z.enum(['single-family', 'condo', 'townhouse', 'mobile-home']),
  constructionType: z.enum(['frame', 'masonry', 'manufactured']),
  roofAge: z.enum(['under-10', '10-20', 'over-20']),
  coverageLevel: z.enum(['basic', 'standard', 'premium']),
  deductible: z.enum(['500', '1000', '2500', '5000']),
  hasSecuritySystem: z.enum(['yes', 'no']),
  hasPool: z.enum(['yes', 'no']),
})

type FormValues = z.infer<typeof schema>

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-sm font-medium text-neutral-700">{label}</span>
      {children}
      {error && <p className="font-sans text-xs text-red-600" role="alert">{error}</p>}
    </label>
  )
}

export default function HomeCalc() {
  const [result, setResult] = useState<HomeInsuranceResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { homeType: 'single-family', constructionType: 'frame', roofAge: '10-20', coverageLevel: 'standard', deductible: '1000', hasSecuritySystem: 'no', hasPool: 'no' },
  })

  const onCalculate = handleSubmit((values) => {
    setIsCalculating(true)
    setTimeout(() => {
      setResult(calculateHomeInsurance({ ...values, hasSecuritySystem: values.hasSecuritySystem === 'yes', hasPool: values.hasPool === 'yes' }))
      setIsCalculating(false)
    }, 400)
  })

  return (
    <>
      <CalculatorForm title="Your home insurance estimate" description="Enter your home details to see an estimated annual premium." onCalculate={onCalculate} isCalculating={isCalculating}>
        <Controller name="state" control={control} render={({ field }) => (
          <Field label="State" error={errors.state?.message}><StateSelector value={field.value ?? ''} onChange={field.onChange} /></Field>
        )} />
        <Field label="Home value (market value)" error={errors.homeValue?.message}>
          <Input type="number" min={50000} placeholder="e.g. 350000" className="h-11" {...register('homeValue')} />
        </Field>
        <Field label="Square footage" error={errors.squareFootage?.message}>
          <Input type="number" min={500} placeholder="e.g. 1800" className="h-11" {...register('squareFootage')} />
        </Field>
        <Field label="Year built" error={errors.yearBuilt?.message}>
          <Input type="number" min={1900} max={2026} placeholder="e.g. 1998" className="h-11" {...register('yearBuilt')} />
        </Field>
        <Controller name="homeType" control={control} render={({ field }) => (
          <Field label="Home type" error={errors.homeType?.message}>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="single-family">Single-family home</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="mobile-home">Mobile / manufactured home</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="constructionType" control={control} render={({ field }) => (
          <Field label="Construction type" error={errors.constructionType?.message}>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="frame">Wood frame</SelectItem>
                <SelectItem value="masonry">Masonry / brick</SelectItem>
                <SelectItem value="manufactured">Manufactured</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="roofAge" control={control} render={({ field }) => (
          <Field label="Roof age" error={errors.roofAge?.message}>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under-10">Under 10 years</SelectItem>
                <SelectItem value="10-20">10–20 years</SelectItem>
                <SelectItem value="over-20">Over 20 years</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="coverageLevel" control={control} render={({ field }) => (
          <Field label="Coverage level" error={errors.coverageLevel?.message}>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic (HO-1)</SelectItem>
                <SelectItem value="standard">Standard (HO-3)</SelectItem>
                <SelectItem value="premium">Premium (HO-5)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="deductible" control={control} render={({ field }) => (
          <Field label="Deductible" error={errors.deductible?.message}>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="500">$500</SelectItem>
                <SelectItem value="1000">$1,000</SelectItem>
                <SelectItem value="2500">$2,500</SelectItem>
                <SelectItem value="5000">$5,000</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <div className="grid grid-cols-2 gap-4">
          <Controller name="hasSecuritySystem" control={control} render={({ field }) => (
            <Field label="Security system?" error={errors.hasSecuritySystem?.message}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )} />
          <Controller name="hasPool" control={control} render={({ field }) => (
            <Field label="Has a pool?" error={errors.hasPool?.message}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )} />
        </div>
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
          label="Estimated annual home insurance cost"
          breakdownData={result.breakdownData}
        />
      )}
    </>
  )
}
