# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-02

### Summary

First stable public release of `@antjanus/cottage-ui`. Covers four delivery phases:

### Added

- **Phase 1 — Packaging and publish correctness** (2026-03-09)
  - Scoped package name `@antjanus/cottage-ui`, MIT license, `publishConfig.access: "public"`
  - `types`, `main`, `module`, `style`, and `exports` fields aligned with `dist/` outputs
  - `react` and `react-dom` moved to `peerDependencies` (`^18 || ^19`)
  - Testing libraries moved to `devDependencies`
  - `copyPublicDir: false` to prevent demo assets from leaking into library bundle
  - CI workflow: lint, test, build, dist verification
- **Phase 2 — Component API ergonomics** (2026-03-09)
  - `forwardRef` added to key primitives: Button, Input, TextArea, Select, Checkbox
  - `ComponentPropsWithoutRef` on all components for native HTML attribute pass-through
  - All `Props` interfaces exported from each component
  - `displayName` set on all `forwardRef` components
  - Consistent `className` and rest-props spread across the component set
  - Fixed Tabs empty-state crash; fixed Input `size` prop conflict with native HTML attribute
- **Phase 3 — Accessibility and behavioral edge cases** (2026-03-10)
  - 50 accessibility-focused tests added (Modal focus-trap, Tabs keyboard navigation, aria-invalid on error states, aria-labelledby on dialogs)
  - Tabs `activeTab` out-of-range guard (negative index, index beyond length)
  - Accessibility patterns documented in `docs/accessibility.md`
- **Phase 4 — Quality gates and tooling hardening** (2026-03-10)
  - Vitest coverage thresholds enforced: 90% lines/functions/statements, 85% branches
  - 156 tests across 15 test files, all passing
  - API Extractor TS version mismatch documented in `docs/TYPE_BUNDLING_WARNING.md` (cosmetic, build succeeds)
  - `vite-tsconfig-paths` moved to `devDependencies`
  - Release checklist and Storybook controls verification docs added

### Components

Button, Input, TextArea, Select, Checkbox, Tabs, Modal, Alert, Avatar, Label, Stack, Badge, Spinner, Divider (14 components total).

### Breaking Changes

None — this is the initial public release.
