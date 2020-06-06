const { BaseModel, Config } = require('./../../../index');

module.exports = class Test extends BaseModel {
  constructor () {
    super();
    this.test = 'OK'
  }

  fetchHello () {
    console.log(new Config(), this.Utils.Util.getHelloWorld());
    return 'hello from model'
  }
}