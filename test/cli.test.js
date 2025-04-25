#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const testDir = join(__dirname, 'temp-test-project')

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

execSync(
  `cd ${testDir} && echo '${JSON.stringify(packageJson, null, 2)}' > package.json`,
)
execSync(
  `cd ${testDir} && echo '${JSON.stringify(tsconfig, null, 2)}' > tsconfig.json`,
)

console.log('Test environment set up successfully.')

try {
  console.log('Testing npx eslint-config-ts-prefixer full-copy command...')
  execSync(
    `cd ${testDir} && node ${join(__dirname, '../bin/cli.mjs')} full-copy`,
    { stdio: 'inherit' },
  )

  const eslintrcExists = existsSync(join(testDir, '.eslintrc.cjs'))
  const eslintignoreExists = existsSync(join(testDir, '.eslintignore'))
  const prettierrcExists = existsSync(join(testDir, '.prettierrc'))
  const prettierignoreExists = existsSync(join(testDir, '.prettierignore'))

  const updatedPackageJson = JSON.parse(
    execSync(`cat ${join(testDir, 'package.json')}`).toString(),
  )
  const hasLintScript =
    updatedPackageJson.scripts.lint ===
    'eslint . --ext .ts,.tsx,.js,jsx,cjs,mjs'
  const hasLintFixScript =
    updatedPackageJson.scripts['lint:fix'] ===
    'eslint . --ext .ts,.tsx,.js,jsx,cjs,mjs --fix'

  const updatedTsconfig = JSON.parse(
    execSync(`cat ${join(testDir, 'tsconfig.json')}`).toString(),
  )
  const hasIncludePaths =
    updatedTsconfig.include.includes('./**.js') &&
    updatedTsconfig.include.includes('./**.ts') &&
    updatedTsconfig.include.includes('./**.cjs') &&
    updatedTsconfig.include.includes('./**.mjs')

  console.log('\nTest Results:')
  console.log(`- .eslintrc.cjs created: ${eslintrcExists ? '✅' : '❌'}`)
  console.log(`- .eslintignore created: ${eslintignoreExists ? '✅' : '❌'}`)
  console.log(`- .prettierrc created: ${prettierrcExists ? '✅' : '❌'}`)
  console.log(
    `- .prettierignore created: ${prettierignoreExists ? '✅' : '❌'}`,
  )
  console.log(`- lint script added: ${hasLintScript ? '✅' : '❌'}`)
  console.log(`- lint:fix script added: ${hasLintFixScript ? '✅' : '❌'}`)
  console.log(
    `- tsconfig.json updated with include paths: ${hasIncludePaths ? '✅' : '❌'}`,
  )

  const allTestsPassed =
    eslintrcExists &&
    eslintignoreExists &&
    prettierrcExists &&
    prettierignoreExists &&
    hasLintScript &&
    hasLintFixScript &&
    hasIncludePaths

  if (allTestsPassed) {
    console.log(
      '\n✅ All tests passed! The full-copy command is working correctly.',
    )
    process.exit(0)
  } else {
    console.log(
      '\n❌ Some tests failed. The full-copy command is not working correctly.',
    )
    process.exit(1)
  }
} catch (error) {
  console.error('Error during test execution:', error)
  process.exit(1)
} finally {
  if (existsSync(testDir)) {
    rmSync(testDir, { recursive: true, force: true })
  }
}
