import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Zeember',
  description: 'Zeember privacy policy. We do not collect personal information from calculator usage.',
  alternates: { canonical: 'https://zeember.com/privacy' },
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[48px] font-bold text-primary-dark mb-2">Privacy Policy</h1>
          <p className="font-sans text-sm text-neutral-500">Last updated: January 2026</p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="max-w-2xl space-y-8 font-sans text-[17px] leading-[1.8] text-neutral-700">
          <div>
            <h2 className="font-serif text-[22px] font-semibold text-primary-dark mb-3">What we do not collect</h2>
            <p>Zeember does not collect, store, or sell personal information from your use of our calculators. Information you enter into any calculator — your age, income, location, vehicle details, home value, coverage preferences — is processed entirely in your browser and is not transmitted to our servers.</p>
            <p className="mt-3">We do not require account creation. We do not use login systems. We do not track individual calculator sessions.</p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] font-semibold text-primary-dark mb-3">Google AdSense</h2>
            <p>Zeember displays advertisements served by Google AdSense. Google uses cookies to serve ads based on your prior visits to this and other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to Zeember and/or other sites on the Internet.</p>
            <p className="mt-3">You may opt out of personalized advertising by visiting <strong>www.aboutads.info</strong> or by adjusting your Google Ad Settings at <strong>adssettings.google.com</strong>.</p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] font-semibold text-primary-dark mb-3">Analytics</h2>
            <p>We may use anonymous, aggregated analytics tools (such as page view counts) to understand how visitors use the site. This data is not personally identifiable and is not linked to any individual user.</p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] font-semibold text-primary-dark mb-3">External links</h2>
            <p>Zeember contains links to external insurance company websites and quoting tools. We are not responsible for the privacy practices of these external sites. Review each site&apos;s privacy policy before submitting personal information.</p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] font-semibold text-primary-dark mb-3">Children</h2>
            <p>Zeember is not directed to children under 13 and does not knowingly collect any information from children.</p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] font-semibold text-primary-dark mb-3">Contact</h2>
            <p>Questions about this privacy policy? Contact us at <strong>privacy@zeember.com</strong>.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
