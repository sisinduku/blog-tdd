const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
require('dotenv').config();

const userRoute = require('./routes/userRoute');

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
app.use(bodyParser.json())

app.use('/api/user', userRoute);

var server = http.createServer(app);
server.listen(process.env.PORT || 3000, function() {
  console.log('Hello from port: 3000');
});

module.exports = server;
