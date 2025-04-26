import { describe, it, expect } from 'vitest'
import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join as pathJoin } from 'node:path'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const fixturesDir = join(__dirname, '../fixtures')

const tempEslintConfigPath = pathJoin(tmpdir(), '.eslintrc-temp.json')
writeFileSync(
  tempEslintConfigPath,
  JSON.stringify({
    env: {
      es2020: true,
      node: true,
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  }),
)

describe('Core ESLint Rules', () => {
  describe('eqeqeq', () => {
    it('should enforce strict equality', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/eqeqeq.js')} --format json --rule 'eqeqeq: ["error", "always"]' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const eqeqeqIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'eqeqeq',
      )

      expect(eqeqeqIssues.length).toBeGreaterThan(0)
      expect(eqeqeqIssues[0].severity).toBe(2) // error
    })
  })

  describe('no-unneeded-ternary', () => {
    it('should detect unneeded ternary expressions', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/no-unneeded-ternary.js')} --format json --rule 'no-unneeded-ternary: warn' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const ternaryIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'no-unneeded-ternary',
      )

      expect(ternaryIssues.length).toBeGreaterThan(0)
      expect(ternaryIssues[0].severity).toBe(1) // warning
    })
  })

  describe('no-constant-binary-expression', () => {
    it('should detect constant binary expressions', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/no-constant-binary-expression.js')} --format json --rule 'no-constant-binary-expression: error' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const binaryExpressionIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'no-constant-binary-expression',
      )

      expect(binaryExpressionIssues.length).toBeGreaterThan(0)
      expect(binaryExpressionIssues[0].severity).toBe(2) // error
    })
  })

  describe('no-constant-condition', () => {
    it('should detect constant conditions', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/no-constant-condition.js')} --format json --rule 'no-constant-condition: error' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const constantConditionIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'no-constant-condition',
      )

      expect(constantConditionIssues.length).toBeGreaterThan(0)
      expect(constantConditionIssues[0].severity).toBe(2) // error
    })
  })

  describe('no-dupe-args', () => {
    it('should detect duplicate arguments', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/no-dupe-args.js')} --format json --rule 'no-dupe-args: error' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const parsingErrors = results[0].messages.filter(
        (msg) =>
          msg.fatal === true && msg.message.includes('Argument name clash'),
      )

      expect(parsingErrors.length).toBeGreaterThan(0)
      expect(parsingErrors[0].severity).toBe(2) // error
    })
  })

  describe('no-dupe-keys', () => {
    it('should detect duplicate keys in objects', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/no-dupe-keys.js')} --format json --rule 'no-dupe-keys: error' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const dupeKeysIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'no-dupe-keys',
      )

      expect(dupeKeysIssues.length).toBeGreaterThan(0)
      expect(dupeKeysIssues[0].severity).toBe(2) // error
    })
  })

  describe('no-empty-pattern', () => {
    it('should detect empty destructuring patterns', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/no-empty-pattern.js')} --format json --rule 'no-empty-pattern: error' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const emptyPatternIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'no-empty-pattern',
      )

      expect(emptyPatternIssues.length).toBeGreaterThan(0)
      expect(emptyPatternIssues[0].severity).toBe(2) // error
    })
  })

  describe('no-extra-boolean-cast', () => {
    it('should detect unnecessary boolean casts', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/no-extra-boolean-cast.js')} --format json --rule 'no-extra-boolean-cast: error' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const booleanCastIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'no-extra-boolean-cast',
      )

      expect(booleanCastIssues.length).toBeGreaterThan(0)
      expect(booleanCastIssues[0].severity).toBe(2) // error
    })
  })

  describe('no-return-await', () => {
    it('should detect unnecessary return await', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/no-return-await.js')} --format json --rule 'no-return-await: error' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const returnAwaitIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'no-return-await',
      )

      expect(returnAwaitIssues.length).toBeGreaterThan(0)
      expect(returnAwaitIssues[0].severity).toBe(2) // error
    })
  })

  describe('no-unsafe-negation', () => {
    it('should detect unsafe negations', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/no-unsafe-negation.js')} --format json --rule 'no-unsafe-negation: warn' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const unsafeNegationIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'no-unsafe-negation',
      )

      expect(unsafeNegationIssues.length).toBeGreaterThan(0)
      expect(unsafeNegationIssues[0].severity).toBe(1) // warning
    })
  })

  describe('no-unused-private-class-members', () => {
    it('should detect unused private class members', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/no-unused-private-class-members.js')} --format json --rule 'no-unused-private-class-members: error' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const unusedPrivateIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'no-unused-private-class-members',
      )

      expect(unusedPrivateIssues.length).toBeGreaterThan(0)
      expect(unusedPrivateIssues[0].severity).toBe(2) // error
    })
  })

  describe('prefer-const', () => {
    it('should detect variables that could be const', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/prefer-const.js')} --format json --rule 'prefer-const: warn' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const preferConstIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'prefer-const',
      )

      expect(preferConstIssues.length).toBeGreaterThan(0)
      expect(preferConstIssues[0].severity).toBe(1) // warning
    })
  })

  describe('prefer-promise-reject-errors', () => {
    it('should enforce using Error objects in Promise rejections', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/prefer-promise-reject-errors.js')} --format json --rule 'prefer-promise-reject-errors: ["error", { "allowEmptyReject": true }]' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const promiseRejectIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'prefer-promise-reject-errors',
      )

      expect(promiseRejectIssues.length).toBeGreaterThan(0)
      expect(promiseRejectIssues[0].severity).toBe(2) // error
    })
  })

  describe('radix', () => {
    it('should enforce using radix parameter in parseInt()', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/radix.js')} --format json --rule 'radix: error' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const radixIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'radix',
      )

      expect(radixIssues.length).toBeGreaterThan(0)
      expect(radixIssues[0].severity).toBe(2) // error
    })
  })

  describe('require-atomic-updates', () => {
    it('should detect non-atomic updates', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/require-atomic-updates.js')} --format json --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const atomicUpdateIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'require-atomic-updates',
      )

      expect(atomicUpdateIssues.length).toBeGreaterThan(0)
      expect(atomicUpdateIssues[0].severity).toBe(2) // error
    })
  })

  describe('valid-typeof', () => {
    it('should enforce valid typeof comparisons', () => {
      let eslintOutput
      try {
        eslintOutput = execSync(
          `npx eslint ${join(fixturesDir, 'core/valid-typeof.js')} --format json --rule 'valid-typeof: warn' --config ${join(__dirname, 'eslint-core-test-config.js')}`,
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
      const typeofIssues = results[0].messages.filter(
        (msg) => msg.ruleId === 'valid-typeof',
      )

      expect(typeofIssues.length).toBeGreaterThan(0)
      expect(typeofIssues[0].severity).toBe(1) // warning
    })
  })
})
