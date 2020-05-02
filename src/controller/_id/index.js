const { BaseController } = require('./../../../index');

module.exports = class Test1 extends BaseController {
  getListAction () {
    return this.params.id;
  }

  putScoueTextAction () {

  }
}