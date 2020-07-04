const { BasePlugin, MkbugError } = require('./../../index');

module.exports = class TestPlugin4 extends BasePlugin {
  exec(req, res) {
    if (req.query.type === 'plugin4') {
      throw new MkbugError(400, this.getUtil('TestUtil.TestUtil').sayHello('Mkbug'));
    }
  }
}