import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Shield,
  Heart,
  Home,
  Activity,
  Building2,
  ArrowLeftRight,
  Sparkles,
  Baby,
  Car,
  Clock,
  MapPin,
  Dog,
  Briefcase,
  BarChart2,
  CheckCircle2,
  MousePointerClick,
  Database,
  RefreshCw,
  Lock,
  ArrowRight,
} from 'lucide-react'
import AdUnit from '@/components/AdUnit'

export const metadata: Metadata = {
  title: 'Zeember — Know What Coverage Really Costs',
  description:
    'Free US insurance calculators with full cost breakdowns. No signup, no personal info. Auto, life, home, health, and more.',
  openGraph: {
    title: 'Zeember — Know What Coverage Really Costs',
    description:
      'Free US insurance calculators with full cost breakdowns. No signup, no personal info.',
    url: 'https://zeember.com',
  },
  alternates: { canonical: 'https://zeember.com' },
}

const calculatorCategories = [
  {
    icon: Shield,
    title: 'Auto Insurance',
    description: 'Car insurance cost calculator',
    href: '/auto-insurance-calculator',
  },
  {
    icon: Heart,
    title: 'Life Insurance',
    description: 'How much life insurance do you need?',
    href: '/how-much-life-insurance-do-i-need',
  },
  {
    icon: Home,
    title: 'Home Insurance',
    description: 'Home insurance cost estimator',
    href: '/home-insurance-calculator',
  },
  {
    icon: Activity,
    title: 'Health Insurance',
    description: 'Deductibles, HSA, COBRA and more',
    href: '/health-insurance-deductible-calculator',
  },
  {
    icon: Building2,
    title: 'Renters Insurance',
    description: 'Renters insurance coverage and cost',
    href: '/renters-insurance-calculator',
  },
  {
    icon: ArrowLeftRight,
    title: 'Compare Insurers',
    description: 'GEICO vs Progressive vs State Farm',
    href: '/compare',
  },
]

const lifeEvents = [
  { icon: Sparkles, label: 'Just got married', href: '/life-events/just-got-married' },
  { icon: Home, label: 'Bought a home', href: '/life-events/bought-a-home' },
  { icon: Baby, label: 'Had a baby', href: '/life-events/had-a-baby' },
  { icon: Car, label: 'Bought a car', href: '/life-events/bought-a-car' },
  { icon: Clock, label: 'Turned 65', href: '/life-events/turned-65' },
  { icon: MapPin, label: 'Moved states', href: '/life-events/moved-states' },
  { icon: Dog, label: 'Adopted a pet', href: '/life-events/adopted-a-pet' },
  { icon: Briefcase, label: 'Started a business', href: '/life-events/started-a-side-business' },
]

const howItWorks = [
  {
    icon: MousePointerClick,
    step: '1',
    title: 'Enter your details',
    description: 'Answer a few quick questions about your situation.',
  },
  {
    icon: BarChart2,
    step: '2',
    title: 'See your estimate',
    description: 'Get an instant estimate with a full cost breakdown.',
  },
  {
    icon: CheckCircle2,
    step: '3',
    title: 'Compare and decide',
    description: 'Compare your estimate to state averages and top insurers.',
  },
]

const featuredCalculators = [
  { title: 'Auto Insurance', href: '/auto-insurance-calculator', icon: Shield },
  { title: 'Life Insurance (DIME)', href: '/how-much-life-insurance-do-i-need', icon: Heart },
  { title: 'Home Insurance', href: '/home-insurance-calculator', icon: Home },
  { title: 'Renters Insurance', href: '/renters-insurance-calculator', icon: Building2 },
  { title: 'Bundling Discount', href: '/bundling-discount-calculator', icon: ArrowLeftRight },
  { title: 'SR-22 Insurance', href: '/sr-22-insurance-calculator', icon: Shield },
]

