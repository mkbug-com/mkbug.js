const express = require('express');

const app = express();

const {router} = require('../index')

app.use('/demo', router({
  path: './src'
}))

app.use((req, res) => {
  console.log(404)
  res.end()
})

app.listen(3000, (err) => {
  console.log(err)
});
