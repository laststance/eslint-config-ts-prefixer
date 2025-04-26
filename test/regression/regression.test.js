import { describe, it, expect } from 'vitest'
import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const fixturesDir = join(__dirname, 'fixtures')

describe('ESLint Regression Tests', () => {
  it('should produce consistent linting results for sample with errors', () => {
    let eslintOutput
    try {
      eslintOutput = execSync(
        `npx eslint ${join(fixturesDir, 'sample-with-errors.ts')} --format json`,
        {
          encoding: 'utf-8',
        },
      )
    } catch (error) {
      if (error.status === 1 && error.stdout) {
        eslintOutput = error.stdout
      } else {
        throw error
      }
    }

    const results = JSON.parse(eslintOutput)

    const ruleIds = results[0].messages.map((msg) => msg.ruleId).sort()

    const summary = {
      errorCount: results[0].errorCount,
      warningCount: results[0].warningCount,
      ruleIds: ruleIds,
    }

    expect(summary).toMatchSnapshot()
  })

  it('should detect prettier formatting issues', () => {
    let eslintOutput
    try {
      eslintOutput = execSync(
        `npx eslint ${join(fixturesDir, 'sample-with-errors.ts')} --format json --rule 'prettier/prettier: error'`,
        {
          encoding: 'utf-8',
        },
      )
    } catch (error) {
      if (error.status === 1 && error.stdout) {
        eslintOutput = error.stdout
      } else {
        throw error
      }
    }

    const results = JSON.parse(eslintOutput)

    const prettierIssues = results[0].messages.filter(
      (msg) => msg.ruleId === 'prettier/prettier',
    )

    const summary = {
      prettierIssuesCount: prettierIssues.length,
      prettierIssues: prettierIssues.map((issue) => ({
        line: issue.line,
        column: issue.column,
        message: issue.message,
      })),
    }

    expect(summary).toMatchSnapshot()
  })

  it('should detect import order issues', () => {
    let eslintOutput
    try {
      eslintOutput = execSync(
        `npx eslint ${join(fixturesDir, 'sample-with-errors.ts')} --format json --rule 'import/order: error'`,
        {
          encoding: 'utf-8',
        },
      )
    } catch (error) {
      if (error.status === 1 && error.stdout) {
        eslintOutput = error.stdout
      } else {
        throw error
      }
    }

    const results = JSON.parse(eslintOutput)

    const importOrderIssues = results[0].messages.filter(
      (msg) => msg.ruleId === 'import/order',
    )

    const summary = {
      importOrderIssuesCount: importOrderIssues.length,
      importOrderIssues: importOrderIssues.map((issue) => ({
        line: issue.line,
        column: issue.column,
        message: issue.message,
      })),
    }

    expect(summary).toMatchSnapshot()
  })
})
