import type { Meta, StoryObj } from '@storybook/react'

import { CraftAvatar } from './components/CraftAvatar'
import { CraftCard } from './components/CraftCard'
import { CraftList, CraftListItem } from './components/CraftList'
import { CraftPaperClip } from './components/CraftPaperClip'
import {
  CraftTable,
  CraftTableBody,
  CraftTableCaption,
  CraftTableCell,
  CraftTableFooter,
  CraftTableHeadCell,
  CraftTableHeader,
  CraftTableRow,
} from './components/CraftTable'
import { CraftProvider } from './components/CraftProvider'

const meta = {
  title: 'Craft/Phase 6 data display',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const ListsAndPins: Story = {
  render: () => (
    <CraftProvider vibe="scrapbook">
      <div className="mx-auto grid max-w-2xl gap-10 md:grid-cols-2">
        <CraftCard className="p-5">
          <p className="mb-3 font-craft text-lg font-semibold">Pushpins</p>
          <CraftList marker="pushpin">
            <CraftListItem>Snip ribbon for the bunting</CraftListItem>
            <CraftListItem>Blend washi on the envelope flap</CraftListItem>
            <CraftListItem>Stamp date in soft ink</CraftListItem>
          </CraftList>
        </CraftCard>
        <CraftCard className="p-5">
          <p className="mb-3 font-craft text-lg font-semibold">Dots & numbers</p>
          <CraftList marker="dot" className="mb-5">
            <CraftListItem>Dot bullet row one</CraftListItem>
            <CraftListItem>Dot bullet row two</CraftListItem>
          </CraftList>
          <CraftList marker="numbered" ordered>
            <CraftListItem>First step on the list</CraftListItem>
            <CraftListItem>Second step — still Caveat</CraftListItem>
            <CraftListItem>Third step</CraftListItem>
          </CraftList>
        </CraftCard>
      </div>
    </CraftProvider>
  ),
}

export const PaperClips: Story = {
  render: () => (
    <CraftCard className="mx-auto max-w-lg space-y-8 bg-craft-ink p-6">
      <div className="rounded-lg bg-craft-paper/95 p-4 ring-1 ring-black/10">
        <p className="mb-4 font-craft text-lg font-semibold text-craft-ink">Gem clips</p>
        <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
          <CraftPaperClip tone="blue" size={34} />
          <CraftPaperClip tone="yellow" size={34} />
          <CraftPaperClip tone="red" size={34} />
          <CraftPaperClip tone="green" size={34} />
          <CraftPaperClip tone="silver" size={34} />
        </div>
      </div>
      <div className="rounded-lg bg-craft-paper/95 p-4 ring-1 ring-black/10">
        <p className="mb-3 font-craft text-lg font-semibold text-craft-ink">List with clips</p>
        <CraftList marker="none">
          <CraftListItem className="flex items-start gap-2.5">
            <CraftPaperClip tone="blue" size={26} className="mt-0.5" />
            <span className="font-craftSans text-sm text-craft-ink">Receipts — Q1 collage budget</span>
          </CraftListItem>
          <CraftListItem className="flex items-start gap-2.5">
            <CraftPaperClip tone="pink" size={26} className="mt-0.5" />
            <span className="font-craftSans text-sm text-craft-ink">Polaroid corners + acid-free tabs</span>
          </CraftListItem>
          <CraftListItem className="flex items-start gap-2.5">
            <CraftPaperClip tone="lime" size={26} className="mt-0.5" />
            <span className="font-craftSans text-sm text-craft-ink">Garland sketch (pencil)</span>
          </CraftListItem>
        </CraftList>
      </div>
    </CraftCard>
  ),
}

export const Avatars: Story = {
  render: () => (
    <CraftCard className="mx-auto max-w-md space-y-4 p-6">
      <p className="font-craft text-lg font-semibold">CraftAvatar</p>
      <div className="flex flex-wrap items-end gap-4">
        <CraftAvatar alt="Jamie Paper" fallback="Jamie Paper" size="sm" crayon="pink" />
        <CraftAvatar alt="Alex Craft" fallback="Alex Craft" size="md" crayon="blue" />
        <CraftAvatar alt="Sam Studio" fallback="Sam Studio" size="lg" crayon="lime" shape="rounded" />
        <CraftAvatar
          alt="Bee on flower"
          fallback="Bee"
          size="md"
          crayon="yellow"
          src="https://picsum.photos/seed/craftui88/128/128"
        />
      </div>
    </CraftCard>
  ),
}

export const SupplyTable: Story = {
  render: () => (
    <CraftCard className="mx-auto max-w-3xl p-6">
      <CraftTable>
        <CraftTableCaption>Desk supply inventory — April</CraftTableCaption>
        <CraftTableHeader>
          <CraftTableRow>
            <CraftTableHeadCell>Item</CraftTableHeadCell>
            <CraftTableHeadCell className="text-right">Qty</CraftTableHeadCell>
            <CraftTableHeadCell>Notes</CraftTableHeadCell>
          </CraftTableRow>
        </CraftTableHeader>
        <CraftTableBody>
          <CraftTableRow>
            <CraftTableCell className="font-craftMarker font-medium">Washi sampler</CraftTableCell>
            <CraftTableCell className="text-right tabular-nums">12</CraftTableCell>
            <CraftTableCell>Muted pastels</CraftTableCell>
          </CraftTableRow>
          <CraftTableRow>
            <CraftTableCell className="font-craftMarker font-medium">Glue sticks</CraftTableCell>
            <CraftTableCell className="text-right tabular-nums">6</CraftTableCell>
            <CraftTableCell>Reorder at 2</CraftTableCell>
          </CraftTableRow>
          <CraftTableRow>
            <CraftTableCell className="font-craftMarker font-medium">Twine spools</CraftTableCell>
            <CraftTableCell className="text-right tabular-nums">3</CraftTableCell>
            <CraftTableCell>Natural jute</CraftTableCell>
          </CraftTableRow>
        </CraftTableBody>
        <CraftTableFooter>
          <CraftTableRow>
            <CraftTableCell colSpan={2} className="font-craftSans text-craft-muted">
              Total SKUs
            </CraftTableCell>
            <CraftTableCell className="tabular-nums">3</CraftTableCell>
          </CraftTableRow>
        </CraftTableFooter>
      </CraftTable>
    </CraftCard>
  ),
}
