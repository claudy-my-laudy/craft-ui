import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'

export type RopeFrameProps = ComponentPropsWithoutRef<'div'> & {
  /** Padding inside the rope border (paper inset). */
  contentClassName?: string
}

/**
 * Rope frame: **diagonal stripe gradients** (warm tan / jute) — the original simple look.
 * Tune with `--craft-rope-band` and `--craft-rope-outer-r` on this element or a parent.
 */
export const RopeFrame = forwardRef<HTMLDivElement, RopeFrameProps>(function RopeFrame(
  { className, contentClassName, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('craft-rope-frame', className)} {...props}>
      <div className={cn('craft-rope-inner', contentClassName)}>{children}</div>
    </div>
  )
})
