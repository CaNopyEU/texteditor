# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WYSIWYG rich text editor built from scratch in React — no editor libraries (no Slate, TipTap, ProseMirror). Uses `contentEditable` and DOM APIs directly. The project follows an iterative plan defined in `plan.md`.

## Commands

```bash
npm run dev          # Start dev server (Vite)
npm run build        # TypeScript check + Vite build
npm run test         # Run tests in watch mode (Vitest)
npm run test:run     # Run tests once
npm run lint         # ESLint
npm run format       # Prettier write
npm run format:check # Prettier check
```

## Tech Stack

- React 19 + TypeScript + Vite 7
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin, no `tailwind.config`)
- Vitest + React Testing Library + jsdom
- ESLint + Prettier (eslint-config-prettier disables conflicting rules)

## Architecture

- `App.tsx` → renders `EditorLayout`
- `EditorLayout` — orchestrator component that wires Toolbar actions to the Editor. Formatting logic (bold/italic/underline/strikethrough) lives here using `range.surroundContents()` / `range.extractContents()` with DOM Selection API.
- `Editor` — `contentEditable` div with `useRef`, tracks innerHTML in state, strips HTML on paste. Renders a side-by-side raw content preview.
- `Toolbar` — receives a list of `{name, fn}` items and renders `Button` components.
- `Button` (`components/General/`) — generic reusable button.

## Code Style

- Prettier: 4-space indent, no semicolons, single quotes, trailing commas, 100 char width
- Tests co-located with components (`Editor.test.tsx` next to `Editor.tsx`)
- Vitest globals enabled — `describe`, `it`, `expect` available without imports (though current tests import them explicitly)
