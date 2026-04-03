import { type ComponentPropsWithoutRef, type Ref, forwardRef } from 'react'

import { cn } from '../lib/cn'

export type CraftListMarker = 'pushpin' | 'dot' | 'numbered' | 'none'

export type CraftListProps = Omit<ComponentPropsWithoutRef<'ul'>, 'type'> & {
  /** Use `<ol>` when sequence is meaningful for assistive tech. */
  ordered?: boolean
  /** `pushpin` | `dot` | `numbered` | `none` (pair rows with {@link CraftPaperClip} etc.) */
  marker?: CraftListMarker
}

export const CraftList = forwardRef<HTMLUListElement | HTMLOListElement, CraftListProps>(
  function CraftList({ ordered = false, marker = 'pushpin', className, ...props }, ref) {
    const rootClass = cn(
      'craft-list',
      marker === 'pushpin' && 'craft-list--pushpin',
      marker === 'dot' && 'craft-list--dot',
      marker === 'numbered' && 'craft-list--numbered',
      marker === 'none' && 'craft-list--none',
      className,
    )

    if (ordered) {
      return <ol ref={ref as Ref<HTMLOListElement>} className={rootClass} {...props} />
    }

    return <ul ref={ref as Ref<HTMLUListElement>} className={rootClass} {...props} />
  },
)

export type CraftListItemProps = ComponentPropsWithoutRef<'li'>

/** List row — use direct children of {@link CraftList} for marker pseudo-elements to apply. */
export const CraftListItem = forwardRef<HTMLLIElement, CraftListItemProps>(function CraftListItem(
  { className, ...props },
  ref,
) {
  return <li ref={ref} className={cn(className)} {...props} />
})
