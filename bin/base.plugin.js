const Base = require('./base');
const { isPromise } = require('./utils');
const MkbugError = require('./base.mkbugerror');

class BasePlugin extends Base {
  constructor() {
    super();
  }
  
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
      if (typeof e.body === 'object') {
        res.status(e.status).json(e.body).end();
      } else {
        res.status(e.status).end(e.body).end();
      }
    } else if (!res.finished) {
      res.status(500).json({
        name: 'MkbugError',
        msg: `Reject by ${this.name || this.constructor.name}!`
      })
    }
  }
};

module.exports = BasePlugin;
