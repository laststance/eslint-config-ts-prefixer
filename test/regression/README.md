# Regression Test Framework

This directory contains a regression test framework for validating functionality before and after the ESLint v9 migration.

## Structure

- `fixtures/`: Contains sample TypeScript files with intentional linting issues
- `baseline/`: Contains baseline linting results for comparison
- `baseline-capture.js`: Script to capture baseline linting results
- `regression.test.js`: Vitest tests to compare current linting results with baseline
- `cli.test.js`: Tests for CLI functionality (config and full-copy commands)

## Usage

### Capturing Baseline

Before running regression tests, you need to capture baseline linting results:

```bash
node test/regression/baseline-capture.js
```

This will run ESLint on the fixture files and save the results to the `baseline/` directory.

### Running Regression Tests

To run the regression tests:

```bash
pnpm test
```

This will run all tests, including the regression tests, using Vitest.

## Adding New Tests

To add a new test:

1. Add a new fixture file to the `fixtures/` directory with intentional linting issues
2. Update `baseline-capture.js` to capture baseline results for the new fixture
3. Add a new test case to `regression.test.js` to compare current results with baseline

## CLI Tests

The `cli.test.js` file contains tests for the CLI functionality:

- Tests for the `config` command
- Tests for the `full-copy` command

These tests verify that the CLI commands work correctly by:

- Creating a temporary test environment
- Running the CLI commands
- Verifying that all expected files are created
- Checking that package.json and tsconfig.json are updated correctly
