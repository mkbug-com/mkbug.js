const { BaseLogic } = require('./../../index');

module.exports = class TestLogic extends BaseLogic {
  getMsg() {
    return 'Mkbug.js from TestLogic'
  }

  getModelMsg () {
    return this.Models.TestModel.getMsg();
  }
}