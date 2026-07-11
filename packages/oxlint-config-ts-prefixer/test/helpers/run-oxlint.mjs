import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { delimiter, dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const PACKAGE_DIRECTORY_PATH = fileURLToPath(new URL('../..', import.meta.url))
const OXLINT_BINARY_PATH = join(
  PACKAGE_DIRECTORY_PATH,
  'node_modules/oxlint/bin/oxlint',
)

/**
 * Runs a published preset entry through the real Oxlint CLI whenever a rule contract test executes.
 * @param {{ files: Record<string, string>, typeAware?: boolean }} fixture - Isolated source files and whether type-aware execution is required.
 * @returns {{ diagnosticCodes: string[], status: number | null, stderr: string, stdout: string }} Parsed rule codes plus the observable CLI result.
 * @example
 * runOxlintFixture({ files: { 'invalid.js': 'value == 1' } })
 * // => { diagnosticCodes: ['eslint(eqeqeq)'], status: 1, ... }
 */
export const runOxlintFixture = ({ files, typeAware = false }) => {
  const fixtureDirectoryPath = mkdtempSync(
    join(tmpdir(), 'oxlint-config-ts-prefixer-'),
  )
  const presetEntryPath = join(
    PACKAGE_DIRECTORY_PATH,
    typeAware ? 'type-aware.mjs' : 'index.mjs',
  )
  const typeAwareOption = typeAware ? '  options: { typeAware: true },\n' : ''
  const configSource = `import preset from '${pathToFileURL(presetEntryPath).href}'\n\nexport default {\n  categories: { correctness: 'off' },\n  extends: [preset],\n${typeAwareOption}}\n`

  try {
    writeFileSync(join(fixtureDirectoryPath, 'oxlint.config.ts'), configSource)
    writeFileSync(
      join(fixtureDirectoryPath, 'tsconfig.json'),
      `${JSON.stringify(
        {
          compilerOptions: {
            module: 'NodeNext',
            moduleResolution: 'NodeNext',
            noEmit: true,
            strict: true,
            target: 'ES2022',
          },
          include: ['**/*'],
        },
        null,
        2,
      )}\n`,
    )

    // Materialize every hard-coded source file so multi-file import rules see a real project graph.
    for (const [relativeFilePath, source] of Object.entries(files)) {
      const absoluteFilePath = join(fixtureDirectoryPath, relativeFilePath)
      mkdirSync(dirname(absoluteFilePath), { recursive: true })
      writeFileSync(absoluteFilePath, source)
    }

    const result = spawnSync(
      OXLINT_BINARY_PATH,
      [
        '--config=oxlint.config.ts',
        '--format=json',
        '--deny-warnings',
        ...Object.keys(files),
      ],
      {
        cwd: fixtureDirectoryPath,
        encoding: 'utf8',
        env: {
          ...process.env,
          PATH: `${join(PACKAGE_DIRECTORY_PATH, 'node_modules/.bin')}${delimiter}${process.env.PATH ?? ''}`,
        },
      },
    )
    let report

    // Surface setup failures verbatim because Oxlint writes non-JSON text before linting starts.
    try {
      report = JSON.parse(result.stdout)
    } catch (error) {
      throw new Error(
        `Oxlint did not return JSON.\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
        { cause: error },
      )
    }

    return {
      diagnosticCodes: report.diagnostics.map(({ code }) => code),
      status: result.status,
      stderr: result.stderr,
      stdout: result.stdout,
    }
  } finally {
    // Remove only the unique temporary project created by this invocation.
    rmSync(fixtureDirectoryPath, { force: true, recursive: true })
  }
}
