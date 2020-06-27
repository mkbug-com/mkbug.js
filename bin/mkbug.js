const path = require('path');
const chalk = require('chalk');

const { createModule } = require('./helper');
const { LOG, INFO, WARN, ERROR } = require('./utils');
const BaseConfig = require('./base.config');

module.exports = class Mkbug {
  constructor (app, opts = {}) {
    LOG(`Welcome to Mkbug.js (NODE_ENV = ${process.env.NODE_ENV || ''})\n`);

    this.app = app;
    this.basePath = path.resolve(process.cwd(), opts.path) || path.resolve(process.cwd(), 'src');
    BaseConfig.prototype.baseUrl = this.basePath;
    this.prefix = '';
  }

  create (prefix = '') {
    this.prefix = prefix;
    return this;
  }

  use (plugin) {
    this.app.use(plugin);
    return this;
  }

  start (port, cb) {
    let prePath = this.prefix;
    if (this.prefix === '/') {
      prePath = ''
    }
    this.app.use(prePath, createModule(this.basePath, prePath));
    this.app.listen(port, cb || function callback (err) {
      if (err) {
        ERROR(`Failed with [PORT=${port}]`, err);
      } else {
        INFO(`Start with [PORT=${port}]`);
      }
    });
    return this.app;
  }
}