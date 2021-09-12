const { BaseController, MkbugError } = require('../../index');

module.exports = class ErrorTest extends BaseController {
  before(req) {
    if (req.query.type === 'StringError') {
      throw new MkbugError(400, 'Error Message');
    } else if (req.query.type === 'JsonError') {
      throw new MkbugError(400, { msg: 'Error Message' });
    }
  }

  getAction() {
    throw new MkbugError();
  }

  getCaseAction() {
    return new MkbugError();
  }
};
