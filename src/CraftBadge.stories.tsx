import type { Meta, StoryObj } from '@storybook/react'

import { CraftBadge } from './components/CraftBadge'

const meta = {
  title: 'Craft/CraftBadge',
  component: CraftBadge,
  tags: ['autodocs'],
} satisfies Meta<typeof CraftBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'L × W — 78cm × 56.5cm',
  },
}
