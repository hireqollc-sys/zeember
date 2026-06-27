import type { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles, Home, Baby, Car, Clock, MapPin, Dog, Briefcase } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Insurance by Life Event | Zeember',
  description: 'Insurance needs shift with major life events. Find the right calculators and guidance for your situation — marriage, new home, baby, and more.',
  alternates: { canonical: 'https://zeember.com/life-events' },
  openGraph: {
    title: 'Insurance by Life Event | Zeember',
    description: 'Insurance needs shift with major life events. Find the right calculators and guidance for your situation.',
    url: 'https://zeember.com/life-events',
    siteName: 'Zeember',
    type: 'website',
  },
}

const events = [
  {
    slug: 'just-got-married',
    label: 'Just got married',
    description: 'Combine policies, update beneficiaries, and find out what bundling saves you.',
    icon: Sparkles,
  },
  {
    slug: 'bought-a-home',
    label: 'Bought a home',
    description: 'Calculate home insurance, flood risk, and how much dwelling coverage you need.',
    icon: Home,
  },
  {
    slug: 'had-a-baby',
    label: 'Had a baby',
    description: 'Update your life insurance, add the baby to health coverage, and plan ahead.',
    icon: Baby,
  },
  {
    slug: 'bought-a-car',
    label: 'Bought a car',
    description: 'Estimate your new auto insurance cost and check if you need gap coverage.',
    icon: Car,
  },
  {
    slug: 'turned-65',
    label: 'Turned 65',
    description: 'Navigate Medicare, review life insurance needs, and update your beneficiaries.',
    icon: Clock,
  },
  {
    slug: 'moved-states',
    label: 'Moved states',
    description: "See how your new state's insurance costs compare and what needs to change.",
    icon: MapPin,
  },
  {
    slug: 'adopted-a-pet',
    label: 'Adopted a pet',
    description: 'Calculate pet insurance costs and see if it makes financial sense for your pet.',
    icon: Dog,
  },
  {
    slug: 'started-a-side-business',
    label: 'Started a business',
    description: 'Find out what liability and business insurance you need to protect yourself.',
    icon: Briefcase,
  },
]

export default function LifeEventsHub() {
  return (
    <main id="main-content" className="pt-16">
      {/* Hero */}
      <section className="bg-primary-light py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-serif text-[56px] md:text-[36px] font-bold text-primary-dark mb-4 leading-tight">
            What&apos;s changed in your life?
          </h1>
          <p className="font-sans text-[17px] text-neutral-600 max-w-2xl mx-auto">
            Insurance needs shift with major life events. Choose your situation below to find the right tools and guidance.
          </p>
        </div>
      </section>

      {/* Events grid */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {events.map((event) => {
              const Icon = event.icon
              return (
                <Link
                  key={event.slug}
                  href={`/life-events/${event.slug}`}
                  className="group bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md hover:border-primary-accent/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mb-3">
                    <Icon size={18} className="text-primary-dark" />
                  </div>
                  <p className="font-sans text-sm font-medium text-neutral-700 group-hover:text-primary-dark transition-colors mb-2">
                    {event.label}
                  </p>
                  <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                    {event.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
