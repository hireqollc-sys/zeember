# ZEEMBER — Master Claude Code Instruction File

> **READ THIS ENTIRE FILE BEFORE WRITING A SINGLE LINE OF CODE.**
> This file defines every decision already made. Do not invent alternatives. Do not ask for clarification on anything covered here. Do not add features not listed. Do not skip anything listed.

---

## 1. PROJECT IDENTITY

**Site name:** Zeember
**Domain:** zeember.com
**Tagline (used in header logo area):** "Know what coverage really costs."
**Hero subheadline:** "See your real insurance cost in seconds."
**Mission:** A premium US insurance cost intelligence platform. Free calculators, state-by-state comparisons, insurer comparisons, life-event guidance, and decision quizzes — all wrapped in a corporate-grade UI that looks and feels like a well-funded fintech product.
**Revenue model:** Google AdSense (primary), affiliate links from MediaAlpha/SmartFinancial (secondary, added later). No subscriptions. No user accounts. No file storage. No login system. No cookies beyond AdSense.

---

## 2. TECH STACK — EXACT, NO SUBSTITUTIONS

```
Framework:        Next.js 14 with App Router (NOT Pages Router)
Language:         TypeScript (strict mode)
Styling:          Tailwind CSS
Components:       shadcn/ui
Fonts:            next/font/google — Inter (UI text) + Source_Serif_4 (headlines/numbers)
Charts:           recharts (cost breakdowns) + @tremor/react (stat cards, trend lines)
Maps:             react-simple-maps + topojson-client + us-atlas
Animation:        framer-motion (subtle only — number count-ups, fade-in reveals)
Forms:            react-hook-form + zod + @hookform/resolvers
Icons:            lucide-react
Hosting:          Vercel (zero-config Next.js)
Analytics:        none (added later)
```

**Install all of these upfront in a single npm install command. Do not install anything else.**

```bash
npm install next@14 react react-dom typescript @types/react @types/node
npm install -D tailwindcss postcss autoprefixer
npm install @shadcn/ui recharts @tremor/react framer-motion
npm install react-simple-maps topojson-client us-atlas
npm install react-hook-form zod @hookform/resolvers
npm install lucide-react
npm install @types/topojson-client @types/us-atlas
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card select slider accordion tabs table badge separator
```

---

## 3. BRAND DESIGN SYSTEM — IMPLEMENT EXACTLY

### 3.1 Colors
```css
/* tailwind.config.ts — extend colors with these exact values */
primary: {
  DEFAULT: '#0F3D2E',   /* Deep green — dark backgrounds */
  accent:  '#3FAE76',   /* Bright green — buttons, highlights */
  dark:    '#0A2E22',   /* Darkest green — text on light */
  light:   '#D9EFE3',   /* Pale green — light backgrounds */
}
neutral: {
  50:  '#F9FAFB',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
}
```

### 3.2 Typography — EXACT IMPLEMENTATION
```typescript
// app/layout.tsx — fonts setup
import { Inter, Source_Serif_4 } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['300', '400', '600', '700'],
})

// Apply both font variables to the html element
// className={`${inter.variable} ${sourceSerif.variable} font-sans`}
```

```css
/* globals.css */
:root {
  --font-sans: var(--font-inter);
  --font-serif: var(--font-serif);
}

/* Apply these consistently */
/* UI text (labels, body, navigation): font-sans (Inter) */
/* Large result numbers, section headlines, editorial content: font-serif (Source Serif 4) */
```

### 3.3 Typography Scale
```
Hero H1:              font-serif, 56px desktop / 36px mobile, font-weight 700, color primary-dark
Section H2:           font-serif, 36px desktop / 28px mobile, font-weight 600, color primary-dark
Card H3:              font-sans, 20px, font-weight 600, color neutral-800
Calculator result:    font-serif, 52px, font-weight 700, color primary-dark
Body text:            font-sans, 17px, line-height 1.8, color neutral-700
Small/caption:        font-sans, 14px, color neutral-500
Nav links:            font-sans, 16px, font-weight 500, color neutral-700
```

### 3.4 Spacing & Layout
```
Max content width:    1280px (centered with mx-auto px-6)
Section padding:      py-20 (desktop) / py-12 (mobile)
Card padding:         p-8 (large) / p-6 (standard)
Border radius:        rounded-2xl (cards) / rounded-xl (buttons) / rounded-lg (inputs)
Card style:           bg-white border border-neutral-200 shadow-sm rounded-2xl
Hero section bg:      bg-primary (deep green #0F3D2E)
Alternate sections:   bg-neutral-50 or bg-white
```

### 3.5 Component Patterns
```
Primary button:    bg-primary-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all
Secondary button:  border border-primary-accent text-primary-accent px-6 py-3 rounded-xl hover:bg-primary-light
Calculator card:   bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm
Result display:    bg-primary-light border border-primary-accent/20 rounded-2xl p-8
Disclaimer:        bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800 text-sm
State badge:       bg-primary-light text-primary-dark text-xs font-semibold px-3 py-1 rounded-full
```

---

## 4. GLOBAL LAYOUT COMPONENTS

### 4.1 Header (components/layout/Header.tsx)
- Fixed top, full width, white background, subtle bottom border `border-neutral-200`
- Left: Zeember logo — "Zeember" in Source Serif 4, bold, `text-primary-dark`, followed by a small green dot accent
- Right: Navigation links — Auto Insurance, Life Insurance, Home Insurance, Health, Compare, Life Events, Blog
- Mobile: hamburger menu revealing a full-screen overlay nav
- Below nav: a slim green accent bar `h-0.5 bg-primary-accent`

### 4.2 Footer (components/layout/Footer.tsx)
- Background: `bg-primary` (deep green)
- 4-column grid: Calculators, Insurance Types, Resources, Company
- Text: white at 80% opacity, hover full white
- Bottom bar: "© 2026 Zeember. Insurance cost estimates for informational purposes only."
- Links: Privacy Policy, Disclaimer, About, Methodology, Contact

### 4.3 AdUnit (components/AdUnit.tsx)
```typescript
// Shows grey placeholder in development, real AdSense slot in production
// Props: slot (string), format ('leaderboard' | 'rectangle' | 'sidebar')
// Leaderboard: 728x90 — placed below H1, above calculator form
// Rectangle: 300x250 — placed beside results panel after calculation
// Sidebar: 300x600 — fixed right sidebar on blog posts
// In development: styled grey box with "Ad Unit — [format]" text
// In production: renders <ins class="adsbygoogle"> with correct slot
// Never render more than 3 AdUnit components on a single page
```

### 4.4 Disclaimer (components/Disclaimer.tsx)
```typescript
// Required on EVERY calculator page and quiz page — no exceptions
// Props: type ('calculator' | 'quiz' | 'comparison')
// calculator: "This is an estimate for informational purposes only based on 
//   national and state averages. Actual rates vary by insurer and individual 
//   circumstances. For an accurate quote, contact a licensed insurance agent."
// quiz: "This quiz provides general guidance only. Insurance needs vary by 
//   individual circumstances. Consult a licensed agent for personalized advice."
// comparison: "Company data sourced from public NAIC reports and J.D. Power 
//   surveys. Data may not reflect current rates or recent company changes."
```

---

## 5. REUSABLE CALCULATOR COMPONENTS

### 5.1 CalculatorForm (components/calculators/CalculatorForm.tsx)
```typescript
interface CalculatorFormProps {
  title: string               // Source Serif 4, 28px
  description: string         // Inter, 17px, neutral-600
  children: React.ReactNode   // Form fields go here
  onCalculate: () => void     // Called when Calculate button clicked
  isCalculating?: boolean     // Shows spinner on button
}
// Wrapper card: bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm
// Calculate button: full-width, primary-accent background, 52px height, font-semibold
// Uses React Hook Form + Zod — validation errors show inline below each field
// Fields are built with shadcn/ui Select, Input, Slider components
```

### 5.2 ResultsPanel (components/calculators/ResultsPanel.tsx)
```typescript
interface ResultsPanelProps {
  annualEstimate: number      // e.g. 1450
  monthlyEstimate: number     // annualEstimate / 12
  rangeLow: number            // annualEstimate * 0.8
  rangeHigh: number           // annualEstimate * 1.2
  stateAverage?: number       // from state-averages.json
  stateName?: string          // e.g. "Ohio"
  label: string               // e.g. "Estimated annual auto insurance cost"
  breakdownData: BreakdownItem[]  // for CostBreakdownChart
}
interface BreakdownItem {
  factor: string    // e.g. "Base rate", "Age", "Location"
  amount: number    // dollar contribution
  multiplier: string // e.g. "1.0x", "1.5x"
}
// Annual number: Framer Motion count-up animation from 0 to final value over 800ms
// Uses Intl.NumberFormat for currency display
// Shows range: "Estimated range: $1,160 – $1,740/year"
// Shows state comparison if stateAverage provided
// Triggers only after Calculate is clicked — shows nothing before first calculation
// Card: bg-primary-light border border-primary-accent/20 rounded-2xl p-8
```

### 5.3 CostBreakdownChart (components/calculators/CostBreakdownChart.tsx)
```typescript
// Recharts horizontal BarChart
// Shows each factor's dollar contribution to the total premium
// Colors: primary-accent for the bars, primary-light for the background
// X axis: dollar amounts with $ prefix
// Y axis: factor names (Base rate, Age, Location, Coverage, Driving record, Mileage)
// Tooltip: shows factor name, dollar amount, and multiplier
// Animated on mount: bars fill in left-to-right over 600ms
// Height: 280px fixed
```

### 5.4 StateSelector (components/calculators/StateSelector.tsx)
```typescript
// shadcn/ui Select component listing all 50 US states + DC
// Sorted alphabetically
// Default: empty / "Select your state"
// On change: triggers re-calculation if other fields already filled
// All 51 entries: Alabama, Alaska, Arizona, Arkansas, California, Colorado,
// Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana,
// Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan,
// Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire,
// New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio,
// Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota,
// Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,
// Wisconsin, Wyoming, District of Columbia
```

### 5.5 ToolPageWrapper (components/calculators/ToolPageWrapper.tsx)
```typescript
// Standard wrapper used by EVERY calculator page
// Structure from top to bottom:
// 1. SEO metadata (passed as props, applied via generateMetadata)
// 2. Page hero: light green bg-primary-light, breadcrumb, H1 title, subtitle
// 3. AdUnit slot="LEADERBOARD_1" format="leaderboard"
// 4. Main content: 2-column grid (desktop) — calculator left, results right
//    On mobile: stacks vertically, results below calculator
// 5. Disclaimer component (type="calculator")
// 6. How-to guide section (H2 + content passed as children)
// 7. FAQ section (FAQAccordion component)
// 8. Related calculators section (3 cards linking to related tools)
// 9. Footer AdUnit slot="RECTANGLE_1" format="rectangle"
interface ToolPageWrapperProps {
  title: string
  subtitle: string
  metaTitle: string
  metaDescription: string
  canonicalUrl: string
  howToContent: React.ReactNode
  faqItems: FAQItem[]
  relatedCalculators: RelatedCalc[]
  children: React.ReactNode  // The CalculatorForm + ResultsPanel
}
```

### 5.6 FAQAccordion (components/FAQAccordion.tsx)
```typescript
interface FAQItem {
  question: string
  answer: string
}
// Uses shadcn/ui Accordion
// Renders JSON-LD FAQPage schema in a <script type="application/ld+json"> tag
// Each item: question bold 17px, answer 16px neutral-600
// Max 5 items per calculator page
```

