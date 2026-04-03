import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'

export type WashiPattern = 'plain' | 'stripes' | 'dots'

const patternBg: Record<WashiPattern, string> = {
  plain: '',
  stripes:
    'bg-[repeating-linear-gradient(90deg,rgb(255_255_255_/_0.28)_0_4px,transparent_4px_10px)]',
  dots: 'bg-[radial-gradient(rgb(0_0_0_/_0.07)_1.5px,transparent_1.6px)] bg-[length:10px_10px]',
}

export type WashiStripProps = ComponentPropsWithoutRef<'div'> & {
  pattern?: WashiPattern
  /** Pastel tape tint */
  tint?: 'yellow' | 'mint' | 'pink' | 'lavender'
}

const tintBg: Record<NonNullable<WashiStripProps['tint']>, string> = {
  yellow: 'bg-[color-mix(in_srgb,var(--craft-yellow)_42%,white)]',
  mint: 'bg-[color-mix(in_srgb,var(--craft-green)_35%,white)]',
  pink: 'bg-[color-mix(in_srgb,var(--craft-pink)_38%,white)]',
  lavender: 'bg-[color-mix(in_srgb,var(--craft-blue)_28%,white)]',
}

/**
 * Decorative tape strip with torn-ish clip mask — headers, “pinned” edges.
 */
export const WashiStrip = forwardRef<HTMLDivElement, WashiStripProps>(function WashiStrip(
  { className, pattern = 'plain', tint = 'yellow', children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'craft-washi-torn relative inline-flex min-h-[2.25rem] max-w-full items-center',
        'px-4 py-2 font-craft text-xl font-semibold text-craft-ink/90',
        'opacity-95 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.5)]',
        'ring-1 ring-black/10',
        tintBg[tint],
        patternBg[pattern],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})
