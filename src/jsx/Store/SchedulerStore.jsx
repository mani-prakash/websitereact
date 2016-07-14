import {EventEmitter} from 'events';
import dispatcher from './../Dispatcher.jsx';
import Utils from './../Utils.jsx';
class SchedulerStore extends EventEmitter{
    constructor(){
        super();
        this.selectedMode = '';
        this.modeStates = {};
    }
    setModeData(mode,data){

    }
    setCurrentMode(mode){
        this.selectedMode = mode;
        this.emit('change');
    }
    getCurrentMode(){
        return this.selectedMode;
    }
    setModeState(mode,state){
        this.modeStates[mode] = state;
    }
    setState(state){
        this.selectedMode = state['selectedMode'];
        this.modeStates = state['modeStates'];
    }
    getState(){
        if(!Utils.getValidatedString(this.selectedMode))
        {
            return null;
        }
        return {selectedMode:this.selectedMode,modeStates:this.modeStates};
    }
    getModeState(mode){
        if(Utils.validate(this.modeStates[mode]))
        {
            return this.modeStates[mode];
        }
        return null;
    }
    cleanData(){
        this.selectedMode = '';
        this.state = {
            selectedMode : '',
            modeStates : {}
        }
    }
    handleActions(action){
        console.log('action dispatched '+action);
    }
}
const schedulerStore = new SchedulerStore;
dispatcher.register(schedulerStore.handleActions.bind(schedulerStore));
export default schedulerStore;