### 5.7 RelatedCalculators (components/RelatedCalculators.tsx)
```typescript
interface RelatedCalc {
  title: string
  href: string
  description: string   // 1 sentence
  icon: LucideIcon
}
// Grid of 3 cards, each with icon, title, description, and "Calculate →" link
// Exact same card style as homepage tool grid
// Always show exactly 3 related calculators — no more, no less
```

---

## 6. DATA FILES — BUILD THESE FIRST

### 6.1 /lib/data/state-averages.json
```typescript
// Structure:
{
  "states": {
    "Alabama": {
      "slug": "alabama",
      "abbreviation": "AL",
      "auto": {
        "annual": 1548,
        "monthly": 129,
        "rank": 14,         // rank among 51 (1 = cheapest)
        "trend": "up"       // "up" | "down" | "stable"
      },
      "home": {
        "annual": 2140,
        "monthly": 178,
        "rank": 42,
        "trend": "up"
      },
      "renters": {
        "annual": 263,
        "monthly": 22,
        "rank": 28,
        "trend": "stable"
      },
      "life_term_500k_40yr_male": {
        "monthly": 42,
        "rank": 19,
        "trend": "stable"
      }
    }
    // ... all 50 states + DC
  },
  "national_averages": {
    "auto": { "annual": 1780, "monthly": 148 },
    "home": { "annual": 1428, "monthly": 119 },
    "renters": { "annual": 263, "monthly": 22 },
    "life_term_500k_40yr_male": { "monthly": 48 }
  },
  "last_updated": "2026-01",
  "sources": ["NAIC 2025 Auto Insurance Database Report", "Insurance Information Institute 2025", "NAIC Homeowners Report 2025"]
}

// IMPORTANT: Research and populate with realistic 2025/2026 public data.
// Source: NAIC.org public reports, III.org (Insurance Information Institute)
// Do NOT invent numbers. Use publicly available state averages.
// All 51 entries required (50 states + DC).
```

### 6.2 /lib/data/insurer-profiles.json
```typescript
{
  "insurers": [
    {
      "id": "geico",
      "name": "GEICO",
      "logo_text": "GEICO",
      "price_tier": "budget",          // "budget" | "mid" | "premium"
      "naic_complaint_index": 0.79,    // below 1.0 = better than average
      "jd_power_auto_score": 874,      // out of 1000
      "jd_power_home_score": null,     // null if not rated
      "am_best_rating": "A++",
      "best_for": ["budget-conscious drivers", "military members", "simple coverage needs"],
      "not_best_for": ["those needing local agents", "complex coverage situations"],
      "pros": [
        "Consistently among the cheapest rates nationally",
        "Excellent online and app experience",
        "Strong financial stability rating",
        "15-minute quote process"
      ],
      "cons": [
        "Limited local agent availability",
        "Below-average claims satisfaction scores",
        "Fewer coverage add-ons than competitors"
      ],
      "types_offered": ["auto", "home", "renters", "life", "umbrella"],
      "military_only": false,
      "summary": "GEICO is the go-to choice for drivers who prioritize low premiums over personalized service. Ideal for straightforward coverage needs and tech-comfortable customers.",
      "affiliate_note": "placeholder"  // updated when affiliate approved
    },
    {
      "id": "progressive",
      "name": "Progressive",
      "price_tier": "budget",
      "naic_complaint_index": 0.93,
      "jd_power_auto_score": 856,
      "jd_power_home_score": 801,
      "am_best_rating": "A+",
      "best_for": ["high-risk drivers", "bundlers", "Snapshot discount seekers", "those with accidents on record"],
      "not_best_for": ["drivers with perfect records seeking absolute lowest rates"],
      "pros": [
        "Name Your Price tool lets you start with a budget",
        "Best rates for drivers with accidents or violations",
        "Snapshot telematics can cut rates significantly",
        "Strong bundling discounts"
      ],
      "cons": [
        "Rates for clean-record drivers often not the lowest",
        "Customer service ratings below industry average",
        "Snapshot program can raise rates if it tracks poor driving"
      ],
      "types_offered": ["auto", "home", "renters", "life", "commercial"],
      "military_only": false,
      "summary": "Progressive shines for non-standard drivers. If you have a spotty record or want to start with a target price and work backward, Progressive is worth a serious look."
    },
    {
      "id": "state-farm",
      "name": "State Farm",
      "price_tier": "mid",
      "naic_complaint_index": 0.55,
      "jd_power_auto_score": 891,
      "jd_power_home_score": 829,
      "am_best_rating": "A++",
      "best_for": ["those wanting a local agent", "bundlers", "young drivers on parent policy", "customer service priority"],
      "not_best_for": ["pure price shoppers", "fully digital-first customers"],
      "pros": [
        "Largest network of local agents in the US",
        "Top-tier claims satisfaction consistently",
        "Best-in-class Drive Safe & Save telematics discount",
        "Outstanding bundling discounts"
      ],
      "cons": [
        "Not always the cheapest option",
        "Online quotes less intuitive than GEICO or Progressive",
        "Limited in some states due to market conditions"
      ],
      "types_offered": ["auto", "home", "renters", "life", "health", "commercial"],
      "military_only": false,
      "summary": "State Farm is the relationship insurer. If you want a real person handling your policy and claims, and you're willing to pay a small premium for it, State Farm consistently earns that trust."
    },
    {
      "id": "allstate",
      "name": "Allstate",
      "price_tier": "mid",
      "naic_complaint_index": 1.15,
      "jd_power_auto_score": 848,
      "jd_power_home_score": 815,
      "am_best_rating": "A+",
      "best_for": ["bundlers", "those wanting new car replacement", "accident forgiveness seekers"],
      "not_best_for": ["price-sensitive shoppers", "those with accident history"],
      "pros": [
        "Accident forgiveness program",
        "New car replacement coverage available",
        "Drivewise telematics rewards safe driving",
        "Strong local agent network"
      ],
      "cons": [
        "Rates consistently above industry average",
        "Higher-than-average NAIC complaint index",
        "Premium increases after claims are significant"
      ],
      "types_offered": ["auto", "home", "renters", "life", "commercial"],
      "military_only": false,
      "summary": "Allstate offers solid coverage with useful extras like accident forgiveness, but you'll pay more for it. Best when you value those specific features over raw savings."
    },
    {
      "id": "liberty-mutual",
      "name": "Liberty Mutual",
      "price_tier": "mid",
      "naic_complaint_index": 1.72,
      "jd_power_auto_score": 822,
      "jd_power_home_score": 805,
      "am_best_rating": "A",
      "best_for": ["new car owners", "those wanting customizable coverage", "RightTrack telematics participants"],
      "not_best_for": ["those prioritizing service satisfaction", "budget shoppers"],
      "pros": [
        "Better Car Replacement covers a newer model if yours is totaled",
        "Highly customizable coverage options",
        "RightTrack can reduce premiums up to 30%"
      ],
      "cons": [
        "Rates often higher than competitors for similar coverage",
        "Above-average complaint index",
        "Customer satisfaction scores below industry average"
      ],
      "types_offered": ["auto", "home", "renters", "life", "commercial"],
      "military_only": false,
      "summary": "Liberty Mutual's coverage customization is genuinely good, but the higher rates and weaker service scores mean you should comparison-shop carefully before committing."
    },
    {
      "id": "nationwide",
      "name": "Nationwide",
      "price_tier": "mid",
      "naic_complaint_index": 0.68,
      "jd_power_auto_score": 876,
      "jd_power_home_score": 828,
      "am_best_rating": "A+",
      "best_for": ["bundlers", "farmers and ranchers", "those wanting on-your-side claims service"],
      "not_best_for": ["urban drivers seeking the cheapest rates"],
      "pros": [
        "Below-average complaint ratio",
        "Strong On Your Side claims review process",
        "Farm Bureau partnerships for rural customers",
        "Competitive bundling discounts"
      ],
      "cons": [
        "Not available in all states",
        "Fewer discount options than GEICO or Progressive",
        "Online experience lags behind digital-first competitors"
      ],
      "types_offered": ["auto", "home", "renters", "life", "farm", "commercial"],
      "military_only": false,
      "summary": "Nationwide is a solid mid-tier choice with strong claims satisfaction and good bundling. Especially worth considering for rural customers and farm property."
    },
    {
      "id": "farmers",
      "name": "Farmers",
      "price_tier": "premium",
      "naic_complaint_index": 0.88,
      "jd_power_auto_score": 856,
      "jd_power_home_score": 791,
      "am_best_rating": "A",
      "best_for": ["those wanting agent relationships", "high-value home owners", "classic car owners", "rideshare drivers"],
      "not_best_for": ["price-sensitive customers"],
      "pros": [
        "Rideshare insurance for Uber/Lyft drivers",
        "Classic/antique car coverage available",
        "Strong agent network for complex needs",
        "Signal app telematics available"
      ],
      "cons": [
        "Rates consistently higher than average",
        "Home insurance J.D. Power scores below average",
        "Not available in all states"
      ],
      "types_offered": ["auto", "home", "renters", "life", "commercial", "classic-car"],
      "military_only": false,
      "summary": "Farmers costs more but offers coverage options others don't — particularly for rideshare drivers and classic car owners. The price premium is only justified if you need those specifics."
    },
    {
      "id": "usaa",
      "name": "USAA",
      "price_tier": "budget",
      "naic_complaint_index": 0.26,
      "jd_power_auto_score": 909,
      "jd_power_home_score": 882,
      "am_best_rating": "A++",
      "best_for": ["military members", "veterans", "military families — the only people eligible"],
      "not_best_for": ["anyone not affiliated with the US military — not available"],
      "pros": [
        "Consistently highest J.D. Power scores in the industry",
        "Lowest complaint ratio of any major insurer",
        "Highly competitive rates for members",
        "Outstanding claims experience"
      ],
      "cons": [
        "Only available to military members, veterans, and their immediate families",
        "No physical agent offices for in-person service"
      ],
      "types_offered": ["auto", "home", "renters", "life", "banking"],
      "military_only": true,
      "summary": "USAA is the best insurance company in America by virtually every metric — but only if you're eligible. If you or a family member served, apply immediately."
    }
  ]
}
```

### 6.3 /lib/data/rate-trends-5yr.json
```typescript
{
  "years": [2021, 2022, 2023, 2024, 2025, 2026],
  "national": {
    "auto": [1508, 1625, 1759, 1842, 1780, 1780],
    "home": [1249, 1312, 1387, 1428, 1428, 1428],
    "renters": [228, 242, 255, 263, 263, 263]
  },
  "by_state": {
    "California": {
      "auto": [1960, 2140, 2380, 2650, 2720, 2720],
      "home": [1450, 1680, 1920, 2180, 2180, 2180]
    }
    // Include top 15 states by population for the trend chart page
    // California, Texas, Florida, New York, Pennsylvania, Illinois,
    // Ohio, Georgia, North Carolina, Michigan, New Jersey, Virginia,
    // Washington, Arizona, Tennessee
  },
  "sources": ["NAIC", "Insurance Information Institute", "S&P Global Market Intelligence"]
}
```

