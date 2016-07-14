import React from 'react'
export default class RouteStop extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.data['stop_name']}
            </div>
        );
    }
}