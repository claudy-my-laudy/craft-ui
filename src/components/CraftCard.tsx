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

/**
 * Paper surface variant.
 *
 * - `default`   — warm handmade cream (the original craft-ui paper)
 * - `kraft`     — unbleached brown bag / packaging paper
 * - `parchment` — aged golden document paper
 */
export type CraftPaperVariant = 'default' | 'kraft' | 'parchment'

const tintInset: Record<CraftCrayon, string> = {
  orange: 'shadow-[inset_0_0_72px_rgba(238,180,130,0.35)]',
  green: 'shadow-[inset_0_0_72px_rgba(120,220,150,0.35)]',
  pink: 'shadow-[inset_0_0_72px_rgba(245,150,190,0.35)]',
  yellow: 'shadow-[inset_0_0_72px_rgba(250,200,120,0.35)]',
  red: 'shadow-[inset_0_0_72px_rgba(220,120,120,0.3)]',
  blue: 'shadow-[inset_0_0_72px_rgba(120,160,240,0.3)]',
  lime: 'shadow-[inset_0_0_72px_rgba(180,230,140,0.4)]',
}

const variantBase: Record<CraftPaperVariant, string> = {
  default: 'craft-paper-base',
  kraft: 'craft-paper-kraft',
  parchment: 'craft-paper-parchment',
}

export type CraftCardProps = ComponentPropsWithoutRef<'div'> & {
  elevation?: 'sm' | 'lg'
  /** Dyed-fiber wash over the paper surface */
  tint?: CraftCrayon
  /**
   * `paste` / `paste-lg` — foam-dot lift so the card reads like something
   * glued on the sheet. Skips the default flat paper shadow in favor of
   * stacked "pasted" depth.
   */
  lift?: 'none' | 'paste' | 'paste-lg'
  /**
   * Paper surface variant.
   *
   * - `default`   — warm handmade cream
   * - `kraft`     — unbleached brown / packaging paper
   * - `parchment` — aged golden document paper
   */
  variant?: CraftPaperVariant
  /**
   * Apply a hand-torn deckled edge via clip-path.
   * Three profiles (`1` | `2` | `3`) give slightly different tear shapes
   * so repeated cards don't look identical.
   */
  deckled?: 1 | 2 | 3
}

export const CraftCard = forwardRef<HTMLDivElement, CraftCardProps>(function CraftCard(
  {
    className,
    elevation = 'sm',
    tint,
    lift = 'none',
    variant = 'default',
    deckled,
    ...props
  },
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

  const paperBase = variantBase[variant]

  const deckledClass = deckled ? `craft-deckled-${deckled}` : null

  return (
    <div
      ref={ref}
      className={cn(
        'relative rounded-2xl border border-black/[0.07] p-4',
        // When a non-default variant is used alongside a lift/elevation class,
        // we apply the variant base separately so its background wins.
        variant !== 'default' ? paperBase : surface,
        variant !== 'default' && lift !== 'none' && surface,
        lift !== 'none' && '-rotate-1',
        tint ? tintInset[tint] : null,
        deckledClass,
        className,
      )}
      {...props}
    />
  )
})
