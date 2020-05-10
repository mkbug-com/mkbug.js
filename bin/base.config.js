const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

module.exports = class BaseConfig {
  constructor (name = 'config', opts = { encoding: 'utf8' }) {
    this.name = name;
    this.mode = process.env.NODE_ENV;
    this.values = {};

    return this.__$$parseConfig(opts);
  }

  __$$parseConfig (opts) {
    const base = path.resolve(this.baseUrl || 'src', 'config');
    try {
      const baseConfig = `${this.name}.conf`;
      const config = `${this.name}.${this.mode}.conf`;

      this.__$$parseFile(fs.readFileSync(`${base}/${baseConfig}`, opts));
      this.__$$parseFile(fs.readFileSync(`${base}/${config}`, opts));
    } catch (e) {
      console.error(chalk.red('Mkbug.js[ERROR]:', e));
    }

    return this.values;
  }

  __$$parseFile (str = '') {
    let tmpStr = str.replace('\r\n', '\n');
    const lineArr = tmpStr.split('\n');
    const _this = this;
    lineArr.forEach(function transFunc (line) {
      const keyValue = line.split('=');
      if (keyValue[1] && keyValue[1] !== '') {
        _this.values[keyValue[0]] = keyValue[1];
      }
    });
  }
}