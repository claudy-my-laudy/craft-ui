import { type ComponentPropsWithoutRef, type ReactNode, forwardRef, useId } from 'react'

import { cn } from '../lib/cn'

export type CraftCheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  /** Visible label (also sets `htmlFor` wiring) */
  label?: ReactNode
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3 8.5L6.5 12L13 4.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Chunky eraser-style checkbox; input stays focusable (sr-only). */
export const CraftCheckbox = forwardRef<HTMLInputElement, CraftCheckboxProps>(function CraftCheckbox(
  { className, id, label, children, disabled, ...props },
  ref,
) {
  const uid = useId()
  const inputId = id ?? `craft-cb-${uid}`

  const caption = label ?? children

  return (
    <label
      className={cn(
        'inline-flex cursor-pointer items-center gap-2.5',
        disabled && 'cursor-not-allowed opacity-55',
        className,
      )}
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        disabled={disabled}
        className="peer sr-only"
        {...props}
      />
      <span
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 border-craft-ink',
          'bg-craft-yellow/90 text-craft-ink shadow-eraser',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-craft-orange peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-craft-paper',
          'peer-disabled:shadow-none',
          'peer-checked:bg-craft-pink peer-checked:text-white',
          '[&>svg]:hidden peer-checked:[&>svg]:block',
        )}
        aria-hidden
      >
        <CheckIcon className="h-4 w-4" />
      </span>
      {caption ? (
        <span className={cn('font-craftSans text-sm text-craft-ink', disabled && 'text-craft-muted')}>
          {caption}
        </span>
      ) : null}
    </label>
  )
})
