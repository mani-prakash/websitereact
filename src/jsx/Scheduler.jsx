import React from 'react';
import {SchedulerHeader} from './AppHeader.jsx';
import {SchedulerTripCard,Clock} from './Cards.jsx';
import Utils from './Utils.jsx';
import Constants from './Constants.jsx';
import Store from './Store.jsx';
import schedulerStore from './Store/SchedulerStore.jsx';
import FetchUtils from './FetchUtils.jsx';
import NonBusScheduler from './NonBusScheduler.jsx';
class Scheduler extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
        let st = schedulerStore.getState();
        if(Utils.validate(st))
        {
            this.state = st;
        }
        else{
            let sta = {selectedMode : this.props['state']['selectedMode'],'modeStates':{}};
            for(let i=0;i<Store.city['station_type'].length;i++)
            {
                sta['modeStates'][Store.city['station_type'][i]] = {};
            }
            if(this.props['state']['isRedirect'])
            {
                sta['modeStates'][this.props['state']['selectedMode']]['isRedirect'] = true;
            }
            this.state = sta;
            schedulerStore.setState(sta);
        }
        this.setStateToStore = this.setStateToStore.bind(this);
    }
    componentWillMount(){
        this.unMount = false;
        let event = schedulerStore.on('change' , this.setStateToStore);
        console.log(event);
    }
    setStateToStore(){
        if(!this.unMount) {
            console.log('set state');
            this.setState(schedulerStore.getState());
        }
    }
    componentWillUnmount() {
        this.unMount = true;
        schedulerStore.removeListener('change',this.setStateToStore);
    }
    changeMode(mode){
        console.log("selected mode :"+mode);
        console.log(this.unMount);
        schedulerStore.setCurrentMode(mode);
        this.setState({
            selectedMode : mode
        });
    }

    reloadScreen(){
        Store.App = {};
    }

    getModeScheduler(){
        if(Utils.stringCompare(this.state['selectedMode'], Constants.BUS))
        {
            return (<BusScheduler selectedMode={this.state['selectedMode']} state={this.state['modeStates'][this.state['selectedMode']]} screenChange={this.props['screenChange']} />);
        }
        else{
            return (<NonBusScheduler selectedMode={this.state['selectedMode']} state={this.state['modeStates'][this.state['selectedMode']]} screenChange={this.props['screenChange']} />);
        }
    }
    render(){
        if(Utils.validate(this.ModeScheduler))
        {
            this.ModeScheduler = null;
        }
        this.ModeScheduler = this.getModeScheduler();
        return (
            <div>
                <SchedulerHeader title="Timings" selectedMode={this.state['selectedMode']}
                                 backState="home" screenChange={this.props.screenChange}
                                 changeMode={this.changeMode.bind(this)}
                    />
                <div style={{height:Constants.HEADER_SPACE_NUMBER+144+24}}></div>
                {this.ModeScheduler}
            </div>
        )
    }
}

class BusScheduler extends React.Component{
    constructor(props)
    {
        super(props);
        console.log(this.props);
        if(this.props['state']['isRedirect']){
            this.loadAutoCompleteView();
        }
    }
    getRouteMethod(data,state){
        if(Utils.validate(data))
        {
            state['goBackMethod'] = this.reloadMethod.bind(this);
            this.props.screenChange(Constants.ROUTE,{data:data,state:state});
        }
        else{
            this.reloadMethod();
        }
    }
    reloadMethod(){
        this.props.screenChange(Constants.SCHEDULERSCREEN,{'selectedMode':Constants.BUS});
    }
    getAutoCompleteData(value)
    {
        console.log(this);
        let url = Constants.Scheduler_Url+'/'+Store.city.city+'/autocomplete/route?day='+'monday'+'&station_type='+this.props.selectedMode+'&str='+value;
        console.log('-=-=-=-=-=-=--=-=--=-=-=-=-=-=');
        console.log(url);
        return FetchUtils.getData(url);
    }
    getAutoCompleteTuple(data,index){
        return (<div onClick={this.loadRouteScreen.bind(this,data)} key={index} className='container-fluid autoCompleteTuple verticalCenter'>
                    <div className='col-xs-2'>
                        <img className='headerItem' src={Constants.MODE_IMAGES.BUS} />
                    </div>
                        <div className='col-xs-6'>
                            <span style={{fontSize:Constants.FONT_SIZE}}>{data['route_name']}</span><span style={{float:'right',fontSize:Constants.FONT_SIZE}}>{data['agency_name']}</span>
                            <br/>
                            <span style={{fontSize:16}}>{data['first_stop_name']} to {data['last_stop_name']}</span>
                        </div>
                </div>);
    }

    loadRouteScreen(data){
        let state = {data:data, backScreen:this.reloadMethod.bind(this), goBackMethod:this.getRouteMethod.bind(this), selectedMode:Constants.BUS, type:Constants.ROUTE};
        this.props['screenChange'](Constants.ROUTE_DETAIL_SCREEN,state);
    }

    loadAutoCompleteView(){
        let state = {getData:this.getAutoCompleteData.bind(this),backScreen:this.reloadMethod.bind(this),getDiv:this.getAutoCompleteTuple.bind(this),'goBackMethod':this.getRouteMethod.bind(this), selectedMode:Constants.BUS, 'searchState':Constants.ROUTE, type:Constants.ROUTE};
        this.props['screenChange'](Constants.AUTOCOMPLETE_VIEW, state);
    }
    render(){

        let func = this.props['screenChange'];
        return(
        <div>
            <div onClick={this.loadAutoCompleteView.bind(this)} className='inputField verticalCenter'>
                <span><img style={{marginLeft:36,marginRight:36}} src={Constants.assets+'/schedular/search.png'}/></span>
                <span>Search by route number</span>
            </div>
        </div>);
    }
}
export default Scheduler;