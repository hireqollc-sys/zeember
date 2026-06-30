import type { Metadata } from 'next'
import Link from 'next/link'
import insurerData from '@/lib/data/insurer-profiles.json'
import AdUnit from '@/components/AdUnit'
import Disclaimer from '@/components/Disclaimer'
import FAQAccordion from '@/components/FAQAccordion'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Trophy, Shield, TrendingDown, Users, Star, Car } from 'lucide-react'
import InsurerComparisonCalculator from '@/components/calculators/InsurerComparisonCalculator'

export const metadata: Metadata = {
  title: 'Compare Car Insurance Companies 2026 — GEICO vs Progressive vs State Farm | Zeember',
  description: 'Compare GEICO, Progressive, State Farm, Allstate, USAA, and more side by side. NAIC complaint scores, J.D. Power ratings, and honest best-for verdicts.',
  alternates: { canonical: 'https://zeember.com/compare' },
  openGraph: {
    title: 'Compare Car Insurance Companies 2026 | Zeember',
    description: 'GEICO vs Progressive vs State Farm — honest side-by-side comparison using NAIC complaint data and J.D. Power scores.',
    url: 'https://zeember.com/compare',
    siteName: 'Zeember',
    type: 'website',
  },
}

const PRICE_TIER_LABEL: Record<string, string> = { budget: 'Budget-friendly', mid: 'Mid-tier', premium: 'Premium' }
const PRICE_TIER_COLOR: Record<string, string> = { budget: 'bg-green-100 text-green-800', mid: 'bg-blue-100 text-blue-800', premium: 'bg-purple-100 text-purple-800' }

function ndicClass(n: number) {
  if (n <= 0.5) return 'text-green-700 font-semibold'
  if (n <= 1.0) return 'text-neutral-700'
  return 'text-red-600 font-semibold'
}

function ScoreBar({ score, max = 1000 }: { score: number | null; max?: number }) {
  if (!score) return <span className="font-sans text-sm text-neutral-400">Not rated</span>
  const pct = (score / max) * 100
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
        <div className="h-full bg-primary-accent rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="font-sans text-sm font-medium text-neutral-800 w-10 text-right">{score}</span>
    </div>
  )
}

