import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

export interface RelatedCalc {
  title: string
  href: string
  description: string
  icon: LucideIcon
}

interface RelatedCalculatorsProps {
  calculators: RelatedCalc[]
}

export default function RelatedCalculators({ calculators }: RelatedCalculatorsProps) {
  return (
    <div>
      <h2 className="font-serif text-[36px] md:text-[28px] font-semibold text-primary-dark mb-8">
        Related calculators
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {calculators.slice(0, 3).map((calc) => {
          const Icon = calc.icon
          return (
            <Link
              key={calc.href}
              href={calc.href}
              className="group bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary-accent/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <Icon size={20} className="text-primary-dark" />
                </div>
                <h3 className="font-sans text-[17px] font-semibold text-neutral-800 group-hover:text-primary-dark transition-colors">
                  {calc.title}
                </h3>
              </div>
              <p className="font-sans text-sm text-neutral-600 leading-relaxed mb-4">
                {calc.description}
              </p>
              <span className="font-sans text-sm font-semibold text-primary-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                Calculate <ArrowRight size={14} />
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
