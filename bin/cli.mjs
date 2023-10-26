#!/usr/bin/env node

import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { cwd, argv } from 'node:process'
import { fileURLToPath } from 'node:url'

import { input } from '@inquirer/prompts'
import { Command } from 'commander'

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
  prettierignore: '.prettierignore',
  prettierrc: '.prettierrc',
}

// eslint-config-txsprefixer/template/config
const templateConfig = {
  eslintignore: join(configDir, file.eslintignore),
  eslintrc: join(configDir, file.eslintrc),
  prettierignore: join(configDir, file.prettierignore),
  prettierrc: join(configDir, file.prettierrc),
}

// package user's file generation path
const destination = {
  eslintignore: join(userCurrentDir, file.eslintignore),
  eslintrc: join(userCurrentDir, file.eslintrc),
  prettierignore: join(userCurrentDir, file.prettierignore),
  prettierrc: join(userCurrentDir, file.prettierrc),
}

// npx eslint-config-ts-prefixer config
program
  .command('config')
  .description(
    `create ${file.prettierrc}/${file.prettierignore}/${file.eslintrc}/${file.eslintignore} files your current directory.`,
  )
  .action(async () => {
    await createESLintConfig()
    await createPrettierConfig()
    InsertRootdirFilesPath2TSconfig()
    InseartLintFixCommand2PkgJson()
  })
// npx eslint-config-ts-prefixer barebone
program
  .command('barebone')
  .description('barebone install')
  .action(async () => {
    copyFileSync(
      join(packageRootDir, 'index.cjs'),
      join(userCurrentDir, '.eslintrc.cjs'),
    )
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
async function createESLintConfig() {
  await copyConfig('eslintrc')
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
    const tsconfig = JSON.parse(tsconfigContents)
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
      readFileSync(join(packageRootDir, 'tsconfig.json'), 'utf8'),
    )
    packageTsconfig.include = ['./**.js', './**.ts', './**.cjs', './**.mjs']
    writeFileSync(userTsconfigPath, JSON.stringify(packageTsconfig, null, 2))
  }
}

function InseartLintFixCommand2PkgJson() {
  const pkgJsonPath = join(userCurrentDir, 'package.json')
  const pkgJsonFile = readFileSync(pkgJsonPath, 'utf-8')
  const pkgJson = JSON.parse(pkgJsonFile)
  pkgJson.scripts.lint = 'eslint . --ext .ts,.tsx,.js,jsx,cjs,mjs'
  pkgJson.scripts['lint:fix'] = 'eslint . --ext .ts,.tsx,.js,jsx,cjs,mjs --fix'
  writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2))
}