### 6.4 /lib/data/glossary-terms.json
```typescript
{
  "terms": [
    {
      "term": "Deductible",
      "slug": "deductible",
      "short_definition": "The amount you pay out of pocket before insurance kicks in.",
      "full_definition": "A deductible is the fixed dollar amount you agree to pay toward a covered claim before your insurance company pays the rest. For example, if you have a $1,000 deductible and file a claim for $3,500 in damage, you pay $1,000 and your insurer pays $2,500. Higher deductibles lower your premium; lower deductibles raise it.",
      "example": "Your car is damaged in a hail storm. Repair cost: $2,200. Your deductible: $500. You pay $500. Your insurer pays $1,700.",
      "related_calculator": "/auto-insurance-calculator",
      "related_terms": ["premium", "out-of-pocket-maximum", "copay"]
    },
    {
      "term": "Premium",
      "slug": "premium",
      "short_definition": "The amount you pay for your insurance policy, usually monthly or annually.",
      "full_definition": "A premium is the price you pay to maintain your insurance coverage. It can be paid monthly, quarterly, or annually. Your premium is calculated based on your risk factors — for auto insurance, that includes your age, driving record, vehicle type, location, and coverage level. Paying annually is usually 5-10% cheaper than paying monthly.",
      "example": "Your auto insurance premium is $148/month or $1,680/year. Paying annually saves you about $96.",
      "related_calculator": "/auto-insurance-calculator",
      "related_terms": ["deductible", "coverage-limit"]
    },
    {
      "term": "Coverage limit",
      "slug": "coverage-limit",
      "short_definition": "The maximum amount your insurer will pay for a covered claim.",
      "full_definition": "A coverage limit is the cap on what your insurance company will pay for a single claim or over the policy period. For example, if you have $100,000 in bodily injury liability coverage and cause an accident with $150,000 in medical bills, your insurer pays $100,000 and you are personally responsible for the remaining $50,000.",
      "example": "You have $100,000/$300,000 liability limits. Your insurer pays up to $100,000 per person injured and $300,000 total per accident.",
      "related_calculator": "/auto-insurance-calculator",
      "related_terms": ["liability-insurance", "umbrella-insurance"]
    },
    {
      "term": "Liability insurance",
      "slug": "liability-insurance",
      "short_definition": "Coverage that pays for damage or injuries you cause to others.",
      "full_definition": "Liability insurance covers costs you become legally responsible for when you cause harm to other people or their property. In auto insurance, this means covering medical bills and property damage for others if you cause an accident. In home insurance, it covers injuries that happen on your property. Liability coverage does NOT cover your own injuries or property damage — that requires separate coverage.",
      "example": "You run a red light and hit another car. The other driver's medical bills total $45,000. Your $100,000 liability coverage pays it. Your own injuries are covered by your medical payments/PIP coverage.",
      "related_calculator": "/full-coverage-vs-liability-calculator",
      "related_terms": ["full-coverage", "umbrella-insurance", "coverage-limit"]
    },
    {
      "term": "Full coverage",
      "slug": "full-coverage",
      "short_definition": "A package including liability, collision, and comprehensive coverage.",
      "full_definition": "Full coverage is not a specific policy type — it's industry shorthand for a combination of liability coverage (required by law), collision coverage (pays for your car if you hit something), and comprehensive coverage (pays for non-collision damage like theft, weather, or fire). It's required by lenders when you finance or lease a vehicle.",
      "example": "A deer runs into your car at night. Comprehensive coverage pays for repairs (minus your deductible). Without comprehensive, you'd pay out of pocket.",
      "related_calculator": "/full-coverage-vs-liability-calculator",
      "related_terms": ["collision-coverage", "comprehensive-coverage", "liability-insurance"]
    },
    {
      "term": "Collision coverage",
      "slug": "collision-coverage",
      "short_definition": "Pays to repair or replace your vehicle after an accident.",
      "full_definition": "Collision coverage pays for damage to your vehicle when it collides with another vehicle or object, regardless of fault. If you hit a guardrail, get rear-ended and your car is damaged, or roll your vehicle, collision coverage pays for repairs up to your vehicle's actual cash value, minus your deductible. It's optional if you own your car outright, but required if you're financing or leasing.",
      "example": "You back into a pole in a parking lot. Damage: $1,800. Your collision deductible: $500. Your insurer pays $1,300.",
      "related_calculator": "/full-coverage-vs-liability-calculator",
      "related_terms": ["comprehensive-coverage", "deductible", "full-coverage"]
    },
    {
      "term": "Comprehensive coverage",
      "slug": "comprehensive-coverage",
      "short_definition": "Covers non-collision damage like theft, weather, and fire.",
      "full_definition": "Comprehensive coverage pays for damage to your vehicle that is not caused by a collision. This includes theft, vandalism, hail damage, flood damage, fire, falling objects, and animal strikes. Like collision coverage, it pays up to your vehicle's actual cash value minus your deductible. It's optional if you own your car, but required by lenders.",
      "example": "A hailstorm dents your car heavily. Damage estimate: $4,200. Your comprehensive deductible: $500. Your insurer pays $3,700.",
      "related_calculator": "/compress-pdf",
      "related_terms": ["collision-coverage", "deductible", "full-coverage"]
    },
    {
      "term": "Underwriting",
      "slug": "underwriting",
      "short_definition": "The process insurers use to assess your risk and set your premium.",
      "full_definition": "Underwriting is how insurance companies decide whether to cover you and at what price. Underwriters analyze your risk factors — for auto insurance: driving record, age, credit score, vehicle type, location, claims history. For life insurance: age, health, occupation, lifestyle. The riskier your profile, the higher your premium. Some high-risk applicants may be declined entirely.",
      "example": "You apply for auto insurance with two at-fault accidents in the last three years. The underwriter flags you as high-risk. You're approved, but at 1.8x the standard rate.",
      "related_calculator": "/auto-insurance-calculator",
      "related_terms": ["premium", "risk-assessment", "claims-history"]
    },
    {
      "term": "Subrogation",
      "slug": "subrogation",
      "short_definition": "When your insurer recovers money from the at-fault party after paying your claim.",
      "full_definition": "Subrogation is the legal process where your insurance company steps into your shoes to pursue recovery from a third party who caused your loss. Example: someone rear-ends your car. Your collision coverage pays for your repairs quickly. Then your insurer pursues the at-fault driver's insurer to reclaim those costs. If successful, you may receive your deductible back.",
      "example": "A distracted driver totals your car. Your insurer pays you $18,000. Your insurer then sues the at-fault driver's insurance and recovers $18,000. You get your $500 deductible back.",
      "related_calculator": "/auto-insurance-calculator",
      "related_terms": ["at-fault", "claims-process", "deductible"]
    },
    {
      "term": "Actuarial",
      "slug": "actuarial",
      "short_definition": "Statistical analysis of risk and probability used to calculate insurance rates.",
      "full_definition": "Actuarial science is the mathematical discipline insurance companies use to evaluate risk and set prices. Actuaries analyze massive datasets — accident rates by age, weather patterns, crime statistics, health outcomes — to predict how likely claims are and how large they'll be. Your premium reflects actuarial analysis of thousands of people like you, not just your individual history.",
      "example": "Actuarial data shows that 18-year-old male drivers in urban areas have accident rates 4x higher than 35-year-old female drivers in suburban areas. This directly drives the premium difference.",
      "related_calculator": "/auto-insurance-calculator",
      "related_terms": ["underwriting", "risk-assessment", "premium"]
    },
    {
      "term": "NAIC complaint index",
      "slug": "naic-complaint-index",
      "short_definition": "A score comparing an insurer's complaint volume to its market share.",
      "full_definition": "The National Association of Insurance Commissioners (NAIC) tracks every complaint filed against insurance companies in the US. The complaint index compares an insurer's complaint volume to its size — 1.0 is average. Below 1.0 means fewer complaints than expected given the company's size (better). Above 1.0 means more complaints than expected (worse). It's one of the most objective indicators of claims and service quality.",
      "example": "USAA has an NAIC complaint index of 0.26 — meaning 74% fewer complaints per customer than the industry average. Liberty Mutual's index of 1.72 means 72% more complaints than average.",
      "related_calculator": "/compare",
      "related_terms": ["claims-satisfaction", "jd-power-score"]
    },
    {
      "term": "DIME method",
      "slug": "dime-method",
      "short_definition": "A formula for calculating life insurance needs: Debt, Income, Mortgage, Education.",
      "full_definition": "The DIME method is a practical framework for calculating how much life insurance you need. D = all outstanding debts (credit cards, car loans, personal loans — excluding mortgage). I = income × years of replacement needed. M = remaining mortgage balance. E = estimated future education costs per child. Add these four numbers and subtract any existing life insurance coverage to get your coverage gap.",
      "example": "Debt: $25,000. Income: $65,000 × 15 years = $975,000. Mortgage: $220,000. Education: 2 kids × $100,000 = $200,000. Total need: $1,420,000. Minus existing group life: $130,000. Coverage gap: $1,290,000.",
      "related_calculator": "/how-much-life-insurance-do-i-need",
      "related_terms": ["term-life-insurance", "death-benefit", "beneficiary"]
    },
    {
      "term": "Term life insurance",
      "slug": "term-life-insurance",
      "short_definition": "Life insurance that covers you for a fixed period, typically 10–30 years.",
      "full_definition": "Term life insurance provides a death benefit if you die during the policy term. If you outlive the term, the policy expires with no payout. It's the most straightforward and affordable type of life insurance — a healthy 35-year-old can get $500,000 in coverage for around $25–30/month on a 20-year term. Most financial advisors recommend term for income replacement needs.",
      "example": "You buy a 20-year, $750,000 term policy at age 32. Your premium: $38/month. If you die anytime before age 52, your family receives $750,000. If you're alive at 52, the policy ends.",
      "related_calculator": "/how-much-life-insurance-do-i-need",
      "related_terms": ["whole-life-insurance", "death-benefit", "dime-method"]
    },
    {
      "term": "Whole life insurance",
      "slug": "whole-life-insurance",
      "short_definition": "Permanent life insurance with a savings component that builds cash value.",
      "full_definition": "Whole life insurance provides lifetime coverage as long as you pay premiums, and includes a cash value component that grows at a guaranteed rate. You can borrow against this cash value or surrender the policy for its value. Premiums are typically 5–15x higher than term life for the same death benefit. Most financial planners recommend term over whole life for pure income replacement.",
      "example": "A 35-year-old pays $450/month for $500,000 in whole life coverage. By age 65, the policy has built $180,000 in cash value they can borrow against.",
      "related_calculator": "/term-vs-whole-life-insurance",
      "related_terms": ["term-life-insurance", "cash-value", "permanent-life-insurance"]
    },
    {
      "term": "Replacement cost value",
      "slug": "replacement-cost-value",
      "short_definition": "Pays to replace your property with a new equivalent, no depreciation deducted.",
      "full_definition": "Replacement cost value (RCV) coverage pays what it costs to replace your damaged or stolen property with a new equivalent today — without deducting for age or wear. It's more expensive than actual cash value (ACV) coverage but pays significantly more at claim time. For homeowners and renters insurance, RCV coverage for personal property can mean 30–50% more payout on older items.",
      "example": "Your 5-year-old laptop is stolen. Replacement cost: $1,400. Actual cash value (depreciated): $600. With RCV coverage, you get $1,400. With ACV coverage, you get $600.",
      "related_calculator": "/renters-insurance-calculator",
      "related_terms": ["actual-cash-value", "depreciation", "personal-property-coverage"]
    },
    {
      "term": "Actual cash value",
      "slug": "actual-cash-value",
      "short_definition": "Pays the depreciated value of property — what it's worth today, not what it costs to replace.",
      "full_definition": "Actual cash value (ACV) coverage pays the current market value of your property at the time of loss, accounting for depreciation due to age and wear. ACV policies have lower premiums than replacement cost value (RCV) policies, but pay significantly less at claim time for older items. For a 7-year-old sofa that cost $1,200 new, ACV might pay only $300.",
      "example": "Your roof is 15 years old and is damaged by a storm. Replacement cost: $12,000. With ACV coverage accounting for depreciation, your insurer pays $5,800.",
      "related_calculator": "/home-insurance-calculator",
      "related_terms": ["replacement-cost-value", "depreciation", "claims-settlement"]
    },
    {
      "term": "Personal liability coverage",
      "slug": "personal-liability-coverage",
      "short_definition": "Pays if someone sues you for injury or property damage you're responsible for.",
      "full_definition": "Personal liability coverage protects you financially if you're held legally responsible for injuring someone or damaging their property. In homeowners or renters insurance, this covers incidents on your property (a guest slips and falls) and some off-property incidents. Standard policies include $100,000 in liability; most financial advisors recommend $300,000–$500,000, or adding an umbrella policy for broader protection.",
      "example": "A guest trips on your stairs and breaks their wrist. Medical bills and lost wages total $28,000. Your personal liability coverage pays the claim, protecting your savings.",
      "related_calculator": "/renters-insurance-calculator",
      "related_terms": ["umbrella-insurance", "coverage-limit", "liability-insurance"]
    },
    {
      "term": "Umbrella insurance",
      "slug": "umbrella-insurance",
      "short_definition": "Extra liability coverage that kicks in when your home or auto policy limits are exceeded.",
      "full_definition": "An umbrella policy provides an extra layer of liability protection on top of your existing home, auto, and other policies. It activates when those underlying policy limits are exhausted. A $1 million umbrella policy typically costs $150–$300/year — extremely cost-effective protection against a serious lawsuit. Most insurers require you to have minimum liability limits on underlying policies to qualify.",
      "example": "You cause a multi-car accident with $380,000 in total liability. Your auto policy limit: $300,000. Your umbrella pays the remaining $80,000, protecting your savings and assets.",
      "related_calculator": "/umbrella-insurance-calculator",
      "related_terms": ["liability-insurance", "coverage-limit", "personal-liability-coverage"]
    },
    {
      "term": "Health insurance deductible",
      "slug": "health-insurance-deductible",
      "short_definition": "The amount you pay for health care each year before insurance starts paying.",
      "full_definition": "Your health insurance deductible is the total amount you pay out of pocket each year for covered services before your insurance company begins sharing costs. For example, with a $2,000 deductible, you pay 100% of covered medical costs until you've spent $2,000, then your insurer begins paying its share. Preventive care (like annual physicals) is usually covered before the deductible under the ACA.",
      "example": "Your plan has a $2,000 deductible. You have a minor surgery in March that costs $4,500. You pay the first $2,000. Your insurance pays its share of the remaining $2,500 according to your coinsurance rate.",
      "related_calculator": "/health-insurance-deductible-calculator",
      "related_terms": ["out-of-pocket-maximum", "coinsurance", "copay", "hsa"]
    },
    {
      "term": "Out-of-pocket maximum",
      "slug": "out-of-pocket-maximum",
      "short_definition": "The most you'll pay in a year before insurance covers 100% of costs.",
      "full_definition": "The out-of-pocket maximum (OOPM) is the cap on what you'll pay for covered health services in a plan year. Once you reach this limit — through your deductible, copays, and coinsurance combined — your insurance covers 100% of covered services for the rest of the year. ACA plans cap OOPM at $9,450 for individuals and $18,900 for families in 2026.",
      "example": "Your OOPM is $6,500. After a hospitalization, your total out-of-pocket costs hit $6,500. Any further covered medical costs for the rest of the year are paid 100% by your insurer.",
      "related_calculator": "/out-of-pocket-max-estimator",
      "related_terms": ["deductible", "coinsurance", "health-insurance-deductible"]
    },
    {
      "term": "HSA (Health Savings Account)",
      "slug": "hsa",
      "short_definition": "A tax-advantaged account for medical expenses, available with high-deductible health plans.",
      "full_definition": "A Health Savings Account (HSA) lets you save pre-tax money for qualified medical expenses. HSAs are only available if you have a High-Deductible Health Plan (HDHP). Contributions are tax-deductible, growth is tax-free, and withdrawals for qualified medical expenses are tax-free — a triple tax advantage. Unused funds roll over year to year and can be invested. In 2026, individuals can contribute up to $4,300; families up to $8,550.",
      "example": "You contribute $4,300 to an HSA. That lowers your taxable income by $4,300. You invest it; it grows to $4,800 by year-end. You spend $1,200 on dental work — all tax-free.",
      "related_calculator": "/hsa-contribution-calculator",
      "related_terms": ["health-insurance-deductible", "high-deductible-health-plan", "fsa"]
    },
    {
      "term": "ACA subsidy",
      "slug": "aca-subsidy",
      "short_definition": "Government financial help to reduce your health insurance premium on the marketplace.",
      "full_definition": "The Affordable Care Act (ACA) provides premium tax credits to individuals and families whose income falls between 100% and 400% of the federal poverty level (FPL) — and in some cases above 400% under enhanced subsidies. The subsidy reduces your monthly premium directly. Your subsidy amount depends on your income, family size, and the cost of benchmark plans in your area. Apply through healthcare.gov.",
      "example": "A family of 3 earning $65,000/year may qualify for $600+/month in premium subsidies, reducing a $1,400/month benchmark plan to $800/month or less.",
      "related_calculator": "/aca-subsidy-estimator",
      "related_terms": ["health-insurance-deductible", "marketplace-plan", "premium"]
    },
    {
      "term": "Gap insurance",
      "slug": "gap-insurance",
      "short_definition": "Covers the difference between what your car is worth and what you owe on your loan.",
      "full_definition": "Guaranteed Asset Protection (GAP) insurance pays the difference between your vehicle's actual cash value (ACV) and the remaining balance on your auto loan if your car is totaled or stolen. New cars depreciate 20–25% in the first year, but loan payoff is slower — leaving a gap. Without GAP insurance, you'd still owe money on a car you no longer have.",
      "example": "You owe $28,000 on your car. It's totaled. The ACV is $22,000. Your regular insurance pays $22,000. You still owe $6,000. GAP insurance covers that $6,000.",
      "related_calculator": "/gap-insurance-calculator",
      "related_terms": ["actual-cash-value", "collision-coverage", "auto-loan"]
    },
    {
      "term": "SR-22",
      "slug": "sr-22",
      "short_definition": "A form proving you carry minimum required auto insurance, required after serious violations.",
      "full_definition": "An SR-22 is not insurance — it's a certificate of financial responsibility that your insurer files with your state DMV proving you carry the minimum required coverage. It's required after serious violations like DUI/DWI, reckless driving, driving without insurance, or license suspension. SR-22 requirements typically last 3 years and usually increase your insurance premium significantly.",
      "example": "You receive a DUI. Your state requires an SR-22 for 3 years. Your insurer files the form (fee: $15–$50). Your premium increases by 40–80% during the SR-22 period.",
      "related_calculator": "/sr-22-insurance-calculator",
      "related_terms": ["high-risk-driver", "premium", "liability-insurance"]
    },
    {
      "term": "COBRA insurance",
      "slug": "cobra-insurance",
      "short_definition": "Temporary health coverage continuation after leaving a job, at your own expense.",
      "full_definition": "The Consolidated Omnibus Budget Reconciliation Act (COBRA) allows you to continue your employer-sponsored health insurance for up to 18–36 months after leaving a job, losing hours, or experiencing other qualifying events. The catch: you pay the full premium — both your share and what your employer was paying — plus a 2% admin fee. COBRA is often 3–4x what you paid while employed.",
      "example": "While employed, you paid $180/month for health insurance. Your employer paid $620/month. On COBRA, you pay $180 + $620 + 2% = $816/month for identical coverage.",
      "related_calculator": "/cobra-cost-calculator",
      "related_terms": ["health-insurance-deductible", "marketplace-plan", "aca-subsidy"]
    }
  ]
}
```

