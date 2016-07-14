import React from 'react';
import {SchedulerHeader} from './AppHeader.jsx';
import {SchedulerTripCard,Clock} from './Cards.jsx';
import Utils from './Utils.jsx';
import Constants from './Constants.jsx';
import Store from './Store.jsx';
import schedulerStore from './Store/SchedulerStore.jsx';
import FetchUtils from './FetchUtils.jsx';
export default class NonBusScheduler extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            inputFrom : null,
            inputTo : null
        };
        this.selectedMode = this['props']['selectedMode'];
        this.state = this['props']['state'];
        this['state']['selectedMode'] = this['props']['selectedMode'];
        this['state']['tripsList'] = [];
        let dt = new Date();
        let time = {hour:dt.getHours(),minutes:dt.getMinutes()};
        this.state['time'] = time;
        if(Utils.validate(this.props['state']['inputFrom']))
        {
            this.state ['inputFrom'] = this.props['state']['inputFrom'];
        }
        if(Utils.validate(this.props['state']['inputTo']))
        {
            this.state ['inputTo'] = this.props['state']['inputTo'];
        }
        if(Utils.validate(this.props['state']['inputFrom'])&&Utils.validate(this.props['state']['inputTo']))
        {
            this.getTrips();
        }
        if(Utils.validate(this.props['state']['tripsList']))
        {
            this['state']['tripsList'] = this.props['state']['tripsList'];
        }
        if(Utils.validate(this.props['state']['time']))
        {
            this['state']['time'] = this.props['state']['time'];
        }
        this.setStoreToState = this.setStoreToState.bind(this);
    }
    getState(){
        let State = schedulerStore.getState(Constants.SCHEDULERSCREEN);
        let modeWise = State['modeStates'][this.selectedMode];
        this.setState({
            inputFrom : modeWise['inputFrom'],
            inputTo : modeWise['inputTo'],
            tripsList : modeWise['tripsList'],
            time : modeWise['time']
        });
    }
    storeState(){
        let State = schedulerStore.getState();
        State['modeStates'][this.selectedMode] = {
            inputFrom : this.state['inputFrom'],
            inputTo : this.state['inputTo'],
            tripsList : this.state['tripsList'],
            time : this.state['time']
        };
        schedulerStore.setState(State);
    }
    getAutoCompleteData(value) {
        let url = Constants.Scheduler_Url+"/"+Store.city.city+"/autocomplete/stop?day=monday&station_type="+this.selectedMode+"&str="+value;
        return FetchUtils.getData(url);
    }
    getBackMethod(data){
        let curState = this.state;
        if(Utils.validate(data))
        {
            if(Utils.stringCompare(Constants.FROM, this.autoCompleteType))
            {
                curState['inputFrom'] = data;
            }
            else{
                curState['inputTo'] = data;
            }
        }
        curState['selectedMode'] = this.selectedMode;
        curState['tripsList'] = this.state.tripsList;
        curState['time'] = this.state.time;
        this.storeState();
        this.props['screenChange'](Constants.SCHEDULERSCREEN,curState);
    }

    getTrips(){
        let time = this.state['time'];
        let secs = time['hour']*3600+time['minutes']*60;
        let url =
            Constants.Scheduler_Url+"/"+Store.city['city'] +
            "/tripplanner/stop/?day=monday&" + "start_time=" + secs + "&to_stop_ids="
            + this.state['inputTo']['stop_id'] + "&" + "station_type=" + this.selectedMode +
            "&from_stop_ids=" + this.state['inputFrom']['stop_id'];
        let getTrips = FetchUtils.getData(url);
        let self = this;
        getTrips.then(function(result){
            self.saveTripList(result);
        });
    }

    saveTripList(data){
        console.log(JSON.stringify(data));
        let list = data['payload']['itineraries'];
        this.setState(
            {
                tripsList : list
            }
        );
        this.storeState();
    }

    resetState(){
        let state = schedulerStore.getModeState(this.selectedMode);
        let inputFrom = null;
        let inputTo = null;
        let tripsList = [];
        let selectedTime = '';
        if(Utils.validate(state))
        {
            inputFrom = Utils.validate(state['inputFrom'])?state['inputFrom']:null;
            inputTo = Utils.validate(state['inputTo'])?state['inputTo']:null;
            tripsList = Utils.validate(state['tripsList'])?state['tripsList']:[];
            selectedTime = Utils.validate(state['time'])?state['time']:{};
        }
        this.setState(
            {
                selectedMode :  this.selectedMode,
                inputFrom : inputFrom,
                inputTo : inputTo,
                tripsList : tripsList,
                time : selectedTime
            }
        );
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (this.selectedMode !== nextProps.selectedMode) {
            this.selectedMode = nextProps.selectedMode;
            this.resetState();
        }
    }

    componentWillMount(){
        this.unMount = false;
        schedulerStore.on('change' , this.setStoreToState);
    }

    setStoreToState(){
        this.setState(schedulerStore.getModeState(this.selectedMode));
    }

    getStateFromStore(){

    }

    componentWillUnmount() {
        schedulerStore.removeListener('change', this.setStoreToState);
    }

    getTripCard(tuple , index)
    {
        let styles = {display:'inline-block'};
        let legs = tuple['legs'];
        let changeAtList = <div className='row'></div>;
        let changeList = legs.map(function(tuple,index){
            if(index===0)
            {
                return (<div className='tripTime' styles={styles}>
                    &nbsp;<img className='tripImage' src={Constants.assets+'/planner/'+Constants['viewModes'][this.selectedMode].toLowerCase()+'_trip_planner.png'} />
                    &nbsp;{tuple['start_place_name']}
                </div>);
            }
            else{
                return (<div className='tripTime' styles={styles}>
                    &nbsp;>&nbsp;<img className='tripImage' src={Constants.assets+'/planner/train_trip_planner.png'} />
                    &nbsp;{tuple['start_place_name']}
                </div>);
            }
        });
        if(legs.length>1)
        {
            changeAtList = (<div className='row'>
                Change at
                {legs.map(function(tuple, index){
                    if(index===0)
                        return '';
                    else if(index==1)
                        return ' '+tuple['start_place_name'];
                    return ', '+tuple['start_place_name'];
                })}
            </div>);
        }

        return (
            <div key={index} className='tripCard container-fluid'>
                <div className='row'>
                    <div className='col-sm-4'>{Utils.getTimeTakenStringFromSec(tuple[Constants.TIMETAKEN])}</div>
                    <div className='col-sm-2'> Fare : {tuple['fares'][0]['default_fare']} </div>
                    <div className='col-sm-4'> {tuple[Constants.NO_OF_CHANGES]} Change</div>
                </div>
                <div className='row'>
                    {changeList}
                </div>
                {changeAtList}
            </div>);
    }

    getInputText(use,txt){
        if(use)
        {
            return (<span style={{color:'black'}}>{txt}</span>);
        }
        else{
            return (<span>{txt}</span>);
        }
    }

    startTime(){
        this.setState({
            isTime : true
        });
    }


    setTime(time){
        let state = schedulerStore.getModeState(this.state.selectedMode);
        state['time'] = time;
        schedulerStore.setModeState(this.state.selectedMode, state);
        this.setState({
            time : time,
            isTime : false
        });
    }

    getAutoCompleteTuple(data,index){
        return (
            <div onClick={this.getBackMethod.bind(this,data)} key={index} className='container-fluid autoCompleteTuple verticalCenter'>
                <div className='col-xs-2'>
                    <img className='headerItem' src={Constants.MODE_IMAGES.TRAIN} />
                </div>
                <div className='col-xs-6'>
                    <span style={{fontSize:Constants.FONT_SIZE}}>{data['stop_name']}</span>
                </div>
            </div>);
    }

    initAutoComplete(type){
        let state = {};
        state = {getData:this.getAutoCompleteData.bind(this),getDiv:this.getAutoCompleteTuple.bind(this),'goBackMethod':this.getBackMethod.bind(this),selectedMode:this.selectedMode, 'searchState':Constants.STOP , 'type' : Constants.STOP};
        if(Utils.stringCompare(Constants.FROM,type))
        {
            this.autoCompleteType = 'from';
        }
        else{
            this.autoCompleteType = 'to';
        }
        this.props['screenChange'](Constants.AUTOCOMPLETE_VIEW, state);
    }


    render(){
        let func = this.props['screenChange'];
        let state = this.state;
        //let stateFrom = {'goBackMethod':this.getBackMethod.bind(this),'selectedMode':this.selectedMode, 'searchState':Constants.STOP,inputType:Constants.FROM};
        //let stateTo = {'goBackMethod':this.getBackMethod.bind(this),'selectedMode':this.selectedMode, 'searchState':Constants.STOP,inputType:Constants.TO};
        let from = Utils.validate(state.inputFrom)?this.getInputText(true,state.inputFrom['stop_name']):this.getInputText(false,'Enter start station');
        let to = Utils.validate(state.inputTo)?this.getInputText(true,state.inputTo['stop_name']):this.getInputText(false,'Enter end station');
        let list = state['tripsList'];
        let self = this;
        let time = this.state['isTime']?(<Clock time={state['time']} setTime={this.setTime.bind(this)} />):(<div></div>);
        return (
            <div>
                <div>
                    <div className='inputField verticalCenter text-left borderBottom' onClick={this.initAutoComplete.bind(this, Constants.FROM)}>
                        <span><img style={{marginLeft:36,marginRight:36}} src={Constants.assets+'/schedular/search.png'}/></span>
                        <span class='text-left'>{from}</span>
                    </div>
                    <div className='inputField verticalCenter text-left borderBottom' onClick={this.initAutoComplete.bind(this, Constants.TO)}>
                        <span><img style={{marginLeft:36,marginRight:36}} src={Constants.assets+'/schedular/search.png'}/></span>
                        <span class='text-left'>{to}</span>
                    </div>
                    <div className='verticalCenter text-center borderBottom' style={{fontSize:Constants.FONT_SIZE, height:100,width:244,background:'#FFFFFF'}} onClick={this.startTime.bind(this)}>
                        <span>{this.state['time']['hour']} : {this.state['time']['minutes']}</span>
                    </div>
                </div>
                <div className='width100 FontSize'>
                    {list.map(function(tuple, index){
                        let stateTrip = {'screenChange':func,'selectedMode':self.selectedMode, tripData: tuple};
                        return <SchedulerTripCard data={stateTrip} key={index} />;
                    })}
                </div>
                {time}
            </div>);
    }
}