import type { Metadata } from 'next'
import Link from 'next/link'
import insurerData from '@/lib/data/insurer-profiles.json'
import AdUnit from '@/components/AdUnit'
import Disclaimer from '@/components/Disclaimer'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Compare Insurance Companies Side by Side | Zeember',
  description: 'Compare GEICO, Progressive, State Farm, Allstate, Liberty Mutual, Nationwide, Farmers, and USAA. Honest data, no sponsorships.',
  alternates: { canonical: 'https://zeember.com/compare' },
  openGraph: { title: 'Compare Insurance Companies | Zeember', url: 'https://zeember.com/compare', siteName: 'Zeember', type: 'website' },
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

export default function ComparePage() {
  const insurers = insurerData.insurers

  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[56px] font-bold text-primary-dark mb-4">Compare insurance companies</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl mb-2">Data sourced from NAIC complaint reports and J.D. Power surveys. No company pays to be listed or ranked.</p>
          <p className="font-sans text-sm text-neutral-500">NAIC complaint index: below 1.0 is better than average. J.D. Power scores out of 1,000.</p>
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 py-4"><AdUnit slot="LEADERBOARD_1" format="leaderboard" /></div>

      <section className="max-w-[1280px] mx-auto px-6 py-8">
        {/* USAA note */}
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

      {/* Quick comparison section */}
      <section className="bg-neutral-50 py-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-serif text-[28px] font-semibold text-primary-dark mb-6">Quick guide: which insurer is right for you?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { situation: 'I want the lowest premium', answer: 'GEICO or USAA (if eligible). GEICO consistently ranks among the cheapest for clean-record drivers nationally.', href: '/reviews/geico' },
              { situation: 'I had an accident or violation', answer: 'Progressive. Their Name Your Price tool and high-risk driver rates are often best-in-class after incidents.', href: '/reviews/progressive' },
              { situation: 'I want the best claims experience', answer: 'USAA (if eligible) or State Farm. Both score highest in J.D. Power claims satisfaction surveys.', href: '/reviews/state-farm' },
              { situation: 'I want a local agent', answer: 'State Farm has the largest agent network in the US. Farmers is also strong for agent-based service.', href: '/reviews/state-farm' },
              { situation: 'I want to bundle home and auto', answer: 'Nationwide (up to 20% discount) or State Farm (17%). Both score well on home insurance claims.', href: '/reviews/nationwide' },
              { situation: 'I am military or a veteran', answer: 'USAA — no other insurer comes close. Lowest complaint index, highest J.D. Power scores, competitive rates.', href: '/reviews/usaa' },
            ].map(item => (
              <div key={item.situation} className="bg-white border border-neutral-200 rounded-xl p-5">
                <p className="font-sans text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary-accent" />{item.situation}</p>
                <p className="font-sans text-sm text-neutral-600 mb-2">{item.answer}</p>
                <Link href={item.href} className="font-sans text-xs font-medium text-primary-accent hover:text-primary-dark transition-colors">Read the full review →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 pb-8"><AdUnit slot="RECTANGLE_1" format="rectangle" /></div>
    </main>
  )
}
