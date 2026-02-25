'use client'

import Link from 'next/link'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { NavigationGlass } from '@/components/ui/liquid-glass'

export function Header() {
  return (
    <NavigationGlass
      as="header"
      config={{ thickness: 'ultra-thick', shadow: 'md' }}
      className="sticky! top-0 z-50 border-b rounded-bl-glass-lg rounded-br-glass-lg"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-lg font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors"
        >
          eslint-config-ts-prefixer
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="glass-thin glass-border rounded-glass glass-transition hover:glass-medium min-h-[44px] min-w-[44px]"
          >
            <Link
              href="https://github.com/laststance/eslint-config-ts-prefixer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
            >
              <Github className="h-5 w-5 text-gray-900 dark:text-white" />
            </Link>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </NavigationGlass>
  )
}
