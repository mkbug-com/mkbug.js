const Base = require('../../../base/base');

module.exports = class Test7 extends Base {
  constructor() {
    super()

    this.test = 1
  }
  before () {
    return true;
  }
  getList3Action () {
    this.test = this.test + 1
    console.log('ok: ' + this.test)
    return this.Logics.Test2.getHelloWorld();
  }

  putScoueTextAction () {
    // return this.getLogic()
  }
}