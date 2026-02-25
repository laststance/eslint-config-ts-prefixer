---
description: 'Disallow unused expressions.'
---

It supports TypeScript-specific expressions:

- Marks directives in modules declarations (`"use strict"`, etc.) as not unused
- Marks the following expressions as unused if their wrapped value expressions are unused:
  - Assertion expressions: `x as number;`, `x!;`, `<number>x;`
  - Instantiation expressions: `Set<number>;`

Although the type expressions never have runtime side effects (that is, `x!;` is the same as `x;`), they can be used to assert types for testing purposes.

## Examples

<Tabs>
<TabItem value="❌ Incorrect">

```ts
Set<number>
1 as number
window!
```

</TabItem>
<TabItem value="✅ Correct">

```ts
function getSet() {
  return Set
}

// Funtion calls are allowed, so type expressions that wrap function calls are allowed
getSet()<number>
getSet() as Set<unknown>
getSet()!

// Namespaces can have directives
namespace A {
  'use strict'
}
```

</TabItem>
</Tabs>
