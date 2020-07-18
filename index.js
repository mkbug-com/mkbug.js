if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'DEBUG';
}

require('./bin/express.init');

exports.Mkbug = require('./bin/mkbug');
exports.BaseController = require('./bin/base.controller');;
exports.BaseLogic = require('./bin/base.logic');
exports.BaseModel = require('./bin/base.model');
exports.Config = require('./bin/base.config');
exports.BasePlugin = require('./bin/base.plugin');
exports.MkbugError = require('./bin/base.mkbugerror');
