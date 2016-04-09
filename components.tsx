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

var TaskListComponent = React.createClass({
    render: function() {
        var tasks = this.props.tasks;
        
        var list = tasks.map( (t) => {
           return <TaskComponent key={t.id} task={t}></TaskComponent>; 
        });
        
        return <div>{list}</div>;
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
    
    ReactDOM.render(<TaskListComponent tasks={_activeTaskList}></TaskListComponent>,
        document.querySelector('.task-list-active')
    );

    ReactDOM.render(<TaskListComponent tasks={_doneTaskList}></TaskListComponent>,
        document.querySelector('.task-list-done')
    );

}

render();