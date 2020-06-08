const { BaseMiddleware } = require('./../../index');

module.exports = class Test1Middleware extends BaseMiddleware {
  constructor() {
    super();

    this.name = 'middleware test1'
  }

  exec (req, res) {

  }

  getWord () {
    return 'hello1'
  }
}