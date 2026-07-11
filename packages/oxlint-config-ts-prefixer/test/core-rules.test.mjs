import assert from 'node:assert/strict'
import test from 'node:test'

import { runOxlintFixture } from './helpers/run-oxlint.mjs'

test('rejects loose equality while accepting strict equality', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js': "export const matches = (value) => value == '1'\n",
  }
  const validFiles = {
    'valid.js': "export const matches = (value) => value === '1'\n",
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, ['eslint(eqeqeq)'])
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

test('rejects boolean identity ternaries while accepting direct boolean conversion', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js': 'export const enabled = (value) => value ? true : false\n',
  }
  const validFiles = {
    'valid.js': 'export const enabled = (value) => Boolean(value)\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'eslint(no-unneeded-ternary)',
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

test('rejects constant binary fallbacks while accepting value-dependent fallbacks', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js': "export const label = 'ready' || 'fallback'\n",
  }
  const validFiles = {
    'valid.js': "export const label = (value) => value || 'fallback'\n",
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'eslint(no-constant-binary-expression)',
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

test('rejects constant loop conditions while accepting data-dependent loop conditions', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js':
      'export function stopImmediately() {\n  while (1) {\n    break\n  }\n}\n',
  }
  const validFiles = {
    'valid.js':
      'export function empty(items) {\n  while (items.length > 0) {\n    items.pop()\n  }\n}\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'eslint(no-constant-condition)',
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

test('rejects duplicate object keys while accepting distinct keys', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js':
      "export const settings = { mode: 'compact', mode: 'expanded' }\n",
  }
  const validFiles = {
    'valid.js':
      "export const settings = { mode: 'compact', density: 'expanded' }\n",
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, ['eslint(no-dupe-keys)'])
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

test('rejects empty destructuring patterns while accepting bound properties', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js': 'export function select({}) {\n  return null\n}\n',
  }
  const validFiles = {
    'valid.js': 'export function select({ id }) {\n  return id\n}\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, ['eslint(no-empty-pattern)'])
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

test('rejects redundant boolean casts in conditions while accepting direct conditions', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js':
      "export function label(value) {\n  if (!!value) {\n    return 'yes'\n  }\n  return 'no'\n}\n",
  }
  const validFiles = {
    'valid.js':
      "export function label(value) {\n  if (value) {\n    return 'yes'\n  }\n  return 'no'\n}\n",
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'eslint(no-extra-boolean-cast)',
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

test('rejects negated left operands of in while accepting a negated comparison', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js': 'export const isMissing = (key, object) => !key in object\n',
  }
  const validFiles = {
    'valid.js': 'export const isMissing = (key, object) => !(key in object)\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'eslint(no-unsafe-negation)',
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

test('rejects unused private class members while accepting members used by public behavior', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js': 'export class Counter {\n  #count = 0\n}\n',
  }
  const validFiles = {
    'valid.js':
      'export class Counter {\n  #count = 0\n\n  value() {\n    return this.#count\n  }\n}\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'eslint(no-unused-private-class-members)',
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

test('warns on never-reassigned let bindings while accepting reassigned bindings', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js':
      'export function initial() {\n  let value = 1\n  return value\n}\n',
  }
  const validFiles = {
    'valid.js':
      'export function increment() {\n  let value = 1\n  value += 1\n  return value\n}\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, ['eslint(prefer-const)'])
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

test('rejects non-Error promise rejections while accepting Error and empty rejections', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js': "export const fail = () => Promise.reject('failure')\n",
  }
  const validFiles = {
    'error.js':
      "export const failWithCause = () => Promise.reject(new Error('failure'))\n",
    'empty.js': 'export const failWithoutCause = () => Promise.reject()\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'eslint(prefer-promise-reject-errors)',
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

test('rejects parseInt without a radix while accepting an explicit decimal radix', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js': "export const parsed = parseInt('10')\n",
  }
  const validFiles = {
    'valid.js': "export const parsed = parseInt('10', 10)\n",
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, ['eslint(radix)'])
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

test('warns on impossible typeof strings while accepting valid typeof comparisons', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js':
      "export const isString = (value) => typeof value === 'strnig'\n",
  }
  const validFiles = {
    'valid.js':
      "export const isString = (value) => typeof value === 'string'\n",
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, ['eslint(valid-typeof)'])
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

test('rejects expression statements without effects while accepting returned expressions', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js': 'export function read(value) {\n  value\n}\n',
  }
  const validFiles = {
    'valid.js': 'export function read(value) {\n  return value\n}\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'eslint(no-unused-expressions)',
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

test('rejects trailing unused arguments while accepting intentional underscore arguments', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js':
      'export function format(prefix, suffix) {\n  return prefix\n}\n',
  }
  const validFiles = {
    'valid.js':
      'export function format(prefix, _suffix) {\n  return prefix\n}\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, ['eslint(no-unused-vars)'])
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

test('rejects undeclared JavaScript references while accepting typeof probes allowed by the override', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js': 'export const value = missingGlobal\n',
  }
  const validFiles = {
    'valid.js': 'export const availability = typeof optionalGlobal\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, ['eslint(no-undef)'])
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

test('rejects repeated JavaScript declarations while accepting distinct declarations', () => {
  // Arrange
  const invalidFiles = {
    'invalid.js': 'var value = 1\nvar value = 2\nconsole.log(value)\n',
  }
  const validFiles = {
    'valid.js': 'var first = 1\nvar second = 2\nconsole.log(first + second)\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.deepEqual(invalidResult.diagnosticCodes, ['eslint(no-redeclare)'])
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
