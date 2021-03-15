module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
    browser: true
  },
  extends: ['eslint:recommended', "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {},
  settings: {
    react: {
      "version": "detect"
    }
  }
};
