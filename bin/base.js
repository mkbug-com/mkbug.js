const { _get } = require('./utils');
module.exports = class Base {
  constructor() {
    this.__$$name = this.constructor.name;
  }

  __$$getName () {
    return this.__$$name;
  }

  getUtil (path, def = null) {
    return _get(this.Utils, path, def);
  }
}
