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
            controller.before.call(ctx, req, res, next);
            data = controller[method].call(ctx, req, res, next);

            if (isPromise(data)) {
              result = await data;
            } else {
              result = data
            }
          } catch (e) {
            if (!res.finished && e instanceof MkbugError) {
              ctx.status = e.status;
              result = e.body;
            } else {
              ctx.status = 500;
              result = {
                name: 'MkbugError',
                msg: `Reject by ${this.name}!`
              }
            }
          } finally {
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
          }
        })
      }
    } else {
      WARN(`${method} in Controller ${name} is not right HTTP Method.\n`);
    }
  }

  methods.forEach(createApi);
}
