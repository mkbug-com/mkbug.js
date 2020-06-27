const { BaseController } = require('../../../../../index');

module.exports = class ParamCase2 extends BaseController {
  getAction () {
    return this.params.id;
  }
}