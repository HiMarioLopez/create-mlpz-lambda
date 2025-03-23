#!/usr/bin/env node

const { program } = require("commander");
const { blue, green, red, yellow } = require("yoctocolors");
const { generateProject } = require("../src/generator");
const { getAnswers } = require("../src/prompts");
const packageJson = require("../package.json");
const { exec } = require('child_process');

// Check for updates
const checkForUpdates = async () => {
    try {
        exec('npm view create-mlpz-lambda version', (error, stdout) => {
            if (!error && stdout.trim() !== packageJson.version) {
                console.log(yellow(`\nA new version (${stdout.trim()}) is available. You're using ${packageJson.version}`));
                console.log(yellow(`Run 'npm i -g create-mlpz-lambda@latest' to update\n`));
            }
        });
    } catch (error) {
        // Silent fail - version check shouldn't interrupt normal flow
    }
};

// Call the update checker (don't await to avoid delaying the CLI)
checkForUpdates();

program
    .name("create-lambda")
    .description("Generate a new Node.js AWS Lambda project with TypeScript, PowerTools, and some other goodies.")
    .version(packageJson.version)
    .argument("[project-directory]", "Project directory name")
    .option("-y, --yes", "Skip all prompts and use defaults")
    .action(async (projectDirectory, options) => {
        console.log(
            blue(`\n🚀 Mario's AWS Lambda Project Generator v${packageJson.version}\n`)
        );

        try {
            // If no project directory provided or using interactive mode
            if (!projectDirectory || !options.yes) {
                const answers = await getAnswers(projectDirectory);
                await generateProject(answers);
            } else {
                // Use defaults with provided project directory
                await generateProject({
                    projectName: projectDirectory,
                    language: "typescript",
                    bundler: "esbuild",
                    testing: "jest",
                    powertools: true,
                    deploymentFramework: "serverless",
                });
            }

            console.log(
                green("\n✅ Project generated successfully!\n")
            );
        } catch (error) {
            // Check if this is an interruption error (CTRL+C)
            if (error.name === 'ExitPromptError' ||
                (error.message && error.message.includes('User force closed the prompt'))) {
                console.log(yellow("\n\n🛑 Process cancelled by user. Goodbye!\n"));
            } else {
                console.error(red("\n❌ Error generating project:"), error);
            }
            process.exit(1);
        }
    });

program.parse();
