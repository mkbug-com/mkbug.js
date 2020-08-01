const express = require("express");
const path = require('path');
const fs = require('fs');

const BaseController = require('./base.controller');
const BasePlugin = require('./base.plugin');

const {
  createContext,
  INFO,
  WARN,
  ERROR
} = require('./utils');

let baseDir = '';

function doParse(modules, prefix) {
  const {
    Controller = 'controller'
  } = modules;

  const router = express.Router();

  INFO('==========Mkbug plugins inject start===========');
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

  INFO('==========Mkbug controller mapping start==========');
  parseController(router, path.resolve(baseDir, Controller), { prefix });
  INFO('==========Mkbug controller mapping end============\n');

  // freeze Prototype start
  Object.freeze(BasePlugin.prototype);
  Object.freeze(BaseController.prototype);
  // end
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

function parsePlugin(dir, parent = '') {
  let plugins = [];

  if (!fs.existsSync(dir)) {
    return plugins;
  }

  const files = fs.readdirSync(dir);
  files.forEach(function createPlugin(file) {
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
          WARN(`Plugin ${file} must extends from BasePlugin and will be ignored!`);
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