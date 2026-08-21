# Changelog

All notable changes to `oxlint-config-ts-prefixer` are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this package follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Realigned the optional peer ranges with the versions the package is actually tested against: `oxfmt` `>=0.64.0 <0.65.0` (was `>=0.58.0 <0.59.0`) and `oxlint-tsgolint` `>=7.0.2001 <8.0.0` (was `>=0.24.0 <0.25.0`, a range no published release has satisfied since the project re-versioned from `0.25.0` to `7.0.2000`).

## [0.1.0] - 2026-07-11

### Added

- Native-first Oxlint preset with 26 explicit JavaScript, TypeScript, and import rules.
- Optional type-aware superset with three promise-safety rules.
- Optional Oxfmt preset that replaces ESLint import ordering without changing unrelated formatting preferences.
- Full rule contracts, type declarations, tarball consumer tests, and dedicated release automation.

[Unreleased]: https://github.com/laststance/eslint-config-ts-prefixer/compare/oxlint-config-ts-prefixer@0.1.0...HEAD
[0.1.0]: https://github.com/laststance/eslint-config-ts-prefixer/releases/tag/oxlint-config-ts-prefixer@0.1.0
