var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('combined'))

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('app is running at http://%s:%s', host, port);
})
