# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-04-26

### Breaking Changes

- Migrated to ESLint v9 with flat configuration format
- Minimum ESLint version is now v9.0.0
- Configuration file changed from `.eslintrc.cjs` to `eslint.config.mjs`
- Command line usage changed to require `-c eslint.config.mjs` flag
- Removed support for `.eslintignore` file (use `ignores` property in config instead)

### Added

- Full support for ESLint v9 flat configuration format
- Interactive CLI prompts for choosing between ESLint v8 and v9
- Comprehensive migration guide for users upgrading from v1.x
- Validation report documenting ESLint v9 compatibility across different environments
- Updated documentation with ESLint v9 specific instructions

### Changed

- Updated all dependencies to their latest versions compatible with ESLint v9
- Refactored CLI tool to support both ESLint v8 and v9 configurations
- Updated test suite to work with ESLint v9
- Improved error handling in CLI tool for better user experience

### Fixed

- Fixed CLI tool to properly handle ESLint v9's flat configuration
- Fixed template files to be compatible with ESLint v9
- Fixed regression tests to work with ESLint v9's new API

## [1.14.1] - Previous Release

[Previous changelog entries...]
