# Task Completion Checklist

## Before Committing Code

1. Run `pnpm lint` to check for linting errors
2. Run `pnpm lint:fix` to auto-fix issues
3. Run `pnpm prettier` to format code

## Pre-Release Checklist

1. Ensure all changes are committed
2. Update version using `pnpm push-release-commit`
3. Verify GitHub Actions CI passes
4. Release is automatically created via release-it configuration

## Quality Checks

- Linting must pass without errors
- Code should follow the established ESLint rules
- All files should be properly formatted with Prettier
- TypeScript compilation should succeed (no type errors)
