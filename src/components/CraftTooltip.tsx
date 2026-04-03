import { type ReactNode, useCallback, useId, useRef, useState } from 'react'

import { cn } from '../lib/cn'

export type CraftTooltipProps = {
  /** Tooltip copy */
  content: ReactNode
  /** Trigger element(s) */
  children: ReactNode
  /** `top` places bubble above trigger */
  side?: 'top' | 'bottom'
  className?: string
  /** Wrapper around trigger */
  triggerClassName?: string
}

/** Hover + focus-within tag; keep triggers focusable for keyboard users. */
export function CraftTooltip({
  content,
  children,
  side = 'top',
  triggerClassName,
  className,
}: CraftTooltipProps) {
  const [open, setOpen] = useState(false)
  const hideT = useRef<ReturnType<typeof setTimeout> | null>(null)
  const id = useId().replace(/:/g, '')

  const clearHide = useCallback(() => {
    if (hideT.current) clearTimeout(hideT.current)
    hideT.current = null
  }, [])

  const show = useCallback(() => {
    clearHide()
    setOpen(true)
  }, [clearHide])

  const hide = useCallback(() => {
    clearHide()
    hideT.current = setTimeout(() => setOpen(false), 80)
  }, [clearHide])

  return (
    <span
      className={cn('relative inline-flex', triggerClassName)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={hide}
    >
      {children}
      {open ? (
        <span
          id={`craft-tip-${id}`}
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-[200] max-w-[16rem] rounded-md border border-black/15',
            'bg-craft-ink px-2.5 py-1 font-craftSans text-sm leading-snug text-white shadow-craft-paper',
            'ring-1 ring-white/15',
            side === 'top' ? 'bottom-full left-1/2 mb-1.5 -translate-x-1/2' : 'top-full left-1/2 mt-1.5 -translate-x-1/2',
            className,
          )}
        >
          {content}
        </span>
      ) : null}
    </span>
  )
}
