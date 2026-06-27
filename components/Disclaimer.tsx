import { AlertTriangle } from 'lucide-react'

type DisclaimerType = 'calculator' | 'quiz' | 'comparison'

interface DisclaimerProps {
  type: DisclaimerType
}

const DISCLAIMER_TEXT: Record<DisclaimerType, string> = {
  calculator:
    'This is an estimate for informational purposes only based on national and state averages. Actual rates vary by insurer and individual circumstances. For an accurate quote, contact a licensed insurance agent.',
  quiz:
    'This quiz provides general guidance only. Insurance needs vary by individual circumstances. Consult a licensed agent for personalized advice.',
  comparison:
    'Company data sourced from public NAIC reports and J.D. Power surveys. Data may not reflect current rates or recent company changes.',
}

export default function Disclaimer({ type }: DisclaimerProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
      <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={16} aria-hidden="true" />
      <p className="font-sans text-sm text-amber-800 leading-relaxed">
        {DISCLAIMER_TEXT[type]}
      </p>
    </div>
  )
}
