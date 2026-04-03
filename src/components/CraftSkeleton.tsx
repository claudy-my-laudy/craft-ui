import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'

export type CraftSkeletonProps = ComponentPropsWithoutRef<'div'>

/** Paper-toned pulse block — size via `className` (e.g. `h-24 w-full`). */
export const CraftSkeleton = forwardRef<HTMLDivElement, CraftSkeletonProps>(function CraftSkeleton(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'rounded-lg bg-craft-paper bg-[image:var(--craft-paper-noise)]',
        'bg-blend-multiply motion-safe:animate-pulse motion-reduce:animate-none',
        className,
      )}
      {...props}
    />
  )
})
