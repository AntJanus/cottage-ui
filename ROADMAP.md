# Cottage UI Engineering Roadmap

Last updated: 2026-03-09

## Current Status

- **Version:** 1.0.0
- **Tests:** 100 passing (15 test files)
- **Build:** Clean (one minor TS version warning from API Extractor)
- **CI:** `.github/workflows/ci.yml` (lint, test, build, dist verification)
- **Components:** 15 (Button, Input, TextArea, Select, Checkbox, Label, Tabs, Modal, Card, Alert, Avatar, Badge, Stack, Divider, Spinner)

## Completed Work

### Phase 1: Packaging and Publish Correctness -- DONE (2026-03-09)
- [x] Add `types` and `exports["."].types` to package.json
- [x] Move `react`/`react-dom` to `peerDependencies` (^18 || ^19)
- [x] Move testing libraries to `devDependencies`
- [x] Prevent public assets from library output (`copyPublicDir: false`)
- [x] Add CI workflow (lint, test, build, dist verification)

### Phase 2: Component API Ergonomics -- DONE (2026-03-09)
- [x] Export `*Props` interfaces from all components, re-exported from `lib/main.ts`
- [x] Extend all components with `ComponentPropsWithoutRef` for native HTML attribute pass-through
- [x] Add `forwardRef` to key primitives (Button, Input, TextArea, Select, Checkbox)
- [x] Add `displayName` to all forwardRef components
- [x] Consistent `className` and rest-props spread on all components
- [x] Fix Tabs empty-state crash (guard for empty tabs array + test)
- [x] Fix Input size prop conflict with native HTML size attribute

## Remaining Work

### Phase 3: Accessibility and Behavioral Edge Cases

Priority: **P1** -- Required for production readiness.

- [ ] Add escape-key and focus-trap tests for `Modal` using `user-event`
- [ ] Add keyboard interaction tests for Tabs roving behavior (arrow keys, Home/End, first/last wrap)
- [ ] Add out-of-range `activeTab` guard for Tabs (negative index, index > length)
- [ ] Audit labeling rules for all input-like controls (Input, Select, TextArea, Checkbox) and document expected accessible-name patterns
- [ ] Document accessibility patterns per component (in Storybook docs or component-level markdown)

Definition of done:
- Keyboard behavior is covered by automated tests, not only manual checks.
- Accessibility defaults are explicit and documented per component.

### Phase 4: Quality Gates and Tooling Hardening

Priority: **P1** -- Needed before publishing to npm.

- [ ] Add coverage thresholds to vitest config (start at current baseline, ratchet up)
- [ ] Resolve TS/API Extractor version warning (`vite-plugin-dts` bundled TS 5.8.2 vs project TS 5.9.3)
- [ ] Move `vite-tsconfig-paths` from `dependencies` to `devDependencies` (build-time only tool inflating consumer installs)
- [ ] Add release checklist docs for Storybook verification and npm publishing flow
- [ ] Verify Storybook controls reflect new forwardRef props and native attribute pass-through

Definition of done:
- Build pipeline is warning-free for type bundling.
- Publishing process is repeatable and documented.
- No build-time-only packages in runtime `dependencies`.

### Backlog (After Core Hardening)

Priority: **P2/P3** -- Nice-to-have, no urgency.

- [ ] Add unstyled/headless primitives for consumers needing custom visual systems
- [ ] Add visual regression testing for Storybook examples (Chromatic or similar)
- [ ] Add theme tokens strategy for better cross-brand customization
- [ ] Explore CSS layers or container queries for improved consumer override ergonomics

## Known Issues

| Issue | Severity | Notes |
|---|---|---|
| API Extractor TS version mismatch warning | Low | Build succeeds; cosmetic warning only. Blocked on `vite-plugin-dts` upstream update. |
| `vite-tsconfig-paths` in runtime deps | Low | Does not affect library consumers who tree-shake, but inflates `npm install` for non-tree-shaking setups. |

## Review Findings Archive

Original audit findings preserved for traceability.

### P0 (Resolved)
- ~~Package metadata missing TypeScript entry points~~ -- Fixed in Phase 1.
- ~~react/react-dom in `dependencies` instead of `peerDependencies`~~ -- Fixed in Phase 1.

### P1 (Resolved)
- ~~Library build includes `dist/vite.svg`~~ -- Fixed in Phase 1 (`copyPublicDir: false`).
- ~~Component prop types not exported, no native HTML attribute composition~~ -- Fixed in Phase 2.
- ~~Tabs crashes on empty `tabs` array~~ -- Fixed in Phase 2.

### P2 (Partially Resolved)
- Modal keyboard/focus tests -- Open, tracked in Phase 3.
- ~~Testing libraries in runtime deps~~ -- Fixed in Phase 1.
- API Extractor TS version warning -- Open, tracked in Phase 4.
