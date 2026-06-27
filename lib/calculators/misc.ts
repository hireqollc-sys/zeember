// Miscellaneous calculator logic

// --- Gap insurance ---

export interface GapInputs {
  vehicleValue: number
  loanBalance: number
  loanTermMonths: number
  annualInterestRate: number
  vehicleAge: number
}

export interface GapResult {
  gapAmount: number
  vehicleValue: number
  loanBalance: number
  recommendGap: boolean
}

export function calculateGap(inputs: GapInputs): GapResult {
  const gapAmount = Math.max(0, inputs.loanBalance - inputs.vehicleValue)
  return {
    gapAmount,
    vehicleValue: inputs.vehicleValue,
    loanBalance: inputs.loanBalance,
    recommendGap: gapAmount > 0 && gapAmount > 1000,
  }
}

// --- SR-22 ---

export interface Sr22Inputs {
  state: string
  violationType: 'dui' | 'reckless' | 'uninsured' | 'license-suspension' | 'multiple-violations'
  currentPremium: number
  yearsRequired: number
}

export interface Sr22Result {
  newAnnualPremium: number
  annualIncrease: number
  percentIncrease: number
  filingFee: number
  totalExtraCost: number
  yearsRequired: number
}

const VIOLATION_MULTIPLIERS: Record<string, number> = {
  dui: 1.72,
  reckless: 1.52,
  uninsured: 1.36,
  'license-suspension': 1.42,
  'multiple-violations': 2.1,
}

export function calculateSr22(inputs: Sr22Inputs): Sr22Result {
  const mult = VIOLATION_MULTIPLIERS[inputs.violationType] ?? 1.5
  const newAnnualPremium = Math.round(inputs.currentPremium * mult)
  const annualIncrease = newAnnualPremium - inputs.currentPremium
  const percentIncrease = Math.round((mult - 1) * 100)
  const filingFee = 25
  const totalExtraCost = annualIncrease * inputs.yearsRequired + filingFee

  return { newAnnualPremium, annualIncrease, percentIncrease, filingFee, totalExtraCost, yearsRequired: inputs.yearsRequired }
}

// --- Teen driver insurance ---

export interface TeenDriverInputs {
  state: string
  teenAge: number
  teenGender: 'male' | 'female'
  currentAnnualPremium: number
  vehicleType: string
  goodStudentDiscount: boolean
  driversEdCompleted: boolean
}

export interface TeenDriverResult {
  newAnnualPremium: number
  annualIncrease: number
  percentIncrease: number
  discountsSaved: number
}

export function calculateTeenDriver(inputs: TeenDriverInputs): TeenDriverResult {
  const ageMult = inputs.teenAge <= 16 ? 2.8 : inputs.teenAge <= 17 ? 2.5 : inputs.teenAge <= 18 ? 2.2 : 1.8
  const genderMult = inputs.teenGender === 'male' ? 1.1 : 1.0
  const vehicleMult = inputs.vehicleType === 'sports-car' ? 1.3 : 1.0
  const grossAdd = Math.round(inputs.currentAnnualPremium * (ageMult - 1) * genderMult * vehicleMult)
  const discountRate = (inputs.goodStudentDiscount ? 0.08 : 0) + (inputs.driversEdCompleted ? 0.05 : 0)
  const discountsSaved = Math.round(grossAdd * discountRate)
  const annualIncrease = grossAdd - discountsSaved
  const newAnnualPremium = inputs.currentAnnualPremium + annualIncrease

  return { newAnnualPremium, annualIncrease, percentIncrease: Math.round((annualIncrease / inputs.currentAnnualPremium) * 100), discountsSaved }
}

// --- Umbrella insurance ---

export interface UmbrellaInputs {
  netWorth: number
  autoLiabilityLimit: number
  homeLiabilityLimit: number
  hasPool: boolean
  hasTeenDrivers: boolean
  ownsBusiness: boolean
  hasRentalProperty: boolean
}

export interface UmbrellaResult {
  recommendedCoverage: number
  estimatedAnnualPremium: number
  estimatedMonthlyPremium: number
  currentLiabilityCoverage: number
  netWorthAtRisk: number
}

