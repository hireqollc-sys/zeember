import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, BarChart2, Map, Database } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Zeember — Insurance Cost Intelligence | Zeember',
  description: 'Zeember provides free US insurance cost calculators and comparisons. No personal info collected. Data sourced from NAIC, III, and J.D. Power.',
  alternates: { canonical: 'https://zeember.com/about' },
}

const dataSources = [
  {
    name: 'NAIC (National Association of Insurance Commissioners)',
    detail: 'State-level auto, home, and renters insurance premium data from the annual database reports.',
  },
  {
    name: 'Insurance Information Institute (III)',
    detail: 'National trends, average premiums by type, and state cost rankings.',
  },
  {
    name: 'J.D. Power Insurance Studies',
    detail: 'Customer satisfaction scores used in insurer comparison data.',
  },
  {
    name: 'AM Best',
    detail: 'Financial strength ratings for insurer profiles.',
  },
  {
    name: 'Internal actuarial research',
    detail: 'Multiplier calibration for individual risk factors using publicly available industry data.',
  },
]

const trustStats = [
  { icon: BarChart2, stat: '30+', label: 'Free calculators' },
  { icon: Map, stat: '50', label: 'States covered' },
  { icon: Database, stat: 'NAIC', label: 'Sourced data' },
]

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary py-20 px-6">
        <div className="max-w-[780px] mx-auto">
          <h1 className="font-serif text-[40px] md:text-[52px] font-bold text-white mb-4">
            About Zeember
          </h1>
          <p className="font-sans text-xl text-primary-accent font-medium">
            Know what coverage really costs.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-neutral-50 py-16 px-6">
        <div className="max-w-[780px] mx-auto space-y-6">

          {/* Mission */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-[26px] font-semibold text-primary-dark mb-4">Our mission</h2>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700">
              Zeember is a free US insurance cost intelligence platform. We build calculators, comparison tools, and educational guides that help you understand what insurance actually costs before you talk to an agent or enter your information on a lead-generation site.
            </p>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700 mt-4">
              We do not sell your information. We do not require an account. We do not store your calculator inputs. Every estimate is computed entirely on your device.
            </p>
          </div>

          {/* How calculators work */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-[26px] font-semibold text-primary-dark mb-4">How our calculators work</h2>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700">
              Each calculator starts with state-level average insurance costs sourced from NAIC public reports and the Insurance Information Institute, then applies actuarially-derived multipliers for individual risk factors: age, driving record, vehicle type, coverage level, home value, and others.
            </p>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700 mt-4">
              The result is an estimate — not a quote. Actual rates require individualized underwriting by a licensed insurer and vary based on factors we do not collect, including your specific address, full claims history, credit-based insurance score, and the insurer&apos;s internal rating algorithms. Our estimates are designed to give you a realistic range before you begin that process.
            </p>
          </div>

          {/* Data sources */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-[26px] font-semibold text-primary-dark mb-6">Data sources</h2>
            <ul className="space-y-5">
              {dataSources.map(source => (
                <li key={source.name} className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary-accent flex-shrink-0 mt-0.5" />
                  <div className="font-sans text-[17px] text-neutral-700 leading-relaxed">
                    <strong className="text-neutral-800">{source.name}</strong>
                    {' — '}
                    {source.detail}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* No personal info */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-[26px] font-semibold text-primary-dark mb-4">No personal information collected</h2>
            <p className="font-sans text-[17px] leading-relaxed text-neutral-700">
              Calculator inputs are processed entirely in your browser. We do not transmit, store, or sell any information you enter into our calculators. The only third-party data collection on this site is through Google AdSense, which uses cookies for ad personalization per Google&apos;s standard policies.
            </p>
          </div>

          {/* Disclaimer amber box */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-sans text-base font-semibold text-amber-800 mb-2">Important disclaimer</h3>
            <p className="font-sans text-sm text-amber-700 leading-relaxed">
              Zeember is not a licensed insurance agent, broker, or company. We do not sell insurance and cannot provide binding quotes. All estimates are for informational and educational purposes only. For actual coverage and pricing, contact a licensed insurance agent or use the insurer&apos;s official quoting tools.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 flex-wrap pt-2">
            <Link href="/methodology" className="font-sans text-sm font-semibold text-primary-accent hover:text-primary-dark transition-colors">
              Read our methodology →
            </Link>
            <Link href="/contact" className="font-sans text-sm font-semibold text-primary-accent hover:text-primary-dark transition-colors">
              Contact us →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-primary-light py-14 px-6">
        <div className="max-w-[780px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustStats.map(({ icon: Icon, stat, label }) => (
              <div key={label} className="bg-white border border-primary-accent/20 rounded-2xl p-6 shadow-sm text-center">
                <Icon className="h-7 w-7 text-primary-accent mx-auto mb-3" />
                <p className="font-serif text-3xl font-bold text-primary-dark mb-1">{stat}</p>
                <p className="font-sans text-sm text-neutral-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
