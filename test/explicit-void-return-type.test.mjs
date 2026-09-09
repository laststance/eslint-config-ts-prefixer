import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { ESLint } from 'eslint'
import tseslint from 'typescript-eslint'

import { tsPrefixerPlugin } from '../explicit-void-return-type.mjs'

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url))
const VIRTUAL_TS_PATH = path.join(
  REPO_ROOT,
  'virtual-explicit-void-return-type.ts',
)
const VIRTUAL_TSX_PATH = path.join(
  REPO_ROOT,
  'virtual-explicit-void-return-type.tsx',
)

const VOID_MESSAGE =
  'This function is inferred as `void`. Write an explicit `: void` return type.'
const PROMISE_VOID_MESSAGE =
  'This function is inferred as `Promise<void>`. Write an explicit `: Promise<void>` return type.'

/**
 * Lint one TS snippet with only {@link tsPrefixerPlugin}'s void-return rule — used by every spec below.
 * @example await lintTs('function log() {}')
 */
async function lintTs(code, { fix = false, jsx = false } = {}) {
  const eslint = new ESLint({
    cwd: REPO_ROOT,
    fix,
    overrideConfigFile: true,
    overrideConfig: [
      {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
          'ts-prefixer': tsPrefixerPlugin,
        },
        languageOptions: {
          parser: tseslint.parser,
          parserOptions: {
            projectService: {
              allowDefaultProject: ['*.ts', '*.tsx'],
            },
            tsconfigRootDir: REPO_ROOT,
          },
        },
        rules: {
          'ts-prefixer/explicit-void-return-type': 'error',
        },
      },
    ],
  })

  const [result] = await eslint.lintText(code, {
    filePath: jsx ? VIRTUAL_TSX_PATH : VIRTUAL_TS_PATH,
  })

  return result
}

/**
 * Messages from {@link lintTs}, failing fast on parser/type-service errors.
 * @example await lintMessages('function log() {}')
 */
async function lintMessages(code, options) {
  const result = await lintTs(code, options)
  const fatal = result.messages.filter((message) => message.fatal)
  assert.equal(fatal.length, 0, JSON.stringify(result.messages, null, 2))
  return result.messages
}

test('flags a no-return function declaration as missing `: void`', async () => {
  // Arrange
  const code = 'function log() {\n  console.log(1)\n}\n'

  // Act
  const messages = await lintMessages(code)

  // Assert
  assert.equal(messages.length, 1)
  assert.equal(messages[0].ruleId, 'ts-prefixer/explicit-void-return-type')
  assert.equal(messages[0].message, VOID_MESSAGE)
})

test('flags a no-return const arrow as missing `: void`', async () => {
  // Arrange
  const code = 'const log = () => {\n  console.log(1)\n}\n'

  // Act
  const messages = await lintMessages(code)

  // Assert
  assert.equal(messages.length, 1)
  assert.equal(messages[0].message, VOID_MESSAGE)
})

test('flags an empty async function as missing `: Promise<void>`', async () => {
  // Arrange
  const code = 'async function run() {\n  await Promise.resolve()\n}\n'

  // Act
  const messages = await lintMessages(code)

  // Assert
  assert.equal(messages.length, 1)
  assert.equal(messages[0].message, PROMISE_VOID_MESSAGE)
})

test('flags a class method with no return as missing `: void`', async () => {
  // Arrange
  const code = 'class Logger {\n  log() {\n    console.log(1)\n  }\n}\n'

  // Act
  const messages = await lintMessages(code)

  // Assert
  assert.equal(messages.length, 1)
  assert.equal(messages[0].message, VOID_MESSAGE)
})

test('inserts `: void` on a no-return function declaration', async () => {
  // Arrange
  const code = 'function log() {\n  console.log(1)\n}\n'

  // Act
  const result = await lintTs(code, { fix: true })

  // Assert
  assert.equal(result.output, 'function log(): void {\n  console.log(1)\n}\n')
})

test('inserts `: Promise<void>` on an empty async arrow', async () => {
  // Arrange
  const code = 'const run = async () => {\n  await Promise.resolve()\n}\n'

  // Act
  const result = await lintTs(code, { fix: true })

  // Assert
  assert.equal(
    result.output,
    'const run = async (): Promise<void> => {\n  await Promise.resolve()\n}\n',
  )
})

