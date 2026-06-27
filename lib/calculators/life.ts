export interface LifeInsuranceInputs {
  totalDebt: number
  annualIncome: number
  yearsToReplace: number
  mortgageBalance: number
  numberOfChildren: number
  educationCostPerChild: number
  existingCoverage: number
  age: number
  gender: 'male' | 'female'
  smoker: boolean
}

export interface LifeInsuranceResult {
  totalNeed: number
  coverageGap: number
  estimatedMonthlyPremium: number
  estimatedAnnualPremium: number
  dimeBreakdown: {
    debt: number
    incomeReplacement: number
    mortgage: number
    education: number
  }
}

type RateKey = 'male_nonsmoker' | 'female_nonsmoker' | 'male_smoker' | 'female_smoker'

const TERM_MONTHLY_RATES: Record<RateKey, Record<number, number>> = {
  male_nonsmoker: { 25: 22, 30: 25, 35: 32, 40: 48, 45: 75, 50: 125, 55: 205, 60: 350 },
  female_nonsmoker: { 25: 18, 30: 21, 35: 27, 40: 40, 45: 62, 50: 100, 55: 170, 60: 290 },
  male_smoker: { 25: 55, 30: 68, 35: 90, 40: 140, 45: 220, 50: 380, 55: 620, 60: 980 },
  female_smoker: { 25: 45, 30: 55, 35: 75, 40: 115, 45: 180, 50: 305, 55: 490, 60: 760 },
}

function getAgeKey(age: number): number {
  if (age < 28) return 25
  if (age < 33) return 30
  if (age < 38) return 35
  if (age < 43) return 40
  if (age < 48) return 45
  if (age < 53) return 50
  if (age < 58) return 55
  return 60
}

export function calculateLifeInsuranceNeeds(inputs: LifeInsuranceInputs): LifeInsuranceResult {
  const debt = inputs.totalDebt
  const incomeReplacement = inputs.annualIncome * inputs.yearsToReplace
  const mortgage = inputs.mortgageBalance
  const education = inputs.numberOfChildren * inputs.educationCostPerChild
  const totalNeed = debt + incomeReplacement + mortgage + education
  const coverageGap = Math.max(0, totalNeed - inputs.existingCoverage)

  const rateKey: RateKey = `${inputs.gender}_${inputs.smoker ? 'smoker' : 'nonsmoker'}`
  const ageKey = getAgeKey(inputs.age)
  const baseMonthlyPer500k = TERM_MONTHLY_RATES[rateKey][ageKey]
  const estimatedMonthlyPremium =
    coverageGap > 0 ? Math.round((coverageGap / 500_000) * baseMonthlyPer500k) : 0

  return {
    totalNeed,
    coverageGap,
    estimatedMonthlyPremium,
    estimatedAnnualPremium: estimatedMonthlyPremium * 12,
    dimeBreakdown: { debt, incomeReplacement, mortgage, education },
  }
}
