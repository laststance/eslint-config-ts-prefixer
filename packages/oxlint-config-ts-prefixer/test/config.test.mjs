import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { runOxlintFixture } from './helpers/run-oxlint.mjs'

test('default entry exposes the explicit native Oxlint preset', async () => {
  // Arrange
  const expectedPlugins = ['typescript', 'import']

  // Act
  const { default: config } = await import('../index.mjs')

  // Assert
  assert.deepEqual(config.plugins, expectedPlugins)
  assert.equal(config.rules.eqeqeq[0], 'error')
  assert.equal(config.rules['typescript/consistent-type-imports'], 'warn')
  assert.equal(config.rules['import/no-cycle'], 'error')
  assert.equal(Object.keys(config.rules).length, 24)
})

test('type-aware entry includes the default preset and three promise safety rules', async () => {
  // Arrange
  const expectedTypeAwareRules = [
    'typescript/await-thenable',
    'typescript/no-misused-promises',
    'typescript/promise-function-async',
  ]

  // Act
  const [{ default: defaultConfig }, { default: typeAwareConfig }] =
    await Promise.all([import('../index.mjs'), import('../type-aware.mjs')])

  // Assert
  assert.deepEqual(typeAwareConfig.plugins, defaultConfig.plugins)
  assert.deepEqual(typeAwareConfig.overrides, defaultConfig.overrides)
  assert.equal(Object.keys(typeAwareConfig.rules).length, 27)
  for (const ruleName of expectedTypeAwareRules) {
    assert.equal(Object.hasOwn(typeAwareConfig.rules, ruleName), true)
  }
})

test('Oxfmt entry preserves grouped ascending imports without moving side effects', async () => {
  // Arrange
  const expectedGroups = [
    'value-builtin',
    'value-external',
    'value-internal',
    'value-parent',
    'value-sibling',
    'value-index',
    'type-import',
    'unknown',
  ]

  // Act
  const { default: config } = await import('../oxfmt.mjs')

  // Assert
  assert.deepEqual(config.sortImports.groups, expectedGroups)
  assert.equal(config.sortImports.ignoreCase, true)
  assert.equal(config.sortImports.newlinesBetween, true)
  assert.equal(config.sortImports.order, 'asc')
  assert.equal(config.sortImports.sortSideEffects, false)
  assert.equal(Object.keys(config).length, 1)
})

test('TypeScript consumers receive valid types for every public subpath', () => {
  // Arrange
  const packageDirectoryPath = fileURLToPath(new URL('..', import.meta.url))
  const typeScriptCliPath = fileURLToPath(
    import.meta.resolve('typescript/lib/tsc.js'),
  )

  // Act
  const result = spawnSync(
    process.execPath,
    [
      typeScriptCliPath,
      '--noEmit',
      '--ignoreConfig',
      '--strict',
      '--module',
      'NodeNext',
      '--moduleResolution',
      'NodeNext',
      '--target',
      'ES2022',
      'test/type-fixture/consumer.ts',
    ],
    {
      cwd: packageDirectoryPath,
      encoding: 'utf8',
    },
  )

  // Assert
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`)
})

test('shared environment overrides allow browser, Jest, and Node globals', () => {
  // Arrange
  const files = {
    'environment.js':
      "describe('environment', () => { document.title = process.title })\n",
  }

  // Act
  const result = runOxlintFixture({ files })

  // Assert
  assert.deepEqual(result.diagnosticCodes, [])
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`)
})

test('CommonJS TypeScript files receive the default rule contract', () => {
  // Arrange
  const files = {
    'module.cts': "export const matches = (value: string) => value == '1'\n",
  }

  // Act
  const result = runOxlintFixture({ files })

  // Assert
  assert.deepEqual(result.diagnosticCodes, ['eslint(eqeqeq)'])
  assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`)
})
