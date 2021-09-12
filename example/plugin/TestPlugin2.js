const { BasePlugin, MkbugError } = require('./../../index');

module.exports = class TestPlugin2 extends BasePlugin {
  exec(req) {
    if (req.query.type === 'plugin2') {
      throw new MkbugError(400, 'test string');
    }
  }
};
