const fs = require('fs')
const path = require('path')
const { Octokit } = require('@octokit/rest')

// Initialize GitHub client
const octokit = new Octokit()

// Repository mappings - updated to use plugin names from CSV
const REPO_MAP = {
  'Built-in': {
    owner: 'eslint',
    repo: 'eslint',
    path: 'docs/src/rules',
    extension: '.md',
  },
  '@typescript-eslint': {
    owner: 'typescript-eslint',
    repo: 'typescript-eslint',
    path: 'packages/eslint-plugin/docs/rules',
    extension: ['.mdx', '.md'], // Try both extensions
  },
  import: {
    owner: 'import-js',
    repo: 'eslint-plugin-import',
    path: 'docs/rules',
    extension: '.md',
  },
  prettier: {
    owner: 'prettier',
    repo: 'eslint-plugin-prettier',
    path: '',
    extension: '.md',
  },
}

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, 'components', 'rules')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Function to read CSV file
function readCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n').filter((line) => line.trim())
  const headers = lines[0].split(',')

  return lines.slice(1).map((line) => {
    const values = line.split(',')
    return headers.reduce((obj, header, index) => {
      obj[header.trim()] = values[index]?.trim() || ''
      return obj
    }, {})
  })
}

// Function to fetch file from GitHub
async function fetchFileFromGitHub(owner, repo, filePath) {
  try {
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: filePath,
    })

    if (response.data.content) {
      return Buffer.from(response.data.content, 'base64').toString('utf-8')
    }
    return null
  } catch (error) {
    console.error(
      `Error fetching ${filePath} from ${owner}/${repo}:`,
      error.message,
    )
    return null
  }
}

// Function to fetch rule documentation
async function fetchRuleDoc(pluginName, ruleName) {
  const repo = REPO_MAP[pluginName]
  if (!repo) {
    console.warn(`Unknown plugin: ${pluginName}`)
    return null
  }

  console.log(`Fetching documentation for ${ruleName} (${pluginName})...`)

  if (pluginName === 'prettier') {
    // For prettier, just fetch the README.md
    const content = await fetchFileFromGitHub(
      repo.owner,
      repo.repo,
      'README.md',
    )
    return content
  }

  // For other repos, try to find the rule file
  const extensions = Array.isArray(repo.extension)
    ? repo.extension
    : [repo.extension]

  for (const ext of extensions) {
    const filePath = repo.path
      ? `${repo.path}/${ruleName}${ext}`
      : `${ruleName}${ext}`
    const content = await fetchFileFromGitHub(repo.owner, repo.repo, filePath)

    if (content) {
      return content
    }
  }

  console.warn(`Documentation not found for rule: ${ruleName} in ${pluginName}`)
  return null
}

// Function to save rule documentation
function saveRuleDoc(pluginName, ruleName, content) {
  let fileName
  if (pluginName === 'prettier') {
    fileName = 'prettier.md'
  } else {
    fileName = `${pluginName === 'Built-in' ? '' : pluginName + '_'}${ruleName}.md`
  }
  fileName = fileName.replace('/', '_').replace('@', '')

  const filePath = path.join(outputDir, fileName)
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`Saved: ${fileName}`)
}

// Main function
async function main() {
  try {
    console.log('Reading CSV file...')
    const rules = readCSV('ESLint_Rules_Documentation.csv')
    console.log(`Found ${rules.length} rules to process`)

    let successCount = 0
    let failCount = 0

    for (const rule of rules) {
      const pluginName = rule['Plugin Name']
      const ruleName = rule['Rule Name']

      if (!pluginName || !ruleName) {
        console.warn('Skipping rule with missing data:', rule)
        continue
      }

      try {
        const content = await fetchRuleDoc(pluginName, ruleName)

        if (content) {
          saveRuleDoc(pluginName, ruleName, content)
          successCount++
        } else {
          console.error(
            `Failed to fetch documentation for: ${pluginName}/${ruleName}`,
          )
          failCount++
        }

        // Add delay to avoid hitting GitHub API rate limits
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(
          `Error processing ${pluginName}/${ruleName}:`,
          error.message,
        )
        failCount++
      }
    }

    console.log(
      `\nCompleted! Successfully fetched: ${successCount}, Failed: ${failCount}`,
    )
  } catch (error) {
    console.error('Error in main function:', error)
  }
}

// Run the script
if (require.main === module) {
  main()
}

module.exports = { main }
