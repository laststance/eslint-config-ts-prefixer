/**
 * Apple Liquid Glass UI Component
 * Implements Apple's Liquid Glass design system following HIG 2025
 *
 * Features:
 * - Multi-layer composition (highlights, shadows, tints)
 * - Material thickness variants
 * - Vibrancy system for text hierarchy
 * - Accessibility fallbacks (reduce transparency, reduce motion)
 * - Performance optimization (GPU acceleration, mobile optimization)
 */

import type React from 'react'
import { cn } from '@/lib/utils'
import {
  type GlassConfig,
  type GlassVariant,
  type GlassVibrancy,
  getGlassClasses,
  getGlassPreset,
  getVibrancyClass,
} from '@/lib/glass-utils'

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Glass variant determines the usage context
   * - navigation: Primary glass for headers, sidebars (thick material)
   * - content: Clear glass for content containers (clear material with dimming)
   * - accent: Tinted glass for interactive elements (thin material with color)
   */
  variant?: GlassVariant

  /**
   * Manual glass configuration (overrides variant preset)
   */
  config?: Partial<GlassConfig>

  /**
   * Text vibrancy level for child content
   * - primary: Full opacity (1.0)
   * - secondary: 80% opacity
   * - tertiary: 60% opacity
   * - divider: 30% opacity
   */
  vibrancy?: GlassVibrancy

  /**
   * Additional Tailwind classes
   */
  className?: string

  /**
   * Child content
   */
  children?: React.ReactNode

  /**
   * HTML element type
   */
  as?: React.ElementType
}

export function LiquidGlass({
  variant = 'content',
  config,
  vibrancy,
  className,
  children,
  as: Component = 'div',
  ...props
}: LiquidGlassProps) {
  // Get preset config for variant
  const presetConfig = getGlassPreset(variant)

  // Merge with custom config
  const finalConfig: GlassConfig = {
    ...presetConfig,
    ...config,
  }

  // Generate glass classes
  const glassClasses = getGlassClasses(finalConfig)

  // Generate vibrancy class for text
  const vibrancyClasses = getVibrancyClass(vibrancy)

  return (
    <Component
      className={cn(glassClasses, vibrancyClasses, className)}
      {...props}
    >
      {children}
    </Component>
  )
}

/**
 * Pre-configured variants for common use cases
 */

export function NavigationGlass({
  children,
  className,
  ...props
}: Omit<LiquidGlassProps, 'variant'>) {
  return (
    <LiquidGlass variant="navigation" className={className} {...props}>
      {children}
    </LiquidGlass>
  )
}

export function ContentGlass({
  children,
  className,
  ...props
}: Omit<LiquidGlassProps, 'variant'>) {
  return (
    <LiquidGlass variant="content" className={className} {...props}>
      {children}
    </LiquidGlass>
  )
}

export function AccentGlass({
  children,
  className,
  ...props
}: Omit<LiquidGlassProps, 'variant'>) {
  return (
    <LiquidGlass variant="accent" className={className} {...props}>
      {children}
    </LiquidGlass>
  )
}
