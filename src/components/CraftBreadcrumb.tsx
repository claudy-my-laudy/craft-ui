import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '../lib/cn'

export type CraftBreadcrumbProps = ComponentPropsWithoutRef<'nav'>

export function CraftBreadcrumb({ className, ...props }: CraftBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('font-craftSans text-sm text-craft-muted', className)} {...props} />
  )
}

export type CraftBreadcrumbListProps = ComponentPropsWithoutRef<'ol'>

export function CraftBreadcrumbList({ className, ...props }: CraftBreadcrumbListProps) {
  return (
    <ol
      className={cn('flex flex-wrap items-center gap-x-1 gap-y-0.5', className)}
      {...props}
    />
  )
}

export type CraftBreadcrumbItemProps = ComponentPropsWithoutRef<'li'>

export function CraftBreadcrumbItem({ className, ...props }: CraftBreadcrumbItemProps) {
  return <li className={cn('inline-flex items-center', className)} {...props} />
}

export type CraftBreadcrumbLinkProps = ComponentPropsWithoutRef<'a'>

export function CraftBreadcrumbLink({ className, ...props }: CraftBreadcrumbLinkProps) {
  return (
    <a
      className={cn(
        'rounded-sm text-craft-muted decoration-craft-orange/45 underline-offset-2',
        'hover:text-craft-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-craft-orange/50',
        className,
      )}
      {...props}
    />
  )
}

export type CraftBreadcrumbPageProps = ComponentPropsWithoutRef<'span'>

/** Current page — renders `aria-current="page"` for the last crumb. */
export function CraftBreadcrumbPage({ className, ...props }: CraftBreadcrumbPageProps) {
  return (
    <span
      aria-current="page"
      className={cn('font-craft text-base font-semibold text-craft-ink', className)}
      {...props}
    />
  )
}

export type CraftBreadcrumbSeparatorProps = {
  className?: string
  /** Visual between crumbs; keep short for screen-reader silence via `aria-hidden` on the `li` wrapper */
  children?: ReactNode
}

/**
 * Place between items as its own `<li>`: `<CraftBreadcrumbItem aria-hidden><CraftBreadcrumbSeparator /></CraftBreadcrumbItem>`
 * or use the convenience {@link CraftBreadcrumbSepLi}.
 */
export function CraftBreadcrumbSeparator({
  className,
  children = '·',
}: CraftBreadcrumbSeparatorProps) {
  return (
    <span className={cn('mx-0.5 select-none text-craft-orange/70', className)} aria-hidden>
      {children}
    </span>
  )
}

/** Separator wrapped in a presentational list item (valid inside `<ol>`). */
export function CraftBreadcrumbSepLi({ children, className }: CraftBreadcrumbSeparatorProps) {
  return (
    <li className={cn('list-none', className)} aria-hidden role="presentation">
      <CraftBreadcrumbSeparator>{children}</CraftBreadcrumbSeparator>
    </li>
  )
}
