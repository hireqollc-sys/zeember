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
  const { monthly } = getStateValue(name, 'life')
  return {
    title: `Life Insurance Cost in ${name} (2026) | Zeember`,
    description: `Average term life insurance in ${name} costs around ${fmt(monthly)}/month for $500,000 in coverage. See how ${name} compares nationally.`,
    alternates: { canonical: `https://zeember.com/life-insurance/${params.state}` },
    openGraph: { title: `Life Insurance in ${name} | Zeember`, url: `https://zeember.com/life-insurance/${params.state}`, siteName: 'Zeember', type: 'website' },
  }
}

export default function LifeInsuranceStatePage({ params }: Props) {
  return <StateInsurancePage type="life" stateSlug={params.state} />
}
