'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ExternalLink, Shield, AlertTriangle, ChevronRight } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import StateSelector from '@/components/calculators/StateSelector'
import Disclaimer from '@/components/Disclaimer'
import {
  calculateInsurerComparisons,
  INSURER_QUOTE_URLS,
  type ComparisonResult,
  type InsurerResult,
  type InsuranceType,
} from '@/lib/calculators/compare'

// ─── Zod schemas ────────────────────────────────────────────────────────────

const autoSchema = z.object({
  state: z.string().min(1, 'Select your state'),
  age: z.coerce.number().min(16, 'Minimum age is 16').max(99, 'Maximum age is 99'),
  vehicleType: z.enum(['sedan', 'suv', 'truck', 'sports-car', 'minivan', 'electric']),
  coverageLevel: z.enum(['minimum', 'standard', 'full-coverage']),
  drivingRecord: z.enum(['clean', 'one-minor', 'one-accident', 'multiple']),
  annualMileage: z.enum(['under-5000', '5000-10000', '10000-15000', 'over-15000']),
  militaryEligible: z.enum(['yes', 'no']),
})

const homeSchema = z.object({
  state: z.string().min(1, 'Select your state'),
  homeValue: z.coerce.number().min(50000, 'Minimum $50,000').max(5000000, 'Maximum $5,000,000'),
  homeType: z.enum(['single-family', 'condo', 'townhouse', 'mobile-home']),
  yearBuilt: z.coerce.number().min(1900, 'Enter a valid year').max(2026, 'Enter a valid year'),
  coverageLevel: z.enum(['basic', 'standard', 'premium']),
})

const rentersSchema = z.object({
  state: z.string().min(1, 'Select your state'),
  propertyValueEstimate: z.coerce.number().min(1000, 'Minimum $1,000').max(500000, 'Maximum $500,000'),
  coverageType: z.enum(['acv', 'rcv']),
  liabilityLimit: z.enum(['100000', '300000', '500000']),
})

type AutoFormValues = z.infer<typeof autoSchema>
type HomeFormValues = z.infer<typeof homeSchema>
type RentersFormValues = z.infer<typeof rentersSchema>

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-red-500 text-xs mt-1">{message}</p>
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block font-sans text-sm font-medium text-neutral-700 mb-1.5">{children}</label>
}

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

// ─── Recommendation card ──────────────────────────────────────────────────────

