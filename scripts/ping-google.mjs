/**
 * Submits all Zeember URLs to Google via the Indexing API.
 *
 * Setup (one-time):
 * 1. Go to https://console.cloud.google.com → create/select a project
 * 2. Enable "Web Search Indexing API"
 * 3. Create a Service Account → download JSON key → save as scripts/service-account.json
 * 4. In Google Search Console → Settings → Users and permissions
 *    → Add the service account email as an OWNER
 * 5. npm install googleapis (already added below)
 *
 * Run: node scripts/ping-google.mjs
 * Quota: 200 URLs/day on the free tier. Script auto-batches with delay.
 */

import { google } from 'googleapis'
import { readFileSync } from 'fs'
import { createInterface } from 'readline'

const KEY_PATH = new URL('./service-account.json', import.meta.url)
const BATCH_SIZE = 200          // Google's daily free quota
const DELAY_MS   = 500          // ms between requests to avoid rate-limit errors

// ── All Zeember URLs ────────────────────────────────────────────────────────

const BASE = 'https://zeember.com'

const CALCULATORS = [
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

const INSURERS = [
  'geico','progressive','state-farm','allstate',
  'liberty-mutual','nationwide','farmers','usaa',
]

const STATES = [
  'alabama','alaska','arizona','arkansas','california','colorado','connecticut',
  'delaware','florida','georgia','hawaii','idaho','illinois','indiana','iowa',
  'kansas','kentucky','louisiana','maine','maryland','massachusetts','michigan',
  'minnesota','mississippi','missouri','montana','nebraska','nevada',
  'new-hampshire','new-jersey','new-mexico','new-york','north-carolina',
  'north-dakota','ohio','oklahoma','oregon','pennsylvania','rhode-island',
  'south-carolina','south-dakota','tennessee','texas','utah','vermont',
  'virginia','washington','west-virginia','wisconsin','wyoming',
  'district-of-columbia',
]

const INSURANCE_TYPES = ['auto-insurance','home-insurance','renters-insurance','life-insurance']

const LIFE_EVENTS = [
  'just-got-married','bought-a-home','had-a-baby','bought-a-car',
  'turned-65','moved-states','adopted-a-pet','started-a-side-business',
]

const QUIZZES = [
  'do-i-need-umbrella-insurance','is-pet-insurance-worth-it',
  'should-i-bundle-home-and-auto','do-i-need-gap-insurance',
]

const GLOSSARY_TERMS = [
  'deductible','premium','coverage-limit','liability-insurance','full-coverage',
  'collision-coverage','comprehensive-coverage','underwriting','subrogation',
  'actuarial','naic-complaint-index','dime-method','term-life-insurance',
  'whole-life-insurance','replacement-cost-value','actual-cash-value',
  'personal-liability-coverage','umbrella-insurance','health-insurance-deductible',
  'out-of-pocket-maximum','hsa','aca-subsidy','gap-insurance','sr-22',
  'cobra-insurance',
]

const BLOG_SLUGS = [
  'how-auto-insurance-rates-are-calculated',
  'term-vs-whole-life-insurance',
  'average-car-insurance-cost-by-state',
  'dime-method-life-insurance',
  'does-credit-score-affect-car-insurance',
  'is-renters-insurance-worth-it',
  'how-to-lower-car-insurance-premium',
  'what-is-insurance-deductible',
  'full-coverage-vs-liability-insurance',
  'how-much-home-insurance-coverage',
  'umbrella-insurance-explained',
  'hsa-vs-fsa',
  'bundling-home-auto-insurance',
  'is-pet-insurance-worth-it',
  'what-affects-life-insurance-premium',
  'gap-insurance-explained',
  'teen-driver-insurance-cost',
  'aca-health-insurance-subsidy',
  'sr-22-insurance-cost',
  'flood-insurance-cost',
]

function buildUrlList() {
  const urls = [BASE]

  CALCULATORS.forEach(p => urls.push(`${BASE}${p}`))
  urls.push(`${BASE}/compare`)
  INSURERS.forEach(id => urls.push(`${BASE}/reviews/${id}`))
  urls.push(`${BASE}/state-map`)
  STATES.forEach(s => INSURANCE_TYPES.forEach(t => urls.push(`${BASE}/${t}/${s}`)))
  LIFE_EVENTS.forEach(e => urls.push(`${BASE}/life-events/${e}`))
  QUIZZES.forEach(q => urls.push(`${BASE}/quizzes/${q}`))
  urls.push(`${BASE}/glossary`)
  GLOSSARY_TERMS.forEach(t => urls.push(`${BASE}/glossary/${t}`))
  urls.push(`${BASE}/trends`)
  urls.push(`${BASE}/blog`)
  BLOG_SLUGS.forEach(s => urls.push(`${BASE}/blog/${s}`))
  urls.push(`${BASE}/about`, `${BASE}/methodology`)

  return urls
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

function prompt(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans) }))
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Load service account
  let key
  try {
    key = JSON.parse(readFileSync(KEY_PATH, 'utf8'))
  } catch {
    console.error('\n❌  scripts/service-account.json not found.')
    console.error('    Download your service account JSON from Google Cloud Console')
    console.error('    and save it as scripts/service-account.json\n')
    process.exit(1)
  }

  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  })

  const indexing = google.indexing({ version: 'v3', auth })

  const allUrls = buildUrlList()
  const batch = allUrls.slice(0, BATCH_SIZE)

  console.log(`\n🔍  Total URLs: ${allUrls.length}`)
  console.log(`📤  Submitting first ${batch.length} (daily quota: ${BATCH_SIZE})\n`)

  if (allUrls.length > BATCH_SIZE) {
    console.log(`⚠️   Remaining ${allUrls.length - BATCH_SIZE} URLs will need a second run tomorrow.\n`)
  }

  const ans = await prompt(`Proceed? (y/N) `)
  if (ans.toLowerCase() !== 'y') { console.log('Aborted.'); process.exit(0) }

  let ok = 0, fail = 0

  for (const url of batch) {
    try {
      await indexing.urlNotifications.publish({
        requestBody: { url, type: 'URL_UPDATED' },
      })
      console.log(`✅  ${url}`)
      ok++
    } catch (err) {
      console.log(`❌  ${url}  →  ${err.message}`)
      fail++
    }
    await sleep(DELAY_MS)
  }

  console.log(`\n📊  Done — ${ok} submitted, ${fail} failed`)
  if (allUrls.length > BATCH_SIZE) {
    console.log(`    Run again tomorrow for the remaining ${allUrls.length - BATCH_SIZE} URLs.`)
  }
}

main()
