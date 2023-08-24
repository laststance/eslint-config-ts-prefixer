#!/usr/bin/env node
import { copyFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { cwd, argv } from 'node:process'
import { fileURLToPath } from 'node:url'

import { input } from '@inquirer/prompts'
import { Command } from 'commander'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const program = new Command()
program.name('eslint-config-ts-prefixer')

const rootDir = join(__dirname, '..')
const configDir = join(rootDir, 'template', 'config')
const currentDir = cwd()

const file = {
  eslintignore: '.eslintignore',
  eslintrc: '.eslintrc.cjs',
  prettierignore: '.prettierignore',
  prettierrc: '.prettierrc',
}

const templateConfig = {
  eslintignore: join(configDir, file.eslintignore),
  eslintrc: join(configDir, file.eslintrc),
  prettierignore: join(configDir, file.prettierignore),
  prettierrc: join(configDir, file.prettierrc),
}

const destination = {
  eslintignore: join(currentDir, file.eslintignore),
  eslintrc: join(currentDir, file.eslintrc),
  prettierignore: join(currentDir, file.prettierignore),
  prettierrc: join(currentDir, file.prettierrc),
}

// npx eslint-config-ts-prefixer config
program
  .command('config')
  .description(
    `create ${file.prettierrc}/${file.eslintrc}/${file.eslintignore} files your current directory.`,
  )
  .option('--prettier', `create ${file.prettierrc} only`)
  .option('--eslint', `create ${file.eslintrc}/${file.eslintignore} only`)
  .action(async (options) => {
    if (Object.keys(options).length === 0) {
      await createESLintConfig()
      await createPrettierConfig()
      return
    }
    if (options.eslint === true) await createESLintConfig()
    if (options.prettier === true) await createPrettierConfig()
  })

// npx eslint-config-ts-prefixer barebone
program
  .command('barebone')
  .description('barebone install')
  .action(async () => {
    copyFileSync(join(rootDir, 'index.cjs'), join(currentDir, '.eslintrc.cjs'))
    await copyConfig('eslintignore')
    await createPrettierConfig()
  })

// run
program.parse(argv)

// functions
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
      choices: [
        {
          key: 'y',
          name: 'Overwrite',
          value: 'overwrite',
        },
        {
          key: 'n',
          name: 'Abort',
          value: 'abort',
        },
      ],
      message: `Your .${filename} already exists.`,
      name: 'overwrite',
      type: 'expand',
    })

    if (answer.overwrite === 'overwrite') {
      copyFileSync(templateConfig[filename], destination[filename])
    }
  } else {
    copyFileSync(templateConfig[filename], destination[filename])
  }
}
