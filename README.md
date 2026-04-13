# rog-wiki

> Deep-dive pattern library covering components, patterns, and code snippets from my projects. Lives at [wiki.r-that.com](https://wiki.r-that.com).

**Live demo:** [wiki.r-that.com](https://wiki.r-that.com)
**Stack:** Astro · Starlight · MDX · React · Pagefind (client-side search)
**Status:** Active — updated continuously as patterns emerge

## What's interesting technically

Sidebar ordering is **hand-curated** in `astro.config.mjs`, not alphabetical. Content lives in the order a newcomer should encounter it, not the order the filesystem lists it. Starlight's sidebar config is verbose, but the editorial control is the point: grouping "Components / Patterns / Snippets" each with sub-categories lets readers navigate by *how they're thinking about a problem*, not *what letter the filename starts with*. Deployment is a static `scp -P 2200 -r dist/* root@r-that.com:/var/www/wiki/` to an nginx subdomain — no CI pipeline, no cache layer, no build server.

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
