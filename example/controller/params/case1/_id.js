const { BaseController } = require('../../../../index');

module.exports = class Case1 extends BaseController {
  getAction() {
    return this.params.id;
  }
};
