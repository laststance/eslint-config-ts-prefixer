# oxlint-config-ts-prefixer

Native-first [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) rules for meaningful runtime behavior and import organization.

> [!WARNING]
> This package is in beta. Oxlint TypeScript module configs are experimental, and three explicitly enabled rules are in Oxlint's nursery category.

## Requirements

- Node.js 22.18+ or 24+
- `oxlint >=1.73.0 <2`
- TypeScript 7+ and `oxlint-tsgolint >=0.24.0 <0.25.0` only when using the type-aware preset
- `oxfmt >=0.58.0 <0.59.0` only when using the import-sorting preset

## Default preset

Install the package and Oxlint:

```bash
pnpm add -D oxlint-config-ts-prefixer@beta oxlint
```

Create `oxlint.config.ts`:

```ts
import { defineConfig } from 'oxlint'
import tsPrefixer from 'oxlint-config-ts-prefixer'

export default defineConfig({
  // Shared configs do not inherit categories, so keep the preset explicit-only here.
  categories: {
    correctness: 'off',
  },
  extends: [tsPrefixer],
})
```

Add scripts:

```json
{
  "scripts": {
    "lint": "oxlint --deny-warnings .",
    "lint:fix": "oxlint --fix --deny-warnings ."
  }
}
```

The default preset applies to Oxlint-supported JavaScript and TypeScript files, including `.cts`, and enables browser, Jest, and Node.js globals. Project-specific ignores and root-only options remain in the consumer config.

## Type-aware preset

Install the optional type-aware engine:

```bash
pnpm add -D oxlint-tsgolint
```

Use the superset entry and enable type awareness in the root config:

```ts
import { defineConfig } from 'oxlint'
import tsPrefixer from 'oxlint-config-ts-prefixer/type-aware'

export default defineConfig({
  categories: {
    correctness: 'off',
  },
  extends: [tsPrefixer],
  options: {
    typeAware: true,
  },
})
```

This entry adds:

- `typescript/await-thenable`
- `typescript/no-misused-promises`
- `typescript/promise-function-async`

Oxlint type-aware linting uses TypeScript 7 semantics. Migrate deprecated compiler options such as `baseUrl` before adopting this preset.

## Oxfmt import sorting

Oxlint intentionally does not implement `import/order`. Install Oxfmt when you want the package's import organization:

```bash
pnpm add -D oxfmt
```

Create `oxfmt.config.ts`:

```ts
import { defineConfig } from 'oxfmt'
import importSorting from 'oxlint-config-ts-prefixer/oxfmt'

export default defineConfig({
  ...importSorting,
  // Add project-owned formatting options here.
})
```

The preset sorts value imports as builtin → external → internal → parent → sibling → index, followed by type imports and unknown forms. Groups use blank lines, names sort ascending without case sensitivity, and side-effect imports retain source order.

Only import sorting is configured. Quote style, semicolons, line width, package.json sorting, and other formatter behavior remain project-owned.

## Compatibility with eslint-config-ts-prefixer

The ESLint package currently configures 35 rules. This native-first package handles them as follows:

| Status                           | Count | Notes                                                                                                         |
| -------------------------------- | ----: | ------------------------------------------------------------------------------------------------------------- |
| Default native rules             |    26 | Includes `import/export`, `import/named`, and `no-undef`, which Oxlint currently classifies as nursery rules. |
| Optional type-aware native rules |     3 | Available from `oxlint-config-ts-prefixer/type-aware`.                                                        |
| Intentionally omitted            |     6 | No stable native equivalent with matching behavior.                                                           |

### Intentional differences

| ESLint rule                         | Native-first policy                                                                          |
| ----------------------------------- | -------------------------------------------------------------------------------------------- |
| `no-dupe-args`                      | Omitted because strict modules already reject duplicate parameters.                          |
| `no-return-await`                   | Omitted because ESLint deprecated the rule.                                                  |
| `require-atomic-updates`            | Omitted until Oxlint provides a native equivalent.                                           |
| `import-x/no-unresolved`            | Omitted because Oxlint does not expose a native rule with reliable cross-project resolution. |
| `import-x/no-useless-path-segments` | Omitted until Oxlint provides a native equivalent.                                           |
| `import-x/order`                    | Replaced by the optional Oxfmt preset.                                                       |

The package does not load `eslint-plugin-import-x` through Oxlint's alpha JavaScript plugin API. Projects that require exact parity for omitted rules should continue running ESLint for those checks during migration.

## Public entries

| Import                                 | Purpose                                | Additional peer   |
| -------------------------------------- | -------------------------------------- | ----------------- |
| `oxlint-config-ts-prefixer`            | 26 native rules                        | None              |
| `oxlint-config-ts-prefixer/type-aware` | Default preset plus 3 type-aware rules | `oxlint-tsgolint` |
| `oxlint-config-ts-prefixer/oxfmt`      | Import sorting only                    | `oxfmt`           |

## Configuration ownership

Oxlint shared config inheritance carries rules, plugins, and overrides. Keep these values in the consuming root config:

- `categories.correctness: 'off'` for explicit-only behavior
- `options.typeAware: true` when using the type-aware entry
- unused-disable reporting preferences
- project-specific ignore patterns
- nonstandard project configuration

See the official [Oxlint shared config documentation](https://oxc.rs/docs/guide/usage/linter/config.html#extend-shared-configs), [type-aware guide](https://oxc.rs/docs/guide/usage/linter/type-aware.html), and [Oxfmt sorting guide](https://oxc.rs/docs/guide/usage/formatter/sorting.html) for upstream details.

## License

MIT
