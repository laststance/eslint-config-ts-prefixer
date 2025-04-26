import { defineConfig } from 'eslint/config'
import js from '@eslint/js'

export default defineConfig({
  ignores: ['**/node_modules/**'],
  languageOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  rules: {
    ...js.configs.recommended.rules,
  },
})
