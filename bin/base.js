module.exports = class Base {
  constructor() {
    this.__$$name = this.constructor.name;
  }

  __$$getName () {
    return this.__$$name;
  }
}
