import browserSecurity from 'eslint-plugin-browser-security'
import importPlugin from 'eslint-plugin-import-x'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/build/**',
      '**/dist/**',
      '**/.git/**',
      '**/.idea/**',
      '**/.husky/**',
      'website/**',
    ],
  },

  // Main configuration
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
      '**/*.mjs',
      '**/*.cjs',
      '**/*.mts',
    ],

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'browser-security': browserSecurity,
      'import-x': importPlugin,
    },

    linterOptions: {
      reportUnusedDisableDirectives: true,
      reportUnusedInlineConfigs: 'error',
    },

    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        projectService: true,
        allowDefaultProject: ['*.js', '*.mjs', '*.cjs'], // allow JS files to be parsed
      },
    },

    settings: {
      'import-x/resolver': {
        node: {
          extensions: ['.mjs', '.js', '.cjs', '.mts', '.ts', '.jsx', '.tsx'],
        },

        typescript: {
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      // Disallow assigning to innerHTML/outerHTML — the most common XSS sink in
      // browser code, and not something a type checker can catch.
      'browser-security/no-innerhtml': 'error',

      // Disallow eval() and its string-compiling relatives.
      'browser-security/no-eval': 'error',

      // Disallow storing a JWT in localStorage/sessionStorage: any XSS on the
      // page can read it, unlike an HttpOnly cookie.
      'browser-security/no-jwt-in-storage': 'error',

      // Same reasoning for other secrets kept in Web Storage.
      'browser-security/no-sensitive-localstorage': 'error',

      // Disallow credentials in query strings — they land in browser history,
      // Referer headers, and server access logs.
      'browser-security/no-credentials-in-query-params': 'error',

      // Require Secure/HttpOnly/SameSite when setting cookies from JS.
      'browser-security/require-cookie-secure-attrs': 'error',

      // Disallow postMessage(..., '*') — an origin wildcard leaks the payload
      // to whatever happens to be framed.
      'browser-security/no-postmessage-wildcard-origin': 'error',

      // Disallow redirects built from unvalidated input (open redirect).
      'browser-security/no-insecure-redirects': 'error',

      // Warn when awaiting a non-Promise value (usually a mistake in async code).
      '@typescript-eslint/await-thenable': 'warn',

      // Prefer `import type` for type-only imports to avoid emitting runtime code.
      '@typescript-eslint/consistent-type-imports': 'warn',

      // Disallow using `new` with interfaces/types or misusing constructors in TS.
      '@typescript-eslint/no-misused-new': 'error',

      // Disallow passing Promises where a void-returning function is expected; prevents async bugs.
      // Relax noisy checks for conditionals/void returns for practicality.
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksConditionals: false,
          checksVoidReturn: false,
        },
      ],

      // Forbid patterns like `x! ?? y` which are unsafe and confusing.
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',

      // Reject type assertions that do not change the inferred type and only add noise.
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',

      // Disallow expression statements that do nothing (e.g. accidental short-circuiting).
      '@typescript-eslint/no-unused-expressions': 'error',

      // Error on unused variables; allow underscore-prefixed names and ignore rest siblings.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_', // underscore-prefixed arguments are considered intentionally unused
          ignoreRestSiblings: true,
        },
      ],

      // Suggest `as const` to narrow literal types and prevent accidental mutation.
      '@typescript-eslint/prefer-as-const': 'warn',

      // Warn when a function returns a Promise but isn't declared `async`.
      '@typescript-eslint/promise-function-async': 'warn',

      // Enforce strict equality to avoid coercion bugs.
      eqeqeq: ['error', 'always'],

      // Warn when a ternary can be simplified (readability).
      'no-unneeded-ternary': 'warn',
      // Ensure default import exists in the target module.
      'import-x/default': 'error',

      // Ensure exports are valid and consistent.
      'import-x/export': 'error',

      // Ensure named imports match exported names.
      'import-x/named': 'error',

      // Prevent circular dependencies which can cause runtime issues.
      'import-x/no-cycle': 'error',

      // Disallow multiple import statements from the same module.
      'import-x/no-duplicates': 'error',

      // Error on unresolved import paths (keeps imports reliable).
      'import-x/no-unresolved': 'error',

      // Warn on unnecessary `./` or `../` segments in import paths.
      'import-x/no-useless-path-segments': 'warn',

      // Keep imports grouped and alphabetized for consistent readability.
      'import-x/order': [
        'warn',
        {
          // Sort imports A→Z, case-insensitive.
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },

          // Group by module type (builtin, external, internal, etc.).
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          // Require a blank line between groups.
          'newlines-between': 'always',
        },
      ],

      // Disallow binary expressions that are always truthy/falsy (constant result).
      'no-constant-binary-expression': 'error',

      // Disallow constant expressions in conditions (likely a bug).
      'no-constant-condition': 'error',

      // Disallow duplicate function parameters.
      'no-dupe-args': 'error',

      // Disallow duplicate keys in object literals.
      'no-dupe-keys': 'error',

      // Disallow empty destructuring patterns.
      'no-empty-pattern': 'error',

      // Disallow unnecessary boolean casts (e.g., !! on a boolean).
      'no-extra-boolean-cast': 'error',

      // Warn on unsafe negation with relational operators (readability/safety).
      'no-unsafe-negation': 'warn',

      // Disallow unused private class members (dead code).
      'no-unused-private-class-members': 'error',

      // Prefer `const` for variables that are never reassigned.
      'prefer-const': 'warn',

      // Prefer rejecting Promises with `Error` objects for better stack traces.
      'prefer-promise-reject-errors': [
        'error',
        {
          allowEmptyReject: true, // allow bare `reject()` in rare cases
        },
      ],

      // Require specifying radix (base) for `parseInt` to avoid surprises.
      radix: 'error',

      // Disallow assignments that can race with `await`/`yield` (prevents lost updates).
      'require-atomic-updates': [
        'error',
        {
          allowProperties: true,
        },
      ],

      // Ensure correct `typeof` comparisons (e.g., 'undefined', 'object').
      'valid-typeof': 'warn',
    },
  },
  // For JavaScript files
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

    // TODO: add more pragmatic rules for JavaScript files
    rules: {
      // Disallow use of undeclared variables (do not warn inside `typeof`).
      'no-undef': [
        'error',
        {
          typeof: false, // keep default behavior: ignore undefined names used only in typeof
        },
      ],

      // Disallow variable/function redeclaration in the same scope.
      'no-redeclare': 'error',
    },
  },
]
