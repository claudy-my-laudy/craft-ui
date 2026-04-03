import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'

export type CraftCrayon =
  | 'orange'
  | 'green'
  | 'pink'
  | 'yellow'
  | 'red'
  | 'blue'
  | 'lime'

const tintInset: Record<CraftCrayon, string> = {
  orange: 'shadow-[inset_0_0_72px_rgba(238,180,130,0.35)]',
  green: 'shadow-[inset_0_0_72px_rgba(120,220,150,0.35)]',
  pink: 'shadow-[inset_0_0_72px_rgba(245,150,190,0.35)]',
  yellow: 'shadow-[inset_0_0_72px_rgba(250,200,120,0.35)]',
  red: 'shadow-[inset_0_0_72px_rgba(220,120,120,0.3)]',
  blue: 'shadow-[inset_0_0_72px_rgba(120,160,240,0.3)]',
  lime: 'shadow-[inset_0_0_72px_rgba(180,230,140,0.4)]',
}

export type CraftCardProps = ComponentPropsWithoutRef<'div'> & {
  elevation?: 'sm' | 'lg'
  /** Dyed-fiber wash over the paper surface */
  tint?: CraftCrayon
  /**
   * `paste` / `paste-lg` — foam-dot lift so the card reads like something glued on the sheet.
   * Skips the default flat paper shadow in favor of stacked “pasted” depth.
   */
  lift?: 'none' | 'paste' | 'paste-lg'
}

export const CraftCard = forwardRef<HTMLDivElement, CraftCardProps>(function CraftCard(
  { className, elevation = 'sm', tint, lift = 'none', ...props },
  ref,
) {
  const surface =
    lift === 'paste-lg'
      ? 'craft-lift-paste-lg'
      : lift === 'paste'
        ? 'craft-lift-paste'
        : elevation === 'lg'
          ? 'craft-paper-surface-lg'
          : 'craft-paper-surface'

  return (
    <div
      ref={ref}
      className={cn(
        'relative rounded-2xl border border-black/[0.07] p-4',
        surface,
        lift !== 'none' && '-rotate-1',
        tint ? tintInset[tint] : null,
        className,
      )}
      {...props}
    />
  )
})
