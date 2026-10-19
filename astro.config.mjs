// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Set this to the production URL (e.g. 'https://example.com') so canonical
  // and Open Graph URLs are generated. Left unset until the domain is known.
  // site: 'https://example.com',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
