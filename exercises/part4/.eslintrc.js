// enable this to sort module.exports.overrides
// /* eslint sort-keys: 2 */

module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true,
    'jest': true,
  },
  'extends': 'eslint:recommended',
  'ignorePatterns': ['dist'],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'rules': {
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
    'no-console': 0,
    'no-trailing-spaces': 'error',
    'no-unused-vars': [
      'error',
      {
        'args': 'none',
      },
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'never',
    ],
  },
}