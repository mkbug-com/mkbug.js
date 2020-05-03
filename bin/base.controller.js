const { _get } = require('./utils');

module.exports = class BaseController {
  constructor(logics) {
    this.__$$name = this.constructor.name;
    this.__$$logics = logics;
  }

  get Logics () {
    return this.__$$logics;
  }

  getLogic (path, def = null) {
    return _get(this.Logics, path, def);
  }

  before () {
    return true;
  }

  after () {
    
  }

  __$$getName () {
    return this.__$$name;
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