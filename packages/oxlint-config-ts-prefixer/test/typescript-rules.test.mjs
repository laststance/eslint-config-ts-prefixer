import assert from 'node:assert/strict'
import test from 'node:test'

import { runOxlintFixture } from './helpers/run-oxlint.mjs'

test('default preset warns for runtime imports used only as types and accepts explicit type imports', () => {
  // Arrange
  const invalidFiles = {
    'invalid.ts': `import { Stats } from 'node:fs'

export type FileStats = Stats
`,
  }
  const validFiles = {
    'valid.ts': `import type { Stats } from 'node:fs'

export type FileStats = Stats
`,
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'typescript(consistent-type-imports)',
  ])
  assert.equal(
    invalidResult.status,
    1,
    `${invalidResult.stdout}\n${invalidResult.stderr}`,
  )
  assert.deepEqual(validResult.diagnosticCodes, [])
  assert.equal(
    validResult.status,
    0,
    `${validResult.stdout}\n${validResult.stderr}`,
  )
})

test('default preset rejects class methods named new and accepts real constructors', () => {
  // Arrange
  const invalidFiles = {
    'invalid.ts': `export declare class BrokenFactory {
  new(): BrokenFactory
}
`,
  }
  const validFiles = {
    'valid.ts': `export declare class ValidFactory {
  constructor()
}
`,
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'typescript(no-misused-new)',
  ])
  assert.equal(
    invalidResult.status,
    1,
    `${invalidResult.stdout}\n${invalidResult.stderr}`,
  )
  assert.deepEqual(validResult.diagnosticCodes, [])
  assert.equal(
    validResult.status,
    0,
    `${validResult.stdout}\n${validResult.stderr}`,
  )
})

test('default preset rejects non-null assertions before nullish fallbacks and accepts nullable operands', () => {
  // Arrange
  const invalidFiles = {
    'invalid.ts': `declare function getName(): string | null

export const resolvedName = getName()! ?? 'fallback'
`,
  }
  const validFiles = {
    'valid.ts': `declare function getName(): string | null

export const resolvedName = getName() ?? 'fallback'
`,
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'typescript(no-non-null-asserted-nullish-coalescing)',
  ])
  assert.equal(
    invalidResult.status,
    1,
    `${invalidResult.stdout}\n${invalidResult.stderr}`,
  )
  assert.deepEqual(validResult.diagnosticCodes, [])
  assert.equal(
    validResult.status,
    0,
    `${validResult.stdout}\n${validResult.stderr}`,
  )
})

test('default preset warns for repeated literal assertions and accepts as const', () => {
  // Arrange
  const invalidFiles = {
    'invalid.ts': `export const settings = { mode: 'safe' as 'safe' }
`,
  }
  const validFiles = {
    'valid.ts': `export const settings = { mode: 'safe' as const }
`,
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'typescript(prefer-as-const)',
  ])
  assert.equal(
    invalidResult.status,
    1,
    `${invalidResult.stdout}\n${invalidResult.stderr}`,
  )
  assert.deepEqual(validResult.diagnosticCodes, [])
  assert.equal(
    validResult.status,
    0,
    `${validResult.stdout}\n${validResult.stderr}`,
  )
})

test('type-aware preset warns when await receives a number and accepts a Promise', () => {
  // Arrange
  const invalidFiles = {
    'invalid.ts': `export async function readCount(): Promise<number> {
  return await 12
}
`,
  }
  const validFiles = {
    'valid.ts': `export async function readCount(): Promise<number> {
  return await Promise.resolve(12)
}
`,
  }

  // Act
  const invalidResult = runOxlintFixture({
    files: invalidFiles,
    typeAware: true,
  })
  const validResult = runOxlintFixture({
    files: validFiles,
    typeAware: true,
  })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'typescript(await-thenable)',
  ])
  assert.equal(
    invalidResult.status,
    1,
    `${invalidResult.stdout}\n${invalidResult.stderr}`,
  )
  assert.deepEqual(validResult.diagnosticCodes, [])
  assert.equal(
    validResult.status,
    0,
    `${validResult.stdout}\n${validResult.stderr}`,
  )
})

test('type-aware preset rejects Promise spreads while allowing configured conditionals and void callbacks', () => {
  // Arrange
  const invalidFiles = {
    'invalid.ts': `export async function copyData(): Promise<object> {
  const data = Promise.resolve({ value: 1 })
  return { ...data }
}
`,
  }
  const validFiles = {
    'valid.ts': `export async function runAllowedPromiseUses(): Promise<void> {
  const ready = Promise.resolve(true)
  if (ready) {
    await Promise.resolve()
  }

  [1, 2, 3].forEach(async (value) => {
    await Promise.resolve(value)
  })
}
`,
  }

  // Act
  const invalidResult = runOxlintFixture({
    files: invalidFiles,
    typeAware: true,
  })
  const validResult = runOxlintFixture({
    files: validFiles,
    typeAware: true,
  })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'typescript(no-misused-promises)',
  ])
  assert.equal(
    invalidResult.status,
    1,
    `${invalidResult.stdout}\n${invalidResult.stderr}`,
  )
  assert.deepEqual(validResult.diagnosticCodes, [])
  assert.equal(
    validResult.status,
    0,
    `${validResult.stdout}\n${validResult.stderr}`,
  )
})

test('type-aware preset warns for Promise-returning functions without async and accepts explicit async functions', () => {
  // Arrange
  const invalidFiles = {
    'invalid.ts': `export function fetchValue(): Promise<string> {
  return Promise.resolve('value')
}
`,
  }
  const validFiles = {
    'valid.ts': `export async function fetchValue(): Promise<string> {
  return 'value'
}
`,
  }

  // Act
  const invalidResult = runOxlintFixture({
    files: invalidFiles,
    typeAware: true,
  })
  const validResult = runOxlintFixture({
    files: validFiles,
    typeAware: true,
  })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'typescript(promise-function-async)',
  ])
  assert.equal(
    invalidResult.status,
    1,
    `${invalidResult.stdout}\n${invalidResult.stderr}`,
  )
  assert.deepEqual(validResult.diagnosticCodes, [])
  assert.equal(
    validResult.status,
    0,
    `${validResult.stdout}\n${validResult.stderr}`,
  )
})