const trustSignals = [
  {
    icon: Database,
    title: 'NAIC sourced',
    description:
      'All averages sourced from the National Association of Insurance Commissioners and Insurance Information Institute public reports.',
  },
  {
    icon: RefreshCw,
    title: 'Updated quarterly',
    description:
      'Rate data is reviewed and updated four times per year to reflect current market conditions in each state.',
  },
  {
    icon: Lock,
    title: 'No personal info collected',
    description:
      'We never store your calculator inputs. All calculations happen in your browser. Nothing is transmitted or saved.',
  },
]

const blogPosts = [
  {
    title: 'How Auto Insurance Rates Are Calculated',
    excerpt:
      'Six factors determine your car insurance premium. Understanding each one helps you shop smarter and avoid overpaying.',
    readTime: '5 min read',
    href: '/blog/how-auto-insurance-rates-are-calculated',
    category: 'Auto',
  },
  {
    title: 'The DIME Method: How to Calculate Life Insurance Needs',
    excerpt:
      'Debt, Income, Mortgage, Education. This four-part formula gives you a concrete number instead of a vague guess.',
    readTime: '4 min read',
    href: '/blog/dime-method-life-insurance',
    category: 'Life',
  },
  {
    title: 'Full Coverage vs Liability Insurance: The Real Difference',
    excerpt:
      "Full coverage sounds comprehensive. But if your car isn't worth much, you might be paying for protection you don't need.",
    readTime: '6 min read',
    href: '/blog/full-coverage-vs-liability-insurance',
    category: 'Auto',
  },
]

