module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
    browser: true,
    react: true
  },
  extends: ['eslint:recommended', 'plugin:import/errors', 'plugin:import/warnings', 'plugin:import/typescript'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'never', { sts: 'always' }],
  },
  settings: {
    'import/extensions': [
      '.js',
      '.ts',
    ],
  },
};
