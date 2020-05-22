const Base = require('../../../base/base');

module.exports = class Test7 extends Base {
  before () {
    return true;
  }
  getList3Action () {
    return this.Logics.Test2.getHelloWorld();
  }

  putScoueTextAction () {
    // return this.getLogic()
  }
}