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
      customCss: [
        './src/styles/custom.css',
      ],
      head: [
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap',
          },
        },
      ],
      expressiveCode: {
        themes: ['github-dark-dimmed', 'github-light'],
      },
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
