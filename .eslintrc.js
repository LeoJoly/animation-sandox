module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 5
        },
        multiline: {
          max: 1
        }
      }
    ],
    'vue/multiline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/newline-before-return': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'comma-dangle': ['error', 'never'],
    curly: ['error', 'multi'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-console': 'warn',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': 'error',
    'no-var': 'error',
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'space-in-parens': 'error'
  }
}