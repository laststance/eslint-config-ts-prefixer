import { test, expect } from '@playwright/test'

/**
 * Guards the dark-theme hover colours on the two navigation surfaces a reader
 * touches most. Both were dead before: a global `.dark .text-gray-900` override
 * scored (0,2,0) and outranked every `dark:hover:text-*` utility, and the
 * sidebar quick links carried no dark background variant at all, so hovering
 * them painted a near-white bar onto the dark glass panel.
 */
test.describe('Navigation hover colours', () => {
  test('sidebar quick links darken instead of flashing white when hovered in dark mode', async ({
    page,
  }) => {
    // Arrange
    await page.addInitScript(() => localStorage.setItem('theme', 'dark'))
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('http://localhost:3007')
    await page.waitForLoadState('networkidle')
    const installation = page.locator('aside a[href="#installation"]').first()
    const ruleLink = page
      .locator(
        'aside nav a[href^="#"]:not([href="#installation"]):not([href="#configuration"])',
      )
      .first()

    // Assert - transparent at rest, sitting on the panel's own glass
    await expect(installation).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')

    // Act
    await installation.hover()

    // Assert - the quick link now lands on the same dark wash as a rule link,
    // rather than the gray-200/70 it used to share with the light theme
    await expect(installation).toHaveCSS(
      'background-color',
      'oklab(0.279491 -0.00636676 -0.0362855 / 0.5)',
    )
    await expect(installation).toHaveCSS(
      'color',
      'lab(96.1596 -0.0823438 -1.13575)',
    )

    // Act - the rule links are the reference the quick links have to match
    await ruleLink.hover()

    // Assert
    await expect(ruleLink).toHaveCSS(
      'background-color',
      'oklab(0.279491 -0.00636676 -0.0362855 / 0.5)',
    )
  })

  test('header brand shifts to the accent blue on hover in dark mode', async ({
    page,
  }) => {
    // Arrange
    await page.addInitScript(() => localStorage.setItem('theme', 'dark'))
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('http://localhost:3007')
    await page.waitForLoadState('networkidle')
    const brand = page.locator('header a[href="/"]')

    // Assert
    await expect(brand).toHaveCSS('color', 'rgb(248, 250, 252)')

    // Act
    await brand.hover()

    // Assert - blue-400, not the near-white it used to stay at
    await expect(brand).toHaveCSS('color', 'lab(65.0361 -1.42065 -56.9802)')
  })

  test('header brand shifts to the accent blue on hover in light mode', async ({
    page,
  }) => {
    // Arrange
    await page.addInitScript(() => localStorage.setItem('theme', 'light'))
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('http://localhost:3007')
    await page.waitForLoadState('networkidle')
    const brand = page.locator('header a[href="/"]')

    // Assert
    await expect(brand).toHaveCSS('color', 'rgb(0, 0, 0)')

    // Act
    await brand.hover()

    // Assert - blue-700, replacing a hover to slate-950 that was invisible
    await expect(brand).toHaveCSS('color', 'lab(36.9089 35.0961 -85.6872)')
  })
})
