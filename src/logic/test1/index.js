const { BaseLogic } = require('./../../../index');

module.exports = class Test extends BaseLogic {
  constructor () {
    super();
    this.test = 'OK'
  }

  hello () {
    return this.Models.model2.Test.fetchHello();
  }
}