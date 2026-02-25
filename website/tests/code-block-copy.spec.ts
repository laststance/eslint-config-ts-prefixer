import { test, expect } from '@playwright/test'

test.describe('Code Block Copy Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3007')
  })

  test('should show copy buttons on hover', async ({ page }) => {
    // Wait for the installation section to be visible
    const installationSection = page.locator('#installation')
    await expect(installationSection).toBeVisible()

    // Get all code blocks with copy functionality in installation section
    const codeBlocks = page.locator('#installation .group')
    await expect(codeBlocks).toHaveCount(3)

    // Hover over the first code block
    await codeBlocks.first().hover()

    // Check if the copy button appears (opacity transition from 0 to 100)
    const copyButton = codeBlocks.first().locator('button[aria-label*="Copy"]')
    await expect(copyButton).toBeVisible()
  })

  // Clipboard tests only for Chromium (Firefox and WebKit don't support clipboard-write permission)
  test('should copy pnpm command to clipboard', async ({
    page,
    context,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'Clipboard API not fully supported in Firefox and WebKit',
    )

    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])

    const installationSection = page.locator('#installation')
    await expect(installationSection).toBeVisible()

    // Find the first code block (pnpm)
    const firstCodeBlock = page.locator('#installation .group').first()
    await firstCodeBlock.hover()

    // Click the copy button
    const copyButton = firstCodeBlock.locator('button[aria-label*="Copy"]')
    await copyButton.click()

    // Wait for the "Copied!" state
    await expect(
      firstCodeBlock.locator('button[aria-label="Copied!"]'),
    ).toBeVisible()

    // Verify the check icon is shown
    const checkIcon = firstCodeBlock.locator('svg.lucide-check')
    await expect(checkIcon).toBeVisible()

    // Verify clipboard content
    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText(),
    )
    expect(clipboardText).toBe('pnpm add -D eslint-config-ts-prefixer@latest')
  })

  test('should copy npm command to clipboard', async ({
    page,
    context,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'Clipboard API not fully supported in Firefox and WebKit',
    )

    await context.grantPermissions(['clipboard-read', 'clipboard-write'])

    const installationSection = page.locator('#installation')
    await expect(installationSection).toBeVisible()

    // Find the second code block (npm)
    const secondCodeBlock = page.locator('#installation .group').nth(1)
    await secondCodeBlock.hover()

    const copyButton = secondCodeBlock.locator('button[aria-label*="Copy"]')
    await copyButton.click()

    await expect(
      secondCodeBlock.locator('button[aria-label="Copied!"]'),
    ).toBeVisible()

    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText(),
    )
    expect(clipboardText).toBe(
      'npm install --save-dev eslint-config-ts-prefixer@latest',
    )
  })

  test('should copy yarn command to clipboard', async ({
    page,
    context,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'Clipboard API not fully supported in Firefox and WebKit',
    )

    await context.grantPermissions(['clipboard-read', 'clipboard-write'])

    const installationSection = page.locator('#installation')
    await expect(installationSection).toBeVisible()

    // Find the third code block (yarn)
    const thirdCodeBlock = page.locator('#installation .group').nth(2)
    await thirdCodeBlock.hover()

    const copyButton = thirdCodeBlock.locator('button[aria-label*="Copy"]')
    await copyButton.click()

    await expect(
      thirdCodeBlock.locator('button[aria-label="Copied!"]'),
    ).toBeVisible()

    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText(),
    )
    expect(clipboardText).toBe('yarn add -D eslint-config-ts-prefixer')
  })

  test('should reset to copy icon after 2 seconds', async ({
    page,
    context,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'Clipboard API not fully supported in Firefox and WebKit',
    )

    await context.grantPermissions(['clipboard-read', 'clipboard-write'])

    const firstCodeBlock = page.locator('#installation .group').first()
    await firstCodeBlock.hover()

    const copyButton = firstCodeBlock.locator('button[aria-label*="Copy"]')
    await copyButton.click()

    // Verify check icon appears
    await expect(
      firstCodeBlock.locator('button[aria-label="Copied!"]'),
    ).toBeVisible()

    // Wait for 2.5 seconds (timeout is 2 seconds)
    await page.waitForTimeout(2500)

    // Verify it returns to copy icon
    await firstCodeBlock.hover()
    await expect(
      firstCodeBlock.locator('button[aria-label*="Copy to clipboard"]'),
    ).toBeVisible()
  })
})
