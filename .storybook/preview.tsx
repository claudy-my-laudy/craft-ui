import type { Preview } from '@storybook/react'

import { CraftProvider } from '../src/components/CraftProvider'

import '../src/index.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <CraftProvider vibe="scrapbook" className="min-h-[unset] p-6">
        <Story />
      </CraftProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'table',
      values: [
        { name: 'table', value: '#dccf9a' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
}

export default preview
