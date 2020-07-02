const express = require("express");
const path = require('path');
const fs = require('fs');

const BaseController = require('./base.controller');
const BaseLogic = require('./base.logic');
const BaseModel = require('./base.model');
const BasePlugin = require('./base.plugin');
const BaseUtil = require('./base.util');
const {
  createContext,
  INFO,
  WARN,
  ERROR
} = require('./utils');

let baseDir = '';

function doParse(modules, prefix) {
  const {
    Controller = 'controller',
    Logic = 'logic',
    Model = 'model'
  } = modules;

  const router = express.Router();

  INFO('==========Mkbug utils inject start===========');
  const utils = parseUtil(path.resolve(baseDir, 'util'));
  INFO('==========Mkbug utils inject end=============\n');

  INFO('==========Mkbug plugins inject start===========');
  BasePlugin.prototype.Utils = utils
  const plugins = parsePlugin(path.resolve(baseDir, 'plugin'));
  const createplugin = (plugin) => {
    return (res, req, next) => {
      const ctx = createContext(plugin, res, req);
      plugin.run.call(ctx, res, req, next);
    }
  }
  plugins.forEach((plugin) => {
    router.use(createplugin(plugin))
  })
  INFO('==========Mkbug plugins inject end=============\n');

  INFO('==========Mkbug model inject start===========');
  BaseModel.prototype.Utils = utils
  const models = parseModel(path.resolve(baseDir, Model), '');
  INFO('==========Mkbug model inject end=============\n');

  INFO('==========Mkbug logic inject start===========');
  BaseLogic.prototype.Models = models
  BaseLogic.prototype.Utils = utils
  const logics = parseLogic(path.resolve(baseDir, Logic), '');
  INFO('==========Mkbug logic inject end=============\n');

  INFO('==========Mkbug controller mapping start==========');
  BaseController.prototype.Logics = logics
  BaseController.prototype.Utils = utils
  parseController(router, path.resolve(baseDir, Controller), { prefix });
  INFO('==========Mkbug controller mapping end============\n');

  return router;
}

function parseController(router, dir, { pre = '/', prefix }) {
  if (!fs.existsSync(dir)) {
    return;
  }

  const files = fs.readdirSync(dir);
  files.forEach(function createController(file) {
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

        const className = control.__$$getName();
        const fileName = file.replace('.js', '');
        if (!needParams && className !== fileName) {
          ERROR(`The name of file ${file} must be the same as Class name ${className}!`);
          throw new Error('The name of file must be the same as Class name!');
        }

        if (control instanceof BaseController) {
          router.attch(subPath, control, needParams, prefix);
        } else {
          WARN(`Controller ${file} must extends from BaseController or will be ignored!`);
        }
      } else {
        WARN(`${file} will be ignored!`);
      }
    } else if (stat.isDirectory()) {
      if (!file.startsWith('_')) {
        subPath += `${file}/`
      }
      parseController(router, path.resolve(dir, file), { pre: subPath, prefix });
    }
  });
}

function parseLogic(dir, parent = '') {
  let logics = {};

  if (!fs.existsSync(dir)) {
    return logics;
  }

  const files = fs.readdirSync(dir);
  files.forEach(function createLogic(file) {
    const stat = fs.lstatSync(`${dir}/${file}`);
    if (stat.isFile()) {
      const Logic = require(`${dir}/${file}`);
      if (typeof Logic === 'function' && Logic.constructor) {
        const logic = new Logic();

        const className = logic.__$$getName();
        const fileName = file.replace('.js', '');
        if (className !== fileName) {
          ERROR(`The name of file ${file} must be the same as Class name ${className}!`);
          throw new Error('The name of file must be the same as Class name!');
        }

        if (logic instanceof BaseLogic) {
          INFO(`Inject Logic = ${parent !== '' ? parent + '.' : parent}${className}`);
          if (logics[className]) {
            logics[className].__proto__ = logic;
          } else {
            logics[className] = logic;
          }
        } else {
          WARN(`Logic ${file} must extends from BaseLogic or will be ignored!`);
        }
      } else {
        WARN(`${file} will be ignored!`);
      }
    } else if (stat.isDirectory()) {
      if (logics[file]) {
        WARN(`Logic ${file} is existed, the same properties will be overrode!`);
      }
      const subLogics = parseLogic(path.resolve(dir, file),
        `${parent !== '' ? (parent + '.' + file) : file}`) || {};
      if (!logics[file]) {
        logics[file] = {}
      }
      Object.keys(subLogics).forEach(function injectSubLogic(sub) {
        if (logics[file][sub]) {
          WARN(`Logic ${file}.${sub} is be overrode!`);
        }
        logics[file][sub] = subLogics[sub];
      })
    }
  });

  return logics;
}