const HEAD_TO_HEAD = [
  {
    a: 'GEICO', b: 'Progressive', aHref: '/reviews/geico', bHref: '/reviews/progressive',
    verdict: 'GEICO wins for clean-record drivers',
    body: 'For most drivers with a clean record, GEICO consistently delivers lower premiums and fewer customer complaints (NAIC index 0.79 vs 0.93). Progressive flips the script if you have accidents or violations on your record — their Name Your Price tool and high-risk underwriting are purpose-built for non-standard drivers. Both are budget-tier. The deciding factor is your driving history.',
  },
  {
    a: 'GEICO', b: 'State Farm', aHref: '/reviews/geico', bHref: '/reviews/state-farm',
    verdict: 'State Farm wins on service; GEICO on price',
    body: "State Farm's J.D. Power auto score (891) beats GEICO's (874), and its NAIC complaint index (0.55) is far better than GEICO's (0.79) — meaning dramatically fewer complaints relative to its size. If you want the lowest possible premium and rarely need to call your insurer, GEICO is hard to beat. If you want a local agent and top-tier claims handling, State Farm is worth the small price premium.",
  },
  {
    a: 'State Farm', b: 'Progressive', aHref: '/reviews/state-farm', bHref: '/reviews/progressive',
    verdict: 'State Farm for most drivers; Progressive for high-risk',
    body: "State Farm outscores Progressive on every satisfaction metric — J.D. Power auto (891 vs 856), NAIC complaints (0.55 vs 0.93), and overall claims satisfaction. State Farm's Drive Safe & Save telematics program also offers meaningful discounts for low-mileage or cautious drivers. Choose Progressive only if your record includes accidents, a DUI, or other violations that would penalize you at standard carriers.",
  },
  {
    a: 'GEICO', b: 'Allstate', aHref: '/reviews/geico', bHref: '/reviews/allstate',
    verdict: 'GEICO wins on price and complaints',
    body: "Allstate's NAIC complaint index of 1.15 means it receives more complaints than average for its size — while GEICO sits at 0.79. GEICO also consistently undercuts Allstate on premium for comparable coverage. Allstate's edge is in extras: accident forgiveness, new car replacement coverage, and the Drivewise telematics program. If you specifically need those features, Allstate may be worth the higher cost. Otherwise, GEICO.",
  },
  {
    a: 'USAA', b: 'All others', aHref: '/reviews/usaa', bHref: '/compare',
    verdict: 'USAA wins on every metric — for those who qualify',
    body: "USAA's numbers are simply in a different category: NAIC complaint index 0.26 (74% fewer complaints than the industry average), J.D. Power auto score 909 (highest in the industry), and rates that compete with GEICO and Progressive. The only catch is eligibility — USAA is exclusively available to active military, veterans, and their immediate families. If you or a direct family member served, apply before comparing anyone else.",
  },
  {
    a: 'State Farm', b: 'Allstate', aHref: '/reviews/state-farm', bHref: '/reviews/allstate',
    verdict: 'State Farm wins on price, claims, and complaints',
    body: "This is one of the clearest comparisons: State Farm beats Allstate on J.D. Power auto satisfaction (891 vs 848), NAIC complaints (0.55 vs 1.15), and typically on price. Allstate counters with its accident forgiveness program — useful if you're worried about a rate spike after a first incident — and new car replacement coverage. Unless you specifically want those features, State Farm is the better pick for the average homeowner or driver.",
  },
  {
    a: 'Liberty Mutual', b: 'Progressive', aHref: '/reviews/liberty-mutual', bHref: '/reviews/progressive',
    verdict: 'Progressive wins on price; Liberty Mutual on customization',
    body: "Liberty Mutual's NAIC complaint index of 1.72 is the highest among the major carriers we track — meaning significantly more complaints per customer than average. Progressive's 0.93 is much better, and its rates for most driver profiles come in lower. Liberty Mutual's strength is coverage customization (Better Car Replacement, RightTrack telematics up to 30% off). Only choose Liberty Mutual if you specifically need those coverage options and have gotten a competitive quote.",
  },
  {
    a: 'Nationwide', b: 'State Farm', aHref: '/reviews/nationwide', bHref: '/reviews/state-farm',
    verdict: 'State Farm edges out Nationwide for most drivers',
    body: "Nationwide actually has a respectable NAIC index (0.68) and solid J.D. Power auto score (876) — but State Farm beats it on both (0.55 and 891). Where Nationwide competes strongly is bundling: up to 20% discount for combining home and auto, which rivals or beats State Farm's offering. Nationwide is also worth serious consideration for rural customers, farmers, and ranchers who need farm property or livestock coverage.",
  },
]

