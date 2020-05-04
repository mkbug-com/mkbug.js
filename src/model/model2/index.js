const { BaseModel } = require('./../../../index');

module.exports = class Test extends BaseModel {
  constructor () {
    super();
    this.test = 'OK'
  }

  fetchHello () {
    return 'hello from model'
  }
}