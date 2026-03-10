# Release Checklist

Use this checklist before publishing a new version of Cottage UI to npm.

## Pre-Release Quality Gates

### 1. Code Quality
- [ ] All tests pass: `npm run test -- --run`
- [ ] Test coverage meets thresholds: `npm run coverage`
- [ ] Linting passes with no warnings: `npm run lint`
- [ ] Build completes successfully: `npm run build`
- [ ] TypeScript compilation has no errors

### 2. Documentation
- [ ] `ROADMAP.md` updated with completed features
- [ ] `CLAUDE.md` reflects current commands and structure
- [ ] All new components have tests, stories, and are exported from `lib/main.ts`

### 3. Storybook Verification
- [ ] Storybook builds: `npm run build-storybook`
- [ ] Start Storybook locally: `npm run storybook`
- [ ] Verify all components render correctly
- [ ] Check that all argTypes controls work as expected
- [ ] Test interactive components (Modal, Tabs) for keyboard/mouse interaction
- [ ] Verify accessibility tree in Storybook's Accessibility addon

### 4. Package Verification
- [ ] `package.json` version is updated (use semantic versioning)
- [ ] `package.json` fields are correct:
  - `types` points to correct declaration file
  - `exports` configured for ESM and CJS
  - `peerDependencies` are accurate
  - No build-time tools in `dependencies`
- [ ] `files` field includes only necessary files
- [ ] `sideEffects` is set appropriately

### 5. Build Output Verification
- [ ] `dist/` directory contains expected files:
  - `cottage-ui.js` (ESM)
  - `cottage-ui.umd.cjs` (UMD)
  - `cottage-ui.d.ts` (TypeScript declarations)
  - `cottage-ui.css` (styles)
- [ ] No unexpected files in `dist/` (like `vite.svg`, public assets)
- [ ] Declaration file has no TypeScript errors

## Release Process

### 1. Update Version
```bash
# Choose one:
npm version patch  # 1.0.0 → 1.0.1 (bug fixes)
npm version minor  # 1.0.0 → 1.1.0 (new features, backward compatible)
npm version major  # 1.0.0 → 2.0.0 (breaking changes)
```

### 2. Verify Package
```bash
# Run prepublish checks
npm run build

# Test installation locally
npm pack
# This creates cottage-ui-x.x.x.tgz
# Test in another project: npm install ../path/to/cottage-ui-x.x.x.tgz
```

### 3. Publish to npm
```bash
# Dry run first
npm publish --dry-run

# Publish for real
npm publish

# Or publish with specific tag
npm publish --tag beta
```

### 4. Post-Release
- [ ] Create git tag: `git tag v1.0.0`
- [ ] Push tags: `git push --tags`
- [ ] Update GitHub release notes
- [ ] Update dependent projects

## Troubleshooting

### Build Warnings
- **API Extractor TS version mismatch**: Cosmetic warning only, safe to ignore if build succeeds
- **Missing peer dependencies**: Expected during build, consumers will provide React/ReactDOM

### Common Issues
- **Tests fail**: Do not publish. Fix tests first.
- **Build fails**: Check for TypeScript errors, missing exports
- **Coverage below threshold**: Write more tests or adjust thresholds
- **Linting errors**: Fix all issues before publishing

## Semantic Release (Future)
This project is configured for semantic-release but currently uses manual versioning.
To enable automated releases, configure CI/CD with appropriate npm tokens and GitHub permissions.
