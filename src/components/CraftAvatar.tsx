import { type ComponentPropsWithoutRef, forwardRef, useMemo } from 'react'

import { cn } from '../lib/cn'
import type { CraftCrayon } from './CraftCard'

const sizeClass = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
} as const

const crayonWash: Record<CraftCrayon, string> = {
  orange: 'from-craft-orange/35 to-craft-yellow/25',
  green: 'from-craft-green/35 to-craft-lime/25',
  pink: 'from-craft-pink/35 to-craft-yellow/20',
  yellow: 'from-craft-yellow/40 to-craft-orange/25',
  red: 'from-craft-red/35 to-craft-pink/25',
  blue: 'from-craft-blue/35 to-craft-pink/20',
  lime: 'from-craft-lime/40 to-craft-green/25',
}

export type CraftAvatarProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  /** Image URL — when set, `fallback` is alt text / initials backup. */
  src?: string
  alt: string
  /** Shown when `src` missing or broken — 1–2 initials. */
  fallback: string
  size?: keyof typeof sizeClass
  shape?: 'circle' | 'rounded'
  /** Paper-tint wash behind initials / under photo. */
  crayon?: CraftCrayon
}

function initials(text: string): string {
  const parts = text.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const CraftAvatar = forwardRef<HTMLDivElement, CraftAvatarProps>(function CraftAvatar(
  { className, src, alt, fallback, size = 'md', shape = 'circle', crayon = 'orange', ...props },
  ref,
) {
  const letters = useMemo(() => initials(fallback), [fallback])
  const round = shape === 'circle' ? 'rounded-full' : 'rounded-xl'

  return (
    <div
      ref={ref}
      role={src ? undefined : 'img'}
      aria-label={src ? undefined : alt}
      className={cn(
        'relative inline-flex shrink-0 overflow-hidden bg-craft-paper/90 ring-2 ring-black/12 ring-offset-2 ring-offset-craft-paper shadow-craft-paper',
        sizeClass[size],
        round,
        'items-center justify-center',
        className,
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className={cn('h-full w-full object-cover', round)} loading="lazy" />
      ) : (
        <span
          className={cn(
            'flex h-full w-full items-center justify-center bg-gradient-to-br font-craft font-semibold tracking-tight text-craft-ink',
            crayonWash[crayon],
          )}
          aria-hidden
        >
          {letters}
        </span>
      )}
    </div>
  )
})
