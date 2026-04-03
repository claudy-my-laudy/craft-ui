import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'

export type CraftTagProps = ComponentPropsWithoutRef<'div'> & {
  /** Override background; defaults to token gradient */
  variant?: 'gradient' | 'paper'
}

/**
 * Soft translucent label — dimension stickers, handwritten captions.
 */
export const CraftTag = forwardRef<HTMLDivElement, CraftTagProps>(function CraftTag(
  { className, variant = 'gradient', ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex flex-col gap-0.5 rounded-md px-3 py-2',
        'border border-black/10 font-craft text-lg font-semibold text-craft-ink shadow-craft-paper',
        'backdrop-blur-[2px]',
        variant === 'gradient' && '[background-image:var(--craft-tag-gradient)]',
        variant === 'paper' && 'craft-paper-base',
        className,
      )}
      {...props}
    />
  )
})
