import type { Meta, StoryObj } from '@storybook/react'

import {
  CraftBreadcrumb,
  CraftBreadcrumbItem,
  CraftBreadcrumbLink,
  CraftBreadcrumbList,
  CraftBreadcrumbPage,
  CraftBreadcrumbSepLi,
} from './components/CraftBreadcrumb'
import { CraftCard } from './components/CraftCard'
import { CraftTabs } from './components/CraftTabs'

const meta = {
  title: 'Craft/Phase 4 navigation',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const TabsStickyNotes: Story = {
  render: () => (
    <CraftCard className="max-w-xl">
      <CraftTabs
        defaultValue="notes"
        items={[
          {
            value: 'notes',
            label: 'Notes',
            content: (
              <p className="font-craftSans text-sm text-craft-muted">
                Arrow keys, Home, and End move between tabs. Active tab lifts like a sticky.
              </p>
            ),
          },
          {
            value: 'photos',
            label: 'Photos',
            content: <p className="font-craftSans text-sm text-craft-muted">Snapshots from the desk.</p>,
          },
          {
            value: 'archive',
            label: 'Archive',
            disabled: true,
            content: <p>Hidden</p>,
          },
        ]}
      />
    </CraftCard>
  ),
}

export const BreadcrumbTrail: Story = {
  render: () => (
    <CraftBreadcrumb>
      <CraftBreadcrumbList>
        <CraftBreadcrumbItem>
          <CraftBreadcrumbLink href="#">Studio</CraftBreadcrumbLink>
        </CraftBreadcrumbItem>
        <CraftBreadcrumbSepLi />
        <CraftBreadcrumbItem>
          <CraftBreadcrumbLink href="#">Projects</CraftBreadcrumbLink>
        </CraftBreadcrumbItem>
        <CraftBreadcrumbSepLi />
        <CraftBreadcrumbItem>
          <CraftBreadcrumbPage>Craft UI</CraftBreadcrumbPage>
        </CraftBreadcrumbItem>
      </CraftBreadcrumbList>
    </CraftBreadcrumb>
  ),
}
