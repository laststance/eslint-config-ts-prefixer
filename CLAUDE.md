# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an ESLint configuration package (`eslint-config-ts-prefixer`) that provides a curated set of ESLint rules for TypeScript/JavaScript projects. The package is designed to be zero-config with meaningful runtime behavior rules, Prettier integration, and import organization.

## Essential Commands

### Linting

- `npm run lint` - Run ESLint on all files
- `npm run lint:fix` - Run ESLint with auto-fix enabled
- `npm run prettier` - Format all files with Prettier

### Release Process

- `npm run push-release-commit` - Interactive version bump and release preparation script

## Architecture

### Core Configuration File

- `eslint.config.mjs` - Main ESLint configuration that gets exported as the package entry point
- Uses ESLint's flat config format (v9+)
- Includes TypeScript, import, and Prettier plugins with carefully selected rules
- Supports both TypeScript and JavaScript files

### Release Automation

- `scripts/npm-publish-tool.mjs` - Interactive CLI tool for version bumping and release commits
- Handles semantic versioning (major/minor/patch) with user prompts
- Automatically stages changes, creates commit, and pushes to trigger CI/CD

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
