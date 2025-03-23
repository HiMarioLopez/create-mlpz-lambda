const { runCommand } = require("./commands");

function getDependencies(options) {
    const deps = ["aws-sdk"];

    if (options.powertools) {
        deps.push(
            "@aws-lambda-powertools/logger",
            "@aws-lambda-powertools/tracer",
            "@aws-lambda-powertools/metrics"
        );
    }

    return deps;
}

function getDevDependencies(options) {
    const devDeps = ["eslint", "prettier"];

    if (options.language === "typescript") {
        devDeps.push(
            "typescript",
            "@types/node",
            "@types/aws-lambda",
            "@typescript-eslint/eslint-plugin",
            "@typescript-eslint/parser"
        );
    }

    if (options.bundler === "esbuild") {
        devDeps.push("esbuild", "esbuild-node-externals");
    } else if (options.bundler === "webpack") {
        devDeps.push(
            "webpack",
            "webpack-cli",
            "webpack-node-externals",
            "terser-webpack-plugin"
        );

        if (options.language === "typescript") {
            devDeps.push("ts-loader");
        }
    }

    if (options.testing === "jest") {
        devDeps.push("jest");
        if (options.language === "typescript") {
            devDeps.push("ts-jest", "@types/jest");
        }
    }

    if (options.deploymentFramework === "serverless") {
        devDeps.push("serverless");
        if (options.language === "typescript") {
            devDeps.push("serverless-plugin-typescript");
        }
    } else if (options.deploymentFramework === "cdk") {
        devDeps.push("aws-cdk-lib", "constructs");
        if (options.language === "typescript") {
            devDeps.push("aws-cdk", "ts-node");
        }
    } else if (options.deploymentFramework === "sam") {
        // No special dev dependencies for SAM
    }

    return devDeps;
}

async function installDependencies(projectDir, options) {
    const dependencies = getDependencies(options);
    const devDependencies = getDevDependencies(options);

    if (dependencies.length > 0) {
        await runCommand(
            projectDir,
            `pnpm add ${dependencies.join(" ")}`
        );
    }

    if (devDependencies.length > 0) {
        await runCommand(
            projectDir,
            `pnpm add -D ${devDependencies.join(" ")}`
        );
    }
}

module.exports = {
    getDependencies,
    getDevDependencies,
    installDependencies
};
