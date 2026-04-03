import type { Meta, StoryObj } from '@storybook/react'

import { CraftCard } from './components/CraftCard'
import { CraftBadge } from './components/CraftBadge'

const meta = {
  title: 'Craft/CraftCard',
  component: CraftCard,
  tags: ['autodocs'],
} satisfies Meta<typeof CraftCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <CraftBadge className="mb-3">handmade</CraftBadge>
        <p className="font-craftSans text-craft-muted text-sm leading-relaxed">
          Paper grain, soft lift, optional crayon tint — like dyed fiber on a sheet.
        </p>
      </>
    ),
  },
}

export const LargeElevation: Story = {
  args: {
    elevation: 'lg',
    children: <p className="font-craft text-2xl text-craft-ink">Lifted a little higher.</p>,
  },
}

export const TintedOrange: Story = {
  args: {
    tint: 'orange',
    children: <p className="font-craftSans">Terracotta wash over the paper.</p>,
  },
}

export const PastedOnSheet: Story = {
  args: {
    lift: 'paste',
    children: (
      <p className="font-craftSans text-sm text-craft-muted">
        Foam-dot shadow + slight tilt — reads like a square pasted on the big yellow sheet.
      </p>
    ),
  },
}

export const AllTints: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
      {(['orange', 'green', 'pink', 'yellow', 'red', 'blue', 'lime'] as const).map((t) => (
        <CraftCard key={t} tint={t} className="text-center font-craft text-xl capitalize">
          {t}
        </CraftCard>
      ))}
    </div>
  ),
}
