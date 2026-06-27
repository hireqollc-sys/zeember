'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, RotateCcw, ChevronRight } from 'lucide-react'
import Disclaimer from '@/components/Disclaimer'

export interface QuizQuestion {
  question: string
  options: { label: string; value: string; riskWeight: number }[]
}

export interface QuizRecommendation {
  strong: { title: string; body: string; ctaText: string; ctaHref: string }
  maybe: { title: string; body: string; ctaText: string; ctaHref: string }
  unlikely: { title: string; body: string; ctaText: string; ctaHref: string }
}

interface Props {
  title: string
  questions: QuizQuestion[]
  recommendation: QuizRecommendation
  strongThreshold?: number
  unlikelyThreshold?: number
}

export default function DecisionQuiz({
  title,
  questions,
  recommendation,
  strongThreshold = 4,
  unlikelyThreshold = 2,
}: Props) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [totalRisk, setTotalRisk] = useState(0)
  const [done, setDone] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const progress = ((step) / questions.length) * 100
  const currentQuestion = questions[step]

  function handleSelect(value: string, riskWeight: number) {
    setSelected(value)
    setTimeout(() => {
      const newAnswers = [...answers, value]
      const newRisk = totalRisk + riskWeight
      setAnswers(newAnswers)
      setTotalRisk(newRisk)
      setSelected(null)
      if (step + 1 >= questions.length) {
        setDone(true)
      } else {
        setStep(step + 1)
      }
    }, 300)
  }

  function handleRestart() {
    setStep(0)
    setAnswers([])
    setTotalRisk(0)
    setDone(false)
    setSelected(null)
  }

  const rec = done
    ? totalRisk >= strongThreshold
      ? recommendation.strong
      : totalRisk >= unlikelyThreshold
        ? recommendation.maybe
        : recommendation.unlikely
    : null

  const recLevel = done
    ? totalRisk >= strongThreshold ? 'strong' : totalRisk >= unlikelyThreshold ? 'maybe' : 'unlikely'
    : null

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      {!done && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-sans text-sm text-neutral-500">Question {step + 1} of {questions.length}</span>
            <span className="font-sans text-sm text-neutral-500">{Math.round(progress)}% complete</span>
          </div>
          <div
            className="h-2 bg-neutral-200 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Quiz progress: question ${step + 1} of ${questions.length}`}
          >
            <motion.div
              className="h-full bg-primary-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm"
          >
            <h3 className="font-serif text-xl font-semibold text-primary-dark mb-6">{currentQuestion.question}</h3>
            <div className="space-y-3">
              {currentQuestion.options.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value, option.riskWeight)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all font-sans text-[16px] flex items-center justify-between group ${
                    selected === option.value
                      ? 'border-primary-accent bg-primary-light text-primary-dark'
                      : 'border-neutral-200 hover:border-primary-accent hover:bg-neutral-50 text-neutral-800'
                  }`}
                >
                  <span>{option.label}</span>
                  <ChevronRight className={`h-5 w-5 flex-shrink-0 transition-colors ${selected === option.value ? 'text-primary-accent' : 'text-neutral-300 group-hover:text-primary-accent'}`} />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className={`rounded-2xl p-8 border-2 ${
              recLevel === 'strong' ? 'bg-green-50 border-green-300' :
              recLevel === 'maybe' ? 'bg-amber-50 border-amber-300' :
              'bg-neutral-50 border-neutral-300'
            }`}>
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className={`h-7 w-7 flex-shrink-0 mt-0.5 ${
                  recLevel === 'strong' ? 'text-green-600' :
                  recLevel === 'maybe' ? 'text-amber-500' :
                  'text-neutral-400'
                }`} />
                <div>
                  <h3 className={`font-serif text-2xl font-bold mb-2 ${
                    recLevel === 'strong' ? 'text-green-800' :
                    recLevel === 'maybe' ? 'text-amber-800' :
                    'text-neutral-700'
                  }`}>{rec!.title}</h3>
                  <p className="font-sans text-[17px] leading-[1.8] text-neutral-700">{rec!.body}</p>
                </div>
              </div>
              <Link
                href={rec!.ctaHref}
                className="inline-block bg-primary-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all font-sans"
              >
                {rec!.ctaText} →
              </Link>
            </div>

            <Disclaimer type="quiz" />

            <button
              onClick={handleRestart}
              className="flex items-center gap-2 font-sans text-sm text-neutral-500 hover:text-primary-dark transition-colors"
            >
              <RotateCcw className="h-4 w-4" /> Start over
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
