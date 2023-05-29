#!/usr/bin/env node
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const { Command } = require('commander')
const inquirer = require('inquirer')
const program = new Command()
program.name('eslint-config-ts-prefixer')

const rootDir = path.join(__dirname, '..')
const configDir = path.join(rootDir, 'template', 'config')
const currentDir = process.cwd()

const file = {
  eslintignore: '.eslintignore',
  eslintrc: '.eslintrc.js',
  prettierrc: '.prettierrc',
}

const templateConfig = {
  eslintignore: path.join(configDir, file.eslintignore),
  eslintrc: path.join(configDir, file.eslintrc),
  prettierrc: path.join(configDir, file.prettierrc),
}

const destination = {
  eslintignore: path.join(currentDir, file.eslintignore),
  eslintrc: path.join(currentDir, file.eslintrc),
  prettierrc: path.join(currentDir, file.prettierrc),
}

// npx eslint-config-ts-prefixer config
program
  .command('config')
  .description(
    `create ${file.prettierrc}/${file.eslintrc}/${file.eslintignore} files your current directory.`
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
    fs.copyFileSync(
      path.join(rootDir, 'index.js'),
      path.join(currentDir, '.eslintrc.js')
    )
    await copyConfig('eslintignore')
    await createPrettierConfig()
  })

// run
program.parse(process.argv)

// functions
async function createESLintConfig() {
  await copyConfig('eslintrc')
  await copyConfig('eslintignore')
}

async function createPrettierConfig() {
  await copyConfig('prettierrc')
}

async function copyConfig(filename) {
  if (fs.existsSync(destination[filename])) {
    const answer = await inquirer.prompt({
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
      message: `Your ${filename} already exists.`,
      name: 'overwrite',
      type: 'expand',
    })

    if (answer.overwrite === 'overwrite') {
      fs.copyFileSync(templateConfig[filename], destination[filename])
    }
  } else {
    fs.copyFileSync(templateConfig[filename], destination[filename])
  }
}
