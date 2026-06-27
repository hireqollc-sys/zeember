import type { Metadata } from 'next'
import { Mail, AlertCircle, CheckCircle, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Zeember | Zeember',
  description: 'Contact the Zeember team with questions, feedback, or data corrections.',
  alternates: { canonical: 'https://zeember.com/contact' },
  robots: { index: false, follow: true },
}

const canHelpWith = [
  'Reporting incorrect data in our calculators or state averages',
  'Suggesting new calculators or tools we should build',
  'Reporting a broken page or technical issue',
  'Press and media inquiries',
  'Methodology questions',
]

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary py-20 px-6">
        <div className="max-w-[780px] mx-auto">
          <h1 className="font-serif text-[40px] md:text-[52px] font-bold text-white mb-4">
            Contact us
          </h1>
          <p className="font-sans text-xl text-white/70">
            We typically respond within 2–3 business days.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-neutral-50 py-16 px-6">
        <div className="max-w-[780px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">

            {/* Left column — 60% */}
            <div className="md:col-span-3 space-y-6">

              {/* What we can help with */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
                <h2 className="font-serif text-[22px] font-semibold text-primary-dark mb-5">
                  What we can help with
                </h2>
                <ul className="space-y-3">
                  {canHelpWith.map(item => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-primary-accent flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-[16px] text-neutral-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What we cannot help with */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <div className="flex gap-3 mb-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <h2 className="font-sans text-base font-semibold text-amber-800">
                    What we cannot help with
                  </h2>
                </div>
                <p className="font-sans text-[15px] text-amber-700 leading-relaxed">
                  Zeember is not a licensed insurance agent or company. We cannot provide binding quotes, recommend specific policies, or assist with claims. For these needs, contact a licensed insurance agent directly or use an insurer&apos;s official quoting tool.
                </p>
              </div>

            </div>

            {/* Right column — 40% */}
            <div className="md:col-span-2 space-y-6">

              {/* Email card */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm text-center">
                <Mail className="h-10 w-10 text-primary-accent mx-auto mb-4" />
                <p className="font-sans text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                  Email us
                </p>
                <a
                  href="mailto:hello@zeember.com"
                  className="font-serif text-[22px] font-semibold text-primary-dark hover:text-primary-accent transition-colors block mb-3"
                >
                  hello@zeember.com
                </a>
                <p className="font-sans text-sm text-neutral-500">
                  General inquiries, feedback, and data corrections
                </p>
              </div>

              {/* Response time card */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <div className="flex gap-3 items-start">
                  <Clock className="h-5 w-5 text-primary-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-[15px] font-semibold text-neutral-800 mb-1">
                      Data correction requests
                    </p>
                    <p className="font-sans text-[14px] text-neutral-500 leading-relaxed">
                      Data corrections are reviewed within 5 business days. Include the page URL and the specific value you believe is incorrect.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
