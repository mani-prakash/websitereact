import React from 'react';
class App extends React.Component{
    constructor(props)
    {
        super(props);
    }
    props = {
        name : React.PropTypes.string,
        isPerson : React.PropTypes.bool,
        height : React.PropTypes.number
        };
    defaultProps = {
        name: 'prakash'
    };
    setStateHandler(){
        return {
            value : 1
        }
    };
    componentDidMount(){
        this.setState({
            value : this.state.value+1
        });
    };
    _customFunction(){
        this.setState({
            value : this.state.value+1
        });
    }
    render(){
        var greeting = "world";
        if(this.props.isPerson)
        {
            greeting = App.props.name;
        }
        return (
            <div>
                <h1> hello {greeting} </h1>
                your height : {this.props.height} <br/>
                your human : {this.props.isPerson} <br/>
                state : {this.state.value}
                <button onClick={this._customFunction}> click me </button>
            </div>
        );
    }
}

export default App;
