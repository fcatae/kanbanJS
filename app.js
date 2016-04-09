var express = require('express');
var app = express();

// Kanban API
var _globalTaskId=0;

function ID() {
    return _globalTaskId++;
}

var _tasks = [ 
    { id: ID(), name: 'online task 1', status: 0 },
    { id: ID(), name: 'online task 2', status: 0 },
    { id: ID(), name: 'online task 3', status: 0 },
    { id: ID(), name: 'old online task A', status: 1 },
    { id: ID(), name: 'old online task B', status: 1 },
    { id: ID(), name: 'old online task C', status: 1 },    
    ];

// Express

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
    res.end(JSON.stringify(_tasks));    
});

app.listen(8080);
