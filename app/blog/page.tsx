import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/lib/data/blog-posts'

export const metadata: Metadata = {
  title: 'Insurance Guides and Articles | Zeember',
  description: 'Plain-English insurance guides covering auto, life, home, health, and more. Free, no signup required.',
  alternates: { canonical: 'https://zeember.com/blog' },
  openGraph: { title: 'Insurance Guides | Zeember', url: 'https://zeember.com/blog', siteName: 'Zeember', type: 'website' },
}

const CATEGORY_COLORS: Record<string, string> = {
  auto: 'bg-blue-100 text-blue-800',
  life: 'bg-green-100 text-green-800',
  home: 'bg-orange-100 text-orange-800',
  health: 'bg-purple-100 text-purple-800',
  general: 'bg-neutral-100 text-neutral-700',
}

export default function BlogHubPage() {
  const categories = ['all', 'auto', 'life', 'home', 'health', 'general'] as const

  return (
    <main>
      <section className="bg-primary-light py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[56px] font-bold text-primary-dark mb-3">Insurance guides</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl">Plain-English guides on every major insurance topic. No jargon, no sponsored recommendations.</p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary-accent/50 transition-all flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`font-sans text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${CATEGORY_COLORS[post.category]}`}>{post.category}</span>
                <span className="font-sans text-xs text-neutral-400">{post.readTime}</span>
              </div>
              <h2 className="font-sans text-lg font-semibold text-neutral-800 group-hover:text-primary-dark transition-colors mb-2 flex-1">{post.title}</h2>
              <p className="font-sans text-sm text-neutral-600 leading-relaxed mb-4">{post.excerpt}</p>
              <span className="font-sans text-sm font-semibold text-primary-accent group-hover:text-primary-dark transition-colors">Read guide →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
