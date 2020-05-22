const { _get } = require('./utils');
const Base = require('./base');

module.exports = class BaseLogic extends Base {
  constructor() {
    super();
  }

  getModel (path, def = null) {
    return _get(this.Models, path, def);
  }
}
