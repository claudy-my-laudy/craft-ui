import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '../lib/cn'

export type CraftTableProps = ComponentPropsWithoutRef<'table'>

export const CraftTable = forwardRef<HTMLTableElement, CraftTableProps>(function CraftTable(
  { className, ...props },
  ref,
) {
  return (
    <div className="craft-table-wrap">
      <table ref={ref} className={cn('craft-table', className)} {...props} />
    </div>
  )
})

export type CraftTableCaptionProps = ComponentPropsWithoutRef<'caption'>

export const CraftTableCaption = forwardRef<HTMLTableCaptionElement, CraftTableCaptionProps>(
  function CraftTableCaption({ className, ...props }, ref) {
    return <caption ref={ref} className={cn('craft-table-caption', className)} {...props} />
  },
)

export type CraftTableHeaderProps = ComponentPropsWithoutRef<'thead'>

export const CraftTableHeader = forwardRef<HTMLTableSectionElement, CraftTableHeaderProps>(
  function CraftTableHeader({ className, ...props }, ref) {
    return <thead ref={ref} className={cn('craft-table-head', className)} {...props} />
  },
)

export type CraftTableBodyProps = ComponentPropsWithoutRef<'tbody'>

export const CraftTableBody = forwardRef<HTMLTableSectionElement, CraftTableBodyProps>(
  function CraftTableBody({ className, ...props }, ref) {
    return <tbody ref={ref} className={cn('craft-table-body', className)} {...props} />
  },
)

export type CraftTableFooterProps = ComponentPropsWithoutRef<'tfoot'>

export const CraftTableFooter = forwardRef<HTMLTableSectionElement, CraftTableFooterProps>(
  function CraftTableFooter({ className, ...props }, ref) {
    return (
      <tfoot
        ref={ref}
        className={cn('border-t-2 border-black/12 bg-craft-paper/70 font-craftSans text-sm', className)}
        {...props}
      />
    )
  },
)

export type CraftTableRowProps = ComponentPropsWithoutRef<'tr'>

export const CraftTableRow = forwardRef<HTMLTableRowElement, CraftTableRowProps>(
  function CraftTableRow({ className, ...props }, ref) {
    return <tr ref={ref} className={cn(className)} {...props} />
  },
)

export type CraftTableHeadCellProps = ComponentPropsWithoutRef<'th'>

export const CraftTableHeadCell = forwardRef<HTMLTableCellElement, CraftTableHeadCellProps>(
  function CraftTableHeadCell({ className, scope = 'col', ...props }, ref) {
    return <th ref={ref} className={cn(className)} scope={scope} {...props} />
  },
)

export type CraftTableCellProps = ComponentPropsWithoutRef<'td'>

export const CraftTableCell = forwardRef<HTMLTableCellElement, CraftTableCellProps>(
  function CraftTableCell({ className, ...props }, ref) {
    return <td ref={ref} className={cn('craft-table-cell', className)} {...props} />
  },
)
