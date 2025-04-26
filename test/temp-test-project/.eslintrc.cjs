/** @type {import('@types/eslint')} */
module.exports = {
  env: {
    browser: true,
    es2023: true,
    jest: true,
    node: true,
  },
  extends: [],
  // This overrides apply 'no-undef','no-redeclare', rule only js files because in TypeScript Language Server catch and show error against undefined variable name.
  overrides: [
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
        'no-undef': ['error', { typeof: false }],
        'no-redeclare': 'error',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  reportUnusedDisableDirectives: true,
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
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    'prettier/prettier': [
      'warn',
      {},
      {
        properties: {
          usePrettierrc: true,
        },
      },
    ],
    // Prevent unexpected parseInt() output that does not return the number calculated in decimal when given a value such as parseInt(071).
    radix: 'error',
    'require-atomic-updates': ['error', { allowProperties: true }],
    'valid-typeof': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', 'cjs', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
}
