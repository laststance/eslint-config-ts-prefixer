import { defineConfig } from 'eslint/config'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import _import from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import { fixupPluginRules } from '@eslint/compat'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  {
    extends: compat.extends(),

    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: fixupPluginRules(_import),
      prettier,
    },

    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'commonjs',

      parserOptions: {
        project: ['tsconfig.json'],
      },
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.mjs', '.js', 'cjs', '.jsx', '.ts', '.tsx'],
        },

        typescript: {
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-misused-new': 'error',

      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksConditionals: false,
          checksVoidReturn: false,
        },
      ],

      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/promise-function-async': 'warn',
      eqeqeq: ['error', 'always'],
      'no-unneeded-ternary': 'warn',
      'import/default': 'error',
      'import/export': 'error',
      'import/named': 'error',
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',
      'import/no-useless-path-segments': 'warn',

      'import/order': [
        'warn',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },

          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'always',
        },
      ],

      'no-constant-binary-expression': 'error',
      'no-constant-condition': 'error',
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-empty-pattern': 'error',
      'no-extra-boolean-cast': 'error',
      'no-return-await': 'error',
      'no-unsafe-negation': 'warn',
      'no-unused-private-class-members': 'error',
      'prefer-const': 'warn',

      'prefer-promise-reject-errors': [
        'error',
        {
          allowEmptyReject: true,
        },
      ],

      'prettier/prettier': [
        'warn',
        {},
        {
          properties: {
            usePrettierrc: true,
          },
        },
      ],

      radix: 'error',

      'require-atomic-updates': [
        'error',
        {
          allowProperties: true,
        },
      ],

      'valid-typeof': 'warn',
    },
  },
  {
    files: [
      './**.js',
      './**.cjs',
      './**.mjs',
      '**/*.js',
      '**/*.cjs',
      '**/*.mjs',
      '**/*.jsx',
    ],

    rules: {
      'no-undef': [
        'error',
        {
          typeof: false,
        },
      ],

      'no-redeclare': 'error',
    },
  },
])
