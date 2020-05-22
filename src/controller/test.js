const Base = require('../base/base');

module.exports = class Test3 extends Base {
  before () {
    return true;
  }
  getList3Action () {
    return this.Logics.test1.Test.hello();
  }

  putScoueTextAction () {
    // return this.getLogic()
  }
}