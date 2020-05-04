const { BaseLogic } = require('./../../index');

module.exports = class Test2 extends BaseLogic {
  getHelloWorld () {
    return this.Models.model2.Test.fetchHello();
  }
}