function parseModel(dir, parent = '') {
  let models = {};

  if (!fs.existsSync(dir)) {
    return models;
  }

  const files = fs.readdirSync(dir);
  files.forEach(function createModel(file) {
    const stat = fs.lstatSync(`${dir}/${file}`);
    if (stat.isFile()) {
      const Model = require(`${dir}/${file}`);
      if (typeof Model === 'function' && Model.constructor) {
        const model = new Model();

        const className = model.__$$getName();
        const fileName = file.replace('.js', '');
        if (className !== fileName) {
          ERROR(`The name of file ${file} must be the same as Class name ${className}!`);
          throw new Error('The name of file must be the same as Class name!');
        }

        if (model instanceof BaseModel) {
          INFO(`Inject model = ${parent !== '' ? parent + '.' : parent}${className}`);
          if (models[className]) {
            models[className].__proto__ = model;
          } else {
            models[className] = model;
          }
        } else {
          WARN(`Model ${file} must extends from BaseModel or will be ignored!`);
        }
      } else {
        WARN(`${file} will be ignored!`);
      }
    } else if (stat.isDirectory()) {
      if (models[file]) {
        WARN(`Model ${file} is existed, the same properties will be overrode!`);
      }
      const subModel = parseModel(path.resolve(dir, file),
        `${parent !== '' ? (parent + '.' + file) : file}`) || {};
      if (!models[file]) {
        models[file] = {}
      }
      Object.keys(subModel).forEach(function injectSubModel(sub) {
        models[file][sub] = subModel[sub];
      })
    }
  });

  return models;
}

function parsePlugin(dir, parent = '') {
  let plugins = [];

  if (!fs.existsSync(dir)) {
    return plugins;
  }

  const files = fs.readdirSync(dir);
  files.forEach(function createUtil(file) {
    const stat = fs.lstatSync(`${dir}/${file}`);
    if (stat.isFile()) {
      const Plugin = require(`${dir}/${file}`);
      if (typeof Plugin === 'function' && Plugin.constructor) {        
        const plugin = new Plugin();

        const className = plugin.__$$getName();
        const fileName = file.replace('.js', '');
        if (className !== fileName) {
          ERROR(`The name of file ${file} must be the same as Class name ${className}!`);
          throw new Error('The name of file must be the same as Class name!');
        }

        if (plugin instanceof BasePlugin) {
          INFO(`Inject plugin = ${parent !== '' ? parent + '.' : parent}${plugin.__$$getName()}`);
          plugins.push(plugin);
        } else {
          WARN(`Plugin ${file} must extends from BaseUtil or BasePlugin and will be ignored!`);
        }
      } else {
        WARN(`${file} will be ignored!`);
      }
    } else if (stat.isDirectory()) {
      const subObj = parsePlugin(path.resolve(dir, file), `${parent !== '' ? (parent + '.' + file) : file}`) || {};
      plugins.push(...subObj);
    }
  });

  return plugins;
}

function parseUtil(dir, parent = '') {
  let utils = {};

  if (!fs.existsSync(dir)) {
    return utils
  }

  const files = fs.readdirSync(dir);
  files.forEach(function createUtil(file) {
    const stat = fs.lstatSync(`${dir}/${file}`);
    if (stat.isFile()) {
      const Util = require(`${dir}/${file}`);
      if (typeof Util === 'function' && Util.constructor) {        
        const util = new Util();

        const className = util.__$$getName();
        const fileName = file.replace('.js', '');
        if (className !== fileName) {
          ERROR(`The name of file ${file} must be the same as Class name ${className}!`);
          throw new Error('The name of file must be the same as Class name!');
        }

        if (util instanceof BaseUtil) {
          INFO(`Inject util = ${parent !== '' ? parent + '.' : parent}${util.__$$getName()}`);
          if (utils[util.__$$getName()]) {
            utils[util.__$$getName()].__proto__ = util;
          } else {
            utils[util.__$$getName()] = util;
          }
        } else {
          WARN(`Util ${file} must extends from BaseUtil or BaseUtil and will be ignored!`);
        }
      } else {
        WARN(`${file} will be ignored!`);
      }
    } else if (stat.isDirectory()) {
      if (utils[file]) {
        WARN(`Util ${file} is existed, the same properties will be overrode!`);
      }
      const subObj = parseUtil(path.resolve(dir, file), `${parent !== '' ? (parent + '.' + file) : file}`) || {};
      if (!utils[file]) {
        utils[file] = {};
      }
      Object.keys(subObj).forEach(function injectSubUtil(sub) {
        utils[file][sub] = subObj[sub];
      })
    }
  });

  return utils;
}

exports.createModule = function (path, prefix) {
  baseDir = path;
  const router = express.Router();

  try {
    const files = fs.readdirSync(path);
    const modules = {};

    files.forEach(function modulesParse(dir) {
      const stat = fs.lstatSync(`${path}/${dir}`);
      if (stat.isDirectory()) {
        const firstC = dir.substring(0, 1).toUpperCase();
        const secondC = dir.substring(1).toLowerCase();
        modules[`${firstC}${secondC}`] = dir;
      }
    });

    router.use(doParse(modules, prefix));
  } catch (e) {
    throw e;
  }

  return router;
}