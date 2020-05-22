const express = require("express");
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const BaseController = require('./base.controller');
const BaseLogic = require('./base.logic');
const BaseModel = require('./base.model');
const { BaseUtil } = require('./base.plugin');

let baseDir = '';

function doParse (modules, prefix) {
  const {
    Controller = 'controller',
    Logic = 'logic',
    Model = 'model'
  } = modules;

  const router = express.Router();

  console.info(chalk.yellow('==========Mkbug utils inject start==========='));
  const utils = parseUtil(path.resolve(baseDir, 'plugin'));
  console.info(chalk.yellow('==========Mkbug utils inject end=============\n'));

  console.info(chalk.yellow('==========Mkbug model inject start==========='));
  BaseModel.prototype.Utils = utils
  const models = parseModel(path.resolve(baseDir, Model), '');
  console.info(chalk.yellow('==========Mkbug model inject end=============\n'));

  console.info(chalk.yellow('==========Mkbug logic inject start==========='));
  BaseLogic.prototype.Models = models
  BaseLogic.prototype.Utils = utils
  const logics = parseLogic(path.resolve(baseDir, Logic), '');
  console.info(chalk.yellow('==========Mkbug logic inject end=============\n'));
  
  console.info(chalk.yellow('==========Mkbug controller mapping start=========='));
  BaseController.prototype.Logics = logics
  BaseController.prototype.Utils = utils
  parseController(router, path.resolve(baseDir, Controller), { prefix });
  console.info(chalk.yellow('==========Mkbug controller mapping end============'));

  return router;
}

function parseController (router, dir, { pre = '/', prefix }) {
  try {
    if (!fs.existsSync(dir)) {
      return;
    }

    const files = fs.readdirSync(dir);
    files.forEach(function createController (file) {
      const stat = fs.lstatSync(`${dir}/${file}`);
      let subPath = `${pre}`;
      let needParams = false;

      if (file.startsWith('_')) {
        subPath += `${file}/`;
        subPath = subPath.replace('_', ':');
        needParams = true;
      }
      
      if (stat.isFile()) {
        subPath = subPath.replace('.js', '');
        const Controller = require(`${dir}/${file}`);
        if (typeof Controller === 'function' && Controller.constructor) {
          const control = new Controller();
          if (control instanceof BaseController) {
            router.attch(subPath, control, needParams, prefix);
          } else {
            console.warn(chalk.magenta('Mkbug.js[WARN]:'),
              chalk.bgMagenta(`Controller ${file} must extends from BaseController or will be ignored!`));
          }
        } else {
          console.warn(chalk.magenta('Mkbug.js[WARN]:'), chalk.bgMagenta(`${file} will be ignored!`));
        }
      } else if (stat.isDirectory()) {
        subPath += `${file}/`
        parseController(router, path.resolve(dir, file), { pre: subPath, prefix });
      }
    });
  } catch (e) {
    console.error(chalk.red('Mkbug.js[ERROR]:', e));
  }
}

function parseLogic (dir, parent = '') {
  let logics = {};

  try {
    if (!fs.existsSync(dir)) {
      return logics;
    }

    const files = fs.readdirSync(dir);
    files.forEach(function createLogic (file) {
      const stat = fs.lstatSync(`${dir}/${file}`);
      if (stat.isFile()) {
        const Logic = require(`${dir}/${file}`);
        if (typeof Logic === 'function' && Logic.constructor) {
          const logic = new Logic();
          if (logic instanceof BaseLogic) {
            console.info(chalk.yellow('Mkbug.js[INFO]:'), 
              `Inject Logic = ${parent !== '' ? parent + '.' : parent}${logic.__$$getName()}`);
            if (logics[logic.__$$getName()]) {
              logics[logic.__$$getName()].__proto__ = logic;
            } else {
              logics[logic.__$$getName()] = logic;
            }
          } else {
            console.warn(chalk.magenta('Mkbug.js[WARN]:'),
              chalk.bgMagenta(`Logic ${file} must extends from BaseLogic or will be ignored!`));
          }
        } else {
          console.warn(chalk.magenta('Mkbug.js[WARN]:'), chalk.bgMagenta(`${file} will be ignored!`));
        }
      } else if (stat.isDirectory()) {
        if (logics[file]) {
          console.warn(chalk.magenta('Mkbug.js[WARN]:'),
              chalk.bgMagenta(`Logic ${file} is existed, the same properties will be overrode!`));
        }
        const subLogics = parseLogic(path.resolve(dir, file), 
          `${parent !== '' ? (parent + '.' + file) : file}`) || {};
        if (!logics[file]) {
          logics[file] = {}
        }
        Object.keys(subLogics).forEach(function injectSubLogic (sub) {
          logics[file][sub] = subLogics[sub];
        })
      }
    });
  } catch (e) {
    console.error(chalk.red('Mkbug.js[ERROR]:', e));
  }

  return logics;
}

