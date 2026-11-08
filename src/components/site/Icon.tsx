import 'server-only'

import * as lucide from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import * as simpleIcons from 'simple-icons'

type SimpleIcon = { title: string; hex: string; path: string }

function brand(slug: string): SimpleIcon | undefined {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`
  return (simpleIcons as unknown as Record<string, SimpleIcon>)[key]
}

/**
 * Renders a registry icon value (`si:<slug>` or `lu:<Name>`) as inline SVG.
 * Brand logos render in the current text color and expose their brand color as `--brand`
 * so CSS can reveal it on hover. Unknown values fall back to a neutral dot.
 */
export function Icon({ value, size = 16, className }: { value?: string | null; size?: number; className?: string }) {
  if (value?.startsWith('si:')) {
    const icon = brand(value.slice(3))
    if (icon) {
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          aria-hidden="true"
          className={className ? `icon icon-brand ${className}` : 'icon icon-brand'}
          style={{ ['--brand' as string]: `#${icon.hex}` }}
        >
          <path d={icon.path} fill="currentColor" />
        </svg>
      )
    }
  }
  if (value?.startsWith('lu:')) {
    const Cmp = (lucide as unknown as Record<string, LucideIcon | undefined>)[value.slice(3)]
    if (Cmp) return <Cmp size={size} strokeWidth={1.75} aria-hidden="true" className={className ? `icon ${className}` : 'icon'} />
  }
  return <span aria-hidden="true" className={className ? `icon icon-dot ${className}` : 'icon icon-dot'} />
}
