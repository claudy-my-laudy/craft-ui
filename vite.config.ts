import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(({ command }) => {
  // Storybook's Vite builder reuses this Vite config, so we need to avoid running
  // declaration bundling (`vite-plugin-dts`) during `build-storybook`.
  const isLibraryBuild = command === 'build'
  return {
    plugins: [
      react(),
      ...(isLibraryBuild
        ? [
            dts({
              include: ['src/**/*.{ts,tsx}'],
              exclude: ['src/**/*.stories.tsx'],
              rollupTypes: true,
            }),
          ]
        : []),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'CraftUI',
        formats: ['es', 'cjs'],
        fileName: 'craft-ui',
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          assetFileNames: 'craft-ui.[ext]',
        },
      },
    },
  }
})
