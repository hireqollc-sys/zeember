import type { Metadata } from 'next'
import { Home, Droplets, Package } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import HomeCalc from './HomeCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Home Insurance Calculator — Estimate Your Annual Cost',
  description: 'Estimate your homeowners insurance cost based on your home value, location, and coverage level. Free, no personal info required.',
  alternates: { canonical: 'https://zeember.com/home-insurance-calculator' },
  openGraph: { title: 'Home Insurance Calculator | Zeember', url: 'https://zeember.com/home-insurance-calculator' },
}

const faqItems: FAQItem[] = [
  {
    question: 'What does homeowners insurance actually cover?',
    answer: 'A standard HO-3 policy covers four main areas: dwelling (the structure of your home), other structures (fences, detached garages), personal property (your belongings), and personal liability (if someone is injured on your property). It also covers additional living expenses if your home becomes uninhabitable after a covered loss. Flooding and earthquakes are NOT covered by standard homeowners insurance — those require separate policies.',
  },
  {
    question: 'How is my home insurance premium calculated?',
    answer: 'Insurers base your premium on rebuild cost (not market value), location risk, home age and construction, deductible amount, claims history, and credit score (in most states). The most expensive states for home insurance are Oklahoma, Kansas, Florida, and Texas — primarily due to catastrophic weather risk. A home in a coastal Florida flood zone can cost 3–5x the national average to insure.',
  },
  {
    question: 'What is dwelling coverage vs personal property coverage?',
    answer: 'Dwelling coverage pays to rebuild the structure of your home. Personal property coverage pays to replace your belongings (furniture, electronics, clothing, appliances). Dwelling coverage should equal your home\'s rebuild cost, which may differ significantly from its market value. Personal property is typically set at 50–70% of dwelling coverage, but you can adjust it based on a home inventory.',
  },
  {
    question: 'Do I need flood insurance separately?',
    answer: 'Yes. Standard homeowners insurance does not cover flood damage — not even an inch of water from heavy rain. Flood insurance is available through the National Flood Insurance Program (NFIP) and private carriers. If you live in a high-risk flood zone and have a federally-backed mortgage, flood insurance is required by law. Even homes outside designated flood zones flood — about 25% of flood claims come from low-to-moderate risk areas.',
  },
  {
    question: 'How much home insurance do I actually need?',
    answer: 'You need enough dwelling coverage to fully rebuild your home at current construction costs in your area. This is typically different from what you paid for the home or what it would sell for today. Construction costs have risen significantly — a home bought for $300,000 may cost $400,000+ to rebuild. Most insurers offer an extended replacement cost endorsement that provides a 20–50% buffer above your coverage limit.',
  },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Flood Insurance', href: '/flood-insurance-calculator', description: 'Estimate NFIP or private flood insurance cost based on your flood zone.', icon: Droplets },
  { title: 'Home Coverage Calculator', href: '/home-insurance-coverage-calculator', description: 'Calculate your actual rebuild cost — not the same as market value.', icon: Home },
  { title: 'Bundling Discount', href: '/bundling-discount-calculator', description: 'See how much you save bundling home and auto with the same insurer.', icon: Package },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">How home insurance rates are calculated</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Home insurance premiums start with your home value and multiply outward from there. Unlike auto insurance, where your personal risk factors dominate, homeowners insurance is heavily weighted toward the property itself and its geographic risk exposure.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Location is the biggest variable</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Florida homeowners pay an average of $4,400/year — more than 3x the national average of $1,428. This is not because Florida homes are worth more; it is because hurricane, flood, and storm surge risk make insuring them fundamentally more expensive. Oklahoma and Kansas face tornado and hail risk. California faces wildfire. Your state average reflects this risk concentration.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Home age and construction matter</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Homes built before 1970 typically cost 10–20% more to insure due to older electrical systems, plumbing, and materials that are more prone to claims. Masonry construction (brick, stone) is cheaper to insure than wood frame in most markets because it is more fire-resistant. A new roof can lower your premium by 10–15%; a roof over 20 years old raises it.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Deductible and coverage level</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      Raising your deductible from $1,000 to $2,500 typically saves 10–15%. Upgrading from standard (HO-3) to premium (HO-5) coverage adds 25–30% but provides broader protection, including replacement cost coverage for personal property rather than actual cash value.
    </p>
  </div>
)

export default function HomeInsurancePage() {
  return (
    <ToolPageWrapper
      title="Home insurance calculator"
      subtitle="Estimate your annual homeowners insurance premium based on your home's value, age, and location."
      canonicalUrl="https://zeember.com/home-insurance-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Home insurance calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <HomeCalc />
    </ToolPageWrapper>
  )
}
