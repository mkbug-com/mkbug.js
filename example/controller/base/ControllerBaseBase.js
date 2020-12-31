const { BaseController } = require('../../../index');

module.exports = class ControllerBaseBase extends BaseController {
  before (req) {
    console.log("ControllerBaseBase before")
  }

  after(){
    console.log("ControllerBaseBase after")
  }
}