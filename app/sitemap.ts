import type { MetadataRoute } from 'next'
import stateAverages from '@/lib/data/state-averages.json'
import insurerData from '@/lib/data/insurer-profiles.json'
import glossaryData from '@/lib/data/glossary-terms.json'
import { getAllSlugs } from '@/lib/data/blog-posts'

const BASE_URL = 'https://zeember.com'
const NOW = new Date().toISOString()

function slugify(name: string) {
  return name.toLowerCase().replace(/ /g, '-').replace(/\./g, '')
}

const STATE_NAMES = Object.keys(stateAverages.states)
const INSURANCE_TYPES = ['auto-insurance', 'home-insurance', 'renters-insurance', 'life-insurance']

const CALCULATOR_PATHS = [
  '/auto-insurance-calculator',
  '/how-much-life-insurance-do-i-need',
  '/home-insurance-calculator',
  '/renters-insurance-calculator',
  '/health-insurance-deductible-calculator',
  '/hsa-contribution-calculator',
  '/out-of-pocket-max-estimator',
  '/cobra-cost-calculator',
  '/aca-subsidy-estimator',
  '/umbrella-insurance-calculator',
  '/pet-insurance-calculator',
  '/full-coverage-vs-liability-calculator',
  '/teen-driver-insurance-calculator',
  '/sr-22-insurance-calculator',
  '/gap-insurance-calculator',
  '/home-insurance-coverage-calculator',
  '/flood-insurance-calculator',
  '/personal-property-calculator',
  '/bundling-discount-calculator',
  '/liability-coverage-calculator',
  '/disability-insurance-calculator',
  '/travel-insurance-calculator',
  '/insurance-score-calculator',
  '/burial-insurance-calculator',
  '/term-vs-whole-life-insurance',
  '/life-insurance-by-age',
  '/car-insurance-cost-by-state',
  '/insurance-cost-comparison',
  '/insurance-premium-by-state',
]

const LIFE_EVENTS = [
  'just-got-married', 'bought-a-home', 'had-a-baby', 'bought-a-car',
  'turned-65', 'moved-states', 'adopted-a-pet', 'started-a-side-business',
]

const QUIZZES = [
  'do-i-need-umbrella-insurance', 'is-pet-insurance-worth-it',
  'should-i-bundle-home-and-auto', 'do-i-need-gap-insurance',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Homepage
  entries.push({ url: BASE_URL, lastModified: NOW, priority: 1.0, changeFrequency: 'weekly' })

  // Calculators
  CALCULATOR_PATHS.forEach(path => {
    entries.push({ url: `${BASE_URL}${path}`, lastModified: NOW, priority: 0.9, changeFrequency: 'monthly' })
  })

  // Compare + reviews
  entries.push({ url: `${BASE_URL}/compare`, lastModified: NOW, priority: 0.8, changeFrequency: 'monthly' })
  insurerData.insurers.forEach(ins => {
    entries.push({ url: `${BASE_URL}/reviews/${ins.id}`, lastModified: NOW, priority: 0.7, changeFrequency: 'monthly' })
  })

  // State map + state detail pages
  entries.push({ url: `${BASE_URL}/state-map`, lastModified: NOW, priority: 0.8, changeFrequency: 'monthly' })
  STATE_NAMES.forEach(name => {
    INSURANCE_TYPES.forEach(type => {
      entries.push({ url: `${BASE_URL}/${type}/${slugify(name)}`, lastModified: NOW, priority: 0.7, changeFrequency: 'monthly' })
    })
  })

  // Life events
  LIFE_EVENTS.forEach(event => {
    entries.push({ url: `${BASE_URL}/life-events/${event}`, lastModified: NOW, priority: 0.7, changeFrequency: 'monthly' })
  })

  // Quizzes
  QUIZZES.forEach(quiz => {
    entries.push({ url: `${BASE_URL}/quizzes/${quiz}`, lastModified: NOW, priority: 0.7, changeFrequency: 'monthly' })
  })

  // Glossary
  entries.push({ url: `${BASE_URL}/glossary`, lastModified: NOW, priority: 0.7, changeFrequency: 'monthly' })
  glossaryData.terms.forEach(term => {
    entries.push({ url: `${BASE_URL}/glossary/${term.slug}`, lastModified: NOW, priority: 0.6, changeFrequency: 'monthly' })
  })

  // Trends
  entries.push({ url: `${BASE_URL}/trends`, lastModified: NOW, priority: 0.7, changeFrequency: 'monthly' })

  // Blog
  entries.push({ url: `${BASE_URL}/blog`, lastModified: NOW, priority: 0.7, changeFrequency: 'weekly' })
  getAllSlugs().forEach(slug => {
    entries.push({ url: `${BASE_URL}/blog/${slug}`, lastModified: NOW, priority: 0.6, changeFrequency: 'monthly' })
  })

  // Static pages
  ;['/about', '/methodology'].forEach(path => {
    entries.push({ url: `${BASE_URL}${path}`, lastModified: NOW, priority: 0.4, changeFrequency: 'yearly' })
  })

  return entries
}
