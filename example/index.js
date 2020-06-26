const express = require('express');

const app = express();

const { Mkbug } = require('../index')

new Mkbug(app).create('/demo').start(3000)