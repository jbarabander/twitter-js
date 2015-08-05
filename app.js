var express = require('express');
var morgan = require('morgan');
var swig = require('swig');

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({cache: false});

var templateObj = {
  title: "Hall of Fame",
  people: [
    {name: "Full"},
    {name: "Stacker"},
    {name: "Son"}
  ]
};

// swig.renderFile(__dirname + "/views/index.html", templateObj, function(err, out) {
//   if(err) throw err;
//   console.log(out);
// })

app.use(morgan('combined'))
app.use('/index', function(req, res, next){
  res.render('index', templateObj, function(err, html) {
    if(err) throw err;
    res.send(html);
  });
});



var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('app is running at http://%s:%s', host, port);
})
