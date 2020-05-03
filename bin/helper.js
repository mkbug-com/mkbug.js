const express = require("express");
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const BaseController = require('./base.controller');
const BaseLogic = require('./base.logic');

let baseDir = '';

function doParse (modules) {
  const {
    Controller = '',
    Logic = '',
    ...others
  } = modules;

  const router = express.Router();

  console.info(chalk.bgYellow('==========Mkbug logic mapping start=========='));
  const logics = parseLogic(path.resolve(baseDir, Logic));
  console.info(chalk.bgYellow('==========Mkbug logic mapping end============'));

  console.info(chalk.bgYellow('==========Mkbug router mapping start=========='));
  parseController(router, path.resolve(baseDir, Controller), { logics });
  console.info(chalk.bgYellow('==========Mkbug router mapping end============'));

  return router;
}

function parseController (router, dir, { pre = '/', logics = {} }) {
  try {
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
        }
      } else if (stat.isDirectory()) {
        parseController(router, path.resolve(dir, file), subPath);
      }
    });
  } catch (e) {
    console.error(chalk.red('Mkbug.js[ERROR]:', e));
  }
}

function parseLogic (dir, parent = '') {
  let logics = {};

  try {
    const files = fs.readdirSync(dir);
    files.forEach(function createLogic (file) {
      const stat = fs.lstatSync(`${dir}/${file}`);
      if (stat.isFile()) {
        const Logic = require(`${dir}/${file}`);
        if (typeof Logic === 'function' && Logic.constructor) {
          const logic = new Logic();
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
        }
      } else if (stat.isDirectory()) {
        if (logics[file]) {
          console.warn(chalk.magenta('Mkbug.js[WARN]:'),
              chalk.bgMagenta(`Logic ${file} is existed, the same properties will be overrode!`));
        }
        const subLogics = parseLogic(path.resolve(dir, file), `${parent !== '' ? (parent + '.' + file) : file}`) || {};
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