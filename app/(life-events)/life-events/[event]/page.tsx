import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import AdUnit from '@/components/AdUnit'
import Disclaimer from '@/components/Disclaimer'
import FAQAccordion from '@/components/FAQAccordion'
import type { FAQItem } from '@/components/FAQAccordion'

interface Props { params: { event: string } }

interface LifeEventData {
  title: string
  slug: string
  heroTitle: string
  subtitle: string
  metaTitle: string
  metaDescription: string
  intro: string
  calculators: { title: string; href: string; description: string }[]
  overpaying: { type: string; detail: string }[]
  faqItems: FAQItem[]
}

const EVENTS: Record<string, LifeEventData> = {
  'just-got-married': {
    title: 'Just got married',
    slug: 'just-got-married',
    heroTitle: 'Your insurance checklist after getting married',
    subtitle: 'Marriage is one of the most significant insurance life events. Here is what to review within the first 30 days.',
    metaTitle: 'Insurance Checklist After Getting Married | Zeember',
    metaDescription: 'Getting married changes your insurance needs significantly. See what to update, combine, and review after your wedding.',
    intro: 'Getting married affects nearly every insurance policy you own. You can now combine auto insurance policies for a significant multi-car discount. You may want to combine home and renters insurance. Life insurance needs change dramatically now that someone depends on you financially. Your health insurance options also change — you have 60 days from your wedding date to join your spouse\'s employer plan. Reviewing all of these within 30 days of marriage can save hundreds per year.',
    calculators: [
      { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator', description: 'Estimate your combined auto insurance cost after adding your spouse to your policy.' },
      { title: 'Life Insurance Calculator', href: '/how-much-life-insurance-do-i-need', description: 'Calculate how much life insurance you need now that you have a spouse depending on you.' },
      { title: 'Bundling Discount Calculator', href: '/bundling-discount-calculator', description: 'Find out how much you can save by bundling home and auto insurance together.' },
    ],
    overpaying: [
      { type: 'Separate auto policies', detail: 'Combining onto one policy with a multi-car discount typically saves 10-25%.' },
      { type: 'Duplicate renters insurance', detail: 'One combined policy covers both spouses for about the same price as one individual policy.' },
    ],
    faqItems: [
      { question: 'Should we combine auto insurance after marriage?', answer: 'In almost all cases, yes. Multi-car discounts on a single policy typically save 10-25% compared to two separate policies. The exception is if one spouse has a very poor driving record — keeping policies separate prevents the surcharges from affecting the other spouse\'s premium.' },
      { question: 'How long do I have to add my spouse to my health insurance?', answer: 'Marriage is a qualifying life event that gives you a 60-day special enrollment period to join your spouse\'s employer plan or add them to yours. If you miss this window, you must wait for open enrollment. Act within 30 days to have the most options.' },
      { question: 'How much life insurance do I need after getting married?', answer: 'A basic rule of thumb is 10-12 times your annual income, but the DIME method (Debt + Income replacement + Mortgage + Education) gives a more precise number. Use the life insurance calculator to get a personalized recommendation based on your actual debts, income, and goals.' },
    ],
  },
  'bought-a-home': {
    title: 'Bought a home',
    slug: 'bought-a-home',
    heroTitle: 'Your insurance checklist after buying a home',
    subtitle: 'Homeownership brings new insurance requirements and new opportunities to optimize coverage.',
    metaTitle: 'Insurance Checklist After Buying a Home | Zeember',
    metaDescription: 'Buying a home changes your insurance needs entirely. Learn what coverage you need and how to avoid overpaying.',
    intro: 'Buying a home triggers several mandatory insurance requirements and new coverage decisions. Your lender requires homeowners insurance before closing. If you are in a flood zone, the lender may require separate flood insurance. Renters insurance should be canceled once you move in. Your auto insurance does not change, but your personal liability exposure increases significantly with property ownership — an umbrella policy becomes worth considering. Review your life insurance as well, since a mortgage creates a significant new debt obligation.',
    calculators: [
      { title: 'Home Insurance Calculator', href: '/home-insurance-calculator', description: 'Estimate your homeowners insurance cost based on your home value, state, and coverage level.' },
      { title: 'Flood Insurance Estimator', href: '/flood-insurance-calculator', description: 'Find out if you need flood insurance and what it will cost in your flood zone.' },
      { title: 'Umbrella Insurance Calculator', href: '/umbrella-insurance-calculator', description: 'Calculate whether you need an umbrella policy now that you own property.' },
    ],
    overpaying: [
      { type: 'Insuring land value in your dwelling coverage', detail: 'You only need to insure the rebuild cost, not the land. This is often 40-60% less than market value.' },
      { type: 'Skipping security discounts', detail: 'A burglar alarm and deadbolts can reduce your premium 5-15%. Ask your insurer what credits are available.' },
    ],
    faqItems: [
      { question: 'How much homeowners insurance do I actually need?', answer: 'Your dwelling coverage should match the rebuild cost of your home — not the purchase price or market value. The rebuild cost accounts for local labor and materials to reconstruct the structure. Use our Home Insurance Coverage Calculator to estimate the right amount based on your home\'s square footage and construction type.' },
      { question: 'Do I need flood insurance if I am not in a high-risk flood zone?', answer: 'One-third of flood insurance claims come from outside high-risk flood zones. If you are in a moderate or low-risk zone (Zone X), NFIP policies are available at lower rates and provide protection against the floods that do happen in lower-risk areas. Your lender may not require it, but it can still be worth considering depending on your property.' },
      { question: 'Should I cancel my renters insurance after buying a home?', answer: 'Yes, once you have moved into your new home and your homeowners policy is active, you should cancel your renters insurance. Your homeowners policy provides personal property and liability coverage. Notify your renters insurer of your move-out date to avoid paying for overlapping coverage.' },
    ],
  },
  'had-a-baby': {
    title: 'Had a baby',
    slug: 'had-a-baby',
    heroTitle: 'Your insurance checklist after having a baby',
    subtitle: 'A new child changes your life insurance needs most dramatically — and also affects health and disability coverage.',
    metaTitle: 'Insurance Checklist After Having a Baby | Zeember',
    metaDescription: 'Having a baby changes your insurance needs significantly. Review life insurance, health insurance, and disability coverage.',
    intro: 'Having a child is the most common trigger for buying or increasing life insurance. If you have a newborn depending on your income, you need enough life insurance to cover income replacement, mortgage, childcare, and education costs through their independence. Your health insurance needs an update within 30 days of birth to add the baby to your plan. Long-term disability insurance becomes more important when someone depends on your income. Review your estate documents as well — beneficiary designations and a will are important once you have children.',
    calculators: [
      { title: 'Life Insurance Calculator', href: '/how-much-life-insurance-do-i-need', description: 'Recalculate how much life insurance you need now that you have a dependent child.' },
      { title: 'HSA Contribution Calculator', href: '/hsa-contribution-calculator', description: 'Maximize your HSA contributions for tax-free medical expense savings for your family.' },
      { title: 'Disability Insurance Calculator', href: '/disability-insurance-calculator', description: 'Estimate how much disability coverage you need to protect your family income.' },
    ],
    overpaying: [
      { type: 'Inadequate life insurance', detail: 'Most new parents significantly underestimate their life insurance needs. Education costs alone can add $100,000+ per child to the calculation.' },
      { type: 'Missing health insurance enrollment window', detail: 'Birth is a qualifying event. Add your child within 30 days — or you wait for open enrollment and face a coverage gap.' },
    ],
    faqItems: [
      { question: 'How much life insurance do I need after having a baby?', answer: 'Adding a child to your life insurance calculation typically increases your coverage need by $200,000-$400,000 per child, accounting for childcare costs, increased income replacement years, and future education expenses. Use the DIME calculator to get an updated number based on your specific income and debts.' },
      { question: 'Do stay-at-home parents need life insurance?', answer: 'Absolutely. The economic value of childcare, household management, and parenting — even without an income — is typically $150,000-$200,000+ per year to replace. The surviving working spouse would face significant costs for childcare, housekeeping, and other services. A stay-at-home parent should have $300,000-$500,000 in term life coverage as a baseline.' },
      { question: 'When should I add my newborn to my health insurance?', answer: 'You have 30 days from birth to add your newborn to your health insurance plan. The coverage is typically retroactive to the birth date. If you miss the 30-day window, you will need to wait for open enrollment unless another qualifying life event occurs.' },
    ],
  },
  'bought-a-car': {
    title: 'Bought a car',
    slug: 'bought-a-car',
    heroTitle: 'Your insurance checklist after buying a car',
    subtitle: 'A new or used vehicle purchase requires immediate insurance decisions. Here is what to know.',
    metaTitle: 'Car Insurance After Buying a New Car | Zeember',
    metaDescription: 'Bought a new or used car? Review your auto insurance coverage requirements and estimate what you will pay.',
    intro: 'Buying a car requires immediate insurance action. If the car is financed or leased, your lender or leasing company requires full coverage (liability + collision + comprehensive) before you can drive it off the lot. If you paid cash, you can technically carry just liability, though full coverage is usually worth it for newer vehicles. Adding a new vehicle to an existing policy is typically done with a quick phone call or app update. Gap insurance is worth considering if you are financing a new car that will depreciate faster than your loan balance.',
    calculators: [
      { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator', description: 'Estimate the auto insurance cost for your new vehicle.' },
      { title: 'Full Coverage vs Liability', href: '/full-coverage-vs-liability-calculator', description: 'Determine if full coverage is worth it based on your vehicle value.' },
      { title: 'Gap Insurance Calculator', href: '/gap-insurance-calculator', description: 'Find out if gap insurance makes sense for your vehicle and loan.' },
    ],
    overpaying: [
      { type: 'Not shopping at renewal', detail: 'Adding a new car is a natural time to get competing quotes. Most drivers can save $200-$500 by switching insurers at this point.' },
      { type: 'Full coverage on a low-value used car', detail: 'If the car is worth under $6,000, full coverage is often not cost-effective. Use the break-even calculator to decide.' },
    ],
    faqItems: [
      { question: 'Do I need full coverage on a new car?', answer: 'If the car is financed or leased, yes — your lender requires it. If you own the car outright, you choose. For new cars, full coverage is almost always worth it since the vehicle value is high and the premium cost is relatively low compared to the potential claim payout. The break-even typically happens when the car is 7-10 years old.' },
      { question: 'How does a new car affect my insurance premium?', answer: 'A new car typically costs more to insure than an older one because the replacement cost is higher. Sports cars, electric vehicles, and luxury vehicles carry higher premiums. SUVs and minivans tend to be cheaper to insure. Your insurer will rate the specific make and model based on repair costs, theft rates, and safety ratings.' },
      { question: 'What is gap insurance and do I need it?', answer: 'Gap insurance covers the difference between what you owe on your loan and what your car is worth if it is totaled or stolen. New cars depreciate 20-25% in the first year, creating a gap between loan balance and car value. If you put less than 20% down or financed for more than 48 months, gap insurance is worth considering. It typically costs $200-$400 from your insurer, much less than dealer gap products.' },
    ],
  },
  'turned-65': {
    title: 'Turned 65',
    slug: 'turned-65',
    heroTitle: 'Your insurance checklist after turning 65',
    subtitle: 'Medicare enrollment, reduced auto insurance needs, and life insurance reviews are all on the agenda at 65.',
    metaTitle: 'Insurance Review at Age 65 | Zeember',
    metaDescription: 'Turning 65 brings Medicare enrollment decisions, life insurance reviews, and changes to your insurance needs.',
    intro: 'Turning 65 triggers the most significant insurance transition of your life. Medicare enrollment begins, and the choices you make during your Initial Enrollment Period affect your coverage and costs for years. Your auto insurance rate may actually decrease slightly in your early 60s as you move past the higher-risk young-adult years, though it gradually increases again after 70. If your children are financially independent and your mortgage is paid off, your life insurance needs may have declined significantly. Now may be the right time to evaluate whether to continue paying life insurance premiums.',
    calculators: [
      { title: 'Out-of-Pocket Max Estimator', href: '/out-of-pocket-max-estimator', description: 'Understand your Medicare supplement gap exposure and out-of-pocket costs.' },
      { title: 'Life Insurance Cost by Age', href: '/life-insurance-by-age', description: 'See how term life rates compare at 65 vs earlier ages.' },
      { title: 'Umbrella Insurance Calculator', href: '/umbrella-insurance-calculator', description: 'Assess whether your liability protection covers your retirement assets.' },
    ],
    overpaying: [
      { type: 'Overpaying for unnecessary life insurance', detail: 'If dependents are grown and mortgage is paid, the original reasons for life insurance may no longer apply. Review whether the premium is still justified.' },
      { type: 'Missing Medicare Part B enrollment window', detail: 'Delaying Medicare Part B without other qualifying coverage triggers a lifelong 10% penalty per year of delay. Enroll during your Initial Enrollment Period.' },
    ],
    faqItems: [
      { question: 'When do I need to enroll in Medicare?', answer: 'Your Initial Enrollment Period for Medicare is the 3 months before, the month of, and 3 months after your 65th birthday — 7 months total. Enrolling in the first 3 months means your coverage starts on your birthday month. If you delay enrollment without qualifying group coverage from an employer, you face permanent premium surcharges.' },
      { question: 'Should I keep life insurance after 65?', answer: 'It depends on your situation. If you have dependents who still rely on your income (a spouse, adult child with a disability), keeping coverage makes sense. If your children are independent, your mortgage is paid, and you have significant savings, the insurance premium may no longer be justified. Evaluate whether the coverage protects a real financial need.' },
      { question: 'How does auto insurance change at age 65?', answer: 'Auto insurance rates tend to be lower for drivers in their early 60s compared to their 40s, reflecting lower accident rates. Rates begin to increase gradually after 70-75. Many insurers offer mature driver discounts for completing defensive driving courses. Shopping at renewal every 12-18 months is especially valuable as rates shift at this life stage.' },
    ],
  },
  'moved-states': {
    title: 'Moved states',
    slug: 'moved-states',
    heroTitle: 'Your insurance checklist after moving to a new state',
    subtitle: 'Moving states requires updating every insurance policy you own — and rates can change dramatically.',
    metaTitle: 'Insurance Checklist After Moving to a New State | Zeember',
    metaDescription: 'Moving to a new state affects your auto, home, renters, and health insurance. Here is what to update and when.',
    intro: 'Moving to a new state requires updating every insurance policy you own, and premiums can change significantly in either direction. Auto insurance rates vary by more than 3x between the cheapest and most expensive states. Home insurance rates in Florida or Texas can be triple what you paid in Ohio or Wisconsin. Your auto policy must be updated within 30-90 days of establishing residence in your new state — exact timing depends on state law. If you are moving from a no-fault auto insurance state (like Michigan or Florida) to an at-fault state, your coverage structure changes substantially.',
    calculators: [
      { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator', description: 'Estimate your new auto insurance rate in your destination state.' },
      { title: 'Home Insurance Calculator', href: '/home-insurance-calculator', description: 'See how homeowners insurance costs differ in your new state.' },
      { title: 'State Insurance Map', href: '/state-map', description: 'Compare insurance costs across all 50 states before you move.' },
    ],
    overpaying: [
      { type: 'Failing to update your address with your insurer', detail: 'Insuring a California car while living in Nevada is fraud. Update your address within 30 days and your premium will adjust to reflect your new state.' },
      { type: 'Not shopping when you move', detail: 'Your current insurer may not have competitive rates in your new state. Get quotes from 3 insurers after your move.' },
    ],
    faqItems: [
      { question: 'How soon do I need to update my auto insurance when I move?', answer: 'Most states give you 30-90 days to register your vehicle and update your insurance after establishing residence. Your insurance coverage does not automatically void when you move, but you are legally required to inform your insurer and update your garaging address. Failure to do so can result in claim denial if you have an accident at your new address.' },
      { question: 'Why is car insurance so much cheaper (or more expensive) in my new state?', answer: 'State-level factors that drive auto insurance rates include minimum coverage requirements, litigation environment, weather and natural disaster frequency, traffic density, and vehicle theft rates. Florida, Louisiana, and Michigan rank among the most expensive states. Vermont, Idaho, and Maine are among the cheapest. The same driver profile can see 50-100% rate differences between states.' },
      { question: 'What happens to my health insurance when I move states?', answer: 'Moving to a new state is a qualifying life event that triggers a special enrollment period for marketplace health insurance. If you have employer health insurance, check whether your plan covers in-network providers in your new state — some HMO plans have very limited out-of-state networks. You typically have 60 days from your move date to enroll in a new plan.' },
    ],
  },
  'adopted-a-pet': {
    title: 'Adopted a pet',
    slug: 'adopted-a-pet',
    heroTitle: 'Your insurance checklist after adopting a pet',
    subtitle: 'Pets bring two insurance considerations: pet insurance for vet bills, and liability coverage for your homeowners or renters policy.',
    metaTitle: 'Insurance After Adopting a Pet | Zeember',
    metaDescription: 'Adopting a pet affects your homeowners or renters insurance and raises the question of pet insurance. Here is what to know.',
    intro: 'Adopting a pet — especially a dog — affects your insurance in two ways. First, it increases your personal liability exposure. If your dog bites someone, your homeowners or renters policy is typically responsible for the medical bills. Some breeds are excluded by certain insurers, and failure to disclose a dog can void your coverage. Second, the question of pet insurance becomes relevant: a single unexpected vet visit can easily cost $2,000-$5,000, and a serious illness or surgery can run $10,000-$20,000. Whether pet insurance is worth it depends on your pet\'s breed, age, and your financial ability to absorb unexpected vet bills.',
    calculators: [
      { title: 'Pet Insurance Calculator', href: '/pet-insurance-calculator', description: 'Estimate monthly pet insurance costs for your pet based on species, breed, and age.' },
      { title: 'Renters Insurance Calculator', href: '/renters-insurance-calculator', description: 'Check that your renters insurance covers pet liability in your apartment.' },
      { title: 'Umbrella Insurance Calculator', href: '/umbrella-insurance-calculator', description: 'Consider additional liability coverage if you own a large or high-risk breed dog.' },
    ],
    overpaying: [
      { type: 'Not disclosing your dog breed to your insurer', detail: 'Failing to disclose a restricted breed (pit bull, Rottweiler, German Shepherd) can void your liability coverage in a bite incident. Disclose and shop insurers that do not restrict breeds.' },
      { type: 'Buying pet insurance for older pets', detail: 'Pet insurance premiums for pets over 8 years old often cost more annually than the average vet bill for their age cohort. Calculate the break-even before purchasing.' },
    ],
    faqItems: [
      { question: 'Does renters or homeowners insurance cover pet liability?', answer: 'Yes, standard renters and homeowners insurance includes personal liability coverage that typically covers dog bite incidents on and off your property. Coverage limits are usually $100,000-$300,000. However, some insurers exclude specific breeds (pit bulls, Rottweilers, German Shepherds) or will exclude the dog entirely. Disclose your pet to your insurer and confirm coverage.' },
      { question: 'Is pet insurance worth it?', answer: 'Pet insurance is most cost-effective for puppies and kittens enrolled before health conditions develop, large breeds prone to expensive orthopedic issues, and owners who would pursue aggressive treatment for serious illness. It is less valuable for older pets (premiums often exceed average claims), cats (lower average vet costs), and owners comfortable self-insuring with a dedicated savings account.' },
      { question: 'What breeds raise homeowners insurance costs?', answer: 'Some insurers charge higher premiums or exclude certain breeds considered higher-risk for bite liability: pit bull terriers, Rottweilers, German Shepherds, Doberman Pinschers, Akitas, and a few others. If you own a restricted breed, shop insurers that do not discriminate by breed — USAA, State Farm, and Nationwide generally do not exclude specific breeds.' },
    ],
  },
  'started-a-side-business': {
    title: 'Started a business',
    slug: 'started-a-side-business',
    heroTitle: 'Your insurance checklist after starting a side business',
    subtitle: 'A side business creates new liability exposures that your personal insurance policies almost certainly do not cover.',
    metaTitle: 'Business Insurance After Starting a Side Business | Zeember',
    metaDescription: 'Starting a side business creates liability gaps in your personal insurance. Here is what coverage you need.',
    intro: 'Starting a side business — even a freelance or home-based one — creates insurance exposures that your personal policies likely do not cover. Homeowners and renters policies exclude business liability and business property losses. Auto insurance excludes commercial use of your vehicle for most side businesses. If you use your car for deliveries, rideshare, or client visits, you need a commercial endorsement or a rideshare policy. A Business Owner\'s Policy (BOP) combines general liability and business property insurance into one cost-effective package starting around $30-80/month for small home-based businesses.',
    calculators: [
      { title: 'Liability Coverage Calculator', href: '/liability-coverage-calculator', description: 'Estimate how much liability coverage your side business needs.' },
      { title: 'Umbrella Insurance Calculator', href: '/umbrella-insurance-calculator', description: 'Consider an umbrella policy for additional protection above your liability limits.' },
      { title: 'Disability Insurance Calculator', href: '/disability-insurance-calculator', description: 'Protect your income if your side business income becomes your primary income.' },
    ],
    overpaying: [
      { type: 'Personal auto policy for business driving', detail: 'Using your personal auto policy for delivery, rideshare, or client visits is a coverage gap. A commercial endorsement adds $15-40/month and properly covers business use.' },
      { type: 'No professional liability coverage for service businesses', detail: 'If you provide advice, design, IT services, or other professional services, general liability alone is insufficient. Errors and omissions (E&O) coverage protects against claims of professional negligence.' },
    ],
    faqItems: [
      { question: 'Does my homeowners insurance cover my home-based business?', answer: 'Standard homeowners insurance provides very limited business coverage — typically $2,500 for business equipment and no business liability coverage. If clients visit your home, if you store business inventory, or if you provide services that could generate a liability claim, you need a business owner\'s policy or a business endorsement on your homeowners policy.' },
      { question: 'Do I need business insurance for a simple freelance side gig?', answer: 'It depends on the work. Writers, graphic designers, and other solo freelancers with no physical product and no client visits may manage adequately with just a professional liability (E&O) policy. Service providers who visit client locations, handle physical goods, or give advice that clients act on need at minimum general liability plus E&O coverage.' },
      { question: 'What is the cheapest way to insure a small side business?', answer: 'A Business Owner\'s Policy (BOP) bundles general liability and business property coverage at a significant discount compared to buying them separately. For home-based businesses with low revenue (under $500,000), BOPs often start at $30-80/month. NEXT Insurance, Hiscox, and State Farm Small Business are worth comparing for home-based and solo freelance operations.' },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(EVENTS).map(slug => ({ event: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = EVENTS[params.event]
  if (!event) return {}
  return {
    title: event.metaTitle,
    description: event.metaDescription,
    alternates: { canonical: `https://zeember.com/life-events/${params.event}` },
    openGraph: { title: event.metaTitle, url: `https://zeember.com/life-events/${params.event}`, siteName: 'Zeember', type: 'website' },
  }
}

export default function LifeEventPage({ params }: Props) {
  const event = EVENTS[params.event]
  if (!event) notFound()

  return (
    <main>
      <section className="bg-primary-light py-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[48px] font-bold text-primary-dark mb-3">{event.heroTitle}</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl">{event.subtitle}</p>
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 py-4"><AdUnit slot="LEADERBOARD_1" format="leaderboard" /></div>

      <section className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Intro */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-sans text-lg font-semibold text-neutral-800 mb-3">What changes with your insurance</h2>
              <p className="font-sans text-[17px] leading-[1.8] text-neutral-700">{event.intro}</p>
            </div>

            {/* What you might be overpaying for */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h2 className="font-sans text-lg font-semibold text-amber-800 mb-4">What you might be overpaying for</h2>
              <ul className="space-y-3">
                {event.overpaying.map(item => (
                  <li key={item.type} className="flex gap-3">
                    <span className="text-amber-600 text-lg mt-0.5">!</span>
                    <div>
                      <p className="font-sans text-sm font-semibold text-amber-800">{item.type}</p>
                      <p className="font-sans text-sm text-amber-700">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="font-serif text-[24px] font-semibold text-primary-dark mb-4">Frequently asked questions</h2>
              <FAQAccordion items={event.faqItems} pageUrl={`https://zeember.com/life-events/${params.event}`} />
            </div>

            <Disclaimer type="calculator" />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-sans text-base font-semibold text-neutral-800 mb-4">Relevant calculators</h2>
              <div className="space-y-4">
                {event.calculators.map(calc => (
                  <div key={calc.href} className="border border-neutral-100 rounded-xl p-4">
                    <h3 className="font-sans text-sm font-semibold text-neutral-800 mb-1">{calc.title}</h3>
                    <p className="font-sans text-xs text-neutral-600 mb-2">{calc.description}</p>
                    <Link href={calc.href} className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-primary-accent hover:text-primary-dark transition-colors">
                      <CheckCircle className="h-3.5 w-3.5" /> Use calculator →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-light border border-primary-accent/20 rounded-2xl p-6">
              <h3 className="font-sans text-base font-semibold text-primary-dark mb-2">Other life events</h3>
              <ul className="space-y-1.5">
                {Object.values(EVENTS).filter(e => e.slug !== params.event).map(e => (
                  <li key={e.slug}>
                    <Link href={`/life-events/${e.slug}`} className="font-sans text-sm text-primary-dark/80 hover:text-primary-accent transition-colors">{e.title} →</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 pb-8"><AdUnit slot="RECTANGLE_1" format="rectangle" /></div>
    </main>
  )
}
