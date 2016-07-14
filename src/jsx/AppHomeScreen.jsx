import React from 'react';
import {AppHeader} from './AppHeader.jsx'
import Store from './Store.jsx'
import SideHeader from './SideHeader.jsx'
import Constants from './Constants.jsx'
import Utils from './Utils.jsx'
import {CabsAndAuto, LiveTripsCard} from './Cards.jsx'

class AppHomeScreen extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            openSideHeader:false
        };
        this.handleResize = this.handleResize.bind(this);
    }
    getSchedulerCard(){

    }
    _loadRouteDetails(){
        this.props.screenChange('route');
    }
    _openSideHeader(){
        this.setState({
            openSideHeader : true
        });
    }
    _closeSideHeader(){
        this.setState({
            openSideHeader : false
        });
    }
    _getModesTab(){
        let list = Store.city['station_type'];
        if(Utils.validate(list)) {
            console.log(JSON.stringify(list));
            return <ModeCard screenChange={this.props['screenChange']}/>;
        }
        return (<div>

        </div>);
    }
    _getSideHeader(){
        let func = this._closeSideHeader.bind(this);
        console.log("return sidebar");
        if(this.state['openSideHeader']===true)
        {
            return (
                <div>
                    <SideHeader screenChange={this.props['screenChange']} closeFunction={this._closeSideHeader.bind(this)} />
                    <div style={{background:'#000000',position:'fixed', opacity: '0.8', top:0,left:0,width:'100%',height:'100%',zIndex:'999'}} onClick={() => func()}>

                    </div>
                </div>
            );
        }
        else{
            return (
                <div className=''>
                </div>
            );
        }
    }
    handleResize(){
        this.setState({windowWidth: window.innerWidth});
    }
    componentWillMount(){
        Store.clearAllSessions();
        window.removeEventListener('resize', this.handleResize);
        /*this.unMount = false;
        let event = schedulerStore.on('change' , this.setStateToStore);
        console.log(event);*/

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    loadSchedulerAutoComplete(){
        this.props['screenChange'](Constants.SCHEDULERSCREEN,{'selectedMode':'BUS',isRedirect:true});
    }
    render()
    {
        let sideHeader = this._getSideHeader();
        let modes = this._getModesTab();
        let style = {'width':(window.innerWidth-48)+'px',margin:'0px auto'};
        let func = this.props['screenChange'];
        return (
          <div style={{'width':'100%'}}>
              <AppHeader sideHeader={{'isThere':true,
                            openSideHeader:this._openSideHeader.bind(this),
                            closeSideHeader:this._closeSideHeader.bind(this),
                            isOpen:this.state['openSideHeader']}} title={Store['city']['city']}/>
              <div style={{height:Constants.HEADER_SPACE}}></div>
              <div className='' style={style}>
                  <div className='width100 card' onClick={this.loadSchedulerAutoComplete.bind(this)} style={{verticalAlign: 'middle', fontSize:Constants.FONT_SIZE, display:'table',color : '#d3d3d3', height:144 , paddingLeft: '80px'}}>
                      <span style={ { display:'table-cell',verticalAlign: 'middle'}}>
                      <img style={{verticalAlign: 'middle',height:'48px',width:'48px',display:'inline'}} src={Constants.assets+'/near/tabsSelectedbusDisabled.png'} />
                      &nbsp;&nbsp; Search live bus timings
                      </span>
                  </div>
                  {modes}
                  <CabsAndAuto />
                  <LiveTripsCard />
              </div>
              {sideHeader}
          </div>
        );
    }
}

class ModeCard extends React.Component{
    getModes(modes,isRecur, isBorder)
    {
        if(modes.length>=4)
        {
            let list = modes.slice(0);
            let first = (modes.length%2===0)?modes.length/2:(modes.length/2)+1;
            let fArray = list.splice(0,first);
            let lArray = list.splice(0);
            let fEle = this.getModes(fArray, true, true);
            let lEle = this.getModes(lArray,true);
            return (
                <div className='modeCard container-fluid'>
                    {fEle}
                    {lEle}
                    <div style={{width:'100%'}}>

                    </div>
                </div>
            );
        }
        else{
            let sz = 12/modes.length;
            let className = 'col-xs-'+sz+' col-md-'+sz+' text-center modeCardTuple';
            if(isBorder)
            {
                className +=' borderBottom';
            }
            let func = this.props['screenChange'];
            let element = modes.map(function (mode, index) {
                console.log(mode);
                return <div key={mode} className={className}
                            onClick={() => func(Constants.SCHEDULERSCREEN,{'selectedMode':mode})}
                    >
                    <span>{Utils.firstLetterCapital(Constants['viewModes'][mode])}</span></div>
            });
            if(isRecur)
            {
                return (
                    <div className="width100">
                        {element}
                    </div>
                );
            }
            else{
                return (
                    <div className='modeCard container-fluid'>
                        <div className="width100 block" style={{padding:'18px 0px'}}>
                            {element}
                        </div>
                    </div>
                );
            }
        }
    }
    render(){
        let func = this.props['screenChange'];
        let modeCard = this.getModes(Store.city['station_type'], false);
        return (
            <div className='width100 card'>
                    {modeCard}
            </div>
        );
    }
}
export default AppHomeScreen;
