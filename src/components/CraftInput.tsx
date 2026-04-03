import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'
import { craftFieldAppearanceClass, type CraftFieldAppearance } from '../lib/craftFieldAppearance'

export type CraftInputProps = ComponentPropsWithoutRef<'input'> & {
  /** `paper` = debossed cream field (pressed-into-paper look). */
  appearance?: CraftFieldAppearance
}

export const CraftInput = forwardRef<HTMLInputElement, CraftInputProps>(function CraftInput(
  { className, type = 'text', appearance = 'default', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'craft-input-field ring-offset-craft-paper',
        craftFieldAppearanceClass(appearance),
        className,
      )}
      {...props}
    />
  )
})
