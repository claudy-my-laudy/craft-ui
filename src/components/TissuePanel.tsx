import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'

export type TissuePanelProps = ComponentPropsWithoutRef<'div'>

/**
 * Airy frosted panel — light overlays, inset regions, notification strips.
 */
export const TissuePanel = forwardRef<HTMLDivElement, TissuePanelProps>(function TissuePanel(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn('craft-tissue-panel rounded-xl p-4', className)} {...props} />
})
