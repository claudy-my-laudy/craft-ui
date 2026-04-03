import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'
import { craftFieldAppearanceClass, type CraftFieldAppearance } from '../lib/craftFieldAppearance'

export type CraftTextareaProps = ComponentPropsWithoutRef<'textarea'> & {
  appearance?: CraftFieldAppearance
}

export const CraftTextarea = forwardRef<HTMLTextAreaElement, CraftTextareaProps>(function CraftTextarea(
  { className, rows = 4, appearance = 'default', ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'craft-input-field ring-offset-craft-paper min-h-[6rem] resize-y',
        craftFieldAppearanceClass(appearance),
        className,
      )}
      {...props}
    />
  )
})
