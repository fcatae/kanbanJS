var React;
var ReactDOM;

var update: Function;

var TaskComponent = React.createClass({
    render: function() {
        return <div className="task">
            <input type="checkbox" onChange={this.handleChange}></input>
            <input value={this.props.name} placeholder="Name"></input>
        </div>   
    },
    handleChange: function() {
        update();
    }
});

var TaskListComponent = React.createClass({
    render: function() {
        var tasks = this.props.tasks;
        
        var list = tasks.map( (t) => {
           return <TaskComponent name={t.name}></TaskComponent>; 
        });
        
        return <div>{list}</div>;
    }
})

var _activeTaskList = [ 
    { name: 'react task 1' },
    { name: 'react task 2' },
    { name: 'react task 3' },
    ];

var _doneTaskList = [ 
    { name: 'old task A' },
    { name: 'old task B' },
    { name: 'old task C' },
    ];

function render() {
    
    ReactDOM.render(<TaskListComponent tasks={_activeTaskList}></TaskListComponent>,
        document.querySelector('.task-list-active')
    );

    ReactDOM.render(<TaskListComponent tasks={_doneTaskList}></TaskListComponent>,
        document.querySelector('.task-list-done')
    );

}

render();