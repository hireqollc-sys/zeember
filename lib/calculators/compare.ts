import insurerData from '@/lib/data/insurer-profiles.json'
import { calculateAutoInsurance } from './auto'
import { calculateHomeInsurance } from './home'
import { calculateRentersInsurance } from './renters'

export interface InsurerProfile {
  id: string
  name: string
  price_tier: 'budget' | 'mid' | 'premium'
  naic_complaint_index: number
  jd_power_auto_score: number | null
  jd_power_home_score: number | null
  am_best_rating: string
  best_for: string[]
  pros: string[]
  cons: string[]
  types_offered: string[]
  military_only: boolean
  summary: string
}

export interface InsurerResult {
  insurer: InsurerProfile
  estimatedAnnual: number
  estimatedMonthly: number
  rangeLow: number
  rangeHigh: number
  isAvailable: boolean
}

export interface ComparisonRecommendation {
  insurerId: string
  reason: string
}

export interface ComparisonResult {
  insurerResults: InsurerResult[]
  recommendation: ComparisonRecommendation
  cheapestAnnual: number
  mostExpensiveAnnual: number
}

export interface CompareAutoInputs {
  state: string
  age: number
  vehicleType: 'sedan' | 'suv' | 'truck' | 'sports-car' | 'minivan' | 'electric'
  coverageLevel: 'minimum' | 'standard' | 'full-coverage'
  drivingRecord: 'clean' | 'one-minor' | 'one-accident' | 'multiple'
  annualMileage: 'under-5000' | '5000-10000' | '10000-15000' | 'over-15000'
  militaryEligible: boolean
}

export interface CompareHomeInputs {
  state: string
  homeValue: number
  yearBuilt: number
  coverageLevel: 'basic' | 'standard' | 'premium'
  homeType: 'single-family' | 'condo' | 'townhouse' | 'mobile-home'
}

export interface CompareRentersInputs {
  state: string
  propertyValueEstimate: number
  coverageType: 'acv' | 'rcv'
  liabilityLimit: '100000' | '300000' | '500000'
}

export type InsuranceType = 'auto' | 'home' | 'renters'

const INSURER_MULTIPLIERS: Record<string, number> = {
  usaa: 0.82,
  geico: 0.88,
  progressive: 0.93,
  nationwide: 1.05,
  'state-farm': 1.08,
  allstate: 1.18,
  'liberty-mutual': 1.22,
  farmers: 1.28,
}

export const INSURER_QUOTE_URLS: Record<string, string> = {
  geico: 'https://www.geico.com/auto-insurance/',
  progressive: 'https://www.progressive.com/auto/',
  'state-farm': 'https://www.statefarm.com/insurance/auto',
  allstate: 'https://www.allstate.com/auto-insurance',
  'liberty-mutual': 'https://www.libertymutual.com/auto-insurance',
  nationwide: 'https://www.nationwide.com/personal/insurance/auto/',
  farmers: 'https://www.farmers.com/auto/',
  usaa: 'https://www.usaa.com/inet/wc/auto-insurance',
}

function getRecommendation(
  inputs: CompareAutoInputs | CompareHomeInputs | CompareRentersInputs,
  insuranceType: InsuranceType
): ComparisonRecommendation {
  if (insuranceType === 'auto') {
    const autoInputs = inputs as CompareAutoInputs
    if (autoInputs.militaryEligible) {
      return {
        insurerId: 'usaa',
        reason: 'Highest-rated insurer by every metric — lowest complaint ratio, highest J.D. Power scores, and consistently the cheapest rates. If you qualify, there is no better option.',
      }
    }
    if (autoInputs.drivingRecord === 'one-accident' || autoInputs.drivingRecord === 'multiple') {
      return {
        insurerId: 'progressive',
        reason: 'Progressive specializes in non-standard drivers and offers the best rates for your driving history. Their Name Your Price tool and Snapshot telematics can reduce costs further over time.',
      }
    }
    if (autoInputs.age < 25) {
      return {
        insurerId: 'geico',
        reason: 'Young drivers get some of GEICO\'s best discounts, and the low base rate helps significantly at your age. Strong app and online experience makes managing your policy easy.',
      }
    }
    if (autoInputs.coverageLevel === 'minimum') {
      return {
        insurerId: 'geico',
        reason: 'For minimum liability coverage, GEICO consistently offers the lowest base rates nationally — ideal when you\'re keeping costs as low as possible.',
      }
    }
    return {
      insurerId: 'state-farm',
      reason: 'State Farm balances competitive pricing with top-tier claims satisfaction and the largest local agent network in the US — the best all-around choice for standard coverage needs.',
    }
  }

  if (insuranceType === 'home') {
    return {
      insurerId: 'state-farm',
      reason: 'State Farm leads in home insurance claims satisfaction and has the broadest agent network for personalized service — critical when you\'re dealing with a significant home claim.',
    }
  }

  // renters
  return {
    insurerId: 'geico',
    reason: 'GEICO offers some of the most competitive renters insurance rates nationally, often bundled with auto for additional savings. Fast digital experience with no local agent required.',
  }
}

