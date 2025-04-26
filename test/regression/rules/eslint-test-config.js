import { defineConfig } from 'eslint/config'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default defineConfig({
  ignores: ['**/node_modules/**'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      project: './test/tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': typescriptEslint,
  },
  rules: {
    ...typescriptEslint.configs.recommended.rules,
  },
})
