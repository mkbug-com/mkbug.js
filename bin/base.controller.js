module.exports = class BaseController {
  constructor() {
    this.name = this.constructor.name;
  }

  before () {
    return true;
  }

  after () {
    
  }

  __$$getName () {
    return this.name;
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