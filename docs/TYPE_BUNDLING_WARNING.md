# TypeScript / API Extractor Version Warning

## Current Status

**Status**: Known cosmetic warning - safe to ignore
**Impact**: None - build succeeds and produces correct output
**Priority**: Low

## The Warning

When running `npm run build`, you may see a warning from `vite-plugin-dts`:

```
TypeScript version mismatch:
- Project uses: TypeScript 5.9.3
- vite-plugin-dts bundles: TypeScript 5.8.2 (via API Extractor)
```

## Why It Happens

The `vite-plugin-dts` plugin uses Microsoft's API Extractor internally to bundle TypeScript declaration files. API Extractor bundles its own version of TypeScript, which may lag behind the latest TypeScript releases.

Current versions:
- **Our project**: TypeScript 5.9.3
- **vite-plugin-dts**: 4.5.4
- **API Extractor** (bundled in vite-plugin-dts): Uses TypeScript 5.8.2

## Impact Analysis

### ✅ What Still Works
- TypeScript compilation succeeds
- Declaration files are generated correctly
- Type checking passes
- Build output is valid
- Consumers can use the library without issues

### ⚠️ Potential Edge Cases
- Very new TypeScript 5.9 features might not be represented in declaration bundling
- This is primarily a cosmetic warning during build

## Resolution Strategies

### Option 1: Wait for Upstream (Recommended)
Wait for `vite-plugin-dts` or API Extractor to update their bundled TypeScript version. This is the safest approach and has no action required on our part.

**Tracking**:
- vite-plugin-dts releases: https://github.com/qmhc/vite-plugin-dts/releases
- API Extractor releases: https://github.com/microsoft/rushstack/tree/main/apps/api-extractor

### Option 2: Downgrade Project TypeScript (Not Recommended)
We could downgrade our project to TypeScript 5.8.2, but this:
- Loses access to newer TypeScript features
- Doesn't improve output quality
- Creates technical debt

### Option 3: Suppress Warning (Not Implemented)
We could suppress the warning through build configuration, but:
- Hiding warnings is generally bad practice
- The warning is informative and non-blocking
- Future warnings might be more critical

## Verification

To verify the declaration output is correct despite the warning:

1. Run the build: `npm run build`
2. Check `dist/cottage-ui.d.ts` exists and contains expected exports
3. Test in a consumer project that TypeScript can resolve imports

Example consumer test:
```typescript
import { Button, BUTTON_VARIANTS } from 'cottage-ui'
// TypeScript should provide autocomplete and type checking
```

## Monitoring

Check for updates quarterly:
```bash
npm outdated vite-plugin-dts
```

## Related Issues
- Roadmap: "Resolve TS/API Extractor version warning" (Phase 4)
- See: ROADMAP.md Phase 4 - Quality Gates section

## Last Reviewed
2026-03-10
