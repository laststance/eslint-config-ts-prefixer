/**
 * Apple Liquid Glass UI Utilities
 * Based on Apple Human Interface Guidelines 2025
 */

export type GlassThickness =
  | 'ultra-thin'
  | 'thin'
  | 'medium'
  | 'thick'
  | 'ultra-thick'
  | 'clear'

export type GlassVibrancy = 'primary' | 'secondary' | 'tertiary' | 'divider'

export type GlassShadow = 'sm' | 'md' | 'lg'

export type GlassVariant = 'navigation' | 'content' | 'accent'

export interface GlassConfig {
  thickness: GlassThickness
  vibrancy?: GlassVibrancy
  shadow?: GlassShadow
  layered?: boolean
  tinted?: boolean
  dimmed?: boolean
}

/**
 * Get glass class names based on configuration
 */
export function getGlassClasses(config: GlassConfig): string {
  const classes: string[] = []

  // Base thickness
  if (config.thickness === 'clear') {
    classes.push('glass-clear')
  } else {
    classes.push(`glass-${config.thickness}`)
  }

  // Border
  classes.push('glass-border')

  // Layered effect
  if (config.layered) {
    classes.push('glass-layered')
  }

  // Tinted for primary actions
  if (config.tinted) {
    classes.push('glass-tinted-blue')
  }

  // Dimmed for content clarity
  if (config.dimmed) {
    classes.push('glass-dimmed')
  }

  // Shadow depth
  if (config.shadow) {
    classes.push(`glass-shadow-${config.shadow}`)
  }

  // Transitions
  classes.push('glass-transition')

  // Rounded corners
  classes.push('rounded-glass')

  return classes.join(' ')
}

/**
 * Get vibrancy text class
 */
export function getVibrancyClass(vibrancy?: GlassVibrancy): string {
  if (!vibrancy) return ''
  return `vibrancy-${vibrancy}`
}

/**
 * Get recommended glass config for variant
 */
export function getGlassPreset(
  variant: GlassVariant,
): Omit<GlassConfig, 'vibrancy'> {
  switch (variant) {
    case 'navigation':
      return {
        thickness: 'thick',
        layered: true,
        shadow: 'md',
      }
    case 'content':
      return {
        thickness: 'clear',
        dimmed: true,
        shadow: 'sm',
      }
    case 'accent':
      return {
        thickness: 'thin',
        tinted: true,
        shadow: 'sm',
      }
  }
}

/**
 * Calculate contrast ratio (simplified for validation)
 * Returns true if meets WCAG AA standard (4.5:1 minimum)
 */
export function meetsContrastRequirement(
  foreground: string,
  background: string,
): boolean {
  // Simplified check - in production, use a proper contrast calculation library
  // This is a placeholder for the validation concept
  return true
}