---

## 7. ALL PAGES — COMPLETE LIST AND SPECIFICATIONS

### 7.1 Homepage (app/page.tsx)

**URL:** /
**Meta title:** "Zeember — Know What Coverage Really Costs"
**Meta description:** "Free US insurance calculators with full cost breakdowns. No signup, no personal info. Auto, life, home, health, and more."

**Page structure (top to bottom):**

```
1. HERO SECTION
   - Background: bg-primary (#0F3D2E), full-width
   - Left side: 
     H1: "Know what coverage really costs." (Source Serif 4, 56px, white)
     Subtext: "See your real insurance cost in seconds." (Inter, 20px, white/80%)
     Third line: "50+ tools. No accounts. No storage. Files stay on your device." (Inter, 16px, white/60%)
     Two CTA buttons: "Calculate my cost →" (primary-accent filled) | "Compare insurers" (outlined white)
   - Right side: floating card showing a sample auto insurance result
     Card: bg-white/10 backdrop-blur, rounded-2xl, p-6
     Shows: "$1,847/year" in large Source Serif 4, green accent color
     Below: "Estimated auto insurance — Ohio, age 34, clean record"
     Mini breakdown bars showing Base rate, Age factor, Location
   - Breadcrumb area: 3 trust signals in a row below hero
     "No signup required" | "No personal info stored" | "NAIC data sourced"

2. CALCULATOR CATEGORIES GRID
   Background: bg-white
   H2: "What would you like to estimate?" (Source Serif 4, centered)
   6-card grid (3 col desktop, 2 col tablet, 1 col mobile):
   Card 1: Auto Insurance — Shield icon — "Car insurance cost calculator" — links to /auto-insurance-calculator
   Card 2: Life Insurance — Heart icon — "How much life insurance do you need?" — links to /how-much-life-insurance-do-i-need
   Card 3: Home Insurance — Home icon — "Home insurance cost estimator" — links to /home-insurance-calculator
   Card 4: Health Insurance — Activity icon — "Deductibles, HSA, COBRA and more" — links to /health-insurance-deductible-calculator
   Card 5: Renters Insurance — Building icon — "Renters insurance coverage and cost" — links to /renters-insurance-calculator
   Card 6: Compare Insurers — ArrowLeftRight icon — "GEICO vs Progressive vs State Farm" — links to /compare

3. LIFE EVENTS SECTION
   Background: bg-neutral-50
   H2: "What's changed in your life?" (Source Serif 4, centered)
   Subtext: "Insurance needs shift with major life events. Find the right tools for your situation."
   8-card grid (4 col desktop, 2 col mobile):
   "Just got married" — Ring icon — /life-events/just-got-married
   "Bought a home" — Home icon — /life-events/bought-a-home
   "Had a baby" — Baby icon — /life-events/had-a-baby
   "Bought a car" — Car icon — /life-events/bought-a-car
   "Turned 65" — Clock icon — /life-events/turned-65
   "Moved states" — MapPin icon — /life-events/moved-states
   "Adopted a pet" — Dog icon — /life-events/adopted-a-pet
   "Started a business" — Briefcase icon — /life-events/started-a-side-business

4. STATE MAP SECTION
   Background: bg-white
   H2: "Insurance costs by state" (Source Serif 4, centered)
   Subtext: "Click any state to see how your rates compare nationally."
   Full USStateMap component (auto insurance tab active by default)
   Below map: "See all state comparisons →" link to /state-map

5. HOW IT WORKS SECTION
   Background: bg-primary-light
   H2: "How Zeember works" (Source Serif 4, centered)
   3-step horizontal process:
   Step 1: "Enter your details" — Input icon — "Answer a few quick questions about your situation."
   Step 2: "See your estimate" — BarChart icon — "Get an instant estimate with a full cost breakdown."
   Step 3: "Compare and decide" — Check icon — "Compare your estimate to state averages and top insurers."

6. FEATURED CALCULATORS
   Background: bg-white
   H2: "Most used calculators" (Source Serif 4)
   Horizontal scrollable list of 6 calculator cards on mobile, grid on desktop
   Auto, Life (DIME), Home, Renters, Bundling Discount, SR-22

7. TRUST/DATA SECTION
   Background: bg-neutral-900
   White text
   H2: "Data you can trust" (Source Serif 4, white)
   3 columns: "NAIC sourced" | "Updated quarterly" | "No personal info collected"
   Each with an icon, bold headline, 2-sentence description

8. LATEST FROM THE BLOG
   Background: bg-white
   H2: "Insurance guides" (Source Serif 4)
   3 latest blog post cards (title, excerpt, read time, link)
   "View all guides →" link to /blog
```

