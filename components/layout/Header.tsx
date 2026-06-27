'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Auto Insurance', href: '/auto-insurance-calculator' },
  { label: 'Life Insurance', href: '/how-much-life-insurance-do-i-need' },
  { label: 'Home Insurance', href: '/home-insurance-calculator' },
  { label: 'Health', href: '/health-insurance-deductible-calculator' },
  { label: 'Compare', href: '/compare' },
  { label: 'Life Events', href: '/life-events/just-got-married' },
  { label: 'Blog', href: '/blog' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200">
      {/* Skip to main content — keyboard/screen-reader accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-accent focus:text-white focus:rounded-lg focus:font-sans focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Zeember" width={32} height={32} priority />
            <span className="font-serif text-2xl font-bold text-primary-dark">
              Zeember
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-base font-medium text-neutral-700 hover:text-primary-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-neutral-700 hover:text-primary-dark"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Green accent bar */}
      <div className="h-0.5 bg-primary-accent" />

      {/* Mobile overlay nav */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-primary flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-6 h-16">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <Image src="/logo.png" alt="Zeember" width={32} height={32} />
              <span className="font-serif text-2xl font-bold text-white">Zeember</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-white"
              aria-label="Close navigation menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col px-6 py-8 gap-6" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xl font-medium text-white/90 hover:text-white transition-colors py-2 border-b border-white/10"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
