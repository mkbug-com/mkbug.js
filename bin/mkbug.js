const path = require('path');
const Stream = require('stream');

const { createModule } = require('./helper');
const { LOG, INFO, ERROR } = require('./utils');
const BaseConfig = require('./base.config');
const MkbugError = require('./base.mkbugerror');

class Mkbug {
  constructor (app, opts = {}) {
    LOG(`Welcome to Mkbug.js (NODE_ENV = ${process.env.NODE_ENV || ''})\n`);

    this.app = app;
    this.basePath = opts.path && path.resolve(process.cwd(), opts.path) || path.resolve(process.cwd(), 'src');
    BaseConfig.prototype.baseUrl = this.basePath;
    Object.freeze(BaseConfig.prototype);
    this.prefix = '';

    this.eCb = function (error, req, res) {
      return error;
    };;
  }

  create (prefix = '') {
    let prePath = prefix;
    if (prefix === '/') {
      prePath = ''
    }
    this.app.use(prePath, createModule(this.basePath, prePath));
    return this;
  }

  use (...plugin) {
    this.app.use(...plugin);
    return this;
  }

  error (cb) {
    this.eCb = cb;
  }

  start (port, cb) {
    const _this = this;
    this.app.use(function notFound(req, res, next) {
      next(new MkbugError(404, 'Request not found!'));
    });

    this.app.use(function exception(error, req, res, next) {
      const ret = _this.eCb(error);
      let result = null;
      let status = 500;

      if (!res.finished) {
        if (ret instanceof MkbugError) {
          status = ret.status;
          result = ret.body;
        } else if (ret instanceof Error) {
          result = {
            name: 'Mkbug Error',
            msg: `Reject by ${ret.name}!`
          }
        } else {
          result = 'Mkbug Error';
        }

        res.status(status);
        if (Buffer.isBuffer(result) || typeof result === 'string') {
          res.end(result);
        } else if (result instanceof Stream) {
          result.pipe(res);
        } else {
          res.json(result);
        }
      }
    })

    this.app.listen(port, cb || function callback (err) {
      if (err) {
        ERROR(`Failed with [PORT=${port}]`, err);
      } else {
        INFO(`Start with [PORT=${port}]`);
      }
    });
    return this.app;
  }
}

Object.freeze(Mkbug.prototype);

module.exports = Mkbug;