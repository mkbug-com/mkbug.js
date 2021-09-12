const ControllerBaseBase = require('./ControllerBaseBase');

module.exports = class ControllerBase extends ControllerBaseBase {
  before(request, response) {
    super.before(request, response);
    console.log('ControllerBase before');
  }

  after({ duration, status, originalUrl, request, response }) {
    console.log('ControllerBase after');
    super.after({ duration, status, originalUrl, request, response });
  }
};
