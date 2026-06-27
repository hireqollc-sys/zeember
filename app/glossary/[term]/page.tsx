import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import glossaryData from '@/lib/data/glossary-terms.json'

interface Props { params: { term: string } }

const terms = glossaryData.terms

export function generateStaticParams() {
  return terms.map(t => ({ term: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const term = terms.find(t => t.slug === params.term)
  if (!term) return {}
  return {
    title: `${term.term} — Insurance Definition | Zeember`,
    description: `${term.short_definition} Full explanation with a real-world example.`,
    alternates: { canonical: `https://zeember.com/glossary/${term.slug}` },
    openGraph: { title: `${term.term} Definition | Zeember`, url: `https://zeember.com/glossary/${term.slug}`, siteName: 'Zeember', type: 'website' },
  }
}

export default function GlossaryTermPage({ params }: Props) {
  const term = terms.find(t => t.slug === params.term)
  if (!term) notFound()

  const relatedTerms = term.related_terms
    .map(slug => terms.find(t => t.slug === slug))
    .filter(Boolean) as typeof terms

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.full_definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Zeember Insurance Glossary',
      url: 'https://zeember.com/glossary',
    },
  }

  return (
    <>
      <Script
        id={`ld-${term.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="bg-primary-light py-10 px-6">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Link href="/glossary" className="font-sans text-sm text-neutral-500 hover:text-primary-dark transition-colors">Glossary</Link>
              <span className="text-neutral-300">/</span>
              <span className="font-sans text-sm text-neutral-600">{term.term}</span>
            </div>
            <h1 className="font-serif text-[36px] md:text-[48px] font-bold text-primary-dark mb-3">{term.term}</h1>
            <p className="font-serif text-[22px] text-neutral-600 max-w-2xl font-light">{term.short_definition}</p>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-6 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="md:col-span-2 space-y-6">
              {/* Full definition */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <h2 className="font-sans text-lg font-semibold text-neutral-800 mb-4">Full definition</h2>
                <p className="font-sans text-[17px] leading-[1.8] text-neutral-700">{term.full_definition}</p>
              </div>

              {/* Example */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
                <h2 className="font-sans text-base font-semibold text-neutral-700 mb-3">Real-world example</h2>
                <p className="font-sans text-[16px] leading-[1.8] text-neutral-700 italic">{term.example}</p>
              </div>

              {/* Related calculator */}
              {term.related_calculator && (
                <div className="bg-primary-light border border-primary-accent/20 rounded-2xl p-6">
                  <h2 className="font-sans text-base font-semibold text-primary-dark mb-2">Try the related calculator</h2>
                  <p className="font-sans text-sm text-neutral-600 mb-3">See how {term.term.toLowerCase()} affects your specific situation.</p>
                  <Link href={term.related_calculator} className="font-sans text-sm font-semibold text-primary-accent hover:text-primary-dark transition-colors">
                    Use the calculator →
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Quick summary */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-sans text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">Quick summary</h3>
                <p className="font-sans text-base text-neutral-700">{term.short_definition}</p>
              </div>

              {/* Related terms */}
              {relatedTerms.length > 0 && (
                <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-sans text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">Related terms</h3>
                  <ul className="space-y-2">
                    {relatedTerms.map(rt => (
                      <li key={rt.slug}>
                        <Link href={`/glossary/${rt.slug}`} className="font-sans text-sm font-medium text-primary-accent hover:text-primary-dark transition-colors">{rt.term}</Link>
                        <p className="font-sans text-xs text-neutral-500">{rt.short_definition}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Back to glossary */}
              <Link href="/glossary" className="block font-sans text-sm font-medium text-neutral-500 hover:text-primary-dark transition-colors">← Back to full glossary</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
