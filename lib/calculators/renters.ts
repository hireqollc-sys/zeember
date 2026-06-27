import stateData from '@/lib/data/state-averages.json'

export interface RentersPropertyValue {
  electronics: number
  furniture: number
  clothing: number
  jewelry: number
  appliances: number
  other: number
}

export interface RentersInsuranceInputs {
  state: string
  propertyValue: RentersPropertyValue
  liabilityLimit: '100000' | '300000' | '500000'
  deductible: '250' | '500' | '1000'
  coverageType: 'acv' | 'rcv'
  buildingType: 'apartment' | 'house' | 'condo' | 'townhouse'
  hasRoommatesOnPolicy: boolean
}

export interface RentersInsuranceResult {
  annualEstimate: number
  monthlyEstimate: number
  rangeLow: number
  rangeHigh: number
  totalPropertyValue: number
  stateAverage: number
  nationalAverage: number
  breakdownData: Array<{ factor: string; amount: number; multiplier: string }>
}

export function calculateRentersInsurance(inputs: RentersInsuranceInputs): RentersInsuranceResult {
  const totalPropertyValue = Object.values(inputs.propertyValue).reduce((a, b) => a + b, 0)

  const states = stateData.states as Record<string, { renters: { annual: number } }>
  const stateInfo = states[inputs.state]
  const stateAvgAnnual = stateInfo?.renters.annual ?? stateData.national_averages.renters.annual
  const stateFactor = stateAvgAnnual / stateData.national_averages.renters.annual

  const baseAnnual = (totalPropertyValue / 1000) * 0.85 * stateFactor

  const deductibleFactor =
    inputs.deductible === '250' ? 1.1 : inputs.deductible === '1000' ? 0.88 : 1.0
  const rcvFactor = inputs.coverageType === 'rcv' ? 1.15 : 1.0
  const liabilityAdder =
    inputs.liabilityLimit === '300000' ? 36 : inputs.liabilityLimit === '500000' ? 60 : 0
  const roommateAdder = inputs.hasRoommatesOnPolicy ? 48 : 0

  const annualEstimate = Math.round(
    baseAnnual * deductibleFactor * rcvFactor + liabilityAdder + roommateAdder,
  )

  return {
    annualEstimate,
    monthlyEstimate: Math.round(annualEstimate / 12),
    rangeLow: Math.round(annualEstimate * 0.8),
    rangeHigh: Math.round(annualEstimate * 1.2),
    totalPropertyValue,
    stateAverage: stateAvgAnnual,
    nationalAverage: stateData.national_averages.renters.annual,
    breakdownData: [
      { factor: 'Property value base', amount: Math.round(baseAnnual), multiplier: '1.0x' },
      {
        factor: 'Coverage type',
        amount: Math.round(baseAnnual * Math.abs(rcvFactor - 1)),
        multiplier: inputs.coverageType === 'rcv' ? 'RCV +15%' : 'ACV',
      },
      {
        factor: 'Deductible',
        amount: Math.round(baseAnnual * Math.abs(deductibleFactor - 1)),
        multiplier: `${deductibleFactor}x`,
      },
      { factor: 'Liability coverage', amount: liabilityAdder, multiplier: inputs.liabilityLimit },
    ],
  }
}
