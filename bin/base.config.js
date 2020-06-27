const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const { ERROR } = require('./utils');

class BaseConfig {
  constructor (name = 'config', path = '', opts = { 
    encoding: 'utf8'
  }) {
    this.name = name;
    this.mode = process.env.NODE_ENV || '';
    this.values = {};
    if (path) {
      this.baseUrl = path;
    }

    return this.__$$parseConfig(opts);
  }
}

BaseConfig.prototype.__$$parseConfig = function (opts) {
  const base = path.resolve(this.baseUrl || 'src', 'config');
  
  try {
    const baseConfig = `${base}/${this.name}.conf`;
    const config = `${base}/${this.name}.${this.mode}.conf`;

    if (fs.existsSync(baseConfig)) {
      this.__$$parseFile(fs.readFileSync(baseConfig, opts));
    }
    if (fs.existsSync(config)) {
      this.__$$parseFile(fs.readFileSync(config, opts));
    }
  } catch (e) {
    ERROR(e);
  }

  return this.values;
}

BaseConfig.prototype.__$$parseFile = function (str = '') {
  let tmpStr = str.replace('\r\n', '\n');
  const lineArr = tmpStr.split('\n');
  const _this = this;
  function transFunc (line) {
    const keyValue = line.split('=');
    if (keyValue[1] && keyValue[1] !== '') {
      _this.values[keyValue[0]] = keyValue[1];
    }
  }
  lineArr.forEach(transFunc);
}

module.exports = BaseConfig