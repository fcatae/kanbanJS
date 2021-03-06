var _activeTaskList;
var _doneTaskList;

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
    httpGet('create', { name: name }, function(data) {
        var task = JSON.parse(data);        
        
        _activeTaskList.push(task);
        render();
        
    });        
}

function update(task, props) {
    //alert('API: update');
    props.id = task.id;

    // assume the update always works
    httpGet('update', props, function() {
        
        (props.name != null) && (task.name = props.name);
        
        if(props.status != null) {
            var srcList = (task.status == 0) ? _activeTaskList : _doneTaskList;
            var dstList = (props.status == 0) ? _activeTaskList : _doneTaskList;
            
            for(var deletePosition=0; deletePosition<srcList.length; deletePosition++) {
                if(srcList[deletePosition].id == task.id)
                    break;
            }
            
            if( deletePosition < srcList.length ) {
                srcList.splice(deletePosition, 1);
                dstList.push(task);     
            }

            task.status = props.status;
        }

        // update React
        render();               
    });             
   
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

