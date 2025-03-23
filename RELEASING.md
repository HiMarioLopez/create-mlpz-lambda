# Release Process for create-mlpz-lambda

This project uses [release-please](https://github.com/googleapis/release-please) to automate the release process. Release-please works by parsing your commit messages according to the [Conventional Commits](https://www.conventionalcommits.org/) specification to determine the next version number and generate release notes.

## How to Make a Release

The release process is fully automated. Here's how it works:

1. Make changes to the codebase and commit them using conventional commit messages
2. Push your changes to the `main` branch
3. Release-please will automatically create a "Release PR" when there are releasable changes
4. Once the Release PR is merged, release-please will:
   - Create a GitHub release with release notes
   - Tag the release in Git
   - Publish the package to npm (if you have set up your NPM_TOKEN)

## Conventional Commit Types

When making commits, use these prefixes to indicate the type of change:

- `feat:` - New features (triggers a minor version bump)
- `fix:` - Bug fixes (triggers a patch version bump)
- `docs:` - Documentation only changes (no version bump)
- `style:` - Changes that do not affect code logic (no version bump)
- `refactor:` - Code changes that neither fix bugs nor add features (no version bump)
- `perf:` - Performance improvements (no version bump)
- `test:` - Adding or correcting tests (no version bump)
- `build:` - Changes to build system or dependencies (no version bump)
- `ci:` - Changes to CI configuration (no version bump)
- `chore:` - Other changes that don't modify source or test files (no version bump)

For a breaking change, add `BREAKING CHANGE:` in the commit body or append `!` after the type:

```plaintext
feat!: introduce a breaking API change
```

or

```plaintext
feat: introduce a breaking API change

BREAKING CHANGE: This is a breaking change that will trigger a major version bump
```

## npm Provenance

This package is published with npm Provenance enabled, which provides supply chain security benefits:

- Verifies the package was built from this GitHub repository
- Creates a tamper-proof link between the published package and its source code
- Shows a "Verified Publisher" badge on npmjs.com
- Helps users trust that the package hasn't been compromised

Provenance is automatically handled by our GitHub Actions workflow and requires no additional steps from contributors.

## Required Setup

Before the automated release process can work, you'll need to:

1. Make sure GitHub Actions is enabled for your repository
2. Add an NPM_TOKEN secret to your GitHub repository:
   - Generate an npm token with publish rights
   - Add it to your repository at Settings > Secrets and variables > Actions > New repository secret
   - Name it `NPM_TOKEN`

That's it! With this setup, your release process will be fully automated.
