# rog-wiki

Deep-dive entries on components, patterns, and code snippets used across my projects. Deployed at [wiki.r-that.com](https://wiki.r-that.com).

Built with [Astro Starlight](https://starlight.astro.build/) + MDX + React. Static output, no backend.

## Running locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # produces ./dist
```

## Structure

```
src/
├── content/docs/
│   ├── index.mdx              # landing page
│   ├── components/            # UI primitives and composite components
│   ├── patterns/              # architectural patterns
│   ├── snippets/              # useful code fragments
│   └── projects/              # per-project architecture tours
└── examples/                  # simplified, self-contained component sources
```

## Adding a new entry

See the [Style guide](https://wiki.r-that.com/meta/style-guide/) in the wiki itself — it's the canonical reference for entry structure, categories, tone, and the `src/examples/` rule.

Quick shape: create `src/content/docs/<section>/<slug>.mdx`, start with a `> Source:` line, then sections in this order: *What it is* → *Why it exists* → *Live* → *Code* → *How it's used* → *Gotchas*.

`src/content/docs/components/btn-icon.mdx` is the canonical example.

## Deployment

Static build deployed to `/var/www/wiki` on the VPS, served by nginx at `wiki.r-that.com`. See `feat-wiki-deploy-001` in the Atrium task board for the infra details.