function parseModel (dir, parent = '') {
  let models = {};

  try {
    if (!fs.existsSync(dir)) {
      return models;
    }

    const files = fs.readdirSync(dir);
    files.forEach(function createModel (file) {
      const stat = fs.lstatSync(`${dir}/${file}`);
      if (stat.isFile()) {
        const Model = require(`${dir}/${file}`);
        if (typeof Model === 'function' && Model.constructor) {
          const model = new Model();
          if (model instanceof BaseModel) {
            console.info(chalk.yellow('Mkbug.js[INFO]:'), 
              `Inject model = ${parent !== '' ? parent + '.' : parent}${model.__$$getName()}`);
            if (models[model.__$$getName()]) {
              models[model.__$$getName()].__proto__ = model;
            } else {
              models[model.__$$getName()] = model;
            }
          } else {
            console.warn(chalk.magenta('Mkbug.js[WARN]:'),
              chalk.bgMagenta(`Model ${file} must extends from BaseModel or will be ignored!`));
          }
        } else {
          console.warn(chalk.magenta('Mkbug.js[WARN]:'), chalk.bgMagenta(`${file} will be ignored!`));
        }
      } else if (stat.isDirectory()) {
        if (models[file]) {
          console.warn(chalk.magenta('Mkbug.js[WARN]:'),
              chalk.bgMagenta(`Model ${file} is existed, the same properties will be overrode!`));
        }
        const subModel = parseModel(path.resolve(dir, file),
          `${parent !== '' ? (parent + '.' + file) : file}`) || {};
        if (!models[file]) {
          models[file] = {}
        }
        Object.keys(subModel).forEach(function injectSubModel (sub) {
          models[file][sub] = subModel[sub];
        })
      }
    });
  } catch (e) {
    console.error(chalk.red('Mkbug.js[ERROR]:', e));
  }

  return models;
}

function parseUtil (dir, parent = '') {
  let utils = {};

  try {
    if (!fs.existsSync(dir)) {
      return utils;
    }

    const files = fs.readdirSync(dir);
    files.forEach(function createUtil (file) {
      const stat = fs.lstatSync(`${dir}/${file}`);
      if (stat.isFile()) {
        const Util = require(`${dir}/${file}`);
        if (typeof Util === 'function' && Util.constructor) {
          const util = new Util();
          if (util instanceof BaseUtil) {
            console.info(chalk.yellow('Mkbug.js[INFO]:'), 
              `Inject util = ${parent !== '' ? parent + '.' : parent}${util.__$$getName()}`);
            if (utils[util.__$$getName()]) {
              utils[util.__$$getName()].__proto__ = util;
            } else {
              utils[util.__$$getName()] = util;
            }
          } else {
            console.warn(chalk.magenta('Mkbug.js[WARN]:'),
              chalk.bgMagenta(`Util ${file} must extends from BaseUtil or will be ignored!`));
          }
        } else {
          console.warn(chalk.magenta('Mkbug.js[WARN]:'), chalk.bgMagenta(`${file} will be ignored!`));
        }
      } else if (stat.isDirectory()) {
        if (utils[file]) {
          console.warn(chalk.magenta('Mkbug.js[WARN]:'),
              chalk.bgMagenta(`Util ${file} is existed, the same properties will be overrode!`));
        }
        const subUtil = parseUtil(path.resolve(dir, file), `${parent !== '' ? (parent + '.' + file) : file}`) || {};
        if (!utils[file]) {
          utils[file] = {}
        }
        Object.keys(subUtil).forEach(function injectSubUtil (sub) {
          utils[file][sub] = subUtil[sub];
        })
      }
    });
  } catch (e) {
    console.error(chalk.red('Mkbug.js[ERROR]:', e));
  }

  return utils;
}

exports.createModule = function (path, prefix) {
  baseDir = path;
  const router = express.Router();

  try {
    const files = fs.readdirSync(path);
    const modules = {};

    files.forEach(function modulesParse (dir) {
      const stat = fs.lstatSync(`${path}/${dir}`);
      if (stat.isDirectory()) {
        const firstC = dir.substring(0, 1).toUpperCase();
        const secondC = dir.substring(1).toLowerCase();
        modules[`${firstC}${secondC}`] = dir;
      }
    });

    router.use(doParse(modules, prefix));
  } catch (e) {
    console.error(chalk.red('Mkbug.js[ERROR]:', e));
  }

  return router;
}