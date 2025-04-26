#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const fixturesDir = join(__dirname, 'fixtures')
const baselineDir = join(__dirname, 'baseline')

if (!existsSync(baselineDir)) {
  mkdirSync(baselineDir, { recursive: true })
}

function captureEslintOutput(fixturePath, outputPath) {
  try {
    const eslintOutput = execSync(`npx eslint ${fixturePath} --format json`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    writeFileSync(outputPath, eslintOutput)
    console.log(`Captured ESLint output for ${fixturePath} to ${outputPath}`)
  } catch (error) {
    if (error.status === 1 && error.stdout) {
      writeFileSync(outputPath, error.stdout)
      console.log(`Captured ESLint output for ${fixturePath} to ${outputPath}`)
    } else {
      console.error(`Error running ESLint on ${fixturePath}:`, error.message)
    }
  }
}

const sampleWithErrorsPath = join(fixturesDir, 'sample-with-errors.ts')
const sampleWithErrorsOutput = join(baselineDir, 'sample-with-errors.json')
captureEslintOutput(sampleWithErrorsPath, sampleWithErrorsOutput)

console.log('Baseline capture complete.')
