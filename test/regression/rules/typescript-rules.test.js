import { describe, it, expect } from 'vitest'
import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const fixturesDir = join(__dirname, '../fixtures')

describe('TypeScript ESLint Rules', () => {
  describe('@typescript-eslint/await-thenable', () => {
    it('should detect await on non-thenable values', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'typescript/await-thenable.ts')} --format json --rule '@typescript-eslint/await-thenable: warn'`,
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
      const awaitThenableIssues = results[0].messages.filter(
        (msg) => msg.ruleId === '@typescript-eslint/await-thenable',
      )

      expect(awaitThenableIssues.length).toBeGreaterThan(0)
      expect(awaitThenableIssues[0].severity).toBe(1) // warning
    })
  })

  describe('@typescript-eslint/consistent-type-imports', () => {
    it('should detect inconsistent type imports', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'typescript/consistent-type-imports.ts')} --format json --rule '@typescript-eslint/consistent-type-imports: warn'`,
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
      const typeImportIssues = results[0].messages.filter(
        (msg) => msg.ruleId === '@typescript-eslint/consistent-type-imports',
      )

      expect(typeImportIssues.length).toBeGreaterThan(0)
      expect(typeImportIssues[0].severity).toBe(1) // warning
    })
  })

  describe('@typescript-eslint/no-misused-new', () => {
    it('should detect misused new operator', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'typescript/no-misused-new.ts')} --format json --rule '@typescript-eslint/no-misused-new: error'`,
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
      const misusedNewIssues = results[0].messages.filter(
        (msg) => msg.ruleId === '@typescript-eslint/no-misused-new',
      )

      expect(misusedNewIssues.length).toBeGreaterThan(0)
      expect(misusedNewIssues[0].severity).toBe(2) // error
    })
  })

  describe('@typescript-eslint/no-misused-promises', () => {
    it('should detect misused promises', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'typescript/no-misused-promises.ts')} --format json --rule '@typescript-eslint/no-misused-promises: error'`,
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
      const misusedPromiseIssues = results[0].messages.filter(
        (msg) => msg.ruleId === '@typescript-eslint/no-misused-promises',
      )

      expect(misusedPromiseIssues.length).toBeGreaterThan(0)
      expect(misusedPromiseIssues[0].severity).toBe(2) // error
    })
  })

  describe('@typescript-eslint/no-non-null-asserted-nullish-coalescing', () => {
    it('should detect non-null assertion with nullish coalescing', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'typescript/no-non-null-asserted-nullish-coalescing.ts')} --format json --rule '@typescript-eslint/no-non-null-asserted-nullish-coalescing: error'`,
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
      const nonNullAssertedIssues = results[0].messages.filter(
        (msg) =>
          msg.ruleId ===
          '@typescript-eslint/no-non-null-asserted-nullish-coalescing',
      )

      expect(nonNullAssertedIssues.length).toBeGreaterThan(0)
      expect(nonNullAssertedIssues[0].severity).toBe(2) // error
    })
  })

  describe('@typescript-eslint/no-unused-expressions', () => {
    it('should detect unused expressions', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'typescript/no-unused-expressions.ts')} --format json --rule '@typescript-eslint/no-unused-expressions: error'`,
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
      const unusedExpressionIssues = results[0].messages.filter(
        (msg) => msg.ruleId === '@typescript-eslint/no-unused-expressions',
      )

      expect(unusedExpressionIssues.length).toBeGreaterThan(0)
      expect(unusedExpressionIssues[0].severity).toBe(2) // error
    })
  })

  describe('@typescript-eslint/no-unused-vars', () => {
    it('should detect unused variables with proper configuration', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'typescript/no-unused-vars.ts')} --format json --rule '@typescript-eslint/no-unused-vars: ["error", {"args": "after-used", "argsIgnorePattern": "^_", "ignoreRestSiblings": true}]'`,
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
      const unusedVarIssues = results[0].messages.filter(
        (msg) => msg.ruleId === '@typescript-eslint/no-unused-vars',
      )

      expect(unusedVarIssues.length).toBeGreaterThan(0)
      expect(unusedVarIssues[0].severity).toBe(2) // error
    })
  })

  describe('@typescript-eslint/prefer-as-const', () => {
    it('should detect where as const should be used', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'typescript/prefer-as-const.ts')} --format json --rule '@typescript-eslint/prefer-as-const: warn'`,
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
      const preferAsConstIssues = results[0].messages.filter(
        (msg) => msg.ruleId === '@typescript-eslint/prefer-as-const',
      )

      expect(preferAsConstIssues.length).toBeGreaterThan(0)
      expect(preferAsConstIssues[0].severity).toBe(1) // warning
    })
  })

  describe('@typescript-eslint/promise-function-async', () => {
    it('should detect promise functions that should be async', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'typescript/promise-function-async.ts')} --format json --rule '@typescript-eslint/promise-function-async: warn'`,
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
      const promiseFunctionAsyncIssues = results[0].messages.filter(
        (msg) => msg.ruleId === '@typescript-eslint/promise-function-async',
      )

      expect(promiseFunctionAsyncIssues.length).toBeGreaterThan(0)
      expect(promiseFunctionAsyncIssues[0].severity).toBe(1) // warning
    })
  })
})
