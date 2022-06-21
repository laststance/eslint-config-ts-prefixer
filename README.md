<div align="center">
<h1>eslint-config-typescript-react-pro-beautiful 🌈</h1>

<p>ESLint rules for all of my React + TypesScript projects. Without <a href="https://stackoverflow.com/questions/58866796/understanding-the-react-hooks-exhaustive-deps-lint-rule">exhaustive-deps</a> rule :-)</p>
</div>

---

### This config is:

- ✅ No meaningless rules.
- ✅ All containing rules are explicit.
- ✅ Only extend `eslint-plugin-jsx-a11y:recommend` for UX.
- ✅ Include all dependency package.(except `eslint-prettier-plugin`)
- 👋 Good by `// eslint-disable-next-line react-hooks/exhaustive-deps`


### `Index.js` : All plugins/config/rules this package includes.

```js
module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ['plugin:jsx-a11y/recommended'],
  globals: {
    JSX: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'jsx-a11y',
    'import',
    'sort-keys-fix',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
  ],
  root: true,
  rules: {
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/prefer-as-const': 'warn',
    'import/default': 'error',
    'import/export': 'error',
    'import/named': 'error',
    'import/no-anonymous-default-export': 'off',
    'import/no-duplicates': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': 'error',
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
    'no-console': 'error',
    'no-dupe-keys': 'error',
    'no-unused-private-class-members': 'error',
    'prettier/prettier': [
      'warn',
      {},
      {
        properties: {
          usePrettierrc: true,
        },
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'sort-keys-fix/sort-keys-fix': 'warn',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        project: ['tsconfig.json'],
      },
    },
    react: {
      version: 'detect',
    },
  },
}
```

and `extends: ['plugin:jsx-a11y/recommended']` rule sets.

<!-- AUTO-GENERATED-CONTENT:START (TABLE) -->
| Rule | Recommended | 
| :--- | :--- | 
| [accessible-emoji](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/accessible-emoji.md) | error | 
| [alt-text](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/alt-text.md) | error | 
| [anchor-has-content](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/anchor-has-content.md) | error |
| [anchor-is-valid](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/anchor-is-valid.md) | error |
| [aria-activedescendant-has-tabindex](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/aria-activedescendant-has-tabindex.md) | error |
| [aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/aria-props.md) | error |
| [aria-proptypes](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/aria-proptypes.md) | error | 
| [aria-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/aria-role.md) | error |
| [aria-unsupported-elements](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/aria-unsupported-elements.md) | error |
| [autocomplete-valid](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/autocomplete-valid.md) | error |
| [click-events-have-key-events](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/click-events-have-key-events.md) | error | 
| [control-has-associated-label](undefined) | error |
| [heading-has-content](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/heading-has-content.md) | error |
| [html-has-lang](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/html-has-lang.md) | error |
| [iframe-has-title](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/iframe-has-title.md) | error |
| [img-redundant-alt](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/img-redundant-alt.md) | error |
| [interactive-supports-focus](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/interactive-supports-focus.md) | error |
| [label-has-associated-control](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-associated-control.md) | error | error |
| [label-has-for](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/label-has-for.md) | error |
| [lang](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/lang.md) | error |
| [media-has-caption](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/media-has-caption.md) | error |
| [mouse-events-have-key-events](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/mouse-events-have-key-events.md) | error |
| [no-access-key](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-access-key.md) | error |
| [no-autofocus](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-autofocus.md) | error |
| [no-distracting-elements](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-distracting-elements.md) | error |
| [no-interactive-element-to-noninteractive-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-interactive-element-to-noninteractive-role.md) | error, with options |
| [no-noninteractive-element-interactions](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-noninteractive-element-interactions.md) | error, with options |
| [no-noninteractive-element-to-interactive-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-noninteractive-element-to-interactive-role.md) | error, with options |
| [no-noninteractive-tabindex](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-noninteractive-tabindex.md) | error, with options |
| [no-onchange](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-onchange.md) | error |
| [no-redundant-roles](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-redundant-roles.md) | error |
| [no-static-element-interactions](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-static-element-interactions.md) | error, with options |
| [role-has-required-aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/role-has-required-aria-props.md) | error |
| [role-supports-aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/role-supports-aria-props.md) | error |
| [scope](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/scope.md) | error, with options |
| [tabindex-no-positive](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/tabindex-no-positive.md) | error |
<!-- AUTO-GENERATED-CONTENT:END -->


## Installation

This module is distributed via npm which is bundled with node and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev eslint-config-typescript-react-pro-beautiful eslint-plugin-prettier
```
or using yarn

```
yarn add -D eslint-config-typescript-react-pro-beautiful eslint-plugin-prettier
```

And install Typescript if you have not installed Typescript.  
Because This package has a `peerDependencies` for TypeScirpt.[^1]  

```
npm install --save-dev typescript
```

or using yarn

```
yarn add -D typescript
```

## Usage

Add the extends to your `.eslintrc.js` or `.eslintrc.json` or `.eslintrc`:

```json
{
  "extends": "typescript-react-pro-beautiful"
}
```

And need `.prettierrc` file because this package refers your `.prettierrc` and use directly.  
If you don't have `.prettierrc`, please `touch .prettierrc` and set prettier rules depends on your preferece like this.

```json
{
  "singleQuote": true,
  "semi": false
}
```

## LICENSE

MIT


[^1]: The same thing The same thing can be said for React. General install guide skiped because author assumed almost peaople who trying getting start the library are already installed React and developing React application.)
