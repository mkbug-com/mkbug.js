const express = require('express');
const cookieParser = require('cookie-parser');

const { Mkbug } = require('./../index');

new Mkbug(express(), {
  path: './example'
})
  .use('/error', (req, res, next) => {
    next('test error');
  })
  .use('/heath', (req, res) => {
    res.status(200).end();
  })
  .use(cookieParser())
  .use('/cookie', (req, res) => {
    res.cookie('cookie_test', 'mkbug-cookie');
    res.end();
  })
  .use('/close', (req, res) => {
    res.status(200).end('server down!\n');
    process.exit(0);
  })
  .create('/api')
  .start(3000);
