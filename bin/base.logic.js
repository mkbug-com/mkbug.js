const { _get } = require('./utils');

module.exports = class BaseLogic {
  constructor(models) {
    this.__$$name = this.constructor.name;
    this.__$$model = models;
  }

  get Models () {
    return this.__$$model;
  }

  getModel (path, def = null) {
    return _get(this.Models, path, def);
  }

  __$$getName () {
    return this.__$$name;
  }
}