module.exports = class BaseModel {
  constructor() {
    this.__$$name = this.constructor.name;
  }

  __$$getName () {
    return this.__$$name;
  }
}