test('allows inferred return types when the function returns a value', async () => {
  // Arrange
  const code =
    'function add(left: number, right: number) {\n  return left + right\n}\n'

  // Act
  const messages = await lintMessages(code)

  // Assert
  assert.deepEqual(messages, [])
})

test('allows an inferred `undefined` return (`return undefined`)', async () => {
  // Arrange
  const code = 'function nothing() {\n  return undefined\n}\n'

  // Act
  const messages = await lintMessages(code)

  // Assert
  assert.deepEqual(messages, [])
})

test('allows a function that already writes `: never`', async () => {
  // Arrange
  const code = "function fail(): never {\n  throw new Error('nope')\n}\n"

  // Act
  const messages = await lintMessages(code)

  // Assert
  assert.deepEqual(messages, [])
})

test('flags a throw-only function as `: void` because TypeScript infers `void`', async () => {
  // Arrange
  const code = "function fail() {\n  throw new Error('nope')\n}\n"

  // Act
  const messages = await lintMessages(code)

  // Assert
  assert.equal(messages.length, 1)
  assert.equal(messages[0].message, VOID_MESSAGE)
})

test('inserts `: void` on a paren-less arrow', async () => {
  // Arrange
  const code = 'const log = x => {\n  console.log(x)\n}\n'

  // Act
  const result = await lintTs(code, { fix: true })

  // Assert
  assert.equal(
    result.output,
    'const log = (x): void => {\n  console.log(x)\n}\n',
  )
})

test('does not insert `: void` after an earlier `)` when fixing a paren-less arrow', async () => {
  // Arrange
  const code =
    'function foo(): void {\n  console.log(1)\n}\nconst log = x => {\n  console.log(x)\n}\n'

  // Act
  const result = await lintTs(code, { fix: true })

  // Assert
  assert.equal(
    result.output,
    'function foo(): void {\n  console.log(1)\n}\nconst log = (x): void => {\n  console.log(x)\n}\n',
  )
})

test('imports typescript as a default so TypeScript 5 can resolve TypeFlags', async () => {
  // Arrange
  const source = await readFile(
    new URL('../explicit-void-return-type.mjs', import.meta.url),
    'utf8',
  )

  // Act
  const importLine = source.split('\n')[0]

  // Assert
  assert.equal(importLine, "import ts from 'typescript'")
})

test('allows a function that already writes `: void`', async () => {
  // Arrange
  const code = 'function log(): void {\n  console.log(1)\n}\n'

  // Act
  const messages = await lintMessages(code)

  // Assert
  assert.deepEqual(messages, [])
})

test('allows a typed variable to omit the inner `: void`', async () => {
  // Arrange
  const code = 'const log: () => void = () => {\n  console.log(1)\n}\n'

  // Act
  const messages = await lintMessages(code)

  // Assert
  assert.deepEqual(messages, [])
})

test('allows a callback argument to omit `: void`', async () => {
  // Arrange
  const code =
    'export function tap(values: number[]): void {\n  values.forEach(() => {\n    console.log(1)\n  })\n}\n'

  // Act
  const messages = await lintMessages(code)

  // Assert
  assert.deepEqual(messages, [])
})

test('allows a JSX handler to omit `: void`', async () => {
  // Arrange
  const code =
    'export function Button(props: { onClick: () => void }) {\n  return <button onClick={() => { props.onClick() }} />\n}\n'

  // Act
  const messages = await lintMessages(code, { jsx: true })

  // Assert
  assert.deepEqual(messages, [])
})

test('allows a constructor to omit a void return type', async () => {
  // Arrange
  const code = 'class Box {\n  constructor() {\n    console.log(1)\n  }\n}\n'

  // Act
  const messages = await lintMessages(code)

  // Assert
  assert.deepEqual(messages, [])
})

test('allows an IIFE to omit `: void`', async () => {
  // Arrange
  const code = 'void (function () {\n  console.log(1)\n})()\n'

  // Act
  const messages = await lintMessages(code)

  // Assert
  assert.deepEqual(messages, [])
})

test('still requires `: void` on a returned inner arrow', async () => {
  // Arrange
  const code =
    'function makeLog() {\n  return () => {\n    console.log(1)\n  }\n}\n'

  // Act
  const messages = await lintMessages(code)

  // Assert
  assert.equal(messages.length, 1)
  assert.equal(messages[0].message, VOID_MESSAGE)
})
