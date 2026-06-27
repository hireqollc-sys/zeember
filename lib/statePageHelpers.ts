import stateAverages from '@/lib/data/state-averages.json'
import { STATE_NEIGHBORS } from '@/lib/stateNeighbors'

export type InsuranceType = 'auto' | 'home' | 'renters' | 'life'
export type StateKey = keyof typeof stateAverages.states

export function slugToName(slug: string): StateKey | null {
  const stateKeys = Object.keys(stateAverages.states) as StateKey[]
  return stateKeys.find(k => slugify(k) === slug) ?? null
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/ /g, '-').replace(/\./g, '')
}

export function getStateValue(stateKey: StateKey, type: InsuranceType): { annual: number; monthly: number; rank: number } {
  const data = stateAverages.states[stateKey]
  if (type === 'auto') return { annual: data.auto.annual, monthly: data.auto.monthly, rank: data.auto.rank }
  if (type === 'home') return { annual: data.home.annual, monthly: data.home.monthly, rank: data.home.rank }
  if (type === 'renters') return { annual: data.renters.annual, monthly: data.renters.monthly, rank: data.renters.rank }
  return { annual: data.life_term_500k_40yr_male.monthly * 12, monthly: data.life_term_500k_40yr_male.monthly, rank: data.life_term_500k_40yr_male.rank }
}

export function getNationalAvg(type: InsuranceType): number {
  if (type === 'auto') return stateAverages.national_averages.auto.annual
  if (type === 'home') return stateAverages.national_averages.home.annual
  if (type === 'renters') return stateAverages.national_averages.renters.annual
  return stateAverages.national_averages.life_term_500k_40yr_male.monthly * 12
}

export function getNeighborData(stateName: string, type: InsuranceType) {
  const neighbors = STATE_NEIGHBORS[stateName] ?? []
  return neighbors.slice(0, 5).map(n => {
    const key = n as StateKey
    if (!stateAverages.states[key]) return null
    const { annual } = getStateValue(key, type)
    return { name: n, slug: slugify(n), annual }
  }).filter(Boolean) as { name: string; slug: string; annual: number }[]
}

export function getTypeLabel(type: InsuranceType): string {
  return type === 'auto' ? 'auto insurance' : type === 'home' ? 'home insurance' : type === 'renters' ? 'renters insurance' : 'life insurance (term, $500k)'
}

export function getTypeSlug(type: InsuranceType): string {
  return `${type}-insurance`
}

export function getCalculatorHref(type: InsuranceType): string {
  return type === 'auto' ? '/auto-insurance-calculator'
    : type === 'home' ? '/home-insurance-calculator'
    : type === 'renters' ? '/renters-insurance-calculator'
    : '/how-much-life-insurance-do-i-need'
}

