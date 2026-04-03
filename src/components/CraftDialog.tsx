import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from 'react'

import { cn } from '../lib/cn'

export type CraftDialogProps = Omit<ComponentPropsWithoutRef<'dialog'>, 'open'> & {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: ReactNode
  description?: ReactNode
  footer?: ReactNode
}

/** Native `<dialog>` modal + craft paper body; backdrop click and Escape close. */
export const CraftDialog = forwardRef<HTMLDialogElement, CraftDialogProps>(function CraftDialog(
  { open, onOpenChange, title, description, footer, className, children, ...props },
  ref,
) {
  const innerRef = useRef<HTMLDialogElement>(null)
  useImperativeHandle(ref, () => innerRef.current as HTMLDialogElement)

  const titleId = useId().replace(/:/g, '')
  const descId = useId().replace(/:/g, '')

  useEffect(() => {
    const d = innerRef.current
    if (!d) return
    if (open) {
      if (!d.open) d.showModal()
    } else if (d.open) {
      d.close()
    }
  }, [open])

  useEffect(() => {
    const d = innerRef.current
    if (!d) return
    const onClose = () => onOpenChange(false)
    d.addEventListener('close', onClose)
    return () => d.removeEventListener('close', onClose)
  }, [onOpenChange])

  return (
    <dialog
      ref={innerRef}
      aria-labelledby={title != null ? `craft-dlg-t-${titleId}` : undefined}
      aria-describedby={description != null ? `craft-dlg-d-${descId}` : undefined}
      className={cn(
        'craft-dialog max-h-[90dvh] max-w-[min(100%,36rem)] overflow-visible rounded-2xl p-0',
        'border-0 bg-transparent shadow-none',
        className,
      )}
      onCancel={(e) => {
        e.preventDefault()
        onOpenChange(false)
        innerRef.current?.close()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onOpenChange(false)
          innerRef.current?.close()
        }
      }}
      {...props}
    >
      <div
        className="craft-paper-surface-lg max-h-[inherit] overflow-y-auto rounded-2xl p-6 ring-1 ring-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        {title != null ? (
          <h2 id={`craft-dlg-t-${titleId}`} className="font-craft text-2xl text-craft-ink">
            {title}
          </h2>
        ) : null}
        {description != null ? (
          <p id={`craft-dlg-d-${descId}`} className="font-craftSans mt-1 text-sm text-craft-muted">
            {description}
          </p>
        ) : null}
        <div className={cn((title != null || description != null) && 'mt-4')}>{children}</div>
        {footer != null ? <div className="mt-6 flex flex-wrap justify-end gap-2">{footer}</div> : null}
      </div>
    </dialog>
  )
})
