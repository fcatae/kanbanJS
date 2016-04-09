var _tasks = [];

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
    alert('API: tasklist');
    
    return _tasks;
}