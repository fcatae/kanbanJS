var React;
var ReactDOM;

var update: Function;

var TaskComponent = React.createClass({
    getInitialState: function() {
        return { valueName: this.props.task.name }    
    },
    render: function() {
        var task = this.props.task;
        
        return <div className="task">
            <input type="checkbox" onChange={this.handleStatusChange} checked={task.status == 1}></input>
            <input ref="name" type="text" defaultValue={task.name} placeholder="Name2" onBlur={this.handleNameChange}></input>
        </div>   
    },
    handleStatusChange: function() {
        var task = this.props.task;
        
        update(task, { status: 1 } );
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
           return <TaskComponent task={t}></TaskComponent>; 
        });
        
        return <div>{list}</div>;
    }
})

interface ITask {
    name : string,
    status: number
};

var _activeTaskList : Array<ITask> = [ 
    { name: 'react task 1', status: 0 },
    { name: 'react task 2', status: 0 },
    { name: 'react task 3', status: 0 },
    ];

var _doneTaskList : Array<ITask> = [ 
    { name: 'old task A', status: 1 },
    { name: 'old task B', status: 1 },
    { name: 'old task C', status: 1 },
    ] ;

function render() {
    
    ReactDOM.render(<TaskListComponent tasks={_activeTaskList}></TaskListComponent>,
        document.querySelector('.task-list-active')
    );

    ReactDOM.render(<TaskListComponent tasks={_doneTaskList}></TaskListComponent>,
        document.querySelector('.task-list-done')
    );

}

render();