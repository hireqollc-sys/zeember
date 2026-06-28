import type { Metadata } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import Script from 'next/script'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
  weight: ['300', '400', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Zeember — Know What Coverage Really Costs',
    template: '%s | Zeember',
  },
  description:
    'Free US insurance calculators with full cost breakdowns. No signup, no personal info. Auto, life, home, health, and more.',
  metadataBase: new URL('https://zeember.com'),
  openGraph: {
    siteName: 'Zeember',
    type: 'website',
    images: [{ url: '/logo.png', width: 600, height: 600, alt: 'Zeember' }],
  },
  twitter: {
    card: 'summary',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [{ rel: 'manifest', url: '/site.webmanifest' }],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'theme-color': '#0F3D2E',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <head>
        <meta name="msvalidate.01" content="BC6617E7CEAA868FB9DDD96B904C1B3B" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      </head>
      <body className="font-sans">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KYCXNDP95W"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KYCXNDP95W');
          `}
        </Script>
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        )}
        <Header />
        {/* pt-[4.25rem] offsets the fixed header height (64px + 2px accent bar) */}
        <div id="main-content" className="pt-[4.25rem]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
