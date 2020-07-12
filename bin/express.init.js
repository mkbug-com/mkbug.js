const express = require('express');
const Stream = require('stream');

const { METHODS } = require('./const');
const {
  isPromise,
  getMethod,
  createContext,
  INFO,
  WARN
} = require('./utils');
const MkbugError = require('./base.mkbugerror');

const router = express.Router();

router.__proto__.attch = function (pre, controller, needParams, prefix) {
  const name = controller.__$$getName();
  const methods = controller.__$$getMethods();
  const _this = this;

  function createApi (method) {
    const actions = getMethod(method);
    if (actions !== null) {
      const methodName = `${actions[2] === '' ? '' : actions[2].toLowerCase()}`;
      if (METHODS.indexOf(actions[1]) > -1) {
        let uri = '';
        if (needParams) {
          uri = methodName.length > 0 ? `${pre}${methodName}` : `${pre.substring(0, pre.length - 1)}`;
        } else {
          uri = methodName.length > 0 ? `${pre}${name.toLowerCase()}/${methodName}` : `${pre}${name.toLowerCase()}`;
        }
        INFO(`api = [${actions[1]}] ${prefix}${uri}`);

        _this[actions[1]](`${uri}`, async function (req, res, next) {
          const ctx = createContext(controller, req, res);
          const start = new Date().getTime();

          res.on('finish', () => {
            controller.after.call(ctx, {
              duration: new Date().getTime() - start,
              status: ctx.status,
              originalUrl: ctx.req.originalUrl,
              request: ctx.req,
              response: ctx.res
            })
          })

          for (let key in controller) {
            ctx[key] = controller[key];
          }
          
          let data = null;
          let result = null;

          try {
            controller.before.call(ctx, req, res);
            data = controller[method].call(ctx, req, res);

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
          } catch (e) {
            next(e);
          }
        })
      }
    } else {
      WARN(`${method} in Controller ${name} is not right HTTP Method.\n`);
    }
  }

  methods.forEach(createApi);
}
