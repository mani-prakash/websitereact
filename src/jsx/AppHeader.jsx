import React from 'react';
import Utils from './Utils.jsx';
import Constants from './Constants.jsx';
import Store from './Store.jsx';

export class AppHeader extends React.Component{
    constructor(props)
    {
        super(props);
    }
    getSideHeaderButton(){
        console.log("close button :"+this.props['sideHeader']['isOpen']);
        let style= {
            display:'inline-block',
            verticalAlign: 'middle',
            margin: '0px 32px'
        };
        if(this.props['sideHeader']['isThere']&&!this.props['sideHeader']['isOpen'])
        {
            return (
                <div style={style}>
                    <span style={style} className='cursorPointer' onClick={this.props['sideHeader']['openSideHeader']}>
                     <span>&#9776;</span>
                    </span>
                </div>
            );
        }
        else if(this.props['sideHeader']['isThere']&&this.props['sideHeader']['isOpen']){
            return (
                <div style={style}>
                    <span className='cursorPointer' onClick={this.props['sideHeader']['closeSideHeader']}>
                        <img className='headerItem' style={{display:'inline'}} src={Constants.BACKARROW} />
                    </span>
                </div>
            );
        }
        else{
            return( <span> &nbsp; </span> );
        }
    }
    render(){
        let sideHeaderButton = this.getSideHeaderButton();
        let style = {position:'fixed',
                    top:0,
                    left: 0,
                    width:'100%',
                    zIndex: 1001,
                    minHeight: Constants.HEADER_SPACE,
                    verticalAlign: 'middle'
                };
        return (
            <div style = {style}>
                <div className='AppHeader'>
                    <div className='mainHeader'>
                    <div style={{padding:'47px 0px'}}>
                        {sideHeaderButton}
                        <span>{this.props['title']}</span>
                    </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        );
    }
};

export class SchedulerHeader extends React.Component{
    constructor(props){
        super(props);
    }
    goBack(){
        console.log("arrow go back");
        this.props['screenChange'](Constants.HOMESCREEN);
    }
    getModesTab(){
        let modesTab = (<div></div>);
        let modes = Store.city['station_type'];
        let func = this.props['changeMode'];
        let selectedMode = this.props['selectedMode'];
        let imageStyle={'height':'48px','width':'48px',display:'inline-block',verticalAlign: 'middle'};
        if(modes.length<4)
        {
            let width = 12/modes.length;
            modesTab = modes.map(function(mode, index){
                let cl = 'schedulerMode col-xs-'+width;
                if(Utils.stringCompare(mode,selectedMode)){
                    return (<div className={'ModeSelected '+cl} key={mode}
                                 onClick={() => func(mode)}>
                        <img src={Constants.assets+'/near/tab'+Constants['viewModes'][mode].toLowerCase()+'.png'} style={imageStyle}/>
                        &nbsp;{Constants['viewModes'][mode]}
                    </div>);
                }
                else{
                    return (<div className={'ModeUnSelected '+cl} key={mode}
                                 onClick={() => func(mode)}>
                        <img src={Constants.assets+'/near/tabsSelected'+Constants['viewModes'][mode].toLowerCase()+'Disabled.png'} style={imageStyle}/>
                        &nbsp;{Constants['viewModes'][mode]}
                    </div>);
                }
            });
            return (<div className='row'>
                {modesTab}
            </div>);
        }
        else{
            modesTab = modes.map(function(mode,index){
                let cl = 'schedulerModeTab';
                if(Utils.stringCompare(mode,selectedMode)){
                    return (<div className={'ModeSelected '+cl} key={mode}
                                 onClick={() => func(mode)}>
                        <img src={Constants.assets+'/near/tab'+Constants['viewModes'][mode].toLowerCase()+'.png'} style={imageStyle}/>
                        &nbsp;{Constants['viewModes'][mode]}
                    </div>);
                }
                else{
                    return (<div className={'ModeUnSelected '+cl} key={mode}
                                 onClick={() => func(mode)}>
                        <img src={Constants.assets+'/near/tabsSelected'+Constants['viewModes'][mode].toLowerCase()+'Disabled.png'} style={imageStyle}/>
                        &nbsp;{Constants['viewModes'][mode]}
                    </div>);
                }
            });
            return (<div className='schedulerModesTab' style={{height:144,textAlign:'left',overflowX:'scroll',overflowY:'hidden'}}>
                <div style={{height:'100%',width:'120%'}}>
                    {modesTab}
                </div>
            </div>);
        }
    }
    render(){
        let style = {position:'fixed',
            top:0,
            left: 0,
            width:'100%',
            zIndex: 1001,
            height: Constants.HEADER_SPACE
        };
        let selectedMode = this.props['selectedMode'];
        let func = this.props['changeMode'];
        let modesLen = Store.city['station_type'].length;
        let modes = this.getModesTab();
        return (
            <div style = {style}>
                <div className='AppHeader'>
                    <div className='mainHeader verticalCenter'>
                    <span className='cursorPointer' onClick={this.goBack.bind(this)}>
                        <img className='headerItem' style={{display:'inline'}} src={Constants.BACKARROW} />
                    </span>
                    <span>{this.props['title']}</span>
                    <br/>
                    </div>
                    <div className='extraHeader verticalBottom' style={{width:'100%',height:'144px', fontSize:'40px'}}>
                        <div className='container-fluid'>
                            {modes}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}