---

### 7.2 Auto Insurance Calculator (app/(calculators)/auto-insurance-calculator/page.tsx)

**URL:** /auto-insurance-calculator
**Meta title:** "Auto Insurance Calculator — Estimate Your Real Cost | Zeember"
**Meta description:** "Free auto insurance cost calculator with a full premium breakdown. No signup, no personal info. See what drives your rate instantly."

**Form fields (React Hook Form + Zod):**
```typescript
const autoInsuranceSchema = z.object({
  state: z.string().min(1, "Please select your state"),
  age: z.number().min(16, "Minimum age is 16").max(99),
  vehicleType: z.enum(["sedan", "suv", "truck", "sports-car", "minivan", "electric"]),
  vehicleYear: z.number().min(1990).max(2027),
  coverageLevel: z.enum(["minimum", "standard", "full-coverage"]),
  drivingRecord: z.enum(["clean", "one-minor", "one-accident", "multiple"]),
  annualMileage: z.enum(["under-5000", "5000-10000", "10000-15000", "over-15000"]),
})
```

**Calculation logic (/lib/calculators/auto.ts):**
```typescript
export function calculateAutoInsurance(inputs: AutoInsuranceInputs): AutoInsuranceResult {
  const baseRate = STATE_AVERAGES[inputs.state].auto.annual

  const AGE_MULTIPLIERS = {
    '16-19': 2.5, '20-24': 1.6, '25-29': 1.2, '30-59': 1.0, '60-69': 1.1, '70+': 1.25
  }
  const VEHICLE_MULTIPLIERS = {
    sedan: 1.0, suv: 1.1, truck: 1.05, 'sports-car': 1.45, minivan: 0.95, electric: 1.15
  }
  const COVERAGE_MULTIPLIERS = {
    minimum: 0.55, standard: 1.0, 'full-coverage': 1.40
  }
  const RECORD_MULTIPLIERS = {
    clean: 1.0, 'one-minor': 1.22, 'one-accident': 1.48, multiple: 2.05
  }
  const MILEAGE_MULTIPLIERS = {
    'under-5000': 0.88, '5000-10000': 0.95, '10000-15000': 1.0, 'over-15000': 1.12
  }
  // Vehicle year depreciation factor: newer cars cost more to insure
  const currentYear = 2026
  const vehicleAgeFactor = Math.max(0.85, 1.0 - (currentYear - inputs.vehicleYear) * 0.012)

  const ageGroup = getAgeGroup(inputs.age)
  const ageMult = AGE_MULTIPLIERS[ageGroup]
  const vehicleMult = VEHICLE_MULTIPLIERS[inputs.vehicleType]
  const coverageMult = COVERAGE_MULTIPLIERS[inputs.coverageLevel]
  const recordMult = RECORD_MULTIPLIERS[inputs.drivingRecord]
  const mileageMult = MILEAGE_MULTIPLIERS[inputs.annualMileage]

  const annualEstimate = Math.round(
    baseRate * ageMult * vehicleMult * coverageMult * recordMult * mileageMult * vehicleAgeFactor
  )

  return {
    annualEstimate,
    monthlyEstimate: Math.round(annualEstimate / 12),
    rangeLow: Math.round(annualEstimate * 0.80),
    rangeHigh: Math.round(annualEstimate * 1.20),
    stateAverage: STATE_AVERAGES[inputs.state].auto.annual,
    nationalAverage: NATIONAL_AVERAGES.auto.annual,
    breakdownData: [
      { factor: 'Base rate', amount: Math.round(baseRate * coverageMult), multiplier: `${coverageMult}x` },
      { factor: 'Age factor', amount: Math.round(baseRate * coverageMult * (ageMult - 1)), multiplier: `${ageMult}x` },
      { factor: 'Location', amount: Math.round(baseRate * 0.08), multiplier: 'Included' },
      { factor: 'Vehicle type', amount: Math.round(baseRate * coverageMult * Math.abs(vehicleMult - 1)), multiplier: `${vehicleMult}x` },
      { factor: 'Driving record', amount: Math.round(baseRate * coverageMult * (recordMult - 1)), multiplier: `${recordMult}x` },
      { factor: 'Annual mileage', amount: Math.round(baseRate * coverageMult * Math.abs(mileageMult - 1)), multiplier: `${mileageMult}x` },
    ]
  }
}
```

**How-to guide content:**
- H2: "How auto insurance rates are calculated"
- Explain the 6 factors: state, age, vehicle, coverage, record, mileage
- 600 words minimum
- Plain language, no jargon
- Internal links to glossary terms: deductible, liability insurance, full coverage

**FAQ items (5 required):**
1. "How accurate is this auto insurance estimate?" — Explains it's based on state averages and multipliers, actual quotes vary.
2. "What is the difference between full coverage and liability-only?" — Links to /full-coverage-vs-liability-calculator
3. "How can I lower my auto insurance rate?" — 5 practical tips
4. "Does my credit score affect my car insurance rate?" — Explains how in most states (not California, Hawaii, Massachusetts)
5. "How often should I shop for car insurance?" — Every 12-18 months recommendation

**Related calculators:** Full Coverage vs Liability, Teen Driver Insurance, Gap Insurance

---

### 7.3 How Much Life Insurance Do I Need (app/(calculators)/how-much-life-insurance-do-i-need/page.tsx)

**URL:** /how-much-life-insurance-do-i-need
**Meta title:** "How Much Life Insurance Do I Need? Free Calculator | Zeember"
**Meta description:** "Calculate exactly how much life insurance you need using the proven DIME method. Free, instant, no signup required."

**Form fields:**
```typescript
const lifeInsuranceSchema = z.object({
  totalDebt: z.number().min(0),           // Credit cards, car loans, personal loans (NOT mortgage)
  annualIncome: z.number().min(0),
  yearsToReplace: z.number().min(1).max(40),  // slider: 5-30 default 15
  mortgageBalance: z.number().min(0),
  numberOfChildren: z.number().min(0).max(15),
  educationCostPerChild: z.number().min(0),   // default 100000
  existingCoverage: z.number().min(0),         // subtract this from total
  age: z.number().min(18).max(80),
  gender: z.enum(["male", "female"]),
  smoker: z.boolean(),
})
```

**Calculation logic (/lib/calculators/life.ts):**
```typescript
export function calculateLifeInsuranceNeeds(inputs: LifeInsuranceInputs): LifeInsuranceResult {
  // DIME method
  const debt = inputs.totalDebt
  const incomeReplacement = inputs.annualIncome * inputs.yearsToReplace
  const mortgage = inputs.mortgageBalance
  const education = inputs.numberOfChildren * inputs.educationCostPerChild
  const totalNeed = debt + incomeReplacement + mortgage + education
  const coverageGap = Math.max(0, totalNeed - inputs.existingCoverage)

  // Monthly premium estimate for a 20-year term policy
  const TERM_MONTHLY_RATES = {
    male_nonsmoker: { 25: 22, 30: 25, 35: 32, 40: 48, 45: 75, 50: 125, 55: 205, 60: 350 },
    female_nonsmoker: { 25: 18, 30: 21, 35: 27, 40: 40, 45: 62, 50: 100, 55: 170, 60: 290 },
    male_smoker: { 25: 55, 30: 68, 35: 90, 40: 140, 45: 220, 50: 380, 55: 620, 60: 980 },
    female_smoker: { 25: 45, 30: 55, 35: 75, 40: 115, 45: 180, 50: 305, 55: 490, 60: 760 },
  }
  // Rate is per $500,000 of coverage — scale proportionally
  const rateKey = `${inputs.gender}_${inputs.smoker ? 'smoker' : 'nonsmoker'}`
  const ageKey = Math.min(60, Math.round(inputs.age / 5) * 5)
  const baseMonthlyPer500k = TERM_MONTHLY_RATES[rateKey][ageKey]
  const estimatedMonthlyPremium = Math.round((coverageGap / 500000) * baseMonthlyPer500k)

  return {
    totalNeed,
    coverageGap,
    estimatedMonthlyPremium,
    estimatedAnnualPremium: estimatedMonthlyPremium * 12,
    dimeBreakdown: {
      debt, incomeReplacement, mortgage, education
    }
  }
}
```

**FAQ items (5):**
1. "What is the DIME method and how accurate is it?"
2. "How much life insurance does a stay-at-home parent need?"
3. "Is $500,000 enough life insurance?"
4. "When should I buy life insurance?"
5. "Should I choose term or whole life insurance?" — Links to /term-vs-whole-life-insurance

**Related calculators:** Term vs Whole Life Insurance, Life Insurance Cost by Age, Burial Insurance Calculator

---

### 7.4 Home Insurance Calculator (app/(calculators)/home-insurance-calculator/page.tsx)

**URL:** /home-insurance-calculator
**Meta title:** "Home Insurance Calculator — Estimate Your Annual Cost | Zeember"
**Meta description:** "Estimate your homeowners insurance cost based on your home value, location, and coverage level. Free, no personal info required."

**Form fields:**
```typescript
const homeInsuranceSchema = z.object({
  state: z.string().min(1),
  homeValue: z.number().min(50000).max(5000000),
  squareFootage: z.number().min(500).max(20000),
  yearBuilt: z.number().min(1900).max(2026),
  homeType: z.enum(["single-family", "condo", "townhouse", "mobile-home"]),
  constructionType: z.enum(["frame", "masonry", "manufactured"]),
  roofAge: z.enum(["under-10", "10-20", "over-20"]),
  coverageLevel: z.enum(["basic", "standard", "premium"]),
  deductible: z.enum(["500", "1000", "2500", "5000"]),
  hasSecuritySystem: z.boolean(),
  hasPool: z.boolean(),
})
```

**Calculation logic (/lib/calculators/home.ts):**
```typescript
// Base rate: homeValue * 0.001 (0.1% of home value) adjusted by state
// State multiplier from state-averages.json
// Modifiers:
// squareFootage: > 2500 sqft adds 15%, < 1000 sqft reduces 10%
// yearBuilt: < 1970: +20%, 1970-1990: +10%, 1990+: baseline
// constructionType: masonry: -5%, manufactured: +15%
// roofAge: under-10: -5%, 10-20: baseline, over-20: +10%
// deductible: 500: +8%, 1000: baseline, 2500: -12%, 5000: -20%
// securitySystem: -5%
// pool: +10% (liability)
// coverageLevel: basic: 0.7x, standard: 1.0x, premium: 1.3x
```

**FAQ items (5):**
1. "What does homeowners insurance actually cover?"
2. "How is my home insurance premium calculated?"
3. "What is dwelling coverage vs personal property coverage?"
4. "Do I need flood insurance separately?" — Links to /flood-insurance-calculator
5. "How much home insurance do I actually need?"

**Related calculators:** Flood Insurance Estimator, Home Insurance Coverage Calculator, Bundling Discount Calculator

---

