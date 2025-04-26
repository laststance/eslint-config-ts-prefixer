#!/usr/bin/env node

import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { cwd, argv } from 'node:process'
import { fileURLToPath } from 'node:url'

import { input } from '@inquirer/prompts'
import { Command } from 'commander'
import stripJsonComments from 'strip-json-comments'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const program = new Command()
program.name('eslint-config-ts-prefixer')

const packageRootDir = join(__dirname, '..')
const configDir = join(packageRootDir, 'template', 'config')
const userCurrentDir = cwd()

// auto geration files
const file = {
  eslintignore: '.eslintignore',
  eslintrc: '.eslintrc.cjs',
  eslintconfig: 'eslint.config.js',
  prettierignore: '.prettierignore',
  prettierrc: '.prettierrc',
}

// eslint-config-txsprefixer/template/config
const templateConfig = {
  eslintignore: join(configDir, file.eslintignore),
  eslintrc: join(configDir, file.eslintrc),
  eslintconfig: join(configDir, file.eslintconfig),
  prettierignore: join(configDir, file.prettierignore),
  prettierrc: join(configDir, file.prettierrc),
}

// package user's file generation path
const destination = {
  eslintignore: join(userCurrentDir, file.eslintignore),
  eslintrc: join(userCurrentDir, file.eslintrc),
  eslintconfig: join(userCurrentDir, file.eslintconfig),
  prettierignore: join(userCurrentDir, file.prettierignore),
  prettierrc: join(userCurrentDir, file.prettierrc),
}

// npx eslint-config-ts-prefixer setup
program
  .command('setup')
  .description(
    `create ESLint and Prettier configuration files in your current directory (supports both ESLint v8 and v9).`,
  )
  .action(async () => {
    const useESLintV9 = await promptESLintVersion()
    await createESLintConfig(useESLintV9)
    await createPrettierConfig()
    InsertRootdirFilesPath2TSconfig()
    InseartLintFixCommand2PkgJson()
  })

// npx eslint-config-ts-prefixer standalone
program
  .command('standalone')
  .description(
    'standalone install: copies full configuration to your project for customization',
  )
  .action(async () => {
    const useESLintV9 = await promptESLintVersion()
    if (useESLintV9) {
      copyFileSync(
        join(packageRootDir, 'index.mjs'),
        join(userCurrentDir, 'eslint.config.js'),
      )
    } else {
      copyFileSync(
        join(packageRootDir, 'index.cjs'),
        join(userCurrentDir, '.eslintrc.cjs'),
      )
    }
    await copyConfig('eslintignore')
    await createPrettierConfig()
    InsertRootdirFilesPath2TSconfig()
    InseartLintFixCommand2PkgJson()
  })
// npx eslint-config-ts-prefixer full-copy
program
  .command('full-copy')
  .description(
    'full copy install: copies full configuration to your project for customization',
  )
  .action(async () => {
    const useESLintV9 = await promptESLintVersion()
    if (useESLintV9) {
      copyFileSync(
        join(packageRootDir, 'index.mjs'),
        join(userCurrentDir, 'eslint.config.js'),
      )
    } else {
      copyFileSync(
        join(packageRootDir, 'index.cjs'),
        join(userCurrentDir, '.eslintrc.cjs'),
      )
    }
    await copyConfig('eslintignore')
    await createPrettierConfig()
    InsertRootdirFilesPath2TSconfig()
    InseartLintFixCommand2PkgJson()
  })

/**
 * Run
 */
program.parse(argv)

/**
 * Functions
 */
async function promptESLintVersion() {
  const answer = await input({
    name: 'eslintVersion',
    choices: [
      {
        name: 'ESLint v9 (flat config)',
        key: '9',
        value: true,
      },
      {
        name: 'ESLint v8 (legacy config)',
        key: '8',
        value: false,
      },
    ],
    message: 'Which ESLint version do you want to use?',
    type: 'expand',
  })

  return answer.eslintVersion
}

async function createESLintConfig(useESLintV9 = false) {
  if (useESLintV9) {
    await copyConfig('eslintconfig')
  } else {
    await copyConfig('eslintrc')
  }
  await copyConfig('eslintignore')
}

async function createPrettierConfig() {
  await copyConfig('prettierrc')
  await copyConfig('prettierignore')
}

async function copyConfig(filename) {
  if (existsSync(destination[filename])) {
    const answer = await input({
      name: 'overwrite',
      choices: [
        {
          name: 'Overwrite',
          key: 'y',
          value: 'overwrite',
        },
        {
          name: 'Abort',
          key: 'n',
          value: 'abort',
        },
      ],
      message: `Your .${filename} already exists.`,
      type: 'expand',
    })

    if (answer.overwrite === 'overwrite') {
      copyFileSync(templateConfig[filename], destination[filename])
    }
  } else {
    copyFileSync(templateConfig[filename], destination[filename])
  }
}

function InsertRootdirFilesPath2TSconfig() {
  // get rootDir's `tsconfig.json` contents
  const userTsconfigPath = join(userCurrentDir, 'tsconfig.json')
  const tsconfigContents = existsSync(userTsconfigPath)
    ? readFileSync(userTsconfigPath, 'utf8')
    : null
  if (tsconfigContents) {
    const tsconfig = JSON.parse(stripJsonComments(tsconfigContents))
    // add "include" project root's configs avoid '@typescript-eslint/await-thenable's parse error https://elmah.io/tools/stack-trace-formatter/212c0a4849bc4054826e4055f5d167a7/
    tsconfig.include = [
      './**.js',
      './**.ts',
      './**.cjs',
      './**.mjs',
      ...tsconfig.include,
    ]
    writeFileSync(userTsconfigPath, JSON.stringify(tsconfig, null, 2))
  } else {
    // Create tsconfig.json if not exists
    const packageTsconfig = JSON.parse(
      stripJsonComments(
        readFileSync(join(packageRootDir, 'tsconfig.json'), 'utf8'),
      ),
    )
    packageTsconfig.include = ['./**.js', './**.ts', './**.cjs', './**.mjs']
    writeFileSync(userTsconfigPath, JSON.stringify(packageTsconfig, null, 2))
  }
}

function InseartLintFixCommand2PkgJson() {
  const pkgJsonPath = join(userCurrentDir, 'package.json')
  const pkgJsonFile = readFileSync(pkgJsonPath, 'utf-8')
  const pkgJson = JSON.parse(pkgJsonFile)

  // Ensure scripts object exists
  if (!pkgJson.scripts) {
    pkgJson.scripts = {}
  }

  pkgJson.scripts.lint = 'eslint . --ext .ts,.tsx,.js,jsx,cjs,mjs'
  pkgJson.scripts['lint:fix'] = 'eslint . --ext .ts,.tsx,.js,jsx,cjs,mjs --fix'
  writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2))
}
