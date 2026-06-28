/**
 * Submits all Zeember URLs to Bing (and IndexNow partners) via the IndexNow API.
 * No authentication needed — just the key file served at /a47f8d9a2611499aa45ce6cf78355551.txt
 *
 * Run: node scripts/indexnow.mjs
 * Limit: up to 10,000 URLs per request (all sent in one shot)
 */

const KEY  = 'a47f8d9a2611499aa45ce6cf78355551'
const HOST = 'zeember.com'
const BASE = `https://${HOST}`

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

const STATIC = ['/about', '/methodology', '/privacy', '/disclaimer', '/contact', '/trends', '/blog', '/glossary', '/state-map', '/compare']

function buildUrlList() {
  const urls = [BASE]

  CALCULATORS.forEach(p => urls.push(`${BASE}${p}`))
  INSURERS.forEach(id => urls.push(`${BASE}/reviews/${id}`))
  STATES.forEach(s => INSURANCE_TYPES.forEach(t => urls.push(`${BASE}/${t}/${s}`)))
  LIFE_EVENTS.forEach(e => urls.push(`${BASE}/life-events/${e}`))
  QUIZZES.forEach(q => urls.push(`${BASE}/quizzes/${q}`))
  GLOSSARY_TERMS.forEach(t => urls.push(`${BASE}/glossary/${t}`))
  BLOG_SLUGS.forEach(s => urls.push(`${BASE}/blog/${s}`))
  STATIC.forEach(p => urls.push(`${BASE}${p}`))

  return urls
}

async function main() {
  const urls = buildUrlList()
  console.log(`\n📋  Total URLs: ${urls.length}`)
  console.log(`🚀  Submitting to IndexNow (Bing + partners)...\n`)

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `${BASE}/${KEY}.txt`,
    urlList: urls,
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })

  if (res.ok || res.status === 202) {
    console.log(`✅  Accepted — HTTP ${res.status}`)
    console.log(`    ${urls.length} URLs submitted successfully.`)
  } else {
    const text = await res.text()
    console.log(`❌  HTTP ${res.status}: ${text}`)
  }

  // Also ping Bing directly
  console.log('\n🔄  Pinging Bing directly...')
  const bingRes = await fetch('https://www.bing.com/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })

  if (bingRes.ok || bingRes.status === 202) {
    console.log(`✅  Bing accepted — HTTP ${bingRes.status}`)
  } else {
    const text = await bingRes.text()
    console.log(`❌  Bing HTTP ${bingRes.status}: ${text}`)
  }

  console.log('\n📌  Note: Deploy public/a47f8d9a2611499aa45ce6cf78355551.txt first if not already live.')
  console.log(`    Verify at: ${BASE}/${KEY}.txt\n`)
}

main().catch(console.error)
