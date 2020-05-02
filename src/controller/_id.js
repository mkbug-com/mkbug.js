const { BaseController } = require('./../../index');

module.exports = class Test2 extends BaseController {
  getListAction () {
    return this.params.id;
  }

  putScoueTextAction () {

  }

  getAction () {
    return 'hello';
  }
}