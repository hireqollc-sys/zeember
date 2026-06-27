// Health insurance calculators: deductible, HSA, OOP max, COBRA, ACA subsidy

// --- Health deductible ---

export interface HealthDeductibleInputs {
  annualDeductible: number
  coinsurancePercent: number
  outOfPocketMax: number
  monthlyPremium: number
  expectedMedicalCosts: 'minimal' | 'low' | 'moderate' | 'high' | 'very-high'
  planType: 'hdhp' | 'ppo' | 'hmo' | 'epo'
}

export interface HealthDeductibleResult {
  estimatedAnnualCost: number
  premiumTotal: number
  outOfPocketCosts: number
  recommendHdhp: boolean
  breakdownData: Array<{ factor: string; amount: number; multiplier: string }>
}

const EXPECTED_COSTS: Record<string, number> = {
  minimal: 500,
  low: 1500,
  moderate: 4000,
  high: 10000,
  'very-high': 25000,
}

export function calculateHealthDeductible(inputs: HealthDeductibleInputs): HealthDeductibleResult {
  const expectedCosts = EXPECTED_COSTS[inputs.expectedMedicalCosts]
  const premiumTotal = inputs.monthlyPremium * 12

  let outOfPocketCosts = 0
  if (expectedCosts <= inputs.annualDeductible) {
    outOfPocketCosts = expectedCosts
  } else {
    const afterDeductible = expectedCosts - inputs.annualDeductible
    const coinsurance = Math.min(
      afterDeductible * (inputs.coinsurancePercent / 100),
      inputs.outOfPocketMax - inputs.annualDeductible,
    )
    outOfPocketCosts = Math.min(inputs.annualDeductible + coinsurance, inputs.outOfPocketMax)
  }

  const estimatedAnnualCost = premiumTotal + outOfPocketCosts
  const recommendHdhp = expectedCosts < inputs.annualDeductible

  return {
    estimatedAnnualCost,
    premiumTotal,
    outOfPocketCosts,
    recommendHdhp,
    breakdownData: [
      { factor: 'Annual premiums', amount: premiumTotal, multiplier: '12 months' },
      { factor: 'Deductible paid', amount: Math.min(expectedCosts, inputs.annualDeductible), multiplier: 'Out of pocket' },
      { factor: 'Coinsurance', amount: Math.max(0, outOfPocketCosts - Math.min(expectedCosts, inputs.annualDeductible)), multiplier: `${inputs.coinsurancePercent}%` },
    ],
  }
}

// --- HSA contribution ---

export interface HsaInputs {
  coverageType: 'self' | 'family'
  age: number
  taxBracket: number
  stateIncomeTax: number
  monthsEligible: number
  currentContribution: number
}

export interface HsaResult {
  maxContribution: number
  additionalContributionAvailable: number
  estimatedTaxSavings: number
  effectiveCostOfMaxContribution: number
}

const HSA_LIMITS_2026 = { self: 4300, family: 8550, catchUp: 1000 }

export function calculateHsa(inputs: HsaInputs): HsaResult {
  const baseLimit = HSA_LIMITS_2026[inputs.coverageType]
  const catchUp = inputs.age >= 55 ? HSA_LIMITS_2026.catchUp : 0
  const maxContribution = Math.round(((baseLimit + catchUp) / 12) * inputs.monthsEligible)
  const additionalContributionAvailable = Math.max(0, maxContribution - inputs.currentContribution)
  const combinedTaxRate = (inputs.taxBracket + inputs.stateIncomeTax) / 100
  const estimatedTaxSavings = Math.round(maxContribution * combinedTaxRate)
  const effectiveCostOfMaxContribution = maxContribution - estimatedTaxSavings

  return {
    maxContribution,
    additionalContributionAvailable,
    estimatedTaxSavings,
    effectiveCostOfMaxContribution,
  }
}

// --- Out-of-pocket max estimator ---

export interface OopInputs {
  annualDeductible: number
  coinsurancePercent: number
  outOfPocketMax: number
  monthlyPremium: number
  expectedAnnualMedicalBills: number
}

export interface OopResult {
  estimatedOopCosts: number
  monthsToHitMax: number | null
  totalAnnualCost: number
  percentOfMaxReached: number
}

export function calculateOopMax(inputs: OopInputs): OopResult {
  let oop = 0

  if (inputs.expectedAnnualMedicalBills <= inputs.annualDeductible) {
    oop = inputs.expectedAnnualMedicalBills
  } else {
    const afterDeductible = inputs.expectedAnnualMedicalBills - inputs.annualDeductible
    const coinsurance = afterDeductible * (inputs.coinsurancePercent / 100)
    oop = Math.min(inputs.annualDeductible + coinsurance, inputs.outOfPocketMax)
  }

  const percentOfMaxReached = Math.min(100, Math.round((oop / inputs.outOfPocketMax) * 100))

  const monthlySpend = inputs.expectedAnnualMedicalBills / 12
  let cumulative = 0
  let monthsToHit: number | null = null
  for (let m = 1; m <= 12; m++) {
    cumulative += monthlySpend
    const oopSoFar =
      cumulative <= inputs.annualDeductible
        ? cumulative
        : Math.min(
            inputs.annualDeductible + (cumulative - inputs.annualDeductible) * (inputs.coinsurancePercent / 100),
            inputs.outOfPocketMax,
          )
    if (oopSoFar >= inputs.outOfPocketMax) {
      monthsToHit = m
      break
    }
  }

  return {
    estimatedOopCosts: Math.round(oop),
    monthsToHitMax: monthsToHit,
    totalAnnualCost: Math.round(inputs.monthlyPremium * 12 + oop),
    percentOfMaxReached,
  }
}

