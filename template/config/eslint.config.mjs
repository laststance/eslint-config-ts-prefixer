import { defineConfig } from 'eslint/config'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'

export default defineConfig([
  {
    // Patterns from .eslintignore
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.git/**',
      '**/*.min.js',
      '**/*.bundle.js',
    ],
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
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Core ESLint rules
      eqeqeq: 'error',
      'no-unused-vars': 'error',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'error',

      // Import rules
      'import/order': 'error',

      // Prettier rules
      'prettier/prettier': 'warn',
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
])
