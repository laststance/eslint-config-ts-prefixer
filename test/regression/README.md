# Regression Test Framework

This directory contains a regression test framework for validating functionality before and after the ESLint v9 migration.

## Structure

- `fixtures/`: Contains sample TypeScript files with intentional linting issues
- `__snapshots__/`: Contains Vitest snapshots for regression testing
- `regression.test.js`: Vitest tests using snapshot testing for regression detection
- `cli.test.js`: Tests for CLI functionality (setup and full-copy commands)

## Test Coverage

The regression tests cover:

1. **General ESLint Rules**: Verifies that all ESLint rules continue to work as expected
2. **Prettier Formatting**: Tests specifically for prettier/prettier rule violations
3. **Import Order**: Tests specifically for import/order rule violations
4. **CLI Functionality**: Ensures CLI commands work correctly

## Fixtures

The sample fixtures include intentional violations for:

- Import order rules
- Prettier formatting rules (quotes, spacing, etc.)
- TypeScript-specific rules
- General ESLint rules

## Usage

To run the regression tests:

```bash
pnpm test
```

This will run all tests, including the regression tests, using Vitest.

### Updating Snapshots

If you make intentional changes to the ESLint configuration that affect linting results, you'll need to update the snapshots:

```bash
pnpm test -- -u
```

## Adding New Tests

To add a new test:

1. Add a new fixture file to the `fixtures/` directory with intentional linting issues
2. Add a new test case to `regression.test.js` to capture snapshots
3. Run the tests to generate initial snapshots

## CLI Tests

The `cli.test.js` file contains tests for the CLI functionality:

- Tests for the `setup` command
- Tests for the `full-copy` command

These tests verify that the CLI commands work correctly by:

- Creating a temporary test environment
- Running the CLI commands
- Verifying that all expected files are created
- Checking that package.json and tsconfig.json are updated correctly
