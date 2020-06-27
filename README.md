[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Mkbug.js[![npm downloads](https://img.shields.io/npm/dm/mkbugjs.svg?style=flat-square)](http://npm-stat.com/charts.html?package=mkbugjs)
Egg.js[![npm downloads](https://img.shields.io/npm/dm/egg.svg?style=flat-square)](http://npm-stat.com/charts.html?package=egg)
Thinkjs[![npm downloads](https://img.shields.io/npm/dm/thinkjs.svg?style=flat-square)](http://npm-stat.com/charts.html?package=thinkjs)
# mkbug.js
A OOP style declare Nodejs framework base on Express.js！

[官方文档](http://doc.mkbug.com)

# What is mkbug.js
一款基于 Express.js 的面向对象风格声明式 Nodejs Web 框架。只需要声明并继承了对应接口的`Class`即可轻松的开发一个`Nodejs API`应用服务。

## Mkbug.js VS Egg.js VS Think.js

| 项目 | Mkbug.js | Egg.js | Think.js |
| ---- | ---- | ---- | ---- |
| Nodejs | Nodejs 10+ | Nodejs 8+ | Nodejs 6+ |
| 底层框架 | Express.js | Koa.js | Koa.js |
| 路由管理 | 自动 | 手动 | 自动 |
| 逻辑层管理 | 自动 | 无 | 无 |
| 数据层管理 | 自动 | 无 | 无 |
| 插件管理 | 自动 | 手动 | 手动 |
| 中间件管理 | 手动+自动 | 手动 | 手动 |
| 配置信息管理 | 自动 | 无 | 无 |
| JS扩展 | 原生 | 原生 | Babel |
| 代码风格 | OOP声明式 | 原生 | 原生 |
| 响应耗时 | 有 | 无 | 无 |
| 页面渲染 | 无差别使用expressjs渲染中间件 | egg页面渲染中间件 | 兼容koa页面渲染中间件 |
| 扩展能力 | 无差别使用expressjs | egg生态中间件 | 兼容koa页面渲染中间件 |
| 维护团队 | 个人 | 阿里 | 个人 |

## 创建第一个应用
```js
  // index.js
  const express = require('express');
  const app = express();

  const { Mkbug } = require('mkbugjs');

  new Mkbug(app)
    .create('/') // 请求url前缀
    .use(bodyParser.json()) // 使用express中间件
    .start(3001, (err) => { // 启动，同app.listen
    if (!err)
      console.log('Server started!')
    else
      console.error('Server start failed!')
  })

  // src/controller/index.js
  const { BaseController } = require('mkbugjs');

  module.exports = class api extends BaseController {
    getAction () {
      return 'Hello World';
    }
  }
```
