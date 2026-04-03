import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'
import type { CraftCrayon } from './CraftCard'

const noteSurface: Record<CraftCrayon, string> = {
  orange: 'bg-craft-orange text-white',
  green: 'bg-craft-green text-craft-ink',
  pink: 'bg-craft-pink text-white',
  yellow: 'bg-craft-yellow text-craft-ink',
  red: 'bg-craft-red text-white',
  blue: 'bg-craft-blue text-white',
  lime: 'bg-craft-lime text-craft-ink',
}

export type StickyNoteProps = ComponentPropsWithoutRef<'div'> & {
  color?: CraftCrayon
  /** Degrees; slight wobble reads hand-placed */
  rotate?: number
}

/**
 * Square note with peel-corner shadow stack — neon sticky-note idiom.
 */
export const StickyNote = forwardRef<HTMLDivElement, StickyNoteProps>(function StickyNote(
  { className, color = 'yellow', rotate = -2.5, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'relative max-w-md rounded-sm p-4 font-craftMarker text-lg leading-snug',
        'ring-1 ring-black/15',
        'shadow-[3px_4px_0_rgb(0_0_0_/_0.06),6px_10px_22px_rgb(0_0_0_/_0.11)]',
        noteSurface[color],
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      {...props}
    />
  )
})
