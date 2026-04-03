import { type ComponentPropsWithoutRef } from 'react'

import { cn } from '../lib/cn'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

export type CraftSketchUnderlineProps = ComponentPropsWithoutRef<'span'> & {
  /** Stroke follows `currentColor` — set `className` e.g. `text-craft-pink` */
  variant?: 'ink' | 'accent'
}

const variantColor: Record<NonNullable<CraftSketchUnderlineProps['variant']>, string> = {
  ink: 'text-craft-ink',
  accent: 'text-craft-orange',
}

/**
 * Marker-style wavy underline under inline copy (single-line looks best).
 */
export function CraftSketchUnderline({
  className,
  variant = 'ink',
  children,
  ...props
}: CraftSketchUnderlineProps) {
  const reduceMotion = usePrefersReducedMotion()

  return (
    <span
      className={cn('relative inline-block pb-2', variantColor[variant], className)}
      {...props}
    >
      {children}
      <svg
        className="absolute bottom-0 left-0 h-3 w-full overflow-visible"
        viewBox="0 0 100 14"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {reduceMotion ? (
          <path
            d="M0 9 L100 9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity={0.85}
            vectorEffect="non-scaling-stroke"
          />
        ) : (
          <path
            d="M0 9 C16 4 34 14 50 9 S84 4 100 9"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.88}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
    </span>
  )
}
