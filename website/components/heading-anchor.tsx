'use client'

import { useState } from 'react'
import { Link2, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

// Export slugify from shared utility for server/client usage
export { slugify } from '@/lib/slugify'

interface HeadingAnchorProps {
  id: string
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
  className?: string
}

/**
 * HeadingAnchor Component
 *
 * Wraps heading content with an anchor link that navigates to the section.
 * Also provides a hover icon that copies the URL with hash fragment to clipboard.
 * Clicking the heading navigates to the hash, while the icon copies the link.
 * Follows Apple Liquid Glass design system with full accessibility support.
 *
 * @example
 * <HeadingAnchor id="my-heading" as="h2" className="text-2xl">
 *   My Heading
 * </HeadingAnchor>
 */
export function HeadingAnchor({
  id,
  children,
  as: Component = 'div',
  className,
}: HeadingAnchorProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <div className="group relative">
      <Component id={id} className={cn('scroll-mt-24', className)}>
        <a
          href={`#${id}`}
          className={cn(
            // Make heading content clickable for navigation
            'no-underline cursor-pointer',
            'text-inherit',

            // Hover and focus states
            'glass-transition',
            'hover:opacity-80',

            // Accessibility
            'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
            'rounded-sm',
          )}
          aria-label={`Navigate to ${typeof children === 'string' ? children : id}`}
        >
          {children}
        </a>
      </Component>

      <button
        type="button"
        onClick={handleCopyLink}
        aria-label={copied ? 'Link copied!' : 'Copy link to this section'}
        className={cn(
          // Base positioning and size - GitHub style positioning with 44px touch target
          'absolute -left-10 top-1/2 -translate-y-1/2',
          'w-8 h-8 min-h-[44px] min-w-[44px] rounded-md',

          // Minimal background with subtle hover effect (GitHub style)
          'bg-transparent',
          'hover:bg-muted/50',

          // Visibility and interaction
          'opacity-0 group-hover:opacity-100 focus:opacity-100',
          'transition-all duration-200 ease-in-out',

          // Accessibility
          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1',

          // Content centering
          'flex items-center justify-center',

          // Text color - subtle gray that becomes more visible on hover
          'text-muted-foreground hover:text-foreground',

          // Responsive: hide on mobile
          'hidden md:flex',
        )}
      >
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Link2 className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
