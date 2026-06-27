import stateData from '@/lib/data/state-averages.json'

export interface AutoInsuranceInputs {
  state: string
  age: number
  vehicleType: 'sedan' | 'suv' | 'truck' | 'sports-car' | 'minivan' | 'electric'
  vehicleYear: number
  coverageLevel: 'minimum' | 'standard' | 'full-coverage'
  drivingRecord: 'clean' | 'one-minor' | 'one-accident' | 'multiple'
  annualMileage: 'under-5000' | '5000-10000' | '10000-15000' | 'over-15000'
}

export interface AutoInsuranceResult {
  annualEstimate: number
  monthlyEstimate: number
  rangeLow: number
  rangeHigh: number
  stateAverage: number
  nationalAverage: number
  breakdownData: Array<{ factor: string; amount: number; multiplier: string }>
}

const AGE_MULTIPLIERS: Record<string, number> = {
  '16-19': 2.5,
  '20-24': 1.6,
  '25-29': 1.2,
  '30-59': 1.0,
  '60-69': 1.1,
  '70+': 1.25,
}

const VEHICLE_MULTIPLIERS: Record<string, number> = {
  sedan: 1.0,
  suv: 1.1,
  truck: 1.05,
  'sports-car': 1.45,
  minivan: 0.95,
  electric: 1.15,
}

const COVERAGE_MULTIPLIERS: Record<string, number> = {
  minimum: 0.55,
  standard: 1.0,
  'full-coverage': 1.4,
}

const RECORD_MULTIPLIERS: Record<string, number> = {
  clean: 1.0,
  'one-minor': 1.22,
  'one-accident': 1.48,
  multiple: 2.05,
}

const MILEAGE_MULTIPLIERS: Record<string, number> = {
  'under-5000': 0.88,
  '5000-10000': 0.95,
  '10000-15000': 1.0,
  'over-15000': 1.12,
}

function getAgeGroup(age: number): string {
  if (age <= 19) return '16-19'
  if (age <= 24) return '20-24'
  if (age <= 29) return '25-29'
  if (age <= 59) return '30-59'
  if (age <= 69) return '60-69'
  return '70+'
}

export function calculateAutoInsurance(inputs: AutoInsuranceInputs): AutoInsuranceResult {
  const states = stateData.states as Record<string, { auto: { annual: number } }>
  const stateInfo = states[inputs.state]
  const baseRate = stateInfo?.auto.annual ?? stateData.national_averages.auto.annual

  const ageGroup = getAgeGroup(inputs.age)
  const ageMult = AGE_MULTIPLIERS[ageGroup]
  const vehicleMult = VEHICLE_MULTIPLIERS[inputs.vehicleType]
  const coverageMult = COVERAGE_MULTIPLIERS[inputs.coverageLevel]
  const recordMult = RECORD_MULTIPLIERS[inputs.drivingRecord]
  const mileageMult = MILEAGE_MULTIPLIERS[inputs.annualMileage]

  const currentYear = 2026
  const vehicleAgeFactor = Math.max(0.85, 1.0 - (currentYear - inputs.vehicleYear) * 0.012)

  const annualEstimate = Math.round(
    baseRate * ageMult * vehicleMult * coverageMult * recordMult * mileageMult * vehicleAgeFactor,
  )

  const baseCoverage = Math.round(baseRate * coverageMult)

  return {
    annualEstimate,
    monthlyEstimate: Math.round(annualEstimate / 12),
    rangeLow: Math.round(annualEstimate * 0.8),
    rangeHigh: Math.round(annualEstimate * 1.2),
    stateAverage: stateInfo?.auto.annual ?? stateData.national_averages.auto.annual,
    nationalAverage: stateData.national_averages.auto.annual,
    breakdownData: [
      { factor: 'Base rate', amount: baseCoverage, multiplier: `${coverageMult}x` },
      {
        factor: 'Age factor',
        amount: Math.round(baseCoverage * Math.max(0, ageMult - 1)),
        multiplier: `${ageMult}x`,
      },
      { factor: 'Location', amount: Math.round(baseRate * 0.08), multiplier: 'Included' },
      {
        factor: 'Vehicle type',
        amount: Math.round(baseCoverage * Math.abs(vehicleMult - 1)),
        multiplier: `${vehicleMult}x`,
      },
      {
        factor: 'Driving record',
        amount: Math.round(baseCoverage * Math.max(0, recordMult - 1)),
        multiplier: `${recordMult}x`,
      },
      {
        factor: 'Annual mileage',
        amount: Math.round(baseCoverage * Math.abs(mileageMult - 1)),
        multiplier: `${mileageMult}x`,
      },
    ],
  }
}
