const express = require('express');
const Stream = require('stream');
const chalk = require('chalk');

const { createModule } = require('./bin/helper');
const { METHODS } = require('./bin/const');
const { isPromise } = require('./bin/utils');
const BaseController = require('./bin/base.controller');

const router = express.Router();

function getMethod (method) {
  const re = new RegExp(/^(get|post|delete|put|update|options|patch|head)(.*)(Action$)/);
  return re[Symbol.match](method)
}

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
        ctx.req = req;
        ctx.res = res;
        ctx.query = req.query;
        ctx.body = req.body;
        ctx.params = req.params;
        ctx.status = 200;
        ctx.type = null;

        let data = null;

        const before = controller.before.call(ctx, req, res, next);

        if (before === true) {
          data = controller[method].call(ctx, req, res, next);
        }
        const after = controller.after.call(ctx, req, res, next);

        if (before === true) {
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

  console.info(chalk.bgYellow('==========Mkbug router mapping start=========='));
  const router = createModule(basePath);
  console.info(chalk.bgYellow('==========Mkbug router mapping end============'));

  return router;
}

exports.BaseController = BaseController;
