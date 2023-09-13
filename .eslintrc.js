module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    indent: ['error', 2],
    "ObjectExpression": 1,
    "offsetTernaryExpressions": false,
    "offsetTernaryExpressions": true,
    "ignoreComments": true
  }
}
