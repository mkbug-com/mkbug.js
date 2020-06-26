const path = require('path');
const chalk = require('chalk');

const { createModule } = require('./helper');
const BaseConfig = require('./base.config');

module.exports = class Mkbug {
  constructor (app, opts = {}) {
    console.info(chalk.green('Mkbug.js[INFO]:'), chalk.yellow(`Welcome to Mkbug.js (NODE_ENV = ${process.env.NODE_ENV || ''})\n`));

    this.app = app;
    this.basePath = path.resolve(process.cwd(), opts.path) || path.resolve(process.cwd(), 'src');
    BaseConfig.prototype.baseUrl = this.basePath;
    this.prefix = '';
  }

  create (prefix = '') {
    this.prefix = prefix;
    return this;
  }

  use (middleWare) {
    this.app.use(middleWare);
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
        console.error(chalk.bgRed(`Mkbug.js[ERROR]: Start with [PORT=${port}]\n`), err);
      } else {
        console.info(chalk.bgGreen(`Mkbug.js[INFO]: Start with [PORT=${port}]\n`));
      }
    });
    return this.app;
  }
}