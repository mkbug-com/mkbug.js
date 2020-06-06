const { BaseMiddleware } = require('./../../index');

module.exports = class TestMiddleware extends BaseMiddleware {
  constructor() {
    super();

    this.name = 'middleware test'
  }

  exec (req, res) {

  }

  getWord () {
    return 'hello'
  }
}