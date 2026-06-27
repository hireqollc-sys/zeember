import stateData from '@/lib/data/state-averages.json'

export interface HomeInsuranceInputs {
  state: string
  homeValue: number
  squareFootage: number
  yearBuilt: number
  homeType: 'single-family' | 'condo' | 'townhouse' | 'mobile-home'
  constructionType: 'frame' | 'masonry' | 'manufactured'
  roofAge: 'under-10' | '10-20' | 'over-20'
  coverageLevel: 'basic' | 'standard' | 'premium'
  deductible: '500' | '1000' | '2500' | '5000'
  hasSecuritySystem: boolean
  hasPool: boolean
}

export interface HomeInsuranceResult {
  annualEstimate: number
  monthlyEstimate: number
  rangeLow: number
  rangeHigh: number
  stateAverage: number
  nationalAverage: number
  breakdownData: Array<{ factor: string; amount: number; multiplier: string }>
}

export function calculateHomeInsurance(inputs: HomeInsuranceInputs): HomeInsuranceResult {
  const states = stateData.states as Record<string, { home: { annual: number } }>
  const stateInfo = states[inputs.state]
  const stateAvgAnnual = stateInfo?.home.annual ?? stateData.national_averages.home.annual

  const stateFactor = stateAvgAnnual / stateData.national_averages.home.annual
  let base = inputs.homeValue * 0.001 * stateFactor

  const sqftFactor = inputs.squareFootage > 2500 ? 1.15 : inputs.squareFootage < 1000 ? 0.9 : 1.0
  const ageFactor =
    inputs.yearBuilt < 1970 ? 1.2 : inputs.yearBuilt < 1990 ? 1.1 : 1.0
  const constructionFactor =
    inputs.constructionType === 'masonry' ? 0.95 : inputs.constructionType === 'manufactured' ? 1.15 : 1.0
  const roofFactor =
    inputs.roofAge === 'under-10' ? 0.95 : inputs.roofAge === 'over-20' ? 1.1 : 1.0
  const deductibleFactor =
    inputs.deductible === '500' ? 1.08
    : inputs.deductible === '2500' ? 0.88
    : inputs.deductible === '5000' ? 0.8
    : 1.0
  const securityFactor = inputs.hasSecuritySystem ? 0.95 : 1.0
  const poolFactor = inputs.hasPool ? 1.1 : 1.0
  const coverageFactor =
    inputs.coverageLevel === 'basic' ? 0.7 : inputs.coverageLevel === 'premium' ? 1.3 : 1.0
  const homeTypeFactor = inputs.homeType === 'mobile-home' ? 1.2 : inputs.homeType === 'condo' ? 0.7 : 1.0

  const annualEstimate = Math.round(
    base * sqftFactor * ageFactor * constructionFactor * roofFactor
      * deductibleFactor * securityFactor * poolFactor * coverageFactor * homeTypeFactor,
  )

  return {
    annualEstimate,
    monthlyEstimate: Math.round(annualEstimate / 12),
    rangeLow: Math.round(annualEstimate * 0.8),
    rangeHigh: Math.round(annualEstimate * 1.2),
    stateAverage: stateAvgAnnual,
    nationalAverage: stateData.national_averages.home.annual,
    breakdownData: [
      { factor: 'Home value base', amount: Math.round(base * coverageFactor), multiplier: `${coverageFactor}x` },
      { factor: 'Age of home', amount: Math.round(base * Math.abs(ageFactor - 1)), multiplier: `${ageFactor}x` },
      { factor: 'Square footage', amount: Math.round(base * Math.abs(sqftFactor - 1)), multiplier: `${sqftFactor}x` },
      { factor: 'Construction', amount: Math.round(base * Math.abs(constructionFactor - 1)), multiplier: `${constructionFactor}x` },
      { factor: 'Roof age', amount: Math.round(base * Math.abs(roofFactor - 1)), multiplier: `${roofFactor}x` },
      { factor: 'Deductible', amount: Math.round(base * Math.abs(deductibleFactor - 1)), multiplier: `${deductibleFactor}x` },
    ],
  }
}
