# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

This is a Next.js (App Router, TypeScript) + Tailwind CSS v4 app, scaffolded with `create-next-app`. Source lives in `src/app` and `src/content`. `npm run dev` / `npm run build` / `npm run lint` are available.

@AGENTS.md

## Directory layout

- `context/` — background material Claude should read before doing project work.
  - `context/projects/` — per-project context (currently empty).
  - `context/assets.md` — asset inventory/notes (currently empty stub).
- `reference/` — reference material to ground design/implementation decisions.
  - `reference/mood/` — mood/visual-tone references.
  - `reference/structure/` — layout/structure references.
  - `reference/motion/` — animation/motion references.
  - `reference/anti/` — anti-patterns / things to avoid.
  - `reference/NOTES.md` — freeform reference notes (currently empty stub).
- `.claude/skills/` — project-local Claude Code skills (currently empty).

Empty directories are kept in git via `.gitkeep` files.

## Working in this repo

Before starting implementation work, check `context/` and `reference/` for material relevant to the task — these directories exist specifically to hold the background and constraints Claude should apply, and will be populated over time as the project develops.
