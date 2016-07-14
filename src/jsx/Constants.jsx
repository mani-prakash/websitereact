/*class Constants{
    constructor(){

    }
     this.assets = 'images/assets/xxh';
     this.IMAGESRC = {
         UBER : this.assets+'/uber booking/ic_uber_history.png',
         JUGNOO : 'this.assets+'/ic_jugnoo.png',
         SEARCH : this.assets+'/schedular/search.png'
     };
     this.Backend_Url = 'http://webbackend.zophop2013.appspot.com';
     this.Scheduler_Url = 'http://development.zophop.com:8080/scheduler_v4/v4';//'http://test.zophop.com:8080/scheduler_v4/v4';
     this.HOMESCREEN = 'home';
     this.SCHEDULERSCREEN = 'scheduler';
     this.HEADER_SPACE_NUMBER = 168;
     this.CARD_TUPLE_HEIGHT = 120;
     this.CARD_HEADER_HEIGHT = 60;
     this.HEADER_SPACE = '168px';
     this.FONT_SIZE = '48px';
     this.HEADER_FONT_SIZE = '70px';
     this.CABS_SCREEN = 'CABS_SCREEN';
     this.CHANGE_CITY_SCREEN = 'changecity';
     this.AUTOCOMPLETE = 'autocomplete';
     this.BUS = 'BUS';
     this.ROUTE = 'route';
     this.STOP = 'stop';
     this.FROM = 'from';
     this.TO = 'to';
     this.images = 'images';
     this.BACKARROW = 'images/assets/xxh/arrow_actionbar.png';
     this.THREELINES = '/threelines.png';
     this.TIMETAKEN = 'time_taken';
     this.NO_OF_CHANGES = 'number_of_transfers';
     this.TRIP_PLANNER_DETAIL_SCREEN = 'tripPlannerDetailScreen';
     Constants["IMAGESRC"].UBER = Constants.assets+'/uber booking/ic_uber_history.png';
     this['viewModes']= {
        BUS : 'BUS',
        RAILWAY : 'TRAIN',
        MONORAIL : 'MONO',
        CAB : 'CAB',
        METRO : 'METRO',
        FERRY : 'FERRY'
     };
     Constants['viewModes']['BUS'] = 'BUS';
     Constants['viewModes']['RAILWAY'] = 'TRAIN';
     Constants['viewModes']['MONORAIL'] = 'MONO';
     Constants['viewModes']['CAB'] = 'CAB';
     Constants['viewModes']['METRO'] = 'METRO';
     Constants['viewModes']['FERRY'] = 'FERRY';
    getUrl(){
        return this.rl;
    }
}
Constants["IMAGESRC"] = {};
Constants.Backend_Url = 'http://webbackend.zophop2013.appspot.com';
Constants.Scheduler_Url = 'http://development.zophop.com:8080/scheduler_v4/v4';//'http://test.zophop.com:8080/scheduler_v4/v4';
Constants.HOMESCREEN = 'home';
Constants.SCHEDULERSCREEN = 'scheduler';
Constants.HEADER_SPACE_NUMBER = 168;
Constants.CARD_TUPLE_HEIGHT = 120;
Constants.CARD_HEADER_HEIGHT = 60;
Constants.HEADER_SPACE = '168px';
Constants.FONT_SIZE = '48px';
Constants.HEADER_FONT_SIZE = '70px';
Constants.CABS_SCREEN = 'CABS_SCREEN';
Constants.CHANGE_CITY_SCREEN = 'changecity';
Constants.AUTOCOMPLETE = 'autocomplete';
Constants.BUS = 'BUS';
Constants.ROUTE = 'route';
Constants.STOP = 'stop';
Constants.FROM = 'from';
Constants.TO = 'to';
Constants.images = 'images';
Constants.assets = 'images/assets/xxh';
Constants.BACKARROW = 'images/assets/xxh/arrow_actionbar.png';
Constants.THREELINES = '/threelines.png';
Constants.TIMETAKEN = 'time_taken';
Constants.NO_OF_CHANGES = 'number_of_transfers';
Constants.TRIP_PLANNER_DETAIL_SCREEN = 'tripPlannerDetailScreen';
Constants["IMAGESRC"].UBER = Constants.assets+'/uber booking/ic_uber_history.png';
Constants['viewModes']= {};
Constants['viewModes']['BUS'] = 'BUS';
Constants['viewModes']['RAILWAY'] = 'TRAIN';
Constants['viewModes']['MONORAIL'] = 'MONO';
Constants['viewModes']['CAB'] = 'CAB';
Constants['viewModes']['METRO'] = 'METRO';
Constants['viewModes']['FERRY'] = 'FERRY';
export default Constants;*/

export default {
    viewModes:{
        BUS : 'BUS',
        RAILWAY : 'TRAIN',
        MONORAIL : 'MONO',
        CAB : 'CAB',
        METRO : 'METRO',
        FERRY : 'FERRY'
    },
    IMAGESRC : {
        UBER : 'images/assets/xxh/uber booking/ic_uber_history.png',
        JUGNOO : 'images/assets/xxh/ic_jugnoo.png',
        SEARCH : 'images/assets/xxh/schedular/search.png',
        CLOSE :  'images/assets/xxh/near/close_nearby.png',
        RELOAD :  'images/assets/xxh/reload.png'
    },
    MODE_IMAGES :{
        BUS : 'images/assets/xxh/near/bus_all_depatrures.png',
        MONO : 'images/assets/xxh/near/bus_all_depatrures.png',
        MONORAIL : 'images/assets/xxh/near/bus_all_depatrures.png',
        METRO : 'images/assets/xxh/near/train_all_depatrures.png',
        RAILWAY : 'images/assets/xxh/near/train_all_depatrures.png',
        TRAIN : 'images/assets/xxh/near/train_all_depatrures.png'
    },
    Backend_Url : 'http://webbackend.zophop2013.appspot.com',
    Scheduler_Url : 'http://development.zophop.com:8080/scheduler_v4/v4',//'http://test.zophop.com:8080/scheduler_v4/v4';
    HOMESCREEN : 'home',
    SCHEDULERSCREEN : 'scheduler',
    ROUTE_DETAIL_SCREEN : 'Route_DETAIL_Screen',
    HEADER_SPACE_NUMBER : 168,
    CARD_TUPLE_HEIGHT : 120,
    CARD_HEADER_HEIGHT : 60,
    INPUT_HEIGHT : 144,
    HEADER_SPACE : '168px',
    FONT_SIZE : '48px',
    HEADER_FONT_SIZE : '70px',
    CABS_SCREEN : 'CABS_SCREEN',
    CHANGE_CITY_SCREEN : 'changecity',
    AUTOCOMPLETE : 'autocomplete',
    AUTOCOMPLETE_VIEW : 'autocompleteView',
    BUS : 'BUS',
    ROUTE : 'route',
    STOP : 'stop',
    FROM : 'from',
    TO : 'to',
    images : 'images',
    assets : 'images/assets/xxh',
    BACKARROW : 'images/assets/xxh/arrow_actionbar.png',
    BLACK_BACK_ARROW : 'images/assets/xxh/black_arrow_actionbar.png',
    THREELINES : '/threelines.png',
    TIMETAKEN : 'time_taken',
    NO_OF_CHANGES : 'number_of_transfers',
    TRIP_PLANNER_DETAIL_SCREEN : 'tripPlannerDetailScreen'
}