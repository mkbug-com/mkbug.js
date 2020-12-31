[![NPM version][npm-image]][npm-url]
[![NPM quality][quality-image]][quality-url]
[![npm download][download-image]][download-url]
[![build status][travis-image]][travis-url]

[travis-image]: https://travis-ci.org/mkbug-com/mkbug.js.svg?branch=master&status=passed
[travis-url]: https://travis-ci.org/mkbug-com/mkbug.js
[download-image]: https://img.shields.io/npm/dm/mkbugjs.svg?style=flat-square
[download-url]: https://npmjs.org/package/mkbugjs
[npm-image]: https://img.shields.io/npm/v/mkbugjs.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mkbugjs
[quality-image]: http://npm.packagequality.com/shield/mkbugjs.svg?style=flat-square
[quality-url]: http://packagequality.com/#?package=mkbugjs
[codecov-image]: https://img.shields.io/codecov/c/github/mkbug-com/mkbug.js.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/mkbug-com/mkbug.js

# mkbug.js
An OOP style declare Nodejs framework base on Express.js！

[官方文档(中文)](http://doc.mkbug.com)

# What is mkbug.js
An OOP Style Restful Api framewrok base on Express.js,and make Nodejs development beautiful and easy.

## Mkbug.js VS Egg.js VS Think.js

| 项目 | Mkbug.js | Egg.js | Think.js |
| ---- | ---- | ---- | ---- |
| Nodejs | Nodejs 10+ | Nodejs 8+ | Nodejs 6+ |
| Base on | Express.js | Koa.js | Koa.js |
| Router | Auto | Manual | Auto |
| Plugin | Auto | Manual | Manual |
| Middleware | Auto+Manual | Manual | Manual |
| Config | Auto | No | No |
| JS extend | ES6 | ES6 | Babel |
| Style | OOP | Pure | Pure |
| Duration | Yes | No | No |
| Extend Capability | compatible expressjs | egg ecology | compatible koa |

## Your First Mkbug Application
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

## About extends
If you want to use middleware like koa. you can use it like this.
```js
  // base/ControllerBaseBase.js
  const { BaseController } = require('mkbug.js');

  module.exports = class ControllerBaseBase extends BaseController {
    before (req) {
      console.log("ControllerBaseBase before")
    }

    after(){
      console.log("ControllerBaseBase after")
    }
  }

  // base/ControllerBase.js
  const ControllerBaseBase = require('./ControllerBaseBase');

  module.exports = class ControllerBase extends ControllerBaseBase {
    before (request, response) {
      super.before(request, response)
      console.log("ControllerBase before")
    }

    after ({ duration, status, originalUrl, request, response }) {
      console.log("ControllerBase after")
      super.after({ duration, status, originalUrl, request, response })
    }
  }

  // ExtendsTest.js
  const ControllerBase = require('./base/ControllerBase');

  module.exports = class ExtendsTest extends ControllerBase {
    before (request, response) {
      super.before(request, response)
      console.log("Request start")
    }

    getAction () {
      return "hello world"
    }

    after () {
      console.log("Request end")
      super.after({})
    }
  }
```

And then you can send curl request to /api/extendstest, you should get the log:
```sh
  $ curl http://localhost:3000/api/extendstest

  ControllerBaseBase before
  ControllerBase before
  Request start
  Request end
  ControllerBase after
  ControllerBaseBase after
```

It is very easy, right?