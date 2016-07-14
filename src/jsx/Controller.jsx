import FetchUtils from './FetchUtils.jsx';
import Utils from './Utils.jsx';
import Constants from './Constants.jsx';
import Store from './Store.jsx';
class Controller{
    constructor(props){

    }
    static loadScreen(screen){
        Controller.APP.screenChange(screen, null);
    }
    static storeSetApp(app){
        Controller.APP = app;
    }
}
Controller.APP = null;

export default Controller;