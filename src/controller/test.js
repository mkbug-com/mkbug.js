const Base = require('../base/base');

module.exports = class Test3 extends Base {
  getList3Action () {
    return this.Logics.Test2.getHelloWorld();
  }

  putScoueTextAction () {
    // return this.getLogic()
  }
}