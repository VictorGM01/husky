# Husky Configuration Report

This document details the step-by-step process of configuring Husky in the repository to enforce code quality checks through Git hooks.

## Project Setup

The project is a simple Node.js API for temperature conversion (Fahrenheit to Celsius and vice versa) built with TypeScript.

### Initial Project Setup

1. Initialized a new Node.js project:
   ```bash
   npm init -y
   ```

2. Installed necessary dependencies:
   ```bash
   npm install --save express @types/express typescript ts-node jest @types/jest ts-jest eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin supertest @types/supertest
   npm install --save-dev husky
   ```

3. Created TypeScript configuration file (`tsconfig.json`):
   ```json
   {
     "compilerOptions": {
       "target": "es6",
       "module": "commonjs",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "**/*.test.ts"]
   }
   ```

4. Created ESLint configuration file (`.eslintrc.json`):
   ```json
   {
     "parser": "@typescript-eslint/parser",
     "extends": [
       "plugin:@typescript-eslint/recommended"
     ],
     "parserOptions": {
       "ecmaVersion": 2020,
       "sourceType": "module"
     },
     "rules": {
       "no-console": "warn",
       "@typescript-eslint/no-unused-vars": "error"
     }
   }
   ```

5. Created Jest configuration file (`jest.config.js`):
   ```javascript
   module.exports = {
     preset: 'ts-jest',
     testEnvironment: 'node',
     testMatch: ['**/*.test.ts'],
   };
   ```

6. Updated `package.json` with proper scripts:
   ```json
   {
     "scripts": {
       "start": "node dist/index.js",
       "dev": "ts-node src/index.ts",
       "build": "tsc",
       "lint": "eslint . --ext .ts",
       "test": "jest",
       "prepare": "husky"
     }
   }
   ```

## Husky Configuration

### 1. Initializing Husky

Husky was initialized using the following command:

```bash
npx husky init
```

This created the `.husky` directory with hooks setup.

### 2. Creating the Pre-commit Hook

The pre-commit hook was configured to run linting and build processes to ensure code quality before any commit:

1. Created `.husky/pre-commit` file:
   ```bash
   #!/usr/bin/env sh
   . "$(dirname -- "$0")/_/husky.sh"

   echo "🔍 Running ESLint..."
   npm run lint || exit 1

   echo "🔨 Building the project..."
   npm run build || exit 1

   echo "✅ Pre-commit hook completed successfully!"
   ```

2. Made the hook executable:
   ```bash
   chmod +x .husky/pre-commit
   ```

### 3. Creating the Pre-push Hook

The pre-push hook was configured to run tests to ensure all functionality works correctly before code is pushed to the repository:

1. Created `.husky/pre-push` file:
   ```bash
   #!/usr/bin/env sh
   . "$(dirname -- "$0")/_/husky.sh"

   echo "🧪 Running tests..."
   npm test || exit 1

   echo "✅ Pre-push hook completed successfully!"
   ```

2. Made the hook executable:
   ```bash
   chmod +x .husky/pre-push
   ```

## Project Code Overview

The project implements a simple temperature conversion API with the following components:

1. `src/tempConverter.ts` - Contains the temperature conversion functions:
   - `convertFahrenheitToCelsius` - Converts Fahrenheit to Celsius
   - `convertCelsiusToFahrenheit` - Converts Celsius to Fahrenheit

2. `src/index.ts` - Express application with API endpoints:
   - `GET /api/convert/ftoc/:temp` - Converts Fahrenheit to Celsius
   - `GET /api/convert/ctof/:temp` - Converts Celsius to Fahrenheit

3. Test files:
   - `src/tempConverter.test.ts` - Tests for conversion functions
   - `src/index.test.ts` - Tests for API endpoints

## Hooks in Action

### Pre-commit Hook

When a commit is made, the pre-commit hook:
1. Runs ESLint to check for code style issues
2. Compiles the TypeScript code to ensure it builds correctly
3. Only allows the commit if both checks pass

![Pre-commit Hook Screenshot](screenshots/pre-commit.png)

### Pre-push Hook

When code is pushed to the repository, the pre-push hook:
1. Runs all Jest tests to ensure the code functions correctly
2. Only allows the push if all tests pass

![Pre-push Hook Screenshot](screenshots/pre-push.png)

## Conclusion

This Husky setup ensures that:
1. Code is properly linted and follows the style guide (pre-commit)
2. TypeScript code compiles successfully (pre-commit) 
3. All tests pass before code is pushed to the central repository (pre-push)

These checks help maintain code quality and prevent issues from being introduced into the codebase. 