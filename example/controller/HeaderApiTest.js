const { BaseController } = require('../../index');

module.exports = class HeaderApiTest extends BaseController {
  getAction () {
    return this.get('from-header');
  }

  getHeaderAction () {
    this.set('from-header', 'from-header')
    return ''
  }
}