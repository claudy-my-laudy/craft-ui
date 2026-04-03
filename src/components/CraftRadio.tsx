import { type ComponentPropsWithoutRef, type ReactNode, forwardRef, useId } from 'react'

import { cn } from '../lib/cn'

export type CraftRadioProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  label?: ReactNode
}

/**
 * Square tile with blue diagonal hatch and a centered circle — **selected** fills the circle
 * with orange; **unselected** leaves it empty (cream), like a hand-drawn radio tile.
 */
export const CraftRadio = forwardRef<HTMLInputElement, CraftRadioProps>(function CraftRadio(
  { className, id, label, children, disabled, name, ...props },
  ref,
) {
  const uid = useId()
  const inputId = id ?? `craft-radio-${uid}`

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
        type="radio"
        name={name}
        disabled={disabled}
        className="peer sr-only"
        {...props}
      />
      <span
        className={cn(
          'craft-radio-sketch-box relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-sm border-2 border-craft-ink',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-craft-orange peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-craft-paper',
          'peer-checked:[&>span.craft-radio-inner]:bg-craft-orange',
        )}
        aria-hidden
      >
        <span className="craft-radio-sketch-hatch pointer-events-none absolute inset-0 rounded-sm" />
        <span
          className={cn(
            'craft-radio-inner relative z-[1] box-border min-h-[1.125rem] min-w-[1.125rem] rounded-full border-2 border-craft-ink',
            'h-[58%] w-[58%] bg-[rgb(255_252_246)] transition-[background-color] duration-150',
          )}
        />
      </span>
      {caption ? (
        <span className={cn('font-craftSans text-sm text-craft-ink', disabled && 'text-craft-muted')}>
          {caption}
        </span>
      ) : null}
    </label>
  )
})
