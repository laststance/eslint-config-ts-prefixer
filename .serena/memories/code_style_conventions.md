# Code Style and Conventions

## ESLint Configuration Philosophy

- Focus on runtime behavior over syntax preferences
- Enforce import organization and TypeScript best practices
- Integrate with user's existing Prettier configuration
- Warn on unused variables (with underscore prefix exception)
- Strict equality checks and promise handling

## File Structure

- Main export: `eslint.config.mjs` (ESLint flat config format)
- TypeScript configuration: `tsconfig.json` with strict mode enabled
- All code uses ES modules (type: "module" in package.json)

## Formatting

- Prettier handles all formatting concerns
- Pre-commit hooks via Husky run prettier on staged files
- lint-staged configuration: `"*": "prettier --ignore-unknown --write"`

## Supported File Types

- TypeScript: `*.ts`, `*.tsx`, `*.mts`
- JavaScript: `*.js`, `*.jsx`, `*.mjs`, `*.cjs`

## Git Commit Conventions

- Use semantic versioning for releases
- Release commits format: "release vX.Y.Z"
- Regular commits should be descriptive and concise
