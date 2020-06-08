const Base = require('./base');
const { isPromise } = require('./utils');

class BaseMiddleware extends Base {
  exec (req, res) {
    
  }
}

BaseMiddleware.prototype.run = async function (req, res, next) {
  try {
    const result = this.exec(req, res)
    if (isPromise(result)) {
      await result;
    }
    next();
  } catch (e) {
    next(e);
  }
}

exports.BaseMiddleware = BaseMiddleware

exports.BaseUtil = class BaseUtil extends Base {

}
