---
description: 'Disallow type assertions that do not change the type of an expression.'
---

Type assertions should communicate information that TypeScript cannot infer on its own.
This preset reports redundant assertions as errors because they add visual noise and can hide misunderstandings about the inferred type.

This rule requires type information.

## Examples

### Incorrect

```ts
const message: string = 'hello'
const redundantMessage = message as string

function getCount(): number {
  return 1
}
const redundantCount = getCount() as number
```

### Correct

```ts
const input: unknown = 'hello'
const message = input as string

const element = document.getElementById('email') as HTMLInputElement
```

## Configuration

```js
'@typescript-eslint/no-unnecessary-type-assertion': 'error'
```

For Oxlint's type-aware preset, the equivalent rule is `typescript/no-unnecessary-type-assertion`.
