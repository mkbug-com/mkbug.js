const { BaseLogic } = require('./../../../index');

module.exports = class TestLogic extends BaseLogic {
  getUserName () {
    return 'Mkbug.js from TestLogic.TestLogic'
  }
}