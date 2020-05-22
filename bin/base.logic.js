const { _get } = require('./utils');
const Base = require('./base');

module.exports = class BaseLogic extends Base {
  constructor(models) {
    super();
    this.__$$model = models;
  }

  get Models () {
    return this.__$$model;
  }

  getModel (path, def = null) {
    return _get(this.Models, path, def);
  }
}
