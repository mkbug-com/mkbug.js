const { BaseModel, Config } = require('./../../../index');

module.exports = class Test extends BaseModel {
  constructor () {
    super();
    this.test = 'OK'
  }

  fetchHello () {
    console.log(new Config());
    return 'hello from model'
  }
}