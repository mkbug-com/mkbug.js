const Base = require('./base');
const { isPromise } = require('./utils');
const MkbugError = require('./base.mkbugerror');

class BasePlugin extends Base {
  exec (req, res) {
    
  }
};

BasePlugin.prototype.run = async function (req, res, next) {
  try {
    const result = this.exec(req, res)
    if (isPromise(result)) {
      await result;
    }
    next();
  } catch (e) {
    if (!res.finished && e instanceof MkbugError) {
      res.status(e.status).json(typeof e.body === 'string' ? {
        msg: e.body
      } : e.body).end();
    } else if (!res.finished) {
      res.status(500).json({
        name: 'MkbugError',
        msg: `Reject by ${this.name || this.constructor.name}!`
      })
    }
  }
};

module.exports = BasePlugin;
