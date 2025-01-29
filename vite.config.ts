import { defineConfig } from 'vitest/config'
import mkcert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Documentation - https://vitest.dev/guide/browser/config
export default defineConfig({
  plugins: [react(), mkcert()],
  base: '/scheduler-frontend/',
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/tests/setup.ts'],
    globals: true,
    browser: {
      enabled: true,
      instances: [
        {
          browser: 'chromium',
        }
      ],
    }
  }
});
