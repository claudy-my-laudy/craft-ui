import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'
import type { CraftCrayon } from './CraftCard'

export type CraftButtonVariant = 'clay' | 'eraser'

const variantClass: Record<CraftButtonVariant, string> = {
  clay: cn(
    'rounded-[1.75rem] border border-black/15',
    'shadow-clay',
    'transition-transform active:translate-y-px',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-craft-ink/40',
  ),
  eraser: cn(
    'rounded-xl border-2 border-craft-ink',
    'shadow-eraser',
    'transition-[transform,box-shadow]',
    'hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--craft-ink)]',
    'active:translate-x-px active:translate-y-px active:shadow-[2px_2px_0_0_var(--craft-ink)]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-craft-ink/50',
  ),
}

const crayonClass: Record<CraftCrayon, string> = {
  orange: 'bg-craft-orange text-white',
  green: 'bg-craft-green text-craft-ink',
  pink: 'bg-craft-pink text-white',
  yellow: 'bg-craft-yellow text-craft-ink',
  red: 'bg-craft-red text-white',
  blue: 'bg-craft-blue text-white',
  lime: 'bg-craft-lime text-craft-ink',
}

export type CraftButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: CraftButtonVariant
  crayon?: CraftCrayon
}

export const CraftButton = forwardRef<HTMLButtonElement, CraftButtonProps>(function CraftButton(
  { className, variant = 'clay', crayon = 'orange', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-5 py-2.5',
        'font-craft text-lg font-semibold leading-none tracking-wide',
        variantClass[variant],
        crayonClass[crayon],
        className,
      )}
      {...props}
    />
  )
})