export function calculateUmbrella(inputs: UmbrellaInputs): UmbrellaResult {
  const currentLiabilityCoverage = inputs.autoLiabilityLimit + inputs.homeLiabilityLimit
  const recommendedCoverage = Math.max(1_000_000, Math.ceil(inputs.netWorth / 1_000_000) * 1_000_000)
  const netWorthAtRisk = Math.max(0, inputs.netWorth - currentLiabilityCoverage)
  const basePremium = 200
  const riskAdder = (inputs.hasPool ? 30 : 0) + (inputs.hasTeenDrivers ? 40 : 0) + (inputs.hasRentalProperty ? 50 : 0)
  const additionalMillions = Math.max(0, recommendedCoverage / 1_000_000 - 1)
  const estimatedAnnualPremium = Math.round(basePremium + riskAdder + additionalMillions * 75)

  return {
    recommendedCoverage,
    estimatedAnnualPremium,
    estimatedMonthlyPremium: Math.round(estimatedAnnualPremium / 12),
    currentLiabilityCoverage,
    netWorthAtRisk,
  }
}

// --- Pet insurance ---

export interface PetInsuranceInputs {
  petType: 'dog' | 'cat' | 'other'
  breed: string
  age: number
  state: string
  reimbursementPercent: 70 | 80 | 90
  annualDeductible: 100 | 250 | 500
  annualLimit: '5000' | '10000' | 'unlimited'
}

export interface PetInsuranceResult {
  estimatedMonthlyPremium: number
  estimatedAnnualPremium: number
  rangeLow: number
  rangeHigh: number
}

const LARGE_BREEDS = ['golden retriever', 'labrador', 'german shepherd', 'great dane', 'rottweiler', 'husky', 'boxer', 'bulldog', 'mastiff', 'saint bernard']

export function calculatePetInsurance(inputs: PetInsuranceInputs): PetInsuranceResult {
  const base = inputs.petType === 'dog' ? 52 : inputs.petType === 'cat' ? 28 : 20
  const ageFactor = inputs.age <= 1 ? 0.85 : inputs.age >= 7 ? 1.6 : 1.0
  const breedFactor = LARGE_BREEDS.includes(inputs.breed.toLowerCase()) ? 1.2 : 1.0
  const reimbFactor = inputs.reimbursementPercent === 90 ? 1.15 : inputs.reimbursementPercent === 70 ? 0.9 : 1.0
  const deductFactor = inputs.annualDeductible === 100 ? 1.12 : inputs.annualDeductible === 500 ? 0.9 : 1.0
  const limitFactor = inputs.annualLimit === 'unlimited' ? 1.18 : inputs.annualLimit === '10000' ? 1.08 : 1.0
  const monthly = Math.round(base * ageFactor * breedFactor * reimbFactor * deductFactor * limitFactor)

  return {
    estimatedMonthlyPremium: monthly,
    estimatedAnnualPremium: monthly * 12,
    rangeLow: Math.round(monthly * 0.8),
    rangeHigh: Math.round(monthly * 1.25),
  }
}

// --- Bundling discount ---

export interface BundlingInputs {
  state: string
  annualAutoPremium: number
  annualHomePremium: number
  insurer: string
}

export interface BundlingResult {
  bundledAutoPremium: number
  bundledHomePremium: number
  estimatedAnnualSavings: number
  discountPercent: number
}

const BUNDLING_DISCOUNTS: Record<string, number> = {
  'state-farm': 0.17, allstate: 0.15, progressive: 0.12, nationwide: 0.20, farmers: 0.20, 'liberty-mutual': 0.12, other: 0.15,
}

export function calculateBundling(inputs: BundlingInputs): BundlingResult {
  const disc = BUNDLING_DISCOUNTS[inputs.insurer] ?? 0.15
  const bundledAutoPremium = Math.round(inputs.annualAutoPremium * (1 - disc))
  const bundledHomePremium = Math.round(inputs.annualHomePremium * (1 - disc))
  const estimatedAnnualSavings = (inputs.annualAutoPremium - bundledAutoPremium) + (inputs.annualHomePremium - bundledHomePremium)

  return { bundledAutoPremium, bundledHomePremium, estimatedAnnualSavings, discountPercent: Math.round(disc * 100) }
}

// --- Full coverage vs liability ---

export interface FullVsLiabilityInputs {
  state: string
  vehicleValue: number
  deductible: number
  fullCoveragePremium: number
  liabilityOnlyPremium: number
  isFinanced: boolean
}

export interface FullVsLiabilityResult {
  annualPremiumDifference: number
  maxBenefit: number
  breakEvenYears: number
  recommendFullCoverage: boolean
  isFinancedRequired: boolean
}

export function calculateFullVsLiability(inputs: FullVsLiabilityInputs): FullVsLiabilityResult {
  const annualPremiumDifference = inputs.fullCoveragePremium - inputs.liabilityOnlyPremium
  const maxBenefit = Math.max(0, inputs.vehicleValue - inputs.deductible)
  const breakEvenYears = annualPremiumDifference > 0 ? Math.round((maxBenefit / annualPremiumDifference) * 10) / 10 : 99
  const recommendFullCoverage = inputs.isFinanced || inputs.vehicleValue >= 8000 || breakEvenYears <= 3

  return { annualPremiumDifference, maxBenefit, breakEvenYears, recommendFullCoverage, isFinancedRequired: inputs.isFinanced }
}

