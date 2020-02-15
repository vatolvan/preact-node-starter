import express = require('express')
import cors = require('cors')

const app: express.Application = express();

app.use(cors())

app.get('/', function (req, res) {
  res.send({ response: 'Hello World from Node server!' });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});