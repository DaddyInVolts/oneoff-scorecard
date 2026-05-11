import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The built prototype is served at /oneoff-scorecard/prototype/
// (the spec page lives at /oneoff-scorecard/ — see the workflow that
// assembles the deployed _site from the spec + this build output).
export default defineConfig({
  plugins: [react()],
  base: '/oneoff-scorecard/prototype/',
})
