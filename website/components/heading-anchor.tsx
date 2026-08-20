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
    <div className="group">
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
        <button
          type="button"
          onClick={handleCopyLink}
          aria-label={copied ? 'Link copied!' : 'Copy link to this section'}
          className={cn(
            // Trails the heading text rather than sitting in a left gutter: the
            // gutter is 24px inside a rule card that also clips its overflow, so
            // a -40px offset was half-clipped there and spilled onto the sky
            // photo everywhere else. 24px keeps it inside every heading's line
            // box, down to h4.
            'relative ml-3 h-6 w-6 shrink-0 align-middle',

            // The visible square stays 24px so it never grows a heading's line
            // height; the pointer target is widened to 44px with a pseudo.
            'after:absolute after:-inset-2.5 after:content-[""]',

            // Visibility and interaction
            'opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
            'transition-[opacity,color,scale] duration-200 ease-in-out',
            'active:scale-[0.96]',

            // Accessibility
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
            'rounded-md',

            // Content centering
            'items-center justify-center',

            // Text color - subtle gray that becomes more visible on hover
            'text-muted-foreground hover:text-foreground',

            // Responsive: hide on mobile
            'hidden md:inline-flex',
          )}
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Link2 className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </Component>
    </div>
  )
}
