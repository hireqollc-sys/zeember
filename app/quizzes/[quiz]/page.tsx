import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DecisionQuiz from '@/components/quizzes/DecisionQuiz'
import type { QuizQuestion, QuizRecommendation } from '@/components/quizzes/DecisionQuiz'
import AdUnit from '@/components/AdUnit'

interface Props { params: { quiz: string } }

interface QuizData {
  title: string
  heroTitle: string
  subtitle: string
  metaTitle: string
  metaDescription: string
  questions: QuizQuestion[]
  recommendation: QuizRecommendation
  strongThreshold: number
  unlikelyThreshold: number
}

const QUIZZES: Record<string, QuizData> = {
  'do-i-need-umbrella-insurance': {
    title: 'Do I need umbrella insurance?',
    heroTitle: 'Do I need umbrella insurance?',
    subtitle: 'Answer 6 questions to find out if an umbrella policy makes sense for your situation.',
    metaTitle: 'Do I Need Umbrella Insurance? Free Quiz | Zeember',
    metaDescription: 'Take this 6-question quiz to find out if umbrella insurance is right for your net worth, assets, and lifestyle.',
    strongThreshold: 4,
    unlikelyThreshold: 2,
    questions: [
      {
        question: 'What is your total net worth (assets minus debts)?',
        options: [
          { label: 'Under $100,000', value: 'low', riskWeight: 0 },
          { label: '$100,000 to $500,000', value: 'medium', riskWeight: 1 },
          { label: '$500,000 to $1 million', value: 'high', riskWeight: 2 },
          { label: 'Over $1 million', value: 'very-high', riskWeight: 3 },
        ],
      },
      {
        question: 'Do you own property (home, land, investment property)?',
        options: [
          { label: 'Yes', value: 'yes', riskWeight: 1 },
          { label: 'No, I rent', value: 'no', riskWeight: 0 },
        ],
      },
      {
        question: 'Do you have a swimming pool, trampoline, or dog at your property?',
        options: [
          { label: 'Yes, one or more', value: 'yes', riskWeight: 1 },
          { label: 'No', value: 'no', riskWeight: 0 },
        ],
      },
      {
        question: 'Do you have teenage drivers in your household?',
        options: [
          { label: 'Yes', value: 'yes', riskWeight: 1 },
          { label: 'No', value: 'no', riskWeight: 0 },
        ],
      },
      {
        question: 'Do you host gatherings at your home?',
        options: [
          { label: 'Yes, regularly', value: 'regularly', riskWeight: 1 },
          { label: 'Occasionally', value: 'occasionally', riskWeight: 1 },
          { label: 'Rarely or never', value: 'rarely', riskWeight: 0 },
        ],
      },
      {
        question: 'Do you have significant savings, investments, or retirement accounts to protect?',
        options: [
          { label: 'Yes, substantial savings', value: 'yes', riskWeight: 1 },
          { label: 'Some savings, building up', value: 'some', riskWeight: 1 },
          { label: 'Minimal savings right now', value: 'minimal', riskWeight: 0 },
        ],
      },
    ],
    recommendation: {
      strong: {
        title: 'You probably need umbrella insurance',
        body: 'Based on your answers, you have meaningful assets to protect and lifestyle factors that increase your liability exposure. A $1 million umbrella policy typically costs just $150-$300/year — extraordinarily cost-effective protection against a lawsuit that could otherwise wipe out your savings. Most insurers require minimum underlying auto and home liability limits before issuing an umbrella policy.',
        ctaText: 'Calculate umbrella coverage',
        ctaHref: '/umbrella-insurance-calculator',
      },
      maybe: {
        title: 'An umbrella policy is worth considering',
        body: 'You have some factors that increase liability risk, and even modest savings are worth protecting. At $150-$300/year for $1 million in coverage, umbrella insurance has one of the best cost-benefit ratios in all of insurance. As your net worth grows, the case gets stronger.',
        ctaText: 'Calculate umbrella coverage',
        ctaHref: '/umbrella-insurance-calculator',
      },
      unlikely: {
        title: 'Umbrella insurance is probably not necessary yet',
        body: 'With limited assets and lower lifestyle risk factors, the urgency for umbrella insurance is lower. Focus on ensuring your underlying auto and home liability limits are adequate ($300,000 minimum on each). As your net worth grows or your lifestyle changes, revisit this decision.',
        ctaText: 'Check my liability coverage',
        ctaHref: '/liability-coverage-calculator',
      },
    },
  },
  'is-pet-insurance-worth-it': {
    title: 'Is pet insurance worth it?',
    heroTitle: 'Is pet insurance worth it for your pet?',
    subtitle: 'Answer 5 questions about your pet to get a personalized recommendation.',
    metaTitle: 'Is Pet Insurance Worth It? Free Quiz | Zeember',
    metaDescription: 'Take this quiz to find out if pet insurance makes financial sense for your specific pet and situation.',
    strongThreshold: 3,
    unlikelyThreshold: 1,
    questions: [
      {
        question: 'How old is your pet?',
        options: [
          { label: 'Under 2 years (puppy or kitten)', value: 'young', riskWeight: 2 },
          { label: '2 to 6 years (adult)', value: 'adult', riskWeight: 1 },
          { label: '7 to 10 years (senior)', value: 'senior', riskWeight: 1 },
          { label: 'Over 10 years', value: 'old', riskWeight: 0 },
        ],
      },
      {
        question: 'What type of pet do you have?',
        options: [
          { label: 'Large breed dog (over 50 lbs)', value: 'large-dog', riskWeight: 2 },
          { label: 'Small or medium dog (under 50 lbs)', value: 'small-dog', riskWeight: 1 },
          { label: 'Cat', value: 'cat', riskWeight: 1 },
          { label: 'Other', value: 'other', riskWeight: 0 },
        ],
      },
      {
        question: 'If your pet needed a $5,000 emergency surgery, could you comfortably pay out of pocket?',
        options: [
          { label: 'Yes, without financial stress', value: 'yes', riskWeight: 0 },
          { label: 'It would be a stretch but manageable', value: 'maybe', riskWeight: 1 },
          { label: 'No, it would be a significant hardship', value: 'no', riskWeight: 2 },
        ],
      },
      {
        question: 'Is your breed known for expensive hereditary conditions (hip dysplasia, heart disease, cancer)?',
        options: [
          { label: 'Yes (German Shepherd, Golden Retriever, Bulldog, etc.)', value: 'yes', riskWeight: 2 },
          { label: 'Not sure', value: 'unsure', riskWeight: 1 },
          { label: 'No, a healthy or mixed breed', value: 'no', riskWeight: 0 },
        ],
      },
      {
        question: 'Would you pursue aggressive treatment (surgery, chemo) if your pet had a serious illness?',
        options: [
          { label: 'Yes, absolutely', value: 'yes', riskWeight: 2 },
          { label: 'Probably, depending on prognosis', value: 'probably', riskWeight: 1 },
          { label: 'I would prioritize comfort over aggressive treatment', value: 'no', riskWeight: 0 },
        ],
      },
    ],
    recommendation: {
      strong: {
        title: 'Pet insurance is likely worth it for your pet',
        body: 'Based on your pet\'s profile — breed, age, and your financial situation — pet insurance is likely to pay off over your pet\'s lifetime. The key is enrolling before any conditions develop, as pre-existing conditions are excluded. For young large-breed dogs especially, the lifetime savings from covered orthopedic and other common conditions often exceed the total premiums paid.',
        ctaText: 'Calculate pet insurance cost',
        ctaHref: '/pet-insurance-calculator',
      },
      maybe: {
        title: 'Pet insurance is worth considering',
        body: 'Your situation has some factors that favor pet insurance and some that do not. Consider whether you could realistically absorb a $3,000-$8,000 vet bill without financial stress. If not, the peace of mind and financial protection of pet insurance may justify the monthly premium for you.',
        ctaText: 'Calculate pet insurance cost',
        ctaHref: '/pet-insurance-calculator',
      },
      unlikely: {
        title: 'Pet insurance may not be cost-effective for your situation',
        body: 'Based on your pet\'s age, type, and your financial cushion, a dedicated pet savings account may be more cost-effective than a monthly pet insurance premium. Set aside $50-$100/month into a pet emergency fund instead. If your situation changes — new pet, change in finances — revisit this quiz.',
        ctaText: 'See pet insurance costs anyway',
        ctaHref: '/pet-insurance-calculator',
      },
    },
  },
  'should-i-bundle-home-and-auto': {
    title: 'Should I bundle home and auto insurance?',
    heroTitle: 'Should I bundle my home and auto insurance?',
    subtitle: 'Answer 4 questions to find out if bundling will save you money in your situation.',
    metaTitle: 'Should I Bundle Home and Auto Insurance? Quiz | Zeember',
    metaDescription: 'Find out if bundling your home and auto insurance will actually save you money with this quick quiz.',
    strongThreshold: 3,
    unlikelyThreshold: 1,
    questions: [
      {
        question: 'Do you currently have both home (or renters) and auto insurance?',
        options: [
          { label: 'Yes, both active', value: 'yes', riskWeight: 2 },
          { label: 'Only auto right now', value: 'auto-only', riskWeight: 1 },
          { label: 'Only home/renters right now', value: 'home-only', riskWeight: 1 },
        ],
      },
      {
        question: 'Are your home and auto currently with different companies?',
        options: [
          { label: 'Yes, different companies', value: 'different', riskWeight: 2 },
          { label: 'Same company already', value: 'same', riskWeight: 0 },
          { label: 'Only have one policy', value: 'one', riskWeight: 1 },
        ],
      },
      {
        question: 'How long since you last shopped both policies?',
        options: [
          { label: 'Never compared properly', value: 'never', riskWeight: 2 },
          { label: 'More than 2 years ago', value: 'old', riskWeight: 2 },
          { label: 'Within the last year', value: 'recent', riskWeight: 1 },
        ],
      },
      {
        question: 'Does your current insurer offer bundling discounts for both types?',
        options: [
          { label: 'Yes, they offer both types', value: 'yes', riskWeight: 1 },
          { label: 'Not sure', value: 'unsure', riskWeight: 1 },
          { label: 'No, they only offer one type', value: 'no', riskWeight: 0 },
        ],
      },
    ],
    recommendation: {
      strong: {
        title: 'Bundling is likely worth exploring',
        body: 'Based on your situation, getting bundled quotes is a smart next step. Multi-policy discounts of 10-25% are common when bundling home and auto with the same insurer. State Farm, Nationwide, and Allstate offer some of the strongest bundling discounts. Important: the bundled rate is only worthwhile if both individual policy rates are also competitive — compare the bundle against separate best-in-class quotes.',
        ctaText: 'Calculate bundling savings',
        ctaHref: '/bundling-discount-calculator',
      },
      maybe: {
        title: 'Bundling could help, but compare carefully',
        body: 'Bundling is not automatically the cheapest option. Sometimes the bundling discount does not offset the fact that one insurer is not competitive on a particular policy type. Get the bundled quote and compare it to separate best-in-class quotes for each policy type. Savings of $100-$400/year are common but not universal.',
        ctaText: 'Calculate bundling savings',
        ctaHref: '/bundling-discount-calculator',
      },
      unlikely: {
        title: 'Bundling may not offer significant savings in your case',
        body: 'If you are already with the same insurer or recently shopped carefully, the incremental savings from switching to optimize your bundle may be small. Focus on ensuring each policy individually is competitively priced. Set a calendar reminder to compare both policies at renewal.',
        ctaText: 'Calculate my auto insurance cost',
        ctaHref: '/auto-insurance-calculator',
      },
    },
  },
  'do-i-need-gap-insurance': {
    title: 'Do I need gap insurance?',
    heroTitle: 'Do I need gap insurance for my vehicle?',
    subtitle: 'Answer 5 questions about your vehicle and loan to get a personalized recommendation.',
    metaTitle: 'Do I Need Gap Insurance? Free Quiz | Zeember',
    metaDescription: 'Find out if gap insurance is worth buying for your vehicle with this 5-question quiz.',
    strongThreshold: 3,
    unlikelyThreshold: 1,
    questions: [
      {
        question: 'How is your vehicle financed?',
        options: [
          { label: 'I financed through a bank or credit union', value: 'financed', riskWeight: 2 },
          { label: 'I am leasing the vehicle', value: 'leased', riskWeight: 3 },
          { label: 'I own it outright (paid cash)', value: 'owned', riskWeight: 0 },
        ],
      },
      {
        question: 'How much did you put down when you bought the vehicle?',
        options: [
          { label: 'Less than 10% down', value: 'low', riskWeight: 2 },
          { label: '10-20% down', value: 'medium', riskWeight: 1 },
          { label: 'More than 20% down', value: 'high', riskWeight: 0 },
          { label: 'Paid cash — no financing', value: 'cash', riskWeight: 0 },
        ],
      },
      {
        question: 'How long is your loan term?',
        options: [
          { label: '60 months or longer (5+ years)', value: 'long', riskWeight: 2 },
          { label: '48 months (4 years)', value: 'medium', riskWeight: 1 },
          { label: '36 months or less (3 years or less)', value: 'short', riskWeight: 0 },
          { label: 'No loan', value: 'none', riskWeight: 0 },
        ],
      },
      {
        question: 'How old is your vehicle?',
        options: [
          { label: 'Brand new (current model year)', value: 'new', riskWeight: 2 },
          { label: '1 to 2 years old', value: 'recent', riskWeight: 2 },
          { label: '3 to 5 years old', value: 'mid', riskWeight: 1 },
          { label: 'More than 5 years old', value: 'older', riskWeight: 0 },
        ],
      },
      {
        question: 'Do you know roughly what your car is worth today vs what you owe?',
        options: [
          { label: 'I owe more than the car is worth', value: 'underwater', riskWeight: 3 },
          { label: 'About even — I owe roughly what it is worth', value: 'even', riskWeight: 1 },
          { label: 'I owe less than the car is worth', value: 'equity', riskWeight: 0 },
          { label: 'Not sure', value: 'unsure', riskWeight: 1 },
        ],
      },
    ],
    recommendation: {
      strong: {
        title: 'Gap insurance is strongly recommended',
        body: 'Based on your situation — new or recently new vehicle, significant financing, or confirmed negative equity — gap insurance is a smart purchase. If your car is totaled today, your insurance payout could easily fall $3,000-$10,000 short of your loan balance. Gap insurance from your auto insurer typically costs $200-$400/year, far less than dealer-sold gap products.',
        ctaText: 'Calculate your coverage gap',
        ctaHref: '/gap-insurance-calculator',
      },
      maybe: {
        title: 'Gap insurance is worth considering',
        body: 'Your situation has some risk factors for being "upside down" on your vehicle. Run the numbers on your specific loan balance vs. current market value. If there is a meaningful gap (more than $1,500-$2,000), gap insurance is worth the modest premium. If you are close to even or have equity, you can skip it.',
        ctaText: 'Calculate your coverage gap',
        ctaHref: '/gap-insurance-calculator',
      },
      unlikely: {
        title: 'Gap insurance is probably not necessary',
        body: 'Based on your vehicle ownership situation — owned outright, significant equity, or an older vehicle — gap insurance does not provide meaningful protection. Your insurance payout is likely to equal or exceed any outstanding loan balance. Skip the premium and put the savings toward your deductible reserve.',
        ctaText: 'Check full coverage vs liability',
        ctaHref: '/full-coverage-vs-liability-calculator',
      },
    },
  },
}

