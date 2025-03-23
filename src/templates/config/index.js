const bundlers = require('./bundlers');
const deployment = require('./deployment');

function getTsConfigContent() {
  return `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "declaration": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": false,
    "inlineSourceMap": true,
    "inlineSources": true,
    "experimentalDecorators": true,
    "strictPropertyInitialization": false,
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}`;
}

function getEslintConfigContent(options) {
  const isTypeScript = options.language === "typescript";

  return `module.exports = {
  env: {
    node: true,
    ${options.testing === "jest" ? "jest: true," : ""}
  },
  ${isTypeScript ? `extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],` : `extends: ['eslint:recommended'],`}
  parserOptions: {
    ecmaVersion: 2020,
    ${isTypeScript ? "project: './tsconfig.json'," : ""}
  },
  rules: {
    // Add custom rules here
  }
};`;
}

function getPrettierConfigContent() {
  return `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}`;
}

function getJestConfigContent(options) {
  const isTypeScript = options.language === "typescript";

  return `module.exports = {
  testEnvironment: 'node',
  ${isTypeScript ? `preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },` : ""}
  testMatch: ['**/*.test.${isTypeScript ? "ts" : "js"}'],
  collectCoverageFrom: [
    'src/**/*.${isTypeScript ? "ts" : "js"}',
    '!src/**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  verbose: true
};`;
}

module.exports = {
  getTsConfigContent,
  getEslintConfigContent,
  getPrettierConfigContent,
  getJestConfigContent,
  bundlers,
  deployment
};
