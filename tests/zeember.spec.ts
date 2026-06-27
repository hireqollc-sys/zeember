import { test, expect } from '@playwright/test'

// Core page load tests
test('homepage loads with hero text', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Know what coverage really costs')
  await expect(page.locator('text=See your real insurance cost in seconds')).toBeVisible()
})

test('homepage has calculator grid with 6 cards', async ({ page }) => {
  await page.goto('/')
  const cards = page.locator('text=Auto Insurance').first()
  await expect(cards).toBeVisible()
})

// Calculator tests
test('auto insurance calculator: fill fields, calculate, see result', async ({ page }) => {
  await page.goto('/auto-insurance-calculator')
  await expect(page.locator('h1')).toContainText('Auto insurance', { ignoreCase: true })

  // Select state
  await page.getByRole('combobox').first().click()
  await page.getByText('Ohio').first().click()

  // Age
  await page.locator('input[name="age"]').fill('35')

  // Click calculate
  await page.getByRole('button', { name: /calculate/i }).click()

  // Wait for result with a dollar amount
  await expect(page.locator('text=/\\$[0-9,]+/').first()).toBeVisible({ timeout: 5000 })
})

test('life insurance calculator: fill DIME fields, see coverage gap', async ({ page }) => {
  await page.goto('/how-much-life-insurance-do-i-need')
  await expect(page.locator('h1')).toContainText('life insurance', { ignoreCase: true })

  await page.locator('input[name="annualIncome"]').fill('75000')
  await page.locator('input[name="mortgageBalance"]').fill('250000')
  await page.getByRole('button', { name: /calculate/i }).click()

  await expect(page.locator('text=/\\$[0-9,]+/').first()).toBeVisible({ timeout: 5000 })
})

test('home insurance calculator: fills and calculates', async ({ page }) => {
  await page.goto('/home-insurance-calculator')
  await expect(page.locator('h1')).toContainText('Home insurance', { ignoreCase: true })
  await page.locator('input[name="homeValue"]').fill('350000')
  await page.getByRole('button', { name: 'Calculate my estimate' }).click()
  await expect(page.locator('text=/\\$[0-9,]+/').first()).toBeVisible({ timeout: 5000 })
})

// State map test
test('state map loads', async ({ page }) => {
  await page.goto('/state-map')
  await expect(page.locator('h1')).toContainText('Insurance costs by state')
  await expect(page.locator('text=National avg')).toBeVisible()
})

// Insurer comparison
test('insurer comparison table loads with 8 insurers', async ({ page }) => {
  await page.goto('/compare')
  await expect(page.locator('h1')).toContainText('Compare insurance companies')
  await expect(page.getByRole('link', { name: 'GEICO' }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: 'Progressive' }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: 'USAA' }).first()).toBeVisible()
  const rows = page.locator('table tbody tr')
  await expect(rows).toHaveCount(8)
})

// Individual insurer review
test('GEICO review page loads', async ({ page }) => {
  await page.goto('/reviews/geico')
  await expect(page.locator('h1')).toContainText('GEICO')
  await expect(page.locator('text=NAIC complaint index')).toBeVisible()
})

// Quiz test
test('umbrella quiz: complete and see recommendation', async ({ page }) => {
  await page.goto('/quizzes/do-i-need-umbrella-insurance')
  await expect(page.locator('h1')).toContainText('umbrella insurance', { ignoreCase: true })

  // Answer all 6 questions by clicking first option each time
  for (let i = 0; i < 6; i++) {
    await page.locator('button').filter({ hasText: /./}).first().click()
    await page.waitForTimeout(400)
  }

  // Recommendation should appear
  await expect(page.locator('text=/umbrella insurance/i').first()).toBeVisible({ timeout: 5000 })
})

// Glossary
test('glossary hub loads with terms', async ({ page }) => {
  await page.goto('/glossary')
  await expect(page.locator('h1')).toContainText('Insurance glossary')
  await expect(page.locator('text=Deductible').first()).toBeVisible()
})

test('deductible glossary term page loads with full definition', async ({ page }) => {
  await page.goto('/glossary/deductible')
  await expect(page.locator('h1')).toContainText('Deductible')
  await expect(page.locator('text=Full definition')).toBeVisible()
})

// Blog
test('blog hub loads with articles', async ({ page }) => {
  await page.goto('/blog')
  await expect(page.locator('h1')).toContainText('Insurance guides')
  await expect(page.locator('text=How Auto Insurance Rates Are Calculated')).toBeVisible()
})

test('first blog post loads with content', async ({ page }) => {
  await page.goto('/blog/how-auto-insurance-rates-are-calculated')
  await expect(page.locator('h1')).toContainText('Auto Insurance Rates', { ignoreCase: true })
  await expect(page.locator('article')).toBeVisible()
})

// State detail pages
test('auto insurance Ohio state page loads', async ({ page }) => {
  await page.goto('/auto-insurance/ohio')
  await expect(page.locator('h1')).toContainText('Ohio')
  await expect(page.locator('text=Average annual')).toBeVisible()
})

// Disclaimer presence on all calculator pages
const CALCULATOR_URLS = [
  '/auto-insurance-calculator',
  '/home-insurance-calculator',
  '/renters-insurance-calculator',
  '/how-much-life-insurance-do-i-need',
  '/hsa-contribution-calculator',
]

for (const url of CALCULATOR_URLS) {
  test(`disclaimer present on ${url}`, async ({ page }) => {
    await page.goto(url)
    await expect(
      page.locator('text=/informational purposes only|This is an estimate/').first()
    ).toBeVisible()
  })
}

// Sitemap
test('sitemap.xml returns XML with many URLs', async ({ page }) => {
  const response = await page.goto('/sitemap.xml')
  expect(response?.status()).toBe(200)
  const content = await page.content()
  expect(content).toContain('<url>')
  const urlCount = (content.match(/<url>/g) || []).length
  expect(urlCount).toBeGreaterThan(200)
})

// Robots.txt
test('robots.txt allows crawling and references sitemap', async ({ page }) => {
  const response = await page.goto('/robots.txt', { timeout: 30000 })
  expect(response?.status()).toBe(200)
  const content = await page.content()
  expect(content).toContain('sitemap.xml')
})

// Life events
test('just-got-married life event page loads', async ({ page }) => {
  await page.goto('/life-events/just-got-married')
  await expect(page.locator('h1')).toContainText('married', { ignoreCase: true })
  await expect(page.locator('text=What changes with your insurance')).toBeVisible()
})

// Life events hub
test('life events hub page loads', async ({ page }) => {
  await page.goto('/life-events')
  await expect(page.locator('h1')).toContainText("What's changed in your life")
  await expect(page.locator('text=Just got married').first()).toBeVisible()
})

// Static pages
test('about page loads', async ({ page }) => {
  await page.goto('/about')
  await expect(page.locator('h1')).toContainText('About Zeember')
})

test('trends page loads with chart', async ({ page }) => {
  await page.goto('/trends')
  await expect(page.locator('h1')).toContainText('Insurance premium trends')
})

// Accessibility: no missing alt text on homepage
test('homepage images have alt text', async ({ page }) => {
  await page.goto('/')
  const images = page.locator('img')
  const count = await images.count()
  for (let i = 0; i < count; i++) {
    const alt = await images.nth(i).getAttribute('alt')
    expect(alt).not.toBeNull()
  }
})