const BEST_FOR_CARDS = [
  {
    icon: TrendingDown,
    heading: 'Best cheap car insurance: GEICO',
    body: "GEICO's national average rates are consistently among the three lowest for clean-record drivers. Their 15-minute online quote process and strong app make it easy to get started. NAIC complaint index: 0.79.",
    href: '/reviews/geico',
    color: 'border-green-200 bg-green-50',
    iconColor: 'text-green-700',
  },
  {
    icon: Shield,
    heading: 'Best for military families: USAA',
    body: 'No other insurer comes close in satisfaction scores or complaint ratios for those who qualify. If you or a parent served in the US military, USAA is the first call to make — not the last.',
    href: '/reviews/usaa',
    color: 'border-blue-200 bg-blue-50',
    iconColor: 'text-blue-700',
  },
  {
    icon: Car,
    heading: 'Best after an accident or DUI: Progressive',
    body: "Progressive's underwriting is specifically designed for non-standard and high-risk drivers. Their Name Your Price tool lets you start with a target budget rather than a coverage level — unique in the industry.",
    href: '/reviews/progressive',
    color: 'border-orange-200 bg-orange-50',
    iconColor: 'text-orange-700',
  },
  {
    icon: Trophy,
    heading: 'Best for bundling home and auto: Nationwide or State Farm',
    body: 'Nationwide offers up to 20% bundling discount; State Farm up to 17%. Both score well on home insurance claims handling, making them reliable for combined policies.',
    href: '/reviews/nationwide',
    color: 'border-purple-200 bg-purple-50',
    iconColor: 'text-purple-700',
  },
  {
    icon: Star,
    heading: 'Best for customer service and claims: State Farm',
    body: "State Farm's NAIC complaint index (0.55) is the best among the non-USAA carriers. With over 19,000 local agents nationwide, it's the top pick for drivers who want a real person handling their policy.",
    href: '/reviews/state-farm',
    color: 'border-amber-200 bg-amber-50',
    iconColor: 'text-amber-700',
  },
  {
    icon: Users,
    heading: 'Best for teen and young drivers: State Farm',
    body: "State Farm's Steer Clear program for drivers under 25 offers meaningful premium discounts after course completion. Their Drive Safe & Save telematics is also among the most rewarding for low-mileage young drivers.",
    href: '/reviews/state-farm',
    color: 'border-teal-200 bg-teal-50',
    iconColor: 'text-teal-700',
  },
]

