const Base = require('../../base/base');

module.exports = class Test8 extends Base {
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
