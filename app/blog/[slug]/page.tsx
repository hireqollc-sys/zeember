import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import { blogPosts, getPostBySlug, getAllSlugs } from '@/lib/data/blog-posts'
import AdUnit from '@/components/AdUnit'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Zeember`,
    description: post.excerpt,
    alternates: { canonical: `https://zeember.com/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, url: `https://zeember.com/blog/${post.slug}`, siteName: 'Zeember', type: 'article' },
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  auto: 'bg-blue-100 text-blue-800',
  life: 'bg-green-100 text-green-800',
  home: 'bg-orange-100 text-orange-800',
  health: 'bg-purple-100 text-purple-800',
  general: 'bg-neutral-100 text-neutral-700',
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Organization', name: 'Zeember', url: 'https://zeember.com' },
    publisher: { '@type': 'Organization', name: 'Zeember', url: 'https://zeember.com' },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://zeember.com/blog/${post.slug}` },
  }

  const otherPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <Script
        id={`ld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="bg-primary-light py-10 px-6">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Link href="/blog" className="font-sans text-sm text-neutral-500 hover:text-primary-dark transition-colors">Blog</Link>
              <span className="text-neutral-300">/</span>
              <span className={`font-sans text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${CATEGORY_COLORS[post.category]}`}>{post.category}</span>
            </div>
            <h1 className="font-serif text-[32px] md:text-[44px] font-bold text-primary-dark mb-3 max-w-3xl">{post.title}</h1>
            <div className="flex items-center gap-3 text-neutral-500 font-sans text-sm">
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>&#183;</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>
        <div className="max-w-[1280px] mx-auto px-6 py-4"><AdUnit slot="LEADERBOARD_1" format="leaderboard" /></div>

        <section className="max-w-[1280px] mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Article */}
            <article className="lg:col-span-2">
              <div className="prose-custom space-y-6">
                {post.sections.map((section, i) => (
                  <div key={i}>
                    {section.heading && (
                      <h2 className="font-serif text-[24px] font-semibold text-primary-dark mb-3 mt-6">{section.heading}</h2>
                    )}
                    {section.body.map((para, j) => (
                      <p key={j} className="font-sans text-[17px] leading-[1.8] text-neutral-700 mb-3">{para}</p>
                    ))}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 bg-primary-light border border-primary-accent/20 rounded-2xl p-6">
                <p className="font-sans text-base font-semibold text-primary-dark mb-2">Ready to calculate your specific costs?</p>
                <p className="font-sans text-sm text-neutral-600 mb-3">Use the related calculator to get an estimate based on your actual situation.</p>
                <Link href={post.relatedCalculator} className="inline-block bg-primary-accent text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-600 transition-all font-sans text-sm">
                  Use the calculator →
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <AdUnit slot="SIDEBAR_1" format="sidebar" />

              {/* More posts */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-sans text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-4">More guides</h3>
                <ul className="space-y-4">
                  {otherPosts.map(p => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="font-sans text-sm font-medium text-neutral-800 hover:text-primary-accent transition-colors">{p.title}</Link>
                      <p className="font-sans text-xs text-neutral-500 mt-0.5">{p.readTime}</p>
                    </li>
                  ))}
                </ul>
                <Link href="/blog" className="font-sans text-sm font-medium text-primary-accent hover:text-primary-dark transition-colors mt-4 block">View all guides →</Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  )
}
