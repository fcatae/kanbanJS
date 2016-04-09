var _globalTaskId=0;

function ID() {
    return _globalTaskId++;
}

var _tasks = [ 
    { id: ID(), name: 'task 1', status: 0 },
    { id: ID(), name: 'task 2', status: 0 },
    { id: ID(), name: 'task 3', status: 0 },
    ];

function create(name) {    
    // alert('API: create');
    
    var task = { id: ID(), name: name, status: 0 };

    _activeTaskList.push(task);

    // update React
    render();
    
    return task;    
}

function update(task, props) {
    //alert('API: update');
    
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

function tasklist() {
    return _tasks;
}

var _activeTaskList;
 _activeTaskList = tasklist();
 
var _doneTaskList = [ 
    { id: ID(), name: 'old task A', status: 1 },
    { id: ID(), name: 'old task B', status: 1 },
    { id: ID(), name: 'old task C', status: 1 },
    ] ;

render();