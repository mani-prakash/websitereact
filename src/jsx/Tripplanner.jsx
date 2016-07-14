import React from 'react';
import Constants from './Constants.jsx';
import Utils from './Utils.jsx';
import Store from './Store.jsx';
import Controller from './Controller.jsx';
import FetchUtils from './FetchUtils.jsx';

class Tripplanner extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;
        this.routeData = null;
        this.selectedRoute = null;
        this.screenChange = this.props['state']['screenChange'];
        this.backScreen = this.props['backScreen'];
        this.backScreenState = this.props['backScreenState'];
        this.state = {
            data: this.props['state']
        };
        console.log(this.state['data']);
        if(Utils.validate(this.props['data']))
        {
            this.backScreenMethod = this.props['data']['state']['goBackMethod'];
        }
    }
    goBack(){
        //this.backScreenMethod();
    }
    getLegDetails(legData){
        let extraTrips = [];
        if(legData['extraTrips']['hasMoreTrips'])
        {
            extraTrips = legData['extraTrips']['extraTrips'];
            extraTrips = extraTrips.slice(0,2);
        }
        return (<div>
            {extraTrips.map(function(data,index){
                let trip = data['trip'];
                let imgSrc = Constants.assets+'/planner/'+Constants.viewModes[legData['mode']].toLowerCase()+'_trip_planner.png';
                let platform = Utils.validate(data['platform'])?(<span>Platform {data['platform']}<br/></span>):(<span></span>);
                return (<div className='container-fluid'>
                    <div className='col-xs-1'>
                        <img style={{height:48,width:48}} className='headerItem' src={imgSrc}/>
                    </div>
                    <div className='col-xs-7'>
                        <span style={{fontSize:32}}>From {trip['first_stop']['stop_name']}</span>
                        <br/>
                        <span>To {trip['last_stop']['stop_name']}</span>
                        <br/>
                        <span style={{fontSize:32,opacity:0.6}}>{platform}</span>
                        <span style={{fontSize:32,opacity:0.2}}>{trip['route_name']}</span>
                    </div>
                    <div className='col-xs-4 text-right'>
                        {Utils.getTimeFormatFromSec(data['arrival_time'])}
                    </div>
                </div>);
            })}
        </div>);
    }
    goBackMethod(){
        Controller.loadScreen(Constants.SCHEDULERSCREEN);
    }
    render(){
        let legs = this.state['data']['tripData']['legs'];
        let self = this;
        let headStyle = {'color':'#ff3333'};
        return (
            <div className='tripPlaanerDetails' style={{fontSize:Constants.FONT_SIZE}}>
                <div className='AppHeader'>
                    <div className='mainHeader verticalCenter'>
                        <span>
                            <img onClick={this.goBackMethod.bind(this)} src={Constants.BACKARROW} style={{height:'30px',width:'30px'}}/>
                            &nbsp;&nbsp;{Utils.getTimeTakenStringFromSec(this.state['data']['tripData']['time_taken'])}
                        </span>
                    </div>
                </div>
                <div style={{height:Constants.HEADER_SPACE_NUMBER}}></div>
                <div className='dataDisplay' style={{padding:'0px 24px'}}>
                    {legs.map(function(data,index){
                        let title = (index==0)?'Start from ':'Change at ';
                        return (
                            <div key={index}>
                                <div className='' style={{color:'#ff3333'}}>
                                {
                                    title + data['start_place_name']
                                }
                                <hr className='hrTripPlanner' />
                                </div>
                                {self.getLegDetails(data)}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Tripplanner;