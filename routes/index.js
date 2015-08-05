var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');
var path = require('path');

router.use('/', function (req, res, next) {
  console.log('PATH:',path.join(__dirname, '../public/' + req.path));
  res.sendFile(path.join(__dirname, '../public/' + req.path), function(err) {
    if(err) {
      console.log('err');
      next();
    }
  })
})

router.get('/user/:name/tweets/:id', function(req,res) {
  var name = req.params.name;
  var postStatus = '';
  var id = parseInt(req.params.id);
  var list = tweetBank.find({name: name, id: id});
  if(!list.length){
    postStatus = 'Could not find that post';
  }
  res.render('index', {title: 'Twitter.js Post by ' + name, tweets: list, notification: postStatus})
})

router.get('/user/:name', function(req, res) {
  name = req.params.name;
  var list = tweetBank.find({name: name})
  res.render('index', {title: 'Twitter.js - Posts by ' + name, tweets: list})
})

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render('index', {title: 'Twitter.js', tweets: tweets})
})

module.exports = router;
