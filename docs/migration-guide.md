# ESLint v9 Migration Guide

This guide will help you migrate from ESLint v8 to ESLint v9 when using eslint-config-ts-prefixer.

## Breaking Changes

### Configuration Format

ESLint v9 introduces a new flat configuration format that replaces the legacy `.eslintrc` format. The main differences are:

1. **File Name**: Use `eslint.config.mjs` instead of `.eslintrc.cjs`
2. **Structure**: Configuration is now an array of config objects instead of a single object
3. **Extends**: The `extends` property is no longer supported; you must import and spread configurations directly
4. **Plugins**: Plugins must be imported and registered explicitly

### Command Line Usage

The command line interface has changed:

- **ESLint v8**: `eslint . --ext .ts,.tsx,.js,jsx`
- **ESLint v9**: `eslint . -c eslint.config.mjs`

### Ignore Patterns

ESLint v9 uses the `ignores` property in the configuration file instead of `.eslintignore`:

```javascript
export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
  },
  // ... other config objects
]
```

## Migration Steps

### 1. Update Dependencies

Update your package.json to use ESLint v9 and the latest version of eslint-config-ts-prefixer:

```bash
npm install --save-dev eslint-config-ts-prefixer@^2.0.0 eslint@^9.25.1
```

### 2. Use the CLI Tool

The easiest way to migrate is to use our CLI tool:

```bash
npx eslint-config-ts-prefixer install
```

When prompted, choose ESLint v9. This will:

- Create `eslint.config.mjs` with the correct format
- Update your package.json scripts
- Remove the old `.eslintrc.cjs` file

### 3. Manual Migration

If you prefer to migrate manually:

1. Create `eslint.config.mjs`:

```javascript
import { defineConfig } from 'eslint/config'
import tsPrefixerConfig from 'eslint-config-ts-prefixer'
import typescriptParser from '@typescript-eslint/parser'

export default defineConfig([
  ...tsPrefixerConfig,
  {
    files: [
      '**/*.ts',
      '**/*.js',
      '**/*.tsx',
      '**/*.jsx',
      '**/*.mjs',
      '**/*.cjs',
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
    rules: {
      // Your custom rules here
    },
    settings: {
      // Your custom settings here
    },
  },
])
```

2. Update package.json scripts:

```json
{
  "scripts": {
    "lint": "eslint . -c eslint.config.mjs",
    "lint:fix": "eslint . -c eslint.config.mjs --fix"
  }
}
```

3. Remove `.eslintrc.cjs` and `.eslintignore` files

### 4. Update CI/CD Configuration

If you use GitHub Actions or other CI/CD tools, update your configuration to use the new command format:

```yaml
- name: Run ESLint
  run: npm run lint
```

## Common Issues

### 1. Plugin Compatibility

Ensure all your ESLint plugins are compatible with ESLint v9. The following plugins used by eslint-config-ts-prefixer are fully compatible:

- @typescript-eslint/eslint-plugin
- eslint-plugin-import
- eslint-plugin-prettier

### 2. Configuration Errors

If you encounter configuration errors, make sure:

- You're using the correct file name (`eslint.config.mjs`)
- You're importing and spreading configurations correctly
- You're not using the deprecated `extends` property

### 3. Parser Issues

If you have parser-related issues, ensure you're importing and configuring the parser correctly:

```javascript
import typescriptParser from '@typescript-eslint/parser'

export default defineConfig([
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  },
])
```

## Need Help?

If you encounter any issues during migration, please:

1. Check our [GitHub Issues](https://github.com/laststance/eslint-config-ts-prefixer/issues)
2. Create a new issue if your problem isn't already reported
3. Provide details about your configuration and the error you're seeing
