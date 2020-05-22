const { _get } = require('./utils');
const Base = require('./base');

module.exports = class BaseController extends Base {
  constructor() {
    super();
  }

  getLogic (path, def = null) {
    return _get(this.Logics, path, def);
  }

  before () {
    return true;
  }

  after () {
    
  }

  __$$getMethods () {
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
}