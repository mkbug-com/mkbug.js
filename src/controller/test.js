const Base = require('../base/base');

module.exports = class Test3 extends Base {
  getList3Action () {
    this.before()
    this.putScoueTextAction()
    console.log(this.Logics.Test2.getHelloWorld())
    console.log(this.getLogic('Test2[0].getHelloWorld'))
    return this.getHello();
  }

  putScoueTextAction () {
    // return this.getLogic()
  }
}