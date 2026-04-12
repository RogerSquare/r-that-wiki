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

1. Pick the right section (`components/`, `patterns/`, `snippets/`, `projects/`)
2. Create a new `.mdx` file. Frontmatter:
   ```yaml
   ---
   title: The thing
   description: One-line for search and hover
   ---
   ```
3. Start with a `> Source:` line linking to the canonical code
4. Write the entry in this order — this is the teaching order:
   - **What it is** — one sentence
   - **Why it exists** — the backstory (this is the most useful section for future-you)
   - **Live** — `<Component client:load />` if renderable in a browser
   - **Code** — the core of the idea (not the whole file)
   - **How it's used** — bulleted list of projects + call sites
   - **Gotchas** — what breaks, what surprises, what to avoid
5. If the entry has a live render, add a `src/examples/<name>.tsx` with a simplified version of the component. Provenance comment at the top:
   ```ts
   // Source: <repo>/<path>
   // Simplified for the wiki: removed <specific app-contextual things>
   ```

See `src/content/docs/components/btn-icon.mdx` for the canonical shape.

## Conventions

- Examples are **teaching artifacts**, not mirrors. Simplify ruthlessly — drop auth wiring, error boundaries, telemetry, app-specific providers. Keep the shape of the idea.
- Write the *why* more than the *what*. Code already shows what.
- When in doubt, update an existing entry and add to "How it's used" instead of creating a new entry.

## Deployment

Static build deployed to `/var/www/wiki` on the VPS, served by nginx at `wiki.r-that.com`. See `feat-wiki-deploy-001` in the Atrium task board for the infra details.
