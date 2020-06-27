const { BaseController } = require('../../../../../../index');

module.exports = class Case2 extends BaseController {
  getAction () {
    return this.params;
  }
}