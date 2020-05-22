const { BaseController } = require('../../index');

module.exports = class Base extends BaseController {
  getHello () {
    this.before()
    return 'hello';
  }

  after ({duration, status, originalUrl}) {
    console.log(duration, status, originalUrl)
  }
}