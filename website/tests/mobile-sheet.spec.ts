import { test, expect } from '@playwright/test'

/**
 * The mobile navigation panel used to stay open on top of the section the
 * reader had just jumped to: a hash link changes the URL without unmounting the
 * sheet, and nothing routed the click back to `setOpen`. The close is delegated
 * from the panel wrapper rather than bound per-link, so the filter input and the
 * group headings inside the same panel must keep it open.
 *
 * The iPhone 13 options are written out instead of spread from `devices` —
 * the preset carries `defaultBrowserType`, which Playwright rejects inside a
 * describe block.
 */
test.describe('Mobile navigation panel', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  })

  test.beforeEach(async ({ page }) => {
    // The Next.js dev overlay renders a <nextjs-portal> at bottom-left and
    // swallows pointer events exactly where the menu trigger sits. It does not
    // exist in a production build, so hiding it is a no-op there.
    await page.addInitScript(() => {
      const style = document.createElement('style')
      style.textContent = 'nextjs-portal { display: none !important; }'
      document.addEventListener('DOMContentLoaded', () =>
        document.head.append(style),
      )
    })
    await page.goto('http://localhost:3007')
    await page.waitForLoadState('networkidle')
  })

  test('menu closes and the page jumps when a section link is tapped', async ({
    page,
  }) => {
    // Arrange
    const trigger = page.locator('button:has-text("Toggle navigation menu")')
    const panel = page.locator('[role="dialog"]')

    // Act
    await trigger.tap()

    // Assert
    await expect(panel).toBeVisible()

    // Act
    await panel.locator('a[href="#installation"]').tap()

    // Assert - the panel gets out of the way and the target is under the header.
    // Polled because Radix restores the body scroll lock as the sheet unmounts,
    // so the jump only settles a few frames after the panel is gone.
    await expect(panel).toBeHidden()
    await expect
      .poll(() => page.evaluate(() => location.hash))
      .toBe('#installation')
    await expect
      .poll(() =>
        page
          .locator('#installation')
          .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
      )
      .toBe(96)
  })

  test('menu closes when a rule link is tapped', async ({ page }) => {
    // Arrange
    const trigger = page.locator('button:has-text("Toggle navigation menu")')
    const panel = page.locator('[role="dialog"]')

    // Act
    await trigger.tap()
    await panel.locator('a[href="#no-dupe-keys"]').tap()

    // Assert - the hash is committed by the Next.js client router, so it can
    // land a frame or two after the sheet has finished animating out
    await expect(panel).toBeHidden()
    await expect
      .poll(() => page.evaluate(() => location.hash))
      .toBe('#no-dupe-keys')
  })

  test('menu stays open while the reader filters the rule list', async ({
    page,
  }) => {
    // Arrange
    const trigger = page.locator('button:has-text("Toggle navigation menu")')
    const panel = page.locator('[role="dialog"]')

    // Act
    await trigger.tap()
    const filter = panel.locator('input[placeholder*="Filter"]')
    await filter.tap()
    await filter.fill('dupe')

    // Assert - only links dismiss the panel, never the controls inside it
    await expect(panel).toBeVisible()

    // Act
    await panel.locator('h3:has-text("Getting Started")').tap()

    // Assert
    await expect(panel).toBeVisible()
  })
})
