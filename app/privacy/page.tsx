import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Zeember',
  description: 'Zeember privacy policy. We do not collect personal information from calculator usage.',
  alternates: { canonical: 'https://zeember.com/privacy' },
  robots: { index: false, follow: true },
}

const sections = [
  {
    heading: 'Information we collect',
    content: [
      'Zeember does not collect, store, or sell personal information from your use of our calculators. Information you enter into any calculator — your age, income, location, vehicle details, home value, coverage preferences — is processed entirely in your browser and is never transmitted to our servers.',
      'We do not require account creation. We do not use login systems. We do not track individual calculator sessions or link results to any identifiable user.',
    ],
  },
  {
    heading: 'How we use information',
    content: [
      'Because we do not collect personal information, we do not use it. Calculator inputs exist solely on your device during your session and are discarded when you close the page.',
      'We may use anonymous, aggregated analytics (such as page view counts) to understand how visitors use the site. This data is not personally identifiable and cannot be linked to any individual user.',
    ],
  },
  {
    heading: 'Third-party services — Google AdSense',
    content: [
      'Zeember displays advertisements served by Google AdSense. Google uses cookies to serve ads based on your prior visits to this and other websites. Google\'s use of advertising cookies enables it and its partners to serve ads based on your visit to Zeember and/or other sites on the Internet.',
      'You may opt out of personalized advertising by visiting www.aboutads.info or by adjusting your Google Ad Settings at adssettings.google.com. You can also opt out via your browser\'s privacy settings.',
    ],
  },
  {
    heading: 'Cookies',
    content: [
      'The only cookies set on Zeember are those placed by Google AdSense for ad personalization. We do not set any first-party cookies for tracking, analytics, or session management.',
      'To block all cookies on Zeember, configure your browser\'s cookie settings. Note that blocking AdSense cookies will not affect your ability to use any calculator on the site.',
    ],
  },
  {
    heading: 'External links',
    content: [
      'Zeember contains links to external insurance company websites and quoting tools. We are not responsible for the privacy practices of these external sites. Review each site\'s privacy policy before submitting personal information to them.',
    ],
  },
  {
    heading: 'Your rights',
    content: [
      'Because Zeember does not collect or store your personal information, there is no personal data for us to access, correct, or delete on your behalf. If you have questions about how Google uses data, visit policies.google.com.',
      'Zeember is not directed to children under 13 and does not knowingly collect any information from children.',
    ],
  },
  {
    heading: 'Contact information',
    content: [
      'Questions about this privacy policy? Contact us at privacy@zeember.com. We aim to respond to privacy inquiries within 5 business days.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary py-20 px-6">
        <div className="max-w-[780px] mx-auto">
          <h1 className="font-serif text-[40px] md:text-[52px] font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="font-sans text-lg text-white/60">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-neutral-50 py-16 px-6">
        <div className="max-w-[780px] mx-auto space-y-6">
          {sections.map(section => (
            <div
              key={section.heading}
              className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm"
            >
              <h2 className="font-serif text-[22px] font-semibold text-primary-dark mb-4">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.content.map((para, i) => (
                  <p key={i} className="font-sans text-[17px] leading-relaxed text-neutral-700">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
