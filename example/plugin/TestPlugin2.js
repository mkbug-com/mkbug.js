const { BasePlugin, MkbugError } = require('./../../index');

module.exports = class TestPlugin2 extends BasePlugin {
  exec(req, res) {
    if (req.query.type === 'plugin2') {
      return new MkbugError(400, 'test string')
    }
  }
}