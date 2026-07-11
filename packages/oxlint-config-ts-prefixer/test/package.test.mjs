import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const PACKAGE_DIRECTORY_PATH = fileURLToPath(new URL('..', import.meta.url))

test('published tarball installs every public config entry in a clean consumer', () => {
  // Arrange
  const temporaryDirectoryPath = mkdtempSync(
    join(tmpdir(), 'oxlint-config-ts-prefixer-package-'),
  )
  const expectedTarballFiles = [
    'CHANGELOG.md',
    'LICENSE',
    'README.md',
    'index.mjs',
    'oxfmt.mjs',
    'package.json',
    'type-aware.mjs',
    'types/index.d.mts',
    'types/oxfmt.d.mts',
    'types/type-aware.d.mts',
  ]

  try {
    // Act
    const packResult = spawnSync(
      'npm',
      ['pack', '--json', '--pack-destination', temporaryDirectoryPath],
      {
        cwd: PACKAGE_DIRECTORY_PATH,
        encoding: 'utf8',
      },
    )

    // Assert
    assert.equal(
      packResult.status,
      0,
      `${packResult.stdout}\n${packResult.stderr}`,
    )
    const [packReport] = JSON.parse(packResult.stdout)
    assert.deepEqual(
      packReport.files.map(({ path }) => path).sort(),
      expectedTarballFiles,
    )

    // Arrange
    const tarballPath = join(temporaryDirectoryPath, packReport.filename)
    writeFileSync(
      join(temporaryDirectoryPath, 'package.json'),
      `${JSON.stringify({ private: true, type: 'module' }, null, 2)}\n`,
    )

    // Act
    const installResult = spawnSync(
      'npm',
      [
        'install',
        '--ignore-scripts',
        '--no-audit',
        '--no-fund',
        '--no-package-lock',
        tarballPath,
        'oxfmt@0.58.0',
        'oxlint@1.73.0',
        'oxlint-tsgolint@0.24.0',
      ],
      {
        cwd: temporaryDirectoryPath,
        encoding: 'utf8',
      },
    )
    writeFileSync(
      join(temporaryDirectoryPath, 'consumer.mjs'),
      "await Promise.all([import('oxlint-config-ts-prefixer'), import('oxlint-config-ts-prefixer/type-aware'), import('oxlint-config-ts-prefixer/oxfmt')])\n",
    )
    const importResult = spawnSync(process.execPath, ['consumer.mjs'], {
      cwd: temporaryDirectoryPath,
      encoding: 'utf8',
    })

    // Assert
    assert.equal(
      installResult.status,
      0,
      `${installResult.stdout}\n${installResult.stderr}`,
    )
    assert.equal(
      importResult.status,
      0,
      `${importResult.stdout}\n${importResult.stderr}`,
    )
  } finally {
    // Remove only the isolated package consumer created by this test.
    rmSync(temporaryDirectoryPath, { force: true, recursive: true })
  }
})
