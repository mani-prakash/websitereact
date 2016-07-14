import FetchUtils from './FetchUtils.jsx';
import Utils from './Utils.jsx';
import Constants from './Constants.jsx';
import firebase from 'firebase';
import geofire from 'geofire';
import {EventEmitter} from 'events';
import dispatcher from './Dispatcher.jsx';
import schedulerStore from './Store/SchedulerStore.jsx';
class Store extends EventEmitter{
    constructor(props){
        super();
        this.setGeoFireData = this.setGeoFireData.bind(this);
        this.setGeoFireData();
    }
    city = {};
    states = {};
    App = {};
    metadata = [];
    geoFireLiveTrips = {};
    currentWindowState = {};
    cabData = null;
    radius = 10;
    numToDay = [
        'sunday','monday','tuesday','wednesday','thursday','friday','saturday'
    ];
    setGeoFireData(){
        if(!Utils.validate(this.location))
        {
            setTimeout(this.setGeoFireData,1000);
            return;
        }
        let self = this;
        let base = new firebase('https://dazzling-fire-3689.firebaseio.com/production/geofire/MUMBAI');
        let geo = new geofire(base);
        var geoQuery = geo.query({
            center: [this.getLocation().lat,this.getLocation().lng],
            radius: 10
        });
        this.geoFireLiveTrips = {};
        console.log("GeoQuery started");
        var onReadyRegistration = geoQuery.on("ready", function() {
            console.log("GeoQuery has loaded and fired all other events for initial data");
        });
        var onKeyEnteredRegistration = geoQuery.on('key_entered', function(key, location, distance) {
            console.log(key + " entered query at " + location + " (" + distance + " km from center)");
            self.setAGeoFireLiveTrip(key, location, distance);
        });
        var onKeyMovedRegistration = geoQuery.on("key_moved", function(key, location, distance) {
            console.log(key + " moved within query to " + location + " (" + distance + " km from center)");
            self.setAGeoFireLiveTrip(key, location, distance);
        });
    }
    setAGeoFireLiveTrip(key, location, distance){
        this.geoFireLiveTrips[key] = {location,distance};
        this.emit('geoFireChange');
    }
    setMeta = function(){
        let meta = FetchUtils.getData(Constants.Base_Url+"/metadata");
        meta.then(function(value){
            if(Utils.validate(value))
            {
                this.metadata = value;
            }
            else{
                this.metadata = [];
            }
        });
    };
    getLiveTrips(count){
        let list = [];
        let keys = Object.keys(this.geoFireLiveTrips);
        for(let i=0;i<keys.length&&i<count;i++)
        {
            let data = JSON.parse(keys[i]);
            list.push(data);
        }
        return list;
    }
    storeState(screen,state)
    {

    }
    getState(screen){

    }
    setCity = function(cityName)
    {
        for(let i=0;i<this.metadata.length;i++)
        {
            let cityObject = this.metadata[i];
            if(Utils.stringCompare(cityObject['city'],cityName))
            {
                this.city = cityObject;
            }
        }
    };
    getMetaData = function()
    {
        let data = FetchUtils.getData(Constants.Scheduler_Url+"/metadata");
        let self = this;
        data.then(
            function(value){
                if(Utils.validate(value))
                {
                    self.metadata = value;
                    self.setCity("Mumbai");
                    self.App.cityChanged();
                }
            }
        );
    };
    getLocation = function() {
        return this.location;
    };
    setLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.savePosition.bind(this));
        } else {
            this.location = null;
        }
    };
    savePosition = function(position) {
        this.location = {lat:position.coords.latitude,lng:position.coords.longitude};
    };

    changeCity = function(city){
        this.setCity(city);
        this.App.cityChanged();
    };

    getModeAgencies = function(mode){

    };

    getState = function (screen) {
        if(Utils.validate(this['states'][screen]))
        {
            return this['states'][screen];
        }
        return null;
    };

    setState = function (screen, stat) {
        this['states'][screen] = stat;
    };

    initStore = function(){
        this.getMetaData();
        this.setLocation();
    };

    getCurrentWindowState = function(){
        return this.currentWindowState;
    };

    setCurrentWindowState = function(state){
        return this.currentWindowState;
    };

    getToday = function(){
        let date = new Date();
        let td = date.getDay();
        return this.numToDay[td];
    };
    getCabsAndAutoData(){
        return this.cabData;
    }
    setCabsAndAutoData(data){
        this.cabData = data;
    }
    clearAllSessions = function(){
        this.states = {};
        schedulerStore.cleanData();
    };
    reloadCabdata()
    {
        var promise = new Promise(function(resolve,reject){
            let url = Constants.Backend_Url+'/cabs?from_lat='+this.getLocation().lat+'&from_lon='+this.getLocation().lng;
            let self = this;
            let prom = FetchUtils.getData(url);
                prom.then(function(data){
                   self.setCabsAndAutoData(data);
                   resolve(data);
                });
        });
        return promise;
    }
    handleActions(action){
        console.log('action dispatched '+action);
    }
}

const store = new Store;
dispatcher.register(store.handleActions.bind(store));
export default store;