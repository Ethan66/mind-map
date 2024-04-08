module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error', { arrowParens: 'avoid' }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: [2, 'never'],
    'vue/multi-word-component-names': 'off',
    // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
    'array-bracket-spacing': ['error', 'never'],
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    'comma-dangle': [2, 'never'],
    // 使用 === 替代 ==
    eqeqeq: [2, 'allow-null'],
    // 文件末尾强制换行
    'eol-last': 2,
    // 箭头函数
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: false }],
    // 允许ts使用 any 类型
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
