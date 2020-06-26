const express = require('express');

const { Mkbug } = require('./../index');

new Mkbug(express(), {
  path: './example'
})
.create('/api')
.use((req, res) => {
  res.status(404).end('Server has exception!')
})
.use((err, req, res) => {
  if (err) {
    res.status(500).end('Server has exception!')
  }
})
.start(3000);
