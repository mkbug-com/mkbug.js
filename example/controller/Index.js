const { BaseController } = require('../../index');

module.exports = class Index extends BaseController {
  getTestAction () {
    return 'getTestAction';
  }

  headTestAction () {
    return 'headTestAction';
  }

  postTestAction () {
    return 'postTestAction';
  }

  putTestAction () {
    return 'putTestAction';
  }

  deleteTestAction () {
    return 'deleteTestAction';
  }

  connectTestAction () {
    return 'connectTestAction';
  }

  optionsTestAction () {
    return 'optionsTestAction';
  }

  patchTestAction () {
    return 'patchTestAction';
  }

  traceTestAction () {
    return 'traceTestAction';
  }
}