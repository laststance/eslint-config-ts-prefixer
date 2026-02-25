// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Header functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3007')
  })

  test('should display fixed header with logo, GitHub link, and theme toggle', async ({
    page,
  }) => {
    // Check if header is visible and fixed
    const header = page.locator('header')
    await expect(header).toBeVisible()
    await expect(header).toHaveClass(/fixed/)

    // Check logo/title link
    const logoLink = page.locator('header a[href="/"]')
    await expect(logoLink).toBeVisible()
    await expect(logoLink).toContainText('eslint-config-ts-prefixer')

    // Check GitHub link
    const githubLink = page.locator(
      'header a[href="https://github.com/laststance/eslint-config-ts-prefixer"]',
    )
    await expect(githubLink).toBeVisible()
    await expect(githubLink).toHaveAttribute('target', '_blank')

    // Check theme toggle button
    const themeToggle = page.locator('header button:has(svg)')
    await expect(themeToggle).toBeVisible()
  })

  test('should have glass effect styling on header', async ({ page }) => {
    const header = page.locator('header')

    // Check for backdrop blur and opacity classes
    await expect(header).toHaveClass(/backdrop-blur/)
    await expect(header).toHaveClass(/bg-background\/80/)

    // Check for border radius on bottom corners
    await expect(header).toHaveClass(/rounded-bl-lg/)
    await expect(header).toHaveClass(/rounded-br-lg/)
  })

  test('should toggle theme when clicking theme toggle button', async ({
    page,
  }) => {
    const themeToggle = page.locator('header button:has(svg)')

    // Get initial theme state (assume light mode by default)
    const htmlElement = page.locator('html')

    // Click theme toggle
    await themeToggle.click()

    // Wait for theme change
    await page.waitForTimeout(500)

    // Check if theme changed (dark class should be added/removed)
    const hasThemeClass = await htmlElement.evaluate((el) => {
      return (
        el.classList.contains('dark') || el.getAttribute('data-theme') !== null
      )
    })

    expect(hasThemeClass).toBeTruthy()
  })

  test('should have proper spacing and layout with header', async ({
    page,
  }) => {
    // Check that main content has proper top padding to account for fixed header
    const mainLayout = page.locator('div:has(> header) > div')
    await expect(mainLayout).toHaveClass(/pt-16/)

    // Check that sidebar is positioned correctly below header
    const sidebar = page.locator('aside')
    await expect(sidebar).toHaveClass(/md:top-16/)
    await expect(sidebar).toHaveClass(/md:h-\[calc\(100vh-4rem\)\]/)
  })

  test('GitHub link should open in new tab', async ({ page, context }) => {
    const githubLink = page.locator(
      'header a[href="https://github.com/laststance/eslint-config-ts-prefixer"]',
    )

    // Listen for new page events
    const pagePromise = context.waitForEvent('page')

    // Click the GitHub link
    await githubLink.click()

    // Wait for the new page to open
    const newPage = await pagePromise

    // Verify the new page URL
    await expect(newPage).toHaveURL(
      'https://github.com/laststance/eslint-config-ts-prefixer',
    )

    // Close the new page
    await newPage.close()
  })

  test('logo link should navigate to home page', async ({ page }) => {
    const logoLink = page.locator('header a[href="/"]')

    // Click the logo link
    await logoLink.click()

    // Verify we're still on the home page
    await expect(page).toHaveURL('http://localhost:3007/')
  })
})

test.describe('Suggestion badge removal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3007')
  })

  test('should not display suggestion badges in rule cards', async ({
    page,
  }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Check that no "suggestion" badges are visible
    const suggestionBadges = page.locator(
      '.badge:has-text("suggestion"), [class*="badge"]:has-text("suggestion")',
    )
    await expect(suggestionBadges).toHaveCount(0)

    // Verify that other badges are still visible (like "Built-in")
    const builtInBadges = page.locator(
      '.badge:has-text("Built-in"), [class*="badge"]:has-text("Built-in")',
    )
    await expect(builtInBadges.first()).toBeVisible()
  })

  test('should display only non-suggestion rule type badges', async ({
    page,
  }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Get all badge elements
    const badges = page.locator('[class*="badge"]')
    const badgeCount = await badges.count()

    // Check each badge to ensure none contain "suggestion"
    for (let i = 0; i < badgeCount; i++) {
      const badgeText = await badges.nth(i).textContent()
      expect(badgeText).not.toContain('suggestion')
    }
  })
})
