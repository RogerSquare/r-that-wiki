// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://wiki.r-that.com',
  integrations: [
    starlight({
      title: 'rog-wiki',
      description: 'Deep-dive entries on components, patterns, and code snippets.',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/RogerSquare/rog-wiki' },
      ],
      sidebar: [
        { label: 'Components', autogenerate: { directory: 'components' } },
        { label: 'Patterns', autogenerate: { directory: 'patterns' } },
        { label: 'Snippets', autogenerate: { directory: 'snippets' } },
        { label: 'Projects', autogenerate: { directory: 'projects' } },
        { label: 'Meta', autogenerate: { directory: 'meta' } },
      ],
    }),
    react(),
  ],
});
