import React from 'react';
import Utils from './Utils.jsx'
import Constants from './Constants.jsx'
import AppHomeScreen from './AppHomeScreen.jsx'
import RouteDetail from './RouteDetail.jsx'
import Scheduler from './Scheduler.jsx'
import Store from './Store.jsx'
import Controller from './Controller.jsx'
import ChangeCity from './ChangeCity.jsx'
import AutoComplete from './AutoComplete.jsx'
import Tripplanner from './Tripplanner.jsx'
import schedulerStore from './Store/SchedulerStore.jsx'
import CabsAndAutoScreen from './CabsAndAutoScreen.jsx'
import AutoCompleteView from './AutoCompleteView.jsx'

class MainPage extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            screen: 'home'
        };
        Store.App = this;
        Controller.storeSetApp(this);
    }
    _loadHomeScreen(state){
        this.setState({
            screen:Constants.HOMESCREEN,
            scheduler: {
                selectedMode : state
            }
        });
    }
    _loadSchedulerScreen(state)
    {
        let sta = state;
        if(!Utils.validate(sta))
        {
            sta = schedulerStore.getState();
        }
        this.setState({
            screen:Constants.SCHEDULERSCREEN,
            scheduler: {
                state : sta
            }
        });
    }
    _loadChangeCityScreen(state)
    {
        this.setState({
            screen:Constants.CHANGE_CITY_SCREEN,
            scheduler: {
                state : state
            }
        });
    }
    _loadAutoComplete(state)
    {
        this.setState({
            screen:Constants.AUTOCOMPLETE,
            autocomplete: {
                data : state
            }
        });
    }
    _loadRouteComplete(state)
    {
        console.log(state);
        this.setState({
            screen:Constants.ROUTE_DETAIL_SCREEN,
            routeDetails: {
                data : state
            }
        });
    }
    _loadTripPlannerDetail(state)
    {
        console.log(state);
        this.setState({
            screen:Constants.TRIP_PLANNER_DETAIL_SCREEN,
            tripPlannerDetail: {
                data : state
            }
        });
    }
    _loadCabsAndAutoScreen(state){
        console.log(Constants.CABS_SCREEN+' loading');
        this.setState({
            screen:Constants.CABS_SCREEN
        });
    }
    _loadAutoCompleteView(state)
    {
        console.log(Constants.AUTOCOMPLETE_VIEW+' loading');
        this.setState({
            screen:Constants.AUTOCOMPLETE_VIEW,
            autoCompleteView: {
                data : state
            }
        });
    }
    screenChange(screen, state)
    {
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
        console.log('SCREEN CHANGE');
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
        console.log(screen);
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
        if(Utils.stringCompare(Constants.SCHEDULERSCREEN,screen))
        {
            this._loadSchedulerScreen(state);
        }
        else if(Utils.stringCompare(Constants.CHANGE_CITY_SCREEN,screen)){
            this._loadChangeCityScreen();
        }
        else if(Utils.stringCompare(Constants.AUTOCOMPLETE,screen))
        {
            this._loadAutoComplete(state);
        }
        else if(Utils.stringCompare(Constants.ROUTE_DETAIL_SCREEN,screen))
        {
            this._loadRouteComplete(state);
        }
        else if(Utils.stringCompare(Constants.HOMESCREEN,screen))
        {
            this._loadHomeScreen({});
        }
        else if(Utils.stringCompare(Constants.TRIP_PLANNER_DETAIL_SCREEN,screen))
        {
            this._loadTripPlannerDetail(state);
        }
        else if(Utils.stringCompare(Constants.CABS_SCREEN,screen))
        {
            this._loadCabsAndAutoScreen(state);
        }
        else if(Utils.stringCompare(Constants.AUTOCOMPLETE_VIEW,screen))
        {
            this._loadAutoCompleteView(state);
        }
    }
    cityChanged(){
        this.setState({
            city: Store['city'],
            screen:Constants.HOMESCREEN
        });
    }
    getScreen(state){
        console.log(this.state['screen']);
        if(Utils.stringCompare(this.state['screen'],Constants.HOMESCREEN))
        {
            Store.clearAllSessions();
            return <AppHomeScreen  city={this.state['city']} screenChange={this.screenChange.bind(this)}/>;
        }
        else if(Utils.stringCompare(this.state['screen'],Constants.SCHEDULERSCREEN))
        {
            return <Scheduler state={this.state.scheduler['state']} screenChange={this.screenChange.bind(this)} currentState={Store.getCurrentWindowState()}/>;
        }
        else if(Utils.stringCompare(this.state['screen'],Constants.AUTOCOMPLETE))
        {
            return <AutoCompleteView data={this.state.autocomplete['data']} />;
            //return <AutoComplete data={this.state.autocomplete['data']}/>;
        }
        else if(Utils.stringCompare(this.state['screen'],Constants.ROUTE_DETAIL_SCREEN))
        {
            return <RouteDetail data={this.state.routeDetails['data']}/>;
        }
        else if(Utils.stringCompare(this.state['screen'],Constants.CHANGE_CITY_SCREEN))
        {
            return <ChangeCity screenChange={this.screenChange.bind(this)}/>;
        }
        else if(Utils.stringCompare(this.state['screen'],Constants.TRIP_PLANNER_DETAIL_SCREEN))
        {
            return <Tripplanner state={this.state.tripPlannerDetail['data']} screenChange={this.screenChange.bind(this)}/>;
        }
        else if(Utils.stringCompare(this.state['screen'],Constants.CABS_SCREEN))
        {
            return <CabsAndAutoScreen screenChange={this.screenChange.bind(this)}/>;
        }
        else if(Utils.stringCompare(this.state['screen'],Constants.AUTOCOMPLETE_VIEW))
        {
            return <AutoCompleteView state={this.state.autoCompleteView['data']} screenChange={this.screenChange.bind(this)}/>;
        }
    }

    render(){
        var scr;
        return (
            <div>
                {this.getScreen()}
            </div>
        );
    }
}

export default MainPage;