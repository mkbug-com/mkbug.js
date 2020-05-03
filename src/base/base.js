const { BaseController } = require('../../index');

module.exports = class Base extends BaseController {
  getHello () {
    this.before()
    return 'hello';
  }
}