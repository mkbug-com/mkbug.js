const express = require('express');
const Stream = require('stream');
const chalk = require('chalk');
const path = require('path');

const { createModule } = require('./bin/helper');
const { METHODS } = require('./bin/const');
const { isPromise, getMethod } = require('./bin/utils');

const BaseController = require('./bin/base.controller');
const BaseLogic = require('./bin/base.logic');
const BaseModel = require('./bin/base.model');
const BaseConfig = require('./bin/base.config');
const { BaseMiddleware, BaseUtil } = require('./bin/base.plugin');

const router = express.Router();

router.__proto__.attch = function (pre, controller, needParams) {
  const name = controller.__$$getName();
  const methods = controller.__$$getMethods();
  const _this = this;

  methods.forEach(function createApi (method) {
    const actions = getMethod(method);
    const methodName = `${actions[2] === '' ? '' : actions[2].toLowerCase()}`
    if (METHODS.indexOf(actions[1]) > -1) {
      let uri = '';

      if (needParams) {
        uri = methodName.length > 0 ? `${pre}${methodName}` : `${pre.substring(0, pre.length - 1)}`
      } else {
        uri = `${pre}${name.toLowerCase()}/${methodName}`
      }
      console.info(chalk.yellow('Mkbug.js[INFO]:'), uri);

      _this[actions[1]](`${uri}`, async function (req, res, next) {
        const ctx = {};
        ctx.__proto__ = controller.__proto__;
        ctx.req = req;
        ctx.res = res;
        ctx.query = req.query;
        ctx.body = req.body;
        ctx.params = req.params;
        ctx.status = 200;
        ctx.type = null;

        const start = new Date().getTime();
        for (let key in controller) {
          ctx[key] = controller[key];
        }
        
        let data = null;

        const before = controller.before.call(ctx, req, res, next);
        let beforeRet = null;
        if (isPromise(before)) {
          beforeRet = await before;
        } else {
          beforeRet = before
        }

        if (beforeRet === true) {
          data = controller[method].call(ctx, req, res, next);
        }

        if (beforeRet === true) {
          let result = null;
          if (isPromise(data)) {
            result = await data;
          } else {
            result = data
          }

          if (!res.finished) {
            ctx.type && res.type(ctx.type);
            res.status(ctx.status);
            if (Buffer.isBuffer(result) || typeof result === 'string') {
              res.end(result);
            } else if (result instanceof Stream) {
              result.pipe(res);
            } else {
              res.json(result);
            }
          }
        } else {
          if (!res.finished) {
            ctx.type && res.type(ctx.type);
            res.status(405);
            res.end('Method not allowed');
          }
        }
        controller.after.call(ctx, {
          duration: new Date().getTime() - start,
          status: ctx.status,
          originalUrl: ctx.req.originalUrl,
          request: ctx.req,
          response: ctx.res
        });
      })
    }
  });
}

exports.Mkbug = class Mkbug {
  constructor (app, opts = {}) {
    console.info(chalk.bgGreen('Mkbug.js[INFO]:'), chalk.yellow(`Welcome to Mkbug.js (NODE_ENV = ${process.env.NODE_ENV})\n`));

    this.app = app;
    this.basePath = opts.path || path.resolve(process.cwd(), 'src');
    BaseConfig.prototype.baseUrl = this.basePath;
  }

  create (prefix = '') {
    this.app.use(prefix, createModule(this.basePath));
    return this;
  }

  use (middleWare) {
    this.app.use(middleWare);
    return this;
  }

  start (port, cb) {
    this.app.listen(port, cb);
  }
}

exports.BaseController = BaseController;
exports.BaseLogic = BaseLogic;
exports.BaseModel = BaseModel;
exports.Config = BaseConfig;
exports.BaseMiddleware = BaseMiddleware;
exports.BaseUtil = BaseUtil;
