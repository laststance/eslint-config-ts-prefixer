import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    root: true,
    extends: ['ts-prefixer'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
    plugins: [],
    rules: {},
    settings: {},
  },
])
