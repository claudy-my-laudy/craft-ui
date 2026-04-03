import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'

export type WatercolorPanelProps = ComponentPropsWithoutRef<'div'> & {
  /** Preset bleed mixes */
  wash?: 'sunset' | 'candy' | 'sea'
}

const washClass: Record<NonNullable<WatercolorPanelProps['wash']>, string> = {
  sunset:
    'bg-gradient-to-br from-craft-pink/35 via-craft-yellow/30 to-craft-orange/25',
  candy:
    'bg-gradient-to-bl from-craft-lime/25 via-craft-pink/30 to-craft-blue/25',
  sea: 'bg-gradient-to-tr from-craft-blue/30 via-craft-green/20 to-craft-yellow/25',
}

/**
 * Soft watercolor-style gradient panel — heroes, section backdrops.
 */
export const WatercolorPanel = forwardRef<HTMLDivElement, WatercolorPanelProps>(
  function WatercolorPanel({ className, wash = 'sunset', children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-[2rem] p-6',
          'ring-1 ring-black/10',
          'shadow-[inset_0_0_80px_rgb(255_255_255_/_0.25)]',
          washClass[wash],
          className,
        )}
        {...props}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{
            backgroundImage: `radial-gradient(ellipse 120% 80% at 30% 20%, rgb(255 255 255 / 0.5), transparent),
              radial-gradient(ellipse 100% 60% at 80% 70%, rgb(255 255 255 / 0.35), transparent)`,
          }}
          aria-hidden
        />
        <div className="relative z-[1]">{children}</div>
      </div>
    )
  },
)
