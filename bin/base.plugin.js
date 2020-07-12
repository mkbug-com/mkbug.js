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
    next(e);
  }
};

module.exports = BasePlugin;
