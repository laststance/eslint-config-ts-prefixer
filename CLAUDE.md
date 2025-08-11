# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an ESLint configuration package (`eslint-config-ts-prefixer`) that provides a curated set of ESLint rules for TypeScript/JavaScript projects. The package is designed to be zero-config with meaningful runtime behavior rules, Prettier integration, and import organization.

## Essential Commands

### Linting

- `pnpm lint` - Run ESLint on all files
- `pnpm lint:fix` - Run ESLint with auto-fix enabled
- `pnpm prettier` - Format all files with Prettier

### Release Process

#### Quick Release

```bash
pnpm push-release-commit
```

This interactive CLI tool will:

1. Prompt for version type (patch/minor/major)
2. Update package.json version
3. Create release commit with format "release vX.Y.Z"
4. Push to remote to trigger CI/CD

#### Release Flow

1. **Run release command**: `pnpm push-release-commit`
2. **Select version type**:
   - 🟢 Patch (4.0.1) - Bug fixes
   - 🟡 Minor (4.1.0) - New features
   - 🔴 Major (5.0.0) - Breaking changes
3. **Automatic actions**:
   - Updates package.json version
   - Stages changes
   - Creates commit "release vX.Y.Z"
   - Pushes to origin/main
4. **CI/CD Pipeline** (GitHub Actions):
   - Runs tests and linting
   - Publishes to npm with provenance
   - Creates GitHub Release page

## Architecture

### Core Configuration File

- `eslint.config.mjs` - Main ESLint configuration that gets exported as the package entry point
- Uses ESLint's flat config format (v9+)
- Includes TypeScript, import, and Prettier plugins with carefully selected rules
- Supports both TypeScript and JavaScript files

### Release Automation

- Uses `@laststance/npm-publish-tool` for interactive version management
- `.release-it.json` configures GitHub release creation and npm publish with provenance
- GitHub Actions CI/CD triggered on push for automated publishing

### Package Structure

- Single-file distribution (`eslint.config.mjs` only)
- ESM-only package with Node.js 22+ requirement
- Peer dependencies: ESLint v9+ and TypeScript v5+

## Development Notes

### Key Rules Philosophy

- Focuses on runtime behavior over syntax preferences
- Enforces import organization and TypeScript best practices
- Integrates with user's existing Prettier configuration
- Warns on unused variables (with underscore prefix exception)
- Strict equality checks and promise handling

### Monorepo Setup

- Uses pnpm workspaces (`pnpm-workspace.yaml`)
- Husky pre-commit hooks with lint-staged for Prettier formatting
- Volta for Node.js version management (v22.16.0)
