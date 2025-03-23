const fs = require("fs-extra");
const path = require("path");
const yoctoSpinner = require("yocto-spinner").default;
const { cyan, yellow } = require("yoctocolors");

const { templates, utils } = require('./index');
const { runCommand } = require('./utils/commands');

async function generateProject(options) {
    const spinner = yoctoSpinner({ text: "Creating project directory" }).start();
    const projectDir = path.resolve(process.cwd(), options.projectName);

    try {
        // Create project directory
        await fs.ensureDir(projectDir);
        spinner.success();

        // Generate file structure
        spinner.text = "Generating project structure";// In generateProject function, before fs.ensureDir
        if (await fs.pathExists(projectDir)) {
            const dirContents = await fs.readdir(projectDir);
            if (dirContents.length > 0) {
                throw new Error(`Directory ${options.projectName} already exists and is not empty.`);
            }
        }
        spinner.start();
        await generateFileStructure(projectDir, options);
        spinner.success();

        // Generate configuration files
        spinner.text = "Creating configuration files";
        spinner.start();
        await generateConfigFiles(projectDir, options);
        spinner.success();

        // Initialize git repository
        spinner.text = "Initializing git repository";
        spinner.start();
        await runCommand(projectDir, "git init");
        await fs.writeFile(
            path.join(projectDir, ".gitignore"),
            templates.misc.getGitignoreContent()
        );
        spinner.success();

        // Install dependencies
        spinner.text = "Installing dependencies with pnpm (this may take a while)";
        spinner.start();
        await utils.dependencies.installDependencies(projectDir, options);
        spinner.success();

        // Display next steps
        displayNextSteps(options);
    } catch (error) {
        spinner.fail();
        throw error;
    }
}

async function generateFileStructure(projectDir, options) {
    // Create standard directories
    const dirs = [
        "src/handlers",
        "src/services",
        "src/utils",
        "src/models",
        "tests/unit",
        "tests/integration",
    ];

    for (const dir of dirs) {
        await fs.ensureDir(path.join(projectDir, dir));
    }

    // Generate example handler file
    const { handlerContent, handlerExt } = utils.files.getLanguageFiles(options.language);
    await fs.writeFile(
        path.join(projectDir, `src/handlers/hello.${handlerExt}`),
        handlerContent
    );

    // Generate test file if testing is enabled
    if (options.testing !== "none") {
        const { testContent, testExt } = utils.files.getLanguageFiles(
            options.language,
            options.testing
        );
        await fs.writeFile(
            path.join(projectDir, `tests/unit/hello.test.${testExt}`),
            testContent
        );
    }

    // Generate README
    await fs.writeFile(
        path.join(projectDir, "README.md"),
        templates.misc.getReadmeContent(options)
    );
}

async function generateConfigFiles(projectDir, options) {
    // Generate package.json
    const packageJson = templates.packageJson.generatePackageJson(options);
    await fs.writeFile(
        path.join(projectDir, "package.json"),
        JSON.stringify(packageJson, null, 2)
    );

    // TypeScript config if needed
    if (options.language === "typescript") {
        await fs.writeFile(
            path.join(projectDir, "tsconfig.json"),
            templates.config.getTsConfigContent()
        );
    }

    // ESLint config
    await fs.writeFile(
        path.join(projectDir, ".eslintrc.js"),
        templates.config.getEslintConfigContent(options)
    );

    // Prettier config
    await fs.writeFile(
        path.join(projectDir, ".prettierrc"),
        templates.config.getPrettierConfigContent()
    );

    // Build config based on bundler choice
    if (options.bundler === "esbuild") {
        await fs.writeFile(
            path.join(projectDir, "esbuild.js"),
            templates.config.bundlers.getEsbuildConfigContent(options)
        );
    } else if (options.bundler === "webpack") {
        await fs.writeFile(
            path.join(projectDir, "webpack.config.js"),
            templates.config.bundlers.getWebpackConfigContent(options)
        );
    }

    // Test config if needed
    if (options.testing === "jest") {
        await fs.writeFile(
            path.join(projectDir, "jest.config.js"),
            templates.config.getJestConfigContent(options)
        );
    }

    // Deployment config based on choice
    if (options.deploymentFramework === "serverless") {
        await fs.writeFile(
            path.join(projectDir, "serverless.yml"),
            templates.config.deployment.getServerlessConfigContent(options)
        );
    } else if (options.deploymentFramework === "cdk") {
        // Would create CDK files here
    } else if (options.deploymentFramework === "sam") {
        await fs.writeFile(
            path.join(projectDir, "template.yaml"),
            templates.config.deployment.getSamTemplateContent(options)
        );
    }
}

function displayNextSteps(options) {
    console.log(cyan("\n🎉 Your AWS Lambda project is ready!"));
    console.log(cyan("\nNext steps:"));
    console.log(`  cd ${options.projectName}`);
    console.log("  pnpm dev");
    console.log("");
    console.log(cyan("To deploy your function:"));

    if (options.deploymentFramework === "serverless") {
        console.log("  pnpm deploy");
    } else if (options.deploymentFramework === "cdk") {
        console.log("  pnpm cdk:deploy");
    } else if (options.deploymentFramework === "sam") {
        console.log("  pnpm deploy");
    } else {
        console.log("  pnpm build");
        console.log("  (Upload the dist folder to AWS Lambda manually or set up CI/CD)");
    }
}

module.exports = {
    generateProject,
    generateFileStructure,
    generateConfigFiles,
    displayNextSteps
};
