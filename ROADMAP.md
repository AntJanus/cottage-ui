# Cottage UI Engineering Roadmap

Last updated: 2026-03-09

## Review Findings (Priority Ordered)

### P0
- Package metadata is missing TypeScript entry points for consumers. `package.json` has no `types` field and no `exports["."].types`, even though `dist/cottage-ui.d.ts` is generated. See [package.json](/Users/antonin/projects/antjanus/cottage-ui/package.json:10).
- Runtime dependency boundaries are incorrect for a component library. `react` and `react-dom` are in `dependencies` instead of `peerDependencies`, which can cause duplicate React instances in host apps. See [package.json](/Users/antonin/projects/antjanus/cottage-ui/package.json:31).

### P1
- Library build output includes app static assets (`dist/vite.svg`), creating publish noise and unnecessary package weight. See [vite.config.ts](/Users/antonin/projects/antjanus/cottage-ui/vite.config.ts:11).
- Public component prop types are not exported and most components do not compose native HTML attributes (`className`, `data-*`, `aria-*`, etc.), which limits consumer extensibility. See [lib/Button/Button.tsx](/Users/antonin/projects/antjanus/cottage-ui/lib/Button/Button.tsx:23), [lib/Input/Input.tsx](/Users/antonin/projects/antjanus/cottage-ui/lib/Input/Input.tsx:23), and [lib/Select/Select.tsx](/Users/antonin/projects/antjanus/cottage-ui/lib/Select/Select.tsx:18).
- Tabs has no guard for empty `tabs`, which can produce invalid ARIA wiring and modulo math with `tabs.length === 0`. See [lib/Tabs/Tabs.tsx](/Users/antonin/projects/antjanus/cottage-ui/lib/Tabs/Tabs.tsx:42).

### P2
- Modal behavior is good but not fully regression-tested for keyboard close/focus loop in tests. See [lib/Modal/Modal.tsx](/Users/antonin/projects/antjanus/cottage-ui/lib/Modal/Modal.tsx:32) and [lib/Modal/Modal.test.tsx](/Users/antonin/projects/antjanus/cottage-ui/lib/Modal/Modal.test.tsx:4).
- Test libraries are in runtime `dependencies` instead of `devDependencies`, increasing consumer install size. See [package.json](/Users/antonin/projects/antjanus/cottage-ui/package.json:31).
- API Extractor warns about TypeScript version mismatch during builds; this should be resolved to keep type bundling stable. See [vite.config.ts](/Users/antonin/projects/antjanus/cottage-ui/vite.config.ts:10).

## Roadmap

## Phase 1 (Week 1): Packaging and Publish Correctness -- COMPLETE (2026-03-09)
- [x] Add `types: "./dist/cottage-ui.d.ts"` in `package.json`.
- [x] Add `exports["."].types` for type-aware resolvers.
- [x] Move `react` and `react-dom` to `peerDependencies` and keep matching versions in `devDependencies` for local development.
- [x] Move testing libraries to `devDependencies`.
- [x] Prevent public assets from being copied into library output (`copyPublicDir: false` in build config).
- [x] Add CI workflow (lint, test, build, dist verification) in `.github/workflows/ci.yml`.

Definition of done:
- [x] Consumer TypeScript projects resolve package types without manual path hints.
- [x] Packed tarball contains only intended library artifacts.
- [x] Host apps do not install a second React copy from this package.

## Phase 2 (Week 2): Component API Ergonomics
- Export `*Props` interfaces from each component file and re-export from `lib/main.ts`.
- Update form and interactive components to extend native props (`ComponentPropsWithoutRef<'button'>`, etc.) while preserving library variants/enums.
- Add optional `className` pass-through consistently.
- Introduce `forwardRef` for key primitives (`Button`, `Input`, `TextArea`, `Select`, `Checkbox`) to support form libraries and focus management.

Definition of done:
- Consumers can pass standard HTML attributes without type workarounds.
- Refs can be used for focus and integrations.
- Public API docs and Storybook controls reflect new props.

## Phase 3 (Week 3): Accessibility and Behavioral Edge Cases
- Add safe handling for `Tabs` empty state and out-of-range `activeTab`.
- Add escape-key and focus-trap tests for `Modal` using `user-event`.
- Add keyboard interaction tests for tabs roving behavior and ensure first/last navigation remains stable.
- Audit required labeling rules for all input-like controls and document expected accessible-name patterns in component docs.

Definition of done:
- No invalid tabpanel/tab ARIA references for empty data.
- Keyboard behavior is covered by tests, not only manual checks.
- Accessibility defaults are explicit and documented per component.

## Phase 4 (Week 4): Quality Gates and Tooling Hardening
- Add CI workflow to run lint, tests, build, and pack verification on pull requests.
- Add coverage thresholds (starting low, then raising) to prevent silent regression.
- Resolve TS/API Extractor version warning by aligning `vite-plugin-dts`/extractor toolchain with project TypeScript.
- Add release checklist docs for Storybook verification and npm publishing flow.

Definition of done:
- Every PR runs the same validation sequence used before release.
- Build pipeline is warning-free for type bundling.
- Publishing process is repeatable and documented.

## Backlog (After Core Hardening)
- Add unstyled/headless primitives for consumers needing custom visual systems.
- Add visual regression testing for Storybook examples.
- Add theme tokens strategy for better cross-brand customization.