// --- Liability coverage ---

export interface LiabilityCoverageInputs {
  totalAssets: number
  annualIncome: number
  hasPool: boolean
  hasTeenDrivers: boolean
  hasDog: boolean
  ownsRentalProperty: boolean
  profession: 'low-risk' | 'moderate-risk' | 'high-risk'
}

export interface LiabilityCoverageResult {
  recommendedLiabilityCoverage: number
  assetsAtRisk: number
  standardPolicyCoverage: number
  needsUmbrella: boolean
}

export function calculateLiabilityCoverage(inputs: LiabilityCoverageInputs): LiabilityCoverageResult {
  const riskBonus = (inputs.hasPool ? 200000 : 0) + (inputs.hasTeenDrivers ? 100000 : 0) + (inputs.hasDog ? 100000 : 0) + (inputs.ownsRentalProperty ? 300000 : 0) + (inputs.profession === 'high-risk' ? 300000 : inputs.profession === 'moderate-risk' ? 100000 : 0)
  const recommendedLiabilityCoverage = Math.max(300000, Math.ceil((inputs.totalAssets + riskBonus) / 100000) * 100000)
  const standardPolicyCoverage = 400000
  const needsUmbrella = recommendedLiabilityCoverage > standardPolicyCoverage

  return {
    recommendedLiabilityCoverage,
    assetsAtRisk: inputs.totalAssets,
    standardPolicyCoverage,
    needsUmbrella,
  }
}

// --- Disability insurance ---

export interface DisabilityInputs {
  annualIncome: number
  monthlyExpenses: number
  existingCoverage: number
  age: number
  occupation: 'professional' | 'clerical' | 'manual-light' | 'manual-heavy'
  eliminationPeriod: '30' | '60' | '90' | '180'
  benefitPeriod: '2-years' | '5-years' | 'to-age-65'
  gender: 'male' | 'female'
}

export interface DisabilityResult {
  recommendedMonthlyBenefit: number
  estimatedMonthlyPremium: number
  coverageGapVsExpenses: number
}

export function calculateDisability(inputs: DisabilityInputs): DisabilityResult {
  const monthlyIncome = Math.round(inputs.annualIncome / 12)
  const maxBenefit = Math.round(monthlyIncome * 0.65)
  const recommendedMonthlyBenefit = Math.max(0, maxBenefit - inputs.existingCoverage)
  const coverageGapVsExpenses = Math.max(0, inputs.monthlyExpenses - recommendedMonthlyBenefit)

  const ageRate = inputs.age < 35 ? 0.018 : inputs.age < 45 ? 0.025 : inputs.age < 55 ? 0.035 : 0.05
  const occFactor = inputs.occupation === 'professional' ? 0.8 : inputs.occupation === 'clerical' ? 1.0 : inputs.occupation === 'manual-light' ? 1.3 : 1.7
  const elimFactor = inputs.eliminationPeriod === '90' || inputs.eliminationPeriod === '180' ? 0.85 : inputs.eliminationPeriod === '60' ? 0.92 : 1.0
  const benefitFactor = inputs.benefitPeriod === 'to-age-65' ? 1.2 : inputs.benefitPeriod === '5-years' ? 1.0 : 0.8
  const genderFactor = inputs.gender === 'female' ? 1.1 : 1.0

  const estimatedMonthlyPremium = Math.round(recommendedMonthlyBenefit * ageRate * occFactor * elimFactor * benefitFactor * genderFactor / 12)

  return { recommendedMonthlyBenefit, estimatedMonthlyPremium, coverageGapVsExpenses }
}

// --- Travel insurance ---

export interface TravelInsuranceInputs {
  tripCost: number
  tripDurationDays: number
  destination: 'domestic' | 'canada-mexico' | 'europe' | 'asia-pacific' | 'latin-america' | 'africa-middle-east'
  numberOfTravelers: number
  primaryAge: number
  coverageLevel: 'basic' | 'standard' | 'comprehensive'
  cancelForAnyReason: 'yes' | 'no'
}

export interface TravelInsuranceResult {
  estimatedPremium: number
  percentOfTripCost: number
  perTravelerCost: number
}

const DEST_FACTOR: Record<string, number> = {
  domestic: 1.0, 'canada-mexico': 1.05, europe: 1.1, 'asia-pacific': 1.15, 'latin-america': 1.1, 'africa-middle-east': 1.2,
}

