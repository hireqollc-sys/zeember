import type { Metadata } from 'next'
import { PawPrint, Heart, Activity } from 'lucide-react'
import ToolPageWrapper from '@/components/calculators/ToolPageWrapper'
import PetCalc from './PetCalc'
import type { FAQItem } from '@/components/FAQAccordion'
import type { RelatedCalc } from '@/components/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Pet Insurance Cost Calculator 2026 | Zeember',
  description: 'Estimate monthly pet insurance costs by species, breed, and age. See what coverage is worth for your pet.',
  alternates: { canonical: 'https://zeember.com/pet-insurance-calculator' },
  openGraph: { title: 'Pet Insurance Cost Calculator 2026 | Zeember', url: 'https://zeember.com/pet-insurance-calculator' },
}

const faqItems: FAQItem[] = [
  { question: 'Is pet insurance actually worth it?', answer: 'Pet insurance is worth it if you would pursue aggressive treatment for a serious illness or injury. A single emergency surgery for a dog can cost $3,000-$8,000. If you carry an 80% reimbursement plan with a $250 deductible, you would pay roughly $800 out of pocket on a $4,000 surgery — versus the full $4,000 without insurance. The math favors insurance if you would spend more than roughly $800-$1,200 per year on vet care.' },
  { question: 'What does pet insurance cover?', answer: 'Accident and illness plans cover unexpected injuries (broken bones, cuts) and illnesses (cancer, infections, digestive issues). They generally do not cover pre-existing conditions, routine/wellness visits, dental cleanings, or prescription food. Wellness add-ons cover preventive care like vaccines and annual exams but add to the premium. Read the policy exclusions carefully — breed-specific conditions are sometimes excluded.' },
  { question: 'When should I buy pet insurance?', answer: 'The earlier the better. Pet insurance does not cover pre-existing conditions, so any health issue your pet develops before you enroll becomes a permanent exclusion. Insuring a young, healthy pet means you start with the fewest exclusions. Most insurers have a waiting period of 14 days for illnesses and 48 hours for accidents before coverage begins.' },
  { question: 'Why does breed affect pet insurance cost?', answer: 'Certain breeds have statistically higher rates of expensive health conditions. German Shepherds are prone to hip dysplasia. Bulldogs have respiratory issues. Golden Retrievers have elevated cancer rates. Insurers price premiums to reflect these actuarial realities. Mixed-breed dogs and domestic shorthair cats generally have lower premiums than purebreds with known health predispositions.' },
  { question: 'What is the difference between annual and per-incident deductibles?', answer: 'An annual deductible means you pay it once per year regardless of how many claims you file. A per-incident deductible means you pay a deductible for each new condition treated. For pets with multiple conditions, annual deductibles are almost always cheaper. For pets who have one large claim, they are equivalent. Most major pet insurers now default to annual deductibles.' },
]

const relatedCalcs: RelatedCalc[] = [
  { title: 'Renters Insurance', href: '/renters-insurance-calculator', description: 'Estimate renters insurance cost including pet liability coverage.', icon: Heart },
  { title: 'Home Insurance', href: '/home-insurance-calculator', description: 'Estimate homeowners insurance including pet liability.', icon: Activity },
  { title: 'Umbrella Insurance', href: '/umbrella-insurance-calculator', description: 'Dog bite liability can exceed home policy limits. See if you need more.', icon: PawPrint },
]

const howToContent = (
  <div>
    <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-6">What drives pet insurance premiums</h2>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      Pet insurance premiums are primarily driven by five factors: species (dogs cost more than cats), breed (predisposition to expensive conditions), age (older pets cost significantly more), location (vet costs vary by state), and coverage level (reimbursement rate, deductible, annual limit). A healthy 2-year-old mixed-breed dog in a low-cost state might pay $30/month. A 9-year-old French Bulldog in California might pay $120/month.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">Choosing the right coverage level</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed mb-6">
      The most important variable is reimbursement rate. At 90% reimbursement, you pay 10% of covered costs after the deductible. At 70%, you pay 30%. The premium difference between 70% and 90% reimbursement is typically 15-25%. For large claims, the higher reimbursement rate pays for itself quickly. For low utilization years, the lower reimbursement saves premium dollars.
    </p>
    <h3 className="font-sans text-xl font-semibold text-neutral-800 mb-3">The age trap</h3>
    <p className="font-sans text-[17px] text-neutral-700 leading-relaxed">
      Pet insurance premiums increase as your pet ages. A plan that costs $40/month for a 2-year-old dog might cost $90/month when that dog is 9. Some insurers lock in your rate at enrollment; others adjust annually. Pets also develop more conditions as they age — and conditions developed before enrollment are excluded forever. Enrolling young, when premiums are low and health history is clean, is almost always the optimal financial decision.
    </p>
  </div>
)

export default function PetInsurancePage() {
  return (
    <ToolPageWrapper
      title="Pet insurance cost calculator"
      subtitle="Estimate monthly pet insurance premiums based on your pet type, breed, age, and coverage preferences."
      canonicalUrl="https://zeember.com/pet-insurance-calculator"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Pet insurance calculator' }]}
      howToContent={howToContent}
      faqItems={faqItems}
      relatedCalculators={relatedCalcs}
    >
      <PetCalc />
    </ToolPageWrapper>
  )
}
