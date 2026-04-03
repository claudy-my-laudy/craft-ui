import { type ComponentPropsWithoutRef } from 'react'

import { cn } from '../lib/cn'

export type CraftVibe = 'default' | 'scrapbook'

export type CraftProviderProps = ComponentPropsWithoutRef<'div'> & {
  /** Sets `data-theme` — scoped token hook for future dark / alt themes. */
  theme?: string
  /**
   * `scrapbook` — sunnier paper yellow, stronger fiber grain, twine-forward neutrals
   * (handmade card / desk collage vibe).
   */
  vibe?: CraftVibe
}

/** Root wrapper: theme + optional scrapbook vibe, base typography. */
export function CraftProvider({
  className,
  theme = 'craft',
  vibe = 'default',
  children,
  ...props
}: CraftProviderProps) {
  return (
    <div
      data-theme={theme}
      data-craft-vibe={vibe === 'scrapbook' ? 'scrapbook' : undefined}
      className={cn('craft-ui min-h-full font-craftSans text-craft-ink antialiased', className)}
      {...props}
    >
      {children}
    </div>
  )
}
