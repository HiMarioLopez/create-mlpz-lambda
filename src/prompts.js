const { input, select, confirm } = require("@inquirer/prompts");

async function getAnswers(defaultProjectName) {
    // Project name (input)
    const projectName = await input({
        message: "Project name:",
        default: defaultProjectName || "my-lambda-service",
        validate: (input) => {
            if (/^([a-z\-_\d])+$/.test(input)) return true;
            return "Project name may only include lowercase letters, numbers, underscores and hashes.";
        },
    });

    // Language (select)
    const language = await select({
        message: "Which language would you like to use?",
        choices: [
            { name: "TypeScript", value: "typescript" },
            { name: "JavaScript", value: "javascript" },
        ],
        default: "typescript",
    });

    // Bundler (select)
    const bundler = await select({
        message: "Which bundler would you like to use?",
        choices: [
            { name: "esbuild (recommended, faster)", value: "esbuild" },
            { name: "Webpack", value: "webpack" },
            { name: "None (just use tsc for TypeScript)", value: "none" },
        ],
        default: "esbuild",
    });

    // Testing (select)
    const testing = await select({
        message: "Which testing framework would you like to use?",
        choices: [
            { name: "Jest", value: "jest" },
            { name: "None", value: "none" },
        ],
        default: "jest",
    });

    // PowerTools (confirm)
    const powertools = await confirm({
        message: "Would you like to include AWS Lambda PowerTools?",
        default: true,
    });

    // Deployment framework (select)
    const deploymentFramework = await select({
        message: "Which deployment framework would you like to use?",
        choices: [
            { name: "AWS CDK", value: "cdk" },
            { name: "AWS SAM", value: "sam" },
            { name: "Serverless Framework", value: "serverless" },
            { name: "None", value: "none" },
        ],
        default: "cdk",
    });

    return {
        projectName,
        language,
        bundler,
        testing,
        powertools,
        deploymentFramework
    };
}

module.exports = { getAnswers };
