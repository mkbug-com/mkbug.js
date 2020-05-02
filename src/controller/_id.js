const { BaseController } = require('./../../index');

module.exports = class Test2 extends BaseController {
  getListAction () {
    return this.params.id;
  }

  putScoueTextAction () {
    return {
      msg: 'hello world',
      params: this.params.id,
      query: this.query
    }
  }

  getAction () {
    return 'hello';
  }
}