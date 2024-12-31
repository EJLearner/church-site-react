module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
  settings: {react: {version: 'detect'}},
  plugins: ['react-refresh', 'import', '@typescript-eslint'],
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
    'react/jsx-no-target-blank': 'off',
    'react/jsx-curly-brace-presence': 'error',
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
  },
};
