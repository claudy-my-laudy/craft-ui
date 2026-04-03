import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'

export type CraftAlertTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

const toneClass: Record<CraftAlertTone, string> = {
  neutral: 'border-black/12 bg-craft-paper/95 text-craft-ink',
  info: 'border-craft-blue/30 bg-craft-blue/15 text-craft-ink',
  success: 'border-craft-green/35 bg-craft-green/18 text-craft-ink',
  warning: 'border-craft-yellow/40 bg-craft-yellow/22 text-craft-ink',
  danger: 'border-craft-red/35 bg-craft-red/15 text-craft-ink',
}

export type CraftAlertProps = ComponentPropsWithoutRef<'div'> & {
  tone?: CraftAlertTone
  /** Adds `role="alert"` for time-sensitive messages */
  live?: boolean
}

export const CraftAlert = forwardRef<HTMLDivElement, CraftAlertProps>(function CraftAlert(
  { className, tone = 'neutral', live = false, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role={live ? 'alert' : 'status'}
      className={cn(
        'rounded-xl border-2 px-4 py-3 font-craftSans text-sm leading-relaxed shadow-craft-paper',
        toneClass[tone],
        className,
      )}
      {...props}
    />
  )
})
