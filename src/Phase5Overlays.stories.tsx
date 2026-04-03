import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { CraftAlert } from './components/CraftAlert'
import { CraftButton } from './components/CraftButton'
import { CraftDialog } from './components/CraftDialog'
import { CraftPopover } from './components/CraftPopover'
import { CraftProgress } from './components/CraftProgress'
import { CraftSkeleton } from './components/CraftSkeleton'
import { CraftSpinner } from './components/CraftSpinner'
import { CraftToast } from './components/CraftToast'
import { CraftTooltip } from './components/CraftTooltip'

const meta = {
  title: 'Craft/Phase 5 overlays',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const TooltipAndPopover: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <CraftTooltip content="Hand-cut tooltip tag">
        <CraftButton variant="clay" crayon="pink">
          Hover me
        </CraftButton>
      </CraftTooltip>
      <CraftPopover
        trigger={<CraftButton variant="eraser" crayon="blue">Open popover pop-papercraft</CraftButton>}
      >
        <p>Pin this copy next to the trigger — click outside or Escape closes.</p>
      </CraftPopover>
    </div>
  ),
}

export const Dialog: Story = {
  render: function DialogDemo() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <CraftButton variant="clay" crayon="orange" onClick={() => setOpen(true)}>
          Open dialog
        </CraftButton>
        <CraftDialog
          open={open}
          onOpenChange={setOpen}
          title="Paper modal"
          description="Native dialog element — focus trap and backdrop included."
          footer={
            <>
              <CraftButton variant="clay" crayon="yellow" onClick={() => setOpen(false)}>
                Later
              </CraftButton>
              <CraftButton variant="eraser" crayon="green" onClick={() => setOpen(false)}>
                OK
              </CraftButton>
            </>
          }
        >
          <p className="font-craftSans text-sm text-craft-muted">
            Click the scrim or press Escape to dismiss.
          </p>
        </CraftDialog>
      </>
    )
  },
}

export const AlertAndProgress: Story = {
  render: () => (
    <div className="mx-auto flex max-w-lg flex-col gap-4">
      <CraftAlert tone="success" live>
        Saved — your collage synced to the desk cloud.
      </CraftAlert>
      <CraftAlert tone="warning">Glue is still wet; wait 5 minutes.</CraftAlert>
      <div className="space-y-3 font-craftSans text-xs text-craft-muted">
        <p className="font-craft text-sm text-craft-ink">Progress — washi fill</p>
        <CraftProgress value={66} crayon="pink" washiPattern="stripes" />
        <CraftProgress value={40} crayon="blue" washiPattern="dots" />
        <CraftProgress value={88} crayon="lime" washiPattern="plain" />
      </div>
    </div>
  ),
}

export const ToastSpinnerSkeleton: Story = {
  render: function Tss() {
    const [toastOpen, setToastOpen] = useState(false)
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <CraftButton variant="clay" crayon="lime" onClick={() => setToastOpen(true)}>
            Show toast
          </CraftButton>
          <CraftSpinner />
        </div>
        <div className="space-y-2">
          <CraftSkeleton className="h-4 w-full" />
          <CraftSkeleton className="h-4 w-[80%]" />
          <CraftSkeleton className="h-20 w-full" />
        </div>
        <CraftToast open={toastOpen} onOpenChange={setToastOpen} title="Snipped">
          Your export landed in Downloads.
        </CraftToast>
      </div>
    )
  },
}
