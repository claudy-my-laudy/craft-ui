import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'

export type CrayonDividerProps = Omit<ComponentPropsWithoutRef<'div'>, 'role'> & {
  /** Stroke color — Tailwind text-* utilities also work via currentColor */
  crayon?: 'ink' | 'muted' | 'pink' | 'orange'
}

const strokeClass = {
  ink: 'text-craft-ink',
  muted: 'text-craft-muted',
  pink: 'text-craft-pink',
  orange: 'text-craft-orange',
} as const

/**
 * Hand-drawn horizontal rule (wavy SVG stroke).
 */
export const CrayonDivider = forwardRef<HTMLDivElement, CrayonDividerProps>(function CrayonDivider(
  { className, crayon = 'ink', ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={cn('w-full py-2', strokeClass[crayon], className)}
      {...props}
    >
      <svg
        className="h-4 w-full overflow-visible"
        viewBox="0 0 400 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 9 C26 4 52 14 78 9 S130 4 156 9 S208 14 234 9 S286 4 312 9 S364 14 390 9 L400 9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.88}
        />
      </svg>
    </div>
  )
})
