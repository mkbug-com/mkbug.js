const express = require('express');

const app = express();

const {router} = require('../index')

app.use('/demo', router({
  path: './src'
}))

app.listen(3000, (err) => {
  console.log(err)
});
