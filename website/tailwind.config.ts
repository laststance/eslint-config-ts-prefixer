/**
 * Tailwind CSS v4 Configuration
 *
 * In v4, most configuration is done via @theme in CSS files.
 * This file is now optional and only needed for:
 * - Plugin configuration
 * - Advanced customization
 * - Content paths (handled by Next.js automatically)
 */

import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  /**
   * Dark mode is handled via @custom-variant in globals.css
   * This ensures compatibility with next-themes
   */
  darkMode: 'class',

  /**
   * Content paths for Next.js
   * Next.js automatically scans these directories
   */
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  /**
   * Theme configuration has been moved to app/globals.css using @theme directive
   * This includes: colors, border radius, backdrop blur, etc.
   *
   * Only keeping essential plugin-specific config here
   */
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },

  /**
   * Plugins
   * tailwindcss-animate: Adds animation utilities for Radix UI components
   */
  plugins: [tailwindcssAnimate],
}

export default config
