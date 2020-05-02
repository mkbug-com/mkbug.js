const express = require("express");
const path = require('path');
const fs = require('fs');

let baseDir = '';

function doParse (modules) {
  const {
    Controller = '',
    ...others
  } = modules;

  const routers = parseController(Controller);

  return routers;
}

function parseController (path) {

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

    router.attch(doParse(modules));
  } catch (e) {
    console.error('Mkbug.js[ERROR]:',e)
  }

  return router;
}