export function calculateTravelInsurance(inputs: TravelInsuranceInputs): TravelInsuranceResult {
  const baseRate = inputs.coverageLevel === 'basic' ? 0.04 : inputs.coverageLevel === 'comprehensive' ? 0.085 : 0.06
  const destFactor = DEST_FACTOR[inputs.destination] ?? 1.1
  const ageFactor = inputs.primaryAge >= 70 ? 1.5 : inputs.primaryAge >= 60 ? 1.2 : 1.0
  const cfar = inputs.cancelForAnyReason === 'yes' ? 1.5 : 1.0
  const estimatedPremium = Math.round(inputs.tripCost * baseRate * destFactor * ageFactor * cfar)

  return {
    estimatedPremium,
    percentOfTripCost: Math.round((estimatedPremium / inputs.tripCost) * 100),
    perTravelerCost: Math.round(estimatedPremium / inputs.numberOfTravelers),
  }
}

// --- Flood insurance ---

export interface FloodInsuranceInputs {
  state: string
  floodZone: 'X' | 'AE' | 'A' | 'VE' | 'V'
  buildingCoverage: number
  contentsCoverage: number
  buildingType: 'single-family' | 'condo' | 'commercial'
  firstFloorElevation: 'below-bfe' | 'at-bfe' | 'above-bfe'
}

export interface FloodInsuranceResult {
  estimatedAnnualPremium: number
  buildingPremium: number
  contentsPremium: number
  floodZone: string
}

const FLOOD_RATES: Record<string, number> = { X: 0.002, AE: 0.012, A: 0.010, VE: 0.020, V: 0.018 }
const ELEV_FACTOR: Record<string, number> = { 'below-bfe': 1.4, 'at-bfe': 1.0, 'above-bfe': 0.65 }

export function calculateFloodInsurance(inputs: FloodInsuranceInputs): FloodInsuranceResult {
  const rate = FLOOD_RATES[inputs.floodZone] ?? 0.010
  const elevFactor = ELEV_FACTOR[inputs.firstFloorElevation] ?? 1.0
  const buildingPremium = Math.round(inputs.buildingCoverage * rate * elevFactor)
  const contentsPremium = Math.round(inputs.contentsCoverage * rate * elevFactor * 0.7)

  return {
    estimatedAnnualPremium: buildingPremium + contentsPremium,
    buildingPremium,
    contentsPremium,
    floodZone: inputs.floodZone,
  }
}

// --- Personal property value ---

export interface PersonalPropertyInputs {
  electronics: number
  furniture: number
  clothing: number
  jewelry: number
  appliances: number
  sportsGear: number
  toolsHobby: number
  other: number
}

export interface PersonalPropertyResult {
  totalValue: number
  recommendedCoverage: number
  estimatedAnnualCostAdd: number
  highValueItems: boolean
}

export function calculatePersonalProperty(inputs: PersonalPropertyInputs): PersonalPropertyResult {
  const totalValue = Object.values(inputs).reduce((a, b) => a + b, 0)
  const recommendedCoverage = Math.ceil(totalValue / 5000) * 5000
  const estimatedAnnualCostAdd = Math.round(recommendedCoverage * 0.008)
  const highValueItems = inputs.jewelry > 1500

  return { totalValue, recommendedCoverage, estimatedAnnualCostAdd, highValueItems }
}

// --- Home insurance coverage ---

export interface HomeCoverageInputs {
  state: string
  squareFootage: number
  constructionType: 'frame' | 'masonry' | 'manufactured'
  finishQuality: 'basic' | 'standard' | 'custom'
  yearBuilt: number
  personalPropertyValue: number
  liabilityDesired: string
}

export interface HomeCoverageResult {
  recommendedDwellingCoverage: number
  costPerSqFt: number
  personalPropertyCoverage: number
}

const REBUILD_BASE: Record<string, number> = { frame: 165, masonry: 190, manufactured: 100 }
const FINISH_MULT: Record<string, number> = { basic: 0.85, standard: 1.0, custom: 1.35 }

export function calculateHomeCoverage(inputs: HomeCoverageInputs): HomeCoverageResult {
  const base = REBUILD_BASE[inputs.constructionType] ?? 165
  const finishMult = FINISH_MULT[inputs.finishQuality] ?? 1.0
  const ageFactor = inputs.yearBuilt < 1970 ? 1.15 : inputs.yearBuilt < 1990 ? 1.05 : 1.0
  const costPerSqFt = Math.round(base * finishMult * ageFactor)
  const recommendedDwellingCoverage = Math.ceil(inputs.squareFootage * costPerSqFt / 10000) * 10000
  const personalPropertyCoverage = Math.ceil(inputs.personalPropertyValue / 5000) * 5000

  return { recommendedDwellingCoverage, costPerSqFt, personalPropertyCoverage }
}

