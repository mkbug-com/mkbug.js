const chalk = require('chalk');

const { _get, INFO } = require('./utils');
const Base = require('./base');

class BaseController extends Base {
  constructor() {
    super();
  }

  getLogic (path, def = null) {
    return _get(this.Logics, path, def);
  }

  before (request, response) {
    return true;
  }

  after ({ duration, status, originalUrl, request, response }) {
    INFO(`${duration}ms [${status}][${request.method}]${originalUrl}`);
  }
}

BaseController.prototype.__$$getMethods = function () {
  const props = Object.getOwnPropertyNames(this.__proto__);
  return props.filter((prop) => {
    if (prop !== "constructor" &&
      typeof this[prop] === "function" &&
      prop.endsWith('Action')) {
      return true;
    } else {
      return false;
    }
  });
}

module.exports = BaseController;