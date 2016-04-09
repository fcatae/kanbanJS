var express = require('express');
var app = express();

// Kanban API
var _globalTaskId=0;

function ID() {
    return _globalTaskId++;
}

var _initialTasks = [ 
    { id: ID(), name: 'online task 1', status: 0 },
    { id: ID(), name: 'online task 2', status: 0 },
    { id: ID(), name: 'online task 3', status: 0 },
    { id: ID(), name: 'old online task A', status: 1 },
    { id: ID(), name: 'old online task B', status: 1 },
    { id: ID(), name: 'old online task C', status: 1 },    
    ];

var _tasks = {};

_initialTasks.map( (t) => {
    _tasks[t.id] = t;
});

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
    var name = req.query.name;
    var task;
    
    if(name != null) {
        task = { id: ID(), name: name, status: 0 };        
    }  
    
    _tasks.push(task);
    
    res.end(JSON.stringify(task));    
});

// update task
app.get('/update', function(req,res) {
    var id = req.query.id;
    var name = req.query.name;
    var status = req.query.status;

    var props = { id: id, name: name, status: status };
        
    var task = _tasks[id];
    (props.name != null) && (task.name = props.name); 
    (props.status != null) && (task.status = props.status); 
        
    res.end(JSON.stringify(props));
});

// get task list
app.get('/tasklist', function(req,res) {
    
    var tasks = [];
    for(var k in _tasks) {
        var t = _tasks[k];
        tasks.push(t);
    }   
        
    res.end(JSON.stringify(tasks));    
});

app.listen(8080);
