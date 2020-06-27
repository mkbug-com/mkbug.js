const { BaseLogic } = require('./../../index');

module.exports = class TestLogic extends BaseLogic {
  constructor () {
    super()
  }

  getUserName () {
    return 'Mkbug.js from TestLogic'
  }
}