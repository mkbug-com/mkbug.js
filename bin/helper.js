const express = require("express");
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const BaseController = require('./base.controller');
const BaseLogic = require('./base.logic');
const BaseModel = require('./base.model');

let baseDir = '';

function doParse (modules) {
  const {
    Controller = 'controller',
    Logic = 'logic',
    Model = 'model'
  } = modules;

  const router = express.Router();

  console.info(chalk.yellow('==========Mkbug model inject start==========='));
  const models = parseModel(path.resolve(baseDir, Model));
  console.info(chalk.yellow('==========Mkbug model inject end=============\n'));
  console.info(chalk.yellow('==========Mkbug logic inject start==========='));
  const logics = parseLogic(path.resolve(baseDir, Logic), '', { models });
  console.info(chalk.yellow('==========Mkbug logic inject end=============\n'));
  console.info(chalk.yellow('==========Mkbug controller mapping start=========='));
  parseController(router, path.resolve(baseDir, Controller), { logics });
  console.info(chalk.yellow('==========Mkbug controller mapping end============'));

  return router;
}

function parseController (router, dir, { pre = '/', logics = {} }) {
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
          const control = new Controller(logics);
          if (control instanceof BaseController) {
            router.attch(subPath, control, needParams);
          } else {
            console.warn(chalk.magenta('Mkbug.js[WARN]:'),
              chalk.bgMagenta(`Controller ${file} must extends from BaseController and will be ignored!`));
          }
        } else {
          console.warn(chalk.magenta('Mkbug.js[WARN]:'), chalk.bgMagenta(`${file} will be ignored!`));
        }
      } else if (stat.isDirectory()) {
        subPath += `${file}/`
        parseController(router, path.resolve(dir, file), { pre: subPath, logics });
      }
    });
  } catch (e) {
    console.error(chalk.red('Mkbug.js[ERROR]:', e));
  }
}

function parseLogic (dir, parent = '', { models = {} }) {
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
          const logic = new Logic(models);
          if (logic instanceof BaseLogic) {
            console.info(chalk.yellow('Mkbug.js[INFO]:'), 
              `Inject Logic ${parent !== '' ? parent + '.' : parent}${logic.__$$getName()}`);
            if (logics[logic.__$$getName()]) {
              logics[logic.__$$getName()].__proto__ = logic;
            } else {
              logics[logic.__$$getName()] = logic;
            }
          } else {
            console.warn(chalk.magenta('Mkbug.js[WARN]:'),
              chalk.bgMagenta(`Logic ${file} must extends from BaseLogic and will be ignored!`));
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
          `${parent !== '' ? (parent + '.' + file) : file}`, { models }) || {};
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
              `Inject model ${parent !== '' ? parent + '.' : parent}${model.__$$getName()}`);
            if (models[model.__$$getName()]) {
              models[model.__$$getName()].__proto__ = model;
            } else {
              models[model.__$$getName()] = model;
            }
          } else {
            console.warn(chalk.magenta('Mkbug.js[WARN]:'),
              chalk.bgMagenta(`Model ${file} must extends from BaseModel and will be ignored!`));
          }
        } else {
          console.warn(chalk.magenta('Mkbug.js[WARN]:'), chalk.bgMagenta(`${file} will be ignored!`));
        }
      } else if (stat.isDirectory()) {
        if (models[file]) {
          console.warn(chalk.magenta('Mkbug.js[WARN]:'),
              chalk.bgMagenta(`Model ${file} is existed, the same properties will be overrode!`));
        }
        const subModel = parseModel(path.resolve(dir, file), `${parent !== '' ? (parent + '.' + file) : file}`) || {};
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

exports.createModule = function (path) {
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

    router.use(doParse(modules));
  } catch (e) {
    console.error(chalk.red('Mkbug.js[ERROR]:', e));
  }

  return router;
}