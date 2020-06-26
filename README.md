[![npm downloads](https://img.shields.io/npm/dm/mkbugjs.svg?style=flat-square)](http://npm-stat.com/charts.html?package=mkbugjs)
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
