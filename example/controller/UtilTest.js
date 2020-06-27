const { BaseController } = require('../../index');

module.exports = class UtilTest extends BaseController {
  getCase1Action () {
    return this.Utils.TestUtil.sayHello('Mkbug');
  }

  getCase2Action () {
    return this.getUtil('TestUtil.TestUtil').sayHello('Mkbug');
  }
}