export function generateStaticParams() {
  return Object.keys(QUIZZES).map(quiz => ({ quiz }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const quiz = QUIZZES[params.quiz]
  if (!quiz) return {}
  return {
    title: quiz.metaTitle,
    description: quiz.metaDescription,
    alternates: { canonical: `https://zeember.com/quizzes/${params.quiz}` },
    openGraph: { title: quiz.metaTitle, url: `https://zeember.com/quizzes/${params.quiz}`, siteName: 'Zeember', type: 'website' },
  }
}

export default function QuizPage({ params }: Props) {
  const quiz = QUIZZES[params.quiz]
  if (!quiz) notFound()

  return (
    <main>
      <section className="bg-primary-light py-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[48px] font-bold text-primary-dark mb-3">{quiz.heroTitle}</h1>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl">{quiz.subtitle}</p>
        </div>
      </section>
      <div className="max-w-[1280px] mx-auto px-6 py-4"><AdUnit slot="LEADERBOARD_1" format="leaderboard" /></div>

      <section className="max-w-[1280px] mx-auto px-6 py-10">
        <DecisionQuiz
          title={quiz.title}
          questions={quiz.questions}
          recommendation={quiz.recommendation}
          strongThreshold={quiz.strongThreshold}
          unlikelyThreshold={quiz.unlikelyThreshold}
        />
      </section>
      <div className="max-w-[1280px] mx-auto px-6 pb-8"><AdUnit slot="RECTANGLE_1" format="rectangle" /></div>
    </main>
  )
}
