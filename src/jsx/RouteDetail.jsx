import React from 'react';
import Constants from './Constants.jsx';
import Utils from './Utils.jsx';
import Store from './Store.jsx';
import FetchUtils from './FetchUtils.jsx';

var routeData = [];
class RouteDetail extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
        this.selectedRouteId = "";
        this.city = Store['city']['city'];
        this.routeData = null;
        this.selectedRoute = null;
        console.log(this.props);
        this.screenChange = this.props['screenChange'];
        this.backScreen = this.props['backScreen'];
        this.backScreenState = this.props['backScreenState'];
        this.state = {
            value: '',
            selectedRoute: this.selectedRoute,
            displayState : 'STOPS'
        };
        if(Utils.validate(this.props['data']))
        {
            console.log(this.props['data']);
            this.selectedMode = this.props['data']['selectedMode'];
            this.selectedRoute = this.props['data']['data'];
            this.backScreenMethod = this.props['data']['goBackMethod'];
            this.getSelectedRoute(this.selectedRoute['route_id']);
        }
    }
    goBack(){
        this.backScreenMethod();
    }
    getSelectedRoute(value){
        let url = Constants.Scheduler_Url+"/"+this.city+"/routedetails?day=monday&route_id="+value+"&station_type="+this.selectedMode;
        console.log(url);
        var self = this;
        let promise = FetchUtils.getData(url);
        promise.then(function (result) {
                console.log(result);
                var data = result;
                self.routeData = data;
                self.setState({
                    routeData:self.routeData
                })
            }
        );
    }
    changeState(state){
        this.setState({
            displayState : state
        });
    }
    getDisplayComponent(){
        if(Utils.stringCompare(this.state['displayState'],'STOPS'))
        {
            let stops = [];
            if(this.routeData!=null)
            {
                stops = this.routeData['route']['stopSequenceWithDetails'];
            }
            console.log(stops);
            return (
                stops.map(function(result) {
                    return (<div className='routeStop cardTuple borderBottom verticalCenter' style={{width:'100%'}} key={result['stop_id']}>
                        <span>{result['stop_name']}</span>
                    </div>);
                })
            );
        }
        else{
            let timings = [];
            if(this.routeData!=null)
            {
                timings = this.routeData['timings'];
            }
            return (
                timings.map(function(result,index) {
                    if(!result['isFrequency'])
                    {
                        return <div className='cardTuple routeStop borderBottom verticalCenter' style={{width:'100%'}} key={index}>{Utils.getTimeStringFromSec(result['start_time'])}</div>;
                    }
                    else{
                        let frequency_tuple = result['frequency_tuple'];
                        return (<div class='cardTuple routeStop borderBottom verticalCenter' style={{width:'100%',fontSize:Constants.FONT_SIZE}} key={index}>
                            <span className='col-xs-8'>{Utils.getTimeStringFromSec(frequency_tuple['start_time'])} -
                            {Utils.getTimeStringFromSec(frequency_tuple['end_time'])}</span>
                            <span className='col-xs-4 text-right'>Every {frequency_tuple['frequency']} min</span></div>);
                    }

                })
            );
        }
    }
    render(){
        let routeName = '';
        if(Utils.validate(this.state['routeData']))
        {
            routeName = this.state['routeData']['route']['route_name'];
        }
        return (
            <div class='text-center'>
                <div className='AppHeader'>
                <div className='mainHeader verticalCenter'>
                    <span className='cursorPointer' onClick={this.goBack.bind(this)}>
                        <img className='headerItem' src={Constants.BACKARROW} />
                    </span>
                    <span>{routeName}</span>
                    </div>
                <div className='container extraHeader' style={{height:144}}>
                    <span className='col-xs-6 text-center' onClick={this.changeState.bind(this,'STOPS')}>STOPS</span><span className='col-xs-6 text-center' onClick={this.changeState.bind(this,'TIMING')}>TIMING</span>
                </div>
                </div>
                <div style={{height:Constants.HEADER_SPACE_NUMBER+144}}></div>
                <div className='dataSeletedDisplay'>
                    {this.getDisplayComponent()}
                </div>
            </div>
        );
    }
}
export default  RouteDetail;