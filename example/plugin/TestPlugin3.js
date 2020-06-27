const { BasePlugin, MkbugError } = require('./../../index');

module.exports = class TestPlugin3 extends BasePlugin {
  exec(req, res) {
    if (req.query.type === 'plugin3') {
      return new MkbugError(400, {
        msg: 'test json'
      })
    }
  }
}