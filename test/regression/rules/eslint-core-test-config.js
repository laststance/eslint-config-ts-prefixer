import { defineConfig } from 'eslint/config'

export default defineConfig({
  ignores: ['**/node_modules/**'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {},
})
