function str2path (path) {
  let ret = [];
  const keys = path.split('.');
  keys.forEach(function transKey (key) {
    const start = key.indexOf('[');
    const end = key.indexOf(']')
    if (start > -1 && end > -1) {
      ret.push(key.substring(0, start));
      ret.push(key.substring(start + 1, end));
    } else {
      ret.push(key);
    }
  })
  return ret;
}

module.exports = {
  isPromise (obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
  },
  getMethod (method) {
    const re = new RegExp(/^(get|post|delete|put|update|options|patch|head)(.*)(Action$)/);
    return re[Symbol.match](method)
  },
  _get (obj, path, def) {
    const basePath = str2path(path);

    return basePath.reduce((ret, next) => {
      return ret === undefined ? undefined : ret[next];
    }, obj) || def;
  },
  createContext (source, req, res) {
    const ctx = {};
    ctx.__proto__ = source;
    ctx.req = req;
    ctx.res = res;
    ctx.query = req.query;
    ctx.body = req.body;
    ctx.params = req.params;
    ctx.status = 200;
    ctx.type = null;

    return ctx;
  }
}