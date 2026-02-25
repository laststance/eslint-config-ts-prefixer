import { test, expect } from '@playwright/test'

test.describe('Heading Anchor Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3007')
  })

  test('should display anchor icon on heading hover', async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Find the first rule card title
    const firstRuleTitle = page.locator('.group').first()

    // Hover over the heading
    await firstRuleTitle.hover()

    // The anchor button should become visible
    const anchorButton = firstRuleTitle.locator(
      'button[aria-label*="Copy link"]',
    )
    await expect(anchorButton).toBeVisible()

    // The link icon should be present
    const linkIcon = anchorButton.locator('svg').first()
    await expect(linkIcon).toBeVisible()
  })

  test('should copy link to clipboard when anchor icon is clicked', async ({
    page,
    context,
  }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-write', 'clipboard-read'])

    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Find the first rule card title
    const firstRuleTitle = page.locator('.group').first()

    // Hover to make the button visible
    await firstRuleTitle.hover()

    // Click the anchor button
    const anchorButton = firstRuleTitle.locator(
      'button[aria-label*="Copy link"]',
    )
    await anchorButton.click()

    // Verify the button text changes to indicate success
    await expect(anchorButton).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Link copied'),
    )

    // Verify a check icon appears
    const checkIcon = anchorButton.locator('svg').first()
    await expect(checkIcon).toBeVisible()

    // Verify clipboard content
    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText(),
    )
    expect(clipboardText).toMatch(/http:\/\/localhost:3007\/#.+/)
  })

  test('should navigate to correct section when anchor link is used', async ({
    page,
  }) => {
    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Get the ID of the first rule card
    const firstCard = page.locator('[id^="eqeqeq"], [id^="typescript"]').first()
    const cardId = await firstCard.getAttribute('id')

    // Navigate to the anchor
    await page.goto(`http://localhost:3007/#${cardId}`)

    // Verify the element is in view
    await expect(firstCard).toBeInViewport()

    // Verify the URL contains the hash
    expect(page.url()).toContain(`#${cardId}`)
  })

  test('should be keyboard accessible', async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Tab to the first anchor button (may need multiple tabs depending on page structure)
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // The focused element should be an anchor button
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/Copy link|Link copied/),
    )

    // Press Enter to activate
    await page.keyboard.press('Enter')

    // Verify success feedback
    await expect(focusedElement).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Link copied'),
    )
  })

  test('should have proper ARIA labels for accessibility', async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Find all anchor buttons
    const anchorButtons = page.locator('button[aria-label*="Copy link"]')

    // Verify at least one exists
    await expect(anchorButtons.first()).toBeAttached()

    // Verify proper ARIA label
    const firstButton = anchorButtons.first()
    const ariaLabel = await firstButton.getAttribute('aria-label')
    expect(ariaLabel).toMatch(/Copy link|Link copied/)

    // Hover to make visible
    await firstButton.hover()

    // Click the button
    await firstButton.click()

    // Verify the ARIA label updates
    await expect(firstButton).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Link copied'),
    )
  })

  test('should apply glass design system styles', async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Find the first anchor button
    const firstRuleTitle = page.locator('.group').first()
    await firstRuleTitle.hover()

    const anchorButton = firstRuleTitle.locator(
      'button[aria-label*="Copy link"]',
    )

    // Verify glass classes are applied
    const className = await anchorButton.getAttribute('class')
    expect(className).toContain('glass-thin')
    expect(className).toContain('glass-border')
    expect(className).toContain('glass-tinted-blue')
    expect(className).toContain('glass-transition')
  })

  test('should hide anchor icons on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Find the first anchor button
    const firstRuleTitle = page.locator('.group').first()
    await firstRuleTitle.hover()

    const anchorButton = firstRuleTitle.locator(
      'button[aria-label*="Copy link"]',
    )

    // On mobile, the button should have 'hidden' or 'md:flex' classes
    const className = await anchorButton.getAttribute('class')
    expect(className).toContain('hidden')
    expect(className).toContain('md:flex')

    // The button should not be visible on mobile
    await expect(anchorButton).not.toBeVisible()
  })

  test('should show anchor icons on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 })

    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Find the first rule card title
    const firstRuleTitle = page.locator('.group').first()

    // Hover over the heading
    await firstRuleTitle.hover()

    // The anchor button should be visible on desktop
    const anchorButton = firstRuleTitle.locator(
      'button[aria-label*="Copy link"]',
    )
    await expect(anchorButton).toBeVisible()
  })

  test('should work with markdown headings inside rule cards', async ({
    page,
  }) => {
    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Find a markdown heading (h2, h3) inside a rule card
    const markdownHeading = page
      .locator('.markdown-content h2, .markdown-content h3')
      .first()

    // Verify it has the group class for hover
    await expect(markdownHeading).toHaveClass(/group/)

    // Hover over the markdown heading
    await markdownHeading.hover()

    // The anchor button should appear
    const anchorButton = markdownHeading.locator(
      'button[aria-label*="Copy link"]',
    )
    await expect(anchorButton).toBeVisible()
  })

  test('should reset copied state after timeout', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-write'])

    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Find the first rule card title
    const firstRuleTitle = page.locator('.group').first()
    await firstRuleTitle.hover()

    // Click the anchor button
    const anchorButton = firstRuleTitle.locator(
      'button[aria-label*="Copy link"]',
    )
    await anchorButton.click()

    // Verify copied state
    await expect(anchorButton).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Link copied'),
    )

    // Wait for the timeout (2 seconds + buffer)
    await page.waitForTimeout(2500)

    // Re-hover to see the button
    await firstRuleTitle.hover()

    // Verify the state has reset
    await expect(anchorButton).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Copy link'),
    )
  })
})
