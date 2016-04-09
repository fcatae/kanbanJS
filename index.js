var _globalTaskId=0;

function ID() {
    return _globalTaskId++;
}

var _tasks = [ 
    { id: ID(), name: 'task 1', status: 0 },
    { id: ID(), name: 'task 2', status: 0 },
    { id: ID(), name: 'task 3', status: 0 },
    { id: ID(), name: 'old task A', status: 1 },
    { id: ID(), name: 'old task B', status: 1 },
    { id: ID(), name: 'old task C', status: 1 },    
    ];

var KANBAN_ENDPOINT = 'http://localhost:8080/'; 

function httpGet(cmd, data, callback) {
    $.get(KANBAN_ENDPOINT + cmd, data, callback);
}

function create(name) {    
    // alert('API: create');
    httpGet('create', { name: name }, function(data) {
        alert(data);
    });
    
    var task = { id: ID(), name: name, status: 0 };

    _activeTaskList.push(task);

    // update React
    render();
    
    return task;    
}

function update(task, props) {
    //alert('API: update');
    httpGet('update', props, function(data) {
        alert(data);
    });
        
    (props.name != null) && (task.name = props.name);
    
    if(props.status != null) {
        task.status = props.status;
        
        var deletePosition = _activeTaskList.indexOf(task);
        
        if( deletePosition > -1 ) {
            _activeTaskList.splice(deletePosition, 1);
            _doneTaskList.push(task);     
        }
    }

    // update React
    render();      
}

function tasklist(callback) {
    httpGet('tasklist', null, function(data) {
        callback(data);
    });
        
    return _tasks;
}

var tasks;

tasklist( (dataReceived)=> { 
    tasks = JSON.parse(dataReceived);
    
    _activeTaskList = tasks.filter ((t) => { return t.status == 0 });
    _doneTaskList = tasks.filter ((t) => { return t.status == 1 });
    
    render();
    
} );

var _activeTaskList;
var _doneTaskList;
