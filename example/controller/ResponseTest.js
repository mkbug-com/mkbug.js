const fs = require('fs');
const path = require('path');
const { BaseController } = require('../../index');

module.exports = class ResponseTest extends BaseController {
  getStringAction() {
    return 'ok';
  }

  getNumberAction() {
    return 10086;
  }

  getJSONAction() {
    return { msg: 'ok' };
  }

  getBufferAction() {
    return fs.readFileSync(path.resolve(process.cwd(), 'example', 'data', 'test'));
  }

  getStreamAction() {
    return fs.createReadStream(path.resolve(process.cwd(), 'example', 'data', 'test'));
  }
};
