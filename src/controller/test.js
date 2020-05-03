const Base = require('../base/base');

module.exports = class Test3 extends Base {
  getList3Action () {
    console.log(this.Logics.Test2.getHelloWorld())
    console.log(this.getLogic('test1.Test.test'))
    return this.getHello();
  }

  putScoueTextAction () {
    // return this.getLogic()
  }
}