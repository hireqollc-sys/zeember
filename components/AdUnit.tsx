'use client'

import { useEffect } from 'react'

type AdFormat = 'leaderboard' | 'rectangle' | 'sidebar'

interface AdUnitProps {
  slot: string
  format: AdFormat
}

const FORMAT_DIMENSIONS: Record<AdFormat, { width: number; height: number; label: string }> = {
  leaderboard: { width: 728, height: 90, label: 'Leaderboard' },
  rectangle: { width: 300, height: 250, label: 'Rectangle' },
  sidebar: { width: 300, height: 600, label: 'Sidebar' },
}

export default function AdUnit({ slot, format }: AdUnitProps) {
  const { width, height, label } = FORMAT_DIMENSIONS[format]
  const isDev = process.env.NODE_ENV !== 'production' || !process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  useEffect(() => {
    if (!isDev) {
      try {
        // @ts-expect-error adsbygoogle is injected by AdSense script
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch {}
    }
  }, [isDev])

  if (isDev) {
    return (
      <div
        className="flex items-center justify-center bg-neutral-100 border border-neutral-200 rounded-lg mx-auto my-4"
        style={{ width: Math.min(width, 728), height, maxWidth: '100%' }}
        role="presentation"
        aria-hidden="true"
      >
        <span className="font-sans text-sm text-neutral-400">
          Ad — {label} — {slot}
        </span>
      </div>
    )
  }

  return (
    <div className="flex justify-center my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width, height }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
