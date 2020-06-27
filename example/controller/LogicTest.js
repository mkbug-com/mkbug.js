const { BaseController } = require('../../index');

module.exports = class LogicTest extends BaseController {
  getCase1Action () {
    return this.Logics.TestLogic.getUserName();
  }

  getCase2Action () {
    return this.getLogic('TestLogic.TestLogic').getUserName();
  }
}