### 7.5 Renters Insurance Calculator (app/(calculators)/renters-insurance-calculator/page.tsx)

**URL:** /renters-insurance-calculator
**Meta title:** "Renters Insurance Calculator — Estimate Your Monthly Cost | Zeember"
**Meta description:** "Estimate renters insurance cost by state. Calculate how much personal property coverage you need. Free, no signup."

**Unique feature:** Personal property inventory style input
```typescript
const rentersSchema = z.object({
  state: z.string().min(1),
  propertyValue: z.object({
    electronics: z.number().min(0).default(2500),
    furniture: z.number().min(0).default(3000),
    clothing: z.number().min(0).default(2000),
    jewelry: z.number().min(0).default(500),
    appliances: z.number().min(0).default(1500),
    other: z.number().min(0).default(1000),
  }),
  liabilityLimit: z.enum(["100000", "300000", "500000"]),
  deductible: z.enum(["250", "500", "1000"]),
  coverageType: z.enum(["acv", "rcv"]),  // Actual Cash Value vs Replacement Cost Value
  buildingType: z.enum(["apartment", "house", "condo", "townhouse"]),
  hasRoommatesOnPolicy: z.boolean(),
})
// Total property value auto-calculated from category inputs
// Monthly premium estimate: (totalValue / 1000) * 0.85 * state_factor * deductible_factor
// RCV costs 15% more than ACV
// $300k liability costs $3/month more than $100k
// Show comparison: "State Farm averages $195/year for similar coverage in your state"
```

**Related calculators:** Home Insurance Calculator, Personal Property Value Calculator, Home Insurance Coverage Calculator

---

### 7.6 Health Insurance Deductible Calculator (app/(calculators)/health-insurance-deductible-calculator/page.tsx)

**URL:** /health-insurance-deductible-calculator
**Meta title:** "Health Insurance Deductible Calculator | Zeember"
**Meta description:** "Calculate your true out-of-pocket health insurance costs based on your deductible, coinsurance, and expected medical usage."

**Form fields:**
```typescript
const healthDeductibleSchema = z.object({
  annualDeductible: z.number().min(0),
  coinsurancePercent: z.number().min(0).max(50),   // % you pay after deductible
  outOfPocketMax: z.number().min(0),
  monthlyPremium: z.number().min(0),
  expectedMedicalCosts: z.enum(["minimal", "low", "moderate", "high", "very-high"]),
  // minimal = $500/yr (healthy, no issues)
  // low = $1500/yr (1-2 doctor visits)
  // moderate = $4000/yr (managing a condition)
  // high = $10000/yr (surgery or hospitalization)
  // very-high = $25000+/yr (chronic serious condition)
  planType: z.enum(["hdhp", "ppo", "hmo", "epo"]),
})
// Calculate: total annual cost = (12 * monthlyPremium) + min(deductible, expectedCosts) + coinsurance
// Show breakdown and comparison vs a low-deductible plan
// Recommend: if expected costs < deductible, HDHP + HSA probably better
```

**Related calculators:** HSA Contribution Calculator, Out-of-Pocket Max Estimator, COBRA Cost Calculator

---

### 7.7 HSA Contribution Calculator (app/(calculators)/hsa-contribution-calculator/page.tsx)

**URL:** /hsa-contribution-calculator
**Meta title:** "HSA Contribution Calculator 2026 | Zeember"
**Meta description:** "Calculate your maximum HSA contribution for 2026 and your potential tax savings. Works for individual and family plans."

```typescript
const hsaSchema = z.object({
  coverageType: z.enum(["self", "family"]),
  age: z.number().min(18).max(75),
  taxBracket: z.enum(["10", "12", "22", "24", "32", "35", "37"]),
  stateIncomeTax: z.number().min(0).max(15),  // % state income tax rate
  monthsEligible: z.number().min(1).max(12),
  currentContribution: z.number().min(0),
})
// 2026 IRS limits: $4,300 individual, $8,550 family, +$1,000 catch-up age 55+
// Tax savings = (federal_bracket + state_rate) * contribution
// Show: max contribution, additional contribution available, estimated tax savings
```

---

### 7.8 Out-of-Pocket Max Estimator (app/(calculators)/out-of-pocket-max-estimator/page.tsx)

**URL:** /out-of-pocket-max-estimator
**Meta title:** "Out-of-Pocket Maximum Estimator | Zeember"
**Meta description:** "Estimate when you'll hit your health insurance out-of-pocket maximum based on your expected medical costs."

---

### 7.9 COBRA Cost Calculator (app/(calculators)/cobra-cost-calculator/page.tsx)

**URL:** /cobra-cost-calculator
**Meta title:** "COBRA Insurance Cost Calculator — What Will You Pay? | Zeember"
**Meta description:** "Find out how much COBRA health insurance will cost after leaving your job. Compare COBRA vs ACA marketplace alternatives."

```typescript
const cobraSchema = z.object({
  employeeMonthlyContribution: z.number().min(0),  // what you paid while employed
  employerMonthlyContribution: z.number().min(0),  // what employer paid
  coverageType: z.enum(["employee-only", "employee-spouse", "family"]),
  state: z.string().min(1),
  annualIncome: z.number().min(0),  // for ACA comparison
  age: z.number().min(18),
})
// COBRA monthly = (employee + employer contributions) * 1.02
// Compare vs estimated ACA marketplace cost (based on income/age/state)
// Show which is cheaper and by how much
// Note: COBRA coverage is identical to your employer plan
```

---

### 7.10 ACA Subsidy Estimator (app/(calculators)/aca-subsidy-estimator/page.tsx)

**URL:** /aca-subsidy-estimator
**Meta title:** "ACA Subsidy Calculator 2026 — Estimate Your Marketplace Savings | Zeember"
**Meta description:** "Estimate your ACA health insurance subsidy for 2026. Find out how much you'll pay for marketplace coverage based on your income."

```typescript
const acaSchema = z.object({
  state: z.string().min(1),
  householdSize: z.number().min(1).max(10),
  annualHouseholdIncome: z.number().min(0),
  ages: z.array(z.number()),   // age of each household member
  tobaccoUse: z.boolean(),
})
// 2026 Federal Poverty Level: $15,060 individual, $20,440 family of 2, +$5,380 per additional person
// Subsidy eligibility: 100-400% FPL (and above with enhanced subsidies)
// Benchmark plan calculation based on age and state
// Show: estimated monthly subsidy, estimated premium after subsidy
// Note: actual subsidy calculated on healthcare.gov
```

---

### 7.11 Umbrella Insurance Calculator (app/(calculators)/umbrella-insurance-calculator/page.tsx)

**URL:** /umbrella-insurance-calculator
**Meta title:** "Do I Need Umbrella Insurance? Free Calculator | Zeember"
**Meta description:** "Calculate how much umbrella insurance coverage you need based on your assets and liability exposure. Free, instant."

---

### 7.12 Pet Insurance Cost Calculator (app/(calculators)/pet-insurance-calculator/page.tsx)

**URL:** /pet-insurance-calculator
**Meta title:** "Pet Insurance Cost Calculator 2026 | Zeember"
**Meta description:** "Estimate monthly pet insurance costs by species, breed, and age. See what coverage is worth for your pet."

```typescript
const petSchema = z.object({
  petType: z.enum(["dog", "cat", "other"]),
  breed: z.string(),   // free text, used for lookup
  age: z.number().min(0).max(20),
  state: z.string().min(1),
  reimbursementPercent: z.enum(["70", "80", "90"]),
  annualDeductible: z.enum(["100", "250", "500"]),
  annualLimit: z.enum(["5000", "10000", "unlimited"]),
})
// Average pet insurance costs:
// Dog: $35-85/month depending on breed/age
// Cat: $20-40/month
// Age multiplier: puppies/kittens 0.85x, adults 1.0x, seniors (7+) 1.6x
// Large breeds (Great Dane, German Shepherd, Labrador): +20%
// Reimbursement: 90% costs ~15% more than 80%
// Deductible: $100/yr costs ~12% more than $250/yr
```

---

### 7.13 Term vs Whole Life Insurance Comparison (app/(calculators)/term-vs-whole-life-insurance/page.tsx)

**URL:** /term-vs-whole-life-insurance
**Meta title:** "Term vs Whole Life Insurance Calculator | Zeember"
**Meta description:** "Compare term vs whole life insurance side by side. See the real cost difference and which is right for your situation."

**This page is an interactive comparison tool, not a standard calculator:**
- Two-column comparison showing term life vs whole life for a given age/coverage/term
- Inputs: age, coverage amount ($), term length (for term policy: 10/15/20/30 years)
- Shows: monthly premium comparison, total cost over term, cash value accumulation (whole life only)
- Clear recommendation logic: if the user doesn't need permanent coverage, term is almost always better value
- Include a "break-even analysis" — how long until whole life's cash value justifies the premium difference

---

### 7.14 Life Insurance Cost by Age (app/(calculators)/life-insurance-by-age/page.tsx)

**URL:** /life-insurance-by-age
**Meta title:** "Life Insurance Cost by Age — 2026 Rate Guide | Zeember"
**Meta description:** "See exactly how much life insurance costs at your age. Monthly rates for $250k, $500k, and $1M coverage."

**This is a data display page + calculator:**
- Show a comparison table of monthly rates at each age (25, 30, 35, 40, 45, 50, 55, 60) for $500k 20-year term
- Male nonsmoker vs female nonsmoker columns
- Highlight the user's age row
- Input: age slider, coverage amount, term length — updates estimated premium live

---

### 7.15 Burial Insurance Cost Calculator (app/(calculators)/burial-insurance-calculator/page.tsx)

**URL:** /burial-insurance-calculator
**Meta title:** "Burial Insurance Cost Calculator | Zeember"
**Meta description:** "Estimate final expense insurance (burial insurance) costs. Coverage for funeral and end-of-life expenses."

---

### 7.16 Car Insurance Cost by State (app/(calculators)/car-insurance-cost-by-state/page.tsx)

**URL:** /car-insurance-cost-by-state
**Meta title:** "Average Car Insurance Cost by State 2026 | Zeember"
**Meta description:** "See average auto insurance costs for all 50 states. Find out if you're overpaying based on your state's average."

**This is a data display page with interactive sorting:**
- Sortable table of all 50 states + DC
- Columns: State, Avg Annual (full coverage), Avg Monthly, vs National Average (+/- %)
- Sortable by: Cheapest first, Most expensive first, Alphabetical
- Each state name links to the state detail page: /auto-insurance/[state]
- Color coding: green = below national average, red = above
- Mini bar chart visual per row
- Search filter to find your state quickly

---

### 7.17 Full Coverage vs Liability Calculator (app/(calculators)/full-coverage-vs-liability-calculator/page.tsx)

**URL:** /full-coverage-vs-liability-calculator
**Meta title:** "Full Coverage vs Liability Insurance Calculator | Zeember"
**Meta description:** "Find out if full coverage auto insurance is worth it for your car's value. See the break-even point instantly."

```typescript
// Key calculation: break-even
// Full coverage premium - liability only premium = extra annual cost
// Vehicle value - deductible = max benefit from full coverage
// Break-even years = (vehicle value - deductible) / (full premium - liability premium)
// If break-even > 3 years OR vehicle value < 4000, recommend dropping full coverage
// If vehicle is financed/leased: full coverage required (note this)
```

---

### 7.18 Teen Driver Insurance Cost Calculator (app/(calculators)/teen-driver-insurance-calculator/page.tsx)

