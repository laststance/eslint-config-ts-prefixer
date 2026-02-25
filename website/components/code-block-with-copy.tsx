'use client'

import type React from 'react'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CodeBlockWithCopyProps {
  code: string
  className?: string
}

export function CodeBlockWithCopy({
  code,
  className = '',
}: CodeBlockWithCopyProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className={`relative group ${className}`}>
      <div className="bg-slate-900 dark:bg-slate-950 p-3 rounded-lg pr-12 transition-all duration-200 hover:ring-2 hover:ring-blue-500/30">
        <code className="text-green-400 font-mono text-sm">{code}</code>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="absolute right-1 top-1/2 -translate-y-1/2 h-11 w-11 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out hover:bg-slate-800 dark:hover:bg-slate-900 hover:scale-110"
        aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400 animate-in fade-in zoom-in duration-200" />
        ) : (
          <Copy className="h-4 w-4 text-gray-400" />
        )}
      </Button>
    </div>
  )
}
