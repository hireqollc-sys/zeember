import type { Metadata } from 'next'
import { Home, Building, Calculator } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import PersonalPropertyCalc from './PersonalPropertyCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Personal Property Value Calculator for Insurance | Zeember',
  description: 'Calculate the replacement value of your personal belongings for renters or homeowners insurance.',
  alternates: { canonical: 'https://zeember.com/personal-property-calculator' },
  openGraph: { title: 'Personal Property Value Calculator | Zeember', url: 'https://zeember.com/personal-property-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'Why do I need to calculate my personal property value?', answer: 'Most people significantly underestimate the total replacement value of their belongings. When you add up electronics, furniture, clothing, appliances, and everything else, the total often reaches $30,000-$100,000 or more for a typical household. If your renters or homeowners insurance personal property limit is lower than your actual total, you will not be fully compensated after a total loss from fire, theft, or similar covered events.' },
  { question: 'What is the difference between replacement cost and actual cash value for personal property?', answer: 'Replacement cost value (RCV) pays what it costs to buy a comparable new item today. Actual cash value (ACV) pays the depreciated value — what the item is worth now given its age and condition. A 5-year-old laptop worth $1,200 new might have ACV of only $300. RCV coverage costs roughly 10-15% more in premium but pays dramatically more at claim time for older items.' },
  { question: 'Are there sub-limits I should know about?', answer: 'Yes. Standard renters and homeowners policies have sub-limits on certain high-value categories: jewelry (often $1,000-$2,500 total), firearms (often $2,500), silverware, coins, cash, and business property. If your jewelry alone is worth $8,000, you need a personal articles floater or scheduled items endorsement to insure it fully. This is separate from your main personal property coverage.' },
  { question: 'Should I create a home inventory?', answer: 'Absolutely. A home inventory — a documented list of your possessions with photos, serial numbers, and estimated values — dramatically speeds up the claims process and ensures you remember everything after a loss. Store copies off-premises: in cloud storage, with your insurer, or at a relative\'s home. Many insurers offer free apps specifically for creating and storing home inventories.' },
  { question: 'Does renters insurance cover my belongings outside my home?', answer: 'Yes. Most renters and homeowners policies cover personal property worldwide, not just at your residence. If your laptop is stolen from your car, your luggage is lost during travel, or items are stolen from your office, personal property coverage typically applies. Coverage off-premises is usually limited to a percentage (often 10%) of your total personal property coverage limit.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Renters Insurance Calculator', href: '/renters-insurance-calculator', description: 'Estimate renters insurance cost with an inventory-style property calculator.', icon: Building },
  { title: 'Home Insurance Calculator', href: '/home-insurance-calculator', description: 'Estimate homeowners insurance including personal property coverage.', icon: Home },
  { title: 'Home Coverage Calculator', href: '/home-insurance-coverage-calculator', description: 'Calculate how much dwelling coverage your home actually needs.', icon: Calculator },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">Most people underestimate how much their stuff is worth</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      The average American household has $30,000 to $50,000 in personal property when calculated at replacement cost. People who work from home, have high-end electronics, own musical instruments, or have accumulated quality furniture and clothing can easily exceed $100,000. Standard renters policies often default to $20,000-$30,000 in personal property coverage — a significant underinsurance gap for many households.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Go room by room</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      The most accurate way to estimate your personal property value is to mentally walk through each room. Bedroom: clothing, electronics, jewelry. Living room: TV, furniture, gaming systems, decorative items. Kitchen: appliances, cookware, dishes. Home office: computers, monitors, peripherals, office furniture. Garage: tools, sports equipment, bikes. People are often surprised how quickly the total grows once they think systematically.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">The sub-limit trap</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      Even if you carry adequate overall personal property coverage, you may have sub-limits that cap payouts on certain categories. Check your policy carefully for sub-limits on jewelry, firearms, cash, silverware, collectibles, and business equipment. Items that exceed these caps need scheduled endorsements or a separate personal articles floater policy to be fully covered.
    </p>
  </div>
)

export default function PersonalPropertyPage() {
  return (
    <ToolPageWrapper
      title="Personal property value calculator"
      subtitle="Estimate the full replacement value of your belongings to set the right coverage on your renters or homeowners policy."
      canonicalUrl="https://zeember.com/personal-property-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Personal property calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <PersonalPropertyCalc />
    </ToolPageWrapper>
  )
}
