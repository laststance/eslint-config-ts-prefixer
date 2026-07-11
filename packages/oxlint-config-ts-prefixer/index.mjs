const SUPPORTED_SOURCE_FILES = [
  '**/*.js',
  '**/*.jsx',
  '**/*.mjs',
  '**/*.cjs',
  '**/*.ts',
  '**/*.tsx',
  '**/*.mts',
  '**/*.cts',
]

const JAVASCRIPT_SOURCE_FILES = ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs']

/** @satisfies {import('oxlint').OxlintConfig} */
const config = {
  plugins: ['typescript', 'import'],
  rules: {
    // Keep comparisons explicit so coercion cannot silently change runtime behavior.
    eqeqeq: ['error', 'always'],

    // Keep ternaries only when they add meaning beyond a direct boolean expression.
    'no-unneeded-ternary': 'warn',

    // Reject binary expressions whose result is constant regardless of their operands.
    'no-constant-binary-expression': 'error',

    // Reject constant conditions that usually signal unreachable or accidental branches.
    'no-constant-condition': 'error',

    // Reject duplicate object keys because later values silently replace earlier values.
    'no-dupe-keys': 'error',

    // Reject destructuring patterns that bind nothing and communicate no useful intent.
    'no-empty-pattern': 'error',

    // Remove redundant boolean casts that make conditions harder to read.
    'no-extra-boolean-cast': 'error',

    // Warn when operator precedence makes a negated comparison behave unexpectedly.
    'no-unsafe-negation': 'warn',

    // Reject private members that can never affect observable class behavior.
    'no-unused-private-class-members': 'error',

    // Prefer immutable bindings whenever reassignment never occurs.
    'prefer-const': 'warn',

    // Preserve useful stack traces by rejecting promises with Error objects.
    'prefer-promise-reject-errors': [
      'error',
      {
        allowEmptyReject: true,
      },
    ],

    // Require an explicit base so parseInt never depends on historical inference.
    radix: 'error',

    // Warn when typeof is compared with a value it can never return.
    'valid-typeof': 'warn',

    // Reject expression statements that have no observable effect.
    'no-unused-expressions': 'error',

    // Reject unused bindings while allowing intentionally ignored underscore arguments.
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    // Verify that a requested default import exists in the target module.
    'import/default': 'error',

    // Verify that every module exposes a coherent, non-conflicting export surface.
    'import/export': 'error',

    // Verify that requested named imports exist in the target module.
    'import/named': 'error',

    // Reject dependency cycles that can expose partially initialized modules at runtime.
    'import/no-cycle': 'error',

    // Reject repeated imports from the same module so dependencies stay consolidated.
    'import/no-duplicates': 'error',

    // Keep type-only imports out of emitted runtime modules.
    'typescript/consistent-type-imports': 'warn',

    // Reject constructor declarations whose shape cannot be used as intended.
    'typescript/no-misused-new': 'error',

    // Reject non-null assertions immediately followed by a contradictory nullish fallback.
    'typescript/no-non-null-asserted-nullish-coalescing': 'error',

    // Prefer as const when a literal assertion can retain the narrowest safe type.
    'typescript/prefer-as-const': 'warn',
  },
  overrides: [
    {
      files: SUPPORTED_SOURCE_FILES,
      env: {
        browser: true,
        es2026: true,
        jest: true,
        node: true,
      },
    },
    {
      files: JAVASCRIPT_SOURCE_FILES,
      rules: {
        // Reject JavaScript references that are not declared by source or environment globals.
        'no-undef': [
          'error',
          {
            typeof: false,
          },
        ],

        // Reject repeated JavaScript declarations that overwrite an existing binding.
        'no-redeclare': 'error',
      },
    },
  ],
}

export default config