const FAQ_ITEMS = [
  {
    question: 'Which is cheaper — GEICO or Progressive?',
    answer: "For drivers with a clean record, GEICO is typically cheaper than Progressive. GEICO's national average rates run 5–15% below Progressive's for standard risk profiles. However, Progressive is often cheaper for drivers with accidents, DUIs, or serious violations on their record — their high-risk underwriting and Name Your Price tool give them an edge in that segment. Always get a quote from both: rates vary significantly by state and individual profile.",
  },
  {
    question: 'Is State Farm or GEICO better for most drivers?',
    answer: "State Farm scores higher on customer satisfaction and claims handling — J.D. Power auto score 891 vs GEICO's 874, and an NAIC complaint index of 0.55 vs 0.79. GEICO typically offers lower premiums, especially for online-only customers who rarely need to call their insurer. The decision comes down to priorities: if price is everything, GEICO. If you want an agent relationship and top-rated claims experience, State Farm is worth the modest price premium.",
  },
  {
    question: 'What does the NAIC complaint index mean for insurance companies?',
    answer: "The National Association of Insurance Commissioners (NAIC) complaint index measures an insurer's complaint volume relative to its market share. A score of 1.0 is industry average. Below 1.0 means fewer complaints than expected for a company that size — better. Above 1.0 means more complaints than expected — worse. USAA (0.26) and State Farm (0.55) are best-in-class. Liberty Mutual (1.72) receives significantly more complaints than average. It's one of the most objective indicators of real-world service quality.",
  },
  {
    question: 'How do J.D. Power auto insurance scores work?',
    answer: "J.D. Power surveys thousands of auto insurance customers annually and rates their satisfaction across five areas: interaction, policy offerings, price, billing process, and claims. Scores range from 0 to 1,000. The industry average fluctuates around 870–880. USAA consistently leads at 909, followed by State Farm (891) and Nationwide (876). Progressive (856) and Liberty Mutual (822) score below average. These scores reflect overall satisfaction — not just one touchpoint like claims.",
  },
  {
    question: 'Is USAA available to everyone?',
    answer: "No. USAA is exclusively available to current and former US military members (active duty, veterans, and National Guard/Reserve) and their immediate family members (spouses and children). If you qualify, USAA leads the industry on virtually every metric: lowest complaint ratio (0.26), highest J.D. Power scores (909 auto, 882 home), competitive rates, and outstanding claims handling. If you don't qualify, State Farm and Nationwide are the next best alternatives for satisfaction-focused buyers.",
  },
  {
    question: 'Who has the cheapest car insurance in 2026?',
    answer: "Among major national carriers, GEICO and USAA (for those eligible) consistently offer the lowest rates for standard-risk drivers. For high-risk drivers, Progressive often wins. State Farm and Nationwide offer competitive rates when bundling home and auto. Keep in mind that rates vary dramatically by state, age, vehicle type, driving record, and credit score — a company that's cheapest for your neighbor may not be cheapest for you. The only way to find your cheapest option is to get quotes from at least 3–4 carriers.",
  },
  {
    question: 'Which insurance company is best after an accident or DUI?',
    answer: "Progressive is widely regarded as the best major carrier for high-risk drivers — those with accidents, DUIs, reckless driving convictions, or multiple violations. Their Name Your Price tool and SR-22 filing capabilities make them a practical choice when other carriers decline or quote prohibitively high rates. Non-standard carrier options (like The General or Dairyland) exist for very high-risk profiles, but Progressive is usually the best starting point among mainstream insurers.",
  },
  {
    question: 'Should I bundle home and auto insurance with the same company?',
    answer: "Bundling typically saves 5–25% on your combined premium, and it simplifies claims when both your home and car are damaged in the same event (like a severe storm). Nationwide (up to 20% discount) and State Farm (up to 17%) are the strongest bundlers among major carriers. However, bundling isn't always the right call: if one carrier is dramatically cheaper for auto and another is cheaper for home, splitting policies can save more overall. Run the numbers both ways before bundling automatically.",
  },
  {
    question: 'Is Liberty Mutual a good insurance company?',
    answer: "Liberty Mutual has the highest NAIC complaint index (1.72) among the eight major carriers we track, meaning significantly more complaints per customer than the industry average. Its J.D. Power auto score (822) is also below average. Where Liberty Mutual differentiates is in coverage options — Better Car Replacement covers a newer model if your car is totaled, and RightTrack telematics can reduce premiums by up to 30%. It can be a solid choice if you specifically need those coverages and get a competitive quote, but we'd recommend comparing State Farm, GEICO, or Nationwide first.",
  },
  {
    question: 'Is Nationwide insurance worth it compared to larger national brands?',
    answer: "Yes — Nationwide is often underestimated. Its NAIC complaint index (0.68) is the second-best among non-USAA carriers, and its J.D. Power auto score (876) is competitive with State Farm. Nationwide's On Your Side claims review process is a genuine differentiator, and its bundling discounts (up to 20% for home and auto) are among the most generous in the industry. The main limitation is availability — Nationwide isn't sold in all states, and its online quoting experience lags behind GEICO or Progressive.",
  },
  {
    question: 'How often should I compare insurance companies and shop for new rates?',
    answer: "Most financial advisors recommend comparing auto insurance rates every 12–18 months. You should also shop when a major life event occurs: moving to a new state, buying a new vehicle, getting married, adding a teen driver, or having an at-fault accident. Insurance pricing algorithms change frequently, and the company that was cheapest 2 years ago may not be cheapest today. Getting 3–4 quotes takes under 30 minutes and can save hundreds of dollars annually.",
  },
  {
    question: 'What does AM Best rating mean for insurance companies?',
    answer: "AM Best is an independent credit rating agency that assesses the financial strength of insurance companies — their ability to pay claims. Ratings range from A++ (Superior) down to D. A++ or A+ means the company is in excellent financial health and highly unlikely to fail. A means excellent. Most major carriers in the US carry A or better. GEICO, State Farm, and USAA hold A++ (Superior) ratings. A company with a B or below rating is a meaningful risk — you could file a claim and face a financially troubled insurer.",
  },
  {
    question: 'Is Farmers insurance a good choice in 2026?',
    answer: "Farmers occupies a premium tier — their rates run higher than GEICO, Progressive, or State Farm for most standard risk profiles. Their J.D. Power home score (791) is below average, which is a weakness. However, Farmers offers some coverage options that competitors don't: rideshare insurance for Uber and Lyft drivers, classic and antique car coverage, and strong local agent relationships for complex needs. Farmers is worth considering if you drive for rideshare or own collectible vehicles — otherwise, the price premium is hard to justify.",
  },
  {
    question: 'Which insurer is best for teen and young drivers?',
    answer: "State Farm's Steer Clear program is specifically designed for drivers under 25 and offers premium discounts after completing the program's modules and drive logging. State Farm's Drive Safe & Save telematics program also rewards low mileage and safe habits — particularly valuable for teens who drive infrequently. GEICO's DriveEasy and Progressive's Snapshot are alternatives worth comparing. If the teen is being added to a parent's existing policy, bundling discounts can offset some of the significant premium increase that teen drivers trigger.",
  },
  {
    question: 'How do I choose between insurance companies?',
    answer: "Start with three data points: the NAIC complaint index (measures real-world service quality), J.D. Power scores (measures customer satisfaction), and AM Best rating (measures financial strength). Then get quotes from at least 3–4 carriers for your specific profile — rates vary enormously. Consider your priorities: if you want the lowest premium and rarely interact with your insurer, GEICO or Progressive. If you value a local agent and top-tier claims handling, State Farm. If you're eligible, check USAA first. Bundling discounts, telematics programs, and available coverage options can shift the value equation significantly.",
  },
]

