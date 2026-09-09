---
title: explicit-void-return-type
description: 'Require explicit `void` or `Promise<void>` return types when that is the inferred return type.'
rule_type: problem
---

First-party rule that fills the gap in `@typescript-eslint/explicit-function-return-type`: value-returning functions may keep inferred return types. Functions inferred as `void` or `Promise<void>` must write that type.

The `--fix` option inserts `: void` or `: Promise<void>`.

## Rule Details

Examples of **incorrect** code for this rule:

::: incorrect

```ts
/*eslint ts-prefixer/explicit-void-return-type: "error"*/

function log() {
  console.log(1)
}

const run = async () => {
  await Promise.resolve()
}
```

:::

Examples of **correct** code for this rule:

::: correct

```ts
/*eslint ts-prefixer/explicit-void-return-type: "error"*/

function log(): void {
  console.log(1)
}

const run = async (): Promise<void> => {
  await Promise.resolve()
}

function add(left: number, right: number) {
  return left + right
}

const handler: () => void = () => {
  console.log(1)
}

items.forEach(() => {
  console.log(1)
})
```

:::

## When the annotation is not required

- The function already has a return type annotation
- TypeScript infers a value (`number`, `string`, `undefined`, `never`, `Promise<number>`, …)
- The function is a callback argument, JSX handler, or assigned to a typed variable / object
- Constructors, getters, setters, generators, and IIFEs