function RecommendationCard({
  result,
  insurerResult,
  insuranceType,
}: {
  result: ComparisonResult
  insurerResult: InsurerResult
  insuranceType: InsuranceType
}) {
  const { insurer, estimatedAnnual, estimatedMonthly } = insurerResult
  const quoteUrl = INSURER_QUOTE_URLS[insurer.id]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-primary-light border-2 border-primary-accent rounded-2xl p-6 mb-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <Star className="text-amber-500 fill-amber-500" size={16} />
        <span className="font-sans text-xs font-bold uppercase tracking-wider text-primary-accent">
          Our Pick
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-serif text-[26px] font-semibold text-primary-dark leading-tight">
            {insurer.name}
          </h3>
          <p className="font-sans text-[15px] text-neutral-700 leading-relaxed mt-2 max-w-lg">
            {result.recommendation.reason}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-white border border-neutral-200 rounded-full px-3 py-1 font-sans text-xs text-neutral-600">
              NAIC: {insurer.naic_complaint_index}
            </span>
            {insuranceType === 'auto' && insurer.jd_power_auto_score && (
              <span className="bg-white border border-neutral-200 rounded-full px-3 py-1 font-sans text-xs text-neutral-600">
                J.D. Power Auto: {insurer.jd_power_auto_score}
              </span>
            )}
            {insuranceType === 'home' && insurer.jd_power_home_score && (
              <span className="bg-white border border-neutral-200 rounded-full px-3 py-1 font-sans text-xs text-neutral-600">
                J.D. Power Home: {insurer.jd_power_home_score}
              </span>
            )}
            <span className="bg-white border border-neutral-200 rounded-full px-3 py-1 font-sans text-xs text-neutral-600">
              AM Best: {insurer.am_best_rating}
            </span>
          </div>
        </div>
        <div className="sm:text-right shrink-0">
          <div className="font-serif text-[40px] font-bold text-primary-dark leading-none">
            {fmt.format(estimatedAnnual)}
          </div>
          <div className="font-sans text-sm text-neutral-500 mt-1">
            {fmt.format(estimatedMonthly)}/mo · estimated
          </div>
          <a
            href={quoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 bg-primary-accent text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors"
          >
            Get real quote <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Individual insurer result card ──────────────────────────────────────────

function InsurerResultCard({
  result,
  rank,
  mostExpensiveAnnual,
}: {
  result: InsurerResult
  rank: number
  mostExpensiveAnnual: number
}) {
  const { insurer, estimatedAnnual, estimatedMonthly, rangeLow, rangeHigh, isAvailable } = result
  const barWidth = mostExpensiveAnnual > 0 ? Math.round((estimatedAnnual / mostExpensiveAnnual) * 100) : 0
  const quoteUrl = INSURER_QUOTE_URLS[insurer.id]

  return (
    <motion.div
      variants={cardVariants}
      className={`bg-white border border-neutral-200 rounded-2xl p-5 relative overflow-hidden ${!isAvailable ? 'opacity-50' : ''}`}
    >
      {!isAvailable && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 rounded-2xl">
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
            <AlertTriangle size={14} className="text-amber-600" />
            <span className="font-sans text-sm text-amber-800 font-medium">Military only — not eligible</span>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-sans text-xs font-bold text-neutral-400">#{rank}</span>
            <span className="font-sans text-base font-semibold text-neutral-800 truncate">{insurer.name}</span>
            {insurer.military_only && (
              <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                Military
              </span>
            )}
          </div>
          <div className="font-serif text-[26px] font-bold text-primary-dark leading-none">
            {fmt.format(estimatedAnnual)}
          </div>
          <div className="font-sans text-xs text-neutral-500 mt-0.5">
            {fmt.format(estimatedMonthly)}/mo · range {fmt.format(rangeLow)}–{fmt.format(rangeHigh)}
          </div>

          {/* Cost bar */}
          <div className="mt-3 h-1.5 bg-neutral-100 rounded-full">
            <div
              className="h-full bg-primary-accent rounded-full transition-all"
              style={{ width: `${barWidth}%` }}
            />
          </div>
          <div className="font-sans text-[10px] text-neutral-400 mt-1">Relative cost</div>

          {/* Best for tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {insurer.best_for.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-primary-light text-primary-dark text-[10px] font-semibold px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <a
            href={quoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-primary-accent hover:text-green-700 transition-colors"
          >
            Get quote <ExternalLink size={11} />
          </a>
          <a
            href={`/reviews/${insurer.id}`}
            className="inline-flex items-center gap-0.5 font-sans text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            Full review <ChevronRight size={11} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Auto form ────────────────────────────────────────────────────────────────

function AutoForm({ onCompare }: { onCompare: (r: ComparisonResult) => void }) {
  const [isCalculating, setIsCalculating] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AutoFormValues>({ resolver: zodResolver(autoSchema) })

  const onSubmit = (data: AutoFormValues) => {
    setIsCalculating(true)
    setTimeout(() => {
      const result = calculateInsurerComparisons(
        { ...data, militaryEligible: data.militaryEligible === 'yes' },
        'auto'
      )
      onCompare(result)
      setIsCalculating(false)
    }, 400)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel>State</FieldLabel>
          <StateSelector value={watch('state')} onChange={(v) => setValue('state', v, { shouldValidate: true })} />
          <FieldError message={errors.state?.message} />
        </div>
        <div>
          <FieldLabel>Your age</FieldLabel>
          <Input type="number" placeholder="e.g. 34" className="h-11" {...register('age')} />
          <FieldError message={errors.age?.message} />
        </div>
        <div>
          <FieldLabel>Vehicle type</FieldLabel>
          <Select onValueChange={(v) => setValue('vehicleType', v as AutoFormValues['vehicleType'], { shouldValidate: true })}>
            <SelectTrigger className="h-11"><SelectValue placeholder="Select vehicle type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="truck">Truck</SelectItem>
              <SelectItem value="sports-car">Sports car</SelectItem>
              <SelectItem value="minivan">Minivan</SelectItem>
              <SelectItem value="electric">Electric vehicle</SelectItem>
            </SelectContent>
          </Select>
          <FieldError message={errors.vehicleType?.message} />
        </div>
        <div>
          <FieldLabel>Coverage level</FieldLabel>
          <Select onValueChange={(v) => setValue('coverageLevel', v as AutoFormValues['coverageLevel'], { shouldValidate: true })}>
            <SelectTrigger className="h-11"><SelectValue placeholder="Select coverage" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="minimum">Minimum liability only</SelectItem>
              <SelectItem value="standard">Standard coverage</SelectItem>
              <SelectItem value="full-coverage">Full coverage</SelectItem>
            </SelectContent>
          </Select>
          <FieldError message={errors.coverageLevel?.message} />
        </div>
        <div>
          <FieldLabel>Driving record</FieldLabel>
          <Select onValueChange={(v) => setValue('drivingRecord', v as AutoFormValues['drivingRecord'], { shouldValidate: true })}>
            <SelectTrigger className="h-11"><SelectValue placeholder="Select driving record" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="clean">Clean record</SelectItem>
              <SelectItem value="one-minor">One minor violation</SelectItem>
              <SelectItem value="one-accident">One at-fault accident</SelectItem>
              <SelectItem value="multiple">Multiple incidents</SelectItem>
            </SelectContent>
          </Select>
          <FieldError message={errors.drivingRecord?.message} />
        </div>
        <div>
          <FieldLabel>Annual mileage</FieldLabel>
          <Select onValueChange={(v) => setValue('annualMileage', v as AutoFormValues['annualMileage'], { shouldValidate: true })}>
            <SelectTrigger className="h-11"><SelectValue placeholder="Select annual mileage" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="under-5000">Under 5,000 miles</SelectItem>
              <SelectItem value="5000-10000">5,000–10,000 miles</SelectItem>
              <SelectItem value="10000-15000">10,000–15,000 miles</SelectItem>
              <SelectItem value="over-15000">Over 15,000 miles</SelectItem>
            </SelectContent>
          </Select>
          <FieldError message={errors.annualMileage?.message} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel>Are you or a family member a US military veteran?</FieldLabel>
          <Select onValueChange={(v) => setValue('militaryEligible', v as 'yes' | 'no', { shouldValidate: true })}>
            <SelectTrigger className="h-11"><SelectValue placeholder="Select one" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes — military or veteran household</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
          <FieldError message={errors.militaryEligible?.message} />
        </div>
      </div>
      <Button
        type="submit"
        disabled={isCalculating}
        className="w-full h-[52px] bg-primary-accent hover:bg-green-600 text-white font-semibold text-base rounded-xl transition-all"
      >
        {isCalculating ? 'Comparing insurers…' : 'Compare all insurers →'}
      </Button>
    </form>
  )
}

// ─── Home form ────────────────────────────────────────────────────────────────

function HomeForm({ onCompare }: { onCompare: (r: ComparisonResult) => void }) {
  const [isCalculating, setIsCalculating] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HomeFormValues>({ resolver: zodResolver(homeSchema) })

  const onSubmit = (data: HomeFormValues) => {
    setIsCalculating(true)
    setTimeout(() => {
      const result = calculateInsurerComparisons(data, 'home')
      onCompare(result)
      setIsCalculating(false)
    }, 400)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel>State</FieldLabel>
          <StateSelector value={watch('state')} onChange={(v) => setValue('state', v, { shouldValidate: true })} />
          <FieldError message={errors.state?.message} />
        </div>
        <div>
          <FieldLabel>Home value</FieldLabel>
          <Input type="number" placeholder="e.g. 350000" className="h-11" {...register('homeValue')} />
          <FieldError message={errors.homeValue?.message} />
        </div>
        <div>
          <FieldLabel>Home type</FieldLabel>
          <Select onValueChange={(v) => setValue('homeType', v as HomeFormValues['homeType'], { shouldValidate: true })}>
            <SelectTrigger className="h-11"><SelectValue placeholder="Select home type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="single-family">Single-family home</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="mobile-home">Mobile home</SelectItem>
            </SelectContent>
          </Select>
          <FieldError message={errors.homeType?.message} />
        </div>
        <div>
          <FieldLabel>Year built</FieldLabel>
          <Input type="number" placeholder="e.g. 1998" className="h-11" {...register('yearBuilt')} />
          <FieldError message={errors.yearBuilt?.message} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel>Coverage level</FieldLabel>
          <Select onValueChange={(v) => setValue('coverageLevel', v as HomeFormValues['coverageLevel'], { shouldValidate: true })}>
            <SelectTrigger className="h-11"><SelectValue placeholder="Select coverage level" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic (HO-1)</SelectItem>
              <SelectItem value="standard">Standard (HO-3) — most common</SelectItem>
              <SelectItem value="premium">Premium (HO-5) — open perils</SelectItem>
            </SelectContent>
          </Select>
          <FieldError message={errors.coverageLevel?.message} />
        </div>
      </div>
      <Button
        type="submit"
        disabled={isCalculating}
        className="w-full h-[52px] bg-primary-accent hover:bg-green-600 text-white font-semibold text-base rounded-xl transition-all"
      >
        {isCalculating ? 'Comparing insurers…' : 'Compare all insurers →'}
      </Button>
    </form>
  )
}

// ─── Renters form ─────────────────────────────────────────────────────────────

function RentersForm({ onCompare }: { onCompare: (r: ComparisonResult) => void }) {
  const [isCalculating, setIsCalculating] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RentersFormValues>({ resolver: zodResolver(rentersSchema) })

  const onSubmit = (data: RentersFormValues) => {
    setIsCalculating(true)
    setTimeout(() => {
      const result = calculateInsurerComparisons(data, 'renters')
      onCompare(result)
      setIsCalculating(false)
    }, 400)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel>State</FieldLabel>
          <StateSelector value={watch('state')} onChange={(v) => setValue('state', v, { shouldValidate: true })} />
          <FieldError message={errors.state?.message} />
        </div>
        <div>
          <FieldLabel>Total belongings value</FieldLabel>
          <Input type="number" placeholder="e.g. 15000" className="h-11" {...register('propertyValueEstimate')} />
          <FieldError message={errors.propertyValueEstimate?.message} />
        </div>
        <div>
          <FieldLabel>Coverage type</FieldLabel>
          <Select onValueChange={(v) => setValue('coverageType', v as 'acv' | 'rcv', { shouldValidate: true })}>
            <SelectTrigger className="h-11"><SelectValue placeholder="Select coverage type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="acv">Actual cash value (ACV)</SelectItem>
              <SelectItem value="rcv">Replacement cost value (RCV) — recommended</SelectItem>
            </SelectContent>
          </Select>
          <FieldError message={errors.coverageType?.message} />
        </div>
        <div>
          <FieldLabel>Liability limit</FieldLabel>
          <Select onValueChange={(v) => setValue('liabilityLimit', v as RentersFormValues['liabilityLimit'], { shouldValidate: true })}>
            <SelectTrigger className="h-11"><SelectValue placeholder="Select liability limit" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="100000">$100,000</SelectItem>
              <SelectItem value="300000">$300,000 — recommended</SelectItem>
              <SelectItem value="500000">$500,000</SelectItem>
            </SelectContent>
          </Select>
          <FieldError message={errors.liabilityLimit?.message} />
        </div>
      </div>
      <Button
        type="submit"
        disabled={isCalculating}
        className="w-full h-[52px] bg-primary-accent hover:bg-green-600 text-white font-semibold text-base rounded-xl transition-all"
      >
        {isCalculating ? 'Comparing insurers…' : 'Compare all insurers →'}
      </Button>
    </form>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function InsurerComparisonCalculator() {
  const [activeTab, setActiveTab] = useState<InsuranceType>('auto')
  const [results, setResults] = useState<ComparisonResult | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [results])

  const handleTabChange = (value: string) => {
    setActiveTab(value as InsuranceType)
    setResults(null)
  }

  const handleCompare = (result: ComparisonResult) => {
    setResults(result)
  }

  const recommendedResult = results
    ? results.insurerResults.find((r) => r.insurer.id === results.recommendation.insurerId)
    : null

  const otherResults = results
    ? results.insurerResults.filter((r) => r.insurer.id !== results.recommendation.insurerId)
    : []

  let otherRank = 0
  const rankedOthers = otherResults.map((r) => {
    if (r.isAvailable) otherRank++
    return { result: r, rank: otherRank }
  })

  return (
    <div>
      {/* Section header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="text-primary-accent" size={20} />
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-primary-accent">
            Personalized comparison
          </span>
        </div>
        <h2 className="font-serif text-[28px] sm:text-[32px] font-semibold text-primary-dark leading-tight">
          Get estimated prices for all 8 insurers
        </h2>
        <p className="font-sans text-[16px] text-neutral-600 mt-2 leading-relaxed max-w-2xl">
          Enter your details below and see how every major insurer would price your policy — sorted cheapest to most expensive, with a personalized recommendation.
        </p>
      </div>

      {/* Tabs + form */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-6 bg-neutral-100 p-1 rounded-xl h-auto">
            <TabsTrigger value="auto" className="rounded-lg px-5 py-2 font-sans text-sm font-medium">
              Auto Insurance
            </TabsTrigger>
            <TabsTrigger value="home" className="rounded-lg px-5 py-2 font-sans text-sm font-medium">
              Home Insurance
            </TabsTrigger>
            <TabsTrigger value="renters" className="rounded-lg px-5 py-2 font-sans text-sm font-medium">
              Renters Insurance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="auto" key="auto">
            <AutoForm onCompare={handleCompare} />
          </TabsContent>
          <TabsContent value="home" key="home">
            <HomeForm onCompare={handleCompare} />
          </TabsContent>
          <TabsContent value="renters" key="renters">
            <RentersForm onCompare={handleCompare} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Results */}
      <AnimatePresence>
        {results && recommendedResult && (
          <div ref={resultsRef} className="mt-8 scroll-mt-24">
            <div className="mb-4">
              <h3 className="font-serif text-[22px] font-semibold text-primary-dark">
                Your personalized comparison
              </h3>
              <p className="font-sans text-sm text-neutral-500 mt-1">
                Estimates based on NAIC state averages · sorted cheapest first
              </p>
            </div>

            {/* Recommendation */}
            <RecommendationCard
              result={results}
              insurerResult={recommendedResult}
              insuranceType={activeTab}
            />

            {/* All other insurers */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {rankedOthers.map(({ result, rank }) => (
                <InsurerResultCard
                  key={result.insurer.id}
                  result={result}
                  rank={rank}
                  mostExpensiveAnnual={results.mostExpensiveAnnual}
                />
              ))}
            </motion.div>

            {/* Disclaimer */}
            <div className="mt-6">
              <Disclaimer type="estimate-comparison" />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
