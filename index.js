const express = require('express');
const Stream = require('stream');
const chalk = require('chalk');

const { createModule } = require('./bin/helper');
const { METHODS } = require('./bin/const');
const { isPromise } = require('./bin/utils');
const BaseController = require('./bin/base.controller');
const BaseLogic = require('./bin/base.logic');

const { getMethod } = require('./bin/utils');

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
        const after = controller.after.call(ctx, req, res, next);

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
            } else if (result instanceof String) {
              result.pipe(res);
            } else {
              res.json(result);
            }
          }
        }
      })
    }
  });
}

exports.router = function (opts = {}) {
  console.info(chalk.bgGreen('Mkbug.js[INFO]:'), chalk.yellow('Welcome to Mkbug.js'));
  const basePath = opts.path || path.resolve(process.cwd(), 'controller');  
  const router = createModule(basePath);

  return router;
}

exports.BaseController = BaseController;
exports.BaseLogic = BaseLogic;
