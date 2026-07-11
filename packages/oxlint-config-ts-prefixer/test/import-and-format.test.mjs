import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { runOxlintFixture } from './helpers/run-oxlint.mjs'

const PACKAGE_DIRECTORY_PATH = fileURLToPath(new URL('..', import.meta.url))
const TEST_DIRECTORY_PATH = fileURLToPath(new URL('.', import.meta.url))
const OXFMT_BINARY_PATH = join(
  PACKAGE_DIRECTORY_PATH,
  'node_modules/oxfmt/bin/oxfmt',
)

test('default imports fail when the target omits a default export and pass when it exposes one', () => {
  // Arrange
  const invalidFiles = {
    'consumer.js': "import primary from './library.js'\nconsole.log(primary)\n",
    'library.js': 'export const secondary = 1\n',
  }
  const validFiles = {
    'consumer.js': "import primary from './library.js'\nconsole.log(primary)\n",
    'library.js': 'const primary = 1\nexport default primary\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.equal(invalidResult.status, 1)
  assert.deepEqual(invalidResult.diagnosticCodes, ['import(default)'])
  assert.equal(validResult.status, 0)
  assert.deepEqual(validResult.diagnosticCodes, [])
})

test('barrel exports fail when a star re-export conflicts with an explicit name and pass when names stay unique', () => {
  // Arrange
  const barrelSource =
    "const local = 1\nexport { local as shared }\nexport * from './library.js'\n"
  const invalidFiles = {
    'barrel.js': barrelSource,
    'library.js': 'export const shared = 2\n',
  }
  const validFiles = {
    'barrel.js': barrelSource,
    'library.js': 'export const secondary = 2\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.equal(invalidResult.status, 1)
  assert.deepEqual(invalidResult.diagnosticCodes, ['import(export)'])
  assert.equal(validResult.status, 0)
  assert.deepEqual(validResult.diagnosticCodes, [])
})

test('named imports fail when the target omits the requested export and pass when it exposes it', () => {
  // Arrange
  const consumerSource =
    "import { requested } from './library.js'\nconsole.log(requested)\n"
  const invalidFiles = {
    'consumer.js': consumerSource,
    'library.js': 'export const available = 1\n',
  }
  const validFiles = {
    'consumer.js': consumerSource,
    'library.js': 'export const requested = 1\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.equal(invalidResult.status, 1)
  assert.deepEqual(invalidResult.diagnosticCodes, ['import(named)'])
  assert.equal(validResult.status, 0)
  assert.deepEqual(validResult.diagnosticCodes, [])
})

test('dependency cycles fail for both participating modules and shared one-way dependencies pass', () => {
  // Arrange
  const invalidFiles = {
    'alpha.js':
      "import { beta } from './beta.js'\nexport const alpha = beta + 1\n",
    'beta.js':
      "import { alpha } from './alpha.js'\nexport const beta = alpha + 1\n",
  }
  const validFiles = {
    'alpha.js':
      "import { shared } from './shared.js'\nexport const alpha = shared + 1\n",
    'beta.js':
      "import { shared } from './shared.js'\nexport const beta = shared + 2\n",
    'shared.js': 'export const shared = 0\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.equal(invalidResult.status, 1)
  assert.deepEqual(invalidResult.diagnosticCodes, [
    'import(no-cycle)',
    'import(no-cycle)',
  ])
  assert.equal(validResult.status, 0)
  assert.deepEqual(validResult.diagnosticCodes, [])
})

test('duplicate module imports fail and a consolidated import passes', () => {
  // Arrange
  const invalidFiles = {
    'consumer.js':
      "import { first } from './library.js'\nimport { second } from './library.js'\nconsole.log(first, second)\n",
    'library.js': 'export const first = 1\nexport const second = 2\n',
  }
  const validFiles = {
    'consumer.js':
      "import { first, second } from './library.js'\nconsole.log(first, second)\n",
    'library.js': 'export const first = 1\nexport const second = 2\n',
  }

  // Act
  const invalidResult = runOxlintFixture({ files: invalidFiles })
  const validResult = runOxlintFixture({ files: validFiles })

  // Assert
  assert.equal(invalidResult.status, 1)
  assert.deepEqual(invalidResult.diagnosticCodes, ['import(no-duplicates)'])
  assert.equal(validResult.status, 0)
  assert.deepEqual(validResult.diagnosticCodes, [])
})

test('Oxfmt writes grouped case-insensitive imports while preserving side-effect positions', () => {
  // Arrange
  const fixtureDirectoryPath = mkdtempSync(
    join(TEST_DIRECTORY_PATH, 'tmp-import-format-'),
  )
  const sourceFilePath = join(fixtureDirectoryPath, 'input.ts')
  const unformattedSource =
    "import type { Zebra } from './types.js'\n" +
    "import './z-side-effect.js'\n" +
    "import siblingZeta from './zeta.js'\n" +
    "import zebraPackage from 'Zebra'\n" +
    "import fs from 'node:fs'\n" +
    "import alphaPackage from 'alpha'\n" +
    "import parent from '../parent.js'\n" +
    "import './a-side-effect.js'\n" +
    "import index from './index.js'\n" +
    "import internal from '#internal'\n" +
    "import siblingAlpha from './Alpha.js'\n" +
    "import siblingBeta from './beta.js'\n"
  const expectedFormattedSource =
    'import fs from "node:fs";\n' +
    '\n' +
    'import "./z-side-effect.js";\n' +
    'import alphaPackage from "alpha";\n' +
    'import zebraPackage from "Zebra";\n' +
    '\n' +
    'import internal from "#internal";\n' +
    '\n' +
    'import parent from "../parent.js";\n' +
    '\n' +
    'import siblingAlpha from "./Alpha.js";\n' +
    'import "./a-side-effect.js";\n' +
    'import siblingBeta from "./beta.js";\n' +
    'import siblingZeta from "./zeta.js";\n' +
    '\n' +
    'import index from "./index.js";\n' +
    '\n' +
    'import type { Zebra } from "./types.js";\n'

  try {
    writeFileSync(
      join(fixtureDirectoryPath, 'oxfmt.config.ts'),
      "import preset from '../../oxfmt.mjs'\n\nexport default preset\n",
    )
    writeFileSync(sourceFilePath, unformattedSource)

    // Act
    const result = spawnSync(
      OXFMT_BINARY_PATH,
      ['--config=oxfmt.config.ts', '--write', 'input.ts'],
      {
        cwd: fixtureDirectoryPath,
        encoding: 'utf8',
      },
    )
    const formattedSource = readFileSync(sourceFilePath, 'utf8')

    // Assert
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`)
    assert.equal(result.stderr, '')
    assert.equal(formattedSource, expectedFormattedSource)
  } finally {
    // Remove only the isolated formatter project created by this test.
    rmSync(fixtureDirectoryPath, { force: true, recursive: true })
  }
})
