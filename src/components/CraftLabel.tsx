import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'

export type CraftLabelProps = ComponentPropsWithoutRef<'label'> & {
  /** Shows a small star dab for required fields */
  required?: boolean
}

export const CraftLabel = forwardRef<HTMLLabelElement, CraftLabelProps>(function CraftLabel(
  { className, children, required, ...props },
  ref,
) {
  return (
    <label
      ref={ref}
      className={cn(
        'inline-flex flex-wrap items-baseline gap-1 font-craftMarker text-lg font-semibold text-craft-ink',
        className,
      )}
      {...props}
    >
      {children}
      {required ? (
        <span className="font-craft text-craft-red" title="Required" aria-hidden>
          *
        </span>
      ) : null}
    </label>
  )
})
