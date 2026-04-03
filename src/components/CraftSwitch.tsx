import { type ComponentPropsWithoutRef, forwardRef, useCallback, useState } from 'react'

import { cn } from '../lib/cn'

export type CraftSwitchProps = Omit<ComponentPropsWithoutRef<'button'>, 'type' | 'role'> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

/** Squishy clay thumb on a matte track — supports controlled + uncontrolled. */
export const CraftSwitch = forwardRef<HTMLButtonElement, CraftSwitchProps>(function CraftSwitch(
  { className, checked, defaultChecked = false, onCheckedChange, disabled, ...props },
  ref,
) {
  const [inner, setInner] = useState(defaultChecked)
  const isControlled = checked !== undefined
  const on = isControlled ? Boolean(checked) : inner

  const toggle = useCallback(() => {
    if (disabled) return
    const next = !on
    if (!isControlled) setInner(next)
    onCheckedChange?.(next)
  }, [disabled, isControlled, on, onCheckedChange])

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        'relative h-9 w-[3.25rem] shrink-0 rounded-full border-2 border-black/18',
        'bg-craft-paper/90 shadow-inner transition-colors',
        on && 'border-craft-orange/45 bg-craft-orange/20',
        disabled && 'cursor-not-allowed opacity-50',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-craft-orange/60',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'absolute top-1 left-1 h-6 w-6 rounded-full border border-black/12',
          'bg-gradient-to-b from-white to-craft-yellow/85 shadow-clay transition-transform duration-200 ease-out',
          on && 'translate-x-[1.25rem]',
        )}
        aria-hidden
      />
    </button>
  )
})
