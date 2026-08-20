'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="glass-thin glass-tinted-blue glass-border rounded-glass glass-transition hover:glass-medium hover:scale-105 active:scale-[0.96] min-h-[44px] min-w-[44px]"
    >
      {/* Both icons stay mounted and cross-fade with scale + blur — no library,
          and the exit animation survives an interrupted click */}
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 opacity-100 blur-none transition-[scale,opacity,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:scale-25 dark:opacity-0 dark:blur-[4px] vibrancy-primary" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-25 opacity-0 blur-[4px] transition-[scale,opacity,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:scale-100 dark:opacity-100 dark:blur-none vibrancy-primary" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