// --- Burial insurance ---

export interface BurialInsuranceInputs {
  state: string
  age: number
  gender: 'male' | 'female'
  health: 'excellent' | 'good' | 'fair' | 'poor'
  coverageAmount: number
  tobaccoUse: boolean
}

export interface BurialInsuranceResult {
  estimatedMonthlyPremium: number
  estimatedAnnualPremium: number
  coverageAmount: number
}

export function calculateBurialInsurance(inputs: BurialInsuranceInputs): BurialInsuranceResult {
  const baseRate = inputs.gender === 'male'
    ? inputs.age < 60 ? 0.0028 : inputs.age < 70 ? 0.0042 : inputs.age < 80 ? 0.0068 : 0.011
    : inputs.age < 60 ? 0.0022 : inputs.age < 70 ? 0.0033 : inputs.age < 80 ? 0.0054 : 0.009
  const healthFactor = inputs.health === 'poor' ? 1.4 : inputs.health === 'fair' ? 1.2 : inputs.health === 'excellent' ? 0.9 : 1.0
  const tobaccoFactor = inputs.tobaccoUse ? 1.5 : 1.0
  const monthly = Math.round((inputs.coverageAmount * baseRate * healthFactor * tobaccoFactor) / 12)

  return { estimatedMonthlyPremium: monthly, estimatedAnnualPremium: monthly * 12, coverageAmount: inputs.coverageAmount }
}

// --- Insurance score impact ---

export interface InsuranceScoreInputs {
  state: string
  insuranceType: 'auto' | 'home' | 'renters'
  creditScore: 'excellent' | 'good' | 'fair' | 'poor' | 'no-credit'
  paymentHistory: 'excellent' | 'good' | 'fair' | 'poor'
  claimsHistory: 'none' | 'one' | 'two-plus'
  yearsInsured: 'under-1' | '1-3' | '3-10' | 'over-10'
}

export interface InsuranceScoreResult {
  premiumMultiplier: number
  scoreTier: string
  creditBanState: boolean
  improvementTips: string[]
}

const CREDIT_BAN_STATES = ['California', 'Hawaii', 'Massachusetts']

export function calculateInsuranceScore(inputs: InsuranceScoreInputs): InsuranceScoreResult {
  const creditBanState = inputs.insuranceType === 'auto' && CREDIT_BAN_STATES.includes(inputs.state)

  let mult = 1.0
  if (!creditBanState) {
    const creditMult: Record<string, number> = { excellent: 0.82, good: 0.92, fair: 1.15, poor: 1.45, 'no-credit': 1.20 }
    mult *= creditMult[inputs.creditScore] ?? 1.0
  }
  const histMult: Record<string, number> = { excellent: 0.97, good: 1.0, fair: 1.08, poor: 1.22 }
  mult *= histMult[inputs.paymentHistory] ?? 1.0
  const claimsMult: Record<string, number> = { none: 1.0, one: 1.18, 'two-plus': 1.45 }
  mult *= claimsMult[inputs.claimsHistory] ?? 1.0
  const yearsMult: Record<string, number> = { 'under-1': 1.12, '1-3': 1.04, '3-10': 1.0, 'over-10': 0.96 }
  mult *= yearsMult[inputs.yearsInsured] ?? 1.0

  const creditTier: Record<string, string> = { excellent: 'Exceptional', good: 'Good', fair: 'Fair', poor: 'Poor', 'no-credit': 'No history' }

  const tips: string[] = []
  if (inputs.creditScore === 'poor' || inputs.creditScore === 'fair') tips.push('Improve credit score — pay down balances, pay on time')
  if (inputs.paymentHistory !== 'excellent') tips.push('Pay all insurance premiums on time to avoid lapse surcharges')
  if (inputs.claimsHistory !== 'none') tips.push('Avoid small claims — pay minor damages out of pocket when possible')
  if (inputs.yearsInsured === 'under-1') tips.push('Maintain continuous coverage — a lapse triggers surcharges for 3-5 years')
  if (tips.length === 0) tips.push('Your profile is strong — shop around at renewal to ensure you have the best rate')

  return {
    premiumMultiplier: Math.round(mult * 100) / 100,
    scoreTier: creditBanState ? 'Credit scoring prohibited in your state' : creditTier[inputs.creditScore] ?? 'Average',
    creditBanState,
    improvementTips: tips,
  }
}
