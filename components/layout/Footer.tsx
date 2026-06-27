import Link from 'next/link'
import Image from 'next/image'

const footerColumns = [
  {
    heading: 'Calculators',
    links: [
      { label: 'Auto Insurance', href: '/auto-insurance-calculator' },
      { label: 'Life Insurance', href: '/how-much-life-insurance-do-i-need' },
      { label: 'Home Insurance', href: '/home-insurance-calculator' },
      { label: 'Renters Insurance', href: '/renters-insurance-calculator' },
      { label: 'Health Deductible', href: '/health-insurance-deductible-calculator' },
      { label: 'HSA Calculator', href: '/hsa-contribution-calculator' },
      { label: 'COBRA Cost', href: '/cobra-cost-calculator' },
      { label: 'Pet Insurance', href: '/pet-insurance-calculator' },
    ],
  },
  {
    heading: 'Insurance Types',
    links: [
      { label: 'Full vs Liability', href: '/full-coverage-vs-liability-calculator' },
      { label: 'Term vs Whole Life', href: '/term-vs-whole-life-insurance' },
      { label: 'Gap Insurance', href: '/gap-insurance-calculator' },
      { label: 'SR-22 Insurance', href: '/sr-22-insurance-calculator' },
      { label: 'Umbrella Insurance', href: '/umbrella-insurance-calculator' },
      { label: 'Flood Insurance', href: '/flood-insurance-calculator' },
      { label: 'Teen Driver', href: '/teen-driver-insurance-calculator' },
      { label: 'Disability Insurance', href: '/disability-insurance-calculator' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Compare Insurers', href: '/compare' },
      { label: 'Insurance by State', href: '/state-map' },
      { label: 'Rate Trends', href: '/trends' },
      { label: 'Insurance Glossary', href: '/glossary' },
      { label: 'Life Events', href: '/life-events/just-got-married' },
      { label: 'Insurance Guides', href: '/blog' },
      { label: 'Quizzes', href: '/quizzes/do-i-need-umbrella-insurance' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-primary">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Logo */}
        <div className="mb-10">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Zeember" width={32} height={32} />
            <span className="font-serif text-2xl font-bold text-white">Zeember</span>
          </div>
          <p className="font-sans text-sm text-white/60 mt-2">Know what coverage really costs.</p>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-sans text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-white/70">
            © 2026 Zeember. Insurance cost estimates for informational purposes only.
          </p>
          <p className="font-sans text-xs text-white/40">
            Developed by{' '}
            <a href="https://matowodev.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              Matowo Dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
