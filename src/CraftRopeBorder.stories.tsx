import type { Meta, StoryObj } from '@storybook/react'
import { CraftProvider } from './components/CraftProvider'
import { CraftRopeBorder } from './components/CraftRopeBorder'

const meta: Meta<typeof CraftRopeBorder> = {
  title: 'Components / CraftRopeBorder',
  component: CraftRopeBorder,
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          background: '#2a1d10',
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.03) 3px,rgba(0,0,0,.03) 4px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '2.5rem',
          padding: '4rem 2rem',
        }}
      >
        <CraftProvider>
          <Story />
        </CraftProvider>
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof CraftRopeBorder>

const CardContent = ({ title, sub }: { title: string; sub: string }) => (
  <div style={{ padding: '20px 24px', fontFamily: 'Caveat, cursive' }}>
    <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#2e2418', marginBottom: 6 }}>{title}</div>
    <div style={{ fontSize: '1rem', lineHeight: 1.8, color: '#5a4a30' }}>{sub}</div>
  </div>
)

// ── Thickness variants ────────────────────────────────────────────────────────
export const Thicknesses: Story = {
  name: 'Thickness Variants',
  render: () => (
    <>
      {(['sm', 'md', 'lg'] as const).map((t) => (
        <CraftRopeBorder key={t} thickness={t} style={{ width: 220 }}>
          <CardContent title={`thickness="${t}"`} sub={t === 'sm' ? 'Delicate twine' : t === 'md' ? 'Standard jute rope' : 'Thick coarse rope'} />
        </CraftRopeBorder>
      ))}
    </>
  ),
}

// ── Rope variants ─────────────────────────────────────────────────────────────
export const Variants: Story = {
  name: 'Rope Variants',
  render: () => (
    <>
      <CraftRopeBorder variant="jute" style={{ width: 240 }}>
        <CardContent title="Jute" sub={'variant="jute"\nWarm tan, classic burlap'} />
      </CraftRopeBorder>
      <CraftRopeBorder variant="twine" style={{ width: 240 }}>
        <CardContent title="Twine" sub={'variant="twine"\nGolden-brown, tighter twist'} />
      </CraftRopeBorder>
      <CraftRopeBorder variant="hemp" style={{ width: 240 }}>
        <CardContent title="Hemp" sub={'variant="hemp"\nDarker grey-brown'} />
      </CraftRopeBorder>
    </>
  ),
}

// ── Notice board card ─────────────────────────────────────────────────────────
export const NoticeCard: Story = {
  name: 'Notice Card',
  render: () => (
    <CraftRopeBorder variant="jute" thickness="lg" radius={20} style={{ width: 360 }}>
      <div style={{ padding: '24px 28px', fontFamily: 'Caveat, cursive' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2e2418', marginBottom: 10 }}>
          📌 Notice Board
        </div>
        <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#5a4a30' }}>
          This card is bordered by hand-twisted jute rope. The strands braid over and
          under each other — no images, just SVG paths and sinusoidal math.
        </div>
        <div style={{ marginTop: 14, fontSize: '.9rem', color: '#8a6a3a' }}>
          — Posted by Zeth, Apr 2026
        </div>
      </div>
    </CraftRopeBorder>
  ),
}

// ── With kraft paper inside ───────────────────────────────────────────────────
export const KraftInside: Story = {
  name: 'Kraft Paper Inside',
  render: () => (
    <CraftRopeBorder
      variant="twine"
      thickness="md"
      contentClassName="craft-paper-kraft"
      style={{ width: 300 }}
    >
      <div style={{ padding: '20px 24px', fontFamily: 'Caveat, cursive' }}>
        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#2e1a00', marginBottom: 8 }}>
          Kraft + Twine
        </div>
        <div style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a2e00' }}>
          Golden twine rope around unbleached kraft paper. Very rugged.
        </div>
      </div>
    </CraftRopeBorder>
  ),
}
