/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2022: true,
    jest: true,
    node: true,
  },
  extends: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    project: ['tsconfig.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'sort-keys-fix', 'prettier'],
  root: true,
  rules: {
    '@typescript-eslint/await-thenable': 'error',
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
    '@typescript-eslint/no-unnecessary-condition': [
      'error',
      {
        allowConstantLoopConditions: true,
      },
    ],
    '@typescript-eslint/no-unused-expressions': 'error',

    // Allow foo(unuseArg, useValue) & bar(_, useValue) & { foo, ...coords } = data; https://typescript-eslint.io/rules/no-unused-vars/
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
    'import/default': 'error',
    'import/export': 'error',
    'import/named': 'error',
    'import/no-cycle': 'error',
    'import/no-duplicates': 'error',
    'import/no-named-as-default': 'error',
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
    'no-alert': 'error',
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'error',
    'no-console': 'error',
    'no-constant-binary-expression': 'error',
    'no-constant-condition': 'error',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-empty-pattern': 'error',
    'no-extra-boolean-cast': 'error',
    'no-redeclare': 'error',
    'no-return-await': 'error',
    'no-unused-private-class-members': 'error',
    'prefer-const': 'warn',
    'prefer-promise-reject-errors': 'error',
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
    'require-atomic-updates': 'error',
    'sort-keys-fix/sort-keys-fix': 'warn',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', 'cjs', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        project: ['tsconfig.json'],
      },
    },
  },
}
