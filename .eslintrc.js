module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'airbnb-base',
    'prettier',
  ],
  parser: '@babel/eslint-parser',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        'ignores': ['dynamicImport', 'modules']
      }
    ],
    'node/no-unsupported-features/node-builtins': [
      'error',
      {
        'ignores': ['URL']
      }
    ],
  },
};