// --- COBRA cost calculator ---

export interface CobraInputs {
  employeeMonthlyContribution: number
  employerMonthlyContribution: number
  coverageType: 'employee-only' | 'employee-spouse' | 'family'
  state: string
  annualIncome: number
  age: number
}

export interface CobraResult {
  cobraMonthlyPremium: number
  cobraAnnualPremium: number
  estimatedAcaMonthly: number
  savingsWithAca: number
  recommendAca: boolean
}

export function calculateCobra(inputs: CobraInputs): CobraResult {
  const totalPremium = inputs.employeeMonthlyContribution + inputs.employerMonthlyContribution
  const cobraMonthlyPremium = Math.round(totalPremium * 1.02)
  const cobraAnnualPremium = cobraMonthlyPremium * 12

  // Rough ACA estimate based on age and income
  const ageBase = inputs.age < 30 ? 220 : inputs.age < 40 ? 320 : inputs.age < 50 ? 440 : 600
  const familyMultiplier =
    inputs.coverageType === 'family' ? 2.8 : inputs.coverageType === 'employee-spouse' ? 1.9 : 1.0

  // FPL 2026 individual: $15,060
  const fpl = inputs.coverageType === 'employee-only' ? 15060 : inputs.coverageType === 'employee-spouse' ? 20440 : 30900
  const fplPercent = inputs.annualIncome / fpl
  const subsidyFactor = fplPercent < 1.5 ? 0.05 : fplPercent < 2.5 ? 0.2 : fplPercent < 4 ? 0.5 : 1.0

  const estimatedAcaMonthly = Math.round(ageBase * familyMultiplier * subsidyFactor)
  const savingsWithAca = Math.max(0, cobraMonthlyPremium - estimatedAcaMonthly)

  return {
    cobraMonthlyPremium,
    cobraAnnualPremium,
    estimatedAcaMonthly,
    savingsWithAca,
    recommendAca: estimatedAcaMonthly < cobraMonthlyPremium * 0.8,
  }
}

// --- ACA subsidy estimator ---

export interface AcaInputs {
  state: string
  householdSize: number
  annualHouseholdIncome: number
  ages: number[]
  tobaccoUse: boolean
}

export interface AcaResult {
  fplPercent: number
  estimatedSubsidyMonthly: number
  estimatedPremiumAfterSubsidy: number
  estimatedBenchmarkPremium: number
  eligibleForSubsidy: boolean
}

const FPL_2026_BASE = 15060
const FPL_2026_PER_PERSON = 5380

export function calculateAcaSubsidy(inputs: AcaInputs): AcaResult {
  const fpl = FPL_2026_BASE + (inputs.householdSize - 1) * FPL_2026_PER_PERSON
  const fplPercent = Math.round((inputs.annualHouseholdIncome / fpl) * 100)

  const avgAge =
    inputs.ages.length > 0
      ? inputs.ages.reduce((a, b) => a + b, 0) / inputs.ages.length
      : 40
  const ageBase = avgAge < 30 ? 260 : avgAge < 40 ? 380 : avgAge < 50 ? 520 : 720
  const familySize = inputs.ages.length || inputs.householdSize
  const estimatedBenchmarkPremium = Math.round(ageBase * Math.min(familySize, 3))

  const eligibleForSubsidy = fplPercent >= 100

  let estimatedSubsidyMonthly = 0
  if (eligibleForSubsidy) {
    if (fplPercent < 150) {
      estimatedSubsidyMonthly = Math.round(estimatedBenchmarkPremium * 0.97)
    } else if (fplPercent < 200) {
      estimatedSubsidyMonthly = Math.round(estimatedBenchmarkPremium * 0.88)
    } else if (fplPercent < 300) {
      estimatedSubsidyMonthly = Math.round(estimatedBenchmarkPremium * 0.68)
    } else if (fplPercent < 400) {
      estimatedSubsidyMonthly = Math.round(estimatedBenchmarkPremium * 0.42)
    } else {
      const oop = (fplPercent / 100) * fpl * 0.085 / 12
      estimatedSubsidyMonthly = Math.max(0, Math.round(estimatedBenchmarkPremium - oop))
    }
  }

  return {
    fplPercent,
    estimatedSubsidyMonthly,
    estimatedPremiumAfterSubsidy: Math.max(0, estimatedBenchmarkPremium - estimatedSubsidyMonthly),
    estimatedBenchmarkPremium,
    eligibleForSubsidy,
  }
}
