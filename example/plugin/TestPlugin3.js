const { BasePlugin, MkbugError } = require('./../../index');

module.exports = class TestPlugin3 extends BasePlugin {
  exec(req, res) {
    if (req.query.type === 'plugin3') {
      throw new MkbugError(400, { msg: 'test json' })
    }
  }
}