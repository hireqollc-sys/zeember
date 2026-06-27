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
  const { annual } = getStateValue(name, 'home')
  return {
    title: `Home Insurance Cost in ${name} (2026) | Zeember`,
    description: `Average homeowners insurance in ${name} costs ${fmt(annual)}/year. See how ${name} ranks and what drives local home insurance rates.`,
    alternates: { canonical: `https://zeember.com/home-insurance/${params.state}` },
    openGraph: { title: `Home Insurance in ${name} | Zeember`, url: `https://zeember.com/home-insurance/${params.state}`, siteName: 'Zeember', type: 'website' },
  }
}

export default function HomeInsuranceStatePage({ params }: Props) {
  return <StateInsurancePage type="home" stateSlug={params.state} />
}
