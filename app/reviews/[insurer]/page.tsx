import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import insurerData from '@/lib/data/insurer-profiles.json'
import AdUnit from '@/components/AdUnit'
import Disclaimer from '@/components/Disclaimer'
import { CheckCircle, XCircle, ArrowLeft, Shield, Star } from 'lucide-react'

interface Props {
  params: { insurer: string }
}

export function generateStaticParams() {
  return insurerData.insurers.map(ins => ({ insurer: ins.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const insurer = insurerData.insurers.find(i => i.id === params.insurer)
  if (!insurer) return {}
  return {
    title: `${insurer.name} Insurance Review 2026 | Zeember`,
    description: `${insurer.name} review: NAIC complaint index ${insurer.naic_complaint_index}, AM Best ${insurer.am_best_rating}. Pros, cons, and who it is best for.`,
    alternates: { canonical: `https://zeember.com/reviews/${insurer.id}` },
    openGraph: { title: `${insurer.name} Insurance Review | Zeember`, url: `https://zeember.com/reviews/${insurer.id}`, siteName: 'Zeember', type: 'website' },
  }
}

const PRICE_TIER_LABEL: Record<string, string> = { budget: 'Budget-friendly', mid: 'Mid-tier', premium: 'Premium' }
const PRICE_TIER_COLOR: Record<string, string> = { budget: 'text-green-700 bg-green-100', mid: 'text-blue-700 bg-blue-100', premium: 'text-purple-700 bg-purple-100' }

function ndicColor(n: number) {
  if (n <= 0.5) return 'text-green-700'
  if (n <= 1.0) return 'text-neutral-700'
  return 'text-red-600'
}

const EXPANDED_CONTENT: Record<string, string> = {
  geico: "GEICO's growth into the second-largest auto insurer in the United States was built almost entirely on price. By operating with minimal physical agent offices and investing heavily in direct marketing and technology, GEICO keeps its operating costs low and passes those savings to policyholders. For a driver with a clean record and straightforward coverage needs, GEICO routinely comes in at 10-20% below the national average.\n\nWhere GEICO shows cracks is in the claims experience. Their below-average J.D. Power claims satisfaction scores reflect a more transactional relationship — great for getting a cheap policy, less reassuring when you actually need to file a claim. Military members get additional discounts through the GEICO Military program, though USAA will still almost always beat them on both price and service for eligible members.\n\nThe mobile app and online portal are genuinely excellent — quotes take under 15 minutes, policy management is self-service, and the digital experience rivals the best in the industry. If your priority is the lowest possible premium and you are comfortable without a dedicated agent, GEICO should be your first comparison quote.",
  progressive: "Progressive pioneered several innovations that changed the auto insurance industry — the first to offer comparison quotes from competitors on their own site, the Name Your Price tool that lets you set a budget first, and Snapshot telematics that rewards demonstrated safe driving with discounts up to 30%. These innovations reflect a company that genuinely thinks differently about how to match customers with coverage.\n\nFor high-risk drivers — those with DUIs, multiple accidents, or poor driving records — Progressive is often the only major insurer willing to offer coverage at competitive rates. While other carriers penalize these drivers heavily or decline them, Progressive's pricing model absorbs the risk more effectively. If you have a spotty record, Progressive should absolutely be on your short list.\n\nThe trade-off is customer service. Progressive scores consistently below average in J.D. Power satisfaction surveys, particularly around claims handling. Their NAIC complaint index of 0.93 is actually near average — not bad — but the claims process can feel bureaucratic. For tech-comfortable drivers who want to manage everything digitally and appreciate the Snapshot discount opportunity, Progressive delivers real value.",
  "state-farm": "State Farm's defining competitive advantage is its agent network — no other insurance company has anything close to State Farm's 19,000+ local agent offices across the United States. This means that unlike GEICO's purely transactional model, State Farm customers typically have a real person who knows their policy, answers the phone, and advocates for them during claims. For customers who value that relationship, the slight premium over budget competitors is often worth it.\n\nThe Drive Safe and Save telematics program is one of the best in the industry. Unlike Progressive's Snapshot, which can raise rates if it catches bad driving, Drive Safe and Save is discount-only — you can only save, never be penalized. Discounts of 15-30% are achievable for genuinely safe drivers, which can close much of the price gap with GEICO and Progressive.\n\nState Farm's financial stability (A++ AM Best) and claims satisfaction scores are among the highest in the industry. Their NAIC complaint index of 0.55 — well below average — reflects a company that handles claims professionally and doesn't generate excessive disputes. For bundled home and auto, State Farm offers competitive multi-policy discounts and serves as a one-stop shop for most personal insurance needs.",
  allstate: "Allstate occupies an awkward middle ground — priced above mid-tier competitors but without the service scores that would justify the premium. Their rates are consistently 10-20% above the national average for comparable coverage, and their NAIC complaint index of 1.15 (above average, meaning more complaints than expected) raises questions about the claims experience you are paying for.\n\nWhere Allstate genuinely differentiates is in specific coverage features: Accident Forgiveness prevents your first at-fault accident from raising your rates, New Car Replacement covers a newer model if your car is totaled in the first two years, and Sound System Insurance protects aftermarket audio equipment. If any of these features are specifically important to you, Allstate may be worth the premium.\n\nThe Drivewise telematics program is another legitimate differentiator. Unlike some telematics programs that can penalize drivers, Drivewise is discount-only — safe driving earns cash back. Drivers who are confident in their driving habits and want to offset Allstate's higher base rates should definitely enroll. For everyone else, comparison shopping at renewal is essential — Allstate's rates increase meaningfully after claims.",
  "liberty-mutual": "Liberty Mutual is one of the larger insurers in the United States, but its market share has not translated to industry-leading satisfaction scores. The NAIC complaint index of 1.72 — meaning 72% more complaints than expected for their size — is one of the higher figures among major carriers, and J.D. Power scores for both auto and home consistently land below industry average. These are not the numbers of an insurer punching above its weight.\n\nThe coverage offerings themselves are genuinely differentiated. Better Car Replacement pays for a car one model year newer with 15,000 fewer miles if your vehicle is totaled — meaningfully better than standard actual cash value. RightTrack telematics can reduce premiums up to 30%, and the program is typically discount-only. The coverage customization options are broad — if you need specific coverage endorsements, Liberty Mutual is likely to have them.\n\nThe honest assessment: Liberty Mutual costs more than most competitors for similar coverage, and the claims and service experience lags behind State Farm, USAA, and Nationwide. If you specifically need Better Car Replacement or have a highly customized coverage need that only Liberty Mutual addresses, the math might work. Otherwise, you are likely to find better value elsewhere.",
  nationwide: "Nationwide is a consistently underrated insurer that outperforms its marketing budget in the metrics that matter most. An NAIC complaint index of 0.68 — well below average, meaning fewer complaints than expected — reflects a company that handles claims without generating unnecessary disputes. J.D. Power scores for both auto (876) and home (828) are solidly above average. This is not a flashy insurer, but it is a reliable one.\n\nThe On Your Side claims review process is a genuine differentiator. After every claim, Nationwide conducts a review to ensure you received everything you were entitled to under your policy — an unusual and customer-friendly commitment. Farm Bureau partnerships make Nationwide particularly strong for rural customers and those with agricultural property.\n\nAvailability is the main limitation — Nationwide is not offered in all states, particularly in the Northeast. If you are in an available state and value a strong claims experience with competitive bundling discounts (up to 20% for home and auto), Nationwide deserves serious consideration. It is not the cheapest option, but the service quality justifies the moderate price position.",
  farmers: "Farmers Insurance commands a significant price premium over most competitors — rates typically run 15-25% above the national average — but offers coverage options that others simply do not. Rideshare insurance for Uber and Lyft drivers is available as a specific endorsement that properly covers the gaps between your personal auto policy and the rideshare company's coverage. Classic and antique vehicle coverage is handled through their Foremost specialty lines with genuine expertise.\n\nThe agent network is Farmers' other differentiator. With thousands of agents nationwide, Farmers operates on the State Farm model of personal relationships over transactional pricing. If you have complex coverage needs — a home-based business, a classic car collection, rideshare income, or farm property — having an expert agent who knows your full situation has real value.\n\nThe honest limitation: if you do not need these specific coverage types, Farmers' premium pricing is hard to justify. Standard auto and home coverage at Farmers prices will leave money on the table compared to State Farm, Nationwide, or Progressive. Shop Farmers when you have a specific coverage need; otherwise, comparison-shop carefully.",
  usaa: "USAA is the best personal lines insurance company in the United States by virtually every objective metric. The lowest NAIC complaint index (0.26) of any major insurer — meaning 74% fewer complaints than the industry average. The highest J.D. Power scores for both auto and home insurance. AM Best A++ financial strength. Consistently competitive rates that rival or beat GEICO for eligible members.\n\nThe only catch is eligibility. USAA is available exclusively to active duty military members, veterans with honorable discharge, and their immediate family members (spouses and children). If you or anyone in your immediate family has served in the US military, you are likely eligible — and you should apply immediately.\n\nUSAA's model works because it serves a defined, relatively stable population with predictable risk profiles, enabling efficient underwriting and genuinely low rates. The claims experience is consistently cited as the best in the industry — empathetic, efficient, and fair. Banking, investment, and other financial services are also available through USAA with the same member-first philosophy. If you are eligible and not already with USAA, that is the first thing to fix.",
}

const RELATED_CALCS: Record<string, { title: string; href: string }[]> = {
  geico: [{ title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator' }, { title: 'Full Coverage vs Liability', href: '/full-coverage-vs-liability-calculator' }, { title: 'Bundling Discount Calculator', href: '/bundling-discount-calculator' }],
  progressive: [{ title: 'SR-22 Insurance Calculator', href: '/sr-22-insurance-calculator' }, { title: 'Teen Driver Cost Calculator', href: '/teen-driver-insurance-calculator' }, { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator' }],
  'state-farm': [{ title: 'Bundling Discount Calculator', href: '/bundling-discount-calculator' }, { title: 'Home Insurance Calculator', href: '/home-insurance-calculator' }, { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator' }],
  allstate: [{ title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator' }, { title: 'Full Coverage vs Liability', href: '/full-coverage-vs-liability-calculator' }, { title: 'Gap Insurance Calculator', href: '/gap-insurance-calculator' }],
  'liberty-mutual': [{ title: 'Home Insurance Calculator', href: '/home-insurance-calculator' }, { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator' }, { title: 'Bundling Discount Calculator', href: '/bundling-discount-calculator' }],
  nationwide: [{ title: 'Bundling Discount Calculator', href: '/bundling-discount-calculator' }, { title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator' }, { title: 'Home Insurance Calculator', href: '/home-insurance-calculator' }],
  farmers: [{ title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator' }, { title: 'Home Insurance Calculator', href: '/home-insurance-calculator' }, { title: 'Umbrella Insurance Calculator', href: '/umbrella-insurance-calculator' }],
  usaa: [{ title: 'Auto Insurance Calculator', href: '/auto-insurance-calculator' }, { title: 'Bundling Discount Calculator', href: '/bundling-discount-calculator' }, { title: 'Home Insurance Calculator', href: '/home-insurance-calculator' }],
}

export default function InsurerReviewPage({ params }: Props) {
  const insurer = insurerData.insurers.find(i => i.id === params.insurer)
  if (!insurer) notFound()

  const expandedContent = EXPANDED_CONTENT[insurer.id] || insurer.summary
  const relatedCalcs = RELATED_CALCS[insurer.id] || []

  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <Link href="/compare" className="inline-flex items-center gap-1.5 font-sans text-sm text-neutral-500 hover:text-primary-dark transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to all insurers
          </Link>
          <h1 className="font-serif text-[36px] md:text-[48px] font-bold text-primary-dark mb-3">{insurer.name} Insurance Review</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl">{insurer.summary}</p>
          {insurer.military_only && (
            <div className="inline-flex items-center gap-2 mt-4 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full">
              <Star className="h-4 w-4 text-amber-600" />
              <span className="font-sans text-sm font-semibold text-amber-800">Military members and veterans only</span>
            </div>
          )}
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 py-4"><AdUnit slot="LEADERBOARD_1" format="leaderboard" /></div>

      <section className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            {/* Quick facts */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-sans text-lg font-semibold text-neutral-800 mb-4">Quick facts</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-neutral-50 rounded-xl">
                  <p className="font-sans text-xs text-neutral-500 mb-1">Price tier</p>
                  <span className={`font-sans text-sm font-semibold px-2.5 py-1 rounded-full ${PRICE_TIER_COLOR[insurer.price_tier]}`}>{PRICE_TIER_LABEL[insurer.price_tier]}</span>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-xl">
                  <p className="font-sans text-xs text-neutral-500 mb-1">NAIC complaint index</p>
                  <p className={`font-serif text-2xl font-bold ${ndicColor(insurer.naic_complaint_index)}`}>{insurer.naic_complaint_index}</p>
                  <p className="font-sans text-xs text-neutral-400">{insurer.naic_complaint_index < 1 ? 'below avg' : 'above avg'}</p>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-xl">
                  <p className="font-sans text-xs text-neutral-500 mb-1">AM Best rating</p>
                  <p className="font-serif text-2xl font-bold text-neutral-800">{insurer.am_best_rating}</p>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-xl">
                  <p className="font-sans text-xs text-neutral-500 mb-1">J.D. Power auto</p>
                  <p className="font-serif text-2xl font-bold text-neutral-800">{insurer.jd_power_auto_score ?? 'N/R'}</p>
                  <p className="font-sans text-xs text-neutral-400">out of 1,000</p>
                </div>
              </div>
            </div>

            {/* Coverage types */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-sans text-lg font-semibold text-neutral-800 mb-3">Coverage types offered</h2>
              <div className="flex flex-wrap gap-2">
                {insurer.types_offered.map(t => (
                  <span key={t} className="font-sans text-sm bg-primary-light text-primary-dark px-3 py-1 rounded-full capitalize">{t.replace('-', ' ')}</span>
                ))}
              </div>
            </div>

            {/* Pros */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-sans text-lg font-semibold text-neutral-800 mb-4">What {insurer.name} does well</h2>
              <ul className="space-y-3">
                {insurer.pros.map(pro => (
                  <li key={pro} className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-primary-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-base text-neutral-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-sans text-lg font-semibold text-neutral-800 mb-4">Where {insurer.name} falls short</h2>
              <ul className="space-y-3">
                {insurer.cons.map(con => (
                  <li key={con} className="flex gap-3">
                    <XCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-base text-neutral-700">{con}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full review */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-sans text-lg font-semibold text-neutral-800 mb-4">Full review</h2>
              {expandedContent.split('\n\n').map((para, i) => (
                <p key={i} className="font-sans text-[17px] leading-[1.8] text-neutral-700 mb-4 last:mb-0">{para}</p>
              ))}
            </div>

            <Disclaimer type="comparison" />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Best for */}
            <div className="bg-primary-light border border-primary-accent/20 rounded-2xl p-6">
              <h3 className="font-sans text-base font-semibold text-primary-dark mb-3 flex items-center gap-2"><Shield className="h-4 w-4" /> Best for</h3>
              <ul className="space-y-2">
                {insurer.best_for.map(b => (
                  <li key={b} className="font-sans text-sm text-primary-dark/80 flex items-start gap-2">
                    <span className="text-primary-accent mt-0.5">✓</span>{b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Not best for */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="font-sans text-base font-semibold text-amber-800 mb-3">Not ideal for</h3>
              <ul className="space-y-2">
                {insurer.not_best_for.map(b => (
                  <li key={b} className="font-sans text-sm text-amber-700 flex items-start gap-2">
                    <span className="mt-0.5">✗</span>{b}
                  </li>
                ))}
              </ul>
            </div>

            {/* J.D. Power scores */}
            {(insurer.jd_power_auto_score || insurer.jd_power_home_score) && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-sans text-base font-semibold text-neutral-800 mb-3">J.D. Power scores</h3>
                {insurer.jd_power_auto_score && (
                  <div className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="font-sans text-sm text-neutral-600">Auto insurance</span>
                      <span className="font-sans text-sm font-semibold text-neutral-800">{insurer.jd_power_auto_score}/1000</span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-accent rounded-full" style={{ width: `${(insurer.jd_power_auto_score / 1000) * 100}%` }} />
                    </div>
                  </div>
                )}
                {insurer.jd_power_home_score && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-sans text-sm text-neutral-600">Home insurance</span>
                      <span className="font-sans text-sm font-semibold text-neutral-800">{insurer.jd_power_home_score}/1000</span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-accent rounded-full" style={{ width: `${(insurer.jd_power_home_score / 1000) * 100}%` }} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Related calculators */}
            {relatedCalcs.length > 0 && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-sans text-base font-semibold text-neutral-800 mb-3">Useful calculators</h3>
                <ul className="space-y-2">
                  {relatedCalcs.map(c => (
                    <li key={c.href}>
                      <Link href={c.href} className="font-sans text-sm text-primary-accent hover:text-primary-dark transition-colors">{c.title} →</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Data source */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
              <p className="font-sans text-xs text-neutral-500">Data sourced from NAIC 2025 complaint database and J.D. Power 2025 U.S. Auto and Home Insurance Studies. AM Best ratings current as of 2026.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compare CTA */}
      <section className="bg-primary py-12 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="font-serif text-[28px] font-semibold text-white mb-3">Compare all insurance companies</h2>
          <p className="font-sans text-white/80 mb-6">See how {insurer.name} stacks up against GEICO, Progressive, State Farm, and more.</p>
          <Link href="/compare" className="inline-block bg-primary-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all">Compare all insurers →</Link>
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 pb-8 pt-6"><AdUnit slot="RECTANGLE_1" format="rectangle" /></div>
    </main>
  )
}
