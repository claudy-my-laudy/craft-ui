import type { Meta, StoryObj } from '@storybook/react'

import { CraftBadge } from './components/CraftBadge'
import { CraftButton } from './components/CraftButton'
import { RopeFrame } from './components/RopeFrame'

const meta = {
  title: 'Craft/RopeFrame',
  component: RopeFrame,
  tags: ['autodocs'],
} satisfies Meta<typeof RopeFrame>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <CraftBadge>inside the rope</CraftBadge>
        <p className="font-craftSans text-craft-muted text-sm leading-relaxed">
          The outer band uses layered diagonals to suggest twisted jute — no bitmap required.
        </p>
        <CraftButton crayon="green">nice</CraftButton>
      </div>
    ),
  },
}
