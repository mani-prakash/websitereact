import React from 'react';
import {SchedulerHeader} from './AppHeader.jsx';
import {SchedulerTripCard} from './Cards.jsx';
import Utils from './Utils.jsx';
import Constants from './Constants.jsx';
import Store from './Store.jsx';
import schedulerStore from './Store/SchedulerStore.jsx';
import FetchUtils from './FetchUtils.jsx';
import Controller from './Controller.jsx';
export default class CabsAndAutoScreen extends React.Component{
    constructor(props){
        super(props);
    }
    getCabsAndAutoData(){

    }
    goBack(){
        Controller.loadScreen(Constants.HOMESCREEN);
    }

    reloadData(){
        console.log('reload cab data');
        let self = this;
        let promise = Store.reloadCabdata();
        promise.then(function(data){
            console.log(data);
            self.setState(
                {
                    data : data
                }
            );
        });
    }

    getData(){

    }
    componentWillMount(){
        let data = Store.getCabsAndAutoData();
        this.setState(
            {data : data}
        );
    }
    getCardData(){
        let data = this.state['data']['autoCabs'];
        let list = [];
        let cars = data.map(function (data,index) {
            let aggregatorName = data['aggregatorName'];
            if(data['autoCabs'].length==0)
            {
                return (<div></div>);
            }
            let cabs = data['autoCabs'].map(function(data,index){
                return (<div key={index} className='cardTuple borderBottom'>
                            <div className='col-xs-6 verticalCenter'>
                                {data['name']}</div>
                            <div className='col-xs-6 text-right verticalCenter'>{data['eta_time_in_minutes']}&nbsp;mins</div>
                        </div>);
            });
            return (<div key={data['aggregatorName']} className='card'>
                    <div className='cardHeader verticalCenter' style={{color:'#000000'}}>
                        <img className='headerItem' src={Constants.IMAGESRC[aggregatorName]} />&nbsp;
                        <span>{data['aggregatorName']}</span>
                    </div>
                    {cabs}
                </div>

            )
        });

        return cars;
    }

    render(){
        let styles = {position:'fixed',
                    top:'0px',left:'0px',width:'100%',zIndex:1000 ,fontFamily:'robotoB',height:Constants.HEADER_SPACE};
        let style = {'width':(window.innerWidth-48)+'px',margin:'0px auto'};
        return (
            <div>
                <div className='AppHeader' style={styles}>
                    <div className='mainHeader verticalCenter'>
                        <div style={{width:'100%', paddingRight:'48px'}}>
                            <span className='cursorPointer' onClick={() => Controller.loadScreen(Constants.HOMESCREEN)}>
                                <img className='headerItem' style={{display:'inline'}} src={Constants.BACKARROW} />
                            </span>
                            <span>
                                Cabs &amp; Auto's
                            </span>
                            <span style={{float:'right'}} onClick={this.reloadData.bind(this)}>reload</span>
                        </div>
                    </div>
                </div>
                <div style={{height:Constants.HEADER_SPACE}}></div>
                <div style={style} className='dataSeletedDisplay'>
                    {this.getCardData()}
                </div>
            </div>
        );
    }
}