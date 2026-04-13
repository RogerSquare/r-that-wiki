// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://wiki.r-that.com',
  integrations: [
    starlight({
      title: 'R-That Wiki',
      description: 'Deep-dive entries on components, patterns, and code snippets.',
      logo: {
        dark: './src/assets/logo-dark.svg',
        light: './src/assets/logo-light.svg',
        replacesTitle: true,
      },
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
        { icon: 'github', label: 'GitHub', href: 'https://github.com/RogerSquare/r-that-wiki' },
      ],
      sidebar: [
        {
          label: 'Components',
          collapsed: false,
          items: [
            {
              label: 'UI primitives',
              collapsed: true,
              items: [
                { slug: 'components/btn-icon' },
                { slug: 'components/claude-spinner' },
                { slug: 'components/gradient-title' },
                { slug: 'components/light-dark-toggle' },
                { slug: 'components/loading-skeleton' },
                { slug: 'components/pcb-trace-background' },
                { slug: 'components/progress-bar-subpixel' },
                { slug: 'components/progress-bar-vanilla-js' },
                { slug: 'components/selection-menu' },
                { slug: 'components/status-bar' },
                { slug: 'components/streaming-text' },
                { slug: 'components/tab-panel-navigation' },
                { slug: 'components/thinking-indicator' },
              ],
            },
            {
              label: 'Layout',
              collapsed: true,
              items: [
                { slug: 'components/board' },
                { slug: 'components/container-card' },
                { slug: 'components/list-view' },
                { slug: 'components/masonry-grid' },
                { slug: 'components/sidebar' },
                { slug: 'components/split-pane-layout' },
                { slug: 'components/tree-view' },
              ],
            },
            {
              label: 'Forms & search',
              collapsed: true,
              items: [
                { slug: 'components/admin-form-post' },
                { slug: 'components/search-filter-bar' },
                { slug: 'components/text-input-form' },
                { slug: 'components/upload-zone' },
              ],
            },
            {
              label: 'Views & details',
              collapsed: true,
              items: [
                { slug: 'components/activity-feed' },
                { slug: 'components/admin-settings' },
                { slug: 'components/collection-detail' },
                { slug: 'components/collections-page' },
                { slug: 'components/comment-section' },
                { slug: 'components/metadata-panel' },
                { slug: 'components/profile-page' },
                { slug: 'components/stats-dashboard' },
                { slug: 'components/streaming-bio' },
                { slug: 'components/task-card' },
              ],
            },
            {
              label: 'Modals & panels',
              collapsed: true,
              items: [
                { slug: 'components/chat-panel' },
                { slug: 'components/create-task-modal' },
                { slug: 'components/design-studio' },
                { slug: 'components/ic-mini-chat-buddy' },
                { slug: 'components/task-modal' },
                { slug: 'components/terminal-tab' },
              ],
            },
            {
              label: 'Media',
              collapsed: true,
              items: [
                { slug: 'components/compare-view' },
                { slug: 'components/photo-viewer' },
              ],
            },
          ],
        },
        {
          label: 'Patterns',
          collapsed: false,
          items: [
            {
              label: 'Deployment & infra',
              collapsed: true,
              items: [
                { slug: 'patterns/cairn-data-dir' },
                { slug: 'patterns/cloudflare-flexible-tls-for-http-origin' },
                { slug: 'patterns/cloudflare-orange-vs-grey-cloud' },
                { slug: 'patterns/cloudflare-origin-certificate' },
                { slug: 'patterns/host-key-persist-or-generate' },
                { slug: 'patterns/ink-over-ssh' },
                { slug: 'patterns/json-ld-schema-org' },
                { slug: 'patterns/per-ip-ssh-connection-limit' },
                { slug: 'patterns/rss-and-sitemap-generation' },
                { slug: 'patterns/rsync-atomic-swap-dist' },
                { slug: 'patterns/ssh-idle-timeout' },
                { slug: 'patterns/vps-deploy-runbook-shape' },
              ],
            },
            {
              label: 'Auth & security',
              collapsed: true,
              items: [
                { slug: 'patterns/api-keys-in-mobile-apps' },
                { slug: 'patterns/csrf-for-hand-rolled-admin' },
                { slug: 'patterns/jwt-refresh-rotation' },
                { slug: 'patterns/jwt-secret-persist-or-generate' },
                { slug: 'patterns/rate-limit-per-endpoint' },
                { slug: 'patterns/url-validation-permissive' },
              ],
            },
            {
              label: 'Data & storage',
              collapsed: true,
              items: [
                { slug: 'patterns/activity-log-in-yaml-frontmatter' },
                { slug: 'patterns/audit-log-append-only-json' },
                { slug: 'patterns/folder-as-project' },
                { slug: 'patterns/history-snapshots-on-edit' },
                { slug: 'patterns/markdown-as-database' },
                { slug: 'patterns/markdown-blog-from-filesystem' },
                { slug: 'patterns/pagination-cursor-vs-offset' },
                { slug: 'patterns/per-project-hidden-dir' },
                { slug: 'patterns/silent-buildindex-failure' },
                { slug: 'patterns/sqlite-fts5-search' },
                { slug: 'patterns/sqlite-job-queue' },
                { slug: 'patterns/stable-project-ids' },
                { slug: 'patterns/tag-many-to-many-schema' },
                { slug: 'patterns/trash-directory-soft-delete' },
                { slug: 'patterns/userdefaults-as-payload-history' },
              ],
            },
            {
              label: 'Backend architecture',
              collapsed: true,
              items: [
                { slug: 'patterns/agent-task-board-protocol' },
                { slug: 'patterns/decky-plugin-architecture' },
                { slug: 'patterns/docker-socket-as-api' },
                { slug: 'patterns/event-stream-reconnection' },
                { slug: 'patterns/execfile-not-exec-for-cli-wrappers' },
                { slug: 'patterns/federation-pull-and-proxy' },
                { slug: 'patterns/gh-cli-as-backend' },
                { slug: 'patterns/hand-rolled-express-admin-cms' },
                { slug: 'patterns/multi-repo-bulk-operations' },
                { slug: 'patterns/no-frontend-framework' },
                { slug: 'patterns/service-registry-control-plane' },
                { slug: 'patterns/socket-io-live-state-fanout' },
                { slug: 'patterns/swagger-jsdoc-inline' },
              ],
            },
            {
              label: 'AI & ML workflows',
              collapsed: true,
              items: [
                { slug: 'patterns/ai-chat-dispatch-to-claude-cli' },
                { slug: 'patterns/controls-to-api-params-mapping' },
                { slug: 'patterns/design-studio-ai-assisted-theming' },
                { slug: 'patterns/nsfw-classifier-as-tag-not-filter' },
                { slug: 'patterns/prompt-assistant-gpt-to-model' },
                { slug: 'patterns/python-ml-subprocess' },
                { slug: 'patterns/replicate-submit-poll-retrieve' },
                { slug: 'patterns/tag-suggestion-review-workflow' },
                { slug: 'patterns/workflow-json-parser' },
              ],
            },
            {
              label: 'Media processing',
              collapsed: true,
              items: [
                { slug: 'patterns/audio-mixer-coordination' },
                { slug: 'patterns/ffmpeg-video-frame-extraction' },
                { slug: 'patterns/immich-public-album-embed' },
                { slug: 'patterns/sharp-image-pipeline' },
                { slug: 'patterns/youtube-audio-extraction-fallbacks' },
              ],
            },
            {
              label: 'UX & client tricks',
              collapsed: true,
              items: [
                { slug: 'patterns/anti-flash-theme-script' },
                { slug: 'patterns/destructive-action-confirmation' },
                { slug: 'patterns/frame-timed-animation-in-ink' },
                { slug: 'patterns/ink-demo-isolation' },
                { slug: 'patterns/metal-mesh-gradient' },
                { slug: 'patterns/sub-character-unicode-precision' },
              ],
            },
          ],
        },
        {
          label: 'Snippets',
          collapsed: false,
          items: [
            {
              label: 'Shell & deploy',
              collapsed: true,
              items: [
                { slug: 'snippets/co-author-trailer-removal' },
                { slug: 'snippets/deploy-script-via-ssh' },
                { slug: 'snippets/git-pull-defensive-with-stash' },
                { slug: 'snippets/scp-pubkey-install-windows-powershell' },
                { slug: 'snippets/systemctl-cat-to-verify-env' },
                { slug: 'snippets/systemd-drop-in-env-var' },
              ],
            },
            {
              label: 'Web server config',
              collapsed: true,
              items: [
                { slug: 'snippets/cloudflare-proxy-off-for-ssh-host' },
                { slug: 'snippets/nginx-reverse-proxy-with-node-backend' },
                { slug: 'snippets/nginx-subdomain-static-site' },
              ],
            },
            {
              label: 'Node & JS',
              collapsed: true,
              items: [
                { slug: 'snippets/atrium-mcp-server-stdio-setup' },
                { slug: 'snippets/concurrent-session-guard' },
                { slug: 'snippets/dockerode-idioms' },
                { slug: 'snippets/drop-unused-catch' },
                { slug: 'snippets/editor-integration-via-editor-env-var' },
                { slug: 'snippets/exif-parse-normalize' },
                { slug: 'snippets/full-res-proxy-route' },
                { slug: 'snippets/host-metrics-from-container' },
                { slug: 'snippets/sanitize-safe-path' },
                { slug: 'snippets/starlight-header-selector-scoping' },
                { slug: 'snippets/starlight-heading-wrapper-font-size' },
                { slug: 'snippets/task-id-generation' },
                { slug: 'snippets/trust-proxy-for-rate-limiter' },
              ],
            },
            {
              label: 'SQL & API specs',
              collapsed: true,
              items: [
                { slug: 'snippets/openapi-security-schemes' },
                { slug: 'snippets/sqlite-fts5-triggers-verbatim' },
              ],
            },
            {
              label: 'Platform-specific',
              collapsed: true,
              items: [
                { slug: 'snippets/ink-testing-library-basics' },
                { slug: 'snippets/swiftui-controls-for-ml-params' },
              ],
            },
          ],
        },
        { label: 'Projects', autogenerate: { directory: 'projects' } },
        { label: 'Meta', autogenerate: { directory: 'meta' } },
      ],
    }),
    react(),
  ],
});
