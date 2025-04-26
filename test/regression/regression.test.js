import { describe, it, expect, beforeAll } from 'vitest'
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const fixturesDir = join(__dirname, 'fixtures')
const baselineDir = join(__dirname, 'baseline')

describe('ESLint Regression Tests', () => {
  beforeAll(() => {
    const baselineFile = join(baselineDir, 'sample-with-errors.json')
    if (!existsSync(baselineFile)) {
      console.log('Generating baseline data...')
      execSync(`node ${join(__dirname, 'baseline-capture.js')}`, {
        stdio: 'inherit',
      })
    }
  })

  it('should produce consistent linting results for sample with errors', () => {
    let currentResults
    try {
      currentResults = JSON.parse(
        execSync(
          `npx eslint ${join(fixturesDir, 'sample-with-errors.ts')} --format json`,
          {
            encoding: 'utf-8',
          },
        ),
      )
    } catch (error) {
      if (error.status === 1 && error.stdout) {
        currentResults = JSON.parse(error.stdout)
      } else {
        throw error
      }
    }

    const baselineResults = JSON.parse(
      readFileSync(join(baselineDir, 'sample-with-errors.json'), 'utf-8'),
    )

    expect(currentResults[0].errorCount).toBe(baselineResults[0].errorCount)
    expect(currentResults[0].warningCount).toBe(baselineResults[0].warningCount)

    const currentRules = currentResults[0].messages
      .map((msg) => msg.ruleId)
      .sort()
    const baselineRules = baselineResults[0].messages
      .map((msg) => msg.ruleId)
      .sort()
    expect(currentRules).toEqual(baselineRules)
  })
})
