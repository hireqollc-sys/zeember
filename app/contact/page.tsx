import type { Metadata } from 'next'
import { Mail, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Zeember | Zeember',
  description: 'Contact the Zeember team with questions, feedback, or data corrections.',
  alternates: { canonical: 'https://zeember.com/contact' },
  robots: { index: false, follow: true },
}

export default function ContactPage() {
  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[48px] font-bold text-primary-dark mb-3">Contact us</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-xl">Have a question, found a data error, or want to report an issue?</p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="max-w-lg space-y-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="h-5 w-5 text-primary-accent" />
              <h2 className="font-sans text-lg font-semibold text-neutral-800">Email us</h2>
            </div>
            <p className="font-sans text-[17px] text-neutral-700 mb-2">For general inquiries, data corrections, or feedback:</p>
            <a href="mailto:hello@zeember.com" className="font-sans text-primary-accent font-semibold hover:text-primary-dark transition-colors">hello@zeember.com</a>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-sans text-sm font-semibold text-amber-800 mb-1">We cannot provide insurance quotes</p>
              <p className="font-sans text-sm text-amber-700">Zeember is not a licensed insurance agent or company. We cannot provide binding quotes, recommend specific policies, or help with claims. For these needs, contact a licensed insurance agent directly or use an insurer&apos;s official quoting tool.</p>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <h2 className="font-sans text-lg font-semibold text-neutral-800 mb-3">What we can help with</h2>
            <ul className="space-y-2 font-sans text-sm text-neutral-700">
              {[
                'Reporting incorrect data in our calculators or state averages',
                'Suggesting new calculators or tools we should build',
                'Reporting a broken page or technical issue',
                'Press and media inquiries',
                'Methodology questions',
              ].map(item => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary-accent">&#8226;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="font-sans text-sm text-neutral-500">We aim to respond within 2-3 business days. Data correction requests are typically reviewed within 5 business days.</p>
        </div>
      </section>
    </main>
  )
}
