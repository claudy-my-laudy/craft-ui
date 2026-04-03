import { type ReactNode, useCallback, useEffect, useId, useRef, useState } from 'react'

import { cn } from '../lib/cn'
import { useClickOutside } from '../lib/useClickOutside'

export type CraftPopoverProps = {
  trigger: ReactNode
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  className?: string
  triggerClassName?: string
  contentClassName?: string
}

/**
 * Click-to-open anchored panel; closes on outside click and Escape.
 */
export function CraftPopover({
  trigger,
  children,
  open: openProp,
  onOpenChange,
  defaultOpen = false,
  className,
  triggerClassName,
  contentClassName,
}: CraftPopoverProps) {
  const uid = useId().replace(/:/g, '')
  const wrapRef = useRef<HTMLDivElement>(null)
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : innerOpen

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInnerOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  useClickOutside(wrapRef, () => setOpen(false), open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  return (
    <div ref={wrapRef} className={cn('relative inline-block', className)}>
      <button
        type="button"
        className={cn(
          'inline-flex cursor-pointer border-0 bg-transparent p-0 text-inherit',
          triggerClassName,
        )}
        aria-expanded={open}
        aria-controls={`craft-pop-${uid}`}
        onClick={() => setOpen(!open)}
      >
        {trigger}
      </button>
      {open ? (
        <div
          id={`craft-pop-${uid}`}
          role="dialog"
          aria-modal="false"
          className={cn(
            'absolute left-0 top-full z-[300] mt-2 min-w-[12rem] max-w-[min(100vw-1rem,20rem)]',
            'rounded-xl border-2 border-black/12 bg-white/92 p-3 shadow-craft-paper-lg',
            'ring-1 ring-black/10',
            contentClassName,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="font-craftSans text-sm text-craft-ink">{children}</div>
        </div>
      ) : null}
    </div>
  )
}