export function calculateInsurerComparisons(
  inputs: CompareAutoInputs | CompareHomeInputs | CompareRentersInputs,
  insuranceType: InsuranceType
): ComparisonResult {
  // Calculate base rate using existing calculators
  let baseAnnual: number

  if (insuranceType === 'auto') {
    const autoInputs = inputs as CompareAutoInputs
    const result = calculateAutoInsurance({
      state: autoInputs.state,
      age: autoInputs.age,
      vehicleType: autoInputs.vehicleType,
      vehicleYear: 2022, // neutral 4-year-old car default
      coverageLevel: autoInputs.coverageLevel,
      drivingRecord: autoInputs.drivingRecord,
      annualMileage: autoInputs.annualMileage,
    })
    baseAnnual = result.annualEstimate
  } else if (insuranceType === 'home') {
    const homeInputs = inputs as CompareHomeInputs
    const result = calculateHomeInsurance({
      state: homeInputs.state,
      homeValue: homeInputs.homeValue,
      squareFootage: 1800,
      yearBuilt: homeInputs.yearBuilt,
      homeType: homeInputs.homeType,
      constructionType: 'frame',
      roofAge: '10-20',
      coverageLevel: homeInputs.coverageLevel,
      deductible: '1000',
      hasSecuritySystem: false,
      hasPool: false,
    })
    baseAnnual = result.annualEstimate
  } else {
    const rentersInputs = inputs as CompareRentersInputs
    const equalSplit = Math.floor(rentersInputs.propertyValueEstimate / 6)
    const remainder = rentersInputs.propertyValueEstimate - equalSplit * 6
    const result = calculateRentersInsurance({
      state: rentersInputs.state,
      propertyValue: {
        electronics: equalSplit + remainder,
        furniture: equalSplit,
        clothing: equalSplit,
        jewelry: equalSplit,
        appliances: equalSplit,
        other: equalSplit,
      },
      liabilityLimit: rentersInputs.liabilityLimit,
      deductible: '500',
      coverageType: rentersInputs.coverageType,
      buildingType: 'apartment',
      hasRoommatesOnPolicy: false,
    })
    baseAnnual = result.annualEstimate
  }

  const insurers = insurerData.insurers as InsurerProfile[]
  const autoInputs = insuranceType === 'auto' ? (inputs as CompareAutoInputs) : null

  const insurerResults: InsurerResult[] = insurers.map((insurer) => {
    let multiplier = INSURER_MULTIPLIERS[insurer.id] ?? 1.0

    // Progressive gets better rate for drivers with accidents
    if (
      insurer.id === 'progressive' &&
      insuranceType === 'auto' &&
      autoInputs &&
      (autoInputs.drivingRecord === 'one-accident' || autoInputs.drivingRecord === 'multiple')
    ) {
      multiplier = 0.85
    }

    const estimatedAnnual = Math.round(baseAnnual * multiplier)
    const estimatedMonthly = Math.round(estimatedAnnual / 12)
    const isAvailable =
      insurer.id === 'usaa'
        ? insuranceType === 'auto'
          ? (autoInputs?.militaryEligible ?? false)
          : true
        : true

    return {
      insurer,
      estimatedAnnual,
      estimatedMonthly,
      rangeLow: Math.round(estimatedAnnual * 0.8),
      rangeHigh: Math.round(estimatedAnnual * 1.2),
      isAvailable,
    }
  })

  // Sort: available cheapest first, unavailable at end
  insurerResults.sort((a, b) => {
    if (a.isAvailable && !b.isAvailable) return -1
    if (!a.isAvailable && b.isAvailable) return 1
    return a.estimatedAnnual - b.estimatedAnnual
  })

  const available = insurerResults.filter((r) => r.isAvailable)
  const cheapestAnnual = available[0]?.estimatedAnnual ?? 0
  const mostExpensiveAnnual = available[available.length - 1]?.estimatedAnnual ?? 0

  const recommendation = getRecommendation(inputs, insuranceType)

  return { insurerResults, recommendation, cheapestAnnual, mostExpensiveAnnual }
}
