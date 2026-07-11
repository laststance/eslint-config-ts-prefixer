# Bootstrap the first oxlint-config-ts-prefixer release

This runbook publishes `0.1.0` locally once, then replaces local npm credentials with GitHub Actions trusted publishing for every later release.

## Before publishing

The npm CLI session on this machine is currently unauthenticated. Confirm that state instead of assuming an existing login is usable:

```sh
npm whoami
```

Trusted-publisher management requires npm `>=11.15.0`. Use the same pinned CLI as the release workflow, authenticate interactively as an npm owner, and confirm the account:

```sh
npm install --global npm@11.18.0
npm --version
npm login --auth-type=web
npm whoami
```

Before continuing, confirm all of the following:

- `main` contains `oxlint-config-ts-prefixer` version `0.1.0` and its matching `CHANGELOG.md` section.
- The working tree is clean and local `main` matches `origin/main`.
- `oxlint-config-ts-prefixer@0.1.0` does not exist on npm.
- `oxlint-config-ts-prefixer@0.1.0` does not exist as a git tag or GitHub Release.
- The npm account can publish the unscoped public package and can provide a current OTP.

Run the release checks from the repository root:

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm --dir packages/oxlint-config-ts-prefixer test
pnpm --dir packages/oxlint-config-ts-prefixer typecheck
pnpm lint
```

## Publish 0.1.0 locally with OTP

This is the only credentialed local publish. It deliberately uses the `beta` dist-tag and disables provenance because the trusted GitHub identity is not configured yet.

```sh
cd packages/oxlint-config-ts-prefixer
read -s NPM_OTP
npm publish --tag beta --access public --provenance=false --otp="$NPM_OTP"
unset NPM_OTP
cd ../..
```

Verify the immutable version and the `beta` mapping directly against the registry before creating git state:

```sh
npm view oxlint-config-ts-prefixer@0.1.0 version --registry=https://registry.npmjs.org
npm view oxlint-config-ts-prefixer dist-tags --json --registry=https://registry.npmjs.org
```

The first command must print `0.1.0`; the second must map `beta` to `0.1.0`.

## Create the package tag and GitHub Release

Extract only the `0.1.0` changelog section, create an annotated package-specific tag, and use the extracted section as the GitHub Release notes:

```sh
VERSION=0.1.0
TAG="oxlint-config-ts-prefixer@$VERSION"
NOTES_FILE="$(mktemp)"

awk -v version="$VERSION" '
  BEGIN { heading = "## [" version "]" }
  !capturing {
    if (index($0, heading) == 1 && (length($0) == length(heading) || substr($0, length(heading) + 1, 1) == " ")) {
      capturing = 1
    }
    next
  }
  /^## \[/ || /^\[[^]]+\]:[[:space:]]/ { exit }
  { print }
  END { if (!capturing) exit 1 }
' packages/oxlint-config-ts-prefixer/CHANGELOG.md > "$NOTES_FILE"

grep -q '[^[:space:]]' "$NOTES_FILE"
git tag --annotate "$TAG" --message "Release $TAG"
git push origin "refs/tags/$TAG:refs/tags/$TAG"
gh release create "$TAG" --verify-tag --title "$TAG" --notes-file "$NOTES_FILE"
rm "$NOTES_FILE"
```

If npm publication succeeds but tag or release creation fails, do not republish `0.1.0`. Complete only the missing git tag or GitHub Release step.

## Protect the npm-release environment

In GitHub, open **Settings → Environments**, create `npm-release`, and configure:

- Required reviewer: `ryota-murakami`.
- Deployment branches and tags: selected branch `main` only.
- Leave prevent self-review disabled while `ryota-murakami` is the only reviewer; enable it only after adding a second eligible reviewer.

The workflow pauses at this environment between validation and publication. Do not add npm credentials as environment secrets.

## Enable npm trusted publishing

While the npm CLI is still authenticated, bind the published package to this repository, workflow filename, and GitHub environment:

```sh
npm trust github oxlint-config-ts-prefixer \
  --repo laststance/eslint-config-ts-prefixer \
  --file release-oxlint-config.yml \
  --env npm-release \
  --allow-publish \
  --yes

npm trust list oxlint-config-ts-prefixer
```

Confirm the trusted publisher on the package's npm settings page. The allowed action must be `npm publish`, and the repository, workflow, and environment must exactly match the command above.

On the same package settings page, set **Publishing access** to **Require two-factor authentication and disallow tokens**. Review `npm token list`, revoke any obsolete automation token, then remove the temporary local login:

```sh
npm token list
npm logout
```

## Future token-free releases

For each later version:

1. Update `packages/oxlint-config-ts-prefixer/package.json` and add the matching version section to its `CHANGELOG.md` on `main`.
2. Run **Release oxlint-config-ts-prefixer** from GitHub Actions against `main`.
3. Enter the exact package version and choose `beta` or `latest`.
4. Have the configured reviewer approve the `npm-release` environment.

The workflow validates that the npm version and package-specific git tag are both absent, runs package tests, typechecking, and root lint, publishes with OIDC provenance, then creates the annotated tag and GitHub Release. Keep this path token-free: do not add `NPM_TOKEN`, `NODE_AUTH_TOKEN`, automation tokens, or npm passwords to the repository or environment.

## Recover a partially finalized future release

If npm publication succeeds but the workflow fails while creating the tag or GitHub Release, do not rerun the publish workflow and do not republish the immutable version. From a clean `main` that exactly matches `origin/main`, verify the published version first:

```sh
VERSION=0.2.0 # Replace with the version that the workflow published.
TAG="oxlint-config-ts-prefixer@$VERSION"

git fetch origin main --tags
test "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)"
test "$(node -p "require('./packages/oxlint-config-ts-prefixer/package.json').version")" = "$VERSION"
test "$(npm view "oxlint-config-ts-prefixer@$VERSION" version)" = "$VERSION"
```

Extract the matching changelog section, then complete only the missing state:

```sh
NOTES_FILE="$(mktemp)"

awk -v version="$VERSION" '
  BEGIN { heading = "## [" version "]" }
  !capturing {
    if (index($0, heading) == 1 && (length($0) == length(heading) || substr($0, length(heading) + 1, 1) == " ")) {
      capturing = 1
    }
    next
  }
  /^## \[/ || /^\[[^]]+\]:[[:space:]]/ { exit }
  { print }
  END { if (!capturing) exit 1 }
' packages/oxlint-config-ts-prefixer/CHANGELOG.md > "$NOTES_FILE"

grep -q '[^[:space:]]' "$NOTES_FILE"

# Existing tags must already point at the verified release commit.
if git show-ref --verify --quiet "refs/tags/$TAG"; then
  test "$(git rev-list -n 1 "$TAG")" = "$(git rev-parse HEAD)"
else
  git tag --annotate "$TAG" --message "Release $TAG"
  git push origin "refs/tags/$TAG:refs/tags/$TAG"
fi

# Existing releases are left intact; only an absent release is created.
if ! gh release view "$TAG" >/dev/null 2>&1; then
  gh release create "$TAG" --verify-tag --title "$TAG" --notes-file "$NOTES_FILE"
fi

rm "$NOTES_FILE"
```
