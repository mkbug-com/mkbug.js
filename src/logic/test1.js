const { BaseLogic } = require('./../../index');

module.exports = class test1 extends BaseLogic {
  getOk () {
    return 'ok'
  }
}