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
  const { annual } = getStateValue(name, 'renters')
  return {
    title: `Renters Insurance Cost in ${name} (2026) | Zeember`,
    description: `Average renters insurance in ${name} costs ${fmt(annual)}/year. See how ${name} compares nationally and what coverage you get.`,
    alternates: { canonical: `https://zeember.com/renters-insurance/${params.state}` },
    openGraph: { title: `Renters Insurance in ${name} | Zeember`, url: `https://zeember.com/renters-insurance/${params.state}`, siteName: 'Zeember', type: 'website' },
  }
}

export default function RentersInsuranceStatePage({ params }: Props) {
  return <StateInsurancePage type="renters" stateSlug={params.state} />
}
