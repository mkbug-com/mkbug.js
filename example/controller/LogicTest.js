const { BaseController } = require('../../index');

module.exports = class LogicTest extends BaseController {
  getCase1Action () {
    return this.Logics.TestLogic.getMsg();
  }

  getCase2Action () {
    return this.getLogic('TestLogic.TestLogic').getMsg();
  }
}