**URL:** /teen-driver-insurance-calculator
**Meta title:** "Teen Driver Insurance Cost Calculator | Zeember"
**Meta description:** "Estimate how much adding a teen driver increases your auto insurance. Compare adding to existing policy vs separate policy."

---

### 7.19 SR-22 Insurance Cost Estimator (app/(calculators)/sr-22-insurance-calculator/page.tsx)

**URL:** /sr-22-insurance-calculator
**Meta title:** "SR-22 Insurance Cost Estimator | Zeember"
**Meta description:** "Estimate how much SR-22 insurance will cost after a DUI, reckless driving, or license suspension."

---

### 7.20 Gap Insurance Calculator (app/(calculators)/gap-insurance-calculator/page.tsx)

**URL:** /gap-insurance-calculator
**Meta title:** "Gap Insurance Calculator — Do You Need It? | Zeember"
**Meta description:** "Find out if you need gap insurance and how much it costs. Calculate your coverage gap instantly."

---

### 7.21 Home Insurance Coverage Calculator (app/(calculators)/home-insurance-coverage-calculator/page.tsx)

**URL:** /home-insurance-coverage-calculator
**Meta title:** "Home Insurance Coverage Calculator — How Much Do You Need? | Zeember"
**Meta description:** "Calculate your home's rebuild cost and how much dwelling coverage you actually need. Not the same as market value."

---

### 7.22 Flood Insurance Cost Estimator (app/(calculators)/flood-insurance-calculator/page.tsx)

**URL:** /flood-insurance-calculator
**Meta title:** "Flood Insurance Cost Estimator | Zeember"
**Meta description:** "Estimate NFIP or private flood insurance costs based on your property's flood zone and coverage needs."

---

### 7.23 Personal Property Value Calculator (app/(calculators)/personal-property-calculator/page.tsx)

**URL:** /personal-property-calculator
**Meta title:** "Personal Property Value Calculator for Insurance | Zeember"
**Meta description:** "Calculate the replacement value of your personal belongings for renters or homeowners insurance."

---

### 7.24 Insurance Cost Comparison Tool (app/(calculators)/insurance-cost-comparison/page.tsx)

**URL:** /insurance-cost-comparison
**Meta title:** "Insurance Cost Comparison Tool | Zeember"
**Meta description:** "Compare insurance costs across multiple coverage scenarios side by side."

---

### 7.25 Bundling Discount Calculator (app/(calculators)/bundling-discount-calculator/page.tsx)

**URL:** /bundling-discount-calculator
**Meta title:** "Home and Auto Insurance Bundling Discount Calculator | Zeember"
**Meta description:** "Calculate how much you save by bundling home and auto insurance. Compare bundled vs separate policies."

---

### 7.26 Liability Coverage Calculator (app/(calculators)/liability-coverage-calculator/page.tsx)

**URL:** /liability-coverage-calculator
**Meta title:** "Personal Liability Coverage Calculator | Zeember"
**Meta description:** "Calculate how much liability coverage you need based on your net worth and risk exposure."

---

### 7.27 Disability Insurance Calculator (app/(calculators)/disability-insurance-calculator/page.tsx)

**URL:** /disability-insurance-calculator
**Meta title:** "Disability Insurance Calculator — How Much Do You Need? | Zeember"
**Meta description:** "Calculate how much disability insurance income replacement you need to protect your lifestyle."

---

### 7.28 Travel Insurance Cost Estimator (app/(calculators)/travel-insurance-calculator/page.tsx)

**URL:** /travel-insurance-calculator
**Meta title:** "Travel Insurance Cost Estimator | Zeember"
**Meta description:** "Estimate travel insurance costs for your trip based on duration, destination, and coverage level."

---

### 7.29 Insurance Score Impact Estimator (app/(calculators)/insurance-score-calculator/page.tsx)

**URL:** /insurance-score-calculator
**Meta title:** "Insurance Score Impact Estimator | Zeember"
**Meta description:** "Estimate how your credit score and financial history affect your insurance premiums."

---

### 7.30 Insurance Premium Estimator by State (app/(calculators)/insurance-premium-by-state/page.tsx)

**URL:** /insurance-premium-by-state
**Meta title:** "Insurance Premium Estimator by State — All Types | Zeember"
**Meta description:** "Compare insurance premiums across all 50 states for auto, home, life, and renters insurance."

---

### 7.31 Insurer Comparison Page (app/compare/page.tsx)

**URL:** /compare
**Meta title:** "Compare Insurance Companies Side by Side | Zeember"
**Meta description:** "Compare GEICO, Progressive, State Farm, Allstate, Liberty Mutual, Nationwide, Farmers, and USAA. Honest data, no sponsorships."

**Page structure:**
1. H1: "Compare insurance companies" (Source Serif 4)
2. Subtext: "Data sourced from NAIC complaint reports and J.D. Power surveys. No company pays to be listed."
3. Filter controls: insurance type dropdown (auto, home, life, renters, all)
4. InsurerComparisonTable — all 8 insurers, sortable
5. USAA eligibility note prominently displayed
6. Link to individual review pages

**Table columns:** Company | Price tier | NAIC complaint index | J.D. Power auto | J.D. Power home | Best for | View review

---

### 7.32 Individual Insurer Review Pages (app/reviews/[insurer]/page.tsx)

**URL pattern:** /reviews/geico, /reviews/progressive, etc.
**generateStaticParams:** all 8 insurer IDs from insurer-profiles.json

**Page structure:**
1. H1: "[Company Name] Insurance Review" (Source Serif 4)
2. Quick facts card: price tier, NAIC index, AM Best rating, coverage types
3. "Who it's best for" — styled tag list
4. Pros section — green checkmark list
5. Cons section — amber warning list
6. Detailed review paragraph (use summary from insurer-profiles.json, expand to 200-300 words)
7. NAIC data citation
8. "Compare all insurers →" link back to /compare
9. Related calculator links

---

### 7.33 Interactive State Map Hub (app/state-map/page.tsx)

**URL:** /state-map
**Meta title:** "Insurance Costs by State — Interactive Map | Zeember"
**Meta description:** "Click any state to see average insurance costs. Compare auto, home, life, and renters rates across all 50 states."

**USStateMap component (/components/map/USStateMap.tsx):**
```typescript
// react-simple-maps + us-atlas + topojson-client
// Props: insuranceType ("auto" | "home" | "renters" | "life")
// Color scale: light primary-light to dark primary (#0F3D2E) — darker = more expensive
// Use d3-scale scaleQuantile for color mapping across state values
// Hover tooltip: state name + average rate (Framer Motion fade-in, no fixed positioning)
// Click: navigate to /[insuranceType]-insurance/[state-slug]
// Tabs above map: Auto | Home | Renters | Life — switching tab re-colors map
// Alaska and Hawaii: shown as insets in bottom-left corner
// Legend: 5 color stops from cheapest to most expensive
// Mobile: full-width, touch/tap to navigate
```

---

### 7.34 State Detail Pages (app/(map)/[insuranceType]-insurance/[state]/page.tsx)

**URL pattern:** /auto-insurance/ohio, /home-insurance/california, etc.
**generateStaticParams:** 50 states × 4 types = 200 pages

```typescript
// Read from state-averages.json for all data
// Page structure:
// 1. H1: "Auto Insurance in [State] — Average Cost 2026" (use state name, title case)
// 2. Three stat cards: Average annual / Average monthly / Rank vs other states
// 3. Comparison: above or below national average (show % difference)
// 4. Mini auto insurance calculator pre-filled with this state selected
// 5. "How [State] compares to neighbors" — table showing 3-5 neighboring states
// 6. State-specific insurance facts (1-2 paragraphs — generate accurate content per state)
//    For auto: state minimum coverage requirements
//    For home: disaster risks (hurricane, earthquake, tornado zones)
//    For renters: average rent and renter demographics
// 7. "See all states →" link back to state map
// 8. Link to full calculator

// generateMetadata per page:
// title: "Car Insurance Cost in [State] (2026) | Zeember"
// description: "Average car insurance in [State] costs $X/year. See how [State] ranks and what drives local rates."
// Unique description and title for EVERY page — no duplicates
```

---

### 7.35 Life Event Hub Pages (app/(life-events)/[event]/page.tsx)

**URL pattern:** /life-events/just-got-married, etc.
**All 8 pages:** just-got-married, bought-a-home, had-a-baby, bought-a-car, turned-65, moved-states, adopted-a-pet, started-a-side-business

**Page structure:**
1. Hero: light green background, H1 "Your insurance checklist after [event]", subtitle
2. Intro paragraph: 150-word explanation of what changes insurance-wise with this life event
3. Grid of 2-4 relevant calculators (linked, with descriptions)
4. "What you might be overpaying for" — 1-2 coverage types to review
5. Quick FAQ: 3 questions specific to this life event
6. Related blog posts (2-3 links)

---

### 7.36 Decision Quiz Pages (app/quizzes/[quiz]/page.tsx)

**All 4 quizzes:**
- /quizzes/do-i-need-umbrella-insurance
- /quizzes/is-pet-insurance-worth-it
- /quizzes/should-i-bundle-home-and-auto
- /quizzes/do-i-need-gap-insurance

**Quiz component (/components/quizzes/DecisionQuiz.tsx):**
```typescript
// Multi-step form — one question per screen
// Progress bar showing completion
// Each question has 2-4 answer options as large clickable cards (not radio buttons)
// Final screen: recommendation card (yes/no/maybe) with plain-English explanation
// Recommendation links to relevant calculator
// "Start over" button
// No form submission — all logic in JavaScript, no data sent anywhere
// Disclaimer component (type="quiz") shown on first and last screen

// Umbrella quiz questions (6 questions):
// 1. What is your total net worth? (under $100k / $100k-$500k / $500k-$1M / over $1M)
// 2. Do you own property? (Yes / No)
// 3. Do you have a swimming pool, trampoline, or dog? (Yes / No)
// 4. Do you have teenage drivers in your household? (Yes / No)
// 5. Do you host gatherings at your home? (Yes, regularly / Occasionally / Rarely)
// 6. Do you have significant savings or investments? (Yes / No)
// Logic: 4+ "risk" answers → strongly recommend. 2-3 → maybe. 0-1 → probably not needed.
```

---

### 7.37 Glossary Hub (app/glossary/page.tsx) and Term Pages (app/glossary/[term]/page.tsx)

**URLs:** /glossary (hub), /glossary/deductible, /glossary/premium, etc.
**All terms from glossary-terms.json — all 25 terms**

**Hub page:**
- H1: "Insurance glossary — plain English" (Source Serif 4)
- Alphabet navigation (A-Z links)
- Grid of all terms as cards: term name, short definition, link to full page

**Term page:**
- H1: term name
- Short definition (large, Source Serif 4)
- Full definition paragraph(s)
- Practical example (formatted distinctly — light grey background card)
- Related terms links
- Related calculator CTA

---

### 7.38 Rate Trends Page (app/trends/page.tsx)

**URL:** /trends
**Meta title:** "Insurance Premium Trends 2021-2026 | Zeember"
**Meta description:** "See how insurance premiums have changed over 5 years nationally and by state. NAIC and III data."

**Page structure:**
1. H1: "Insurance premium trends" (Source Serif 4)
2. Tremor AreaChart: national auto, home, renters premiums 2021-2026 on one chart
3. Tabs: Auto / Home / Renters — each shows national + state lines
4. State selector: add/remove state lines from the chart
5. Data source citation
6. Key observations: 3-4 bullet points on notable trends

---

### 7.39 Blog Hub (app/blog/page.tsx)

**URL:** /blog
**Meta title:** "Insurance Guides and Articles | Zeember"
**Meta description:** "Plain-English insurance guides covering auto, life, home, health, and more."

