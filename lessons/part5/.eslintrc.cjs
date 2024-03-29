// enable this to sort module.exports.overrides
// /* eslint sort-keys: 2 */

/* eslint-env node */

module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'jest'],
  rules: {
    'arrow-parens': 'error',
    'arrow-spacing': [
      'error',
      {
        'before': true,
        'after': true,
      },
    ],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'never',
      },
    ],
    'eqeqeq': 'error',
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'no-console': 'off',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-tag-spacing': [
      'error',
      {
        'closingSlash': 'never',
        'beforeSelfClosing': 'always',
        'afterOpening': 'never',
        'beforeClosing': 'never',
      },
    ],
    'react/prop-types': 'off',
    'semi': [
      'error',
      'never',
    ],
    'sort-imports': 'error',
    'space-in-parens': [
      'error',
      'never',
    ],
    'space-infix-ops': 'error',
  },
}
