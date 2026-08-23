import { test, expect } from '@playwright/test'

/**
 * Guards the glass hover materials, which fail silently: the classes are real
 * but Tailwind only emits `hover:` variants for utilities registered with
 * `@utility`, and a `.dark .glass-x` descendant selector outranks the variant
 * it is supposed to lose to. Both bugs render as "nothing happens on hover".
 */
test.describe('Liquid Glass hover materials', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('http://localhost:3007')
    await page.waitForLoadState('networkidle')
  })

  test('header GitHub button thickens its glass on hover in light theme', async ({
    page,
  }) => {
    // Arrange
    const githubButton = page.locator('header a[aria-label="View on GitHub"]')
    await page.mouse.move(5, 5)

    // Assert - resting material
    await expect(githubButton).toHaveCSS(
      'background-color',
      'rgba(255, 255, 255, 0.25)',
    )
    await expect(githubButton).toHaveCSS(
      'backdrop-filter',
      'blur(18px) saturate(1.8) brightness(1.05)',
    )

    // Act
    await githubButton.hover()

    // Assert - thicker glass, never an opaque fill punched through it
    await expect(githubButton).toHaveCSS(
      'background-color',
      'rgba(255, 255, 255, 0.35)',
    )
    await expect(githubButton).toHaveCSS(
      'backdrop-filter',
      'blur(24px) saturate(1.8) brightness(1.05)',
    )
  })

  test('header GitHub button thickens its glass on hover in dark theme', async ({
    page,
  }) => {
    // Arrange
    await page.locator('header button:has(svg)').click()
    await expect(page.locator('html')).toHaveClass(/dark/)
    const githubButton = page.locator('header a[aria-label="View on GitHub"]')
    await page.mouse.move(5, 5)

    // Assert - resting material
    await expect(githubButton).toHaveCSS(
      'background-color',
      'rgba(0, 0, 0, 0.6)',
    )
    await expect(githubButton).toHaveCSS(
      'backdrop-filter',
      'blur(28px) saturate(1.8)',
    )

    // Act
    await githubButton.hover()

    // Assert - dark has to move too; `.dark .glass-thin` used to swallow this
    await expect(githubButton).toHaveCSS(
      'background-color',
      'rgba(0, 0, 0, 0.65)',
    )
    await expect(githubButton).toHaveCSS(
      'backdrop-filter',
      'blur(32px) saturate(1.8)',
    )
  })

  test('theme toggle keeps its blue tint while thickening on hover', async ({
    page,
  }) => {
    // Arrange
    const themeToggle = page.locator('header button:has(svg)')
    await page.mouse.move(5, 5)
    const tintAtRest = await themeToggle.evaluate(
      (el) => getComputedStyle(el).backgroundImage,
    )
    expect(tintAtRest).toContain('linear-gradient')

    // Act
    await themeToggle.hover()

    // Assert - the tint survives, so the pill does not flash plain white
    await expect(themeToggle).toHaveCSS(
      'background-color',
      'rgba(255, 255, 255, 0.35)',
    )
    const tintOnHover = await themeToggle.evaluate(
      (el) => getComputedStyle(el).backgroundImage,
    )
    expect(tintOnHover).toBe(tintAtRest)
  })

  test('rule card deepens its shadow as it lifts on hover', async ({
    page,
  }) => {
    // Arrange
    const ruleCard = page.locator('[id="eqeqeq"]')
    await ruleCard.scrollIntoViewIfNeeded()
    await page.mouse.move(5, 5)

    // Assert - resting depth
    await expect(ruleCard).toHaveCSS('translate', 'none')
    const shadowAtRest = await ruleCard.evaluate(
      (el) => getComputedStyle(el).boxShadow,
    )
    expect(shadowAtRest).toContain('rgba(0, 0, 0, 0.1) 0px 4px 16px 0px')

    // Act
    await ruleCard.hover()

    // Assert - a card that rises has to cast a bigger shadow, not the same one
    await expect(ruleCard).toHaveCSS('translate', '0px -4px')
    const shadowOnHover = await ruleCard.evaluate(
      (el) => getComputedStyle(el).boxShadow,
    )
    expect(shadowOnHover).toContain('rgba(0, 0, 0, 0.15) 0px 12px 48px 0px')
  })
})