---

### 7.40 Blog Post Pages (app/blog/[slug]/page.tsx)

**All 20 blog posts in /content/blog/ as MDX files:**

1. `how-auto-insurance-rates-are-calculated.mdx`
   Title: "How Auto Insurance Rates Are Calculated"
   Target keyword: "how auto insurance rates calculated"
   ~600 words. Explain the 6 key factors: state, age, vehicle, coverage, record, mileage.

2. `term-vs-whole-life-insurance.mdx`
   Title: "Term vs Whole Life Insurance: Which Is Right for You?"
   Target keyword: "term vs whole life insurance"

3. `average-car-insurance-cost-by-state.mdx`
   Title: "Average Car Insurance Cost by State (2026)"
   Target keyword: "car insurance cost by state"

4. `dime-method-life-insurance.mdx`
   Title: "The DIME Method: How to Calculate Life Insurance Needs"
   Target keyword: "dime method life insurance"

5. `does-credit-score-affect-car-insurance.mdx`
   Title: "Does Your Credit Score Affect Car Insurance?"
   Target keyword: "credit score affect car insurance"

6. `is-renters-insurance-worth-it.mdx`
   Title: "Renters Insurance: Is It Actually Worth It?"
   Target keyword: "is renters insurance worth it"

7. `how-to-lower-car-insurance-premium.mdx`
   Title: "How to Lower Your Car Insurance Premium (7 Proven Ways)"
   Target keyword: "lower car insurance premium"

8. `what-is-insurance-deductible.mdx`
   Title: "What Is a Deductible? And How Should You Choose One?"
   Target keyword: "what is insurance deductible"

9. `full-coverage-vs-liability-insurance.mdx`
   Title: "Full Coverage vs Liability Insurance: What's the Real Difference?"
   Target keyword: "full coverage vs liability insurance"

10. `how-much-home-insurance-coverage.mdx`
    Title: "How Much Home Insurance Coverage Do You Actually Need?"
    Target keyword: "how much home insurance coverage"

11. `umbrella-insurance-explained.mdx`
    Title: "Umbrella Insurance Explained: Do You Need It?"
    Target keyword: "umbrella insurance explained"

12. `hsa-vs-fsa.mdx`
    Title: "HSA vs FSA: Which Health Account Is Right for You?"
    Target keyword: "hsa vs fsa"

13. `bundling-home-auto-insurance.mdx`
    Title: "How Bundling Home and Auto Insurance Saves Money"
    Target keyword: "bundling home and auto insurance"

14. `is-pet-insurance-worth-it.mdx`
    Title: "Is Pet Insurance Worth It? A Vet Bill Reality Check"
    Target keyword: "is pet insurance worth it"

15. `what-affects-life-insurance-premium.mdx`
    Title: "What Affects Your Life Insurance Premium?"
    Target keyword: "what affects life insurance premium"

16. `gap-insurance-explained.mdx`
    Title: "Gap Insurance Explained: When Do You Need It?"
    Target keyword: "gap insurance explained"

17. `teen-driver-insurance-cost.mdx`
    Title: "How Much Does Adding a Teen Driver Increase Your Insurance?"
    Target keyword: "teen driver insurance cost"

18. `aca-health-insurance-subsidy.mdx`
    Title: "Understanding Your ACA Health Insurance Subsidy"
    Target keyword: "aca health insurance subsidy"

19. `sr-22-insurance-cost.mdx`
    Title: "SR-22 Insurance: What It Is and What It Really Costs"
    Target keyword: "sr-22 insurance cost"

20. `flood-insurance-cost.mdx`
    Title: "Flood Insurance: What It Covers and What It Costs"
    Target keyword: "flood insurance cost"

**MDX blog post format:**
```mdx
---
title: "Article title"
date: "2026-01-15"
category: "auto" | "life" | "home" | "health" | "general"
readTime: "5 min read"
excerpt: "150-character excerpt for blog cards"
targetKeyword: "primary keyword"
relatedCalculator: "/calculator-url"
---

## Introduction
[1 paragraph opening — state the key question the article answers]

## [Main section 1]
[Content ~150 words]

## [Main section 2]
[Content ~150 words]

## [Main section 3]
[Content ~150 words]

## The bottom line
[1 paragraph conclusion with clear takeaway]

[CTA: "Use the [relevant calculator] to calculate your specific costs →"]
```

---

### 7.41 Static Pages

**About (/app/about/page.tsx)**
- H1: "About Zeember"
- Mission statement
- Methodology explanation: what data sources we use (NAIC, III, J.D. Power)
- How calculators work: state averages + risk multipliers
- Disclaimer that estimates are educational, not personalized quotes
- "No personal information is ever collected" statement

**Privacy Policy (/app/privacy/page.tsx)**
- Standard privacy policy
- What we collect: AdSense cookies only
- We do not collect: personal information, calculator inputs, IP addresses tied to calculations
- Third parties: Google AdSense
- Contact email

**Disclaimer (/app/disclaimer/page.tsx)**
- Zeember is not a licensed insurance agent or broker
- All estimates are for informational purposes only
- Actual rates require personalized quotes from licensed agents
- Data sources cited

**Methodology (/app/methodology/page.tsx)**
- Detailed explanation of how each calculator's formula works
- Data sources: NAIC 2025 Auto Insurance Database Report, III, J.D. Power
- Update frequency: quarterly
- Limitations and caveats

**Contact (/app/contact/page.tsx)**
- Simple contact form or just email address
- Note: not a licensed insurance agent, cannot provide quotes

---

## 8. SEO REQUIREMENTS — EVERY PAGE

```typescript
// generateMetadata must be implemented on EVERY page
// Required for every page:
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: '...',           // Unique per page, include "| Zeember" at end
    description: '...',    // 150-160 chars, include primary keyword
    openGraph: {
      title: '...',
      description: '...',
      url: `https://zeember.com/${path}`,
      siteName: 'Zeember',
      type: 'website',
    },
    alternates: {
      canonical: `https://zeember.com/${path}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

// JSON-LD Schema — required on these page types:
// Calculator pages: HowTo schema with the calculator steps
// FAQ sections: FAQPage schema (rendered inline by FAQAccordion component)
// Blog posts: Article schema with author, datePublished, dateModified
// Glossary terms: DefinedTerm schema
// Homepage: WebSite + Organization schema
// State pages: no special schema needed beyond base metadata

// Sitemap (/app/sitemap.ts):
// Must include ALL pages:
// - All calculator pages
// - All state detail pages (200 total)
// - All life event pages
// - All quiz pages
// - All insurer review pages
// - All glossary pages
// - All blog posts
// - All static pages
// - Priority: homepage 1.0, calculators 0.9, state pages 0.7, blog 0.6
// - lastModified: use current date for static content

// robots.txt (/app/robots.ts):
// Allow all
// Sitemap: https://zeember.com/sitemap.xml
```

---

## 9. ADSENSE INTEGRATION

```typescript
// /app/layout.tsx — AdSense script (only in production)
// {process.env.NODE_ENV === 'production' && (
//   <Script
//     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
//     strategy="lazyOnload"
//     crossOrigin="anonymous"
//   />
// )}

// AdUnit component placement rules:
// Leaderboard: between page H1 and the calculator form (below hero, above form)
// Rectangle: beside or below the results panel (after calculation complete)
// Sidebar: right sidebar on blog post pages (300x600, sticky)
// Maximum 3 AdUnit components per page — enforce this in code

// In development: show grey placeholder with text "Ad — [format] — [slot]"
// Never show ads on: privacy policy, disclaimer, about, methodology, contact pages
```

---

## 10. BUILD ORDER — FOLLOW THIS EXACTLY

```
Step 1:  Project setup — Next.js 14, TypeScript, Tailwind, all dependencies
Step 2:  tailwind.config.ts — brand colors, font variables
Step 3:  globals.css — base styles, font variables
Step 4:  Data files — state-averages.json, insurer-profiles.json, rate-trends-5yr.json, glossary-terms.json
Step 5:  Shared layout — Header, Footer, AdUnit, Disclaimer components
Step 6:  Reusable calculator components — CalculatorForm, ResultsPanel, CostBreakdownChart, StateSelector, ToolPageWrapper, FAQAccordion, RelatedCalculators
Step 7:  Calculator logic files — /lib/calculators/auto.ts, life.ts, home.ts, renters.ts, health.ts, and others
Step 8:  Homepage
Step 9:  Auto Insurance Calculator (full implementation as the master template)
Step 10: All remaining 29 calculators (follow the auto calculator pattern exactly)
Step 11: Insurer Comparison page + 8 insurer review pages
Step 12: State Map component + State Map hub page
Step 13: All 200 state detail pages (using generateStaticParams)
Step 14: All 8 Life Event hub pages
Step 15: All 4 Decision Quiz pages
Step 16: Glossary hub + all 25 glossary term pages
Step 17: Rate Trends page
Step 18: Blog hub + all 20 blog post MDX files
Step 19: All static pages (About, Privacy, Disclaimer, Methodology, Contact)
Step 20: Sitemap, robots.txt, OpenGraph images
Step 21: Full Playwright test suite
Step 22: Lighthouse audit — fix any score below 85
```

---

## 11. PLAYWRIGHT TESTING

```typescript
// After building each major section, run Playwright tests automatically
// Fix all failures before proceeding to the next section
// Test file: /tests/zeember.spec.ts

// Required tests:
// 1. Homepage loads and hero text is visible
// 2. Auto insurance calculator: fill all fields, click Calculate, verify result appears with a number
// 3. Life insurance calculator: fill DIME fields, verify coverage gap shows
// 4. State map: verify it loads and clicking Ohio navigates to /auto-insurance/ohio
// 5. Insurer comparison: table loads with 8 rows
// 6. Quiz: complete umbrella quiz, verify recommendation appears
// 7. Glossary: deductible page loads with full definition
// 8. Blog: first post loads with content
// 9. All calculator pages: verify Disclaimer component is present
// 10. Sitemap: /sitemap.xml returns XML with > 200 URLs

// Accessibility tests:
// 11. All pages pass basic axe-core accessibility scan
// 12. All images have alt text
// 13. All interactive elements are keyboard navigable

// Run with: npx playwright test
// Fix all failures before deployment
```

---

## 12. DEPLOYMENT

```bash
# Connect GitHub repo to Vercel
# Set environment variables in Vercel dashboard:
NEXT_PUBLIC_SITE_URL=https://zeember.com
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXX  # placeholder until AdSense approved
NODE_ENV=production

# Vercel will auto-detect Next.js and configure correctly
# Domain: point zeember.com DNS to Vercel via Cloudflare
# After deployment: submit sitemap to Google Search Console
```

---

## 13. WHAT NOT TO DO

- Do NOT add any features not listed in this document
- Do NOT use Pages Router — App Router only
- Do NOT use any CSS framework other than Tailwind
- Do NOT add any npm packages not listed in Section 2
- Do NOT create user accounts, authentication, or login
- Do NOT store any user data anywhere
- Do NOT use external APIs for calculations — all math is client-side
- Do NOT skip the Disclaimer component on calculator or quiz pages
- Do NOT put more than 3 AdUnit components on any page
- Do NOT use generic placeholder text — write real content everywhere
- Do NOT skip the Playwright tests
- Do NOT deploy until Lighthouse scores are above 85 on all pages
- Do NOT invent calculator formulas — use the ones specified in this document
- Do NOT generate meta titles/descriptions that are duplicates of other pages
- Do NOT use inline styles — use Tailwind classes
- Do NOT leave any TODO comments in the code
