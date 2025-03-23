# create-mlpz-lambda

My opinionated CLI tool for generating AWS Lambda projects with Node.js, providing a modern development experience with TypeScript, testing frameworks, and best practices I've refined over years of serverless development.

[![npm version](https://img.shields.io/npm/v/create-mlpz-lambda.svg)](https://www.npmjs.com/package/create-mlpz-lambda)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why Use This Template?

You are me. Or, you like the way I structure my Lambda projects and want to save time by using my template. Either way, thanks for checking this out.

## Features

- 🚀 Quick scaffold for AWS Lambda projects with battle-tested configurations
- 🔄 First-class TypeScript support (or JavaScript if you prefer)
- 📦 Optimized bundling with esbuild or webpack for minimal cold starts
- 🧪 Testing setup that actually encourages good test coverage
- 🛠️ AWS Lambda PowerTools integration for observability best practices
- 🚢 Deployment configurations that won't make you pull your hair out
- 📝 Linting and formatting conventions I've found to be most maintainable
- 🏗️ Carefully structured project organization based on domain-driven principles

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

```
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

## License

MIT © Mario Lopez