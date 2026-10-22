// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://otomatelabs.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Keep the legacy markup byte-for-byte; whitespace between inline elements affects layout.
  compressHTML: false,
});
