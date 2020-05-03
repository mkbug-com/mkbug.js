const { BaseLogic } = require('./../../index');

module.exports = class Test2 extends BaseLogic {
  getHelloWorld () {
    return 'hello world'
  }
}