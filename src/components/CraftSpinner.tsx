import { type ComponentPropsWithoutRef } from 'react'

import { cn } from '../lib/cn'

export type CraftSpinnerProps = ComponentPropsWithoutRef<'div'> & {
  /** Visually hidden label for assistive tech */
  label?: string
}

/** Indeterminate ring — slows under `prefers-reduced-motion`. */
export function CraftSpinner({ className, label = 'Loading', ...props }: CraftSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
    >
      <span className="sr-only">{label}</span>
      <svg
        className="h-9 w-9 motion-safe:animate-spin text-craft-orange motion-reduce:animate-none motion-reduce:opacity-75"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle
          className="opacity-30"
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <path
          d="M21 12a9 9 0 00-9-9"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
