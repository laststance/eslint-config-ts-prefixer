// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Header functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3007')
  })

  test('header keeps logo, GitHub link and theme toggle pinned to the top while scrolling', async ({
    page,
  }) => {
    // Arrange
    const header = page.locator('header')
    const logoLink = page.locator('header a[href="/"]')
    const githubLink = page.locator(
      'header a[href="https://github.com/laststance/eslint-config-ts-prefixer"]',
    )
    const themeToggle = page.locator('header button:has(svg)')

    // Assert - everything is present before scrolling
    await expect(header).toBeVisible()
    await expect(logoLink).toContainText('eslint-config-ts-prefixer')
    await expect(githubLink).toHaveAttribute('target', '_blank')
    await expect(themeToggle).toBeVisible()

    // Act - scroll well past the hero
    await page.mouse.wheel(0, 2000)
    await page.waitForTimeout(300)

    // Assert - the bar is still flush against the top edge, contents intact
    const box = await header.boundingBox()
    expect(box.y).toBe(0)
    await expect(logoLink).toBeVisible()
    await expect(githubLink).toBeVisible()
    await expect(themeToggle).toBeVisible()
  })

  test('header renders as translucent glass with rounded bottom corners', async ({
    page,
  }) => {
    // Arrange
    const header = page.locator('header')

    // Act
    const style = await header.evaluate((el) => {
      const computed = getComputedStyle(el)
      return {
        backdropFilter: computed.backdropFilter,
        backgroundColor: computed.backgroundColor,
        bottomLeftRadius: computed.borderBottomLeftRadius,
        bottomRightRadius: computed.borderBottomRightRadius,
      }
    })

    // Assert - the sky photo has to show through, and the corners are not square
    expect(style.backdropFilter).toContain('blur')
    expect(style.backgroundColor).toMatch(/^rgba\(/)
    expect(style.bottomLeftRadius).not.toBe('0px')
    expect(style.bottomRightRadius).not.toBe('0px')
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

  test('sidebar sits below the header and stays put while the page scrolls', async ({
    page,
  }) => {
    // Arrange
    await page.setViewportSize({ width: 1440, height: 900 })
    const header = page.locator('header')
    const sidebar = page.locator('aside')
    const headerBox = await header.boundingBox()

    // Assert - sidebar starts under the header, never behind it
    const restingBox = await sidebar.boundingBox()
    expect(restingBox.y).toBeGreaterThanOrEqual(headerBox.height - 1)

    // Act - scroll deep into the rule list
    await page.mouse.wheel(0, 4000)
    await page.waitForTimeout(300)

    // Assert - the sidebar is still on screen at the same offset
    const scrolledBox = await sidebar.boundingBox()
    expect(Math.round(scrolledBox.y)).toBe(Math.round(restingBox.y))
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
      '[data-slot="badge"]:has-text("suggestion")',
    )
    await expect(suggestionBadges).toHaveCount(0)

    // Verify that other badges are still visible (like "Built-in")
    const builtInBadges = page.locator(
      '[data-slot="badge"]:has-text("Built-in")',
    )
    await expect(builtInBadges.first()).toBeVisible()
  })

  test('should display only non-suggestion rule type badges', async ({
    page,
  }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Get all badge elements
    const badges = page.locator('[data-slot="badge"]')
    const badgeCount = await badges.count()

    // Check each badge to ensure none contain "suggestion"
    for (let i = 0; i < badgeCount; i++) {
      const badgeText = await badges.nth(i).textContent()
      expect(badgeText).not.toContain('suggestion')
    }
  })
})
