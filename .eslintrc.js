module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true, // 使用require就不会报错了
    commonjs: true
  },
  globals: {
    describe: true,
    it: true,
    expect: true
  },
  parser: 'babel-eslint',
  // 配置解析器
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  // 规则内容参考：http://eslint.cn/docs/rules/
  // 值为 0 时该规则不生效
  // 值为 1 时是显示警告
  // 值为 2 时显示报错
  rules: {
    // Possible Errors
    'getter-return': 2,
    'no-empty': ['warn', { allowEmptyCatch: true }],
    'use-isnan': 2, // 使用 isNaN 判断 NaN
    'no-cond-assign': 2, // 禁止条件表达式中出现赋值操作符
    'no-dupe-keys': 2, // 禁止对象字面量中出现重复的key
    'no-dupe-args': 2, // 禁止 function 定义中出现重名参数
    'no-extra-boolean-cast': 2, // 禁止不必要的布尔转换
    'no-extra-semi': 0, // 禁止不必要的分号
    'no-regex-spaces': 2, // 禁止正则表达式字面量中出现多个空格
    'no-irregular-whitespace': ['error', { skipComments: true }],

    // Best Practices
    'array-callback-return': 2, // Array return 特别注意 map 和 forEach 的区别
    'no-caller': 2, // 禁止使用arguments.callee
    'no-alert': 2, // 不允许使用alert，confirm，prompt
    'no-useless-catch': 1,
    // 'no-unused-expressions': ["error", { "allowTaggedTemplates": true }], // 禁止出现未使用过的表达式

    // Variables
    'no-delete-var': 2, // 不允许对变量进行delete操作
    'no-shadow-restricted-names': 2, // 禁止将标识符定义为受限的名字
    'no-use-before-define': [2, { functions: false }], // 禁止在变量定义之前使用它们
    'no-undef': 2, // 禁止未声明的变量
    'no-unused-vars': [2, { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],

    // Node.js and CommonJS
    'no-process-exit': 'off',
    'no-useless-escape': 'off',
    // Stylistic Issues
    'no-trailing-spaces': 2, // 禁用行位空白
    // 'max-len': ['error', { code: 180 }], // 强制行的最大长度
    'max-statements-per-line': ['error', { max: 1 }], // 强制每一行中所允许的最大语句数量
    'max-lines': ['error', 1000], // 文件最大行数
    'max-lines-per-function': ['error', 200], // 一个函数的最大行数
    // ECMAScript 6
    'no-const-assign': 2, // 禁止修改使用const
    'no-new-symbol': 2,
    'prefer-const': [
      'warn',
      {
        destructuring: 'all'
      }
    ],
    'no-duplicate-imports': 2, // 禁止重复模块导入
    'no-dupe-class-members': 2, // 禁止类成员中出现重复的名字
    'require-yield': 2, // 要求 generator 函数内有 yield
    'constructor-super': 2 // 验证super()in构造函数中的调用
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
};
