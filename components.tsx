var React;
var ReactDOM;

var update: Function;

var TaskComponent = React.createClass({
    render: function() {
        var task = this.props.task;
        
        return <div className="task">
            <input type="checkbox" onChange={this.handleChange}></input>
            <input value={task.name} placeholder="Name"></input>
        </div>   
    },
    handleChange: function() {
        var task = this.props.task;
        
        update(task, { status: 1});
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
    name : string
};

var _activeTaskList : Array<ITask> = [ 
    { name: 'react task 1' },
    { name: 'react task 2' },
    { name: 'react task 3' },
    ];

var _doneTaskList : Array<ITask> = [ 
    { name: 'old task A' },
    { name: 'old task B' },
    { name: 'old task C' },
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