const express = require('express');

const { createModule } = require('./bin/helper');
const BaseController = require('base.controller');

exports.router = function (opts = {}) {
  const basePath = opts.path || path.resolve(process.cwd(), 'controller');
  const router = createModule(basePath);

  return router;
}

exports.BaseController = BaseController;