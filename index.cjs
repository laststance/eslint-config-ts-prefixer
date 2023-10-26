module.exports = {
  env: {
    browser: true,
    es2022: true,
    jest: true,
    node: true,
  },
  extends: [],
  // This overrides apply 'no-undef' rule only js files because in TypeScript Language Server catch and show error against undefined variable name.
  overrides: [
    {
      files: [
        './**.js',
        './**.cjs',
        './**.mjs',
        '**/*.js',
        '**/*.cjs',
        '**/*.mjs',
      ],
      rules: {
        'no-undef': ['error', { typeof: false }],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'sort-keys-custom-order',
    'prettier',
  ],
  reportUnusedDisableDirectives: true,
  root: true,
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
    'no-redeclare': 'error',
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
    'sort-keys-custom-order/object-keys': [
      'warn',
      { orderedKeys: ['id', 'name', 'title'] },
    ],
    // For TS types sorting
    'sort-keys-custom-order/type-keys': [
      'warn',
      { orderedKeys: ['id', 'name', 'title'] },
    ],
    'valid-typeof': 'warn',
  },
  settings: {
    'import/parsers': {
      // @TODO I have already set up @typescript-eslint/parser at the top level, so from the description, this .ext array seems to be blank. https://github.com/import-js/eslint-plugin-import#importparsers
      '@typescript-eslint/parser': [
        '.mjs',
        '.js',
        'cjs',
        '.jsx',
        '.ts',
        '.tsx',
      ],
    },
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