const ITEM_LIST_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Car Insurance Companies 2026',
  description: 'Top-rated auto insurance companies ranked by J.D. Power customer satisfaction, NAIC complaint index, and AM Best financial strength rating.',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'USAA', url: 'https://zeember.com/reviews/usaa', description: 'Best overall — highest J.D. Power scores, lowest complaint ratio. Military and veterans only.' },
    { '@type': 'ListItem', position: 2, name: 'State Farm', url: 'https://zeember.com/reviews/state-farm', description: 'Best for customer service and claims. Largest agent network in the US.' },
    { '@type': 'ListItem', position: 3, name: 'Nationwide', url: 'https://zeember.com/reviews/nationwide', description: 'Best for bundling home and auto. Low complaint ratio and solid J.D. Power scores.' },
    { '@type': 'ListItem', position: 4, name: 'GEICO', url: 'https://zeember.com/reviews/geico', description: 'Best for lowest price. Consistently cheapest for clean-record drivers.' },
    { '@type': 'ListItem', position: 5, name: 'Progressive', url: 'https://zeember.com/reviews/progressive', description: 'Best for high-risk drivers and after accidents or DUI.' },
    { '@type': 'ListItem', position: 6, name: 'Allstate', url: 'https://zeember.com/reviews/allstate', description: 'Best for accident forgiveness and new car replacement coverage.' },
    { '@type': 'ListItem', position: 7, name: 'Farmers', url: 'https://zeember.com/reviews/farmers', description: 'Best for rideshare drivers and classic car owners.' },
    { '@type': 'ListItem', position: 8, name: 'Liberty Mutual', url: 'https://zeember.com/reviews/liberty-mutual', description: 'Best for customizable coverage options and Better Car Replacement.' },
  ],
}

