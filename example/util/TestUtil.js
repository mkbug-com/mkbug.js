const { BaseUtil } = require('../../index');

module.exports = class TestUtil extends BaseUtil {
  sayHello (name) {
    return `${name} said Hello from TestUtil!`
  }
}