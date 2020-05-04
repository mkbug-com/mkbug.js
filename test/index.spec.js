const express = require('express');

const app = express();

const { mkbug } = require('../index')

app.use('/demo', mkbug({
  path: './src'
}))

app.use((req, res) => {
  console.log(404)
  res.end()
})

app.listen(3000, (err) => {
  console.log('Server start')
});
