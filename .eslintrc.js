module.exports = {
  root: true,
  env: {
    "es6": true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017
  },
  plugins: ["sonarjs"],
  rules: {
    "generator-star-spacing": "off", // allow async-await
    "import/no-webpack-loader-syntax": "off",
    "no-unused-vars": 1, // 禁止使用未使用的变量
    "space-before-function-paren": "off",
    "no-alert": 1, // 不允许使用alert，confirm，prompt
    "no-delete-var": 1, // 不允许对变量进行delete操作
    "no-shadow-restricted-names": 1, // 禁止隐藏限制名称
    "no-caller": 1, // 禁止使用arguments.callee
    "no-new-symbol": 1, // 不允许对symbol进行new操作
    "no-void": 1, // 不允许使用void
    "no-with": 1, // 不允许使用with
    "for-direction": 1, // 检测for 循环是否正确
    "no-array-constructor": 1, // 不建议实用 new Array
    "no-const-assign": 1, // 禁止修改使用const
    "no-bitwise": 1, // 禁止按位运算符
    "no-eval": 1, // 不允许使用eval
    "no-debugger": 1, // 不允许使用debugger
    "no-param-reassign": 1, // 禁止重新分配功能参数
    "no-empty-pattern": 1, // 禁止使用空的销毁模式
    "no-extra-semi": 1, // 不允许使用多余的结尾符号
    "no-dupe-args": 1, // 不允许一个函数有相同的参数名
    "no-sequences": 1, // 禁用逗号操作符
    "no-loop-func": 1, // 禁止在循环语句中出现包含不安全引用的函数声明
    "no-duplicate-imports": 1, // 禁止重复模块导入
    "no-labels": 1, // 禁用标签语句
    "no-trailing-spaces": 1, // 禁用行位空白
    "no-multi-str": 1, // 禁止使用多行字符串
    "no-octal": 1, // 禁止使用八进制字面量
    "no-dupe-keys": 1, // 禁止对象字面量中出现重复的key
    "no-dupe-class-members": 1, // 禁止类成员中出现重复的名字
    "no-extra-parens": 1, // 禁止不必要的括号
    "no-template-curly-in-string": 1, // 禁止在常规字符串中出现模板字面量占位符语法
    "no-nested-ternary": 0, // 禁用嵌套的三元表达式
    "no-use-before-define": 1, // 禁止在变量定义之前使用它们
    "no-undef": 2, // 禁止未声明的变量
    "no-self-assign": 1, // 禁止自我赋值
    "no-new-wrappers": 0, // 禁止对 String，Number 和 Boolean 使用 new 操作符
    "max-len": ["error", {
      code: 180
    }], // 强制行的最大长度
    "max-statements-per-line": ["error", {
      max: 1
    }], // 强制每一行中所允许的最大语句数量
    "max-lines": ["error", 1000], // 文件最大行数
    "max-lines-per-function": ["error", 200], // 一个函数的最大行数
    "require-yield": 0, // 要求 generator 函数内有 yield
    "array-callback-return": 1, // Array return 特别注意 map 和 forEach 的区别
    "function-paren-newline": 0, // 函数换行符 不建议
    "constructor-super": 1, // 验证super()in构造函数中的调用
    "use-isnan": 1, // 使用 isNaN 判断 NaN
    "no-unused-expressions": 0
  }
};
