const chalk = require('chalk');

function str2path(path) {
  const ret = [];
  const keys = path.split('.');
  keys.forEach(function transKey(key) {
    const start = key.indexOf('[');
    const end = key.indexOf(']');
    if (start > -1 && end > -1) {
      ret.push(key.substring(0, start));
      ret.push(key.substring(start + 1, end));
    } else {
      ret.push(key);
    }
  });
  return ret;
}

const isTest = process.env.NODE_ENV !== 'JEST';

module.exports = {
  isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
  },
  getMethod(method) {
    const re = new RegExp(/^(get|head|post|put|delete|connect|options|patch|trace)(.*)(Action$)/);
    return re[Symbol.match](method);
  },
  _get(obj, path, def) {
    const basePath = str2path(path);

    return (
      basePath.reduce((ret, next) => {
        return ret === undefined ? undefined : ret[next];
      }, obj) || def
    );
  },
  createContext(source, req, res) {
    const ctx = {};
    ctx.__proto__ = source;
    ctx.req = req;
    ctx.res = res;
    ctx.query = req.query;
    ctx.body = req.body;
    ctx.params = req.params;
    ctx.status = 200;
    ctx.type = null;
    ctx.get = req.get.bind(req);
    ctx.set = res.set.bind(res);
    ctx.ip = req.ip;
    ctx.ips = req.ips;

    return ctx;
  },
  LOG(msg, ...other) {
    isTest && console.log(chalk.bgBlack('Mkbug.js [ LOG ]:'), msg, ...other);
  },
  INFO(msg, ...other) {
    isTest && console.info(chalk.yellow('Mkbug.js [ INFO]:'), chalk.yellow(msg), ...other);
  },
  WARN(msg, ...other) {
    isTest && console.warn(chalk.magenta('Mkbug.js [ WARN]:'), chalk.magenta(msg), ...other);
  },
  ERROR(msg, ...other) {
    isTest && console.error(chalk.red('Mkbug.js [ERROR]:'), chalk.red(msg), ...other);
  }
};
