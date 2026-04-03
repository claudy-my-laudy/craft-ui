import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'
import { craftFieldAppearanceClass, type CraftFieldAppearance } from '../lib/craftFieldAppearance'

export type CraftSelectProps = ComponentPropsWithoutRef<'select'> & {
  appearance?: CraftFieldAppearance
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M5 8l5 5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Native `<select>` with paper field + chevron tab. */
export const CraftSelect = forwardRef<HTMLSelectElement, CraftSelectProps>(function CraftSelect(
  { className, children, appearance = 'default', ...props },
  ref,
) {
  return (
    <div className="relative w-full">
      <select
        ref={ref}
        className={cn(
          'craft-input-field appearance-none pr-10 ring-offset-craft-paper',
          craftFieldAppearanceClass(appearance),
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <Chevron className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-craft-muted" />
    </div>
  )
})
