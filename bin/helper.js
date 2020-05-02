const express = require("express");
const path = require('path');
const fs = require('fs');

let baseDir = '';

function doParse (modules) {
  const {
    Controller = '',
    ...others
  } = modules;

  const router = express.Router();

  parseController(router, path.resolve(baseDir, Controller));

  return router;
}

function parseController (router, dir, pre = '/') {
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
          router.attch(subPath, new Controller(), needParams);
        }
      } else if (stat.isDirectory()) {
        parseController(router, path.resolve(dir, file), subPath);
      }
    });
  } catch (e) {
    console.error('Mkbug.js[ERROR]:', e);
  }
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
    console.error('Mkbug.js[ERROR]:',e)
  }

  return router;
}