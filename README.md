# create-mlpz-lambda

My opinionated CLI tool for generating AWS Lambda projects with Node.js, providing a modern development experience with TypeScript, testing frameworks, and best practices I've refined over years of serverless development.

[![npm version](https://img.shields.io/npm/v/create-mlpz-lambda.svg)](https://www.npmjs.com/package/create-mlpz-lambda)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Release](https://img.shields.io/github/release/HiMarioLopez/create-mlpz-lambda.svg)](https://github.com/HiMarioLopez/create-mlpz-lambda/releases)

## Why Use This Template?

You are me. Or, you like the way I structure my Lambda projects and want to save time by using my template. Either way, thanks for checking this out.

## Features

- 🚀 Scaffolds Lambda projects
- 🔄 TypeScript or JavaScript
- 📦 Bundle with esbuild or webpack
- 🧪 Testing setup
- 🛠️ AWS Lambda PowerTools included
- 🚢 Deployment configs for various frameworks
- 📝 Linting rules
- 🏗️ A usable project structure

## Installation

```bash
# Using pnpm
pnpm add -g create-mlpz-lambda

# Using npm
npm install -g create-mlpz-lambda

# Using yarn
yarn global add create-mlpz-lambda
```

## Usage

```bash
# Interactive mode
npx create-mlpz-lambda my-lambda-service

# Use my personal defaults (TypeScript, esbuild, Jest, PowerTools, AWS CDK)
npx create-mlpz-lambda my-lambda-service --yes
```

## Project Options

When running in interactive mode, you'll be prompted for:

- **Project name**: Name for your Lambda service (also used as directory name)
- **Language**: TypeScript or JavaScript
- **Bundler**: esbuild, webpack, or none
- **Testing framework**: Jest or none
- **AWS Lambda PowerTools**: Include helpful utilities for Lambda functions
- **Deployment framework**: AWS CDK, AWS SAM, Serverless Framework, or none

## Project Structure

The generated project follows my preferred organization pattern:

```plaintext
my-lambda-service/
├── src/
│   ├── handlers/        # Lambda function handlers
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── models/          # Type definitions and models
├── tests/
│   ├── unit/            # Unit tests
│   └── integration/     # Integration tests
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration (if applicable)
└── [deployment config]  # Based on selected framework
```

## Development Workflow

After generating your project:

```bash
# Change into project directory
cd my-lambda-service

# Install dependencies
pnpm install # or npm install or yarn

# Development with hot reload
pnpm dev # or npm run dev or yarn dev

# Run tests
pnpm test # or npm test or yarn test

# Build for production
pnpm build # or npm run build or yarn build

# Deploy (if using a deployment framework)
pnpm deploy # or npm run deploy or yarn deploy
```

## Why I Made This

I was tired of repeating the same setup steps for every new Lambda project and wanted to codify my preferred patterns into something reusable. This tool embodies what I believe to be the ideal starting point for modern serverless Node.js applications on AWS.

## Contributing

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning and release notes generation. A pre-commit hook is set up to enforce this format.

See [COMMIT_CONVENTION.md](./COMMIT_CONVENTION.md) for a quick reference guide to the commit format.

For more details on the release process, see [RELEASING.md](./RELEASING.md).

## License

```md
MIT License

Copyright (c) 2025 Mario Lopez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
