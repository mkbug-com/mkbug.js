const { BaseController } = require('../../index');

module.exports = class PluginTest extends BaseController {
  getAction() {
    return 'ok';
  }
};
