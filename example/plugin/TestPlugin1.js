const { BasePlugin } = require('./../../index');

module.exports = class TestPlugin1 extends BasePlugin {
  exec(req, res) {
    res.cookie('plugin', 'true');
  }
}