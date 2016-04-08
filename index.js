var _tasks = [];

function create(name) {    
    alert('create');
    
    var task = { name: name, status: 0 };

    _tasks.push(task);

    return task;    
}

function update(task, name, status) {
    alert('update');
    
    (name != null) && (task.name = name);
    (status != null) && (task.status = status); 
}

function tasklist() {
    alert('tasklist');
    
    return _tasks;
}