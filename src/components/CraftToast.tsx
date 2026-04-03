import { type ComponentPropsWithoutRef, type ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '../lib/cn'

export type CraftToastProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  /** ms; `0` disables auto-dismiss */
  duration?: number
  title?: ReactNode
}

/** Fixed “sticky note” toast; portals to `document.body`. */
export function CraftToast({
  open,
  onOpenChange,
  children,
  duration = 4800,
  title,
  className,
  ...props
}: CraftToastProps) {
  useEffect(() => {
    if (!open || duration <= 0) return
    const t = window.setTimeout(() => onOpenChange(false), duration)
    return () => window.clearTimeout(t)
  }, [open, duration, onOpenChange])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className={cn(
        'craft-toast-enter pointer-events-auto fixed bottom-4 right-4 z-[2000] max-w-sm',
        className,
      )}
      {...props}
    >
      <div
        role="status"
        className={cn(
          'rounded-sm border-2 border-black/18 bg-craft-yellow px-4 py-3 font-craftSans text-craft-ink shadow-craft-paper-lg',
          'ring-1 ring-white/40',
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {title != null ? (
              <p className="font-craft text-xl font-semibold leading-tight text-craft-ink">{title}</p>
            ) : null}
            <div className={cn(title != null && 'mt-1 text-sm')}>{children}</div>
          </div>
          <button
            type="button"
            className={cn(
              'shrink-0 rounded-md border-2 border-craft-ink/20 bg-white/80 px-2 py-0.5',
              'font-craft text-lg leading-none text-craft-ink shadow-eraser',
              'hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-craft-orange/50',
            )}
            aria-label="Dismiss notification"
            onClick={() => onOpenChange(false)}
          >
            ×
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
