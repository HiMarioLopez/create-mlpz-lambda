function getGitignoreContent() {
    return `# Dependencies
node_modules/

# pnpm specific
.pnpm-store/
pnpm-lock.yaml

# Build
dist/
coverage/
.serverless/
.webpack/
cdk.out/
.esbuild/

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# OS
.DS_Store

# Tests
/coverage
/.nyc_output

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace
.vscode/*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Misc
.npm
.eslintcache
.yarn-integrity
`;
}

function getReadmeContent(options) {
    return `# ${options.projectName}

AWS Lambda project built with ${options.language === "typescript" ? "TypeScript" : "JavaScript"}.

## Setup

\`\`\`bash
pnpm install
\`\`\`

## Development

\`\`\`bash
pnpm dev
\`\`\`

## Testing

\`\`\`bash
pnpm test
\`\`\`

## Building

\`\`\`bash
pnpm build
\`\`\`

## Deployment

${options.deploymentFramework === "serverless"
            ? "```bash\npnpm deploy\n```"
            : options.deploymentFramework === "cdk"
                ? "```bash\npnpm cdk:deploy\n```"
                : options.deploymentFramework === "sam"
                    ? "```bash\npnpm deploy\n```"
                    : "Build the project and upload the dist folder to AWS Lambda."
        }

## Project Structure

- \`src/handlers/\`: Lambda function handlers
- \`src/services/\`: Business logic
- \`src/utils/\`: Utility functions
- \`src/models/\`: Data models
- \`tests/\`: Test files
`;
}

module.exports = {
    getGitignoreContent,
    getReadmeContent
};
