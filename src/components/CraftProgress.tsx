import { type ComponentPropsWithoutRef, type CSSProperties, forwardRef } from 'react'

import { cn } from '../lib/cn'
import type { CraftCrayon } from './CraftCard'

const crayonToken: Record<CraftCrayon, string> = {
  orange: '--craft-orange',
  green: '--craft-green',
  pink: '--craft-pink',
  yellow: '--craft-yellow',
  red: '--craft-red',
  blue: '--craft-blue',
  lime: '--craft-lime',
}

export type CraftProgressWashiPattern = 'stripes' | 'dots' | 'plain'

const STRIPE_BAND_PX = 5

/** Dot grid — small darker specks on pastel base. */
function dotsLayer(): Pick<CSSProperties, 'backgroundImage' | 'backgroundSize'> {
  return {
    backgroundImage:
      'radial-gradient(circle at center, var(--craft-washi-ink) 1.1px, transparent 1.35px)',
    backgroundSize: '7px 7px',
  }
}

export type CraftProgressProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  /** 0–100 */
  value: number
  max?: number
  /** Pick tape tint (pastel mix from this crayon). */
  crayon?: CraftCrayon
  /** Washi texture on the fill — default `stripes`. */
  washiPattern?: CraftProgressWashiPattern
}

export const CraftProgress = forwardRef<HTMLDivElement, CraftProgressProps>(function CraftProgress(
  { className, value, max = 100, crayon = 'green', washiPattern = 'stripes', ...props },
  ref,
) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const token = crayonToken[crayon]
  const base = `color-mix(in srgb, var(${token}) 40%, white)`
  const ink = `color-mix(in srgb, var(${token}) 58%, rgb(48 44 40))`
  /** Alternating vertical bands (two pastel mixes), like printed washi tape. */
  const stripeA = `color-mix(in srgb, var(${token}) 28%, white)`
  const stripeB = `color-mix(in srgb, var(${token}) 44%, white)`

  const fillStyle: CSSProperties = { width: `${pct}%` }

  if (washiPattern === 'stripes') {
    const w = STRIPE_BAND_PX
    Object.assign(fillStyle, {
      ['--craft-washi-stripe-a' as string]: stripeA,
      ['--craft-washi-stripe-b' as string]: stripeB,
      backgroundImage: `repeating-linear-gradient(90deg, var(--craft-washi-stripe-a) 0 ${w}px, var(--craft-washi-stripe-b) ${w}px ${w * 2}px)`,
      boxShadow:
        'inset 0 1px 0 rgb(255 255 255 / 0.92), inset 0 -1px 0 rgb(255 255 255 / 0.88), 0 1px 2px rgb(0 0 0 / 0.07)',
    })
  } else if (washiPattern === 'dots') {
    const d = dotsLayer()
    Object.assign(fillStyle, {
      ['--craft-washi-ink' as string]: ink,
      backgroundImage: `${d.backgroundImage}, ${base}`,
      backgroundSize: `${d.backgroundSize}, auto`,
      boxShadow:
        'inset 0 1px 0 rgb(255 255 255 / 0.55), inset 0 -1px 0 rgb(0 0 0 / 0.05), 0 1px 2px rgb(0 0 0 / 0.08)',
    })
  } else {
    Object.assign(fillStyle, {
      backgroundColor: base,
      boxShadow:
        'inset 0 1px 0 rgb(255 255 255 / 0.55), inset 0 -1px 0 rgb(0 0 0 / 0.05), 0 1px 2px rgb(0 0 0 / 0.08)',
    })
  }

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        'h-6 w-full overflow-hidden rounded-md border-2 border-black/12',
        'bg-[color-mix(in_srgb,var(--craft-paper)_92%,rgb(210_200_185))]',
        'shadow-[inset_0_2px_5px_rgb(0_0_0_/_0.07)]',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'craft-washi-progress-fill h-full min-w-[14px] transition-[width] duration-300 ease-out',
        )}
        style={fillStyle}
      />
    </div>
  )
})
