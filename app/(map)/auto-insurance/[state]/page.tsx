import type { Metadata } from 'next'
import StateInsurancePage from '@/components/StateInsurancePage'
import { slugToName, getStateValue, generateStaticParamsForType } from '@/lib/statePageHelpers'

interface Props { params: { state: string } }

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export function generateStaticParams() {
  return generateStaticParamsForType()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = slugToName(params.state)
  if (!name) return {}
  const { annual } = getStateValue(name, 'auto')
  return {
    title: `Car Insurance Cost in ${name} (2026) | Zeember`,
    description: `Average car insurance in ${name} costs ${fmt(annual)}/year. See how ${name} ranks nationally and what drives local auto insurance rates.`,
    alternates: { canonical: `https://zeember.com/auto-insurance/${params.state}` },
    openGraph: { title: `Car Insurance in ${name} | Zeember`, url: `https://zeember.com/auto-insurance/${params.state}`, siteName: 'Zeember', type: 'website' },
  }
}

export default function AutoInsuranceStatePage({ params }: Props) {
  return <StateInsurancePage type="auto" stateSlug={params.state} />
}
