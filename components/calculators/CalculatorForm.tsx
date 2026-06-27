'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface CalculatorFormProps {
  title: string
  description: string
  children: React.ReactNode
  onCalculate: () => void
  isCalculating?: boolean
}

export default function CalculatorForm({
  title,
  description,
  children,
  onCalculate,
  isCalculating = false,
}: CalculatorFormProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
      <h2 className="font-serif text-[28px] font-semibold text-primary-dark mb-2">{title}</h2>
      <p className="font-sans text-[17px] text-neutral-600 mb-8 leading-relaxed">{description}</p>

      <div className="flex flex-col gap-6">
        {children}
      </div>

      <Button
        type="button"
        onClick={onCalculate}
        disabled={isCalculating}
        className="w-full h-[52px] mt-8 bg-primary-accent hover:bg-green-600 text-white font-sans font-semibold text-base rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2"
      >
        {isCalculating ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={18} />
            Calculating…
          </>
        ) : (
          'Calculate my estimate'
        )}
      </Button>
    </div>
  )
}
