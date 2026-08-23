import { test, expect } from '@playwright/test'

/**
 * Covers the two ways an action can exist but be unreachable: it looks
 * unclickable, or it only ever appears under a mouse the visitor does not have.
 */
test.describe('Clickability affordances', () => {
  test('every button on the page shows the pointer cursor', async ({
    page,
  }) => {
    // Arrange - Tailwind v4 preflight leaves buttons on the UA arrow cursor,
    // so a regression here makes the whole site read as non-interactive
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('http://localhost:3007')
    await page.waitForLoadState('networkidle')

    // Act
    const cursors = await page.evaluate(() => {
      const tally: Record<string, number> = {}
      for (const button of document.querySelectorAll('button')) {
        const cursor = getComputedStyle(button).cursor
        tally[cursor] = (tally[cursor] ?? 0) + 1
      }
      return tally
    })

    // Assert - one bucket, and it is `pointer`
    expect(Object.keys(cursors)).toEqual(['pointer'])
    expect(cursors.pointer).toBeGreaterThan(200)
  })

  test('code copy button reveals itself when reached by keyboard', async ({
    page,
  }) => {
    // Arrange
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('http://localhost:3007')
    await page.waitForLoadState('networkidle')
    const copyButton = page
      .locator('section:has(#installation) button[aria-label*="opy"]')
      .first()

    // Assert - hidden while nothing points at it
    await expect(copyButton).toHaveCSS('opacity', '0')

    // Act
    await copyButton.focus()

    // Assert - a focus ring on an invisible button is not a focus ring
    await expect(copyButton).toHaveCSS('opacity', '1')
  })
})

test.describe('Clickability affordances on touch', () => {
  // iPhone 13. Spelled out rather than spread from `devices` because that
  // preset also pins the browser, which Playwright rejects inside a describe.
  test.use({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  })

  test('install commands can be copied on a phone', async ({ page }) => {
    // Arrange - a phone never fires hover, so `group-hover` alone hides the
    // only way to copy the install command
    await page.goto('http://localhost:3007')
    await page.waitForLoadState('networkidle')

    // Act
    const visible = await page.evaluate(() =>
      [...document.querySelectorAll('button[aria-label*="opy to clipboard"]')]
        .map((el) => {
          const box = el.getBoundingClientRect()
          return {
            opacity: getComputedStyle(el).opacity,
            size: `${Math.round(box.width)}x${Math.round(box.height)}`,
          }
        })
        .filter((b) => b.opacity === '1'),
    )

    // Assert - all five code blocks expose a full-size tap target
    expect(visible).toEqual([
      { opacity: '1', size: '44x44' },
      { opacity: '1', size: '44x44' },
      { opacity: '1', size: '44x44' },
      { opacity: '1', size: '44x44' },
      { opacity: '1', size: '44x44' },
    ])
  })
})
