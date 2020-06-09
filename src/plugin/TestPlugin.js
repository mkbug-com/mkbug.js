const { BaseMiddleware, MkbugError } = require('./../../index');

module.exports = class TestMiddleware extends BaseMiddleware {
  constructor() {
    super();

    this.name = 'middleware test'
  }

  async exec (req, res) {
    res.test = this.getWord()
    // throw new MkbugError(200, 'test')
    return Promise.resolve()
  }

  getWord () {
    return 'hello'
  }
}