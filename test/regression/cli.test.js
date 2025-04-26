import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { execSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  rmSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const testDir = join(__dirname, 'temp-test-project')
const cliPath = join(__dirname, '../../bin/cli.mjs')
const baselineDir = join(__dirname, 'baseline')

describe('CLI Regression Tests', () => {
  beforeEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true })
    }

    mkdirSync(testDir, { recursive: true })

    const packageJson = {
      name: 'test-project',
      version: '1.0.0',
      scripts: {},
    }

    const tsconfig = {
      compilerOptions: {
        target: 'es2020',
        module: 'esnext',
        strict: true,
      },
      include: [],
    }

    writeFileSync(
      join(testDir, 'package.json'),
      JSON.stringify(packageJson, null, 2),
    )
    writeFileSync(
      join(testDir, 'tsconfig.json'),
      JSON.stringify(tsconfig, null, 2),
    )
  })

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true })
    }
  })

  describe('install command with ESLint v8', () => {
    it('should create all necessary configuration files', () => {
      execSync(`cd ${testDir} && echo "8" | node ${cliPath} install`, {
        stdio: 'pipe',
      })

      expect(existsSync(join(testDir, '.eslintrc.cjs'))).toBe(true)
      expect(existsSync(join(testDir, '.eslintignore'))).toBe(true)
      expect(existsSync(join(testDir, '.prettierrc'))).toBe(true)
      expect(existsSync(join(testDir, '.prettierignore'))).toBe(true)
    })

    it('should update package.json with lint scripts', () => {
      execSync(`cd ${testDir} && echo "8" | node ${cliPath} install`, {
        stdio: 'pipe',
      })

      const updatedPackageJson = JSON.parse(
        readFileSync(join(testDir, 'package.json'), 'utf-8'),
      )
      expect(updatedPackageJson.scripts.lint).toBe(
        'eslint . --ext .ts,.tsx,.js,jsx,cjs,mjs',
      )
      expect(updatedPackageJson.scripts['lint:fix']).toBe(
        'eslint . --ext .ts,.tsx,.js,jsx,cjs,mjs --fix',
      )
    })

    it('should update tsconfig.json with include paths', () => {
      execSync(`cd ${testDir} && echo "8" | node ${cliPath} install`, {
        stdio: 'pipe',
      })

      const updatedTsconfig = JSON.parse(
        readFileSync(join(testDir, 'tsconfig.json'), 'utf-8'),
      )
      expect(updatedTsconfig.include).toContain('./**.js')
      expect(updatedTsconfig.include).toContain('./**.ts')
      expect(updatedTsconfig.include).toContain('./**.cjs')
      expect(updatedTsconfig.include).toContain('./**.mjs')
    })
  })

  describe('install command with ESLint v9', () => {
    it('should create all necessary configuration files', () => {
      execSync(`cd ${testDir} && echo "9" | node ${cliPath} install`, {
        stdio: 'pipe',
      })

      expect(existsSync(join(testDir, 'eslint.config.mjs'))).toBe(true)
      expect(existsSync(join(testDir, '.eslintignore'))).toBe(false)
      expect(existsSync(join(testDir, '.prettierrc'))).toBe(true)
      expect(existsSync(join(testDir, '.prettierignore'))).toBe(true)
    })

    it('should update package.json with lint scripts', () => {
      execSync(`cd ${testDir} && echo "9" | node ${cliPath} install`, {
        stdio: 'pipe',
      })

      const updatedPackageJson = JSON.parse(
        readFileSync(join(testDir, 'package.json'), 'utf-8'),
      )
      expect(updatedPackageJson.scripts.lint).toBe(
        'eslint . -c eslint.config.mjs',
      )
      expect(updatedPackageJson.scripts['lint:fix']).toBe(
        'eslint . -c eslint.config.mjs --fix',
      )
    })

    it('should update tsconfig.json with include paths', () => {
      execSync(`cd ${testDir} && echo "9" | node ${cliPath} install`, {
        stdio: 'pipe',
      })

      const updatedTsconfig = JSON.parse(
        readFileSync(join(testDir, 'tsconfig.json'), 'utf-8'),
      )
      expect(updatedTsconfig.include).toContain('./**.js')
      expect(updatedTsconfig.include).toContain('./**.ts')
      expect(updatedTsconfig.include).toContain('./**.cjs')
      expect(updatedTsconfig.include).toContain('./**.mjs')
    })
  })

  describe('gen command with ESLint v8', () => {
    it('should create all necessary configuration files', () => {
      execSync(`cd ${testDir} && echo "8" | node ${cliPath} gen`, {
        stdio: 'pipe',
      })

      expect(existsSync(join(testDir, '.eslintrc.cjs'))).toBe(true)
      expect(existsSync(join(testDir, '.eslintignore'))).toBe(true)
      expect(existsSync(join(testDir, '.prettierrc'))).toBe(true)
      expect(existsSync(join(testDir, '.prettierignore'))).toBe(true)
    })

    it('should update package.json with lint scripts', () => {
      execSync(`cd ${testDir} && echo "8" | node ${cliPath} gen`, {
        stdio: 'pipe',
      })

      const updatedPackageJson = JSON.parse(
        readFileSync(join(testDir, 'package.json'), 'utf-8'),
      )
      expect(updatedPackageJson.scripts.lint).toBe(
        'eslint . --ext .ts,.tsx,.js,jsx,cjs,mjs',
      )
      expect(updatedPackageJson.scripts['lint:fix']).toBe(
        'eslint . --ext .ts,.tsx,.js,jsx,cjs,mjs --fix',
      )
    })

    it('should update tsconfig.json with include paths', () => {
      execSync(`cd ${testDir} && echo "8" | node ${cliPath} gen`, {
        stdio: 'pipe',
      })

      const updatedTsconfig = JSON.parse(
        readFileSync(join(testDir, 'tsconfig.json'), 'utf-8'),
      )
      expect(updatedTsconfig.include).toContain('./**.js')
      expect(updatedTsconfig.include).toContain('./**.ts')
      expect(updatedTsconfig.include).toContain('./**.cjs')
      expect(updatedTsconfig.include).toContain('./**.mjs')
    })
  })

  describe('gen command with ESLint v9', () => {
    it('should create all necessary configuration files', () => {
      execSync(`cd ${testDir} && echo "9" | node ${cliPath} gen`, {
        stdio: 'pipe',
      })

      expect(existsSync(join(testDir, 'eslint.config.mjs'))).toBe(true)
      expect(existsSync(join(testDir, '.eslintignore'))).toBe(false)
      expect(existsSync(join(testDir, '.prettierrc'))).toBe(true)
      expect(existsSync(join(testDir, '.prettierignore'))).toBe(true)
    })

    it('should update package.json with lint scripts', () => {
      execSync(`cd ${testDir} && echo "9" | node ${cliPath} gen`, {
        stdio: 'pipe',
      })

      const updatedPackageJson = JSON.parse(
        readFileSync(join(testDir, 'package.json'), 'utf-8'),
      )
      expect(updatedPackageJson.scripts.lint).toBe(
        'eslint . -c eslint.config.mjs',
      )
      expect(updatedPackageJson.scripts['lint:fix']).toBe(
        'eslint . -c eslint.config.mjs --fix',
      )
    })

    it('should update tsconfig.json with include paths', () => {
      execSync(`cd ${testDir} && echo "9" | node ${cliPath} gen`, {
        stdio: 'pipe',
      })

      const updatedTsconfig = JSON.parse(
        readFileSync(join(testDir, 'tsconfig.json'), 'utf-8'),
      )
      expect(updatedTsconfig.include).toContain('./**.js')
      expect(updatedTsconfig.include).toContain('./**.ts')
      expect(updatedTsconfig.include).toContain('./**.cjs')
      expect(updatedTsconfig.include).toContain('./**.mjs')
    })
  })
})
