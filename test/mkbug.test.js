require('./init')
const Mkbug = require('./../bin/mkbug');
const request = require('supertest');
const express = require('express');

test('Mkbug ', (done) => {
  request(new Mkbug(express()).start(2000))
  .get('/')
  .then((res) => {
    expect(res.statusCode).toBe(404);
    done();
  })
})