const ControllerBase = require('./base/ControllerBase');

module.exports = class ExtendsTest extends ControllerBase {
  before(request, response) {
    super.before(request, response);
    console.log('Request start');
  }

  getAction() {
    return 'hello world';
  }

  after() {
    console.log('Request end');
    super.after({});
  }
};
