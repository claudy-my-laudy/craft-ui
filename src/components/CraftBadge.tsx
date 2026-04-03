import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'

export type CraftBadgeProps = ComponentPropsWithoutRef<'span'>

/** High-contrast collage-style label tag. */
export const CraftBadge = forwardRef<HTMLSpanElement, CraftBadgeProps>(function CraftBadge(
  { className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-sm bg-craft-ink',
        'px-2 py-0.5 font-craft text-base font-semibold leading-tight text-white',
        className,
      )}
      {...props}
    />
  )
})
