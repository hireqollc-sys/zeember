import type { Metadata } from 'next'
import { Plane, Heart, DollarSign } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import TravelCalc from './TravelCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Travel Insurance Cost Estimator | Zeember',
  description: 'Estimate travel insurance costs for your trip based on duration, destination, and coverage level.',
  alternates: { canonical: 'https://zeember.com/travel-insurance-calculator' },
  openGraph: { title: 'Travel Insurance Cost Estimator | Zeember', url: 'https://zeember.com/travel-insurance-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'What does travel insurance cover?', answer: 'Standard travel insurance covers: trip cancellation (nonrefundable costs if you cancel for a covered reason), trip interruption (costs to return home or catch up to your trip), emergency medical coverage abroad, emergency medical evacuation, baggage loss or delay, and travel delay. Covered cancellation reasons typically include illness, injury, death of a family member, severe weather, jury duty, and job loss.' },
  { question: 'Is travel insurance worth buying?', answer: 'Travel insurance is most worth it for expensive nonrefundable international trips, travel to destinations with limited medical care, trips involving significant medical risk (cruises, adventure activities), and travelers with health conditions. For domestic travel or trips with fully refundable bookings, the value is more limited. The standard breakeven rule: if you cannot afford to lose the nonrefundable portion of the trip, buy insurance.' },
  { question: 'What is Cancel for Any Reason (CFAR) coverage?', answer: 'CFAR is an upgrade that allows you to cancel for reasons not covered by standard policies — cold feet, family preference change, fear of travel conditions. CFAR typically reimburses 50-75% of nonrefundable costs (not 100%). It adds 40-60% to the premium and must usually be purchased within 14-21 days of your initial trip deposit. If flexibility is your priority, it may be worth it for expensive trips.' },
  { question: 'Does my credit card travel insurance replace standalone travel insurance?', answer: 'Credit card travel insurance is typically more limited than standalone policies. Cards usually provide trip cancellation, trip interruption, and some baggage protection, but often have lower limits and fewer covered reasons. Emergency medical coverage through credit cards is rare and usually inadequate for international travel. Check your card benefits carefully, then supplement with a standalone policy for the gaps.' },
  { question: 'When should I buy travel insurance?', answer: 'Buy travel insurance within 14-21 days of your initial trip deposit to access the most coverage options, including CFAR and pre-existing medical condition waivers. Some time-sensitive benefits are only available if you purchase within that window. Never wait until just before departure — some coverage exclusions apply if purchased too close to the trip.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Health Insurance Deductible', href: '/health-insurance-deductible-calculator', description: 'Understand your domestic health insurance cost structure.', icon: Heart },
  { title: 'Pet Insurance Calculator', href: '/pet-insurance-calculator', description: 'See if pet insurance makes sense before your next trip.', icon: Plane },
  { title: 'Disability Insurance', href: '/disability-insurance-calculator', description: 'Protect your income from extended illness or injury.', icon: DollarSign },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">Why the medical coverage matters most</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Most people buy travel insurance for trip cancellation. The most important coverage is actually emergency medical. Your US health insurance typically does not cover medical care abroad, and Medicare has virtually no international coverage. A medical evacuation from a remote location can cost $50,000-$300,000. Travel insurance emergency evacuation coverage pays for medically necessary transport to an appropriate hospital, potentially saving your financial life.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Destination matters significantly</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Travel insurance to domestic US destinations focuses mainly on trip cancellation and interruption. International travel adds the critical layer of emergency medical coverage. Travel to remote destinations — wilderness adventures, developing countries, cruise itineraries — makes emergency evacuation coverage especially important. Some destinations also have advisory-based exclusions; check before purchase.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Pre-existing condition waivers</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      If you have a pre-existing medical condition, standard travel insurance may exclude claims related to that condition. A pre-existing condition waiver, available when you buy within 14-21 days of your initial deposit, removes that exclusion. This is particularly important for older travelers, those with chronic conditions, or anyone whose health status might change before departure.
    </p>
  </div>
)

export default function TravelInsurancePage() {
  return (
    <ToolPageWrapper
      title="Travel insurance cost estimator"
      subtitle="Estimate travel insurance costs for your trip and understand what coverage levels actually protect."
      canonicalUrl="https://zeember.com/travel-insurance-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Travel insurance calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <TravelCalc />
    </ToolPageWrapper>
  )
}
