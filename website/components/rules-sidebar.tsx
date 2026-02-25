'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { EslintRule } from '@/lib/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Download, Settings, FileText, Menu, Search, X } from 'lucide-react'

interface RulesSidebarProps {
  rules: EslintRule[]
}

export function RulesSidebar({ rules }: RulesSidebarProps) {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    const ruleIds = rules.map((r) => r.id)
    const elements = ruleIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-96px 0px -50% 0px' },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [rules])

  // Filter and group rules by plugin
  const filteredRules = searchQuery
    ? rules.filter(
        (rule) =>
          rule.ruleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rule.pluginName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : rules

  const groupedRules = filteredRules.reduce(
    (acc, rule) => {
      const group = rule.pluginName
      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(rule)
      return acc
    },
    {} as Record<string, EslintRule[]>,
  )

  const sidebarContent = (
    <nav className="space-y-6 h-full">
      {/* Quick Navigation */}
      <div className="space-y-1">
        <h3 className="text-sm font-semibold px-2 mb-2 text-gray-900 dark:text-gray-100">
          Getting Started
        </h3>
        <Button
          variant="ghost"
          asChild
          className="w-full justify-start h-auto py-2 px-2 text-sm text-gray-900 hover:text-black hover:bg-gray-200/70 dark:text-gray-300 dark:hover:text-gray-100 font-medium"
        >
          <Link href="#installation" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Installation
          </Link>
        </Button>
        <Button
          variant="ghost"
          asChild
          className="w-full justify-start h-auto py-2 px-2 text-sm text-gray-900 hover:text-black hover:bg-gray-200/70 dark:text-gray-300 dark:hover:text-gray-100 font-medium"
        >
          <Link href="#configuration" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configuration
          </Link>
        </Button>
      </div>

      {/* Rules Section */}
      <div>
        <h3 className="text-sm font-semibold px-2 mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
          <FileText className="h-4 w-4" />
          Configured Rules
          <span className="ml-auto text-xs font-normal text-gray-500 dark:text-gray-400">
            {filteredRules.length}/{rules.length}
          </span>
        </h3>
        <div className="relative px-2 mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Filter rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/20 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <ScrollArea className="h-[calc(100vh-23rem)]">
          <div className="space-y-4">
            {filteredRules.length === 0 && searchQuery && (
              <p className="text-sm text-gray-500 dark:text-gray-400 px-2 py-4 text-center">
                No rules matching &ldquo;{searchQuery}&rdquo;
              </p>
            )}
            {Object.entries(groupedRules).map(([pluginName, pluginRules]) => (
              <div key={pluginName}>
                <h4 className="text-xs font-bold text-gray-800 dark:text-gray-400 px-2 mb-1 uppercase tracking-wide">
                  {pluginName}
                </h4>
                <ul className="space-y-0.5">
                  {pluginRules.map((rule) => (
                    <li key={rule.id}>
                      <Button
                        variant="ghost"
                        asChild
                        className={`w-full justify-start text-left h-auto min-h-[44px] py-2.5 px-2 text-sm font-medium ${
                          activeId === rule.id
                            ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'text-gray-900 hover:text-black hover:bg-gray-200/70 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-muted/50'
                        }`}
                      >
                        <Link href={`#${rule.id}`} className="block rounded-md">
                          {rule.ruleName}
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </nav>
  )

  return (
    <>
      {/* Mobile Menu Button - lg未満でのみ表示 */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed left-4 bottom-6 z-60 glass-medium glass-border glass-shadow-lg hover:glass-thick min-h-[44px] min-w-[44px]"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="glass-sidebar glass-layered p-4 h-full">
              {sidebarContent}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar - lg以上でのみ表示 */}
      <aside className="hidden lg:block lg:fixed lg:left-0 lg:top-16 lg:w-72 lg:h-[calc(100vh-4rem)] glass-sidebar glass-layered glass-border glass-shadow-md p-4 z-40 border-r rounded-tr-glass-lg">
        {sidebarContent}
      </aside>
    </>
  )
}
