import process from 'process';

import {fixupConfigRules, fixupPluginRules} from '@eslint/compat';
import {FlatCompat} from '@eslint/eslintrc';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import {defineConfig, globalIgnores} from 'eslint/config';
import pluginImport from 'eslint-plugin-import';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['dist']),
  // Base/legacy configs via compat must come first
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
    ),
  ),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {jsx: true},
      },
    },
    settings: {
      react: {version: 'detect'},
    },
    plugins: {
      'react-refresh': reactRefresh,
      import: fixupPluginRules(pluginImport),
      '@typescript-eslint': fixupPluginRules(tseslint),
    },
    rules: {
      'import/first': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {order: 'asc'},
          'newlines-between': 'always',
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
        },
      ],
      'no-warning-comments': 'warn',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'react/jsx-no-target-blank': 'off',
      'react/jsx-curly-brace-presence': 'error',
      'react/jsx-sort-props': 'error',
      'react-refresh/only-export-components': [
        'warn',
        {allowConstantExport: true},
      ],
    },
  },
]);
