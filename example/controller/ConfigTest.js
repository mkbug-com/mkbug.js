const { BaseController, Config } = require('../../index');

module.exports = class ConfigTest extends BaseController {
  getDefaultConfigAction () {
    return new Config('case1');
  }
}