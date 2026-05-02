---
schema: cc-dash/roadmap@1
project: cottage-ui
description: React component library with cottage-style UI primitives for consistent, accessible interfaces.
last_updated: 2026-05-02T17:25:00-06:00
---

# Roadmap

> React component library with cottage-style UI primitives for consistent, accessible interfaces.

## Core — Accessibility and Behavioral Edge Cases (Phase 3)

<!-- category:core -->

- <!-- id:r_v6pc0 status:planned --> **Modal escape-key and focus-trap tests** - Add escape-key and focus-trap tests for Modal using user-event.
- <!-- id:r_1jd0j status:planned --> **Tabs keyboard interaction tests** - Add keyboard interaction tests for Tabs roving behavior (arrow keys, Home/End, first/last wrap).
- <!-- id:r_4e3zd status:planned --> **Tabs out-of-range guard** - Add out-of-range activeTab guard for Tabs (negative index, index > length).
- <!-- id:r_xvn5e status:planned --> **Input control labeling audit** - Audit labeling rules for all input-like controls (Input, Select, TextArea, Checkbox) and document expected accessible-name patterns.
- <!-- id:r_ckfa9 status:planned --> **Accessibility documentation** - Document accessibility patterns per component (in Storybook docs or component-level markdown).

## Backlog

<!-- category:backlog -->

- <!-- id:r_idrmt status:planned --> **Unstyled/headless primitives** - Add unstyled/headless primitives for consumers needing custom visual systems.
- <!-- id:r_ji30i status:planned --> **Visual regression testing** - Add visual regression testing for Storybook examples (Chromatic or similar).
- <!-- id:r_9yhbm status:planned --> **Theme tokens strategy** - Add theme tokens strategy for better cross-brand customization.
- <!-- id:r_8wihb status:planned --> **CSS layers or container queries** - Explore CSS layers or container queries for improved consumer override ergonomics.

## Housekeeping

<!-- category:housekeeping -->

- <!-- id:r_nntbo status:planned --> **API Extractor TS version mismatch warning** - Low severity, build succeeds. Cosmetic warning only, documented in docs/TYPE_BUNDLING_WARNING.md. Blocked on vite-plugin-dts upstream update.

## Publish v1.0.0 (npm)

<!-- category:publish -->

- <!-- id:r_pub01 status:done completed:2026-05-02 --> ~~**Scope package as @antjanus/cottage-ui**~~ - Updated package.json name to @antjanus/cottage-ui. *(Completed: 2026-05-02)*
- <!-- id:r_pub02 status:done completed:2026-05-02 --> ~~**Add publishConfig.access: public**~~ - Required for free scoped npm packages. *(Completed: 2026-05-02)*
- <!-- id:r_pub03 status:done completed:2026-05-02 --> ~~**Add MIT LICENSE file**~~ - Created LICENSE with copyright Antonin Januska <antonin@antjanus.com>. *(Completed: 2026-05-02)*
- <!-- id:r_pub04 status:done completed:2026-05-02 --> ~~**Fill repository, homepage, bugs, license, author, description, style fields**~~ - All package.json metadata fields populated. *(Completed: 2026-05-02)*
- <!-- id:r_pub05 status:done completed:2026-05-02 --> ~~**Update files field to include README.md and LICENSE**~~ - Pack verified: 7 files, no src/tests/planning docs. *(Completed: 2026-05-02)*
- <!-- id:r_pub06 status:done completed:2026-05-02 --> ~~**Write CHANGELOG.md v1.0.0 entry**~~ - Summarizes all four phases. *(Completed: 2026-05-02)*
- <!-- id:r_pub07 status:done completed:2026-05-02 --> ~~**Update README with scoped install command**~~ - npm install @antjanus/cottage-ui; added License and Contributing sections. *(Completed: 2026-05-02)*
- <!-- id:r_pub08 status:done completed:2026-05-02 --> ~~**npm pack --dry-run verified**~~ - 7 files, 54.6 kB unpacked, no accidental inclusions. *(Completed: 2026-05-02)*
- <!-- id:r_pub09 status:done completed:2026-05-02 --> ~~**npm publish --dry-run clean**~~ - No warnings, confirms registry target, tag latest, access public. *(Completed: 2026-05-02)*
- <!-- id:r_pub10 status:planned --> **Run npm login + npm publish** - Blocked: requires user credentials. Run: `npm login --scope=@antjanus && npm publish --access public`. *(Planned)*
- <!-- id:r_pub11 status:planned --> **Tag and push v1.0.0** - Run: `git tag v1.0.0 && git push origin main --tags`. *(Planned)*

## Completed

<!-- category:completed -->

- <!-- id:r_ksq2g status:done completed:2026-03-09 --> ~~**Phase 1: Packaging and Publish Correctness**~~ - Added types and exports to package.json, moved react/react-dom to peerDependencies (^18 || ^19), moved testing libraries to devDependencies, prevented public assets from library output (copyPublicDir: false), added CI workflow (lint, test, build, dist verification). *(Completed: 2026-03-09)*
- <!-- id:r_g7b7i status:done completed:2026-03-09 --> ~~**Phase 2: Component API Ergonomics**~~ - Exported Props interfaces from all components, extended with ComponentPropsWithoutRef for native HTML attribute pass-through, added forwardRef to key primitives (Button, Input, TextArea, Select, Checkbox), added displayName to all forwardRef components, consistent className and rest-props spread, fixed Tabs empty-state crash, fixed Input size prop conflict. *(Completed: 2026-03-09)*
- <!-- id:r_8pypt status:done completed:2026-03-10 --> ~~**Phase 4: Quality Gates and Tooling Hardening**~~ - Added coverage thresholds to vitest config (90% lines/functions/statements, 85% branches), documented TS/API Extractor version warning, moved vite-tsconfig-paths to devDependencies, added release checklist and Storybook controls verification docs. *(Completed: 2026-03-10)*
