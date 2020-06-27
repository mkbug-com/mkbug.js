const { BaseController } = require('../../index');

module.exports = class ModelTest extends BaseController {
  getCase1Action () {
    return this.Logics.TestLogic.getModelMsg();
  }

  getCase2Action () {
    return this.getLogic('TestLogic.TestLogic').getModelMsg();
  }
}