# mkbug.js
A OOP style nodejs web framework base expressjs.

# What is mkbug.js
一个基于expressjs封装的OOP风格的restful api框架。提供了controller -> logic -> model的封装和抽象，以及服务器配置管理的抽象。帮助创建易于维护的系统。

# Mkbug
```
  const express = require('express');

  const app = express();

  const { Mkbug } = require('mkbugjs');

  new Mkbug(app)
    .create('/demo') // 请求url前缀
    .use(middleware) // 配置第三方中间件
    .start(3000, () => { // 启动，同app.listen
    console.log('Server started!')
  })
```

# BaseController 
```
  get Logics // 逻辑抽象模块，会自动注入src/logics下的模块

  getLogic (path, def) // 支持以path的方式读取logic指定模块

  before () // 请求前置拦截器，默认返回true，如果返回false将直接返回。 也可以自己通过this.res自己处理

  after () // 请求返回前的拦截器，通常用于处理日志

  [get|post|put|delete|head|options|update|patch]XXXAction // get接口，return 内容作为返回的结果。可以通过this.type和this.status修改返回状态
```

# BaseLogic 
```
  // 继承自BaseLogic 且存在于logic目录的模块会自动注入到 controller对象的Logics中
  const { BaseLogic } = require('mkbugjs');

  module.exports = class Test1 extends BaseLogic {
    getHelloWorld () {
      return this.Models.Test.fetchHello();
    }
  }
```

# BaseModel
```
  // 继承自BaseModel 且存在于model目录的模块会自动注入到 logic对象的Models中
  const { BaseModel, Config } = require('mkbugjs');

  module.exports = class Test extends BaseModel {
    fetchHello () {
      return new Config().WELCOME_WORD;
    }
  }
```

# Config
```
  new Config('xxx') // 会自动读取src/config目录下文件。xxx.xxx.js的内容会覆盖xxx.js的内容实现配置信息的继承。
```

# How to use mkbug.js
```
  const express = require('express');

  const app = express();

  const { Mkbug } = require('mkbugjs')

  new Mkbug(app).create('/demo').start(3000, () => {
    console.log('Server started!')
  })
```

```
  // src/controller/test.js
  const { BaseController } = require('mkbugjs');

  module.exports = class Test extends BaseController {
    getTestAction () {
      return this.Logics.Test1.getHelloWorld();
    }
  }
  // 如果 process.env.NODE_ENV = dev 那么将返回HELLO [DEV], config是支持继承的。

  // src/logic/test.js
  const { BaseLogic } = require('mkbugjs');

  module.exports = class Test1 extends BaseLogic {
    getHelloWorld () {
      return this.Models.Test.fetchHello();
    }
  }

  // src/model/test.js
  const { BaseModel, Config } = require('mkbugjs');

  module.exports = class Test extends BaseModel {
    fetchHello () {
      return new Config().WELCOME_WORD;
    }
  }

  // src/config/config.conf
  WELCOME_WORD=HELLO

  // src/config/config.dev.conf
  WELCOME_WORD=HELLO [DEV]
```

# Changelog
2020-05-10: [BUGFIX]: 修正Config默认获取src目录<br/>
2020-05-10: [BUGFIX]: 修正默认获取代码路径<br/>
2020-05-10: [OPTIMIZE]: 优化文件不存在提示<br/>
