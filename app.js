var express = require('express');
var app = express();

// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req,res) {
    res.end('hello world');    
});

// create task
app.get('/create', function(req,res) {    
    res.end('create');    
});

// update task
app.get('/update', function(req,res) {    
    res.end('update');    
});

// get task list
app.get('/tasklist', function(req,res) {    
    res.end('tasklist');    
});

app.listen(8080);