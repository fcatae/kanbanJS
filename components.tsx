var React;
var ReactDOM;

var update: Function;

var TaskComponent = React.createClass({
    getInitialState: function() {
        return { valueName: this.props.task.name }    
    },
    render: function() {
        var task = this.props.task;
        var visibility = (task.name) ? 'visible' : 'hidden';
        
        return <div className="task">
            <input type="checkbox" onChange={this.handleStatusChange} checked={task.status == 1} style={ {visibility: visibility } }></input>
            <input ref="name" type="text" defaultValue={task.name} placeholder="Name" onBlur={this.handleNameChange}></input>
        </div>   
    },
    handleStatusChange: function() {
        var task = this.props.task;
        
        if( task.name ) {
            update(task, { status: 1 } );
        }
    },
    handleNameChange: function(sender) {
        var task = this.props.task;
        var name = this.refs.name;
        
        if( name.value != task.name ) {
            update(task, { name: name.value });
        }
    }
});

//draggable="true" ondragstart="drag(event)"
var DraggableTaskComponent = React.createClass({
   render: function() {
       var t = this.props.task;
       return <div draggable="true" onDragStart={this.dragStart}><TaskComponent task={t}></TaskComponent></div>;
   },
   dragStart: function(ev) {
       var task = this.props.task;
       ev.dataTransfer.setData("text", task.id);
       ev.dataTransfer.setData("task", JSON.stringify(task));
   }
});

// ondrop="drop(event)" ondragover="allowDrop(event)"
var TaskListComponent = React.createClass({
    render: function() {
        var tasks = this.props.tasks;
        var list;
        
        if(tasks) { 
            list = tasks.map( (t) => {
                return <DraggableTaskComponent key={t.id} task={t}></DraggableTaskComponent>; 
            });
        }
                
        return <div onDrop={this.handleDrop} onDragOver={this.handleDragOver}>{list}</div>;
    },
    handleDrop: function(ev) {
        ev.preventDefault();
        var taskId = ev.dataTransfer.getData("text");
        var task = JSON.parse(ev.dataTransfer.getData("task"));
        var status = (this.props.status) | 0;         
        
        update(task, { status: status });
    },
    handleDragOver: function(ev) {
        ev.preventDefault();
    }
})

interface ITask {
    id : number,
    name : string,
    status: number
};

var _activeTaskList : Array<ITask>;
var _doneTaskList : Array<ITask>;

function render() {
    
    ReactDOM.render(<TaskListComponent tasks={_activeTaskList} status="0"></TaskListComponent>,
        document.querySelector('.task-list-active')
    );

    ReactDOM.render(<TaskListComponent tasks={_doneTaskList} status="1"></TaskListComponent>,
        document.querySelector('.task-list-done')
    );

}

// first call : tasks = null
// second call : when the task list is loaded

render();
