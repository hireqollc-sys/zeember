import type { Metadata } from 'next'
import Link from 'next/link'
import glossaryData from '@/lib/data/glossary-terms.json'

export const metadata: Metadata = {
  title: 'Insurance Glossary — Plain English | Zeember',
  description: 'Definitions for 25 essential insurance terms explained in plain English with real-world examples.',
  alternates: { canonical: 'https://zeember.com/glossary' },
  openGraph: { title: 'Insurance Glossary | Zeember', url: 'https://zeember.com/glossary', siteName: 'Zeember', type: 'website' },
}

const terms = glossaryData.terms

const lettersSet = new Set(terms.map(t => t.term[0].toUpperCase()))
const letters = Array.from(lettersSet).sort()

export default function GlossaryHubPage() {
  const byLetter = letters.reduce((acc, letter) => {
    acc[letter] = terms.filter(t => t.term[0].toUpperCase() === letter)
    return acc
  }, {} as Record<string, typeof terms>)

  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[56px] font-bold text-primary-dark mb-3">Insurance glossary</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl">Every insurance term explained in plain English. No jargon, no vague definitions — just clear explanations with real examples.</p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-6">
        {/* Alphabet nav */}
        <div className="flex flex-wrap gap-2 mb-8">
          {letters.map(letter => (
            <a key={letter} href={`#letter-${letter}`} className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 font-sans text-sm font-semibold text-neutral-700 hover:bg-primary-light hover:border-primary-accent hover:text-primary-dark transition-all">
              {letter}
            </a>
          ))}
        </div>

        {/* Terms by letter */}
        <div className="space-y-10">
          {letters.map(letter => (
            <div key={letter} id={`letter-${letter}`}>
              <h2 className="font-serif text-[28px] font-bold text-primary-dark mb-4 pb-2 border-b border-neutral-200">{letter}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {byLetter[letter].map(term => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:border-primary-accent hover:shadow-md transition-all group"
                  >
                    <h3 className="font-sans text-lg font-semibold text-neutral-800 group-hover:text-primary-dark mb-2">{term.term}</h3>
                    <p className="font-sans text-sm text-neutral-600 leading-relaxed">{term.short_definition}</p>
                    <span className="inline-block mt-3 font-sans text-xs font-semibold text-primary-accent group-hover:text-primary-dark transition-colors">Read definition →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
