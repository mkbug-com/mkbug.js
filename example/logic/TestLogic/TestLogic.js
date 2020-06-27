const { BaseLogic } = require('./../../../index');

module.exports = class TestLogic extends BaseLogic {
  getMsg () {
    return 'Mkbug.js from TestLogic.TestLogic'
  }

  getModelMsg () {
    return this.getModel('TestModel.TestModel').getMsg();
  }
}