// JSON-LD schemas for homepage
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Zeember',
  url: 'https://zeember.com',
  description: 'Free US insurance cost calculators with full cost breakdowns.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://zeember.com/glossary?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Zeember',
  url: 'https://zeember.com',
  description: 'Insurance cost intelligence platform providing free calculators and state-by-state comparisons.',
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      {/* ── 1. HERO ── */}
      <section className="bg-primary py-20 md:py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div>
              <h1 className="font-serif text-[56px] md:text-[36px] font-bold text-white leading-tight">
                Know what coverage really costs.
              </h1>
              <p className="font-sans text-xl text-white/80 mt-4 leading-relaxed">
                See your real insurance cost in seconds.
              </p>
              <p className="font-sans text-base text-white/60 mt-2">
                50+ tools. No accounts. No storage. Files stay on your device.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/auto-insurance-calculator"
                  className="bg-primary-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all font-sans"
                >
                  Calculate my cost →
                </Link>
                <Link
                  href="/compare"
                  className="border border-white/40 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all font-sans"
                >
                  Compare insurers
                </Link>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-6 mt-10">
                {['No signup required', 'No personal info stored', 'NAIC data sourced'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-accent" aria-hidden="true" />
                    <span className="font-sans text-sm text-white/70">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — sample result card */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <p className="font-sans text-sm text-white/60 mb-1">Estimated auto insurance</p>
                <div className="font-serif text-5xl font-bold text-primary-accent leading-none">
                  $1,847
                  <span className="font-sans text-lg font-normal text-white/60 ml-2">/year</span>
                </div>
                <p className="font-sans text-sm text-white/60 mt-1">Ohio · Age 34 · Clean record</p>

                {/* Mini breakdown bars */}
                <div className="mt-5 space-y-2.5">
                  {[
                    { label: 'Base rate', pct: 62 },
                    { label: 'Age factor', pct: 18 },
                    { label: 'Location', pct: 12 },
                    { label: 'Vehicle type', pct: 8 },
                  ].map(({ label, pct }) => (
                    <div key={label}>
                      <div className="flex justify-between mb-0.5">
                        <span className="font-sans text-xs text-white/60">{label}</span>
                        <span className="font-sans text-xs text-white/60">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-accent rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="font-sans text-xs text-white/60 mt-4">
                  Estimate · Actual rates vary
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CALCULATOR CATEGORIES ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark text-center mb-3">
            What would you like to estimate?
          </h2>
          <p className="font-sans text-[17px] text-neutral-500 text-center mb-12">
            Free calculators with full cost breakdowns — no signup, no personal info.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculatorCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="group bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-primary-accent/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                    <Icon size={22} className="text-primary-dark" />
                  </div>
                  <h3 className="font-sans text-[20px] font-semibold text-neutral-800 group-hover:text-primary-dark transition-colors">
                    {cat.title}
                  </h3>
                  <p className="font-sans text-sm text-neutral-500 mt-1 mb-4">{cat.description}</p>
                  <span className="font-sans text-sm font-semibold text-primary-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                    Calculate <ArrowRight size={14} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. LIFE EVENTS ── */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark text-center mb-3">
            What&apos;s changed in your life?
          </h2>
          <p className="font-sans text-[17px] text-neutral-500 text-center mb-12">
            Insurance needs shift with major life events. Find the right tools for your situation.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lifeEvents.map((event) => {
              const Icon = event.icon
              return (
                <Link
                  key={event.href}
                  href={event.href}
                  className="group bg-white border border-neutral-200 rounded-2xl p-6 text-center hover:shadow-md hover:border-primary-accent/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mx-auto mb-3">
                    <Icon size={18} className="text-primary-dark" />
                  </div>
                  <span className="font-sans text-sm font-medium text-neutral-700 group-hover:text-primary-dark transition-colors">
                    {event.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 4. STATE MAP (placeholder — replaced in Step 12) ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark text-center mb-3">
            Insurance costs by state
          </h2>
          <p className="font-sans text-[17px] text-neutral-500 text-center mb-8">
            Click any state to see how your rates compare nationally.
          </p>
          <div className="bg-primary-light border border-primary-accent/20 rounded-2xl h-72 flex flex-col items-center justify-center gap-4">
            <MapPin size={32} className="text-primary-dark/40" />
            <p className="font-sans text-neutral-500">Interactive state map — coming soon</p>
            <Link
              href="/state-map"
              className="font-sans text-sm font-semibold text-primary-accent hover:underline"
            >
              See all state comparisons →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ── */}
      <section className="bg-primary-light py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark text-center mb-12">
            How Zeember works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.step} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="font-sans text-xs font-bold text-primary-accent uppercase tracking-wider">
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="font-sans text-[20px] font-semibold text-primary-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[17px] text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 6. FEATURED CALCULATORS ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-8">
            Most used calculators
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCalculators.map((calc) => {
              const Icon = calc.icon
              return (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="group bg-white border border-neutral-200 rounded-2xl p-5 text-center hover:shadow-md hover:border-primary-accent/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mx-auto mb-3">
                    <Icon size={18} className="text-primary-dark" />
                  </div>
                  <span className="font-sans text-sm font-medium text-neutral-700 group-hover:text-primary-dark transition-colors leading-tight">
                    {calc.title}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 7. TRUST / DATA SECTION ── */}
      <section className="bg-neutral-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-white text-center mb-12">
            Data you can trust
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {trustSignals.map((signal) => {
              const Icon = signal.icon
              return (
                <div key={signal.title} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-primary-accent" />
                  </div>
                  <h3 className="font-sans text-[20px] font-semibold text-white mb-3">
                    {signal.title}
                  </h3>
                  <p className="font-sans text-[17px] text-white/60 leading-relaxed">
                    {signal.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 8. LATEST FROM BLOG ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark">
              Insurance guides
            </h2>
            <Link
              href="/blog"
              className="font-sans text-sm font-semibold text-primary-accent hover:underline hidden md:block"
            >
              View all guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md hover:border-primary-accent/20 transition-all"
              >
                <div className="mb-3">
                  <span className="font-sans text-xs font-semibold text-primary-accent bg-primary-light px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-sans text-[17px] font-semibold text-neutral-800 group-hover:text-primary-dark transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="font-sans text-xs text-neutral-400">{post.readTime}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/blog"
              className="font-sans text-sm font-semibold text-primary-accent hover:underline"
            >
              View all guides →
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom ad */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <AdUnit slot="HOMEPAGE_BOTTOM" format="leaderboard" />
      </div>
    </>
  )
}
