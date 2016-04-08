var _tasks = [];

function create(name) {    
    // alert('API: create');
    
    var task = { name: name, status: 0 };

    _activeTaskList.push(task);

    // update React
    render();
    
    return task;    
}

function update(task, name, status) {
    alert('API: update');
    
    (name != null) && (task.name = name);
    (status != null) && (task.status = status); 
}

function tasklist() {
    alert('API: tasklist');
    
    return _tasks;
}