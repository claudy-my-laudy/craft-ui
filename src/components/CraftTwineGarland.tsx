import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '../lib/cn'

export type CraftTwineGarlandProps = ComponentPropsWithoutRef<'div'> & {
  /** Letters / chips; laid out along a loose twine curve */
  children: ReactNode
}

/**
 * Loose “U” twine behind children — scrapbook bunting hanger.
 * Pair with {@link CraftLetterChip} and {@link CraftProvider} `vibe="scrapbook"`.
 */
export function CraftTwineGarland({ className, children, ...props }: CraftTwineGarlandProps) {
  return (
    <div
      className={cn('relative inline-flex min-w-[16rem] max-w-full flex-col items-center', className)}
      {...props}
    >
      <svg
        className="pointer-events-none absolute inset-x-0 top-1 h-[4.25rem] w-full text-craft-twine"
        viewBox="0 0 320 72"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M 12 52 Q 160 2 308 52"
          stroke="rgb(0 0 0 / 0.15)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M 12 50 Q 160 0 308 50"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 12 50 Q 160 0 308 50"
          stroke="rgb(255 255 255 / 0.2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform="translate(0 -1.5)"
        />
      </svg>
      <div className="relative z-[1] flex flex-wrap items-start justify-center gap-1.5 px-4 pb-1 pt-12">
        {children}
      </div>
    </div>
  )
}
