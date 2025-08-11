# Essential Commands

## Development Commands

- `pnpm lint` - Run ESLint on all files
- `pnpm lint:fix` - Run ESLint with auto-fix enabled
- `pnpm prettier` - Format all files with Prettier

## Release Process

- `pnpm push-release-commit` - Interactive version bump and release preparation
  - Uses @laststance/npm-publish-tool for interactive CLI
  - Prompts for version type (major/minor/patch)
  - Creates release commit and pushes to trigger CI/CD

## Git Workflow

- `git status` - Check current branch and changes
- `git add .` - Stage all changes
- `git commit -m "message"` - Commit changes
- `git push` - Push to remote repository

## Package Management

- `pnpm install` - Install dependencies
- `pnpm update --latest` - Update dependencies to latest versions

## System Commands (Darwin/macOS)

- `ls -la` - List files with details
- `find . -name "pattern"` - Find files by pattern
- `grep -r "pattern" .` - Search for pattern in files
