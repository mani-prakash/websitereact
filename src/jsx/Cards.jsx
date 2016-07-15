import React from 'react'
import Constants from './Constants.jsx'
import Utils from './Utils.jsx'
import Store from './Store.jsx'
import FetchUtils from './FetchUtils.jsx';
import Controller from './Controller.jsx';

export class Card extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div></div>);
    }
}
export class SchedulerTripCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        let tuple = this.props['data']['tripData'];
        let styles = {display:'inline-block'};
        let legs = tuple['legs'];
        let changeAtList = <div classfName='row'></div>;
        let changeList = legs.map(function(tuple,index){
            if(index===0)
            {
                return (<div className='tripTime' styles={styles}>
                    &nbsp;<img className='tripImage' src={Constants.assets+'/planner/train_trip_planner.png'} />
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
        let func = this.props['data']['screenChange'];
        let state = this.props['data'];
        //state['selectedMode'] = this.props['data']['selectedMode'];
        return (<div className='tripCard cursorPointer'>
            <div className='container-fluid' onClick={() => func(Constants.TRIP_PLANNER_DETAIL_SCREEN,state)} >
            <div className='row'>
                <div className='col-sm-4'>{Utils.getTimeTakenStringFromSec(tuple[Constants.TIMETAKEN])}</div>
                <div className='col-sm-4'> Fare : {tuple['fares'][0]['default_fare']}</div>
                <div className='col-sm-4'> {tuple[Constants.NO_OF_CHANGES]} Change</div>
            </div>
            <div className='row'>
                {changeList}
            </div>
            {changeAtList}
        </div></div>);
    }
}

export class CabsAndAuto extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {data:{autoCabs:[]}};
        let self = this;
        this.getCabDetails = this.getCabDetails.bind(this);

    }
    componentDidMount() {
        if(Utils.validate(Store.getCabsAndAutoData())){
            this.setData(Store.getCabsAndAutoData());
        }
        this.timeout = setTimeout(this.getCabDetails, 10000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
    getCabDetails(){
        console.log('cab details');
        if(!Utils.validate(Store.getLocation())){
            return;
        }
        let url = Constants.Backend_Url+'/cabs?from_lat='+Store.getLocation().lat+'&from_lon='+Store.getLocation().lng;
        console.log(url);
        let promise = FetchUtils.getData(url);
        let self = this;
        promise.then(
            function(data){
                self.setData(data);
                Store.setCabsAndAutoData(data);
                self.timeout = setTimeout(self.getCabDetails.bind(this), 60000);
            }
        );
    }
    setData(data){
        this.setState(
            {
                data : data
            }
        );
    }
    getCardData(){
        let data = this.state['data']['autoCabs'];
        let list = [];
        for(let i=0;i<data.length;i++)
        {
            let cabList = data[i]['autoCabs'];
            let orgType = data['aggregatorName'];
            if(cabList.length>0)
            {
                console.log(JSON.stringify(cabList[0]));
                let cab = cabList[0];
                for(let j=1;j<cabList.length;j++)
                {
                    let cab = cabList[j];
                    if(cab['eta_time_in_minutes']>cabList[j]['eta_time_in_minutes'])
                    {
                        cab = cabList[j];
                    }
                }
                cab['aggregatorName'] = orgType;
                list.push(cab);
            }
        }
        let tuples = list.map(function(cab,index){
                        return (<div key={index} className='container-fluid cardTuple borderBottom' style={{height:Constants.HEADER_SPACE}}>
                            <div className='col-xs-6 text-left verticalElement'>
                                <img src={Constants.IMAGESRC.UBER} />
                                &nbsp;
                                {cab['name']}
                            </div>
                            <div style={{color:'#3f51b5'}} className='col-xs-6 text-right verticalElement'>{cab['eta_time_in_minutes']} mins</div>
                        </div>);
                    });
        return tuples;
    }
    render(){
        if(!Utils.validate(Store.location)){
            return (<div>

                    </div>);
        }
        var list = this.getCardData();
        if(list.length===0)
        {
            return (<div></div>);
        }
        return (<div style={{fontSize:Constants.FONT_SIZE}} className='card'>
                    <div className='cardHeader verticalCenter' style={{backgroundColor:'#D1B72E', height: Constants.CARD_HEADER_HEIGHT, width:'100%'}}>
                        <span>Cabs &amp; Auto's</span>
                    </div>
                <div>
                    {list}
                </div>
                <div className='cardTuple verticalCenter' onClick={() => Controller.loadScreen(Constants.CABS_SCREEN)}>
                    <span style={{color:'#d3d3d3',fontSize:'32px'}}>
                        <img style={{height:48,width:48}} src={Constants.assets+'/more_trips_scheduler.png'}/>
                        <span style={{marginLeft:'48px'}}>More Cabs and Autos</span>
                    </span>
                </div>
        </div>);
    }
}

export class LiveTripsCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.state['liveTrips'] = [];
        this.setStateFromStore = this.setStateFromStore.bind(this);
    }
    getLiveTripList(){
        let trips = this.state['liveTrips'];
        let divs = trips.map(function(data,index){
                        return (
                            <div className='cardTuple borderBottom verticalCenter' style={{width:'100%'}} key={index}>
                                <div className='' style={{width:'60%'}}>
                                    <img src={Constants.MODE_IMAGES[data['_mode']]} />
                                    &nbsp;
                                    {data['_routeName']}
                                </div>
                                <div className='text-left' style={{width:'40%'}}>
                                    334
                                </div>
                            </div>
                        );
                    });

        return divs;
    }
    setStateFromStore(){
        let trips = Store.getLiveTrips(4);
        this.setState({
            liveTrips : trips
        });
    }
    componentWillMount(){
        let event = Store.on('geoFireChange' , this.setStateFromStore);
    }
    componentWillUnmount() {
        Store.removeListener('geoFireChange',this.setStateFromStore);
    }
    render(){
        let list = this.getLiveTripList();
        if(list.length==0)
        {
            return (<div></div>);
        }
        return (<div style={{fontSize:Constants.FONT_SIZE}} className='card'>
            <div className='cardHeader verticalCenter' style={{backgroundColor:'#273238', height: Constants.CARD_HEADER_HEIGHT, width:'100%'}}>
                Live Trips
            </div>
                {list}

            <div className='cardTuple verticalCenter' onClick={() => Controller.loadScreen(Constants.CABS_SCREEN)}>
                    <span style={{color:'#d3d3d3',fontSize:'32px'}}>
                        <img style={{height:48,width:48,verticalAlign:'middle'}} src={Constants.assets+'/more_trips_scheduler.png'}/>
                        <span style={{marginLeft:'48px'}}>More Live Trips</span>
                    </span>
            </div>
        </div>);
    }
}
export class Clock extends React.Component{
    constructor(props){
        super(props);
        let time = this.props['time'];
        console.log(this.props);
        console.log(time);
        this.state = {};
        this.state['hour'] = time.hour;
        this.state['minutes'] = time.minutes;
    }
    setHour(event)
    {
        let ele = event.target;
        let value = ele.value;
        this.setState({
            hour : value
        });
    }
    setMinutes(event)
    {
        let ele = event.target;
        let value = ele.value;
        this.setState({
            minutes : value
        });
    }
    setValue(event)
    {
        console.log(ele);
        let key = ele.getAttribute('key');
        if(Utils.stringCompare(key,'hour'))
        {

        }
        else{
            this.setState({
                minutes : value
            });
        }
    }
    setTime()
    {
        let hour = this.state['hour'];
        let minutes = this.state['minutes'];
        this.props.setTime({hour:hour,minutes:minutes});
    }
    render(){
        let hours = [];
        let minutes = [];
        let hour = 0;
        let minutesData = 0;
        for(let i=0;i<24;i++)
        {
            hours.push(i);
            minutes.push(i);
        }
        for(let i=24;i<60;i++)
        {
            minutes.push(i);
        }
        let self =this;
        return (
            <div>
                <div style={{opacity:0.4,background:'black',position:'fixed',zIndex:1001,top:0,left:0,height:'100%',width:'100%'}}>
                </div>
                <div style={{background:'white',position:'fixed', transform: 'translateY(-50%) translateX(-50%)' ,top:'50%',left:'50%',zIndex:1002,height:'50%',width:'50%'}}>
                    Hour
                    <select key='hour' defaultValue={hour} onChange={this.setHour.bind(this)}>
                        {hours.map(function(data,index){
                            return <option value={data} key={index}>{data}</option>;
                        })}
                    </select>
                    Minutes
                    <select key='minutes' defaultValue={minutesData} onChange={this.setMinutes.bind(this)}>
                        {minutes.map(function(data,index){
                            return <option value={data} key={index}>{data}</option>;
                        })}
                    </select>
                    <button class='btn btn-primary' onClick={this.setTime.bind(this)}>ok</button>
                </div>
            </div>
        );
    }
}