export function getStateInsuranceFacts(stateName: string, type: InsuranceType, annual: number, nationalAvg: number): { title: string; body: string } {
  const rel = annual > nationalAvg ? 'above' : 'below'
  const pct = Math.abs(((annual - nationalAvg) / nationalAvg) * 100).toFixed(0)

  const HIGH_RISK_AUTO = ['Florida', 'Michigan', 'Louisiana', 'New York', 'California', 'New Jersey', 'Colorado', 'Nevada']
  const HIGH_RISK_HOME = ['Florida', 'Texas', 'Louisiana', 'Oklahoma', 'Kansas', 'Colorado', 'Nebraska', 'Iowa', 'Missouri', 'Mississippi', 'Alabama']
  const WILDFIRE_STATES = ['California', 'Oregon', 'Washington', 'Colorado', 'Montana', 'Idaho', 'Utah', 'Arizona']
  const HURRICANE_STATES = ['Florida', 'Louisiana', 'Texas', 'Georgia', 'South Carolina', 'North Carolina', 'Virginia', 'Mississippi', 'Alabama']

  if (type === 'auto') {
    const isHighRisk = HIGH_RISK_AUTO.includes(stateName)
    if (isHighRisk) {
      return {
        title: `Why is auto insurance expensive in ${stateName}?`,
        body: `${stateName} sits ${pct}% above the national average for auto insurance, driven by factors including higher rates of uninsured drivers, dense urban traffic, frequent accident claims, and litigation costs that push insurer payouts up. The state minimum coverage requirements and local injury protection laws also shape the baseline rate.\n\nDrivers in ${stateName} can still find competitive rates by shopping multiple insurers, maintaining a clean driving record, and considering telematics programs from Progressive or State Farm that reward safe driving with discounts of up to 30%.`,
      }
    }
    return {
      title: `Auto insurance in ${stateName}`,
      body: `${stateName} sits ${pct}% ${rel} the national average for auto insurance, reflecting the state's lower population density, fewer severe weather events, and lower-than-average litigation rates. Drivers in ${stateName} tend to benefit from competitive rates across major insurers.\n\nAs with any state, your individual rate depends on your driving record, vehicle, coverage level, and the specific insurer you choose. Comparing multiple quotes can still save ${stateName} drivers hundreds of dollars annually.`,
    }
  }

  if (type === 'home') {
    const isHurricane = HURRICANE_STATES.includes(stateName)
    const isWildfire = WILDFIRE_STATES.includes(stateName)
    if (isHurricane) {
      return {
        title: `Why is home insurance expensive in ${stateName}?`,
        body: `${stateName} faces elevated home insurance costs due to significant hurricane and wind storm exposure. Insurers price policies to account for the probability and severity of storm damage, which pushes premiums ${pct}% above the national average in ${stateName}.\n\nHomeowners in ${stateName} should note that standard homeowners policies may not cover flood damage — separate flood insurance through the NFIP or private carriers is typically required for comprehensive protection in hurricane-prone areas.`,
      }
    }
    if (isWildfire) {
      return {
        title: `Home insurance in ${stateName}: wildfire risk`,
        body: `${stateName} homeowners pay ${pct}% ${rel} the national average for home insurance, with wildfire risk being a significant pricing factor in many parts of the state. Some insurers have reduced or eliminated coverage in high-risk fire zones, making it important to shop carefully and consider state-backed FAIR Plan options if private coverage is difficult to obtain.\n\nHomeowners can reduce premiums through defensible space improvements, fire-resistant roofing materials, and a clean claims history.`,
      }
    }
    return {
      title: `Home insurance in ${stateName}`,
      body: `${stateName} homeowners pay ${pct}% ${rel} the national average for homeowners insurance. The state benefits from relatively lower natural disaster exposure compared to hurricane belt or wildfire-prone states, which contributes to more competitive rates.\n\nYour specific premium in ${stateName} will depend on your home value, year built, construction type, deductible choice, and coverage level. Comparing three or more quotes at each renewal is the most reliable way to ensure you are not overpaying.`,
    }
  }

  if (type === 'renters') {
    return {
      title: `Renters insurance in ${stateName}`,
      body: `Renters in ${stateName} pay approximately ${pct}% ${rel} the national average for renters insurance. At just ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(annual / 12))}/month for most renters, this is one of the most cost-effective types of insurance available. It covers personal belongings, personal liability, and additional living expenses if your rental becomes uninhabitable.\n\nMost renters insurance policies include $100,000 in personal liability coverage — protection if a guest is injured in your apartment or if you accidentally damage a neighbor's property. Adding renters insurance to an existing auto policy typically triggers a bundling discount that can offset part of the cost.`,
    }
  }

  return {
    title: `Term life insurance rates in ${stateName}`,
    body: `Term life insurance rates in ${stateName} are ${pct}% ${rel} the national average. Unlike auto and home insurance, life insurance rates are driven primarily by individual health factors, age, and lifestyle rather than geographic location — so state-level averages for life insurance are less meaningful than for property and auto coverages.\n\nThe figures shown represent a benchmark rate for a healthy 40-year-old male with $500,000 in 20-year term coverage. Your actual premium will vary based on your age, health, occupation, and the specific insurer you choose. Locking in a term life policy at a younger age significantly reduces your lifetime cost.`,
  }
}

export function generateStaticParamsForType() {
  const stateKeys = Object.keys(stateAverages.states) as StateKey[]
  return stateKeys.map(k => ({ state: slugify(k) }))
}
