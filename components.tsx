var React;
var ReactDOM;

var TaskComponent = React.createClass({
    render: function() {
        return <div className="task">
            <input type="checkbox" onchange="update()"></input>
            <input value={this.props.name}></input>
        </div>   
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

var _taskList = [ 
    { name: 'react task 1' },
    { name: 'react task 2' },
    { name: 'react task 3' },
    ];

ReactDOM.render(<TaskListComponent tasks={_taskList}></TaskListComponent>,
    document.getElementById('container')
)