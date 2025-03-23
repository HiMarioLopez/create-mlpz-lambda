function generatePackageJson(options) {
    const { projectName, language, bundler, testing, powertools, deploymentFramework } = options;

    const scripts = {
        "lint": "eslint .",
        "format": "prettier --write .",
    };

    // Add build commands based on bundler
    if (bundler === "esbuild") {
        scripts.build = "node esbuild.js";
        scripts.dev = "node esbuild.js --watch";
    } else if (bundler === "webpack") {
        scripts.build = "webpack --mode production";
        scripts.dev = "webpack --mode development --watch";
    } else if (language === "typescript") {
        scripts.build = "tsc";
        scripts.dev = "tsc --watch";
    }

    // Add test commands
    if (testing === "jest") {
        scripts.test = "jest";
        scripts["test:watch"] = "jest --watch";
    }

    // Add deployment commands
    if (deploymentFramework === "serverless") {
        scripts.deploy = "serverless deploy";
        scripts["deploy:prod"] = "serverless deploy --stage production";
    } else if (deploymentFramework === "cdk") {
        scripts["cdk:deploy"] = "cdk deploy";
        scripts["cdk:synth"] = "cdk synth";
    } else if (deploymentFramework === "sam") {
        scripts.deploy = "sam deploy --guided";
        scripts.package = "sam package";
    }

    return {
        name: projectName,
        version: "0.1.0",
        description: "AWS Lambda function",
        main: language === "typescript" ? "dist/index.js" : "src/index.js",
        type: "commonjs", // Explicitly set the project to use CommonJS
        scripts,
        keywords: ["aws", "lambda", "serverless"],
        author: "",
        license: "MIT",
        engines: {
            node: ">=22.x"
        },
        packageManager: "pnpm@10.6.5"
    };
}

module.exports = { generatePackageJson };
