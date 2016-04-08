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

ReactDOM.render(<TaskComponent name="react task 1"></TaskComponent>,
    document.getElementById('container');
)