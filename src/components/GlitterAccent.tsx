import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'
import type { CraftCrayon } from './CraftCard'

const glitterBg: Record<CraftCrayon, string> = {
  orange: 'from-craft-orange/90 to-craft-yellow/80',
  green: 'from-craft-green/85 to-craft-lime/75',
  pink: 'from-craft-pink/90 to-craft-yellow/70',
  yellow: 'from-craft-yellow/90 to-craft-orange/75',
  red: 'from-craft-red/90 to-craft-pink/70',
  blue: 'from-craft-blue/85 to-craft-pink/75',
  lime: 'from-craft-lime/90 to-craft-green/70',
}

export type GlitterAccentProps = ComponentPropsWithoutRef<'span'> & {
  crayon?: CraftCrayon
}

/**
 * Sparkly emphasis chip — pro badges, celebratory labels.
 */
export const GlitterAccent = forwardRef<HTMLSpanElement, GlitterAccentProps>(function GlitterAccent(
  { className, crayon = 'pink', children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'relative isolate inline-flex items-center overflow-hidden rounded-md',
        'bg-gradient-to-br px-2.5 py-1 font-craft text-base font-bold',
        'text-white shadow-craft-paper ring-1 ring-white/30',
        '[text-shadow:0_1px_2px_rgb(0_0_0_/_0.35)]',
        (crayon === 'yellow' || crayon === 'lime' || crayon === 'green') && 'text-craft-ink [text-shadow:none]',
        glitterBg[crayon],
        className,
      )}
      {...props}
    >
      <span className="craft-glitter-overlay" aria-hidden />
      <span className="relative z-[1]">{children}</span>
    </span>
  )
})
