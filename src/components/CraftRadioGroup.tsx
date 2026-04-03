import { type ComponentPropsWithoutRef, type ReactNode, useId } from 'react'

import { cn } from '../lib/cn'

export type CraftRadioGroupProps = ComponentPropsWithoutRef<'div'> & {
  /** Accessible name for the group */
  label?: ReactNode
}

/**
 * `role="radiogroup"` wrapper — pair with {@link CraftRadio} sharing the same `name`.
 */
export function CraftRadioGroup({ className, label, children, ...props }: CraftRadioGroupProps) {
  const uid = useId()
  const labelId = label ? `craft-rg-${uid.replace(/:/g, '')}` : undefined

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelId}
      className={cn('space-y-2', className)}
      {...props}
    >
      {label ? (
        <div id={labelId} className="font-craft text-lg font-semibold text-craft-ink">
          {label}
        </div>
      ) : null}
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}
