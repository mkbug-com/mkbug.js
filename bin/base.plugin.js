const Base = require('./base');
const { isPromise } = require('./utils');

class BaseMiddleware extends Base {
  exec (req, res) {
    
  }
};

class MkbugError extends Error {
  constructor(status, responseBody) {
    super()
    this.status = status;
    this.body = responseBody;
    this.name = 'MkbugError';
  }
};

BaseMiddleware.prototype.run = async function (req, res, next) {
  try {
    const result = this.exec(req, res)
    if (isPromise(result)) {
      await result;
    }
    next();
  } catch (e) {
    if (!res.finished && e instanceof MkbugError) {
      res.status(e.status).json(e.body).end();
    } else if (!res.finished) {
      res.status(500).json({
        name: 'MkbugError',
        msg: `Reject by ${this.name || this.constructor.name}!`
      })
    }
  }
};

exports.BaseMiddleware = BaseMiddleware;

exports.BaseUtil = class BaseUtil extends Base {

};

exports.MkbugError = MkbugError;
