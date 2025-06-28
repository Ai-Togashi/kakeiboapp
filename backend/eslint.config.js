const eslintPluginTs = require('@typescript-eslint/eslint-plugin');
const parserTypeScript = require('@typescript-eslint/parser');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parserTypeScript,
      sourceType: 'module',
      ecmaVersion: 2021,
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
    },
    rules: {
      ...eslintPluginTs.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