export default function ComparePage() {
  const insurers = insurerData.insurers

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ITEM_LIST_JSON_LD) }}
      />

      {/* Hero */}
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[56px] font-bold text-primary-dark mb-4">Compare car insurance companies</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl mb-2">GEICO vs Progressive vs State Farm — and 5 more. Data sourced from NAIC complaint reports and J.D. Power surveys. No company pays to be listed or ranked.</p>
          <p className="font-sans text-sm text-neutral-500">NAIC complaint index: below 1.0 is better than average. J.D. Power scores out of 1,000.</p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 py-4"><AdUnit slot="LEADERBOARD_1" format="leaderboard" /></div>

      {/* Interactive comparison calculator */}
      <section className="max-w-[1280px] mx-auto px-6 py-10 border-b border-neutral-100">
        <InsurerComparisonCalculator />
      </section>

      {/* Main table */}
      <section className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
          <span className="text-amber-600 text-xl">★</span>
          <div>
            <p className="font-sans text-sm font-semibold text-amber-800">USAA is only available to military members, veterans, and their immediate families</p>
            <p className="font-sans text-sm text-amber-700">If you or a family member served in the US military, USAA consistently scores highest in every major satisfaction metric — apply first.</p>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full font-sans text-sm">
            <thead>
              <tr className="border-b-2 border-neutral-200 bg-neutral-50">
                <th className="text-left py-3 px-4 text-neutral-600 font-medium">Company</th>
                <th className="text-left py-3 px-4 text-neutral-600 font-medium">Price tier</th>
                <th className="text-right py-3 px-4 text-neutral-600 font-medium">NAIC complaint index</th>
                <th className="text-left py-3 px-4 text-neutral-600 font-medium">J.D. Power auto</th>
                <th className="text-left py-3 px-4 text-neutral-600 font-medium">J.D. Power home</th>
                <th className="text-left py-3 px-4 text-neutral-600 font-medium">AM Best</th>
                <th className="text-left py-3 px-4 text-neutral-600 font-medium">Best for</th>
                <th className="py-3 px-4" />
              </tr>
            </thead>
            <tbody>
              {insurers.map(ins => (
                <tr key={ins.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-4">
                    <Link href={`/reviews/${ins.id}`} className="font-semibold text-primary-dark hover:text-primary-accent transition-colors">
                      {ins.name}
                    </Link>
                    {ins.military_only && <span className="ml-2 font-sans text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Military only</span>}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-sans text-xs font-semibold px-2.5 py-1 rounded-full ${PRICE_TIER_COLOR[ins.price_tier]}`}>{PRICE_TIER_LABEL[ins.price_tier]}</span>
                  </td>
                  <td className={`py-4 px-4 text-right ${ndicClass(ins.naic_complaint_index)}`}>{ins.naic_complaint_index}</td>
                  <td className="py-4 px-4 min-w-[140px]"><ScoreBar score={ins.jd_power_auto_score} /></td>
                  <td className="py-4 px-4 min-w-[140px]"><ScoreBar score={ins.jd_power_home_score} /></td>
                  <td className="py-4 px-4 font-medium text-neutral-700">{ins.am_best_rating}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {ins.best_for.slice(0, 2).map(b => (
                        <span key={b} className="font-sans text-xs bg-primary-light text-primary-dark px-2 py-0.5 rounded-full">{b}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Link href={`/reviews/${ins.id}`} className="font-sans text-sm font-medium text-primary-accent hover:text-primary-dark transition-colors whitespace-nowrap">View review →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden grid gap-4">
          {insurers.map(ins => (
            <div key={ins.id} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-sans text-lg font-semibold text-neutral-800">{ins.name}</h3>
                  <span className={`font-sans text-xs font-semibold px-2.5 py-1 rounded-full ${PRICE_TIER_COLOR[ins.price_tier]}`}>{PRICE_TIER_LABEL[ins.price_tier]}</span>
                </div>
                {ins.military_only && <Badge className="bg-amber-100 text-amber-700 border-amber-200">Military only</Badge>}
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div><p className="font-sans text-xs text-neutral-500">NAIC complaint</p><p className={`font-sans text-base font-semibold ${ndicClass(ins.naic_complaint_index)}`}>{ins.naic_complaint_index}</p></div>
                <div><p className="font-sans text-xs text-neutral-500">AM Best</p><p className="font-sans text-base font-semibold text-neutral-800">{ins.am_best_rating}</p></div>
              </div>
              <p className="font-sans text-sm text-neutral-600 mb-3 line-clamp-2">{ins.summary}</p>
              <Link href={`/reviews/${ins.id}`} className="font-sans text-sm font-semibold text-primary-accent hover:text-primary-dark transition-colors">View full review →</Link>
            </div>
          ))}
        </div>

        <Disclaimer type="comparison" />
      </section>

      {/* Best for verdict cards */}
      <section className="bg-neutral-50 py-14 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-serif text-[28px] md:text-[36px] font-semibold text-primary-dark mb-3">Best car insurance company by category</h2>
          <p className="font-sans text-base text-neutral-600 mb-8 max-w-2xl">Each insurer has a different strength. Here is where each carrier wins — and who it is best for.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BEST_FOR_CARDS.map(card => {
              const Icon = card.icon
              return (
                <div key={card.heading} className={`border rounded-2xl p-6 ${card.color}`}>
                  <div className={`flex items-center gap-2 mb-3 ${card.iconColor}`}>
                    <Icon className="h-5 w-5" />
                    <h3 className="font-sans text-[17px] font-semibold text-neutral-800">{card.heading}</h3>
                  </div>
                  <p className="font-sans text-sm text-neutral-700 mb-3 leading-relaxed">{card.body}</p>
                  <Link href={card.href} className="font-sans text-sm font-medium text-primary-accent hover:text-primary-dark transition-colors">Read the full review →</Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Head-to-head matchups */}
      <section className="py-14 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-serif text-[28px] md:text-[36px] font-semibold text-primary-dark mb-3">Head-to-head comparisons</h2>
          <p className="font-sans text-base text-neutral-600 mb-8 max-w-2xl">The eight most-searched carrier matchups — with a clear verdict and the reasoning behind it.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {HEAD_TO_HEAD.map(match => (
              <div key={`${match.a}-${match.b}`} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Link href={match.aHref} className="font-sans text-base font-bold text-primary-dark hover:text-primary-accent transition-colors">{match.a}</Link>
                  <span className="font-sans text-sm text-neutral-400">vs</span>
                  <Link href={match.bHref} className="font-sans text-base font-bold text-primary-dark hover:text-primary-accent transition-colors">{match.b}</Link>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-4 w-4 text-primary-accent flex-shrink-0" />
                  <p className="font-sans text-sm font-semibold text-primary-dark">{match.verdict}</p>
                </div>
                <p className="font-sans text-sm text-neutral-600 leading-relaxed">{match.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-50 py-14 px-6">
        <div className="max-w-[1280px] mx-auto max-w-3xl">
          <FAQAccordion items={FAQ_ITEMS} pageUrl="https://zeember.com/compare" />
        </div>
      </section>

      {/* Methodology */}
      <section className="py-12 px-6 border-t border-neutral-100">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-serif text-[24px] font-semibold text-primary-dark mb-4">How we compare insurance companies</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-sans text-base font-semibold text-neutral-800 mb-2">NAIC complaint index</h3>
              <p className="font-sans text-sm text-neutral-600 leading-relaxed">The National Association of Insurance Commissioners tracks every complaint filed against US insurers. The index compares complaint volume to market share — below 1.0 is better than average. Data updated annually from public NAIC filings.</p>
            </div>
            <div>
              <h3 className="font-sans text-base font-semibold text-neutral-800 mb-2">J.D. Power satisfaction scores</h3>
              <p className="font-sans text-sm text-neutral-600 leading-relaxed">J.D. Power surveys thousands of policyholders annually on overall satisfaction, claims experience, billing, and customer interaction. Scores range from 0–1,000. We use the most recent US Auto Insurance Study results.</p>
            </div>
            <div>
              <h3 className="font-sans text-base font-semibold text-neutral-800 mb-2">AM Best financial ratings</h3>
              <p className="font-sans text-sm text-neutral-600 leading-relaxed">AM Best assesses each insurer's ability to meet ongoing obligations to policyholders. Ratings range from A++ (Superior) to D. We only list carriers with A or better ratings — all eight listed here meet that standard.</p>
            </div>
          </div>
          <p className="font-sans text-xs text-neutral-400 mt-6">Data sourced from NAIC 2025 complaint data, J.D. Power 2025 US Auto Insurance Study, and AM Best ratings as of 2026. No insurer pays to be listed, ranked, or reviewed on Zeember.</p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 pb-8"><AdUnit slot="RECTANGLE_1" format="rectangle" /></div>
    </main>
  )
}
