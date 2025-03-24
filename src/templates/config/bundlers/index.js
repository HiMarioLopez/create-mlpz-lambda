function getEsbuildConfigContent(options) {
  const isTypeScript = options.language === "typescript";

  return `const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Get all handler files from the src/handlers directory
const handlersDir = path.join(__dirname, 'src/handlers');
const entryPoints = fs
  .readdirSync(handlersDir)
  .filter(file => file.endsWith('${isTypeScript ? ".ts" : ".js"}'))
  .map(file => path.join(handlersDir, file));

const isWatch = process.argv.includes('--watch');

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints,
  bundle: true,
  platform: 'node',
  target: 'node22',
  outdir: 'dist/handlers',
  sourcemap: true,
  external: ['aws-sdk'],
  ${isTypeScript ? "tsconfig: './tsconfig.json'," : ""}
  minify: process.env.NODE_ENV === 'production',
};

// Wrap in an async function to allow await
async function build() {
  try {
    if (isWatch) {
      // Watch mode
      const context = await esbuild.context(options);
      await context.watch();
      console.log('Watching for changes...');
    } else {
      // Build once
      await esbuild.build(options);
      console.log('Build complete');
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Execute the build function
build();`;
}

function getWebpackConfigContent(options) {
  const isTypeScript = options.language === "typescript";

  return `const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');

// Find all handler files dynamically
const entries = {};
const handlerFiles = glob.sync('./src/handlers/*${isTypeScript ? ".ts" : ".js"}');
handlerFiles.forEach(file => {
  const name = path.basename(file, path.extname(file));
  entries[name] = file;
});

module.exports = {
  entry: entries,
  target: 'node',
  mode: process.env.NODE_ENV || 'development',
  externals: [nodeExternals()],
  module: {
    rules: [
      ${isTypeScript ? `{
        test: /\\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }` : ""}
    ]
  },
  ${isTypeScript ? `resolve: {
    extensions: ['.ts', '.js']
  },` : ""}
  output: {
    path: path.resolve(__dirname, 'dist/handlers'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [new TerserPlugin()]
  }
};`;
}

module.exports = {
  getEsbuildConfigContent,
  getWebpackConfigContent
};
