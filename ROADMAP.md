---
schema: cc-dash/roadmap@1
project: cottage-ui
description: React component library with cottage-style UI primitives for consistent, accessible interfaces.
last_updated: 2026-05-02T14:30:00-06:00
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

## Completed

<!-- category:completed -->

- <!-- id:r_ksq2g status:done completed:2026-03-09 --> ~~**Phase 1: Packaging and Publish Correctness**~~ - Added types and exports to package.json, moved react/react-dom to peerDependencies (^18 || ^19), moved testing libraries to devDependencies, prevented public assets from library output (copyPublicDir: false), added CI workflow (lint, test, build, dist verification). *(Completed: 2026-03-09)*
- <!-- id:r_g7b7i status:done completed:2026-03-09 --> ~~**Phase 2: Component API Ergonomics**~~ - Exported Props interfaces from all components, extended with ComponentPropsWithoutRef for native HTML attribute pass-through, added forwardRef to key primitives (Button, Input, TextArea, Select, Checkbox), added displayName to all forwardRef components, consistent className and rest-props spread, fixed Tabs empty-state crash, fixed Input size prop conflict. *(Completed: 2026-03-09)*
- <!-- id:r_8pypt status:done completed:2026-03-10 --> ~~**Phase 4: Quality Gates and Tooling Hardening**~~ - Added coverage thresholds to vitest config (90% lines/functions/statements, 85% branches), documented TS/API Extractor version warning, moved vite-tsconfig-paths to devDependencies, added release checklist and Storybook controls verification docs. *(Completed: 2026-03-10)*
