import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'
import type { CraftCrayon } from './CraftCard'

const chipClass: Record<CraftCrayon, string> = {
  orange: 'bg-craft-orange text-white',
  green: 'bg-craft-green text-craft-ink',
  pink: 'bg-craft-pink text-white',
  yellow: 'bg-craft-yellow text-craft-ink',
  red: 'bg-craft-red text-white',
  blue: 'bg-craft-blue text-white',
  lime: 'bg-craft-lime text-craft-ink',
}

export type CraftLetterChipProps = ComponentPropsWithoutRef<'span'> & {
  crayon?: CraftCrayon
  /** Hand-placed wobble in degrees */
  rotate?: number
}

/** Square “cut paper” tile — string on garland or initials. */
export const CraftLetterChip = forwardRef<HTMLSpanElement, CraftLetterChipProps>(
  function CraftLetterChip({ className, crayon = 'pink', rotate = -2, style, ...props }, ref) {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex h-10 w-10 select-none items-center justify-center rounded-[3px]',
          'border border-black/20 font-craftMarker text-2xl font-bold leading-none',
          'shadow-[0_1px_0_rgb(255_255_255_/_0.35),2px_3px_6px_rgb(0_0_0_/_0.12)]',
          chipClass[crayon],
          className,
        )}
        style={{ transform: `rotate(${rotate}deg)`, ...style }}
        {...props}
      />
    )
  },
)
