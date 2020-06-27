const { BaseModel } = require('./../../index');

module.exports = class TestModel extends BaseModel {
  getMsg () {
    return 'Mkbug.js from TestModel'
  }
}